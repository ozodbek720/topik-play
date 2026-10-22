import advancedWords from './advancedWords.js'
import grammarPoints from './grammarPoints.js'
import topik2Lugat from './topik2Lugat.js'

// Combine all word databases
const allWords = [...advancedWords, ...topik2Lugat]

// ========================
// Intent Detection
// ========================
function detectIntent(message) {
  const msg = message.toLowerCase().trim()

  // Translation keywords
  const translationKeywords = ['tarjima', 'nima degani', 'nima degan', 'ma\'no', 'ma\'nosi', 'tarjimasi', 'translate', '번역', '뜻']
  if (translationKeywords.some(kw => msg.includes(kw))) return 'translation'

  // Grammar keywords
  const grammarKeywords = ['grammatika', 'qoida', 'qanday ishlatiladi', 'qanday yoziladi', 'grammar', '문법', 'qoida']
  if (grammarKeywords.some(kw => msg.includes(kw))) return 'grammar'

  // Test keywords
  const testKeywords = ['test', 'savol', 'tekshir', 'quiz', 'sinf', 'test savoli', 'savollar']
  if (testKeywords.some(kw => msg.includes(kw))) return 'test'

  // Greeting keywords
  const greetingKeywords = ['salom', 'assalom', 'hello', 'hi', '안녕', '안녕하세요', 'qalaysiz', 'qalaysiz', 'yashasiz']
  if (greetingKeywords.some(kw => msg.includes(kw))) return 'greeting'

  // Thank you keywords
  const thankKeywords = ['rahmat', 'tashakkur', 'thank', '감사', 'yoq', 'yaxshi', 'ajoyib']
  if (thankKeywords.some(kw => msg.includes(kw))) return 'thanks'

  // Help keywords
  const helpKeywords = ['yordam', 'help', 'qanday', 'nima qila olasiz', 'yordam bering', '도움']
  if (helpKeywords.some(kw => msg.includes(kw))) return 'help'

  // Check if message contains Korean characters
  const hasKorean = /[가-힣]/.test(message)
  if (hasKorean) return 'conversation'

  // Default: conversation
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
// Translation Response
// ========================
function generateTranslationResponse(message) {
  const msg = message.trim()

  // Remove common prefixes
  let query = msg.replace(/^(tarjima|nima degani|nima degan|ma\'no|tarjimasi|translate|번역|뜻)\s*(qil|qilish|qiling|qilingan|ber|bering|qilish|qiladigan|qiladigan)\s*(bering|qil|qiling|qilish|qiladigan|qilish|qiladigan)?\s*:?\s*/i, '').trim()

  // If query is too short, try the whole message
  if (query.length < 2) query = msg

  const results = searchWord(query)

  if (results.length > 0) {
    const word = results[0]
    let response = `📖 **${word.korean}** — ${word.meaning}\n\n`
    if (word.example) {
      response += `💡 Misol: ${word.example}`
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
    let response = `📝 **${g.pattern}** — ${g.title}\n\n`
    response += `${g.explanation}\n\n`
    if (g.example) {
      response += `💡 Misol: ${g.example} (${g.translation})`
    }
    return response
  }

  return `😔 Kechirasiz, men "${query}" so'zini topa olmadim. Iltimos, boshqa so'z yoki grammatika haqida so'rashingiz mumkin.`
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
    let response = `📝 **${g.pattern}** — ${g.title}\n\n`
    response += `${g.explanation}\n\n`
    if (g.example) {
      response += `💡 Misol: ${g.example}\n📖 Tarjima: ${g.translation}`
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
  // Randomly choose between word test and grammar test
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

    // Shuffle answers
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
// Conversation Replies
// ========================
function generateConversationReply(message) {
  const msg = message.toLowerCase().trim()

  // Greetings
  if (msg.includes('salom') || msg.includes('assalom') || msg.includes('hello') || msg.includes('hi') || msg.includes('안녕')) {
    const greetings = [
      `안녕하세요! 👋 Salom! Men AI Koreys o'qituvchisiman. Sizga qanday yordam bera olaman?\n\n📖 Tarjima qilish\n📝 Grammatika yordami\n💬 Suhbat mashqi\n🧠 Test savollari`,
      `안녕하세요! 👋 Assalomu alaykum! Koreys tilini o'rganishda yordam berishdan xursandman!`,
      `Salom! 😊 Koreys tilida suhbatlashishni boshlaymizmi?`
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // How are you
  if (msg.includes('qalaysiz') || msg.includes('qalaysiz') || msg.includes('yashasiz') || msg.includes('어떻게')) {
    return `저는 잘 있어요! 😊 Men yaxshiman, rahmat! Siz qalaysiz?\n\nKoreys tilida "Qalaysiz?" deb so'rash uchun: **어떻게 지내세요?** (otteoke jinaeseyo?)`
  }

  // Thank you
  if (msg.includes('rahmat') || msg.includes('tashakkur') || msg.includes('감사') || msg.includes('thank')) {
    const thanks = [
      `천만에요! 😊 Arzimaydi! Yana savollaringiz bo'lsa, bemalol so'rashingiz mumkin!`,
      `도와드릴 수 있어서 기뻐요! 😊 Yordam bera olganimdan xursandman!`,
      `천만에요! Koreys tilida "Arzimaydi" deb **천만에요** (cheonmaneyo) deyiladi.`
    ]
    return thanks[Math.floor(Math.random() * thanks.length)]
  }

  // Korean phrases
  if (msg.includes('감사합니다') || msg.includes('고마워')) {
    return `**감사합니다** (gamsahamnida) — "Rahmat" degan ma'noni beradi. Rasmiy uslubda ishlatiladi.\n\n**고마워** (gomawo) — "Rahmat" degan ma'noni beradi. Norasmiy uslubda, do'stlar bilan ishlatiladi.`
  }

  if (msg.includes('안녕하세요')) {
    return `**안녕하세요** (annyeonghaseyo) — "Salom" degan ma'noni beradi. Bu eng keng tarqalgan salomlashish usuli.\n\nBoshqa salomlashish usullari:\n- **안녕** (annyeong) — norasmiy "Salom"\n- **반갑습니다** (bangapseumnida) — "Tanishganimdan xursandman"`
  }

  // Love, like
  if (msg.includes('yoqadi') || msg.includes('yoqtiraman') || msg.includes('좋아')) {
    return `Koreys tilida "yoqadi" yoki "yoqtiraman" deb **좋아해요** (johaeheyo) deyiladi.\n\n💡 Misollar:\n- 한국어를 좋아해요 — Koreys tilini yoqtiraman\n- 음악을 좋아해요 — Musiqani yoqtiraman\n- 커피를 좋아해요 — Qahvani yoqtiraman`
  }

  // Food
  if (msg.includes('ovqat') || msg.includes('taom') || msg.includes('yeyman') || msg.includes('먹')) {
    return `Koreys tilida ovqat haqida gapirish:\n\n🍚 **먹다** (meokda) — yemoq\n- 밥을 먹어요 — Ovqat yeysiz\n- 김치를 먹어요 — Kimchi yeysiz\n\n🍜 **맛있어요** (masisseyo) — mazali\n- 이 음식이 맛있어요 — Bu taom mazali\n\n🥤 **마시다** (masida) — ichmoq\n- 물을 마셔요 — Suv ichaman`
  }

  // Default conversation replies
  const defaultReplies = [
    `Yaxshi savol! 🤔 Men koreys tilini o'rganishda yordam beradigan AI o'qituvchiman.\n\nSizga quyidagilar yordam bera olaman:\n\n📖 **Tarjima** — "tarjima: so'z" deb yozing\n📝 **Grammatika** — "grammatika: qoida" deb yozing\n🧠 **Test** — "test" deb yozing\n💬 **Suhbat** — koreys tilida yozing`,
    `Men hali o'rganayapman! 😅 Lekin sizga yordam berishga harakat qilaman.\n\n📖 Tarjima uchun: "tarjima: so'z"\n📝 Grammatika uchun: "grammatika: qoida"\n🧠 Test uchun: "test"`,
    `Koreys tilida suhbatlashish ajoyib mashq! 💪\n\nMen sizga yordam bera olaman:\n- So'zlar tarjima qilish\n- Grammatika tushuntirish\n- Test savollari berish\n\nQaysi biri bilan boshlaymiz?`
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
        content: `🤖 **AI Koreys o'qituvchisi**\n\nMen sizga koreys tilini o'rganishda yordam beraman!\n\n📖 **Tarjima** — "tarjima: so'z" deb yozing\n📝 **Grammatika** — "grammatika: qoida" deb yozing\n💬 **Suhbat** — koreys tilida yozing\n🧠 **Test** — "test" deb yozing\n\nMisol:\n- "tarjima: 사랑"\n- "grammatika: 은/는"\n- "test"\n- "안녕하세요"`
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
