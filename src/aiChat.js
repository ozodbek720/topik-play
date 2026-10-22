import advancedWords from './advancedWords.js'
import grammarPoints from './grammarPoints.js'
import topik2Lugat from './topik2Lugat.js'

// Combine all word databases
const allWords = [...advancedWords, ...topik2Lugat]

// ========================
// General Knowledge Base
// ========================
const generalKnowledge = [
  {
    patterns: ['seni kim yaratgan', 'kim yaratdi', 'sen kim', 'sen nima', 'sen haqingda', 'who created you', 'who made you', 'seni kim qildi'],
    response: `Men **Asiye AI** — koreys tilini o'rganish uchun yaratilgan aqlli yordamchiman. 🌸\n\nMeni **Ozodbek** yaratgan. U Topik Play ilovasini ham ishlab chiqqan.\n\nMen sizga koreys tilini o'rganishda yordam beraman:\n- So'zlar va gaplar tarjima qilish\n- Grammatika qoidalarini tushuntirish\n- Suhbat mashqi qilish\n- Test savollari berish\n\nBemalol savol bering! 😊`
  },
  {
    patterns: ['isming nima', 'seni nima deb atash mumkin', 'seni nima deb chaqirish mumkin', 'your name', 'ismi nima'],
    response: `Mening ismim **Asiye AI**! 🌸\n\n"Асие" — chiroyli o'zbek ismi. Men koreys tilini o'rganishda sizga yordam beradigan aqlli yordamchiman.\n\nMenga bemalol savol bering — tarjima, grammatika, suhbat yoki test haqida!`
  },
  {
    patterns: ['qanday yordam berasan', 'nima qila olasiz', 'nima qila olasan', 'what can you do', 'qobiliyatlaring'],
    response: `Men **Asiye AI** — koreys tilini o'rganish bo'yicha aqlli yordamchi! 🌸\n\nMen quyidagilarni qila olaman:\n\n📖 **Tarjima** — Istalgan koreys so'z yoki gapni o'zbek tiliga tarjima qilaman. Shuningdek, o'zbek so'zni koreys tiliga ham tarjima qilaman.\n\n📝 **Grammatika** — Koreys grammatika qoidalarini tushuntiraman va misollar keltiraman.\n\n💬 **Suhbat mashqi** — Koreys tilida suhbatlashishni mashq qilamiz. Men xatolaringizni tuzatib, to'g'ri variantni ko'rsataman.\n\n🧠 **Test** — Bilimingizni tekshirish uchun test savollari beraman.\n\n🌍 **Umumiy savollar** — Koreys madaniyati, TOPIK imtihoni va boshqa mavzularda ham javob beraman.\n\nQanday yordam bera olaman? 😊`
  },
  {
    patterns: ['koreys tili', 'koreys tilini qanday organish', 'koreys tilini organish', 'koreys tilini o\'rganish'],
    response: `Koreys tilini o'rganish ajoyib tanlov! 🇰🇷\n\n**Koreys tili haqida:**\n- Koreys tili taxminan 77 million kishi tomonidan so'zlanadi\n- Asosan Janubiy va Shimoliy Koreyada rasmiy til\n- O'ziga xos yozuv tizimi — **Hangul (한글)**, 1443-yilda yaratilgan\n- TOPIK (Test of Proficiency in Korean) — koreys tilini bilish darajasini o'lchovchi imtihon\n\n**O'rganish maslahatlari:**\n1. 📝 Har kuni yangi so'zlar o'rganing\n2. 🎧 Koreys filmlar va seriallar tomosha qiling\n3. 📖 Oddiy matnlarni o'qing\n4. 💬 Suhbat mashqi qiling\n5. 🧠 Muntazam test qiling\n\nMen sizga yordam berishga tayyorman! Qaysi qismidan boshlaymiz?`
  },
  {
    patterns: ['topik', 'topik imtihoni', 'topik nima', 'topik haqida', 'topik test'],
    response: `**TOPIK (Test of Proficiency in Korean)** — koreys tilini bilish darajasini tasdiqlovchi rasmiy imtihon. 📋\n\n**Darajalar:**\n- **TOPIK I** (Boshlang'ich)\n  - TOPIK I-1: Eshitish (듣기)\n  - TOPIK I-2: O'qish (읽기)\n  - Daraja: 1-2\n\n- **TOPIK II** (O'rta va yuqori)\n  - TOPIK II-1: Eshitish (듣기)\n  - TOPIK II-2: O'qish (읽기)\n  - TOPIK II-3: Yozish (쓰기)\n  - Daraja: 3-6\n\n**Topik Play ilovasi** sizga TOPIK imtihoniga tayyorlanishda yordam beradi:\n- Lug'at so'zlar\n- Grammatika qoidalari\n- Test savollari\n- Eshitish mashqlari\n\nQaysi qism bo'yicha yordam kerak?`
  },
  {
    patterns: ['koreys alifbo', 'hangul', '한글', 'koreys harflar'],
    response: `**Hangul (한글)** — koreys alifbosi, 1443-yilda Sejong the Great tomonidan yaratilgan. 📝\n\n**Asosiy undoshlar (14 ta):**\nㄱ (g/k), ㄴ (n), ㄷ (d/t), ㄹ (r/l), ㅁ (m), ㅂ (b/p), ㅅ (s), ㅇ (ng), ㅈ (j), ㅊ (ch), ㅋ (k), ㅌ (t), ㅍ (p), ㅎ (h)\n\n**Asosiy unli harflar (10 ta):**\nㅏ (a), ㅑ (ya), ㅓ (eo), ㅕ (yeo), ㅗ (o), ㅛ (yo), ㅜ (u), ㅠ (yu), ㅡ (eu), ㅣ (i)\n\n**Misol:**\n- 한국 (han-guk) — Koreya\n- 사랑 (sa-rang) — Muhabbat\n- 안녕하세요 (ann-yeong-ha-se-yo) — Salom\n\nHangul — dunyodagi eng ilohiy va oson o'zlashtiriladigan yozuv tizimlaridan biri!`
  },
  {
    patterns: ['koreya', 'koreya haqida', 'janubiy koreya', 'seul', 'koreys madaniyat'],
    response: `**Koreya Respublikasi (Janubiy Koreya)** haqida: 🇰🇷\n\n🏙️ **Poytaxti:** Seul (서울) — 10 milliondan ortiq aholi\n👥 **Aholisi:** ~51 million\n💰 **Valyutasi:** Won (원)\n🎭 **Madaniyati:** K-pop, K-drama, kimchi, hanbok\n\n**Qiziqarli faktlar:**\n- 🍜 Kimchi — Koreyaning milliy taomi, 200+ tur mavjud\n- 🎵 K-pop — dunyoga mashhur (BTS, BLACKPINK va h.k.)\n- 📺 K-drama — "Crash Landing on You", "Squid Game"\n- 🎌 Hanbok — an'anaviy koreys kiyimi\n- 🏔️ Bulguksa — qadimiy buddist ibodatxonasi\n\nKoreys madaniyati haqida boshqa savollaringiz bormi?`
  },
  {
    patterns: ['rahmat', 'tashakkur', 'thank', '감사', 'minnatdorman'],
    response: `천만에요! 😊 Arzimaydi!\n\nKoreys tilida "Arzimaydi" deb bir nechta usullarda deyish mumkin:\n- **천만에요** (cheonmaneyo) — oddiy\n- **아니에요** (anieyo) — yo'q, arzimaydi\n- **도와드릴 수 있어서 기뻐요** — yordam bera olganimdan xursandman\n\nYana savollaringiz bo'lsa, bemalol so'rashingiz mumkin! 🌸`
  },
  {
    patterns: ['salom', 'assalom', 'hello', 'hi', '안녕', '안녕하세요', 'qalaysiz'],
    response: `안녕하세요! 👋 Salom!\n\nMen **Asiye AI** — koreys tilini o'rganish bo'yicha aqlli yordamchiman. 🌸\n\nSizga qanday yordam bera olaman?\n- Istalgan so'z yoki gap tarjima qilish\n- Grammatika haqida so'rashingiz mumkin\n- Koreys tilida suhbatlashish\n- Test savollari yoki boshqa savollar\n\nBemalol yozing! 😊`
  },
  {
    patterns: ['koreys raqamlar', 'raqamlar', 'sonlar', 'koreysda nechachi'],
    response: `Koreys tilida **2 ta raqam tizimi** mavjud: 🔢\n\n**1. Koreys raqamlari (한국어 숫자):**\n1 — 하나 (hana)\n2 — 둘 (dul)\n3 — 셋 (set)\n4 — 넷 (net)\n5 — 다섯 (daseot)\n\n**2. Xitoy-koreys raqamlari (한자 숫자):**\n1 — 일 (il)\n2 — 이 (i)\n3 — 삼 (sam)\n4 — 사 (sa)\n5 — 오 (o)\n\n**Qachon qaysi ishlatiladi?**\n- Koreys raqamlari: narsalarni sanash, yosh\n- Xitoy-koreys: sana, pul, telefon raqam\n\n**Misol:**\n- 나이가 스물다섯이에요 — Mening yoshim 25 (koreys)\n- 가격은 오천원이에요 — Narxi 5000 won (xitoy-koreys)`
  },
  {
    patterns: ['koreys ranglar', 'ranglar', 'colors korean'],
    response: `**Koreys tilidagi ranglar:** 🎨\n\n- 🔴 **빨간색** (ppalgansaek) — Qizil\n- 🔵 **파란색** (paransaek) — Ko'k\n- 🟢 **초록색** (choroksaek) — Yashil\n- 🟡 **노란색** (noransaek) — Sariq\n- ⚪ **흰색** (hwinsek) — Oq\n- ⚫ **검은색** (geomeunsaek) — Qora\n- 🟤 **갈색** (galsaek) — Jigarrang\n- 💗 **분홍색** (bunhongsae) — Pushti\n\n**Misol:**\n- 하늘이 파란색이에요 — Osmon ko'k rang\n- 꽃이 빨간색이에요 — Gul qizil rang`
  },
  {
    patterns: ['oilа', 'oila', 'otam', 'onam', 'aka', 'opa', 'koreysda oila'],
    response: `**Koreys tilida oila a'zolari:** 👨‍👩‍👧‍👦\n\n- 👨 **아버지** (abeoji) — Ota\n- 👩 **어머니** (eomeoni) — Ona\n- 👦 **형/오빠** (hyeong/oppa) — Akka (erkak uchun)\n- 👧 **언니** (eonni) — Opa (erkak uchun)\n- 👦 **남동생** (namdongsaeng) — Uka\n- 👧 **여동생** (yeodongsaeng) — Singil\n- 👴 **할아버지** (harabeoji) — Bobo\n- 👵 **할머니** (halmeoni) — Buvi\n\n**Muhim:** Koreys tilida qarindoshlik atamalari yoshga qarab farq qiladi!\n\n**Misol:**\n- 아버지는 선생님이에요 — Otam o'qituvchi`
  }
]

