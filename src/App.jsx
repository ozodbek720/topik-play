import { useEffect, useMemo, useState } from 'react'
import supplementalWords from './supplementalWords.js'
import './App.css'

const MAX_HEARTS = 5
const HEART_REFILL_INTERVAL = 12 * 60 * 60 * 1000
const HEARTS_PER_REFILL = 5
const HEART_EXCHANGE_COST = 30
const GAME_STATE_KEY = 'topik-play-game-state'
const THEME_STORAGE_KEY = 'topik-play-theme'

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
  { id: 21, korean: '강아지', meaning: 'it', example: '강아지가 귀여워요.', level: 'A1' },
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
  { id: 32, korean: '운동장', meaning: 'stadion', example: '운동장에서 축구해요.', level: 'A2' },
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
  { id: 44, korean: '산', meaning: 'togʻ', example: '산을 오르다.', level: 'A1' },
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
  { id: 68, korean: '재미', meaning: 'qiziqarli', example: '영화가 재미있어요.', level: 'A1' },
  { id: 69, korean: '슬픔', meaning: 'g’am', example: '슬픔이 느껴져요.', level: 'A2' },
  { id: 70, korean: '기분', meaning: 'kayfiyat', example: '오늘 기분이 좋아요.', level: 'A1' },
  { id: 71, korean: '소리', meaning: 'ovoz', example: '소리가 커요.', level: 'A1' },
  { id: 72, korean: '색', meaning: 'rang', example: '좋은 색을 골라요.', level: 'A1' },
  { id: 73, korean: '빨강', meaning: 'qizil', example: '빨강색이 예뻐요.', level: 'A1' },
  { id: 74, korean: '파랑', meaning: 'koʻk', example: '파랑색 옷을 입어요.', level: 'A1' },
  { id: 75, korean: '초록', meaning: 'yashil', example: '초록색 잎이 있어요.', level: 'A1' },
  { id: 76, korean: '하늘', meaning: 'osmon', example: '하늘이 파랗습니다.', level: 'A1' },
  { id: 77, korean: '달', meaning: 'oy', example: '달이 밝아요.', level: 'A1' },
  { id: 78, korean: '별', meaning: 'yulduz', example: '별을 봤어요.', level: 'A1' },
  { id: 79, korean: '모두', meaning: 'hamma', example: '모두 함께 와요.', level: 'A1' },
  { id: 80, korean: '같다', meaning: 'bir xil', example: '우리가 같아요.', level: 'A1' },
  { id: 81, korean: '다르다', meaning: 'turlicha', example: '우리 생각은 다르다.', level: 'A2' },
  { id: 82, korean: '크다', meaning: 'katta', example: '집이 커요.', level: 'A1' },
  { id: 83, korean: '작다', meaning: 'kichik', example: '이 책은 작아요.', level: 'A1' },
  { id: 84, korean: '좋다', meaning: 'yaxshi', example: '이 음식이 좋아요.', level: 'A1' },
  { id: 85, korean: '나쁘다', meaning: 'yomon', example: '날씨가 나빠요.', level: 'A1' },
  { id: 86, korean: '쉽다', meaning: 'oson', example: '이 문제는 쉬워요.', level: 'A1' },
  { id: 87, korean: '어렵다', meaning: 'qiyin', example: '한국어가 어렵다.', level: 'A1' },
  { id: 88, korean: '배고프다', meaning: 'och qolmoq', example: '배가 고파요.', level: 'A1' },
  { id: 89, korean: '아프다', meaning: 'ogʻriq', example: '머리가 아파요.', level: 'A1' },
  { id: 90, korean: '피곤하다', meaning: 'charchamoq', example: '오늘 피곤해요.', level: 'A1' },
  { id: 91, korean: '웃다', meaning: 'kulmoq', example: '친구와 웃어요.', level: 'A1' },
  { id: 92, korean: '울다', meaning: 'yashamoq', example: '슬퍼서 울었어요.', level: 'A1' },
  { id: 93, korean: '걷다', meaning: 'yurmoq', example: '공원에서 걷어요.', level: 'A1' },
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
  ...supplementalWords,
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

