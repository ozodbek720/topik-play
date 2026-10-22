import { useEffect, useMemo, useRef, useState } from 'react'
import advancedWords from './advancedWords.js'
import topik2Lugat from './topik2Lugat.js'
import { addFriend, getAllProfiles, getRedirectResultAuth, loadAccountData, loadProfile, listenToFriends, listenToMessages, listenToProfiles, observeAuth, removeFriend, saveAccountData, saveProfile, sendMessage, signInWithGooglePopup, signInWithGoogleRedirect, signOutUser } from './firebase.js'
import grammarPoints from './grammarPoints.js'
import './App.css'

const MAX_HEARTS = 5
const HEART_REFILL_INTERVAL = 12 * 60 * 60 * 1000
const HEARTS_PER_REFILL = 5
const HEART_EXCHANGE_COST = 30
const UNVERIFIED_WORD_ID_START = 121
const UNVERIFIED_WORD_ID_END = 2000
const ADVANCED_WORDS_MIGRATION_KEY = 'topik-play-advanced-words-v1'
const GAME_STATE_KEY = 'topik-play-game-state'
const THEME_STORAGE_KEY = 'topik-play-theme'
const COLOR_MODE_STORAGE_KEY = 'topik-play-color-mode'
const WORDS_STORAGE_KEY = 'topik-play-words'
const PROGRESS_STORAGE_KEY = 'topik-play-learning-progress'
const SETTINGS_STORAGE_KEY = 'topik-play-settings'
const CUSTOM_GRAMMAR_STORAGE_KEY = 'topik-play-custom-grammar'
const MISTAKES_STORAGE_KEY = 'topik-play-mistakes'
const ACCOUNT_DATA_OWNER_KEY = 'topik-play-account-data-owner'
const LOCAL_MODE_STORAGE_KEY = 'topik-play-local-mode'
const TOPIK_TWO_DAY_ONE_WORDS = [
  { korean: '필요하다', meaning: 'kerak bo‘lmoq' },
  { korean: '방법', meaning: 'usul' },
  { korean: '이용하다', meaning: 'foydalanmoq' },
  { korean: '생각하다', meaning: 'o‘ylamoq' },
  { korean: '관심', meaning: 'qiziqish' },
  { korean: '가능하다', meaning: 'mumkin bo‘lmoq' },
  { korean: '결과', meaning: 'natija' },
  { korean: '늘다', meaning: 'ko‘paymoq, oshmoq' },
  { korean: '바꾸다', meaning: 'almashtirmoq' },
  { korean: '노력하다', meaning: 'harakat qilmoq, tirishmoq' },
  { korean: '느끼다', meaning: 'his qilmoq' },
  { korean: '경우', meaning: 'holat' },
  { korean: '상품', meaning: 'tovar, mahsulot' },
  { korean: '생기다', meaning: 'paydo bo‘lmoq' },
  { korean: '도움', meaning: 'yordam' },
  { korean: '환경', meaning: 'atrof-muhit' },
  { korean: '내용', meaning: 'mazmun' },
  { korean: '상황', meaning: 'vaziyat' },
  { korean: '바로잡다', meaning: 'tuzatmoq' },
  { korean: '사회', meaning: 'jamiyat' },
  { korean: '생활', meaning: 'turmush, hayot' },
  { korean: '이상하다', meaning: 'g‘alati bo‘lmoq' },
  { korean: '경험', meaning: 'tajriba' },
  { korean: '다양하다', meaning: 'xilma-xil bo‘lmoq' },
  { korean: '최근', meaning: 'yaqinda, so‘nggi paytlarda' },
  { korean: '선택하다', meaning: 'tanlamoq' },
  { korean: '효과', meaning: 'ta’sir, samara' },
  { korean: '문제', meaning: 'muammo' },
  { korean: '자신', meaning: 'o‘zi' },
  { korean: '찾다', meaning: 'topmoq, izlamoq' },
  { korean: '관계', meaning: 'munosabat' },
  { korean: '기간', meaning: 'muddat, davr' },
  { korean: '전문가', meaning: 'mutaxassis' },
]

function getLocalDateKey() {
  return new Date().toLocaleDateString('sv-SE')
}

function createDefaultLearningProgress() {
  return {
    selectedDifficulty: 'easy',
    currentIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    quizMode: 'words',
    mistakeIndex: 0,
    grammarIndex: 0,
    grammarQuizLevel: 'Hammasi',
    grammarSelectedAnswer: null,
    grammarAnswered: false,
    topikIndex: 0,
    topikListenIndex: 1,
    topikMode: 'translate',
    topikSelected: null,
    topikAnswered: false,
    topikListenInput: '',
    topikListenAnswered: false,
    topikListenCorrect: false,
  }
}

const defaultSettings = {
  speechEnabled: true,
  speechRate: 0.85,
  textSize: 'medium',
  dailyGoal: 10,
  dailyCompleted: 0,
  dailyDate: new Date().toLocaleDateString('sv-SE'),
}

function loadSettings() {
  const today = getLocalDateKey()
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? 'null')
    if (!saved || typeof saved !== 'object') return { ...defaultSettings, dailyDate: today }

    return {
      speechEnabled: typeof saved.speechEnabled === 'boolean' ? saved.speechEnabled : defaultSettings.speechEnabled,
      speechRate: Number.isFinite(saved.speechRate) && saved.speechRate >= 0.6 && saved.speechRate <= 1.2
        ? saved.speechRate
        : defaultSettings.speechRate,
      textSize: ['small', 'medium', 'large'].includes(saved.textSize) ? saved.textSize : defaultSettings.textSize,
      dailyGoal: [5, 10, 15, 20, 30].includes(saved.dailyGoal) ? saved.dailyGoal : defaultSettings.dailyGoal,
      dailyCompleted: saved.dailyDate === today && Number.isInteger(saved.dailyCompleted) && saved.dailyCompleted >= 0
        ? saved.dailyCompleted
        : 0,
      dailyDate: today,
    }
  } catch (error) {
    console.error('Sozlamalarni o‘qib bo‘lmadi:', error)
    return { ...defaultSettings, dailyDate: today }
  }
}

function loadWords() {
  try {
    const savedWords = JSON.parse(localStorage.getItem(WORDS_STORAGE_KEY) ?? 'null')
    if (Array.isArray(savedWords) && savedWords.every((word) =>
      word && Number.isFinite(word.id) && typeof word.korean === 'string' && typeof word.meaning === 'string',
    )) {
      let wordsToLoad = savedWords
        .filter((word) => word.id < UNVERIFIED_WORD_ID_START || word.id > UNVERIFIED_WORD_ID_END)
      if (localStorage.getItem(ADVANCED_WORDS_MIGRATION_KEY) !== '1') {
        const savedIds = new Set(wordsToLoad.map((word) => word.id))
        wordsToLoad = [
          ...wordsToLoad,
          ...advancedWords.filter((word) => !savedIds.has(word.id)),
        ]
        try {
          localStorage.setItem(ADVANCED_WORDS_MIGRATION_KEY, '1')
        } catch (error) {
          console.error('Yangi qiyin so‘zlarni yangilash holatini saqlab bo‘lmadi:', error)
        }
      }
      return wordsToLoad.map((word) => ({
          ...word,
          ...(reviewedWordCorrections.get(word.id) ?? {}),
          example: typeof word.example === 'string' ? word.example : '',
          category: wordCategories.includes(word.category) ? word.category : 'Boshqa',
          difficulty: quizDifficulties.some((difficulty) => difficulty.id === word.difficulty) ? word.difficulty : 'easy',
          level: typeof word.level === 'string' ? word.level : 'A1',
        }))
    }
    if (savedWords !== null) {
      console.error('Saqlangan lug‘at formati noto‘g‘ri. Boshlang‘ich lug‘at yuklandi.')
    }
  } catch (error) {
    console.error('Saqlangan lug‘atni o‘qib bo‘lmadi:', error)
  }
  return categorizedWords
}

function loadLearningProgress() {
  const initial = createDefaultLearningProgress()
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) ?? 'null')
    if (!saved || typeof saved !== 'object') return initial
    return {
      selectedDifficulty: quizDifficulties.some((difficulty) => difficulty.id === saved.selectedDifficulty)
        ? saved.selectedDifficulty
        : initial.selectedDifficulty,
      currentIndex: Number.isInteger(saved.currentIndex) && saved.currentIndex >= 0 ? saved.currentIndex : 0,
      selectedAnswer: typeof saved.selectedAnswer === 'string' ? saved.selectedAnswer : null,
      isAnswered: saved.isAnswered === true,
      quizMode: ['words', 'grammar', 'mistakes'].includes(saved.quizMode) ? saved.quizMode : initial.quizMode,
      mistakeIndex: Number.isInteger(saved.mistakeIndex) && saved.mistakeIndex >= 0 ? saved.mistakeIndex : 0,
      grammarIndex: Number.isInteger(saved.grammarIndex) && saved.grammarIndex >= 0 ? saved.grammarIndex : 0,
      grammarQuizLevel: ['Hammasi', 'Boshlang‘ich', 'O‘rta'].includes(saved.grammarQuizLevel)
        ? saved.grammarQuizLevel
        : initial.grammarQuizLevel,
      grammarSelectedAnswer: typeof saved.grammarSelectedAnswer === 'string' ? saved.grammarSelectedAnswer : null,
      grammarAnswered: saved.grammarAnswered === true,
      topikIndex: Number.isInteger(saved.topikIndex) && saved.topikIndex >= 0 ? saved.topikIndex : 0,
      topikListenIndex: Number.isInteger(saved.topikListenIndex) && saved.topikListenIndex >= 0
        ? saved.topikListenIndex
        : 1,
      topikMode: saved.topikMode === 'listen' ? 'listen' : initial.topikMode,
      topikSelected: typeof saved.topikSelected === 'string' ? saved.topikSelected : null,
      topikAnswered: saved.topikAnswered === true,
      topikListenInput: typeof saved.topikListenInput === 'string' ? saved.topikListenInput : '',
      topikListenAnswered: saved.topikListenAnswered === true,
      topikListenCorrect: saved.topikListenCorrect === true,
    }
  } catch (error) {
    console.error('O‘rganish jarayonini o‘qib bo‘lmadi:', error)
    return initial
  }
}

function loadCustomGrammar() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_GRAMMAR_STORAGE_KEY) ?? '[]')
    if (Array.isArray(saved) && saved.every((point) =>
      point && Number.isFinite(point.id) && typeof point.pattern === 'string' &&
      typeof point.title === 'string' && typeof point.explanation === 'string' &&
      typeof point.example === 'string' && typeof point.translation === 'string' &&
      ['Boshlang‘ich', 'O‘rta'].includes(point.level),
    )) {
      return saved.map((point) => ({ ...point, custom: true }))
    }
    console.error('Saqlangan grammatika formati noto‘g‘ri. Faqat asosiy qoidalar yuklandi.')
  } catch (error) {
    console.error('Saqlangan grammatikani o‘qib bo‘lmadi:', error)
  }
  return []
}

function loadMistakes() {
  try {
    const saved = JSON.parse(localStorage.getItem(MISTAKES_STORAGE_KEY) ?? '[]')
    if (Array.isArray(saved) && saved.every((item) =>
      item && ['word', 'grammar'].includes(item.type) && Number.isFinite(item.id),
    )) {
      return saved
    }
    console.error('Saqlangan xatolar formati noto‘g‘ri. Xatolar ro‘yxati tozalandi.')
  } catch (error) {
    console.error('Xatolar ro‘yxatini o‘qib bo‘lmadi:', error)
  }
  return []
}

const themes = [
  { id: 'sky', name: 'Moviy', primary: '#7dd3fc', strong: '#38bdf8', accent: '#f9a8d4' },
  { id: 'violet', name: 'Binafsha', primary: '#c4b5fd', strong: '#8b5cf6', accent: '#f0abfc' },
  { id: 'green', name: 'Yashil', primary: '#86efac', strong: '#22c55e', accent: '#fde68a' },
  { id: 'orange', name: 'To‘q sariq', primary: '#fdba74', strong: '#f97316', accent: '#fda4af' },
]

function loadTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    return themes.some((theme) => theme.id === savedTheme) ? savedTheme : themes[0].id
  } catch (error) {
    console.error('Rang sozlamasini o‘qib bo‘lmadi:', error)
    return themes[0].id
  }
}

function loadColorMode() {
  try {
    return localStorage.getItem(COLOR_MODE_STORAGE_KEY) === 'day' ? 'day' : 'night'
  } catch (error) {
    console.error('Rang rejimini o‘qib bo‘lmadi:', error)
    return 'night'
  }
}

function loadGameState() {
  const now = Date.now()
  try {
    const saved = JSON.parse(localStorage.getItem(GAME_STATE_KEY) ?? 'null')
    if (!saved || typeof saved !== 'object') {
      return { score: 0, hearts: MAX_HEARTS, nextHeartRefillAt: now + HEART_REFILL_INTERVAL }
    }

    const score = Number.isFinite(saved.score) ? Math.max(0, saved.score) : 0
    const hearts = Number.isFinite(saved.hearts) ? Math.min(MAX_HEARTS, Math.max(0, saved.hearts)) : MAX_HEARTS
    let nextHeartRefillAt = Number.isFinite(saved.nextHeartRefillAt)
      ? saved.nextHeartRefillAt
      : now + HEART_REFILL_INTERVAL
    let availableHearts = hearts

    if (now >= nextHeartRefillAt) {
      const refillCount = Math.floor((now - nextHeartRefillAt) / HEART_REFILL_INTERVAL) + 1
      availableHearts = Math.min(MAX_HEARTS, hearts + refillCount * HEARTS_PER_REFILL)
      nextHeartRefillAt += refillCount * HEART_REFILL_INTERVAL
    }

    return { score, hearts: availableHearts, nextHeartRefillAt }
  } catch (error) {
    console.error('O‘yin ma’lumotlarini saqlashdan o‘qib bo‘lmadi:', error)
    return { score: 0, hearts: MAX_HEARTS, nextHeartRefillAt: now + HEART_REFILL_INTERVAL }
  }
}

