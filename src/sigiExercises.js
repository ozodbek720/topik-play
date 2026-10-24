// TOPIK II — Sigi (Yozish) mashqlari
// Bo'sh joy to'ldirish mashqlari — har bir gapga javob, tarjima va AI tahlil

export default [
  {
    id: 1,
    sentence: '벌써 한 해가 끝나는 12월이 되었습니다. 그래서 다음주 금요일에 __________. 송년회에는 외국인 학생이면 누구나 참석할 수 있습니다. 많은 참여 바랍니다.',
    answer: '송년회를 열기로 했습니다',
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
  }
]