// ========================
// Translation Dictionary (Uzbek ↔ Korean)
// ========================
const translationDict = {
  // Uzbek → Korean
  'salom': '안녕하세요 (annyeonghaseyo)',
  'rahmat': '감사합니다 (gamsahamnida)',
  'xayr': '안녕히 가세요 (annyeonghi gaseyo)',
  'iltimos': '제발 (jebal) / 부탁드립니다 (jebuteumnida)',
  'ha': '네 (ne)',
  'yoq': '아니요 (aniyo)',
  'yaxshi': '좋아요 (joayo) / 좋아요 (kayo)',
  'yomon': '나빠요 (nappayo)',
  'katta': '크다 (keuda)',
  'kichik': '작다 (jakda)',
  'muzlik': '춥다 (chuptda)',
  'issiq': '덥다 (deuptda)',
  'suv': '물 (mul)',
  'non': '빵 (ppang)',
  'uy': '집 (jip)',
  'maktab': '학교 (hyeogyo)',
  'kitob': '책 (chaek)',
  'muhabbat': '사랑 (sarang)',
  'do\'st': '친구 (chingu)',
  'oilа': '가족 (gajok)',
  'ishaq': '사랑 (sarang)',
  'qiz': '여자 (yeoja)',
  'yigit': '남자 (namja)',
  'bola': '아이 (ai)',
  'kishi': '사람 (saram)',
  'kun': '날 (nal)',
  'tun': '밤 (bam)',
  'ertaga': '내일 (naeil)',
  'kecha': '어제 (eoje)',
  'bugun': '오늘 (oneul)',
  'bu yerda': '여기 (yeogi)',
  'u yerda': '거기 (geogi)',
  'nima': '무엇 (mueot)',
  'kim': '누구 (nugu)',
  'qayerda': '어디 (eodi)',
  'qachon': '언제 (eonje)',
  'qanday': '어떻게 (otteoke)',
  'nega': '왜 (wae)',
  'nechta': '몇 (myeot)',
  'men': '나/저 (na/jeo)',
  'sen': '너 (neo)',
  'u': '그/그녀 (geu/geunyeo)',
  'biz': '우리 (uri)',
  'siz': '당신/여러분 (dangsin/yeoreobun)',
  'yurak': '마음 (maeum)',
  'ko\'z': '눈 (nun)',
  'quloq': '귀 (gwi)',
  'og\'iz': '입 (ip)',
  'qo\'l': '손 (son)',
  'oyoq': '발 (bal)',
  'bosh': '머리 (meori)',
  'meva': '과일 (gwail)',
  'sabzavot': '야채 (yachae)',
  'go\'sht': '고기 (gogi)',
  'baliq': '생선 (saengseon)',
  'choy': '차 (cha)',
  'qahva': '커피 (keopi)',
  'pul': '돈 (don)',
  'ish': '일 (il)',
  'o\'yin': '게임 (gemi)',
  'musiqa': '음악 (eumak)',
  'film': '영화 (yeonghwa)',
  'shahar': '도시 (dosi)',
  'qishloq': '시골 (sigol)',
  'ko\'cha': '길 (gil)',
  'darvoza': '문 (mun)',
  'deraza': '창문 (changmun)',
  'osmon': '하늘 (haneul)',
  'quyosh': '해 (hae)',
  'oy': '달 (dal)',
  'yulduz': '별 (byul)',
  'yomg\'ir': '비 (bi)',
  'qor': '눈 (nun)',
  'shamol': '바람 (baram)',
  'bahor': '봄 (bom)',
  'yoz': '여름 (yeoreum)',
  'kuz': '가을 (ga-eul)',
  'qish': '겨울 (gyeoul)',
  'dushanba': '월요일 (woryoil)',
  'seshanba': '화요일 (hwayoil)',
  'chorshanba': '수요일 (suyoil)',
  'payshanba': '목요일 (mogyoil)',
  'juma': '금요일 (geumyoil)',
  'shanba': '토요일 (toyoil)',
  'yakshanba': '일요일 (ilyoil)',
  'bir': '하나/일 (hana/il)',
  'ikki': '둘/이 (dul/i)',
  'uch': '셋/삼 (set/sam)',
  'to\'rt': '넷/사 (net/sa)',
  'besh': '다섯/오 (daseot/o)',
  'olti': '여섯/육 (yeoseot/yuk)',
  'yetti': '일곱/칠 (ilgop/chil)',
  'sakkiz': '여덟/팔 (yeodeol/pal)',
  'to\'qqiz': '아홉/구 (ahop/gu)',
  'o\'n': '열/십 (yeol/sip)',
  'yuz': '백 (baek)',
  'ming': '천 (cheon)',
  'yigirma': '스물 (seumul)',
  'o\'ttiz': '서른 (seoreun)',
  'qirq': '마흔 (maheun)',
  'ellik': '쉰 (shin)',
  'yuz': '백 (baek)',
  'ming': '천 (cheon)',
  'yuz ming': '십만 (simman)',
  'million': '백만 (baekman)',
  // Korean → Uzbek
  '안녕하세요': 'Salom',
  '감사합니다': 'Rahmat',
  '사랑': 'Muhabbat',
  '친구': 'Do\'st',
  '물': 'Suv',
  '밥': 'Ovqat/plov',
  '학교': 'Maktab',
  '책': 'Kitob',
  '집': 'Uy',
  '사람': 'Kishi',
  '가족': 'Oilа',
  '음악': 'Musiqa',
  '영화': 'Film',
  '커피': 'Qahva',
  '도시': 'Shahar',
  '하늘': 'Osmon',
  '비': 'Yomg\'ir',
  '별': 'Yulduz',
  '눈': 'Ko\'z / Qor',
  '손': 'Qo\'l',
  '머리': 'Bosh',
  '마음': 'Yurak',
  '일': 'Ish',
  '돈': 'Pul',
  '길': 'Ko\'cha',
  '꽃': 'Gul',
  '나무': 'Daraxt',
  '강': 'Daryo',
  '산': 'Tog\'',
  '바다': 'Dengiz',
  '고양이': 'Mushuk',
  '개': 'It',
  '새': 'Qush',
  '물고기': 'Baliq',
  '과일': 'Meva',
  '야채': 'Sabzavot',
  '고기': 'Go\'sht',
  '빵': 'Non',
  '차': 'Choy',
  '오늘': 'Bugun',
  '내일': 'Ertaga',
  '어제': 'Kecha',
  '여기': 'Bu yerda',
  '저기': 'Shu yerda',
  '거기': 'U yerda',
  '무엇': 'Nima',
  '누구': 'Kim',
  '어디': 'Qayerda',
  '언제': 'Qachon',
  '어떻게': 'Qanday',
  '왜': 'Nega',
  '나': 'Men',
  '너': 'Sen',
  '우리': 'Biz',
  '좋아요': 'Yaxshi / Yoqadi',
  '크다': 'Katta',
  '작다': 'Kichik',
  '덥다': 'Issiq',
  '춥다': 'Sovuq',
  '봄': 'Bahor',
  '여름': 'Yoz',
  '가을': 'Kuz',
  '겨울': 'Qish',
  '월요일': 'Dushanba',
  '화요일': 'Seshanba',
  '수요일': 'Chorshanba',
  '목요일': 'Payshanba',
  '금요일': 'Juma',
  '토요일': 'Shanba',
  '일요일': 'Yakshanba'
}