const initialWords = [
  { id: 1, korean: '사과', meaning: 'olma', example: '사과를 먹어요.', level: 'A1' },
  { id: 2, korean: '학교', meaning: 'maktab', example: '학교에 가요.', level: 'A1' },
  { id: 3, korean: '친구', meaning: 'doʻst', example: '친구와 같이 공부해요.', level: 'A1' },
  { id: 4, korean: '책', meaning: 'kitob', example: '책을 읽어요.', level: 'A1' },
  { id: 5, korean: '물', meaning: 'suv', example: '물을 마셔요.', level: 'A1' },
  { id: 6, korean: '배우다', meaning: 'oʻrganmoq', example: '한국어를 배우고 있어요.', level: 'A2' },
  { id: 7, korean: '도시', meaning: 'shahar', example: '도시가 매우 커요.', level: 'A2' },
  { id: 8, korean: '여행', meaning: 'sayohat', example: '여행을 좋아해요.', level: 'A2' },
  { id: 9, korean: '집', meaning: 'uy', example: '집에서 쉬어요.', level: 'A1' },
  { id: 10, korean: '한국', meaning: 'Koreya', example: '한국 음식을 좋아해요.', level: 'A1' },
  { id: 11, korean: '학생', meaning: 'talaba', example: '학생이 공부해요.', level: 'A2' },
  { id: 12, korean: '음식', meaning: 'taom', example: '한국 음식이 맛있어요.', level: 'A2' },
  { id: 13, korean: '시간', meaning: 'vaqt', example: '시간이 없어요.', level: 'A1' },
  { id: 14, korean: '날씨', meaning: 'ob-havo', example: '오늘 날씨가 좋아요.', level: 'A1' },
  { id: 15, korean: '사람', meaning: 'odam', example: '사람이 많아요.', level: 'A1' },
  { id: 16, korean: '가방', meaning: 'sumka', example: '가방을 들고 가요.', level: 'A1' },
  { id: 17, korean: '우산', meaning: 'soyabon', example: '비가 와서 우산이 필요해요.', level: 'A1' },
  { id: 18, korean: '병원', meaning: 'shifoxona', example: '병원에 가야 해요.', level: 'A2' },
  { id: 19, korean: '연필', meaning: 'qalam', example: '연필로 써요.', level: 'A1' },
  { id: 20, korean: '컴퓨터', meaning: 'kompyuter', example: '컴퓨터를 사용해요.', level: 'A2' },
  { id: 21, korean: '강아지', meaning: 'kuchuk', example: '강아지가 귀여워요.', level: 'A1' },
  { id: 22, korean: '고양이', meaning: 'mushuk', example: '고양이가 잠을 자요.', level: 'A1' },
  { id: 23, korean: '아침', meaning: 'ertalab', example: '아침에 일어나요.', level: 'A1' },
  { id: 24, korean: '저녁', meaning: 'kechqurun', example: '저녁에 밥을 먹어요.', level: 'A1' },
  { id: 25, korean: '하루', meaning: 'kun', example: '하루가 짧아요.', level: 'A2' },
  { id: 26, korean: '주말', meaning: 'dam olish kuni', example: '주말에 여행을 가요.', level: 'A1' },
  { id: 27, korean: '문제', meaning: 'muammo', example: '문제를 풀어요.', level: 'A2' },
  { id: 28, korean: '답', meaning: 'javob', example: '정답을 찾았어요.', level: 'A2' },
  { id: 29, korean: '시험', meaning: 'imtihon', example: '시험이 어려워요.', level: 'A2' },
  { id: 30, korean: '점수', meaning: 'ball', example: '점수가 올랐어요.', level: 'A2' },
  { id: 31, korean: '운동', meaning: 'jismoniy mashq', example: '운동을 좋아해요.', level: 'A1' },
  { id: 32, korean: '운동장', meaning: 'sport maydonchasi', example: '운동장에서 축구해요.', level: 'A2' },
  { id: 33, korean: '음악', meaning: 'musiqa', example: '음악을 듣고 싶어요.', level: 'A1' },
  { id: 34, korean: '영화', meaning: 'film', example: '영화를 봐요.', level: 'A1' },
  { id: 35, korean: '텔레비전', meaning: 'televizor', example: '텔레비전을 봐요.', level: 'A1' },
  { id: 36, korean: '전화', meaning: 'telefon', example: '친구에게 전화를 해요.', level: 'A1' },
  { id: 37, korean: '메시지', meaning: 'xabar', example: '메시지를 보냈어요.', level: 'A2' },
  { id: 38, korean: '지도', meaning: 'xarita', example: '지도를 봐요.', level: 'A2' },
  { id: 39, korean: '시장', meaning: 'bozor', example: '시장에서 과일을 사요.', level: 'A1' },
  { id: 40, korean: '은행', meaning: 'bank', example: '은행에 갔어요.', level: 'A2' },
  { id: 41, korean: '길', meaning: 'yoʻl', example: '길을 잘못 들어갔어요.', level: 'A1' },
  { id: 42, korean: '마을', meaning: 'qishloq', example: '마을이 조용해요.', level: 'A2' },
  { id: 43, korean: '바다', meaning: 'dengiz', example: '바다를 보고 싶어요.', level: 'A1' },
  { id: 44, korean: '산', meaning: 'togʻ', example: '산에 올라가요.', level: 'A1' },
  { id: 45, korean: '구름', meaning: 'bulut', example: '구름이 많아요.', level: 'A1' },
  { id: 46, korean: '비', meaning: 'yomgʻir', example: '비가 옵니다.', level: 'A1' },
  { id: 47, korean: '눈', meaning: 'qor', example: '눈이 많이 왔어요.', level: 'A1' },
  { id: 48, korean: '바람', meaning: 'shamol', example: '바람이 강해요.', level: 'A1' },
  { id: 49, korean: '가을', meaning: 'kuz', example: '가을에 단풍이 예뻐요.', level: 'A1' },
  { id: 50, korean: '봄', meaning: 'bahor', example: '봄이 왔어요.', level: 'A1' },
  { id: 51, korean: '여름', meaning: 'yoz', example: '여름이 더워요.', level: 'A1' },
  { id: 52, korean: '겨울', meaning: 'qish', example: '겨울에는 눈이 와요.', level: 'A1' },
  { id: 53, korean: '선생님', meaning: 'o‘qituvchi', example: '선생님이 설명해 주세요.', level: 'A1' },
  { id: 54, korean: '교수', meaning: 'professor', example: '교수님께 질문해요.', level: 'A2' },
  { id: 55, korean: '기숙사', meaning: 'talabalar turar joyi', example: '기숙사에 살아요.', level: 'A2' },
  { id: 56, korean: '도서관', meaning: 'kutubxona', example: '도서관에서 공부해요.', level: 'A2' },
  { id: 57, korean: '식당', meaning: 'restoran', example: '식당에서 점심을 먹어요.', level: 'A1' },
  { id: 58, korean: '카페', meaning: 'kofe uyi', example: '카페에서 커피를 마셔요.', level: 'A1' },
  { id: 59, korean: '버스', meaning: 'avtobus', example: '버스로 학교에 가요.', level: 'A1' },
  { id: 60, korean: '지하철', meaning: 'metro', example: '지하철을 타고 가요.', level: 'A1' },
  { id: 61, korean: '자동차', meaning: 'avtomobil', example: '자동차를 운전해요.', level: 'A1' },
  { id: 62, korean: '비행기', meaning: 'samolyot', example: '비행기로 여행해요.', level: 'A2' },
  { id: 63, korean: '열쇠', meaning: 'kalit', example: '열쇠를 잃어버렸어요.', level: 'A2' },
  { id: 64, korean: '휴대폰', meaning: 'mobil telefon', example: '휴대폰을 확인해요.', level: 'A1' },
  { id: 65, korean: '사진', meaning: 'rasm', example: '사진을 찍어요.', level: 'A1' },
  { id: 66, korean: '노래', meaning: 'qoʻshiq', example: '노래를 좋아해요.', level: 'A1' },
  { id: 67, korean: '춤', meaning: 'raqs', example: '춤을 추는 것을 좋아해요.', level: 'A1' },
  { id: 68, korean: '재미', meaning: 'qiziqarlilik, zavq', example: '영화가 재미있어요.', level: 'A1' },
  { id: 69, korean: '슬픔', meaning: 'qaygʻu', example: '슬픔이 느껴져요.', level: 'A2' },
  { id: 70, korean: '기분', meaning: 'kayfiyat', example: '오늘 기분이 좋아요.', level: 'A1' },
  { id: 71, korean: '소리', meaning: 'ovoz', example: '소리가 커요.', level: 'A1' },
  { id: 72, korean: '색', meaning: 'rang', example: '좋은 색을 골라요.', level: 'A1' },
  { id: 73, korean: '빨강', meaning: 'qizil', example: '빨간색이 예뻐요.', level: 'A1' },
  { id: 74, korean: '파랑', meaning: 'koʻk', example: '파란색 옷을 입어요.', level: 'A1' },
  { id: 75, korean: '초록', meaning: 'yashil', example: '초록색 잎이 있어요.', level: 'A1' },
  { id: 76, korean: '하늘', meaning: 'osmon', example: '하늘이 파랗습니다.', level: 'A1' },
  { id: 77, korean: '달', meaning: 'oy', example: '달이 밝아요.', level: 'A1' },
  { id: 78, korean: '별', meaning: 'yulduz', example: '별을 봤어요.', level: 'A1' },
  { id: 79, korean: '모두', meaning: 'hamma', example: '모두 함께 와요.', level: 'A1' },
  { id: 80, korean: '같다', meaning: 'bir xil boʻlmoq, oʻxshash boʻlmoq', example: '우리 생각이 같아요.', level: 'A1' },
  { id: 81, korean: '다르다', meaning: 'farq qilmoq, boshqacha boʻlmoq', example: '우리 생각은 달라요.', level: 'A2' },
  { id: 82, korean: '크다', meaning: 'katta', example: '집이 커요.', level: 'A1' },
  { id: 83, korean: '작다', meaning: 'kichik', example: '이 책은 작아요.', level: 'A1' },
  { id: 84, korean: '좋다', meaning: 'yaxshi', example: '이 음식이 좋아요.', level: 'A1' },
  { id: 85, korean: '나쁘다', meaning: 'yomon', example: '날씨가 나빠요.', level: 'A1' },
  { id: 86, korean: '쉽다', meaning: 'oson', example: '이 문제는 쉬워요.', level: 'A1' },
  { id: 87, korean: '어렵다', meaning: 'qiyin', example: '한국어가 어려워요.', level: 'A1' },
  { id: 88, korean: '배고프다', meaning: 'qorni och boʻlmoq', example: '배가 고파요.', level: 'A1' },
  { id: 89, korean: '아프다', meaning: 'ogʻrimoq, betob boʻlmoq', example: '머리가 아파요.', level: 'A1' },
  { id: 90, korean: '피곤하다', meaning: 'charchagan, toliqqan boʻlmoq', example: '오늘 피곤해요.', level: 'A1' },
  { id: 91, korean: '웃다', meaning: 'kulmoq', example: '친구와 웃어요.', level: 'A1' },
  { id: 92, korean: '울다', meaning: 'yigʻlamoq', example: '슬퍼서 울었어요.', level: 'A1' },
  { id: 93, korean: '걷다', meaning: 'yurmoq', example: '공원에서 걸어요.', level: 'A1' },
  { id: 94, korean: '달리다', meaning: 'yugurmoq', example: '아침에 달려요.', level: 'A1' },
  { id: 95, korean: '읽다', meaning: 'oʻqimoq', example: '책을 읽어요.', level: 'A1' },
  { id: 96, korean: '쓰다', meaning: 'yozmoq', example: '일기를 써요.', level: 'A1' },
  { id: 97, korean: '듣다', meaning: 'tinglamoq', example: '음악을 들어요.', level: 'A1' },
  { id: 98, korean: '보다', meaning: 'koʻrmoq', example: '영화를 봐요.', level: 'A1' },
  { id: 99, korean: '먹다', meaning: 'yeymoq', example: '밥을 먹어요.', level: 'A1' },
  { id: 100, korean: '마시다', meaning: 'ichmoq', example: '물을 마셔요.', level: 'A1' },
  { id: 101, korean: '바나나', meaning: 'banan', example: '바나나를 먹어요.', level: 'A1', category: 'Mevalar' },
  { id: 102, korean: '포도', meaning: 'uzum', example: '포도가 달아요.', level: 'A1', category: 'Mevalar' },
  { id: 103, korean: '딸기', meaning: 'qulupnay', example: '딸기를 좋아해요.', level: 'A1', category: 'Mevalar' },
  { id: 104, korean: '배', meaning: 'nok', example: '배를 샀어요.', level: 'A1', category: 'Mevalar' },
  { id: 105, korean: '당근', meaning: 'sabzi', example: '당근을 요리에 넣어요.', level: 'A1', category: 'Sabzavotlar' },
  { id: 106, korean: '감자', meaning: 'kartoshka', example: '감자를 삶아요.', level: 'A1', category: 'Sabzavotlar' },
  { id: 107, korean: '양파', meaning: 'piyoz', example: '양파를 썰어요.', level: 'A1', category: 'Sabzavotlar' },
  { id: 108, korean: '오이', meaning: 'bodring', example: '오이를 먹어요.', level: 'A1', category: 'Sabzavotlar' },
  { id: 109, korean: '축구', meaning: 'futbol', example: '친구와 축구를 해요.', level: 'A1', category: 'Sport' },
  { id: 110, korean: '농구', meaning: 'basketbol', example: '농구를 좋아해요.', level: 'A1', category: 'Sport' },
  { id: 111, korean: '수영', meaning: 'suzish', example: '수영을 배워요.', level: 'A1', category: 'Sport' },
  { id: 112, korean: '선수', meaning: 'sportchi', example: '선수가 운동해요.', level: 'A2', category: 'Sport' },
  { id: 113, korean: '의사', meaning: 'shifokor', example: '의사가 환자를 만나요.', level: 'A1', category: 'Kasblar' },
  { id: 114, korean: '요리사', meaning: 'oshpaz', example: '요리사가 음식을 만들어요.', level: 'A1', category: 'Kasblar' },
  { id: 115, korean: '경찰관', meaning: 'politsiyachi', example: '경찰관이 길을 안내해요.', level: 'A2', category: 'Kasblar' },
  { id: 116, korean: '회사원', meaning: 'idora xodimi', example: '회사원이 회사에 가요.', level: 'A2', category: 'Kasblar' },
  { id: 117, korean: '빵', meaning: 'non', example: '빵과 우유를 먹어요.', level: 'A1', category: 'Taomlar' },
  { id: 118, korean: '우유', meaning: 'sut', example: '우유를 마셔요.', level: 'A1', category: 'Taomlar' },
  { id: 119, korean: '밥', meaning: 'guruch / ovqat', example: '저녁에 밥을 먹어요.', level: 'A1', category: 'Taomlar' },
  { id: 120, korean: '김치', meaning: 'kimchi', example: '김치가 매워요.', level: 'A1', category: 'Taomlar' },
]

const reviewedWordCorrections = new Map([
  [21, { meaning: 'kuchuk' }],
  [32, { meaning: 'sport maydonchasi' }],
  [44, { example: '산에 올라가요.' }],
  [68, { meaning: 'qiziqarlilik, zavq' }],
  [69, { meaning: 'qaygʻu' }],
  [73, { example: '빨간색이 예뻐요.' }],
  [74, { example: '파란색 옷을 입어요.' }],
  [80, { meaning: 'bir xil boʻlmoq, oʻxshash boʻlmoq', example: '우리 생각이 같아요.' }],
  [81, { meaning: 'farq qilmoq, boshqacha boʻlmoq', example: '우리 생각은 달라요.' }],
  [87, { example: '한국어가 어려워요.' }],
  [88, { meaning: 'qorni och boʻlmoq' }],
  [89, { meaning: 'ogʻrimoq, betob boʻlmoq' }],
  [90, { meaning: 'charchagan, toliqqan boʻlmoq' }],
  [92, { meaning: 'yigʻlamoq' }],
  [93, { example: '공원에서 걸어요.' }],
])

const wordCategories = [
  'Hammasi', 'Mevalar', 'Sabzavotlar', 'Sport', 'Kasblar', 'Taomlar',
  "Maktab va o'qish", 'Oila va odamlar', 'Uy va buyumlar', 'Hayvonlar',
  'Tabiat va fasllar', 'Transport', 'Joylar', 'Aloqa va texnologiya',
  'Vaqt va kundalik hayot', "Fe'llar", 'Sifatlar', 'Boshqa',
]

const quizDifficulties = [
  { id: 'easy', label: 'Oson so‘zlar', points: 1 },
  { id: 'medium', label: 'O‘rta so‘zlar', points: 2 },
  { id: 'hard', label: 'Qiyin so‘zlar', points: 3 },
]

