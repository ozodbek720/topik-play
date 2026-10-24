// TOPIK II — 51-54 Sigi (Yozish) formulalari va yechish usullari
// Har bir sigi turi uchun formula, e'tibor berish kerak bo'lgan joylar va misollar

export default [
  {
    id: 51,
    title: '51 Sigi — Minnatdorchilik bildirish',
    koreanTitle: '51 쓰기 — 감사의 마음 전하기',
    description: 'Minnatdorchilik, rahmat aytish va minnatdorlik bildirish xat yozish',
    formula: '~해 주셔서 감사합니다',
    formulaKorean: '~아/어 주셔서 감사합니다',
    explanation: 'Biror kishi sizga yordam bergan, biror ish qilib bergan yoki e\'tibor berganida minnatdorchilik bildirasiz. Bu formula rasmiy va hurmatli vaziyatlarda ishlatiladi.',
    keyPoints: [
      'Fe\'lning o\'tgan zamon shakli + 주셔서 감사합니다',
      'Ha, Ra, M, B, D, G, J, S, L, N, R, W, Y, K harflari bilan tugaydigan fe\'llar: ~아 주셔서 감사합니다',
      'S, J, Ch, P harflari bilan tugaydigan fe\'llar: ~어 주셔서 감사합니다',
      'Xat boshida qabul qiluvchining ismi va unvoni yoziladi',
      'Xat oxirida yana bir bor minnatdorchilik bildiriladi'
    ],
    structure: [
      '1. Salomlashish: [Ism] 님,',
      '2. Minnatdorchilik: ~해 주셔서 감사합니다',
      '3. Tafsilot: Nima uchun rahmat aytayotganingizni yozing',
      '4. Yaxshi tilaklar: 앞으로 ~기를 바랍니다',
      '5. Xat oxiri: 감사합니다'
    ],
    examples: [
      {
        korean: '선생님, 1년 동안 한국말을 가르쳐 주셔서 감사합니다.',
        translation: 'O\'qituvchi, 1 yil davomida koreys tilini o\'rgatganingiz uchun rahmat.'
      },
      {
        korean: '친구야, 생일 파티에 초대해 주셔서 감사합니다.',
        translation: 'Do\'stim, tug\'ilgan kun kechasiga taklif qilganingiz uchun rahmat.'
      },
      {
        korean: '동생이 숙제를 도와주셔서 감사합니다.',
        translation: 'Kichik aka/opa uy vazifasida yordam berganingiz uchun rahmat.'
      }
    ],
    tips: [
      'Minnatdorchilik xatida aniq va qisqa yozing',
      'Nima uchun rahmat aytayotganingizni batafsil yozing',
      'Yaxshi tilaklar bilan tugating',
      'Hurmatli shakl (하십시오체) ishlatishni unutmang'
    ]
  },
  {
    id: 52,
    title: '52 Sigi — Uzr so\'rash',
    koreanTitle: '52 쓰기 — 사과하기',
    description: 'Xatolik, kechikish yoki noqulaylik uchun uzr so\'rash xat yozish',
    formula: '~게 해서 죄송합니다',
    formulaKorean: '~아/어서 죄송합니다',
    explanation: 'Biror xato qilganingiz, kechikganingiz yoki noqulaylik keltirganingizda uzr so\'rayapsiz. Rasmiy va norasmiy vaziyatlarda ishlatiladi.',
    keyPoints: [
      'Fe\'lning sabab shakli + 죄송합니다',
      'Ha, Ra, M, B, D, G, J, S, L, N, R, W, Y, K harflari bilan tugaydigan fe\'llar: ~아서 죄송합니다',
      'S, J, Ch, P harflari bilan tugaydigan fe\'llar: ~어서 죄송합니다',
      'Xat boshida nimaga uchun uzr so\'rayotganingizni yozing',
      'Kelajakda bunday holat yuz bermasligiga va\'da bering'
    ],
    structure: [
      '1. Salomlashish: [Ism] 님,',
      '2. Uzr so\'rash: ~게 해서 죄송합니다',
      '3. Sabab: Nima uchun xato sodir bo\'lganini yozing',
      '4. Yechim: Muammoni qanday hal qilishni yozing',
      '5. Va\'da: 앞으로는 ~도록 하겠습니다'
    ],
    examples: [
      {
        korean: '늦게 도착해서 죄송합니다. 내일 제시간에 올게요.',
        translation: 'Kech kelganim uchun kechirasiz. Ertaga o\'z vaqtida kelaman.'
      },
      {
        korean: '잘못된 정보를 알려 드려서 죄송합니다.',
        translation: 'Noto\'g\'ri ma\'lumot berganim uchun kechirasiz.'
      },
      {
        korean: '약속을 잊어버려서 죄송합니다. 다음에는 꼭 기억하겠습니다.',
        translation: 'Va\'dani unutib qo\'yganim uchun kechirasiz. Keyingi safar albatta eslab qolaman.'
      }
    ],
    tips: [
      'Uzr so\'rashda aniq sababni yozing',
      'Yechim taklif qiling',
      'Kelajakda bunday holat yuz bermasligiga va\'da bering',
      'Qisqa va aniq yozing'
    ]
  },
  {
    id: 53,
    title: '53 Sigi — Taklif qilish',
    koreanTitle: '53 쓰기 — 초대하기',
    description: 'Tadbir, kecha yoki uchrashuvga taklif qilish xat yozish',
    formula: '~에 초대합니다',
    formulaKorean: '~에 초대합니다 / ~에 오시기를 바랍니다',
    explanation: 'Biror tadbir, kecha, uchrashuv yoki yig\'ilishga taklif qilayapsiz. Taklif xatida vaqt, joy va tafsilotlar aniq yoziladi.',
    keyPoints: [
      'Taklif qilinayotgan tadbirning nomi aniq yoziladi',
      'Vaqt: 날짜 (sana), 시간 (soat)',
      'Joy: 장소 (joy)',
      'Qo\'shimcha ma\'lumot: kiyinish, olib kelish kerak bo\'lgan narsalar',
      'Javob berish so\'raladi: 참석 여부를 알려주세요'
    ],
    structure: [
      '1. Salomlashish: [Ism] 님,',
      '2. Taklif: ~에 초대합니다',
      '3. Tafsilotlar: 날짜, 시간, 장소',
      '4. Qo\'shimcha ma\'lumot: ~을/를 준비했습니다',
      '5. Javob so\'rash: 참석 여부를 알려주세요',
      '6. Yaxshi tilaklar: 많은 참여 바랍니다'
    ],
    examples: [
      {
        korean: '다음주 금요일에 송년회를 열기로 했습니다. 많은 참여 바랍니다.',
        translation: 'Keyingi juma kunida yil yakuniy kechasini o\'tkazishga qaror qildik. Ko\'p ishtirok etishni so\'raymiz.'
      },
      {
        korean: '주말에 바비큐 파티를 합니다. 오시기를 바랍니다.',
        translation: 'Hafta oxirida barbekyu kechasi o\'tkazamiz. Kelishingizni so\'raymiz.'
      },
      {
        korean: '내일 오후 3시에 커피숍에서 만나기로 했습니다.',
        translation: 'Ertaga soat 3 da kofe do\'konda uchrashishga qaror qildik.'
      }
    ],
    tips: [
      'Taklif xatida vaqt va joy aniq yozilishi kerak',
      'Tadbirning maqsadi qisqacha yozilsin',
      'Javob berish so\'ralishi kerak',
      'Qo\'shimcha ma\'lumotlar (kiyinish, olib kelish) yozilsin'
    ]
  },
  {
    id: 54,
    title: '54 Sigi — Maqsad va qaror bildirish',
    koreanTitle: '54 쓰기 — 목표와 결정 말하기',
    description: 'Kelajakdagi maqsad, qaror va rejalarni yozish',
    formula: '~기로 했습니다',
    formulaKorean: '~기로 하다 / ~기로 결정했습니다',
    explanation: 'Kelajakda biror ishni qilishga qaror qilganingizni yoki maqsad qo\'yganingizni bildirasiz. Bu formula shaxsiy yoki rasmiy vaziyatlarda ishlatiladi.',
    keyPoints: [
      'Fe\'l + 기로 했습니다 — qaror bildirish',
      'Fe\'l + 기로 결정했습니다 — qaror qabul qilish (rasmiy)',
      'Maqsad aniq va o\'lchanishi kerak',
      'Sabab va maqsad yoziladi',
      'Qachon bajarilishi ko\'rsatiladi'
    ],
    structure: [
      '1. Kirish: Bugungi kunda ~',
      '2. Qaror: ~기로 했습니다',
      '3. Sabab: ~하기 위해서',
      '4. Reja: ~할 예정입니다',
      '5. Yaxshi tilaklar: ~기를 바랍니다'
    ],
    examples: [
      {
        korean: '내년부터 매일 한국어를 공부하기로 했습니다.',
        translation: 'Keyingi yildan boshlab har kuni koreys tilini o\'rganishga qaror qildim.'
      },
      {
        korean: 'TOPIK II B1 darajasini olishga qaror qildim.',
        translation: 'TOPIK II B1 darajasini olishga qaror qildim.'
      },
      {
        korean: '매주 한 번씩 한국 친구와 대화하기로 했습니다.',
        translation: 'Har hafta bir marta koreys do\'stim bilan suhbatlashishga qaror qildim.'
      }
    ],
    tips: [
      'Maqsad aniq va o\'lchanishi kerak',
      'Sabab va maqsad yozilsin',
      'Qachon bajarilishi ko\'rsatilishi kerak',
      'Qaror qabul qilishda ishonchli bo\'ling'
    ]
  }
]