// ========================
// Intent Detection
// ========================
function detectIntent(message) {
  const msg = message.toLowerCase().trim()

  // Identity questions
  const identityKeywords = ['seni kim yaratgan', 'kim yaratdi', 'sen kim', 'sen nima', 'sen haqingda', 'isming nima', 'who created', 'who made']
  if (identityKeywords.some(kw => msg.includes(kw))) return 'identity'

  // Greeting keywords
  const greetingKeywords = ['salom', 'assalom', 'hello', 'hi', '안녕', '안녕하세요']
  if (greetingKeywords.some(kw => msg.includes(kw))) return 'greeting'

  // Thank you keywords
  const thankKeywords = ['rahmat', 'tashakkur', 'thank', '감사', 'minnatdorman']
  if (thankKeywords.some(kw => msg.includes(kw))) return 'thanks'

  // Test keywords
  const testKeywords = ['test', 'savol', 'tekshir', 'quiz', 'sinf', 'test savoli', 'savollar']
  if (testKeywords.some(kw => msg.includes(kw))) return 'test'

  // Grammar keywords
  const grammarKeywords = ['grammatika', 'qoida', 'qanday ishlatiladi', 'qanday yoziladi', 'grammar', '문법']
  if (grammarKeywords.some(kw => msg.includes(kw))) return 'grammar'

  // Translation keywords
  const translationKeywords = ['tarjima', 'nima degani', 'nima degan', 'ma\'no', 'ma\'nosi', 'tarjimasi', 'translate', '번역', '뜻']
  if (translationKeywords.some(kw => msg.includes(kw))) return 'translation'

  // Help keywords
  const helpKeywords = ['yordam', 'help', 'nima qila olasiz', 'yordam bering', '도움', 'qanday yordam']
  if (helpKeywords.some(kw => msg.includes(kw))) return 'help'

  // Check if message contains Korean characters — could be translation or conversation
  const hasKorean = /[가-힣]/.test(message)

  // Check general knowledge
  for (const entry of generalKnowledge) {
    if (entry.patterns.some(p => msg.includes(p))) return 'general'
  }

  // Check if it's a simple word that might need translation
  if (hasKorean && msg.length < 20) return 'translation'

  // Check if message is a single word or short phrase — likely translation
  if (msg.split(/\s+/).length <= 3 && !hasKorean) {
    // Check if it's in our dictionary
    for (const key of Object.keys(translationDict)) {
      if (msg.includes(key) || key.includes(msg)) return 'translation'
    }
  }

  // Default: try to handle as general conversation or translation
  return 'conversation'
}