const initialCategoryIds = {
  'Mevalar': [1],
  'Sport': [31, 32, 67, 93, 94],
  'Kasblar': [53, 54],
  'Taomlar': [5, 12, 24, 57, 58],
  "Maktab va o'qish": [2, 4, 11, 19, 27, 28, 29, 30, 55, 56, 95, 96],
  'Oila va odamlar': [3, 15],
  'Uy va buyumlar': [9, 16, 17, 63],
  'Hayvonlar': [21, 22],
  'Tabiat va fasllar': [14, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 76, 77, 78],
  'Transport': [59, 60, 61, 62],
  'Joylar': [7, 10, 18, 39, 40, 41, 42],
  'Aloqa va texnologiya': [20, 33, 34, 35, 36, 37, 38, 64, 65],
  'Vaqt va kundalik hayot': [13, 23, 25, 26],
  "Fe'llar": [6, 91, 92, 95, 96, 97, 98, 99, 100],
  'Sifatlar': [68, 69, 70, 71, 72, 73, 74, 75, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
}

const categorizedWords = [
  ...initialWords.map((word) => ({
    ...word,
    category: word.category ?? wordCategories.find((category) => initialCategoryIds[category]?.includes(word.id)) ?? 'Boshqa',
    difficulty: word.difficulty ?? (word.level === 'A2' ? 'medium' : 'easy'),
  })),
  ...advancedWords,
]

const topikTranslations = [
  ['저는 학생입니다.', 'Men o‘quvchiman.'],
  ['오늘은 날씨가 좋습니다.', 'Bugun ob-havo yaxshi.'],
  ['아침에 빵과 우유를 먹어요.', 'Ertalab non va sut yeyman.'],
  ['동생은 지금 학교에 있어요.', 'Ukam hozir maktabda.'],
  ['저녁에 친구를 만날 거예요.', 'Kechqurun do‘stim bilan uchrashaman.'],
  ['한국어 책을 읽고 있습니다.', 'Koreys tili kitobini o‘qiyapman.'],
  ['우리 집은 역에서 가까워요.', 'Uyimiz bekatga yaqin.'],
  ['주말에는 보통 집에서 쉬어요.', 'Dam olish kunlari odatda uyda dam olaman.'],
  ['물을 많이 마셔야 합니다.', 'Ko‘p suv ichish kerak.'],
  ['저는 매일 버스로 회사에 갑니다.', 'Men har kuni avtobusda ishga boraman.'],
  ['가방 안에 책이 세 권 있어요.', 'Sumkaning ichida uchta kitob bor.'],
  ['어머니는 시장에서 과일을 사셨어요.', 'Onam bozordan meva sotib oldilar.'],
  ['지금 몇 시예요?', 'Hozir soat necha?'],
  ['오늘은 도서관에서 공부할 거예요.', 'Bugun kutubxonada o‘qiyman.'],
  ['제 동생은 음악을 좋아해요.', 'Ukam musiqa yoqtiradi.'],
  ['창문을 열어 주세요.', 'Iltimos, derazani ochib bering.'],
  ['비가 와서 우산을 가져왔어요.', 'Yomg‘ir yog‘ayotgani uchun soyabon olib keldim.'],
  ['저는 매운 음식을 잘 못 먹어요.', 'Men achchiq ovqatni yaxshi yeya olmayman.'],
  ['친구와 공원에서 산책했어요.', 'Do‘stim bilan bog‘da sayr qildim.'],
  ['일요일에는 가게가 문을 닫아요.', 'Yakshanba kuni do‘kon yopiq bo‘ladi.'],
  ['새 신발을 사고 싶어요.', 'Yangi oyoq kiyim sotib olmoqchiman.'],
  ['한국에서 겨울을 보내고 싶어요.', 'Qishni Koreyada o‘tkazmoqchiman.'],
  ['저는 매일 아침 일찍 일어납니다.', 'Men har kuni ertalab erta turaman.'],
  ['친구가 생일 선물을 줬어요.', 'Do‘stim tug‘ilgan kun sovg‘asini berdi.'],
  ['식당에서 김치찌개를 주문했어요.', 'Restoranda kimchi sho‘rva buyurtma qildim.'],
  ['이 버스는 시청 앞에 멈춰요.', 'Bu avtobus shahar hokimiyati oldida to‘xtaydi.'],
  ['한국어 수업은 세 시에 시작해요.', 'Koreys tili darsi soat uchda boshlanadi.'],
  ['저는 사진 찍는 것을 좋아합니다.', 'Men suratga olishni yoqtiraman.'],
  ['오늘 저녁에 가족과 같이 식사해요.', 'Bugun kechqurun oilam bilan birga ovqatlanaman.'],
  ['방이 조금 좁지만 깨끗해요.', 'Xona biroz tor, lekin toza.'],
  ['아버지는 지금 신문을 읽고 계세요.', 'Dadam hozir gazeta o‘qiyaptilar.'],
  ['비행기 표를 인터넷으로 예약했어요.', 'Samolyot chiptasini internet orqali band qildim.'],
  ['이 옷은 너무 비싸서 안 샀어요.', 'Bu kiyim juda qimmat bo‘lgani uchun olmadim.'],
  ['저는 커피보다 차를 더 좋아해요.', 'Men qahvadan ko‘ra choyni ko‘proq yoqtiraman.'],
  ['약을 먹고 푹 쉬세요.', 'Dorini ichib, yaxshilab dam oling.'],
  ['학교 앞에서 친구를 기다리고 있어요.', 'Maktab oldida do‘stimni kutyapman.'],
  ['한국에는 사계절이 있습니다.', 'Koreyada to‘rt fasl bor.'],
  ['봄에는 꽃이 많이 핍니다.', 'Bahorda ko‘p gullar ochiladi.'],
  ['저녁을 먹은 후에 운동해요.', 'Kechki ovqatdan keyin mashq qilaman.'],
  ['제 방에는 책상이 하나 있어요.', 'Xonamda bitta yozuv stoli bor.'],
  ['토요일에 영화를 보러 갈까요?', 'Shanba kuni kino ko‘rgani boramizmi?'],
  ['저는 한국 음식을 만들어 봤어요.', 'Men koreys taomini tayyorlab ko‘rdim.'],
  ['버스 정류장은 어디에 있어요?', 'Avtobus bekati qayerda?'],
  ['이 길로 곧장 가면 우체국이 나와요.', 'Shu yo‘ldan to‘g‘ri borsangiz, pochta chiqadi.'],
  ['오늘은 일이 많아서 늦게 끝나요.', 'Bugun ish ko‘p, shuning uchun kech tugataman.'],
  ['저는 지난주에 부산에 다녀왔어요.', 'O‘tgan hafta Pusanga borib keldim.'],
  ['동생은 아직 숙제를 안 했어요.', 'Ukam hali uy vazifasini qilmadi.'],
  ['이 사과는 달고 맛있어요.', 'Bu olma shirin va mazali.'],
  ['저는 아침마다 신문을 읽어요.', 'Men har kuni ertalab gazeta o‘qiyman.'],
  ['친구에게 편지를 썼습니다.', 'Do‘stimga xat yozdim.'],
  ['주말에 할머니 댁에 갈 거예요.', 'Dam olish kunlari buvimnikiga boraman.'],
  ['저는 한국어를 배우고 있어요.', 'Men koreys tilini o‘rganyapman.'],
  ['점심시간에 같이 밥을 먹어요.', 'Tushlik vaqtida birga ovqatlanamiz.'],
  ['문을 열면 오른쪽에 화장실이 있어요.', 'Eshikdan kirsangiz, o‘ng tomonda hojatxona bor.'],
  ['오늘은 어제보다 따뜻해요.', 'Bugun kechagidan ko‘ra iliqroq.'],
  ['저는 매일 한 시간씩 걸어요.', 'Men har kuni bir soatdan piyoda yuraman.'],
  ['이 책은 아주 재미있어서 빨리 읽었어요.', 'Bu kitob juda qiziqarli bo‘lgani uchun tez o‘qidim.'],
  ['친구가 아파서 병원에 갔어요.', 'Do‘stim kasal bo‘lgani uchun shifoxonaga bordi.'],
  ['저는 매운 음식을 좋아하지 않아요.', 'Men achchiq ovqatni yoqtirmayman.'],
  ['다음 주에 시험이 있어서 공부해야 해요.', 'Keyingi hafta imtihon bor, shuning uchun o‘qishim kerak.'],
  ['여기에서 사진을 찍어도 돼요?', 'Bu yerda suratga olsam bo‘ladimi?'],
  ['저는 보통 밤 열한 시에 자요.', 'Men odatda kechasi soat o‘n birda uxlayman.'],
  ['시장에서 옷과 신발을 샀어요.', 'Bozordan kiyim va oyoq kiyim sotib oldim.'],
  ['우리 가족은 모두 다섯 명이에요.', 'Bizning oilamiz jami besh kishidan iborat.'],
  ['날씨가 추우니까 따뜻하게 입으세요.', 'Havo sovuq, shuning uchun issiq kiyinib oling.'],
  ['저는 주말마다 수영을 배워요.', 'Men har dam olish kunlari suzishni o‘rganaman.'],
  ['이 지하철은 서울역에 갑니다.', 'Bu metro Seul vokzaliga boradi.'],
  ['한국 친구에게 전화했어요.', 'Koreyalik do‘stimga telefon qildim.'],
  ['오늘은 시간이 없어서 택시를 탔어요.', 'Bugun vaqtim yo‘qligi uchun taksiga mindim.'],
  ['책상 위에 휴대전화가 있어요.', 'Yozuv stoli ustida mobil telefon bor.'],
  ['저는 매일 저녁에 샤워를 해요.', 'Men har kuni kechqurun dush qabul qilaman.'],
  ['이 식당은 음식이 맛있고 값도 싸요.', 'Bu restoranning taomlari mazali, narxi ham arzon.'],
  ['친구와 약속이 있어서 먼저 가야 해요.', 'Do‘stim bilan uchrashuvim bor, shuning uchun oldin ketishim kerak.'],
  ['한국에 온 지 일 년이 됐어요.', 'Koreyaga kelganimga bir yil bo‘ldi.'],
  ['저는 주스를 마시고 싶어요.', 'Men sharbat ichmoqchiman.'],
  ['아이들이 운동장에서 축구를 하고 있어요.', 'Bolalar sport maydonida futbol o‘ynashyapti.'],
  ['저는 어제 새 가방을 샀어요.', 'Men kecha yangi sumka sotib oldim.'],
  ['이 근처에 은행이 있습니까?', 'Shu yaqin atrofda bank bormi?'],
  ['한국어로 이름을 써 주세요.', 'Iltimos, ismingizni koreys tilida yozing.'],
  ['오늘 회의는 오후 두 시부터예요.', 'Bugungi yig‘ilish tushdan keyin soat ikkidan boshlanadi.'],
  ['저는 운동을 하고 나서 물을 마셔요.', 'Men mashq qilgandan keyin suv ichaman.'],
  ['방학에 가족과 여행을 갈 거예요.', 'Ta’tilda oilam bilan sayohatga boraman.'],
  ['이 영화는 슬프지만 정말 아름다워요.', 'Bu film g‘amgin, lekin juda chiroyli.'],
  ['저는 요리를 잘 못하지만 자주 해요.', 'Men yaxshi ovqat pishira olmayman, lekin tez-tez pishiraman.'],
  ['동생은 키가 크고 머리가 짧아요.', 'Ukamning bo‘yi baland va sochi kalta.'],
  ['오늘 숙제가 너무 많아요.', 'Bugun uy vazifasi juda ko‘p.'],
  ['친구가 한국에서 보내 준 선물이에요.', 'Bu do‘stim Koreyadan yuborgan sovg‘a.'],
  ['저는 지하철역에서 내려서 걸어갔어요.', 'Men metro bekatida tushib, piyoda bordim.'],
  ['내일 아침에 일찍 출발할 거예요.', 'Ertaga ertalab erta jo‘nayman.'],
  ['이 가게는 밤 열 시까지 문을 열어요.', 'Bu do‘kon kechasi soat o‘ngacha ochiq bo‘ladi.'],
  ['저는 매일 한국어 단어를 열 개씩 외워요.', 'Men har kuni o‘nta koreyscha so‘z yodlayman.'],
  ['아이가 웃으면서 엄마에게 달려갔어요.', 'Bola kulib, onasining oldiga yugurib bordi.'],
  ['음악을 들으면서 숙제를 했어요.', 'Musiqa tinglab, uy vazifamni qildim.'],
  ['저는 아직 점심을 먹지 않았어요.', 'Men hali tushlik qilmadim.'],
  ['휴대전화가 고장 나서 수리점에 갔어요.', 'Telefonim buzilgani uchun ta’mirlash ustaxonasiga bordim.'],
  ['이번 주 금요일에 친구 결혼식이 있어요.', 'Bu hafta juma kuni do‘stimning to‘yi bor.'],
  ['저는 가족과 함께 살고 있습니다.', 'Men oilam bilan birga yashayman.'],
  ['도서관에서는 조용히 해야 합니다.', 'Kutubxonada tinch turish kerak.'],
  ['비가 그친 후에 산책하러 나갔어요.', 'Yomg‘ir to‘xtagandan keyin sayrga chiqdim.'],
  ['한국어를 잘하고 싶어서 매일 연습해요.', 'Koreys tilini yaxshi bilishni xohlaganim uchun har kuni mashq qilaman.'],
]

const topikExamples = topikTranslations.map(([korean, translation], index) => {
  const distractors = [11, 29, 53]
    .map((offset) => topikTranslations[(index + offset) % topikTranslations.length][1])
  return {
    id: index + 1,
    topic: 'TOPIK I · Tarjima',
    korean,
    options: shuffleList([translation, ...distractors]),
    answer: translation,
    explanation: `Bu gapning o‘zbekcha tarjimasi: “${translation}”`,
  }
})

function shuffleList(items) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function makeChoices(correctWord, allWords) {
  const wrongMeanings = shuffleList(
    [...new Set(
      allWords
        .filter((item) => item.id !== correctWord.id && item.meaning !== correctWord.meaning)
        .map((item) => item.meaning),
    )],
  ).slice(0, 3)

  return shuffleList([...wrongMeanings, correctWord.meaning])
}

function makeGrammarChoices(correctPoint, allPoints) {
  const wrongPatterns = shuffleList(
    [...new Set(allPoints.filter((point) => point.id !== correctPoint.id).map((point) => point.pattern))],
  ).filter((pattern) => pattern !== correctPoint.pattern).slice(0, 3)

  return shuffleList([...wrongPatterns, correctPoint.pattern])
}

function getAuthErrorMessage(error) {
  if (error.code === 'auth/unauthorized-domain' || error.code === 'auth/unauthorized-display') {
    return '⚠️ Bu sayt Firebase\'ning ruxsat etilgan domenlariga qo\'shilmagan.\n\n📋 Firebase Console → Authentication → Settings → Authorized domains bo\'limiga kiring va domenni qo\'shing.'
  }
  if (error.code === 'auth/operation-not-allowed') {
    return '⚠️ Firebase\'da Google orqali kirish yoqilmagan.\n\n📋 Firebase Console → Authentication → Sign-in method bo\'limiga kiring va Google ni yoqing.'
  }
  if (error.code === 'auth/popup-closed-by-user') return 'Kirish oynasi yopildi. Qayta urinib ko\'ring.'
  if (error.code === 'auth/popup-blocked') return 'Brauzer kirish oynasini to\'sdi. Qalqib chiquvchi oynalarga ruxsat bering yoki qurilmada davom eting.'
  if (error.code === 'auth/network-request-failed') {
    return '⚠️ Internet aloqasi uzildi.\n\n📋 Internetni tekshiring va qayta urinib ko\'ring.'
  }
  if (error.code === 'auth/account-exists-with-different-credential') {
    return '⚠️ Bu email bilan boshqa akkaunt mavjud.\n\n📋 Avval o\'sha akkauntga kiring yoki qurilmada davom eting.'
  }
  if (error.code === 'auth/invalid-api-key') {
    return '⚠️ Firebase sozlamalarida xatolik.\n\n📋 Firebase API kaliti noto\'g\'ri. Loyiha sozlamalarini tekshiring.'
  }
  if (error.code === 'auth/invalid-origin') {
    return '⚠️ Bu sayt Firebase\'da ruxsat etilmagan.\n\n📋 Firebase Console → Authentication → Settings → Authorized domains bo\'limiga kiring.'
  }
  return 'Google akkaunt bilan kirib bo\'lmadi. Internet aloqasini tekshiring yoki qurilmada davom eting.'
}

function LoginScreen({ error, busy, onGoogleSignIn, onLocalContinue, onProfileReady, skipProfile }) {
  const [step, setStep] = useState(skipProfile ? 2 : 1)
  const [pf, setPf] = useState({ firstName: '', lastName: '', bio: '', avatar: '' })
  const [av, setAv] = useState('')
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { setAv(ev.target.result); setPf((p) => ({ ...p, avatar: ev.target.result })) }
    reader.readAsDataURL(file)
  }
  const handleSubmit = () => {
    setStep(2)
    if (onProfileReady) onProfileReady(pf)
  }
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <img className="auth-logo" src="/topik-play-logo.svg" alt="Topik Play" />
        <p className="eyebrow">Koreys tilini o'rganish o'yini</p>
        {step === 1 ? (
          <>
            <h1 style={{fontSize:'1.3rem',marginBottom:'4px'}}>Profil (ixtiyoriy)</h1>
            <p className="settings-description">Ismingizni kiriting yoki o'tkazib yuboring.</p>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <div className="profile-setup-avatar" style={{marginBottom:'12px'}}>
              <label className="profile-setup-avatar-label">
                {av ? <img className="profile-setup-avatar-img" src={av} alt="Avatar" /> : <div className="profile-setup-avatar-placeholder"><span>📷</span><span>Rasm yuklash</span></div>}
                <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
              </label>
            </div>
            <input type="text" className="auth-input" placeholder="Ism" value={pf.firstName} onChange={(e) => setPf((p) => ({ ...p, firstName: e.target.value }))} />
            <input type="text" className="auth-input" placeholder="Familiya" value={pf.lastName} onChange={(e) => setPf((p) => ({ ...p, lastName: e.target.value }))} />
            <textarea className="auth-input auth-textarea" placeholder="Bio (ixtiyoriy)" rows={2} value={pf.bio} onChange={(e) => setPf((p) => ({ ...p, bio: e.target.value }))} />
            <button type="button" className="primary-btn auth-next-btn" onClick={handleSubmit}>Davom etish →</button>
            <button type="button" className="ghost-btn" style={{fontSize:'0.85rem'}} onClick={() => { setStep(2); if(onProfileReady) onProfileReady(pf) }}>O'tkazib yuborish</button>
          </>
        ) : (
          <>
            {pf.firstName && (
              <div className="profile-setup-preview">
                {av ? <img className="profile-setup-preview-avatar" src={av} alt="Avatar" /> : <div className="profile-setup-preview-avatar-placeholder">{(pf.firstName || 'U')[0].toUpperCase()}</div>}
                <h2>{pf.firstName} {pf.lastName}</h2>
                {pf.bio && <p className="profile-setup-preview-bio">{pf.bio}</p>}
              </div>
            )}
            <h1 style={{fontSize:'1.3rem',marginBottom:'4px'}}>Kirish usuli</h1>
            <p className="settings-description">Google bilan sinxronlang yoki qurilmada saqlang.</p>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="button" className="google-sign-in-btn" onClick={onGoogleSignIn} disabled={busy}>
              <span className="google-mark" aria-hidden="true">G</span>
              {busy ? 'Kirilmoqda...' : 'Google orqali kirish'}
            </button>
            <p className="auth-help-note" style={{fontSize:'0.75rem',color:'var(--muted)',marginTop:'8px',textAlign:'center',marginBottom:'0'}}>
              Google orqali kirish ishlamasa, "Qurilmada davom etish" tugmasini bosing.
            </p>
            <div className="auth-divider"><span>yoki</span></div>
            <button type="button" className="local-sign-in-btn" onClick={onLocalContinue} disabled={busy}>
              Qurilmada davom etish
            </button>
            <p className="auth-privacy-note">Qurilmada saqlangan ma'lumotlar boshqa qurilmalarda ochilmaydi.</p>
            {!skipProfile && <button type="button" className="ghost-btn auth-back-btn" onClick={() => setStep(1)}>← Orqaga</button>}
          </>
        )}
      </section>
    </main>
  )
}

const PROFILE_STORAGE_KEY = 'topik-play-profile'

function getSavedProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object') return parsed
    }
  } catch (error) {
    console.error('Profilni o\'qib bo\'lmadi:', error)
  }
  return null
}