function App() {
  const [words, setWords] = useState(categorizedWords)
  const [activeTab, setActiveTab] = useState('quiz')
  const [selectedTheme, setSelectedTheme] = useState(loadTheme)
  const [selectedCategory, setSelectedCategory] = useState('Hammasi')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [form, setForm] = useState({ korean: '', meaning: '', example: '', category: 'Boshqa', difficulty: 'easy' })
  const [wordSearch, setWordSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [topikIndex, setTopikIndex] = useState(0)
  const [topikSelected, setTopikSelected] = useState(null)
  const [topikAnswered, setTopikAnswered] = useState(false)
  const [gameState, setGameState] = useState(loadGameState)
  const [clockNow, setClockNow] = useState(0)

  const quizWords = useMemo(
    () => words.filter((word) => word.difficulty === selectedDifficulty),
    [words, selectedDifficulty],
  )
  const currentWord = quizWords[currentIndex % quizWords.length] || null
  const currentQuizDifficulty = quizDifficulties.find((difficulty) => difficulty.id === selectedDifficulty) ?? quizDifficulties[0]
  const options = useMemo(
    () => (currentWord ? makeChoices(currentWord, quizWords) : []),
    [currentWord, quizWords],
  )

  const currentTopik = topikExamples[topikIndex] || null
  const theme = themes.find((item) => item.id === selectedTheme) ?? themes[0]
  const filteredWords = words.filter((word) => {
    const matchesCategory = selectedCategory === 'Hammasi' || word.category === selectedCategory
    const query = wordSearch.trim().toLocaleLowerCase()
    const matchesSearch = !query || `${word.korean} ${word.meaning}`.toLocaleLowerCase().includes(query)
    return matchesCategory && matchesSearch
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
      localStorage.setItem(THEME_STORAGE_KEY, selectedTheme)
    } catch (error) {
      console.error('Rang sozlamasini qurilmada saqlab bo‘lmadi:', error)
    }
  }, [selectedTheme])

  useEffect(() => {
    const updateLives = () => {
      const now = Date.now()
      setClockNow(now)
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

  const handleNextWord = () => {
    if (quizWords.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % quizWords.length)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const handleAnswer = (choice) => {
    if (isAnswered || !currentWord || gameState.hearts === 0) return

    setSelectedAnswer(choice)
    setIsAnswered(true)

    if (choice === currentWord.meaning) {
      setGameState((previous) => ({ ...previous, score: previous.score + currentQuizDifficulty.points }))
    } else {
      spendHeart()
    }
  }

  const handleTopikAnswer = (choice) => {
    if (topikAnswered || !currentTopik || gameState.hearts === 0) return

    setTopikSelected(choice)
    setTopikAnswered(true)
    if (choice === currentTopik.answer) {
      setGameState((previous) => ({ ...previous, score: previous.score + 4 }))
    } else {
      spendHeart()
    }
  }

  const handleNextTopikQuestion = () => {
    setTopikIndex((prev) => (prev + 1) % topikExamples.length)
    setTopikSelected(null)
    setTopikAnswered(false)
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
    if (editingId === id) {
      setEditingId(null)
      setForm({ korean: '', meaning: '', example: '', category: 'Boshqa', difficulty: 'easy' })
    }
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
        <div>
          <p className="eyebrow">Koreys tilini o'rganish o'yini</p>
          <h1>Topik Play</h1>
        </div>
        <nav className="nav-tabs" aria-label="asosiy navigatsiya">
          <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>
            Test
          </button>
          <button className={activeTab === 'words' ? 'active' : ''} onClick={() => setActiveTab('words')}>
            Lug'at
          </button>
          <button className={activeTab === 'topik' ? 'active' : ''} onClick={() => setActiveTab('topik')}>
            TOPIK
          </button>
          <button className={activeTab === 'hearts' ? 'active' : ''} onClick={() => setActiveTab('hearts')}>
            Do‘kon
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            Sozlamalar
          </button>
        </nav>
      </header>

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

      {activeTab === 'quiz' && (
        <main className="panel quiz-panel">
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

          {currentWord ? (
            <>
              <p className="heart-timer">
                {gameState.hearts === MAX_HEARTS
                  ? `Har ${HEART_REFILL_INTERVAL / (60 * 60 * 1000)} soatda 5 ta yurak yangilanadi.`
                  : `Keyingi 5 ta yurak: ${String(refillHours).padStart(2, '0')}:${String(refillMinutes).padStart(2, '0')} dan so‘ng`}
              </p>
              <div className="progress-row">
                <span>So‘z {currentIndex + 1}/{quizWords.length}</span>
                <button type="button" className="ghost-btn" onClick={handleNextWord}>
                  Keyingisiga o'tkazib yuborish
                </button>
              </div>

              <div className="question-box">
                <p className="label">
                  Koreyscha so‘z · {currentQuizDifficulty.label} · {currentQuizDifficulty.points} ball
                </p>
                <h2>{currentWord.korean}</h2>
                {isAnswered && (
                  <p className={`result ${selectedAnswer === currentWord.meaning ? 'success' : 'error'}`}>
                    {selectedAnswer === currentWord.meaning
                      ? `To'g'ri! Bu so'z - ${currentWord.meaning} (+${currentQuizDifficulty.points} ball)`
                      : `Noto'g'ri. To'g'ri javob: ${currentWord.meaning} · 1 yurak yo'qotdingiz.`}
                  </p>
                )}
              </div>

              <div className="answer-grid">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`answer-btn ${selectedAnswer === option ? 'selected' : ''} ${
                      isAnswered && option === currentWord.meaning ? 'correct' : ''
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
                  {currentWord.example && <p><strong>Masalan:</strong> {currentWord.example}</p>}
                  <button type="button" className="primary-btn" onClick={handleNextWord}>
                    Keyingi so'zga o'tish
                  </button>
                </div>
              )}
              {gameState.hearts === 0 && !isAnswered && (
                <p className="empty-words">Yuraklaringiz tugadi. Do‘kondan ballga yurak almashtiring yoki yangilanishini kuting.</p>
              )}
            </>
          ) : (
            <p className="empty-words">Bu darajada hozircha so‘z yo‘q. Lug‘at bo‘limidan so‘z qo‘shing yoki boshqa darajani tanlang.</p>
          )}
        </main>
      )}

      {activeTab === 'topik' && currentTopik && (
        <main className="panel topik-panel">
          <div className="topik-header">
            <span className="topik-tag">TOPIK I mashq</span>
            <span className="topik-counter">Savol {topikIndex + 1}/{topikExamples.length}</span>
          </div>

          <div className="topik-question-box">
            <p className="label">{currentTopik.topic}</p>
            <h3>Quyidagi gapning o‘zbekcha tarjimasini toping</h3>
            <p className="topik-korean">{currentTopik.korean}</p>
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
        </main>
      )}

      {activeTab === 'hearts' && (
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

      {activeTab === 'settings' && (
        <main className="panel settings-panel">
          <section className="settings-section">
            <p className="eyebrow">Ko‘rinish</p>
            <h2>Ranglarni o‘zgartirish</h2>
            <p className="settings-description">Ilova rangini tanlang. Tanlovingiz shu qurilmada saqlanadi.</p>
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

          <section className="settings-section author-card">
            <p className="eyebrow">Aloqa</p>
            <h2>Muallif</h2>
            <p className="author-name">Ozodbek Nabiqo‘ziyev</p>
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

      {activeTab === 'words' && (
        <main className="panel words-panel">
          <form className="word-form" onSubmit={handleSubmitWord}>
            <h3>{editingId ? 'Soʻzni tahrirlash' : 'Yangi soʻz qoʻshish'}</h3>
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
        </main>
      )}
    </div>
  )
}

export default App