// ========================
// Word Search
// ========================
function searchWord(query) {
  const q = query.trim().toLowerCase()

  // Search in Korean field
  let results = allWords.filter(w =>
    w.korean.includes(q) || q.includes(w.korean.toLowerCase())
  )

  // Search in meaning field
  if (results.length === 0) {
    results = allWords.filter(w =>
      w.meaning.toLowerCase().includes(q) || q.includes(w.meaning.toLowerCase())
    )
  }

  return results
}

// ========================
// Grammar Search
// ========================
function searchGrammar(query) {
  const q = query.trim().toLowerCase()

  return grammarPoints.filter(g =>
    g.pattern.toLowerCase().includes(q) ||
    g.title.toLowerCase().includes(q) ||
    g.explanation.toLowerCase().includes(q) ||
    q.includes(g.pattern.toLowerCase())
  )
}

// ========================
// Dictionary Translation
// ========================
function searchDictionary(query) {
  const q = query.trim().toLowerCase()

  // Search in dictionary
  for (const [key, value] of Object.entries(translationDict)) {
    if (q.includes(key.toLowerCase()) || key.toLowerCase().includes(q)) {
      return { from: key, to: value }
    }
  }

  // Search in word databases
  const wordResults = searchWord(query)
  if (wordResults.length > 0) {
    return { from: wordResults[0].korean, to: wordResults[0].meaning, example: wordResults[0].example }
  }

  return null
}