function App() {
  const [authState, setAuthState] = useState({ loading: true, user: null, error: '' })
  const [signInBusy, setSignInBusy] = useState(false)
  const [localMode, setLocalMode] = useState(() => localStorage.getItem(LOCAL_MODE_STORAGE_KEY) === '1')
  const [pendingProfile, setPendingProfile] = useState(null)
  const savedProfile = getSavedProfile()
  const skipProfile = savedProfile !== null

  useEffect(() => observeAuth(
    (user) => {
      if (user) {
        localStorage.removeItem(LOCAL_MODE_STORAGE_KEY)
        setLocalMode(false)
        // Har doim profilni saqlash - agar profil saqlanmagan bo'lsa, Google'dan olingan ma'lumotlar bilan yaratish
        const profileToSave = pendingProfile || savedProfile
        const firstName = profileToSave?.firstName || user.displayName?.split(' ')[0] || ''
        const lastName = profileToSave?.lastName || user.displayName?.split(' ').slice(1).join(' ') || ''
        const bio = profileToSave?.bio || ''
        const avatar = profileToSave?.avatar || user.photoURL || ''
        saveProfile(user.uid, {
          firstName,
          lastName,
          bio,
          avatar,
          email: user.email,
        }).catch((e) => console.error('Saqlash xatosi:', e))
        setPendingProfile(null)
      }
      setAuthState({ loading: false, user, error: '' })
    },
    (error) => {
      console.error('Kirish holatini tekshirib bo\'lmadi:', error)
      setAuthState({
        loading: false,
        user: null,
        error: 'Firebase bilan bog\'lanib bo\'lmadi. Internet va Firebase sozlamalarini tekshiring.',
      })
    },
  ), [])

  // Redirect natijasini tekshirish
  useEffect(() => {
    getRedirectResultAuth().then((result) => {
      if (result && result.user) {
        console.log('Redirect orqali kirdi:', result.user.email)
      }
    }).catch((error) => {
      if (error.code !== 'auth/no-auth-event') {
        console.error('Redirect xatosi:', error)
        setAuthState((previous) => ({ ...previous, error: getAuthErrorMessage(error) }))
      }
    })
  }, [])

  const handleGoogleSignIn = async () => {
    setSignInBusy(true)
    localStorage.removeItem(LOCAL_MODE_STORAGE_KEY)
    setLocalMode(false)
    setAuthState((previous) => ({ ...previous, error: '' }))
    try {
      // Avval popup usulini sinaymiz
      await signInWithGooglePopup()
    } catch (error) {
      // Agar popup ishlamasa, redirect usuliga o'tamiz
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/unauthorized-display') {
        console.log('Popup ishlamadi, redirect ishlatilmoqda...')
        try {
          await signInWithGoogleRedirect()
          // Redirect dan keyin sahifa qayta yuklanadi
          setAuthState((previous) => ({ ...previous, error: '' }))
        } catch (redirectError) {
          console.error('Google orqali kirib bo\'lmadi:', redirectError)
          setAuthState((previous) => ({ ...previous, error: getAuthErrorMessage(redirectError) }))
        }
      } else {
        console.error('Google orqali kirib bo\'lmadi:', error)
        setAuthState((previous) => ({ ...previous, error: getAuthErrorMessage(error) }))
      }
    } finally {
      setSignInBusy(false)
    }
  }

  const handleLocalContinue = () => {
    localStorage.setItem(LOCAL_MODE_STORAGE_KEY, '1')
    setLocalMode(true)
    const profileToSave = pendingProfile || savedProfile
    if (profileToSave) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileToSave))
    }
    setPendingProfile(null)
  }

  const handleChooseLoginMode = () => {
    localStorage.removeItem(LOCAL_MODE_STORAGE_KEY)
    setLocalMode(false)
  }

  const handleProfileReady = (profileData) => {
    setPendingProfile(profileData)
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData))
  }

  if (authState.loading) {
    return (
      <main className="auth-shell">
        <img className="auth-logo" src="/topik-play-logo.svg" alt="Topik Play" />
        <p className="settings-description">Kirish holati tekshirilmoqda...</p>
      </main>
    )
  }

  if (!authState.user && !localMode) {
    return (
      <LoginScreen
        error={authState.error}
        busy={signInBusy}
        onGoogleSignIn={handleGoogleSignIn}
        onLocalContinue={handleLocalContinue}
        onProfileReady={handleProfileReady}
        skipProfile={skipProfile}
      />
    )
  }

  return <LearningApp user={authState.user} localMode={localMode} onChooseLoginMode={handleChooseLoginMode} pendingProfile={pendingProfile || savedProfile} />
}

