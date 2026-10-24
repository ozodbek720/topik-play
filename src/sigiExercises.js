// TOPIK II — Sigi (Yozish) mashqlari
// Bo'sh joy to'ldirish mashqlari — har bir gapga taxminiy javob, tarjima, AI tahlil va misollar
// Eslatma: Bular taxminiy javoblar, AI odam emas, xato qilishi mumkin

export default [
  {
    id: 1,
    sentence: '벌써 한 해가 끝나는 12월이 되었습니다. 그래서 다음주 금요일에 __________. 송년회에는 외국인 학생이면 누구나 참석할 수 있습니다. 많은 참여 바랍니다.',
    answer: '송년회를 열기로 했습니다',
    examples: [
      '회의 시간을 정하기로 했습니다',
      '매주 운동하기로 했습니다',
      '함께 공부하기로 했습니다',
      '내일 아침에 만나기로 했습니다'
    ],
    translation: 'Allaqachon yil oxiri bo\'lgan dekabr oyiga keldik. Shuning uchun keyin juma kunida yil yakuniy kechasini o\'tkazishga qaror qildik. Yil yakuniy kechaga chet el talabalari ham ishtirok etishi mumkin. Ko\'p ishtirok etishni so\'raymiz.',
    analysis: 'Bu gapda "~기로 했습니다" (qaror qildim) iborasi ishlatiladi. Bu shakl kelajakda biror ishni qilishga qaror qilishni bildiradi. "송년회" (yil yakuniy kecha) — yil oxirida o\'tkaziladigan tadbir.',
    grammar: '~기로 하다 — biror ishni qilishga qaror qilish, kelishish',
    vocabulary: [
      { word: '벌써', meaning: 'allaqachon, allaqachon', type: 'zarb' },
      { word: '끝나다', meaning: 'tugash, oxiriga yetish', type: 'fe\'l' },
      { word: '금요일', meaning: 'juma kuni', type: 'ot' },
      { word: '송년회', meaning: 'yil yakuniy kecha', type: 'ot' },
      { word: '외국인', meaning: 'chet ellik, xorijiy', type: 'ot' },
      { word: '학생', meaning: 'talaba, o\'quvchi', type: 'ot' },
      { word: '누구나', meaning: 'har kim, barcha', type: 'zot' },
      { word: '참석하다', meaning: 'ishtirok etish', type: 'fe\'l' },
      { word: '참여', meaning: 'ishtirok', type: 'ot' },
      { word: '바랍니다', meaning: 'iltimos qilmoq, so\'ramoq', type: 'fe\'l' }
    ]
  },
  {
    id: 2,
    sentence: '선배님, 이번에 원하던 회사에 __________. 들었습니다. 선배님의 취직을 진심으로 축하드립니다. 앞으로 좋은 일만 가득하길 바랍니다.',
    answer: '합격하셨다는 소식을',
    examples: [
      '이직하셨다는 소식을 들었습니다',
      '결혼하셨다는 소식을 전했습니다',
      '출산하셨다는 소식을 알았습니다',
      '이사를 갔다는 소식을 전해 들었습니다'
    ],
    translation: 'Katta aka/opa, bu safar xohlagan kompaniyaga qabul qilinganligingizni eshitdim. Sizning ishga kirishingizni chin qildan kutlayman. Kelajakda faqat yaxshi ishlar bo\'lsin.',
    analysis: '"~다는 소식을 들었습니다" — biror xabarni eshitishni bildiradi. "~셨다는" — hurmat shakli (하십시오) bilan xabar so\'zining birlashmasi. "취직" (ishga kirish) — ish topish, ishga joylashish.',
    grammar: '~다는 소식을 듣다 — biror xabarni eshitish',
    vocabulary: [
      { word: '선배님', meaning: 'katta aka/opa, senior', type: 'ot' },
      { word: '이번에', meaning: 'bu safar, bu marta', type: 'zarb' },
      { word: '원하다', meaning: 'xohlash, istamoq', type: 'fe\'l' },
      { word: '회사', meaning: 'kompaniya, korxona', type: 'ot' },
      { word: '합격하다', meaning: 'qabul qilinish, imtihondan o\'tish', type: 'fe\'l' },
      { word: '소식', meaning: 'xabar, yangilik', type: 'ot' },
      { word: '듣다', meaning: 'eshitmoq', type: 'fe\'l' },
      { word: '취직', meaning: 'ishga kirish', type: 'ot' },
      { word: '진심으로', meaning: 'chin dildan, halovatdan', type: 'zarb' },
      { word: '축하하다', meaning: 'tabriklamoq, kutlamoq', type: 'fe\'l' },
      { word: '앞으로', meaning: 'kelajakda, oldinga', type: 'zarb' },
      { word: '가득하다', meaning: 'to\'la, to\'ldiq', type: 'sifat' }
    ]
  },
  {
    id: 3,
    sentence: '한국 친구한테서 참새이 초대를 받았습니다. 그런데 집들이에 갈 때 어떤 __________? 저는 한국 사람이 아니라서 집들이 선물에 대해 잘 모르겠습니다.',
    answer: '선물을 사야 할지 고민입니다',
    examples: [
      '어디에 가야 할지 고민입니다',
      '무엇을 먹어야 할지 고민입니다',
      '어떤 옷을 입어야 할지 고민입니다',
      '누구에게 말해야 할지 고민입니다'
    ],
    translation: 'Koreys do\'stimdan uy ko\'chish kechasiga taklif oldim. Lekin uy ko\'chish kechasiga borgan qanday sovg\'a sotib olish kerakligini bilmayapman. Men koreys odam emasligim uchun uy ko\'chish sovg\'asi haqida yaxshi bilmayman.',
    analysis: '"~해야 할지 고민입니다" — nima qilish kerakligini bilmay, o\'ylayotganini bildiradi. "집들이" (uy ko\'chish kechasi) — yangi uyga ko\'chganida o\'tkaziladigan an\'ana. "참새이" — bu yerda "초대" (taklif) so\'zi to\'g\'ri keladi.',
    grammar: '~해야 할지 모르다/고민이다 — nima qilish kerakligini bilmay o\'ylamoq',
    vocabulary: [
      { word: '친구', meaning: 'do\'st', type: 'ot' },
      { word: '초대', meaning: 'taklif', type: 'ot' },
      { word: '받다', meaning: 'olmoq', type: 'fe\'l' },
      { word: '그런데', meaning: 'lekin, ammo', type: 'so\'z' },
      { word: '집들이', meaning: 'uy ko\'chish kechasi', type: 'ot' },
      { word: '선물', meaning: 'sovg\'a', type: 'ot' },
      { word: '사다', meaning: 'sotib olmoq', type: 'fe\'l' },
      { word: '고민', meaning: 'tashvish, o\'ylanish', type: 'ot' },
      { word: '대해', meaning: 'haqida, to\'g\'risida', type: 'so\'z' },
      { word: '잘', meaning: 'yaxshi', type: 'zarb' }
    ]
  },
  {
    id: 4,
    sentence: '도려주신 덕분에 프로젝트를 성공적으로 마쳤습니다. 감사합니다 마음으로 __________. 여러분을 위해 준비한 자리이니 오셔서 축하 파티를 즐기시게 됩니다.',
    answer: '감사의 마음을 전하고 싶습니다',
    examples: [
      '축하의 말을 전하고 싶습니다',
      '사과의 뜻을 전하고 싶습니다',
      '인사를 드리고 싶습니다',
      '감동을 표현하고 싶습니다'
    ],
    translation: 'Yordamingiz tufayli loyihani muvaffaqiyatli yakunladim. Minnatdorchilik bildirishni xohlayman. Sizlar uchun tayyorlangan joy, keling va tabrik kechasini bahramand bo\'ling.',
    analysis: '"~으로 ~고 싶습니다" — biror his-tuyg\'uni bildirishni xohlash. "덕분에" — tufayli, sabab tufayli. "성공적으로" — muvaffaqiyatli.',
    grammar: '~고 싶다 — xohlash, istamoq',
    vocabulary: [
      { word: '덕분에', meaning: 'tufayli, sabab tufayli', type: 'so\'z' },
      { word: '프로젝트', meaning: 'loyiha, projekt', type: 'ot' },
      { word: '성공적으로', meaning: 'muvaffaqiyatli', type: 'zarb' },
      { word: '마치다', meaning: 'yakunlamoq, tugatmoq', type: 'fe\'l' },
      { word: '감사', meaning: 'minnatdorchilik', type: 'ot' },
      { word: '마음', meaning: 'yurak, qalb', type: 'ot' },
      { word: '전하다', meaning: 'yetkazmoq, bildirmoq', type: 'fe\'l' },
      { word: '준비하다', meaning: 'tayyorlamoq', type: 'fe\'l' },
      { word: '자리', meaning: 'joy, o\'rin', type: 'ot' },
      { word: '즐기다', meaning: 'bahramand bo\'lmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 5,
    sentence: '오래 전부터 기다리던 사람을 만나서 드디어 결혼을 하게 되었습니다. 바비리디오로 오셔서 __________. 축하해 주시는 모든 분들의 마음을 생각하며 서로 아끼고 사랑하며 살아가겠습니다.',
    answer: '축하해 주시기를 바랍니다',
    examples: [
      '도움 주시기를 바랍니다',
      '참석해 주시기를 바랍니다',
      '이해해 주시기를 바랍니다',
      '기다려 주시기를 바랍니다'
    ],
    translation: 'Uzoq vaqtdan beri kutgan odamni uchrashib, nihoyat turmush quramiz. Keling va bizni kutlang. Kutlayotgan barcha odamlarning yuragini o\'ylab, bir-birimizni qadrlab va sevib yashaymiz.',
    analysis: '"~게 되었습니다" — biror holat yuz berdi, sodir bo\'ldi. "~기를 바랍니다" — tilak bildirmoq, umid qilmoq. "드디어" — nihoyat, oxir-oqibat.',
    grammar: '~게 되다 — biror holat yuz berish, sodir bo\'lish',
    vocabulary: [
      { word: '오래', meaning: 'uzoq vaqt', type: 'zarb' },
      { word: '기다리다', meaning: 'kutmoq', type: 'fe\'l' },
      { word: '만나다', meaning: 'uchrashmoq', type: 'fe\'l' },
      { word: '드디어', meaning: 'nihoyat, oxir-oqibat', type: 'zarb' },
      { word: '결혼', meaning: 'turmush, nikoh', type: 'ot' },
      { word: '축하', meaning: 'tabrik, kutlash', type: 'ot' },
      { word: '바라다', meaning: 'tilak qilmoq, umid qilmoq', type: 'fe\'l' },
      { word: '모든', meaning: 'barcha, hamma', type: 'sifat' },
      { word: '분', meaning: 'odam, shaxs (hurmat)', type: 'ot' },
      { word: '생각하다', meaning: 'o\'ylamoq', type: 'fe\'l' },
      { word: '아끼다', meaning: 'qadrlamoq', type: 'fe\'l' },
      { word: '사랑', meaning: 'sevgi', type: 'ot' }
    ]
  },
  {
    id: 6,
    sentence: '다음 주 토요일에 우리 집에서 생일 파티를 하려고 합니다. 시간이 되시면 오셔서 고향 음식도 먹고 이야기도 하면서 함께 즐거운 시간을 __________.',
    answer: '보내셨으면 합니다',
    examples: [
      '도와주셨으면 합니다',
      '알려주셨으면 합니다',
      '기다려주셨으면 합니다',
      '이해해 주셨으면 합니다'
    ],
    translation: 'Keyin shanba kunida bizning uyda tug\'ilgan kun kechasi o\'tkazmoqchiman. Vaqtingiz bo\'lsa, keling, vatandosh taomlarini yeb, suhbatlashib, birga xursand vaqt o\'tkazing.',
    analysis: '"~려고 합니다" — niyat, reja bildirmoq. "~셨으면 합니다" — tilak bildirmoq, xohlash (hurmat shaklida). "고향 음식" — vatandosh taomlari, ona yurt ovqatlari.',
    grammar: '~려고 하다 — niyat bildirmoq, qilmoqchi bo\'lmoq',
    vocabulary: [
      { word: '다음', meaning: 'keyingi', type: 'sifat' },
      { word: '주', meaning: 'hafta', type: 'ot' },
      { word: '토요일', meaning: 'shanba kuni', type: 'ot' },
      { word: '집', meaning: 'uy', type: 'ot' },
      { word: '생일', meaning: 'tug\'ilgan kun', type: 'ot' },
      { word: '파티', meaning: 'kecha, partiya', type: 'ot' },
      { word: '시간', meaning: 'vaqt', type: 'ot' },
      { word: '고향', meaning: 'vatandosh, ona yurt', type: 'ot' },
      { word: '음식', meaning: 'ovqat, taom', type: 'ot' },
      { word: '이야기', meaning: 'suhbat, hikoya', type: 'ot' },
      { word: '함께', meaning: 'birga, hamkorlikda', type: 'zarb' },
      { word: '즐거운', meaning: 'xursand, quvonarli', type: 'sifat' }
    ]
  },
  {
    id: 7,
    sentence: '은정 씨가 교환 학생으로 미국에 가게 되어 __________. 송별회 시간과 장소는 따로 알려드리겠습니다. 은정 씨는 아직 모르니 비밀을 __________.',
    answer: '송별회를 열기로 했습니다',
    examples: [
      '환영회를 열기로 했습니다',
      '기념식을 열기로 했습니다',
      '모임을 열기로 했습니다',
      '파티를 열기로 했습니다'
    ],
    translation: 'Unjon Amerika Qo\'shma Shtatlariga almashinuv talabasi sifatida ketishi kerak bo\'lgani uchun xayr kechasi o\'tkazishga qaror qildik. Xayr kechasining vaqti va joyi alohida xabar beriladi. Unjon hali bilmaydi, shuning uchun sirda saqlang.',
    analysis: '"~게 되어" — biror holat yuz berdi, sodir bo\'ldi. "송별회" — xayr kechasi, yo\'l qo\'yish kechasi. "비밀을 지켜주세요" — sirda saqlang.',
    grammar: '~게 되다 — biror holat yuz berish',
    vocabulary: [
      { word: '교환', meaning: 'almashinuv, almashtirish', type: 'ot' },
      { word: '학생', meaning: 'talaba, o\'quvchi', type: 'ot' },
      { word: '미국', meaning: 'Amerika Qo\'shma Shtatlari', type: 'ot' },
      { word: '송별회', meaning: 'xayr kechasi, yo\'l qo\'yish', type: 'ot' },
      { word: '시간', meaning: 'vaqt', type: 'ot' },
      { word: '장소', meaning: 'joy, manzil', type: 'ot' },
      { word: '따로', meaning: 'alo\'hida, alohida', type: 'zarb' },
      { word: '알려주다', meaning: 'xabar berib qo\'ymoq', type: 'fe\'l' },
      { word: '아직', meaning: 'hali, hozircha', type: 'zarb' },
      { word: '비밀', meaning: 'sir, maxfiy', type: 'ot' }
    ]
  },
  {
    id: 8,
    sentence: '입학을 축하드립니다. 대학생활이 즐거울 때도 있지만 힘들 때도 있을 것입니다. 하지만 노력하면 꿈을 __________. 같이 이루어지는 그날 함께 웃고 싶습니다.',
    answer: '이룰 수 있을 것이라고 믿습니다',
    examples: [
      '성공할 것이라고 믿습니다',
      '잘될 것이라고 생각합니다',
      '이겨낼 것이라고 확신합니다',
      '변화할 것이라고 기대합니다'
    ],
    translation: 'O\'quvga kirishingizni kutlayman. Universitet hayoti ba\'zan quvonarli bo\'lishi mumkin, lekin ba\'zan qiyin bo\'ladi. Lekin harakat qilsangiz, orzuingizga erisha olasiz deb ishonaman. Birga amalga oshadigan kun birga kulmoqchiman.',
    analysis: '"~다고 믿습니다" — ishonmoq, e\'tiqod qilmoq. "입학" — o\'quvga kirish, qabul qilinish. "대학생활" — universitet hayoti.',
    grammar: '~다고 믿다 — ishonmoq, e\'tiqod qilmoq',
    vocabulary: [
      { word: '입학', meaning: 'o\'quvga kirish, qabul', type: 'ot' },
      { word: '축하', meaning: 'tabrik, kutlash', type: 'ot' },
      { word: '대학생활', meaning: 'universitet hayoti', type: 'ot' },
      { word: '즐거울', meaning: 'quvonarli, yoqimli', type: 'sifat' },
      { word: '때', meaning: 'vaqt, payt', type: 'ot' },
      { word: '힘들다', meaning: 'qiyin bo\'lmoq', type: 'sifat' },
      { word: '노력', meaning: 'harakat, mehnat', type: 'ot' },
      { word: '꿈', meaning: 'orzu, tush', type: 'ot' },
      { word: '이루다', meaning: 'amalga oshirmoq', type: 'fe\'l' },
      { word: '믿다', meaning: 'ishonmoq, e\'tiqod qilmoq', type: 'fe\'l' },
      { word: '그날', meaning: 'shu kun, o\'sha kun', type: 'ot' },
      { word: '웃다', meaning: 'kulmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 9,
    sentence: '한글날 기념 글짓기 대회에서 수상한 것을 진심으로 축하드립니다. 평소엔 열심히 글을 썼기 때문에 당연한 상을 __________. 생각했습니다.',
    answer: '받으실 거라고',
    examples: [
      '오실 거라고 생각했습니다',
      '알아들으실 거라고 믿었습니다',
      '기뻐하실 거라고 예상했습니다',
      '동의하실 거라고 느꼈습니다'
    ],
    translation: 'Xangul kuni yozish musobaqasida mukofot olganligingizni chin qildan kutlayman. Odatda qattiq yozganingiz uchun tabiiy mukofot olasiz deb o\'yladim.',
    analysis: '"~을 거라고 생각했습니다" — shunday bo\'ladi deb o\'yladim. "수상하다" — mukofot olish. "당연한" — tabiiy, o\'z-o\'zidan tushunarli.',
    grammar: '~을/를 거라고 생각하다 — shunday bo\'ladi deb o\'ylamoq',
    vocabulary: [
      { word: '한글날', meaning: 'Xangul kuni (Koreya alifbosining kuni)', type: 'ot' },
      { word: '기념', meaning: 'yubiley, eslash', type: 'ot' },
      { word: '글짓기', meaning: 'yozish, inshu yozish', type: 'ot' },
      { word: '대회', meaning: 'musobaqa, konferensiya', type: 'ot' },
      { word: '수상', meaning: 'mukofot olish', type: 'ot' },
      { word: '진심으로', meaning: 'chin dildan, halovatdan', type: 'zarb' },
      { word: '평소', meaning: 'odatda, odatiy', type: 'zarb' },
      { word: '열심히', meaning: 'qattiq, harakat bilan', type: 'zarb' },
      { word: '쓰다', meaning: 'yozmoq', type: 'fe\'l' },
      { word: '당연한', meaning: 'tabiiy, o\'z-o\'zidan tushunarli', type: 'sifat' },
      { word: '상', meaning: 'mukofot, sovrin', type: 'ot' },
      { word: '받다', meaning: 'olmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 10,
    sentence: '먼저 선배님들의 __________. 그리고 졸업을 축하하기 위해 오신 선생님들과 가족분들께 감사의 인사를 드립니다. 오늘은 정말 기쁘고 행복한 날입니다.',
    answer: '관심과 격려에 감사드립니다',
    examples: [
      '도와주신 분들에게 감사드립니다',
      '기다려주신 분들에게 감사드립니다',
      '참여해 주신 분들에게 감사드립니다',
      '지원해 주신 분들에게 감사드립니다'
    ],
    translation: 'Avvalo katta aka/opolarning e\'tibori va rag\'batiga minnatdorchilik bildiramiz. Shuningdek, bitiruvni kutlash uchun kelingan o\'qituvchilar va oila a\'zolariga minnatdorchilik bildiramiz. Bugun juda xursand va baxtli kun.',
    analysis: '"먼저 ~에 감사드립니다" — avvalo minnatdorchilik bildirmoq. "격려" — rag\'bat, qo\'llab-quvvatlash. "인사" — salom, so\'z, nutq.',
    grammar: '~에 감사하다 — minnatdorchilik bildirmoq',
    vocabulary: [
      { word: '먼저', meaning: 'avvalo, birinchi navbatda', type: 'zarb' },
      { word: '선배님', meaning: 'katta aka/opa, senior', type: 'ot' },
      { word: '관심', meaning: 'e\'tibor, qiziqish', type: 'ot' },
      { word: '격려', meaning: 'rag\'bat, qo\'llab-quvvatlash', type: 'ot' },
      { word: '감사', meaning: 'minnatdorchilik', type: 'ot' },
      { word: '졸업', meaning: 'bitiruv, tamomlash', type: 'ot' },
      { word: '선생님', meaning: 'o\'qituvchi, ustoz', type: 'ot' },
      { word: '가족', meaning: 'oilа, oila a\'zolari', type: 'ot' },
      { word: '인사', meaning: 'salom, so\'z, nutq', type: 'ot' },
      { word: '드리다', meaning: 'bermoq (hurmat shakli)', type: 'fe\'l' },
      { word: '기쁘다', meaning: 'xursand bo\'lmoq', type: 'sifat' },
      { word: '행복한', meaning: 'baxtli', type: 'sifat' }
    ]
  },
  {
    id: 11,
    sentence: '그저께 소나기가 오는 날 저녁에 __________. 감사합니다. 우산이 없으면 옷이 젖어서 감기에 걸릴 뻔했습니다. 내일 학교에 가서 우산을 돌려 드리겠습니다.',
    answer: '우산을 빌려주셔서',
    examples: [
      '도움을 주셔서 감사합니다',
      '기다려주셔서 감사합니다',
      '알려주셔서 감사합니다',
      '도와주셔서 감사합니다'
    ],
    translation: 'Kechagi yomg\'ir yog\'ayotgan kuni kechqurun soyabonni so\'raganingiz uchun rahmat. Soyabon bo\'lmasa kiyimlarim ho\'lab, sovuqqa tutilib qolardim. Ertaga maktabga borib soyabonni qaytaraman.',
    analysis: '"~셔서 감사합니다" — hurmat bilan minnatdorchilik bildirmoq. "소나기" — yomg\'ir, chaqmoqli yomg\'ir. "뻔하다" — deyarli sodir bo\'lmoq, chekkada turmoq.',
    grammar: '~셔서 감사합니다 — hurmat bilan rahmat aytmoq',
    vocabulary: [
      { word: '그저께', meaning: 'kechagi, kecha ertangi', type: 'zarb' },
      { word: '소나기', meaning: 'yomg\'ir, chaqmoqli yomg\'ir', type: 'ot' },
      { word: '저녁', meaning: 'kechqurun', type: 'ot' },
      { word: '우산', meaning: 'soyabon', type: 'ot' },
      { word: '빌리다', meaning: 'so\'ramoq, ijaraga olmoq', type: 'fe\'l' },
      { word: '젖다', meaning: 'ho\'l bo\'lmoq', type: 'fe\'l' },
      { word: '감기', meaning: 'sovuqqa tutish', type: 'ot' },
      { word: '걸리다', meaning: 'tutilmoq, yopishmoq', type: 'fe\'l' },
      { word: '뻔하다', meaning: 'deyarli, chekkada', type: 'sifat' },
      { word: '돌리다', meaning: 'qaytarmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 12,
    sentence: '선배님, 우리가 제주도에서 있는 동안 친절하게 __________. 감사합니다. 선배님의 덕분에 이번에 기차에 늦는 줄이었어요 어땠습니다.',
    answer: '대해 주셔서',
    examples: [
      '도와주셔서 감사합니다',
      '기다려주셔서 감사합니다',
      '알려주셔서 감사합니다',
      '챙겨주셔서 감사합니다'
    ],
    translation: 'Katta aka/opa, biz Jejudo orolida bo\'lganimiz davomida mehribonlik ko\'rsatganingiz uchun rahmat. Sizning tufaylingiz bilan bu safar poyezdga kech qolishim mumkin edi.',
    analysis: '"~해 주셔서 감사합니다" — biror ishni qilib berganingiz uchun rahmat. "제주도" — Jeju oroli. "친절하게" — mehribonlik bilan.',
    grammar: '~해 주다 — biror ishni qilib bermoq',
    vocabulary: [
      { word: '선배님', meaning: 'katta aka/opa, senior', type: 'ot' },
      { word: '제주도', meaning: 'Jeju oroli', type: 'ot' },
      { word: '동안', meaning: 'davomida', type: 'ot' },
      { word: '친절하게', meaning: 'mehribonlik bilan', type: 'zarb' },
      { word: '대하다', meaning: 'muomala qilmoq', type: 'fe\'l' },
      { word: '덕분에', meaning: 'tufayli', type: 'so\'z' },
      { word: '기차', meaning: 'poyezd', type: 'ot' },
      { word: '늦다', meaning: 'kech qolmoq', type: 'sifat' }
    ]
  },
  {
    id: 13,
    sentence: '개인 사정으로 이번 달까지만 일할 수 있을 것 같습니다. 갑자기 __________. 그동안 가족처럼 돌봐 주셔서 감사합니다. 따뜻한 마음을 잊지 않겠습니다.',
    answer: '사직서를 제출합니다',
    examples: [
      '퇴사서를 제출합니다',
      '이직을 결정했습니다',
      '직장을 옮기게 되었습니다',
      '회사에서 나가게 되었습니다'
    ],
    translation: 'Shaxsiy sabablarga ko\'ra bu oygacha ishlay olaman deb o\'ylayman. Birdan ishdan ketish haqida xabar beraman. Uzoq vaqt davomida oila a\'zosi kabi parvarish qilganingiz uchun rahmat. Issiq yuringizni unutmayman.',
    analysis: '"사직서" — ishdan ketish to\'g\'risidagi ariza. "~까지만" — faqat shu paytgacha. "갑자기" — birdan, kutilmagan holda.',
    grammar: '~까지만 — faqat shu paytgacha',
    vocabulary: [
      { word: '개인', meaning: 'shaxsiy', type: 'sifat' },
      { word: '사정', meaning: 'sabab, vaziyat', type: 'ot' },
      { word: '이번', meaning: 'bu, joriy', type: 'sifat' },
      { word: '달', meaning: 'oy', type: 'ot' },
      { word: '일하다', meaning: 'ishlamoq', type: 'fe\'l' },
      { word: '갑자기', meaning: 'birdan, kutilmagan holda', type: 'zarb' },
      { word: '사직서', meaning: 'ishdan ketish arizasi', type: 'ot' },
      { word: '제출하다', meaning: 'topshirmoq, taqdim etmoq', type: 'fe\'l' },
      { word: '가족', meaning: 'oilа', type: 'ot' },
      { word: '돌보다', meaning: 'parvarish qilmoq', type: 'fe\'l' },
      { word: '따뜻한', meaning: 'issiq, iliq', type: 'sifat' },
      { word: '잊다', meaning: 'unutmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 14,
    sentence: '그날 행사가 예정보다 늦게 시작했습니다. 저희 불꽃놀이 바쁘신 분들을 1시간이나 __________. 죄송합니다. 다음에는 제시간에 시작하도록 하겠습니다.',
    answer: '기다리게 해서',
    examples: [
      '늦게 해서 죄송합니다',
      '기다리게 해서 죄송합니다',
      '불편하게 해서 죄송합니다',
      '걱정시켜서 죄송합니다'
    ],
    translation: 'O\'sha kuni tadbir rejalangan vaqtdan kechroq boshlandi. Bizning foyavor o\'yinlar sizning vaqtingizni 1 soat davomida kutkazdik. Kechirasiz. Keyingi safar o\'z vaqtida boshlashga harakat qilamiz.',
    analysis: '"~게 해서 죄송합니다" — biror holat yuzaga keltirgani uchun uzr so\'ramoq. "예정보다" — rejalangan vaqtdan. "불꽃놀이" — foyavor o\'yinlar.',
    grammar: '~게 해서 죄송합니다 — uzr so\'ramoq',
    vocabulary: [
      { word: '행사', meaning: 'tadbir, chora-tadbir', type: 'ot' },
      { word: '예정', meaning: 'reja, rejalangan', type: 'ot' },
      { word: '늦게', meaning: 'kechroq', type: 'zarb' },
      { word: '시작하다', meaning: 'boshlamoq', type: 'fe\'l' },
      { word: '저희', meaning: 'biz (hurmat)', type: 'ot' },
      { word: '불꽃놀이', meaning: 'foyavor o\'yinlari', type: 'ot' },
      { word: '바쁘신', meaning: 'band, mashg\'ul', type: 'sifat' },
      { word: '분', meaning: 'odam, shaxs', type: 'ot' },
      { word: '시간', meaning: 'soat, vaqt', type: 'ot' },
      { word: '기다리다', meaning: 'kutmoq', type: 'fe\'l' },
      { word: '죄송합니다', meaning: 'kechirasiz', type: 'fe\'l' }
    ]
  },
  {
    id: 15,
    sentence: '같은 일을 저희들에게 잘 만드시는 분이라고 식힌 만든 __________. 감사합니다. 제가 우습지도 않은 반사에서 어떻게 감사한 마음을 전해야 할지 모르겠습니다.',
    answer: '도와주셔서',
    examples: [
      '기다려주셔서 감사합니다',
      '알려주셔서 감사합니다',
      '챙겨주셔서 감사합니다',
      '이해해 주셔서 감사합니다'
    ],
    translation: 'Bir xil ishni bizga yaxshi qilib beradigan odam ekaningizni bildim. Rahmat. Men hazil emas, jiddiy holatda minnatdorchilikni qanday bildirishni bilmayapman.',
    analysis: '"~다고 하다" — deyish, aytish. "만들다" — qilmoq, yaratmoq. "전하다" — yetkazmoq, bildirmoq.',
    grammar: '~다고 하다 — deyish, aytish',
    vocabulary: [
      { word: '같은', meaning: 'bir xil, o\'xshash', type: 'sifat' },
      { word: '일', meaning: 'ish, ish', type: 'ot' },
      { word: '저희들', meaning: 'biz (hurmat)', type: 'ot' },
      { word: '잘', meaning: 'yaxshi', type: 'zarb' },
      { word: '만들다', meaning: 'qilmoq, yaratmoq', type: 'fe\'l' },
      { word: '분', meaning: 'odam, shaxs', type: 'ot' },
      { word: '우습다', meaning: 'kulgili bo\'lmoq', type: 'sifat' },
      { word: '반사', meaning: 'refleks, holat', type: 'ot' },
      { word: '어떻게', meaning: 'qanday', type: 'zarb' },
      { word: '전하다', meaning: 'yetkazmoq, bildirmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 16,
    sentence: '선생님, 1년 동안 저희들에게 한국말을 __________. 정말 감사합니다. 처음에는 인사말도 몰랐는데 선생님 덕분에 점점 한국말을 __________. 감사합니다. 친절했던 덕분에 한국 생활에 빨리 적응할 수 있었습니다.',
    answer: '가르쳐 주셔서',
    examples: [
      '도와주셔서 감사합니다',
      '가르쳐 주셔서 감사합니다',
      '알려주셔서 감사합니다',
      '도와주셔서 감사합니다'
    ],
    translation: 'O\'qituvchi, 1 yil davomida bizga koreys tilini o\'rgatganingiz uchun rahmat. Dastlab salomlashishni ham bilmay edim, lekin sizning tufaylingiz bilan asta-sekin koreys tilini o\'rganib oldim.',
    analysis: '"가르치다" — o\'rgatmoq, o\'qitmoq. "~해 주셔서 감사합니다" — qilib berganingiz uchun rahmat. "점점" — asta-sekin.',
    grammar: '~해 주셔서 감사합니다 — qilib berganingiz uchun rahmat',
    vocabulary: [
      { word: '선생님', meaning: 'o\'qituvchi, ustoz', type: 'ot' },
      { word: '1년', meaning: '1 yil', type: 'ot' },
      { word: '동안', meaning: 'davomida', type: 'ot' },
      { word: '한국말', meaning: 'koreys tili', type: 'ot' },
      { word: '가르치다', meaning: 'o\'rgatmoq, o\'qitmoq', type: 'fe\'l' },
      { word: '처음', meaning: 'birinchi, boshida', type: 'ot' },
      { word: '인사말', meaning: 'salomlashish so\'zlari', type: 'ot' },
      { word: '점점', meaning: 'asta-sekin', type: 'zarb' },
      { word: '적응하다', meaning: 'moslashmoq', type: 'fe\'l' },
      { word: '빨리', meaning: 'tez', type: 'zarb' }
    ]
  },
  {
    id: 17,
    sentence: '한국 생활이 처음이라 모르는 것이 많습니다. 그래서 질문을 많이 했는데 그때마다 __________. 감사합니다. 친절했던 덕분에 한국 생활에 빨리 적응할 수 있었습니다.',
    answer: '자세히 설명해 주셔서',
    examples: [
      '자세히 알려주셔서 감사합니다',
      '인내심 있게 들어주셔서 감사합니다',
      '자세히 가르쳐 주셔서 감사합니다',
      '친절하게 도와주셔서 감사합니다'
    ],
    translation: 'Koreyada hayot birinchi marta, bilmaydigan narsalar ko\'p. Shuning uchun ko\'p savollar berdim, har safar batafsil tushuntirib berganingiz uchun rahmat.',
    analysis: '"자세히" — batafsil, tafsilotli. "설명하다" — tushuntirmoq, izoh bermoq. "그때마다" — har safar, har bir marta.',
    grammar: '~해 주셔서 감사합니다 — qilib berganingiz uchun rahmat',
    vocabulary: [
      { word: '한국', meaning: 'Koreya', type: 'ot' },
      { word: '생활', meaning: 'hayot, turmush', type: 'ot' },
      { word: '처음', meaning: 'birinchi marta', type: 'ot' },
      { word: '모르다', meaning: 'bilmaymoq', type: 'fe\'l' },
      { word: '질문', meaning: 'savol', type: 'ot' },
      { word: '많이', meaning: 'ko\'p, ko\'p miqdorda', type: 'zarb' },
      { word: '그때마다', meaning: 'har safar', type: 'so\'z' },
      { word: '자세히', meaning: 'batafsil', type: 'zarb' },
      { word: '설명하다', meaning: 'tushuntirmoq', type: 'fe\'l' },
      { word: '친절했던', meaning: 'mehribon bo\'lgan', type: 'sifat' }
    ]
  },
  {
    id: 18,
    sentence: '친수 씨가 거짓말 했다고 생각했는데 그 일은 거의 __________. 자세한 내용을 모르고 죄송합니다. 앞으로는 이런 일이 없도록 하겠습니다.',
    answer: '오해였습니다',
    examples: [
      '오해가 있었습니다',
      '잘못 이해했습니다',
      '알아듣지 못했습니다',
      '잘못된 정보가 있었습니다'
    ],
    translation: 'Chinsu yolg\'on gapirgan deb o\'yladim, lekin bu ish deyarli noto\'g\'ri tushunish edi. Batafsil ma\'lumotni bilmaganim uchun kechirasiz. Kelajakda bunday holat yuz bermasligiga harakat qilaman.',
    analysis: '"오해" — noto\'g\'ri tushunish, xato tushunish. "거의" — deyarli, taxminan. "자세한" — batafsil, tafsilotli.',
    grammar: '~다고 생각하다 — deb o\'ylamoq',
    vocabulary: [
      { word: '거짓말', meaning: 'yolg\'on', type: 'ot' },
      { word: '했다', meaning: 'qilgan', type: 'fe\'l' },
      { word: '생각하다', meaning: 'o\'ylamoq', type: 'fe\'l' },
      { word: '거의', meaning: 'deyarli', type: 'zarb' },
      { word: '오해', meaning: 'noto\'g\'ri tushunish', type: 'ot' },
      { word: '자세한', meaning: 'batafsil', type: 'sifat' },
      { word: '내용', meaning: 'mazmun, tarkib', type: 'ot' },
      { word: '모르다', meaning: 'bilmaymoq', type: 'fe\'l' },
      { word: '앞으로는', meaning: 'kelajakda', type: 'zarb' }
    ]
  },
  {
    id: 19,
    sentence: '오늘 아침에 우체국에 가서 갑자기 고장 나는 __________. 죄송합니다. 수리가 끝나면 예약하겠습니다. 불편하시더라도 조금만 더 기다려 주십시오.',
    answer: '컴퓨터가 있어서',
    examples: [
      '컴퓨터가 고장 나서',
      '장비가 고장 나서',
      '시스템이 고장 나서',
      '장치가 고장 나서'
    ],
    translation: 'Bugun ertalab pochtaga borib, birdan kompyuter ishdan chiqqani uchun kechirasiz. Ta\'mirlash tugagandan so\'ng oldindan buyurtma qilaman. Noqulaylik bo\'lsa ham biroz ko\'proq kutishingizni so\'rayman.',
    analysis: '"우체국" — pochta bo\'limi. "고장 나다" — ishdan chiqmoq, buzilmoq. "예약하다" — oldindan buyurtma qilmoq.',
    grammar: '~아서/어서 — chunki, sabab bildirish',
    vocabulary: [
      { word: '오늘', meaning: 'bugun', type: 'zarb' },
      { word: '아침', meaning: 'ertalab', type: 'ot' },
      { word: '우체국', meaning: 'pochta bo\'limi', type: 'ot' },
      { word: '갑자기', meaning: 'birdan', type: 'zarb' },
      { word: '고장', meaning: 'buzilish, nosozlik', type: 'ot' },
      { word: '나다', meaning: 'yuz berish', type: 'fe\'l' },
      { word: '수리', meaning: 'ta\'mirlash', type: 'ot' },
      { word: '끝나다', meaning: 'tugash', type: 'fe\'l' },
      { word: '예약하다', meaning: 'oldindan buyurtma qilmoq', type: 'fe\'l' },
      { word: '불편하다', meaning: 'noqulay bo\'lmoq', type: 'sifat' },
      { word: '조금', meaning: 'biron oz', type: 'zarb' },
      { word: '기다리다', meaning: 'kutmoq', type: 'fe\'l' }
    ]
  },
  {
    id: 20,
    sentence: '잘못된 정보를 알려 드려서 죄송합니다. 박물관 문 닫는 시간이 6시간을 일곱을 더 다시 물어 보니 __________. 여쭤봐 답려 겨울에는 1시간 빨리 문을 닫는데 확인을 못했습니다. 다음에는 꼭 __________. 하겠습니다.',
    answer: '확인하고',
    examples: [
      '확인하겠습니다',
      '잘 확인하겠습니다',
      '자세히 확인하겠습니다',
      '반드시 확인하겠습니다'
    ],
    translation: 'Noto\'g\'ri ma\'lumot berganim uchun kechirasiz. Muzeyning yopilish vaqti 6 soat ekanligini yana so\'rab ko\'rdim. Qishda 1 soat erta yopiladi, lekin tekshirmadim. Keyingi safar albatta tekshiraman.',
    analysis: '"잘못된" — noto\'g\'ri, xato. "일곱" — yetti. "여쭤보다" — so\'ramoq (hurmat). "확인하다" — tekshirmoq, tasdiqlamoq.',
    grammar: '~고 — va, keyin',
    vocabulary: [
      { word: '잘못된', meaning: 'noto\'g\'ri, xato', type: 'sifat' },
      { word: '정보', meaning: 'ma\'lumot', type: 'ot' },
      { word: '알려 드리다', meaning: 'xabar bermoq (hurmat)', type: 'fe\'l' },
      { word: '죄송합니다', meaning: 'kechirasiz', type: 'fe\'l' },
      { word: '박물관', meaning: 'muzey', type: 'ot' },
      { word: '닫다', meaning: 'yopmoq', type: 'fe\'l' },
      { word: '시간', meaning: 'soat, vaqt', type: 'ot' },
      { word: '일곱', meaning: 'yetti', type: 'ot' },
      { word: '다시', meaning: 'qayta, yana', type: 'zarb' },
      { word: '확인', meaning: 'tekshirish, tasdiqlash', type: 'ot' },
      { word: '꼭', meaning: 'albatta, aniq', type: 'zarb' }
    ]
  }
]