// ========================
// Translation Response
// ========================
function generateTranslationResponse(message) {
  const msg = message.trim()

  // Remove common prefixes
  let query = msg.replace(/^(tarjima|nima degani|nima degan|ma\'no|tarjimasi|translate|번역|뜻)\s*(qil|qilish|qiling|qilingan|ber|bering|qilish|qiladigan)\s*(bering|qil|qiling|qilish|qiladigan)?\s*:?\s*/i, '').trim()

  // If query is too short, try the whole message
  if (query.length < 2) query = msg

  // Search in dictionary first
  const dictResult = searchDictionary(query)
  if (dictResult) {
    let response = `📖 **${dictResult.from}** → ${dictResult.to}`
    if (dictResult.example) {
      response += `\n\n💡 Misol: ${dictResult.example}`
    }
    return response
  }

  // Search in word databases
  const wordResults = searchWord(query)
  if (wordResults.length > 0) {
    const word = wordResults[0]
    let response = `📖 **${word.korean}** → ${word.meaning}`
    if (word.example) {
      response += `\n\n💡 Misol: ${word.example}`
    }
    if (word.category) {
      response += `\n\n📂 Kategoriya: ${word.category}`
    }
    return response
  }

  // Search in grammar
  const grammarResults = searchGrammar(query)
  if (grammarResults.length > 0) {
    const g = grammarResults[0]
    let response = `📝 **${g.pattern}** — ${g.title}\n\n${g.explanation}`
    if (g.example) {
      response += `\n\n💡 Misol: ${g.example} (${g.translation})`
    }
    return response
  }

  return `😔 Kechirasiz, men "${query}" so'zini topa olmadim.\n\nLekin, boshqa so'zlar haqida so'rashingiz mumkin! Men 455+ koreys so'zi va 100+ grammatika qoidasi haqida bilaman.`
}

// ========================
// Grammar Response
// ========================
function generateGrammarResponse(message) {
  const msg = message.trim()

  // Remove common prefixes
  let query = msg.replace(/^(grammatika|qoida|grammar|문법)\s*:?\s*/i, '').trim()

  if (query.length < 2) query = msg

  const results = searchGrammar(query)

  if (results.length > 0) {
    const g = results[0]
    let response = `📝 **${g.pattern}** — ${g.title}\n\n${g.explanation}`
    if (g.example) {
      response += `\n\n💡 Misol: ${g.example}\n📖 Tarjima: ${g.translation}`
    }
    response += `\n\n📊 Daraja: ${g.level}`
    return response
  }

  // Show random grammar if no match
  const randomGrammar = grammarPoints[Math.floor(Math.random() * grammarPoints.length)]
  let response = `😔 "${query}" bo'yicha aniq topilmadi. Lekin, mana bir grammatika qoidasi:\n\n`
  response += `📝 **${randomGrammar.pattern}** — ${randomGrammar.title}\n\n`
  response += `${randomGrammar.explanation}\n\n`
  response += `💡 Misol: ${randomGrammar.example} (${randomGrammar.translation})`
  return response
}

// ========================
// Test Question Generation
// ========================
function generateTestQuestion() {
  const testType = Math.random() > 0.5 ? 'word' : 'grammar'

  if (testType === 'word') {
    const correctWord = allWords[Math.floor(Math.random() * allWords.length)]
    const wrongAnswers = []

    while (wrongAnswers.length < 3) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)]
      if (randomWord.id !== correctWord.id && !wrongAnswers.includes(randomWord.meaning)) {
        wrongAnswers.push(randomWord.meaning)
      }
    }

    const answers = [correctWord.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5)
    const correctIndex = answers.indexOf(correctWord.meaning)

    return {
      type: 'test',
      question: `"${correctWord.korean}" so'zining tarjimasi nima?`,
      answers: answers,
      correctIndex: correctIndex,
      explanation: `${correctWord.korean} — ${correctWord.meaning}` + (correctWord.example ? `\nMisol: ${correctWord.example}` : '')
    }
  } else {
    const correctGrammar = grammarPoints[Math.floor(Math.random() * grammarPoints.length)]
    const wrongAnswers = []

    while (wrongAnswers.length < 3) {
      const randomGrammar = grammarPoints[Math.floor(Math.random() * grammarPoints.length)]
      if (randomGrammar.id !== correctGrammar.id && !wrongAnswers.includes(randomGrammar.title)) {
        wrongAnswers.push(randomGrammar.title)
      }
    }

    const answers = [correctGrammar.title, ...wrongAnswers].sort(() => Math.random() - 0.5)
    const correctIndex = answers.indexOf(correctGrammar.title)

    return {
      type: 'test',
      question: `"${correctGrammar.pattern}" grammatika qoidasining nomi nima?`,
      answers: answers,
      correctIndex: correctIndex,
      explanation: `${correctGrammar.pattern} — ${correctGrammar.title}\n${correctGrammar.explanation}`
    }
  }
}