function LearningApp({ user, localMode, onChooseLoginMode, pendingProfile }) {
  const [cloudReady, setCloudReady] = useState(localMode)
  const [cloudError, setCloudError] = useState('')
  const [words, setWords] = useState(loadWords)
  const [customGrammar, setCustomGrammar] = useState(loadCustomGrammar)
  const [mistakes, setMistakes] = useState(loadMistakes)
  const [mainSection, setMainSection] = useState('topik1')
  const [activeTab, setActiveTab] = useState('quiz')
  const [topikTwoSkill, setTopikTwoSkill] = useState('vocabulary')
  const [topikTwoDay, setTopikTwoDay] = useState(1)
  const [topik2LugatPage, setTopik2LugatPage] = useState('list')
  const [topik2LugatQuizIndex, setTopik2LugatQuizIndex] = useState(0)
  const [topik2LugatQuizScore, setTopik2LugatQuizScore] = useState(0)
  const [topik2LugatQuizAnswered, setTopik2LugatQuizAnswered] = useState(null)
  const [topik2LugatQuizOptions, setTopik2LugatQuizOptions] = useState([])
  const [selectedTheme, setSelectedTheme] = useState(loadTheme)
  const [colorMode, setColorMode] = useState(loadColorMode)
  const [settings, setSettings] = useState(loadSettings)
  const [selectedCategory, setSelectedCategory] = useState('Hammasi')
  const [grammarLevel, setGrammarLevel] = useState('Hammasi')
  const [grammarSearch, setGrammarSearch] = useState('')
  const [learningProgress, setLearningProgress] = useState(loadLearningProgress)
  const [grammarForm, setGrammarForm] = useState({
    pattern: '',
    title: '',
    explanation: '',
    example: '',
    translation: '',
    level: 'Boshlang‘ich',
  })
  const [grammarFormError, setGrammarFormError] = useState('')
  const [form, setForm] = useState({ korean: '', meaning: '', example: '', category: 'Boshqa', difficulty: 'easy' })
  const [wordSearch, setWordSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [gameState, setGameState] = useState(loadGameState)
  const [clockNow, setClockNow] = useState(0)
  const [speechMessage, setSpeechMessage] = useState('')
  // Profile state
  const [myProfile, setMyProfile] = useState(null)
  const [profileEditing, setProfileEditing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', bio: '', avatar: '' })
  // Chat state
  const [chatUsers, setChatUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [chatTab, setChatTab] = useState('friends')
  const [selectedChatUser, setSelectedChatUser] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef(null)
  const localDataRef = useRef({
    words,
    customGrammar,
    mistakes,
    learningProgress,
    gameState,
    selectedTheme,
    colorMode,
    settings,
  })
  const {
    selectedDifficulty,
    currentIndex,
    selectedAnswer,
    isAnswered,
    quizMode,
    mistakeIndex,
    grammarIndex,
    grammarQuizLevel,
    grammarSelectedAnswer,
    grammarAnswered,
    topikIndex,
    topikListenIndex,
    topikMode,
    topikSelected,
    topikAnswered,
    topikListenInput,
    topikListenAnswered,
    topikListenCorrect,
  } = learningProgress
  const allGrammar = useMemo(() => [...grammarPoints, ...customGrammar], [customGrammar])
  const quizGrammar = useMemo(
    () => allGrammar.filter((point) => grammarQuizLevel === 'Hammasi' || point.level === grammarQuizLevel),
    [allGrammar, grammarQuizLevel],
  )
  const currentGrammarQuestion = quizGrammar[grammarIndex % quizGrammar.length] || null

  const quizWords = useMemo(
    () => words.filter((word) => word.difficulty === selectedDifficulty),
    [words, selectedDifficulty],
  )
  const currentWord = quizWords[currentIndex % quizWords.length] || null
  const mistakeQueue = useMemo(
    () => mistakes.filter((item) => item.type === 'word'
      ? words.some((word) => word.id === item.id)
      : allGrammar.some((point) => point.id === item.id)),
    [mistakes, words, allGrammar],
  )
  const currentMistake = mistakeQueue[mistakeIndex % mistakeQueue.length] || null
  const activeWord = quizMode === 'mistakes'
    ? currentMistake?.type === 'word' ? words.find((word) => word.id === currentMistake.id) ?? null : null
    : quizMode === 'words' ? currentWord : null
  const activeQuizDifficulty = quizDifficulties.find((difficulty) => difficulty.id === activeWord?.difficulty) ?? quizDifficulties[0]
  const activeWordPool = useMemo(
    () => (activeWord ? words.filter((word) => word.difficulty === activeWord.difficulty) : []),
    [words, activeWord],
  )
  const activeWordOptions = useMemo(
    () => (activeWord ? makeChoices(activeWord, activeWordPool) : []),
    [activeWord, activeWordPool],
  )
  const activeGrammarQuestion = quizMode === 'mistakes'
    ? currentMistake?.type === 'grammar' ? allGrammar.find((point) => point.id === currentMistake.id) ?? null : null
    : quizMode === 'grammar' ? currentGrammarQuestion : null
  const activeGrammarOptions = useMemo(
    () => (activeGrammarQuestion ? makeGrammarChoices(activeGrammarQuestion, allGrammar) : []),
    [activeGrammarQuestion, allGrammar],
  )

  const activeTopikIndex = topikMode === 'listen' ? topikListenIndex : topikIndex
  const currentTopik = topikExamples[activeTopikIndex % topikExamples.length] || null
  const theme = themes.find((item) => item.id === selectedTheme) ?? themes[0]
  const todayCompleted = settings.dailyCompleted
  const filteredWords = words.filter((word) => {
    const matchesCategory = selectedCategory === 'Hammasi' || word.category === selectedCategory
    const query = wordSearch.trim().toLocaleLowerCase()
    const matchesSearch = !query || `${word.korean} ${word.meaning}`.toLocaleLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
  const filteredGrammar = allGrammar.filter((point) => {
    const matchesLevel = grammarLevel === 'Hammasi' || point.level === grammarLevel
    const query = grammarSearch.trim().toLocaleLowerCase()
    const matchesSearch = !query || `${point.pattern} ${point.title} ${point.explanation} ${point.example} ${point.translation}`
      .toLocaleLowerCase()
      .includes(query)
    return matchesLevel && matchesSearch
  })

  useEffect(() => {
    try {
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
    } catch (error) {
      console.error('O‘yin ma’lumotlarini qurilmada saqlab bo‘lmadi:', error)
    }
  }, [gameState])

  useEffect(() => {
    try {
      localStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(words))
    } catch (error) {
      console.error('Lug‘atni qurilmada saqlab bo‘lmadi:', error)
    }
  }, [words])

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_GRAMMAR_STORAGE_KEY, JSON.stringify(customGrammar))
    } catch (error) {
      console.error('Grammatikani qurilmada saqlab bo‘lmadi:', error)
    }
  }, [customGrammar])

  useEffect(() => {
    try {
      localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes))
    } catch (error) {
      console.error('Xatolarni qurilmada saqlab bo‘lmadi:', error)
    }
  }, [mistakes])

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(learningProgress))
    } catch (error) {
      console.error('O‘rganish jarayonini qurilmada saqlab bo‘lmadi:', error)
    }
  }, [learningProgress])

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, selectedTheme)
    } catch (error) {
      console.error('Rang sozlamasini qurilmada saqlab bo‘lmadi:', error)
    }
  }, [selectedTheme])

  useEffect(() => {
    document.documentElement.dataset.colorMode = colorMode
    try {
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode)
    } catch (error) {
      console.error('Rang rejimini qurilmada saqlab bo‘lmadi:', error)
    }
  }, [colorMode])

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error('Sozlamalarni qurilmada saqlab bo‘lmadi:', error)
    }
  }, [settings])

  useEffect(() => {
    if (!user) return undefined

    let active = true

    const syncInitialData = async () => {
      try {
        const saved = await loadAccountData(user.uid)
        if (!active) return

        if (saved) {
          if (!Array.isArray(saved.words) || !Array.isArray(saved.customGrammar) || !Array.isArray(saved.mistakes)) {
            throw new Error('Akkauntdagi o‘quv ma’lumotlari formati noto‘g‘ri.')
          }
          setWords(saved.words)
          setCustomGrammar(saved.customGrammar)
          setMistakes(saved.mistakes)
          if (saved.learningProgress && typeof saved.learningProgress === 'object') setLearningProgress(saved.learningProgress)
          if (saved.gameState && typeof saved.gameState === 'object') setGameState(saved.gameState)
          if (themes.some((item) => item.id === saved.selectedTheme)) setSelectedTheme(saved.selectedTheme)
          if (saved.colorMode === 'day' || saved.colorMode === 'night') setColorMode(saved.colorMode)
          if (saved.settings && typeof saved.settings === 'object') setSettings(saved.settings)
          localStorage.setItem(ACCOUNT_DATA_OWNER_KEY, user.uid)
        } else {
          const savedOwner = localStorage.getItem(ACCOUNT_DATA_OWNER_KEY)
          const firstAccountData = !savedOwner || savedOwner === user.uid
          const initialData = firstAccountData
            ? localDataRef.current
            : {
                words: categorizedWords,
                customGrammar: [],
                mistakes: [],
                learningProgress: createDefaultLearningProgress(),
                gameState: { score: 0, hearts: MAX_HEARTS, nextHeartRefillAt: Date.now() + HEART_REFILL_INTERVAL },
                selectedTheme: themes[0].id,
                colorMode: 'night',
                settings: { ...defaultSettings, dailyDate: getLocalDateKey() },
              }
          if (!firstAccountData) {
            setWords(initialData.words)
            setCustomGrammar(initialData.customGrammar)
            setMistakes(initialData.mistakes)
            setLearningProgress(initialData.learningProgress)
            setGameState(initialData.gameState)
            setSelectedTheme(initialData.selectedTheme)
            setColorMode(initialData.colorMode)
            setSettings(initialData.settings)
          }
          await saveAccountData(user.uid, initialData)
          if (!active) return
          localStorage.setItem(ACCOUNT_DATA_OWNER_KEY, user.uid)
        }

        setCloudReady(true)
      } catch (error) {
        console.error('Akkaunt ma’lumotlarini sinxronlab bo‘lmadi:', error)
        if (active) {
          setCloudError('Bulutli saqlash ulanmagan. Firebase Firestore bazasi va xavfsizlik qoidalarini sozlang.')
          setCloudReady(true)
        }
      }
    }

    syncInitialData()
    return () => {
      active = false
    }
  }, [user])

  useEffect(() => {
    if (!user || !cloudReady) return undefined

    const timeout = window.setTimeout(() => {
      saveAccountData(user.uid, {
        words,
        customGrammar,
        mistakes,
        learningProgress,
        gameState,
        selectedTheme,
        colorMode,
        settings,
      }).then(() => {
        setCloudError('')
      }).catch((error) => {
        console.error('Akkaunt ma’lumotlarini saqlab bo‘lmadi:', error)
        setCloudError('Ma’lumotlarni Google akkauntingizga saqlab bo‘lmadi. Firestore sozlamalarini tekshiring.')
      })
    }, 700)

    return () => window.clearTimeout(timeout)
  }, [cloudReady, user, words, customGrammar, mistakes, learningProgress, gameState, selectedTheme, colorMode, settings])

  useEffect(() => {
    const previousFontSize = document.documentElement.style.fontSize
    document.documentElement.style.fontSize = { small: '14px', medium: '16px', large: '18px' }[settings.textSize]
    return () => {
      document.documentElement.style.fontSize = previousFontSize
    }
  }, [settings.textSize])

  useEffect(() => {
    const updateLives = () => {
      const now = Date.now()
      const today = new Date(now).toLocaleDateString('sv-SE')
      setClockNow(now)
      setSettings((previous) => previous.dailyDate === today
        ? previous
        : { ...previous, dailyDate: today, dailyCompleted: 0 })
      setGameState((previous) => {
        if (now < previous.nextHeartRefillAt) return previous

        const refillCount = Math.floor((now - previous.nextHeartRefillAt) / HEART_REFILL_INTERVAL) + 1
        return {
          ...previous,
          hearts: Math.min(MAX_HEARTS, previous.hearts + refillCount * HEARTS_PER_REFILL),
          nextHeartRefillAt: previous.nextHeartRefillAt + refillCount * HEART_REFILL_INTERVAL,
        }
      })
    }
    updateLives()
    const timer = window.setInterval(updateLives, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  // Load profile data
  useEffect(() => {
    if (!user || localMode) {
      // Load from localStorage for local mode
      const saved = localStorage.getItem('topik-play-profile')
      if (saved) {
        try {
          const p = JSON.parse(saved)
          setMyProfile(p)
          setProfileForm(p)
        } catch (e) { /* ignore */ }
      }
      return
    }
    loadProfile(user.uid).then((p) => {
      if (p) {
        setMyProfile(p)
        setProfileForm(p)
      } else if (pendingProfile) {
        setMyProfile(pendingProfile)
        setProfileForm(pendingProfile)
      }
    }).catch(() => { /* ignore */ })
  }, [user, localMode, pendingProfile])

  // Listen to chat users (only Google users)
  useEffect(() => {
    if (!user || localMode) return
    const unsubscribe = listenToProfiles((profiles) => {
      setChatUsers(profiles)
    })
    return () => unsubscribe()
  }, [user, localMode])

  // Listen to friends
  useEffect(() => {
    if (!user || localMode) return
    const unsubscribe = listenToFriends(user.uid, (friendIds) => {
      setFriends(friendIds)
    })
    return () => unsubscribe()
  }, [user, localMode])

  // Listen to chat messages
  useEffect(() => {
    if (!selectedChatUser || !user || localMode) return
    const chatId = [user.uid, selectedChatUser.id].sort().join('-')
    const unsubscribe = listenToMessages(chatId, (msgs) => {
      setChatMessages(msgs)
    })
    return () => unsubscribe()
  }, [selectedChatUser, user, localMode])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const spendHeart = () => {
    setGameState((previous) => ({ ...previous, hearts: Math.max(0, previous.hearts - 1) }))
  }

  const exchangePointsForHeart = () => {
    setGameState((previous) => {
      if (previous.score < HEART_EXCHANGE_COST || previous.hearts >= MAX_HEARTS) return previous
      return {
        ...previous,
        score: previous.score - HEART_EXCHANGE_COST,
        hearts: previous.hearts + 1,
      }
    })
  }

  const refillCountdown = Math.max(
    0,
    gameState.nextHeartRefillAt - (clockNow || gameState.nextHeartRefillAt - HEART_REFILL_INTERVAL),
  )
  const refillHours = Math.floor(refillCountdown / (60 * 60 * 1000))
  const refillMinutes = Math.floor((refillCountdown % (60 * 60 * 1000)) / (60 * 1000))

  const recordMistake = (type, id) => {
    setMistakes((previous) => previous.some((item) => item.type === type && item.id === id)
      ? previous
      : [...previous, { type, id }])
  }

  const clearMistake = (type, id) => {
    setMistakes((previous) => previous.filter((item) => item.type !== type || item.id !== id))
  }

  const handleSpeak = (text) => {
    if (!settings.speechEnabled) return
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setSpeechMessage('Brauzeringiz koreyscha ovozli talaffuzni qo‘llab-quvvatlamaydi.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ko-KR'
    utterance.rate = settings.speechRate
    utterance.onend = () => setSpeechMessage('')
    utterance.onerror = (event) => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        setSpeechMessage('Ovozli talaffuzni ijro etib bo‘lmadi. Qurilmadagi ovoz sozlamalarini tekshiring.')
        console.error('Koreyscha ovozli talaffuz xatosi:', event.error)
      }
    }
    setSpeechMessage('Koreyscha talaffuz ijro etilmoqda…')
    window.speechSynthesis.speak(utterance)
  }

  // Profile handlers
  const handleSaveProfile = () => {
    setMyProfile({ ...profileForm })
    setProfileEditing(false)
    if (user && !localMode) {
      saveProfile(user.uid, profileForm).catch((e) => console.error('Profile save error:', e))
    } else {
      localStorage.setItem('topik-play-profile', JSON.stringify(profileForm))
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setProfileForm((p) => ({ ...p, avatar: ev.target.result }))
    reader.readAsDataURL(file)
  }

  // Chat handlers
  const handleSendChatMessage = () => {
    if (!chatInput.trim() || !selectedChatUser || !user || localMode) return
    const chatId = [user.uid, selectedChatUser.id].sort().join('-')
    sendMessage(chatId, user.uid, myProfile?.firstName || 'Men', chatInput.trim())
      .then(() => setChatInput(''))
      .catch((e) => console.error('Send message error:', e))
  }

  // Friend handlers
  const handleAddFriend = (profile) => {
    if (!user || localMode) return
    const isAlreadyFriend = friends.some((f) => f.id === profile.id)
    if (isAlreadyFriend) return
    addFriend(user.uid, profile.id).catch((e) => console.error('Add friend error:', e))
  }

  const handleRemoveFriend = (friendId) => {
    if (!user || localMode) return
    removeFriend(user.uid, friendId).catch((e) => console.error('Remove friend error:', e))
  }

  const friendProfiles = useMemo(() => {
    if (!user || localMode) return []
    return chatUsers.filter((u) => u.id !== user.uid && friends.some((f) => f.id === u.id))
  }, [chatUsers, friends, user, localMode])

  const allProfiles = useMemo(() => {
    // Barcha foydalanuvchilar, o'zini bundan chiqarib (faqat Google orqali kirganlar)
    if (!user || localMode) return []
    return chatUsers.filter((u) => u.id !== user.uid)
  }, [chatUsers, user, localMode])

  const handleNextWord = () => {
    if (quizMode === 'mistakes') {
      if (mistakeQueue.length === 0) return
      const answeredCorrectly = isAnswered && selectedAnswer === activeWord?.meaning
      if (answeredCorrectly && currentMistake?.type === 'word') {
        clearMistake('word', currentMistake.id)
      }
      setLearningProgress((previous) => ({
        ...previous,
        mistakeIndex: answeredCorrectly
          ? previous.mistakeIndex
          : (previous.mistakeIndex + 1) % mistakeQueue.length,
        selectedAnswer: null,
        isAnswered: false,
      }))
      return
    }
    if (quizWords.length === 0) return
    setLearningProgress((previous) => ({
      ...previous,
      currentIndex: (previous.currentIndex + 1) % quizWords.length,
      selectedAnswer: null,
      isAnswered: false,
    }))
  }

  const handleDifficultyChange = (difficulty) => {
    setLearningProgress((previous) => ({
      ...previous,
      selectedDifficulty: difficulty,
      currentIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
    }))
  }

  const handleQuizModeChange = (mode) => {
    setLearningProgress((previous) => ({
      ...previous,
      quizMode: mode,
      selectedAnswer: null,
      isAnswered: false,
      grammarSelectedAnswer: null,
      grammarAnswered: false,
    }))
  }

  const handleGrammarQuizLevelChange = (level) => {
    setLearningProgress((previous) => ({
      ...previous,
      grammarQuizLevel: level,
      grammarIndex: 0,
      grammarSelectedAnswer: null,
      grammarAnswered: false,
    }))
  }

  const handleNextGrammarQuestion = () => {
    if (quizMode === 'mistakes') {
      if (mistakeQueue.length === 0) return
      const answeredCorrectly = grammarAnswered && grammarSelectedAnswer === activeGrammarQuestion?.pattern
      if (answeredCorrectly && currentMistake?.type === 'grammar') {
        clearMistake('grammar', currentMistake.id)
      }
      setLearningProgress((previous) => ({
        ...previous,
        mistakeIndex: answeredCorrectly
          ? previous.mistakeIndex
          : (previous.mistakeIndex + 1) % mistakeQueue.length,
        grammarSelectedAnswer: null,
        grammarAnswered: false,
      }))
      return
    }
    if (quizGrammar.length === 0) return
    setLearningProgress((previous) => ({
      ...previous,
      grammarIndex: (previous.grammarIndex + 1) % quizGrammar.length,
      grammarSelectedAnswer: null,
      grammarAnswered: false,
    }))
  }

  const handleAnswer = (choice) => {
    if (isAnswered || !activeWord || gameState.hearts === 0) return

    setLearningProgress((previous) => ({ ...previous, selectedAnswer: choice, isAnswered: true }))

    if (choice === activeWord.meaning) {
      const difficulty = quizDifficulties.find((item) => item.id === activeWord.difficulty) ?? quizDifficulties[0]
      setGameState((previous) => ({ ...previous, score: previous.score + difficulty.points }))
      const answerDate = getLocalDateKey()
      setSettings((previous) => ({
        ...previous,
        dailyDate: answerDate,
        dailyCompleted: (previous.dailyDate === answerDate ? previous.dailyCompleted : 0) + 1,
      }))
      if (quizMode !== 'mistakes') clearMistake('word', activeWord.id)
    } else {
      recordMistake('word', activeWord.id)
      spendHeart()
    }
  }

  const handleGrammarAnswer = (choice) => {
    if (grammarAnswered || !activeGrammarQuestion || gameState.hearts === 0) return

    setLearningProgress((previous) => ({
      ...previous,
      grammarSelectedAnswer: choice,
      grammarAnswered: true,
    }))

    if (choice === activeGrammarQuestion.pattern) {
      setGameState((previous) => ({ ...previous, score: previous.score + 2 }))
      if (quizMode !== 'mistakes') clearMistake('grammar', activeGrammarQuestion.id)
    } else {
      recordMistake('grammar', activeGrammarQuestion.id)
      spendHeart()
    }
  }

  const handleTopikAnswer = (choice) => {
    if (topikAnswered || !currentTopik || gameState.hearts === 0) return

    setLearningProgress((previous) => ({ ...previous, topikSelected: choice, topikAnswered: true }))
    if (choice === currentTopik.answer) {
      setGameState((previous) => ({ ...previous, score: previous.score + 4 }))
    } else {
      spendHeart()
    }
  }

  const handleTopikListeningSubmit = (event) => {
    event.preventDefault()
    if (topikListenAnswered || !currentTopik || gameState.hearts === 0 || !topikListenInput.trim()) return

    const normalizeKorean = (text) => text.normalize('NFC').replace(/[\s\p{P}\p{S}]/gu, '')
    const isCorrect = normalizeKorean(topikListenInput) === normalizeKorean(currentTopik.korean)
    setLearningProgress((previous) => ({
      ...previous,
      topikListenAnswered: true,
      topikListenCorrect: isCorrect,
    }))
    if (isCorrect) {
      setGameState((previous) => ({ ...previous, score: previous.score + 4 }))
    } else {
      spendHeart()
    }
  }

  const handleNextTopikQuestion = () => {
    setLearningProgress((previous) => ({
      ...previous,
      ...(previous.topikMode === 'listen'
        ? { topikListenIndex: (previous.topikListenIndex + 1) % topikExamples.length }
        : { topikIndex: (previous.topikIndex + 1) % topikExamples.length }),
      topikSelected: null,
      topikAnswered: false,
      topikListenInput: '',
      topikListenAnswered: false,
      topikListenCorrect: false,
    }))
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitWord = (event) => {
    event.preventDefault()

    if (!form.korean || !form.meaning) return

    const word = {
      id: editingId ?? Date.now(),
      korean: form.korean.trim(),
      meaning: form.meaning.trim(),
      example: form.example.trim() || 'Yangi soʻz qoʻshildi.',
      level: 'A1',
      category: form.category,
      difficulty: form.difficulty,
    }

    setWords((prev) => {
      const next = editingId ? prev.map((item) => (item.id === editingId ? word : item)) : [...prev, word]
      return next
    })

    setForm({ korean: '', meaning: '', example: '', category: 'Boshqa', difficulty: 'easy' })
    setEditingId(null)
  }

  const handleGrammarFormChange = (event) => {
    const { name, value } = event.target
    setGrammarForm((previous) => ({ ...previous, [name]: value }))
    setGrammarFormError('')
  }

  const handleSubmitGrammar = (event) => {
    event.preventDefault()
    const grammarDetails = Object.fromEntries(
      Object.entries(grammarForm).map(([key, value]) => [key, value.trim()]),
    )
    if (Object.values(grammarDetails).some((value) => !value)) {
      setGrammarFormError('Grammatika qo‘shish uchun barcha maydonlarni to‘ldiring.')
      return
    }
    const point = {
      id: Math.max(Date.now(), ...customGrammar.map((item) => item.id + 1)),
      ...grammarDetails,
      custom: true,
    }
    setCustomGrammar((previous) => [...previous, point])
    setGrammarFormError('')
    setGrammarForm({
      pattern: '',
      title: '',
      explanation: '',
      example: '',
      translation: '',
      level: 'Boshlang‘ich',
    })
  }

  const handleDeleteGrammar = (id) => {
    setCustomGrammar((previous) => previous.filter((point) => point.id !== id))
    setMistakes((previous) => previous.filter((item) => item.type !== 'grammar' || item.id !== id))
    setLearningProgress((previous) => ({
      ...previous,
      grammarIndex: 0,
      grammarSelectedAnswer: null,
      grammarAnswered: false,
    }))
  }

  const handleEdit = (word) => {
    setForm({
      korean: word.korean,
      meaning: word.meaning,
      example: word.example,
      category: word.category,
      difficulty: word.difficulty ?? 'easy',
    })
    setEditingId(word.id)
    setActiveTab('words')
  }

  const handleDelete = (id) => {
    setWords((prev) => prev.filter((item) => item.id !== id))
    setMistakes((previous) => previous.filter((item) => item.type !== 'word' || item.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setForm({ korean: '', meaning: '', example: '', category: 'Boshqa', difficulty: 'easy' })
    }
  }

  if (user && !cloudReady) {
    return (
      <main className="auth-shell">
        <img className="auth-logo" src="/topik-play-logo.svg" alt="Topik Play" />
        <p className="settings-description">Google akkauntingizdagi ma’lumotlar yuklanmoqda...</p>
      </main>
    )
  }

  return (
    <div
      className="app-shell"
      style={{
        '--primary': theme.primary,
        '--primary-strong': theme.strong,
        '--accent': theme.accent,
      }}
    >
      <header className="topbar">
        <div className="brand-row">
          <div>
            <img className="brand-logo" src="/topik-play-logo.svg" alt="Topik Play — Koreys tilini o‘rganish o‘yini" />
          </div>
        </div>
        {cloudError && <p className="account-sync-error" role="alert">{cloudError}</p>}
        {mainSection === 'topik1' && (
          <nav className="nav-tabs" aria-label="TOPIK I bo‘limi">
            <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>
              Test
            </button>
            <button className={activeTab === 'words' ? 'active' : ''} onClick={() => setActiveTab('words')}>
              Lug'at
            </button>
            <button className={activeTab === 'topik' ? 'active' : ''} onClick={() => setActiveTab('topik')}>
              TOPIK
            </button>
            <button className={activeTab === 'grammar' ? 'active' : ''} onClick={() => setActiveTab('grammar')}>
              Grammatika
            </button>
            <button className={activeTab === 'hearts' ? 'active' : ''} onClick={() => setActiveTab('hearts')}>
              Do‘kon
            </button>
          </nav>
        )}
      </header>

      {mainSection === 'topik1' && !['words', 'grammar'].includes(activeTab) && (
        <section className="stats-grid">
          <article className="stat-card accent">
            <span>Ball</span>
            <strong>{gameState.score}</strong>
          </article>
          <article className="stat-card heart-stat">
            <span>Yuraklar</span>
            <strong aria-label={`${gameState.hearts} ta yurak`}>{'❤️'.repeat(gameState.hearts)}{'🖤'.repeat(MAX_HEARTS - gameState.hearts)}</strong>
            <small>{gameState.hearts}/{MAX_HEARTS}</small>
          </article>
        </section>
      )}

      {mainSection === 'topik1' && activeTab === 'quiz' && (
        <main className="panel quiz-panel">
          <div className="quiz-mode-tabs" role="group" aria-label="Test turini tanlang">
            <button
              type="button"
              className={quizMode === 'words' ? 'active' : ''}
              onClick={() => handleQuizModeChange('words')}
              aria-pressed={quizMode === 'words'}
            >
              So‘z testi
            </button>
            <button
              type="button"
              className={quizMode === 'grammar' ? 'active' : ''}
              onClick={() => handleQuizModeChange('grammar')}
              aria-pressed={quizMode === 'grammar'}
            >
              Grammatika testi
            </button>
            <button
              type="button"
              className={quizMode === 'mistakes' ? 'active' : ''}
              onClick={() => handleQuizModeChange('mistakes')}
              aria-pressed={quizMode === 'mistakes'}
            >
              Xatolarim · {mistakeQueue.length}
            </button>
          </div>

          {quizMode === 'words' && (
            <div className="difficulty-tabs" role="group" aria-label="Test qiyinligini tanlang">
              {quizDifficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  type="button"
                  className={`difficulty-btn ${selectedDifficulty === difficulty.id ? 'active' : ''}`}
                  onClick={() => handleDifficultyChange(difficulty.id)}
                >
                  <span>{difficulty.label}</span>
                  <small>{difficulty.points} ball · {words.filter((word) => word.difficulty === difficulty.id).length} ta</small>
                </button>
              ))}
            </div>
          )}

          {activeWord ? (
            <>
              <p className="heart-timer">
                {gameState.hearts === MAX_HEARTS
                  ? `Har ${HEART_REFILL_INTERVAL / (60 * 60 * 1000)} soatda 5 ta yurak yangilanadi.`
                  : `Keyingi 5 ta yurak: ${String(refillHours).padStart(2, '0')}:${String(refillMinutes).padStart(2, '0')} dan so‘ng`}
              </p>
              <div className="progress-row">
                <span>{quizMode === 'mistakes' ? `Xato ${mistakeIndex + 1}/${mistakeQueue.length}` : `So‘z ${currentIndex + 1}/${quizWords.length}`}</span>
                <button type="button" className="ghost-btn" onClick={handleNextWord}>
                  {quizMode === 'mistakes' && isAnswered && selectedAnswer === activeWord.meaning
                    ? 'Keyingisiga o‘tish'
                    : quizMode === 'mistakes' ? 'O‘tkazib yuborish' : 'Keyingisiga o‘tkazib yuborish'}
                </button>
              </div>

              <div className="question-box">
                <p className="label">
                  {quizMode === 'mistakes' ? 'Xato qilingan so‘z' : `Koreyscha so‘z · ${activeQuizDifficulty.label} · ${activeQuizDifficulty.points} ball`}
                </p>
                <div className="pronunciation-row">
                  <h2>{activeWord.korean}</h2>
                  {settings.speechEnabled && (
                    <button
                      type="button"
                      className="pronunciation-btn"
                      onClick={() => handleSpeak(activeWord.korean)}
                      aria-label={`${activeWord.korean} so‘zini talaffuz qilish`}
                      title="Koreyscha talaffuzni eshitish"
                    >
                      🔊 Eshitish
                    </button>
                  )}
                </div>
                {isAnswered && (
                  <p className={`result ${selectedAnswer === activeWord.meaning ? 'success' : 'error'}`}>
                    {selectedAnswer === activeWord.meaning
                      ? `To'g'ri! Bu so'z - ${activeWord.meaning} (+${activeQuizDifficulty.points} ball)`
                      : `Noto'g'ri. To'g'ri javob: ${activeWord.meaning} · 1 yurak yo'qotdingiz.`}
                  </p>
                )}
              </div>

              <div className="answer-grid">
                {activeWordOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`answer-btn ${selectedAnswer === option ? 'selected' : ''} ${
                      isAnswered && option === activeWord.meaning ? 'correct' : ''
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered || gameState.hearts === 0}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="explanation-box">
                  {activeWord.example && <p><strong>Masalan:</strong> {activeWord.example}</p>}
                  <button type="button" className="primary-btn" onClick={handleNextWord}>
                    {quizMode === 'mistakes' && selectedAnswer === activeWord.meaning
                      ? 'Xatodan chiqarib keyingisiga o‘tish'
                      : 'Keyingi so‘zga o‘tish'}
                  </button>
                </div>
              )}
              {speechMessage && <p className="speech-status" role="status">{speechMessage}</p>}
              {gameState.hearts === 0 && !isAnswered && (
                <p className="empty-words">Yuraklaringiz tugadi. Do‘kondan ballga yurak almashtiring yoki yangilanishini kuting.</p>
              )}
            </>
          ) : activeGrammarQuestion ? (
            <>
              <p className="heart-timer">
                {gameState.hearts === MAX_HEARTS
                  ? `Har ${HEART_REFILL_INTERVAL / (60 * 60 * 1000)} soatda 5 ta yurak yangilanadi.`
                  : `Keyingi 5 ta yurak: ${String(refillHours).padStart(2, '0')}:${String(refillMinutes).padStart(2, '0')} dan so‘ng`}
              </p>
              <div className="grammar-levels" role="group" aria-label="Grammatika test darajasi">
                {['Hammasi', 'Boshlang‘ich', 'O‘rta'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`category-btn ${grammarQuizLevel === level ? 'active' : ''}`}
                    onClick={() => handleGrammarQuizLevelChange(level)}
                    aria-pressed={grammarQuizLevel === level}
                  >
                    {level} · {allGrammar.filter((point) => level === 'Hammasi' || point.level === level).length}
                  </button>
                ))}
              </div>
              <div className="progress-row">
                <span>{quizMode === 'mistakes' ? `Xato ${mistakeIndex + 1}/${mistakeQueue.length}` : `Grammatika ${grammarIndex + 1}/${quizGrammar.length}`}</span>
                <button type="button" className="ghost-btn" onClick={handleNextGrammarQuestion}>
                  {quizMode === 'mistakes' && grammarAnswered && grammarSelectedAnswer === activeGrammarQuestion.pattern
                    ? 'Keyingisiga o‘tish'
                    : quizMode === 'mistakes' ? 'O‘tkazib yuborish' : 'Keyingisiga o‘tish'}
                </button>
              </div>
              <div className="question-box">
                <p className="label">{quizMode === 'mistakes' ? 'Xato qilingan grammatika' : 'Qaysi koreyscha qoida bu ma’noga mos?'}</p>
                <h2 className="grammar-quiz-title">{activeGrammarQuestion.title}</h2>
                <p className="grammar-quiz-description">{activeGrammarQuestion.explanation}</p>
                {grammarAnswered && (
                  <p className={`result ${grammarSelectedAnswer === activeGrammarQuestion.pattern ? 'success' : 'error'}`}>
                    {grammarSelectedAnswer === activeGrammarQuestion.pattern
                      ? 'To‘g‘ri! Siz 2 ball oldingiz.'
                      : `Noto‘g‘ri. To‘g‘ri javob: ${activeGrammarQuestion.pattern} · 1 yurak yo‘qotdingiz.`}
                  </p>
                )}
              </div>
              <div className="answer-grid">
                {activeGrammarOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`answer-btn ${grammarSelectedAnswer === option ? 'selected' : ''} ${
                      grammarAnswered && option === activeGrammarQuestion.pattern ? 'correct' : ''
                    }`}
                    onClick={() => handleGrammarAnswer(option)}
                    disabled={grammarAnswered || gameState.hearts === 0}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {grammarAnswered && (
                <div className="explanation-box">
                  <p><strong>Misol:</strong> <span lang="ko">{activeGrammarQuestion.example}</span></p>
                  <p>{activeGrammarQuestion.translation}</p>
                  {settings.speechEnabled && (
                    <button type="button" className="pronunciation-btn" onClick={() => handleSpeak(activeGrammarQuestion.example)}>
                      🔊 Misolni eshitish
                    </button>
                  )}
                  <button type="button" className="primary-btn" onClick={handleNextGrammarQuestion}>
                    {quizMode === 'mistakes' && grammarSelectedAnswer === activeGrammarQuestion.pattern
                      ? 'Xatodan chiqarib keyingisiga o‘tish'
                      : 'Keyingi savol'}
                  </button>
                </div>
              )}
              {speechMessage && <p className="speech-status" role="status">{speechMessage}</p>}
              {gameState.hearts === 0 && !grammarAnswered && (
                <p className="empty-words">Yuraklaringiz tugadi. Do‘kondan ballga yurak almashtiring yoki yangilanishini kuting.</p>
              )}
            </>
          ) : quizMode === 'mistakes' ? (
            <div className="mistakes-empty">
              <h2>Hozircha xato javoblar yo‘q</h2>
              <p>Xato topilgan so‘z va grammatikalar shu yerda qayta mashq qilish uchun chiqadi.</p>
            </div>
          ) : quizMode === 'words' ? (
            <p className="empty-words">Bu darajada hozircha so‘z yo‘q. Lug‘at bo‘limidan so‘z qo‘shing yoki boshqa darajani tanlang.</p>
          ) : (
            <p className="empty-words">Bu darajada grammatika topilmadi.</p>
          )}
        </main>
      )}

      {mainSection === 'topik1' && activeTab === 'topik' && currentTopik && (
        <main className="panel topik-panel">
          <div className="topik-header">
            <span className="topik-tag">TOPIK I mashq</span>
            <span className="topik-counter">Savol {activeTopikIndex % topikExamples.length + 1}/{topikExamples.length}</span>
          </div>

          <div className="quiz-mode-tabs topik-mode-tabs" role="group" aria-label="TOPIK mashq turini tanlang">
            <button
              type="button"
              className={topikMode === 'translate' ? 'active' : ''}
              onClick={() => setLearningProgress((previous) => ({ ...previous, topikMode: 'translate' }))}
              aria-pressed={topikMode === 'translate'}
            >
              Tarjima testi
            </button>
            <button
              type="button"
              className={topikMode === 'listen' ? 'active' : ''}
              onClick={() => setLearningProgress((previous) => ({ ...previous, topikMode: 'listen' }))}
              aria-pressed={topikMode === 'listen'}
            >
              Eshitib yozish
            </button>
          </div>

          {topikMode === 'translate' ? (
            <>
              <div className="topik-question-box">
                <p className="label">{currentTopik.topic}</p>
                <h3>Quyidagi gapning o‘zbekcha tarjimasini toping</h3>
                <div className="pronunciation-row">
                  <p className="topik-korean">{currentTopik.korean}</p>
                  {settings.speechEnabled && (
                    <button
                      type="button"
                      className="pronunciation-btn"
                      onClick={() => handleSpeak(currentTopik.korean)}
                      aria-label="TOPIK gapini koreyscha talaffuz qilish"
                      title="Koreyscha talaffuzni eshitish"
                    >
                      🔊 Eshitish
                    </button>
                  )}
                </div>
              </div>
              <div className="answer-grid topik-grid">
                {currentTopik.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`answer-btn ${topikSelected === option ? 'selected' : ''} ${
                      topikAnswered && option === currentTopik.answer ? 'correct' : ''
                    }`}
                    onClick={() => handleTopikAnswer(option)}
                    disabled={topikAnswered || gameState.hearts === 0}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {gameState.hearts === 0 && !topikAnswered && (
                <p className="empty-words">Yuraklaringiz tugadi. Do‘kondan ballga yurak almashtiring yoki yangilanishini kuting.</p>
              )}

              {topikAnswered && (
                <div className="explanation-box">
                  <p className={`result ${topikSelected === currentTopik.answer ? 'success' : 'error'}`}>
                    {topikSelected === currentTopik.answer
                      ? "To'g'ri! Siz 4 ball oldingiz."
                      : `Noto'g'ri. To'g'ri javob: ${currentTopik.answer} · 1 yurak yo'qotdingiz.`}
                  </p>
                  <p>
                    <strong>Izoh:</strong> {currentTopik.explanation}
                  </p>
                  <button type="button" className="primary-btn" onClick={handleNextTopikQuestion}>
                    Keyingi savol
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="topik-question-box listening-question">
                <p className="label">{currentTopik.topic} · Eshitib yozish</p>
                <h3>Koreyscha gapni eshiting va yozing</h3>
                {settings.speechEnabled ? (
                  <button
                    type="button"
                    className="pronunciation-btn listening-play-btn"
                    onClick={() => handleSpeak(currentTopik.korean)}
                  >
                    🔊 Gapni eshitish
                  </button>
                ) : (
                  <p className="empty-words">Eshitish uchun Sozlamalarda koreyscha talaffuzni yoqing.</p>
                )}
                <p className="listening-hint">Maslahat: gapni qayta eshitish uchun tugmani yana bosing.</p>
              </div>
              {speechMessage && <p className="speech-status" role="status">{speechMessage}</p>}
              <form className="listening-form" onSubmit={handleTopikListeningSubmit}>
                <label htmlFor="topik-listening-answer">Eshitgan koreyscha gapingiz</label>
                <textarea
                  id="topik-listening-answer"
                  value={topikListenInput}
                  onChange={(event) => setLearningProgress((previous) => ({
                    ...previous,
                    topikListenInput: event.target.value,
                  }))}
                  placeholder="예: 저는 한국어를 공부해요."
                  lang="ko"
                  rows="3"
                  autoComplete="off"
                  spellCheck="false"
                  disabled={topikListenAnswered}
                  required
                />
                {!topikListenAnswered && (
                  <button type="submit" className="primary-btn" disabled={gameState.hearts === 0 || !settings.speechEnabled}>
                    Javobni tekshirish
                  </button>
                )}
              </form>
              {topikListenAnswered && (
                <div className="explanation-box">
                  <p className={`result ${topikListenCorrect ? 'success' : 'error'}`}>
                    {topikListenCorrect
                      ? 'To‘g‘ri! Siz 4 ball oldingiz.'
                      : 'Noto‘g‘ri javob. 1 yurak yo‘qotdingiz.'}
                  </p>
                  <p><strong>To‘g‘ri matn:</strong> <span lang="ko">{currentTopik.korean}</span></p>
                  <p>{currentTopik.answer}</p>
                  <button type="button" className="primary-btn" onClick={handleNextTopikQuestion}>
                    Keyingi savol
                  </button>
                </div>
              )}
              {gameState.hearts === 0 && !topikListenAnswered && (
                <p className="empty-words">Yuraklaringiz tugadi. Do‘kondan ballga yurak almashtiring yoki yangilanishini kuting.</p>
              )}
            </>
          )}
        </main>
      )}

      {mainSection === 'topik1' && activeTab === 'grammar' && (
        <main className="panel grammar-panel">
          <div className="grammar-header">
            <div>
              <p className="eyebrow">Koreys tili qoidalari</p>
              <h2>Grammatika qoidalari</h2>
              <p className="settings-description">Qoidani tanlab, qisqa izoh va koreyscha misolni ko‘ring.</p>
            </div>
            <span className="topik-counter">{filteredGrammar.length}/{allGrammar.length} qoida</span>
          </div>
          <form className="grammar-form" onSubmit={handleSubmitGrammar}>
            <h3>Yangi grammatika qo‘shish</h3>
            <div className="grammar-form-grid">
              <input
                name="pattern"
                value={grammarForm.pattern}
                onChange={handleGrammarFormChange}
                placeholder="Koreyscha qoida, masalan: (으)면"
                aria-label="Koreyscha grammatika qoidasi"
                required
              />
              <input
                name="title"
                value={grammarForm.title}
                onChange={handleGrammarFormChange}
                placeholder="Qoida nomi"
                aria-label="Grammatika nomi"
                required
              />
              <textarea
                name="explanation"
                value={grammarForm.explanation}
                onChange={handleGrammarFormChange}
                placeholder="O‘zbekcha izohi"
                aria-label="Grammatika izohi"
                rows="2"
                required
              />
              <input
                name="example"
                value={grammarForm.example}
                onChange={handleGrammarFormChange}
                placeholder="Koreyscha misol"
                aria-label="Koreyscha misol"
                required
              />
              <input
                name="translation"
                value={grammarForm.translation}
                onChange={handleGrammarFormChange}
                placeholder="Misolning o‘zbekcha tarjimasi"
                aria-label="Misol tarjimasi"
                required
              />
              <select name="level" value={grammarForm.level} onChange={handleGrammarFormChange} aria-label="Grammatika darajasi">
                <option value="Boshlang‘ich">Boshlang‘ich</option>
                <option value="O‘rta">O‘rta</option>
              </select>
            </div>
            {grammarFormError && <p className="form-error" role="alert">{grammarFormError}</p>}
            <button type="submit" className="primary-btn">Grammatikani qo‘shish</button>
          </form>
          <input
            className="word-search"
            type="search"
            value={grammarSearch}
            onChange={(event) => setGrammarSearch(event.target.value)}
            placeholder="Qoida yoki misol bo‘yicha qidirish"
            aria-label="Grammatika qidirish"
          />
          <div className="grammar-levels" role="group" aria-label="Grammatika darajasini tanlang">
            {['Hammasi', 'Boshlang‘ich', 'O‘rta'].map((level) => (
              <button
                key={level}
                type="button"
                className={`category-btn ${grammarLevel === level ? 'active' : ''}`}
                onClick={() => setGrammarLevel(level)}
                aria-pressed={grammarLevel === level}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="grammar-list">
            {filteredGrammar.length > 0 ? filteredGrammar.map((point) => (
              <details key={point.id} className="grammar-item">
                <summary>
                  <span className="grammar-number">{point.id}</span>
                  <span className="grammar-item-title">
                    <strong>{point.pattern}</strong>
                    <span>{point.title}</span>
                  </span>
                  <span className="grammar-level">{point.level}</span>
                </summary>
                <div className="grammar-content">
                  <p>{point.explanation}</p>
                  <p className="grammar-example" lang="ko">{point.example}</p>
                  <p className="grammar-translation">{point.translation}</p>
                  {settings.speechEnabled && (
                    <button
                      type="button"
                      className="pronunciation-btn"
                      onClick={() => handleSpeak(point.example)}
                      aria-label={`${point.example} misolini talaffuz qilish`}
                    >
                      🔊 Misolni eshitish
                    </button>
                  )}
                  {point.custom && (
                    <button
                      type="button"
                      className="ghost-btn danger"
                      onClick={() => handleDeleteGrammar(point.id)}
                    >
                      Grammatikani o‘chirish
                    </button>
                  )}
                </div>
              </details>
            )) : (
              <p className="empty-words">Bu qidiruv bo‘yicha grammatika topilmadi.</p>
            )}
          </div>
          {speechMessage && <p className="speech-status" role="status">{speechMessage}</p>}
        </main>
      )}

      {mainSection === 'topik1' && activeTab === 'hearts' && (
        <main className="panel hearts-panel">
          <div>
            <p className="eyebrow">Yuraklar do‘koni</p>
            <h2>Ballni yurakka almashtiring</h2>
            <p className="heart-shop-balance">Hozir: ❤️ {gameState.hearts}/{MAX_HEARTS} · ⭐ {gameState.score} ball</p>
          </div>
          <article className="heart-offer">
            <span className="heart-offer-icon" aria-hidden="true">❤️</span>
            <div>
              <strong>1 ta yurak</strong>
              <p>{HEART_EXCHANGE_COST} ball evaziga</p>
            </div>
            <button
              type="button"
              className="primary-btn"
              onClick={exchangePointsForHeart}
              disabled={gameState.score < HEART_EXCHANGE_COST || gameState.hearts >= MAX_HEARTS}
            >
              {gameState.hearts >= MAX_HEARTS ? 'Yuraklar to‘la' : `${HEART_EXCHANGE_COST} ballga almashtirish`}
            </button>
          </article>
          <p className="heart-timer">
            Har 12 soatda 5 ta yurak yangilanadi.
            {gameState.hearts < MAX_HEARTS && ` Keyingi yangilanish: ${String(refillHours).padStart(2, '0')}:${String(refillMinutes).padStart(2, '0')}.`}
          </p>
        </main>
      )}

      {mainSection === 'topik2' && (
        <main className="panel topik-two-panel">
          <p className="eyebrow">Ikkinchi daraja</p>
          <h1>TOPIK II ga tayyorgarlik</h1>
          <nav className="topik-two-skills" aria-label="TOPIK II ko‘nikmalari">
            <button
              type="button"
              className={topikTwoSkill === 'vocabulary' ? 'active' : ''}
              onClick={() => setTopikTwoSkill('vocabulary')}
              aria-pressed={topikTwoSkill === 'vocabulary'}
            >
              어휘 · Lug‘at <span>30 kun · 990 ta so‘z</span>
            </button>
            <button
              type="button"
              className={topikTwoSkill === 'sigi' ? 'active' : ''}
              onClick={() => setTopikTwoSkill('sigi')}
              aria-pressed={topikTwoSkill === 'sigi'}
            >
              쓰기 <span>Yozish</span>
            </button>
            <button
              type="button"
              className={topikTwoSkill === 'ilgi' ? 'active' : ''}
              onClick={() => setTopikTwoSkill('ilgi')}
              aria-pressed={topikTwoSkill === 'ilgi'}
            >
              읽기 · Ilgi <span>O‘qish</span>
            </button>
            <button
              type="button"
              className={topikTwoSkill === 'titki' ? 'active' : ''}
              onClick={() => setTopikTwoSkill('titki')}
              aria-pressed={topikTwoSkill === 'titki'}
            >
              듣기 · Titki <span>Eshitish</span>
            </button>
            <button
              type="button"
              className={topikTwoSkill === 'topikWords' ? 'active' : ''}
              onClick={() => { setTopikTwoSkill('topikWords'); setTopik2LugatPage('list'); }}
              aria-pressed={topikTwoSkill === 'topikWords'}
            >
              📝 TOPIK so'zlar <span>{topik2Lugat.length} ta</span>
            </button>
          </nav>
          {topikTwoSkill === 'vocabulary'
            ? (
                <section className="topik-two-vocabulary">
                  <div className="topik-two-days" aria-label="30 kunlik TOPIK II lug‘at">
                    {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={topikTwoDay === day ? 'active' : ''}
                        onClick={() => setTopikTwoDay(day)}
                        aria-pressed={topikTwoDay === day}
                      >
                        <strong>{day}-kun</strong>
                        <span>33 ta so‘z</span>
                      </button>
                    ))}
                  </div>
                  <section className="topik-two-day-content" aria-live="polite">
                    <h2>{topikTwoDay}-kun · 33 ta lug‘at</h2>
                    {topikTwoDay === 1
                      ? (
                          <ol className="topik-two-word-list">
                            {TOPIK_TWO_DAY_ONE_WORDS.map((word, index) => (
                              <li key={word.korean}>
                                <span className="topik-two-word-number">{String(index + 1).padStart(2, '0')}</span>
                                <strong lang="ko">{word.korean}</strong>
                                <span>{word.meaning}</span>
                              </li>
                            ))}
                          </ol>
                        )
                      : <p className="settings-description">Bu kunning lug‘atlari PDF yuborilgach qo‘shiladi.</p>}
                  </section>
                </section>
              )
            : topikTwoSkill === 'topikWords'
            ? (
                <section className="topik-two-topik-words" aria-live="polite">
                  <h2>📝 TOPIKda ko'p uchraydigan so'zlar</h2>
                  <p className="settings-description">{topik2Lugat.length} ta so'z · Test va eshitish mashqlari</p>
                  <nav className="topik-words-tabs">
                    <button type="button" className={topik2LugatPage === 'list' ? 'active' : ''} onClick={() => setTopik2LugatPage('list')}>📖 Ro'yxat</button>
                    <button type="button" className={topik2LugatPage === 'quiz' ? 'active' : ''} onClick={() => {
                      setTopik2LugatPage('quiz')
                      setTopik2LugatQuizIndex(0)
                      setTopik2LugatQuizScore(0)
                      setTopik2LugatQuizAnswered(null)
                      const shuffled = [...topik2Lugat].sort(() => Math.random() - 0.5).slice(0, 20)
                      const options = shuffled.map((target) => {
                        const wrongPool = topik2Lugat.filter((w) => w.id !== target.id)
                        const wrong = []
                        const usedIndices = new Set()
                        while (wrong.length < 3 && usedIndices.size < wrongPool.length) {
                          const randIndex = Math.floor(Math.random() * wrongPool.length)
                          if (!usedIndices.has(randIndex)) {
                            usedIndices.add(randIndex)
                            wrong.push(wrongPool[randIndex].meaning)
                          }
                        }
                        const allOptions = [...wrong, target.meaning].sort(() => Math.random() - 0.5)
                        return { word: target, options: allOptions, correct: target.meaning }
                      })
                      setTopik2LugatQuizOptions(options)
                    }}>🧠 Test</button>
                    <button type="button" className={topik2LugatPage === 'listening' ? 'active' : ''} onClick={() => {
                      setTopik2LugatPage('listening')
                      setTopik2LugatQuizIndex(0)
                      setTopik2LugatQuizScore(0)
                      setTopik2LugatQuizAnswered(null)
                      const shuffled = [...topik2Lugat].sort(() => Math.random() - 0.5).slice(0, 20)
                      const options = shuffled.map((target) => {
                        const wrongPool = topik2Lugat.filter((w) => w.id !== target.id)
                        const wrong = []
                        const usedIndices = new Set()
                        while (wrong.length < 3 && usedIndices.size < wrongPool.length) {
                          const randIndex = Math.floor(Math.random() * wrongPool.length)
                          if (!usedIndices.has(randIndex)) {
                            usedIndices.add(randIndex)
                            wrong.push(wrongPool[randIndex].korean)
                          }
                        }
                        const allOptions = [...wrong, target.korean].sort(() => Math.random() - 0.5)
                        return { word: target, options: allOptions, correct: target.korean }
                      })
                      setTopik2LugatQuizOptions(options)
                    }}>🎧 Eshitish</button>
                  </nav>

                  {topik2LugatPage === 'list' && (
                    <div className="topik-words-list">
                      {topik2Lugat.map((word, index) => (
                        <div key={word.id} className="topik-word-item glass-card">
                          <span className="topik-word-number">{String(index + 1).padStart(3, '0')}</span>
                          <div className="topik-word-content">
                            <strong lang="ko">{word.korean}</strong>
                            <span className="topik-word-meaning">{word.meaning}</span>
                            <span className="topik-word-example" lang="ko">{word.example}</span>
                          </div>
                          <button type="button" className="topik-word-speak-btn" onClick={() => handleSpeak(word.korean)} title="Eshitish">🔊</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {topik2LugatPage === 'quiz' && topik2LugatQuizOptions.length > 0 && (
                    <div className="topik-words-quiz">
                      {topik2LugatQuizIndex < topik2LugatQuizOptions.length ? (
                        <>
                          <div className="quiz-progress-bar">
                            <div className="quiz-progress-fill" style={{ width: `${((topik2LugatQuizIndex + 1) / topik2LugatQuizOptions.length) * 100}%` }} />
                          </div>
                          <p className="quiz-counter">{topik2LugatQuizIndex + 1} / {topik2LugatQuizOptions.length}</p>
                          <div className="quiz-question-card glass-card">
                            <p className="quiz-instruction">Quyidagi so'zning tarjimasini tanlang:</p>
                            <h3 lang="ko">{topik2LugatQuizOptions[topik2LugatQuizIndex].word.korean}</h3>
                            <button type="button" className="quiz-speak-btn" onClick={() => handleSpeak(topik2LugatQuizOptions[topik2LugatQuizIndex].word.korean)}>🔊 Eshitish</button>
                            <div className="quiz-options">
                              {topik2LugatQuizOptions[topik2LugatQuizIndex].options.map((option, optIdx) => {
                                const isAnswered = topik2LugatQuizAnswered !== null
                                const isCorrect = option === topik2LugatQuizOptions[topik2LugatQuizIndex].correct
                                const isSelected = option === topik2LugatQuizAnswered
                                let className = 'quiz-option-btn glass-card'
                                if (isAnswered && isCorrect) className += ' correct'
                                if (isAnswered && isSelected && !isCorrect) className += ' wrong'
                                return (
                                  <button key={optIdx} type="button" className={className} disabled={isAnswered} onClick={() => {
                                    setTopik2LugatQuizAnswered(option)
                                    if (option === topik2LugatQuizOptions[topik2LugatQuizIndex].correct) {
                                      setTopik2LugatQuizScore((s) => s + 1)
                                    }
                                  }}>
                                    {option}
                                  </button>
                                )
                              })}
                            </div>
                            {topik2LugatQuizAnswered !== null && (
                              <button type="button" className="primary-btn quiz-next-btn" onClick={() => {
                                if (topik2LugatQuizIndex + 1 >= topik2LugatQuizOptions.length) {
                                  setTopik2LugatPage('list')
                                  setTopik2LugatQuizIndex(0)
                                  setTopik2LugatQuizScore(0)
                                  setTopik2LugatQuizAnswered(null)
                                } else {
                                  setTopik2LugatQuizIndex((i) => i + 1)
                                  setTopik2LugatQuizAnswered(null)
                                }
                              }}>
                                {topik2LugatQuizIndex + 1 >= topik2LugatQuizOptions.length ? 'Natijaga qaytish' : 'Keyingi →'}
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="quiz-result glass-card">
                          <h3>Test yakunlandi!</h3>
                          <p>{topik2LugatQuizScore} / {topik2LugatQuizOptions.length} to'g'ri</p>
                          <button type="button" className="primary-btn" onClick={() => setTopik2LugatPage('list')}>Ro'yxatga qaytish</button>
                        </div>
                      )}
                    </div>
                  )}

                  {topik2LugatPage === 'listening' && topik2LugatQuizOptions.length > 0 && (
                    <div className="topik-words-quiz">
                      {topik2LugatQuizIndex < topik2LugatQuizOptions.length ? (
                        <>
                          <div className="quiz-progress-bar">
                            <div className="quiz-progress-fill" style={{ width: `${((topik2LugatQuizIndex + 1) / topik2LugatQuizOptions.length) * 100}%` }} />
                          </div>
                          <p className="quiz-counter">{topik2LugatQuizIndex + 1} / {topik2LugatQuizOptions.length}</p>
                          <div className="quiz-question-card glass-card">
                            <p className="quiz-instruction">Eshitgan so'zingizni tanlang:</p>
                            <button type="button" className="quiz-listen-btn" onClick={() => handleSpeak(topik2LugatQuizOptions[topik2LugatQuizIndex].word.korean)}>🔊 Eshitish</button>
                            <div className="quiz-options">
                              {topik2LugatQuizOptions[topik2LugatQuizIndex].options.map((option, optIdx) => {
                                const isAnswered = topik2LugatQuizAnswered !== null
                                const isCorrect = option === topik2LugatQuizOptions[topik2LugatQuizIndex].correct
                                const isSelected = option === topik2LugatQuizAnswered
                                let className = 'quiz-option-btn glass-card'
                                if (isAnswered && isCorrect) className += ' correct'
                                if (isAnswered && isSelected && !isCorrect) className += ' wrong'
                                return (
                                  <button key={optIdx} type="button" className={className} disabled={isAnswered} onClick={() => {
                                    setTopik2LugatQuizAnswered(option)
                                    if (option === topik2LugatQuizOptions[topik2LugatQuizIndex].correct) {
                                      setTopik2LugatQuizScore((s) => s + 1)
                                    }
                                  }}>
                                    <span lang="ko">{option}</span>
                                  </button>
                                )
                              })}
                            </div>
                            {topik2LugatQuizAnswered !== null && (
                              <button type="button" className="primary-btn quiz-next-btn" onClick={() => {
                                if (topik2LugatQuizIndex + 1 >= topik2LugatQuizOptions.length) {
                                  setTopik2LugatPage('list')
                                  setTopik2LugatQuizIndex(0)
                                  setTopik2LugatQuizScore(0)
                                  setTopik2LugatQuizAnswered(null)
                                } else {
                                  setTopik2LugatQuizIndex((i) => i + 1)
                                  setTopik2LugatQuizAnswered(null)
                                }
                              }}>
                                {topik2LugatQuizIndex + 1 >= topik2LugatQuizOptions.length ? 'Natijaga qaytish' : 'Keyingi →'}
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="quiz-result glass-card">
                          <h3>Eshitish yakunlandi!</h3>
                          <p>{topik2LugatQuizScore} / {topik2LugatQuizOptions.length} to'g'ri</p>
                          <button type="button" className="primary-btn" onClick={() => setTopik2LugatPage('list')}>Ro'yxatga qaytish</button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )
            : (
                <section className="topik-two-placeholder" aria-live="polite">
                  <h2>{topikTwoSkill === 'sigi' ? 'Sigi — yozish' : topikTwoSkill === 'ilgi' ? 'Ilgi — oqish' : 'Titki — eshitish'}</h2>
                  <p>Bu bo'limga qo'shiladigan materiallarni keyin belgilaymiz.</p>
                </section>
              )}
        </main>
      )}

      {mainSection === 'profile' && (
        <main className="panel profile-panel">
          {/* Profile Header - Instagram Style */}
          <section className="profile-header-glass">
            <button className="profile-settings-toggle" onClick={() => setShowSettings((s) => !s)} aria-label="Sozlamalar">
              ⚙️ {showSettings ? '✕' : ''}
            </button>
            <div className="profile-avatar-section">
              <div className="profile-avatar-ring">
                {myProfile?.avatar ? (
                  <img className="profile-avatar-img" src={myProfile.avatar} alt="Avatar" />
                ) : (
                  <div className="profile-avatar-placeholder">
                    {(myProfile?.firstName || user?.displayName || 'U')[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              {profileEditing ? (
                <label className="profile-edit-avatar-btn">
                  📷 Rasm o'zgartirish
                  <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                </label>
              ) : null}
            </div>

            {profileEditing ? (
              <div className="profile-edit-form">
                <input
                  className="profile-input"
                  type="text"
                  placeholder="Ism"
                  value={profileForm.firstName || ''}
                  onChange={(e) => setProfileForm((p) => ({ ...p, firstName: e.target.value }))}
                />
                <input
                  className="profile-input"
                  type="text"
                  placeholder="Familiya"
                  value={profileForm.lastName || ''}
                  onChange={(e) => setProfileForm((p) => ({ ...p, lastName: e.target.value }))}
                />
                <textarea
                  className="profile-input profile-textarea"
                  placeholder="Bio — o'zingiz haqingizda"
                  rows={3}
                  value={profileForm.bio || ''}
                  onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                />
                <div className="profile-edit-actions">
                  <button className="primary-btn" onClick={handleSaveProfile}>Saqlash</button>
                  <button className="ghost-btn" onClick={() => { setProfileEditing(false); setProfileForm(myProfile || {}) }}>Bekor qilish</button>
                </div>
              </div>
            ) : (
              <>
                <div className="profile-name-section">
                  <h2 className="profile-name">{myProfile?.firstName || user?.displayName || 'Foydalanuvchi'} {myProfile?.lastName || ''}</h2>
                  {myProfile?.bio && <p className="profile-bio">{myProfile.bio}</p>}
                </div>
                <button className="profile-edit-btn" onClick={() => setProfileEditing(true)}>
                  Profilni tahrirlash
                </button>
              </>
            )}

            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stat-item">
                <span className="profile-stat-value">{words.length}</span>
                <span className="profile-stat-label">So'zlar</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-value">{gameState?.streak || 0}</span>
                <span className="profile-stat-label">Kunlar 🔥</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-value">{gameState?.hearts ?? MAX_HEARTS}</span>
                <span className="profile-stat-label">Yuraklar ❤️</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="profile-progress">
              <div className="profile-progress-label">
                <span>O'zlashtirilgan so'zlar</span>
                <span>{todayCompleted}/{settings.dailyGoal}</span>
              </div>
              <div className="profile-progress-bar">
                <div className="profile-progress-fill" style={{ width: `${Math.min(100, (todayCompleted / settings.dailyGoal) * 100)}%` }} />
              </div>
            </div>

            {/* Story Highlights */}
            <div className="profile-highlights">
              <div className="profile-highlight-item" onClick={() => setMainSection('topik1')}>
                <div className="profile-highlight-icon">📘</div>
                <span>TOPIK I</span>
              </div>
              <div className="profile-highlight-item" onClick={() => { setMainSection('topik2'); setTopikTwoSkill('vocabulary'); }}>
                <div className="profile-highlight-icon">📖</div>
                <span>Lug'at</span>
              </div>
              <div className="profile-highlight-item" onClick={() => { setMainSection('topik2'); setTopikTwoSkill('sigi'); }}>
                <div className="profile-highlight-icon">✍️</div>
                <span>쓰기</span>
              </div>
              <div className="profile-highlight-item" onClick={() => { setMainSection('topik2'); setTopikTwoSkill('ilgi'); }}>
                <div className="profile-highlight-icon">📰</div>
                <span>읽기</span>
              </div>
              <div className="profile-highlight-item" onClick={() => { setMainSection('topik2'); setTopikTwoSkill('titki'); }}>
                <div className="profile-highlight-icon">🎧</div>
                <span>듣기</span>
              </div>
              <div className="profile-highlight-item" onClick={() => setMainSection('chat')}>
                <div className="profile-highlight-icon">💬</div>
                <span>Chat</span>
              </div>
            </div>
          </section>

          {/* Settings in Profile - Collapsible */}
          {showSettings && (
          <section className="profile-settings-glass">
            <h3 className="profile-settings-title">Sozlamalar</h3>

            {/* Account */}
            <div className="profile-settings-section">
              <h4>Akkaunt</h4>
              <p className="settings-description">
                {user
                  ? `Google: ${user.displayName || user.email}`
                  : 'Qurilma xotirasida saqlanadi.'}
              </p>
              <div className="setting-action-row">
                {user
                  ? <button type="button" className="setting-action-btn" onClick={() => signOutUser().catch((e) => console.error('Chiqish xatosi:', e))}>Chiqish</button>
                  : <button type="button" className="setting-action-btn" onClick={onChooseLoginMode}>Kirish usulini o'zgartirish</button>}
              </div>
            </div>

            {/* Appearance */}
            <div className="profile-settings-section">
              <h4>Ko'rinish</h4>
              <div className="setting-action-row">
                <button type="button" className="setting-action-btn" onClick={() => setColorMode((m) => m === 'night' ? 'day' : 'night')}>
                  <span>{colorMode === 'night' ? '☀️' : '🌙'}</span>
                  {colorMode === 'night' ? 'Kunduzgi' : 'Tungi'}
                </button>
              </div>
              <div className="theme-options" role="group" aria-label="Rangni tanlang">
                {themes.map((option) => (
                  <button key={option.id} type="button" className={`theme-option ${selectedTheme === option.id ? 'active' : ''}`} onClick={() => setSelectedTheme(option.id)}>
                    <span className="theme-swatches" aria-hidden="true">
                      <span style={{ backgroundColor: option.primary }} />
                      <span style={{ backgroundColor: option.strong }} />
                      <span style={{ backgroundColor: option.accent }} />
                    </span>
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice */}
            <div className="profile-settings-section">
              <h4>Ovoz</h4>
              <label className="setting-control setting-toggle">
                <span>Koreyscha talaffuz</span>
                <input type="checkbox" checked={settings.speechEnabled} onChange={(e) => {
                  if (!e.target.checked && 'speechSynthesis' in window) window.speechSynthesis.cancel()
                  setSettings((p) => ({ ...p, speechEnabled: e.target.checked }))
                }} />
              </label>
              <label className="setting-control" htmlFor="speech-rate-profile">
                <span>Tezlik</span>
                <span className="setting-value">{settings.speechRate}x</span>
                <input id="speech-rate-profile" type="range" min="0.6" max="1.2" step="0.05" value={settings.speechRate} disabled={!settings.speechEnabled} onChange={(e) => setSettings((p) => ({ ...p, speechRate: Number(e.target.value) }))} />
              </label>
            </div>

            {/* Learning */}
            <div className="profile-settings-section">
              <h4>O'rganish</h4>
              <label className="setting-control setting-select">
                <span>Matn kattaligi</span>
                <select value={settings.textSize} onChange={(e) => setSettings((p) => ({ ...p, textSize: e.target.value }))}>
                  <option value="small">Kichik</option>
                  <option value="medium">O'rtacha</option>
                  <option value="large">Katta</option>
                </select>
              </label>
              <label className="setting-control setting-select">
                <span>Kunlik maqsad</span>
                <select value={settings.dailyGoal} onChange={(e) => setSettings((p) => ({ ...p, dailyGoal: Number(e.target.value) }))}>
                  {[5, 10, 15, 20, 30].map((g) => <option key={g} value={g}>{g} ta so'z</option>)}
                </select>
              </label>
            </div>

            {/* Author */}
            <div className="profile-settings-section author-card">
              <h4>Muallif</h4>
              <p className="author-name">Ozodbek Nabiqo'ziyev</p>
              <p className="settings-description" style={{marginBottom:'10px',fontSize:'0.82rem'}}>Xato, taklif yoki talab bo'lsa, aloqaga chiqing!</p>
              <div className="contact-links">
                <a href="https://t.me/ozodbek_dc" target="_blank" rel="noreferrer">Telegram</a>
                <a href="https://www.instagram.com/ozodbek_dc/" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>
          </section>
          )}
        </main>
      )}

      {mainSection === 'chat' && (
        <main className="panel chat-panel">
          {!selectedChatUser ? (
            /* User List */
            <section className="chat-user-list">
              <h2 className="chat-title">💬 Xabarlar</h2>
              {user && !localMode ? (
                <>
                  <nav className="chat-tabs" aria-label="Chat bo'limlari">
                    <button className={chatTab === 'friends' ? 'active' : ''} onClick={() => setChatTab('friends')}>
                      👥 Dostlar {friendProfiles.length > 0 && `(${friendProfiles.length})`}
                    </button>
                    <button className={chatTab === 'all' ? 'active' : ''} onClick={() => setChatTab('all')}>
                      🌐 Hamma ({allProfiles.length})
                    </button>
                  </nav>
                  {chatTab === 'friends' ? (
                    friendProfiles.length === 0 ? (
                      <p className="chat-empty">Hali dostlaringiz yo'q. "Hamma" bo'limidan dost qo'shing!</p>
                    ) : (
                      friendProfiles.map((u) => (
                        <div key={u.id} className="chat-user-item glass-card">
                          <div className="chat-user-avatar" onClick={() => setSelectedChatUser(u)}>
                            {u.avatar ? <img src={u.avatar} alt="" /> : <span>{(u.firstName || 'U')[0]?.toUpperCase()}</span>}
                          </div>
                          <div className="chat-user-info" onClick={() => setSelectedChatUser(u)}>
                            <span className="chat-user-name">{u.firstName || 'Noma\'lum'} {u.lastName || ''}</span>
                            {u.bio && <span className="chat-user-bio">{u.bio}</span>}
                          </div>
                          <button className="chat-remove-friend-btn" onClick={() => handleRemoveFriend(u.id)} title="Dostlardan o'chirish">✕</button>
                          <span className="chat-arrow" onClick={() => setSelectedChatUser(u)}>›</span>
                        </div>
                      ))
                    )
                  ) : (
                    allProfiles.length === 0 ? (
                      <p className="chat-empty">Hali boshqa foydalanuvchilar yo'q. Birinchi bo'ling!</p>
                    ) : (
                      allProfiles.map((u) => {
                        const isFriend = friends.some((f) => f.id === u.id)
                        return (
                          <div key={u.id} className="chat-user-item glass-card">
                            <div className="chat-user-avatar" onClick={() => setSelectedChatUser(u)}>
                              {u.avatar ? <img src={u.avatar} alt="" /> : <span>{(u.firstName || 'U')[0]?.toUpperCase()}</span>}
                            </div>
                            <div className="chat-user-info" onClick={() => setSelectedChatUser(u)}>
                              <span className="chat-user-name">{u.firstName || 'Noma\'lum'} {u.lastName || ''}</span>
                              {u.bio && <span className="chat-user-bio">{u.bio}</span>}
                              {isFriend && <span className="chat-friend-badge">✓ Dost</span>}
                            </div>
                            {isFriend ? (
                              <button className="chat-remove-friend-btn" onClick={() => handleRemoveFriend(u.id)} title="Dostlardan o'chirish">✕</button>
                            ) : (
                              <button className="chat-add-friend-btn" onClick={() => handleAddFriend(u)}>+ Dost</button>
                            )}
                            <span className="chat-arrow" onClick={() => setSelectedChatUser(u)}>›</span>
                          </div>
                        )
                      })
                    )
                  )}
                </>
              ) : (
                <p className="chat-empty">Chat va foydalanuvchilar ro'yxati faqat Google orqali kirganingizda ko'rinadi.</p>
              )}
            </section>
          ) : (
            /* Chat Messages */
            <section className="chat-messages-view">
              <div className="chat-header">
                <button className="ghost-btn chat-back-btn" onClick={() => setSelectedChatUser(null)}>← Orqaga</button>
                <div className="chat-header-user">
                  <div className="chat-header-avatar">
                    {selectedChatUser.avatar ? <img src={selectedChatUser.avatar} alt="" /> : <span>{(selectedChatUser.firstName || 'U')[0]?.toUpperCase()}</span>}
                  </div>
                  <span>{selectedChatUser.firstName} {selectedChatUser.lastName}</span>
                </div>
              </div>

              <div className="chat-messages-container">
                {user && !localMode ? (
                  <>
                    {chatMessages.length === 0 ? (
                      <p className="chat-no-messages">Xabarlar yo'q. Birinchi xabarni yozing!</p>
                    ) : (
                      chatMessages.map((msg) => {
                        const isMe = msg.senderId === user.uid
                        return (
                          <div key={msg.id} className={`chat-bubble ${isMe ? 'chat-bubble-mine' : 'chat-bubble-theirs'}`}>
                            <p className="chat-bubble-text">{msg.text}</p>
                            <span className="chat-bubble-time">
                              {msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                          </div>
                        )
                      })
                    )}
                    <div ref={chatEndRef} />
                  </>
                ) : (
                  <p className="chat-no-messages">Chat uchun Google orqali kiring.</p>
                )}
              </div>

              {user && !localMode && (
                <div className="chat-input-container">
                  <input
                    className="chat-input"
                    type="text"
                    placeholder="Xabar yozing..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage() }}
                  />
                  <button className="chat-send-btn" onClick={handleSendChatMessage} disabled={!chatInput.trim()}>
                    ➤
                  </button>
                </div>
              )}
            </section>
          )}
        </main>
      )}

      {mainSection === 'settings' && (
        <main className="panel settings-panel">
          <section className="settings-section">
            <p className="eyebrow">Akkaunt</p>
            <h2>Kirish usuli</h2>
            <p className="settings-description">
              {user
                ? `Google akkaunt: ${user.displayName || user.email}. Ma’lumotlaringiz qurilmalar orasida sinxronlanadi.`
                : 'Qurilma xotirasi. Ma’lumotlaringiz faqat shu qurilmada saqlanadi.'}
            </p>
            <div className="setting-action-row">
              {user
                ? (
                    <button
                      type="button"
                      className="setting-action-btn"
                      onClick={() => signOutUser().catch((error) => console.error('Akkauntdan chiqib bo‘lmadi:', error))}
                    >
                      Google akkauntdan chiqish
                    </button>
                  )
                : (
                    <button type="button" className="setting-action-btn" onClick={onChooseLoginMode}>
                      Kirish usulini o‘zgartirish
                    </button>
                  )}
            </div>
          </section>

          <section className="settings-section">
            <p className="eyebrow">Ko‘rinish</p>
            <h2>Rang mavzusi</h2>
            <p className="settings-description">Ilovaning kunduzgi yoki tungi ko‘rinishini tanlang.</p>
            <div className="setting-action-row">
              <button
                type="button"
                className="setting-action-btn"
                onClick={() => setColorMode((mode) => mode === 'night' ? 'day' : 'night')}
                aria-label={colorMode === 'night' ? 'Kunduzgi mavzuga o‘tish' : 'Tungi mavzuga o‘tish'}
              >
                <span aria-hidden="true">{colorMode === 'night' ? '☀️' : '🌙'}</span>
                {colorMode === 'night' ? 'Kunduzgi mavzu' : 'Tungi mavzu'}
              </button>
            </div>
            <div className="theme-options" role="group" aria-label="Ilova rangini tanlang">
              {themes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`theme-option ${selectedTheme === option.id ? 'active' : ''}`}
                  onClick={() => setSelectedTheme(option.id)}
                  aria-pressed={selectedTheme === option.id}
                >
                  <span className="theme-swatches" aria-hidden="true">
                    <span style={{ backgroundColor: option.primary }} />
                    <span style={{ backgroundColor: option.strong }} />
                    <span style={{ backgroundColor: option.accent }} />
                  </span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="settings-section">
            <p className="eyebrow">Ovoz</p>
            <h2>Talaffuz sozlamalari</h2>
            <label className="setting-control setting-toggle">
              <span>Koreyscha talaffuzni yoqish</span>
              <input
                type="checkbox"
                checked={settings.speechEnabled}
                onChange={(event) => {
                  const enabled = event.target.checked
                  if (!enabled) {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
                    setSpeechMessage('')
                  }
                  setSettings((previous) => ({ ...previous, speechEnabled: enabled }))
                }}
              />
            </label>
            <label className="setting-control" htmlFor="speech-rate">
              <span>Talaffuz tezligi</span>
              <span className="setting-value">{settings.speechRate.toString()}x</span>
              <input
                id="speech-rate"
                type="range"
                min="0.6"
                max="1.2"
                step="0.05"
                value={settings.speechRate}
                disabled={!settings.speechEnabled}
                onChange={(event) => setSettings((previous) => ({ ...previous, speechRate: Number(event.target.value) }))}
              />
              <span className="setting-hint">Sekinroqdan tezroqqacha</span>
            </label>
          </section>

          <section className="settings-section">
            <p className="eyebrow">O‘rganish</p>
            <h2>O‘qish rejasi</h2>
            <label className="setting-control setting-select">
              <span>Matn kattaligi</span>
              <select
                value={settings.textSize}
                onChange={(event) => setSettings((previous) => ({ ...previous, textSize: event.target.value }))}
              >
                <option value="small">Kichik</option>
                <option value="medium">O‘rtacha</option>
                <option value="large">Katta</option>
              </select>
            </label>
            <label className="setting-control setting-select">
              <span>Kunlik so‘z maqsadi</span>
              <select
                value={settings.dailyGoal}
                onChange={(event) => setSettings((previous) => ({ ...previous, dailyGoal: Number(event.target.value) }))}
              >
                {[5, 10, 15, 20, 30].map((goal) => <option key={goal} value={goal}>{goal} ta so‘z</option>)}
              </select>
            </label>
            <div className="daily-goal">
              <div className="daily-goal-label">
                <span>Bugun to‘g‘ri topilgan so‘zlar</span>
                <strong>{todayCompleted}/{settings.dailyGoal}</strong>
              </div>
              <progress value={Math.min(todayCompleted, settings.dailyGoal)} max={settings.dailyGoal} />
              <p className="settings-description">
                {todayCompleted >= settings.dailyGoal
                  ? 'Ajoyib! Bugungi maqsadingizga yetdingiz.'
                  : `Yana ${settings.dailyGoal - todayCompleted} ta to‘g‘ri javob bilan maqsadga yetasiz.`}
              </p>
            </div>
          </section>

          <section className="settings-section author-card">
            <p className="eyebrow">Aloqa</p>
            <h2>Muallif</h2>
            <p className="author-name">Ozodbek Nabiqo‘ziyev</p>
            <p className="settings-description">Xato yoki talab va taklif bo‘lsa, aloqaga chiqing.</p>
            <div className="contact-links">
              <a href="https://t.me/ozodbek_dc" target="_blank" rel="noreferrer">
                Telegram <span>@ozodbek_dc</span>
              </a>
              <a href="https://www.instagram.com/ozodbek_dc/" target="_blank" rel="noreferrer">
                Instagram <span>@ozodbek_dc</span>
              </a>
            </div>
          </section>
        </main>
      )}

      {mainSection === 'topik1' && activeTab === 'words' && (
        <main className="panel words-panel">
          <form className="word-form" onSubmit={handleSubmitWord}>
            <h3>{editingId ? 'Soʻzni tahrirlash' : 'Yangi soʻz qoʻshish'}</h3>
            <p className="storage-note">Lug‘at va o‘rganish jarayoningiz tanlangan saqlash usulida saqlanadi.</p>
            <div className="form-grid">
              <input name="korean" value={form.korean} onChange={handleFormChange} placeholder="Koreyscha" />
              <input name="meaning" value={form.meaning} onChange={handleFormChange} placeholder="So'zning o'zbekcha tarjimasi" />
              <input name="example" value={form.example} onChange={handleFormChange} placeholder="Misol gap" />
              <select name="category" value={form.category} onChange={handleFormChange} aria-label="So‘z turkumi">
                {wordCategories.filter((category) => category !== 'Hammasi').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select name="difficulty" value={form.difficulty} onChange={handleFormChange} aria-label="So‘z qiyinligi">
                {quizDifficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-btn">{editingId ? 'Saqlash' : 'Qoʻshish'}</button>
              {editingId && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => {
                    setEditingId(null)
                    setForm({ korean: '', meaning: '', example: '', category: 'Boshqa' })
                  }}
                >
                  Bekor qilish
                </button>
              )}
            </div>
          </form>

          <input
            className="word-search"
            type="search"
            value={wordSearch}
            onChange={(event) => setWordSearch(event.target.value)}
            placeholder="Koreyscha so‘z yoki o‘zbekcha tarjima bo‘yicha qidirish"
            aria-label="Lug‘atdan qidirish"
          />

          <div className="word-categories" aria-label="Lug‘at turkumlari">
            {wordCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <span>
                  {category === 'Hammasi'
                    ? words.length
                    : words.filter((word) => word.category === category).length}
                </span>
              </button>
            ))}
          </div>

          <h3 className="word-category-heading">
            {selectedCategory} <span>({filteredWords.length} ta so‘z)</span>
          </h3>

          <div className="word-list">
            {filteredWords.length > 0 ? filteredWords.map((word) => (
              <div key={word.id} className="word-item">
                <div>
                  <strong>{word.korean}</strong>
                  <span>{word.meaning} · {word.category} · {quizDifficulties.find((difficulty) => difficulty.id === word.difficulty)?.label ?? quizDifficulties[0].label}</span>
                </div>
                <div className="word-actions">
                  {settings.speechEnabled && (
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => handleSpeak(word.korean)}
                      aria-label={`${word.korean} so‘zini talaffuz qilish`}
                      title="Koreyscha talaffuzni eshitish"
                    >
                      🔊
                    </button>
                  )}
                  <button type="button" className="ghost-btn" onClick={() => handleEdit(word)}>
                    Tahrirlash
                  </button>
                  <button type="button" className="ghost-btn danger" onClick={() => handleDelete(word.id)}>
                    O'chirish
                  </button>
                </div>
              </div>
            )) : <p className="empty-words">Bu turkumda hozircha so‘z yo‘q.</p>}
          </div>
          {speechMessage && <p className="speech-status" role="status">{speechMessage}</p>}
        </main>
      )}

      <nav className="main-section-nav" aria-label="Asosiy bo‘limlar">
        <button
          type="button"
          className={mainSection === 'topik1' ? 'active' : ''}
          onClick={() => setMainSection('topik1')}
          aria-pressed={mainSection === 'topik1'}
        >
          <span aria-hidden="true">📘</span>
          <span>TOPIK I</span>
        </button>
        <button
          type="button"
          className={mainSection === 'topik2' ? 'active' : ''}
          onClick={() => setMainSection('topik2')}
          aria-pressed={mainSection === 'topik2'}
        >
          <span aria-hidden="true">📚</span>
          <span>TOPIK II</span>
        </button>
        <button
          type="button"
          className={mainSection === 'chat' ? 'active' : ''}
          onClick={() => setMainSection('chat')}
          aria-pressed={mainSection === 'chat'}
        >
          <span aria-hidden="true">💬</span>
          <span>Chat</span>
        </button>
        <button
          type="button"
          className={mainSection === 'profile' ? 'active' : ''}
          onClick={() => setMainSection('profile')}
          aria-pressed={mainSection === 'profile'}
        >
          <span aria-hidden="true">👤</span>
          <span>Profil</span>
        </button>
      </nav>
    </div>
  )
}

export default App