// ========================
// General Knowledge Response
// ========================
function generateGeneralResponse(message) {
  const msg = message.toLowerCase().trim()

  for (const entry of generalKnowledge) {
    if (entry.patterns.some(p => msg.includes(p))) {
      return entry.response
    }
  }

  return null
}

// ========================
// Auto Translation (detect and translate without prefix)
// ========================
function tryAutoTranslate(message) {
  const msg = message.trim()

  // If it contains Korean, try to translate
  const hasKorean = /[가-힣]/.test(msg)

  if (hasKorean) {
    // Search in dictionary
    for (const [key, value] of Object.entries(translationDict)) {
      if (msg.includes(key) || key.includes(msg)) {
        return `📖 **${key}** → ${value}`
      }
    }

    // Search in word databases
    const wordResults = searchWord(msg)
    if (wordResults.length > 0) {
      const word = wordResults[0]
      let response = `📖 **${word.korean}** → ${word.meaning}`
      if (word.example) {
        response += `\n\n💡 Misol: ${word.example}`
      }
      return response
    }
  }

  // If it's a short Uzbek word, try to find Korean equivalent
  if (msg.split(/\s+/).length <= 3 && !hasKorean) {
    for (const [key, value] of Object.entries(translationDict)) {
      if (msg.toLowerCase() === key.toLowerCase() || msg.toLowerCase().includes(key.toLowerCase())) {
        return `📖 **${key}** → ${value}`
      }
    }

    // Search in word databases by meaning
    const wordResults = allWords.filter(w =>
      w.meaning.toLowerCase().includes(msg.toLowerCase())
    )
    if (wordResults.length > 0) {
      const word = wordResults[0]
      let response = `📖 **${word.korean}** → ${word.meaning}`
      if (word.example) {
        response += `\n\n💡 Misol: ${word.example}`
      }
      return response
    }
  }

  return null
}

// ========================
// Conversation Replies
// ========================
function generateConversationReply(message) {
  const msg = message.toLowerCase().trim()

  // Greetings
  if (msg.includes('salom') || msg.includes('assalom') || msg.includes('hello') || msg.includes('hi') || msg.includes('안녕')) {
    const greetings = [
      `안녕하세요! 👋 Salom! Men **Asiye AI** — koreys tilini o'rganish bo'yicha aqlli yordamchiman. 🌸\n\nSizga qanday yordam bera olaman? Istalgan savol bering!`,
      `안녕하세요! 👋 Assalomu alaykum! Men Asiye AI, koreys tilini o'rganishda yordam berishdan xursandman! 🌸`,
      `Salom! 😊 Men Asiye AI. Koreys tilida suhbatlashishni boshlaymizmi?`
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // How are you
  if (msg.includes('qalaysiz') || msg.includes('yashasiz') || msg.includes('어떻게')) {
    return `저는 잘 있어요! 😊 Men yaxshiman, rahmat! Siz qalaysiz?\n\nKoreys tilida "Qalaysiz?" deb so'rash uchun: **어떻게 지내세요?** (otteoke jinaeseyo?)`
  }

  // Thank you
  if (msg.includes('rahmat') || msg.includes('tashakkur') || msg.includes('감사') || msg.includes('thank')) {
    const thanks = [
      `천만에요! 😊 Arzimaydi! Yana savollaringiz bo'lsa, bemalol so'rashingiz mumkin! 🌸`,
      `도와드릴 수 있어서 기뻐요! 😊 Yordam bera olganimdan xursandman!`
    ]
    return thanks[Math.floor(Math.random() * thanks.length)]
  }

  // Korean phrases explanation
  if (msg.includes('감사합니다') || msg.includes('고마워')) {
    return `**감사합니다** (gamsahamnida) — "Rahmat" degan ma'noni beradi. Rasmiy uslubda ishlatiladi.\n\n**고마워** (gomawo) — "Rahmat" degan ma'noni beradi. Norasmiy uslubda, do'stlar bilan ishlatiladi.`
  }

  if (msg.includes('안녕하세요')) {
    return `**안녕하세요** (annyeonghaseyo) — "Salom" degan ma'noni beradi. Bu eng keng tarqalgan salomlashish usuli.\n\nBoshqa salomlashish usullari:\n- **안녕** (annyeong) — norasmiy "Salom"\n- **반갑습니다** (bangapseumnida) — "Tanishganimdan xursandman"`
  }

  // Try auto-translate for Korean text
  const hasKorean = /[가-힣]/.test(message)
  if (hasKorean) {
    const autoResult = tryAutoTranslate(message)
    if (autoResult) return autoResult
  }

  // Try auto-translate for short Uzbek words
  if (msg.split(/\s+/).length <= 3) {
    const autoResult = tryAutoTranslate(message)
    if (autoResult) return autoResult
  }

  // Check general knowledge
  const generalResult = generateGeneralResponse(message)
  if (generalResult) return generalResult

  // Default conversation replies
  const defaultReplies = [
    `Yaxshi savol! 🤔\n\nMen **Asiye AI** — koreys tilini o'rganish bo'yicha aqlli yordamchiman. 🌸\n\nSizga quyidagilar yordam bera olaman:\n\n📖 **Tarjima** — Istalgan so'z yoki gap yozing, tarjima qilib beraman\n📝 **Grammatika** — "grammatika: qoida" deb yozing\n🧠 **Test** — "test" deb yozing\n💬 **Suhbat** — koreys tilida yozing\n\nMisol:\n- "사랑 nima degani?"\n- "grammatika: 은/는"\n- "test"\n- "seni kim yaratgan?"`,
    `Men **Asiye AI**! 🌸\n\nSavolingizni tushundim, lekin aniqroq javob berish uchun quyidagilardan foydalanishingiz mumkin:\n\n📖 So'z tarjimasi uchun so'zni yozing\n📝 Grammatika haqida so'rashingiz mumkin\n🧠 Test savollari uchun "test" deb yozing\n\nQanday yordam bera olaman?`,
    `Koreys tilini o'rganish ajoyib! 💪\n\nMen **Asiye AI** — sizning shaxsiy koreys o'qituvchingiz. 🌸\n\nMen 455+ koreys so'zi va 100+ grammatika qoidasi haqida bilaman. Shuningdek, koreys madaniyati, TOPIK imtihoni va boshqa mavzularda ham yordam bera olaman.\n\nQaysi mavzuda yordam kerak?`
  ]

  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)]
}

// ========================
// Main AI Response Generator
// ========================
function generateAIResponse(message, chatHistory = []) {
  if (!message || !message.trim()) return null

  const intent = detectIntent(message)

  switch (intent) {
    case 'identity':
      return {
        type: 'text',
        content: generateConversationReply(message)
      }

    case 'translation':
      return {
        type: 'text',
        content: generateTranslationResponse(message)
      }

    case 'grammar':
      return {
        type: 'text',
        content: generateGrammarResponse(message)
      }

    case 'test':
      const test = generateTestQuestion()
      return {
        type: 'test',
        content: test
      }

    case 'greeting':
      return {
        type: 'text',
        content: generateConversationReply(message)
      }

    case 'thanks':
      return {
        type: 'text',
        content: generateConversationReply(message)
      }

    case 'help':
      return {
        type: 'text',
        content: `🌸 **Asiye AI** — Koreys tilini o'rganish bo'yicha aqlli yordamchi\n\nMen sizga quyidagilar yordam bera olaman:\n\n📖 **Tarjima** — Istalgan so'z yoki gap yozing\n📝 **Grammatika** — "grammatika: qoida" deb yozing\n💬 **Suhbat** — koreys tilida yozing\n🧠 **Test** — "test" deb yozing\n🌍 **Umumiy savollar** — Koreys madaniyati, TOPIK va boshqa\n\nMisol savollar:\n- "사랑 nima degani?"\n- "seni kim yaratgan?"\n- "koreys alifbo haqida"\n- "test"\n- "안녕하세요"`
      }

    case 'general':
      return {
        type: 'text',
        content: generateGeneralResponse(message) || generateConversationReply(message)
      }

    case 'conversation':
    default:
      return {
        type: 'text',
        content: generateConversationReply(message)
      }
  }
}

export { generateAIResponse, detectIntent, searchWord, searchGrammar, generateTestQuestion, generateConversationReply, allWords, grammarPoints }
