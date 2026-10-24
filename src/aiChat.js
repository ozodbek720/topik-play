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
    patterns: ['koreys alifbo', 'hangul', '한글', 'koreys harflar', 'harflarni o\'rgat', 'harflarni oyrat', 'alifbo', 'koreys harf'],
    response: `**Hangul (한글)** — koreys alifbosi, 1443-yilda Sejong the Great tomonidan yaratilgan. 📝\n\nHangul 14 ta asosiy undosh va 10 ta asosiy unli harfdan iborat.\n\n**Asosiy undoshlar (14 ta):**\n\n| Harf | O'qilishi | Misol |\n|------|-----------|-------|\n| ㄱ | g/k | 가 (ga) |\n| ㄴ | n | 나 (na) |\n| ㄷ | d/t | 다 (da) |\n| ㄹ | r/l | 라 (ra) |\n| ㅁ | m | 마 (ma) |\n| ㅂ | b/p | 바 (ba) |\n| ㅅ | s | 사 (sa) |\n| ㅇ | ng/— | 아 (a) |\n| ㅈ | j | 자 (ja) |\n| ㅊ | ch | 차 (cha) |\n| ㅋ | k (kuchli) | 카 (ka) |\n| ㅌ | t (kuchli) | 타 (ta) |\n| ㅍ | p (kuchli) | 파 (pa) |\n| ㅎ | h | 하 (ha) |\n\n**Asosiy unli harflar (10 ta):**\n\n| Harf | O'qilishi | Misol |\n|------|-----------|-------|\n| ㅏ | a | 가 (ga) |\n| ㅑ | ya | 야 (ya) |\n| ㅓ | eo | 서 (seo) |\n| ㅕ | yeo | 여 (yeo) |\n| ㅗ | o | 고 (go) |\n| ㅛ | yo | 요 (yo) |\n| ㅜ | u | 구 (gu) |\n| ㅠ | yu | 유 (yu) |\n| ㅡ | eu | 수 (su) |\n| ㅣ | i | 기 (gi) |\n\n**Qanday o'qiladi?**\nKoreys harflari bloklar shaklida yoziladi:\n- **Undosh + Unli** = Silaba\n- Misol: ㄱ + ㅏ = 가 (ga)\n\n**Misol so'zlar:**\n- 한국 (han-guk) — Koreya\n- 사랑 (sa-rang) — Muhabbat\n- 안녕하세요 (ann-yeong-ha-se-yo) — Salom\n- 감사합니다 (gam-sa-ham-ni-da) — Rahmat\n\n💡 **Maslahat:** Har kuni 2-3 ta harfni o'rganing va ular bilan oddiy so'zlar yarating!\n\nBatafsilroq biror harf haqida bilmoqchimisiz?`
  },
  {
    patterns: ['undosh', 'undoshlar', 'consonant', 'koreys undosh'],
    response: `**Koreys undosh harflari (자음):** 🔤\n\n**Asosiy undoshlar (14 ta):**\n\n1. **ㄱ** (giyeok) — g/k\n   - 가 (ga), 고 (go), 구 (gu)\n\n2. **ㄴ** (nieun) — n\n   - 나 (na), 노 (no), 누 (nu)\n\n3. **ㄷ** (digeut) — d/t\n   - 다 (da), 도 (do), 두 (du)\n\n4. **ㄹ** (rieul) — r/l\n   - 라 (ra), 로 (ro), 루 (ru)\n\n5. **ㅁ** (mieum) — m\n   - 마 (ma), 모 (mo), 무 (mu)\n\n6. **ㅂ** (bieup) — b/p\n   - 바 (ba), 보 (bo), 부 (bu)\n\n7. **ㅅ** (siot) — s\n   - 사 (sa), 소 (so), 수 (su)\n\n8. **ㅇ** (ieung) — ng/—\n   - 아 (a), 오 (o), 우 (u)\n\n9. **ㅈ** (jieut) — j\n   - 자 (ja), 조 (jo), 주 (ju)\n\n10. **ㅊ** (chieut) — ch\n    - 차 (cha), 초 (cho), 추 (chu)\n\n11. **ㅋ** (kieuk) — k (kuchli)\n    - 카 (ka), 코 (ko), 쿠 (ku)\n\n12. **ㅌ** (tieut) — t (kuchli)\n    - 타 (ta), 토 (to), 투 (tu)\n\n13. **ㅍ** (pieup) — p (kuchli)\n    - 파 (pa), 포 (po), 푸 (pu)\n\n14. **ㅎ** (hieut) — h\n    - 하 (ha), 호 (ho), 후 (hu)\n\n💡 **Eslatma:** ㅇ harfi so'z boshida o'qilmaydi, faqat so'z oxirida "ng" deb o'qiladi.`
  },
  {
    patterns: ['unli', 'unlilar', 'vowel', 'koreys unli'],
    response: `**Koreys unli harflari (모음):** 🔤\n\n**Asosiy unli harflar (10 ta):**\n\n1. **ㅏ** (a) — "a" deb o'qiladi\n   - 가 (ga), 나 (na), 다 (da)\n\n2. **ㅑ** (ya) — "ya" deb o'qiladi\n   - 야 (ya), nya (nya)\n\n3. **ㅓ** (eo) — "o" ga yaqin\n   - 서 (seo), 너 (neo)\n\n4. **ㅕ** (yeo) — "yo" ga yaqin\n   - 여 (yeo)\n\n5. **ㅗ** (o) — "o" deb o'qiladi\n   - 고 (go), 노 (no)\n\n6. **ㅛ** (yo) — "yo" deb o'qiladi\n   - 요 (yo)\n\n7. **ㅜ** (u) — "u" deb o'qiladi\n   - 구 (gu), 무 (mu)\n\n8. **ㅠ** (yu) — "yu" deb o'qiladi\n   - 유 (yu)\n\n9. **ㅡ** (eu) — "e" ga yaqin\n   - 수 (su), 루 (ru)\n\n10. **ㅣ** (i) — "i" deb o'qiladi\n    - 기 (gi), 니 (ni)\n\n**Qo'shimcha unli harflar (11 ta):**\n- ㅐ (ae), ㅔ (e), ㅚ (we), ㅟ (wi)\n- ㅘ (wa), ㅙ (wae), ㅝ (wo), ㅞ (weo)\n- ㅢ (ui), ㅢ (eu+i), ㅢ (wi)\n\n💡 **Maslahat:** Avval 10 ta asosiy unlini o'rganing, keyin qo'shimchalarga o'ting.`
  },
  {
    patterns: ['hangul tarix', 'hangul qachon', 'sejong', 'sejong the great', 'alifbo tarix'],
    response: `**Hangul tarixi:** 📜\n\n**Sejong the Great (세종대왕)** — 1443-yilda Hangul alifbosini yaratgan.\n\n**Nima uchun yaratildi?**\n- Xitoy harflari (한자) juda murakkab edi\n- Oddiy xalq o'qish-yozishni o'rganolmas edi\n- Sejong xalqqa oson yozuv tizimi berishni xohladi\n\n**Hangulning ajoyib tomonlari:**\n- 🧠 Ilmiy asosda yaratilgan\n- 👅 Til harakatini aks ettiradi\n- ⏰ 1-2 haftada o'zlashtirish mumkin\n- 🌍 UNESCO butun dunyo merosi e'tirof etilgan\n\n**Hangul kun (한글날)** — Har yili 15-oktyabr kuni Koreyada nishonlanadi!\n\nSejong the Great — Koreya tarixidagi eng hurmatli podshohlardan biri.`
  },
  {
    patterns: ['koreys so\'z qanday yoziladi', 'koreys qanday o\'qiladi', 'koreys yozuv', 'koreys o\'qish'],
    response: `**Koreys tilida so'zlar qanday yoziladi va o'qiladi?** 📖\n\n**Asosiy qoidalar:**\n\n1. **Bloklar shaklida yoziladi**\n   - Undosh + Unli = Silaba\n   - Misol: ㄱ + ㅏ = 가 (ga)\n\n2. **Uch xil blok tuzilishi:**\n   - **Undosh + Unli**: 가 (ga), 나 (na)\n   - **Undosh + Unli + Undosh**: 각 (gak), 반 (ban)\n   - **Undosh + Unli + Undosh + Undosh**: 각 (gak)\n\n3. **O'qish tartibi:**\n   - Chapdan o'ngga\n   - Yuqoridan pastga\n\n**Misol:**\n- 한국 (한-국) = han-guk (Koreya)\n- 사랑 (사-랑) = sa-rang (Muhabbat)\n- 학교 (학-교) = hak-gyo (Maktab)\n\n💡 **Maslahat:** Avval harflarni yaxshi o'rganing, keyin oddiy so'zlarni yozishni boshlang!\n\nQaysi harf yoki so'z haqida batafsil bilmoqchisiz?`
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
  },
  {
    patterns: ['koreys vaqt', 'vaqt', 'soat', 'koreysda soat', 'saat', 'koreysda vaqt'],
    response: `**Koreys tilida vaqt:** ⏰\n\n**Soat so'rash:**\n- **지금 몇 시예요?** (jigeum myeot siyeyo?) — Hozir nechachi?\n- **지금 몇 시예요?** — Hozir soat nechachi?\n\n**Javob berish:**\n- **지금 오후 세 시예요** (jigeum ohu se siyeyo) — Hozir soat 3\n\n**Koreys raqamlari bilan vaqt:**\n- 한 시 (han si) — Soat 1\n- 두 시 (du si) — Soat 2\n- 세 시 (se si) — Soat 3\n- 네 시 (ne si) — Soat 4\n- 다섯 시 (daseot si) — Soat 5\n\n**Daqiqa:**\n- 분 (bun) — daqiqa\n- 오후 세 시 오십 분 — Soat 3:50\n\n**Kunlar:**\n- 요일 (yoil) — Hafta kuni\n- 월요일 (woryoil) — Dushanba\n- 화요일 (hwayoil) — Seshanba\n- 수요일 (suyoil) — Chorshanba\n- 목요일 (mogyoil) — Payshanba\n- 금요일 (geumyoil) — Juma\n- 토요일 (toyoil) — Shanba\n- 일요일 (ilyoil) — Yakshanba\n\n**Oylar:**\n- 월 (wol) — oy\n- 1월 (ilwol) — Yanvar\n- 2월 (iwol) — Fevral\n- 12월 (sip iwol) — Dekabr`
  },
  {
    patterns: ['koreys kunlar', 'hafta', 'hafta kunlari', 'kunlar', 'koreysda hafta'],
    response: `**Koreys tilida hafta kunlari:** 📅\n\n| Koreyscha | O'zbekcha |\n|-----------|-----------|\n| 월요일 (woryoil) | Dushanba |\n| 화요일 (hwayoil) | Seshanba |\n| 수요일 (suyoil) | Chorshanba |\n| 목요일 (mogyoil) | Payshanba |\n| 금요일 (geumyoil) | Juma |\n| 토요일 (toyoil) | Shanba |\n| 일요일 (ilyoil) | Yakshanba |\n\n**Foydali gaplar:**\n- **오늘은 무슨 요일이에요?** — Bugun nima kuni?\n- **오늘은 월요일이에요** — Bugun dushanba\n- **내일은 화요일이에요** — Ertaga seshanba\n\n💡 **Eslatma:** Koreys tilida "요일" (yoil) so'zi "hafta kuni" degan ma'noni beradi.`
  },
  {
    patterns: ['koreys oy', 'oylar', 'koreysda oy', 'yil', 'koreysda yil'],
    response: `**Koreys tilida oylar:** 📆\n\n| Koreyscha | O'zbekcha |\n|-----------|-----------|\n| 1월 (ilwol) | Yanvar |\n| 2월 (iwol) | Fevral |\n| 3월 (samwol) | Mart |\n| 4월 (sawol) | Aprel |\n| 5월 (owol) | May |\n| 6월 (yukwol) | Iyun |\n| 7월 (chilwol) | Iyul |\n| 8월 (palwol) | Avgust |\n| 9월 (guwol) | Sentabr |\n| 10월 (sipwol) | Oktabr |\n| 11월 (sip iwol) | Noyabr |\n| 12월 (sip iwol) | Dekabr |\n\n**Foydali gaplar:**\n- **오늘은 몇 월이에요?** — Bugun nechi oy?\n- **오늘은 10월이에요** — Bugun oktyabr\n- **생일이 언제예요?** — Tug'ilgan kuningiz qachon?\n\n💡 **Eslatma:** Koreys tilida oy raqamlari xitoy-koreys raqamlari bilan aytiladi.`
  },
  {
    patterns: ['koreys ranglar', 'ranglar', 'colors korean'],
    response: `**Koreys tilidagi ranglar:** 🎨\n\n| Koreyscha | O'zbekcha |\n|-----------|-----------|\n| 빨간색 (ppalgansaek) | 🔴 Qizil |\n| 파란색 (paransaek) | 🔵 Ko'k |\n| 초록색 (choroksaek) | 🟢 Yashil |\n| 노란색 (noransaek) | 🟡 Sariq |\n| 흰색 (hwinsek) | ⚪ Oq |\n| 검은색 (geomeunsaek) | ⚫ Qora |\n| 갈색 (galsaek) | 🟤 Jigarrang |\n| 분홍색 (bunhongsae) | 💗 Pushti |\n| 보라색 (borasaek) | 💜 Binafsha |\n| 주황색 (juhwangsaek) | 🟠 To'q sariq |\n\n**Foydali gaplar:**\n- **이 꽃은 무슨 색깔이에요?** — Bu gul qanday rangda?\n- **이 꽃은 빨간색이에요** — Bu gul qizil rangda\n- **하늘은 파란색이에요** — Osmon ko'k rangda\n\n💡 **Eslatma:** "색" (saek) so'zi "rang" degan ma'noni beradi.`
  },
  {
    patterns: ['koreys raqamlar', 'raqamlar', 'sonlar', 'koreysda nechachi'],
    response: `Koreys tilida **2 ta raqam tizimi** mavjud: 🔢\n\n**1. Koreys raqamlari (한국어 숫자):**\n1 — 하나 (hana)\n2 — 둘 (dul)\n3 — 셋 (set)\n4 — 넷 (net)\n5 — 다섯 (daseot)\n6 — 여섯 (yeoseot)\n7 — 일곱 (ilgop)\n8 — 여덟 (yeodeol)\n9 — 아홉 (ahop)\n10 — 열 (yeol)\n\n**2. Xitoy-koreys raqamlari (한자 숫자):**\n1 — 일 (il)\n2 — 이 (i)\n3 — 삼 (sam)\n4 — 사 (sa)\n5 — 오 (o)\n6 — 육 (yuk)\n7 — 칠 (chil)\n8 — 팔 (pal)\n9 — 구 (gu)\n10 — 십 (sip)\n\n**Qachon qaysi ishlatiladi?**\n- **Koreys raqamlari**: narsalarni sanash, yosh, soat\n- **Xitoy-koreys**: sana, pul, telefon raqam, oy\n\n**Misol:**\n- 나이가 스물다섯이에요 — Mening yoshim 25 (koreys)\n- 가격은 오천원이에요 — Narxi 5000 won (xitoy-koreys)\n- 10월 5일 — 5-oktyabr (xitoy-koreys)`
  },
  {
    patterns: ['koreys taom', 'taomlar', 'koreys ovqat', 'kimchi', 'koreys oshxona'],
    response: `**Koreys oshxonasi:** 🍜\n\n**Mashhur taomlar:**\n\n1. **김치 (kimchi)** — Fermentlangan sabzavot, milliy taom\n2. **비빔밥 (bibimbap)** — Aralash plov, sabzavot va go'sht bilan\n3. **불고기 (bulgogi)** — Marinadlangan go'sht\n4. **김밥 (gimbap)** — Nori bilan o'ralgan plov\n5. **떡볶이 (tteokbokki)** — Acchiq kartoshka\n6. **된장찌개 (doenjang jjigae)** — Soy sousi sho'rvasi\n7. **김치찌개 (kimchi jjigae)** — Kimchi sho'rvasi\n8. **순두부 (sundubu)** — Yumshoq tofu sho'rvasi\n9. **冷면 (naengmyeon)** — Sovuq noodle\n10. **炸鸡 (yangnyeom chicken)** — Qovurilgan tovuq\n\n**Foydali gaplar:**\n- **맛있어요** (masisseyo) — Mazali!\n- **배가 고파요** (baega gopayo) — Och bo'ldim\n- **이거 뭐예요?** (igeo moyeyo?) — Bu nima?\n\n💡 **Maslahat:** Koreys taomlarini tatib ko'rish orqali til o'rganish juda qiziqarli!`
  },
  {
    patterns: ['koreys tilini qanday organish', 'koreys tilini o\'rganish', 'koreys o\'rganish', 'koreys tilini o\'rganish usullari'],
    response: `**Koreys tilini o'rganish usullari:** 📚\n\n**1-qadam: Asoslarni o'rganing**\n- 📝 Hangul alifbosini yodlang (1-2 hafta)\n- 🔢 Asosiy raqamlarni o'rganing\n- 🎨 Ranglar, kunlar, oylar\n\n**2-qadam: So'z boyligini oshiring**\n- 📖 Har kuni 5-10 ta yangi so'z o'rganing\n- 📝 So'zlarni misol gaplar bilan yodlang\n- 🧠 Test qilib, bilimingizni tekshiring\n\n**3-qadam: Grammatika**\n- 📋 Asosiy grammatika qoidalarini o'rganing\n- 💬 Oddiy gaplar tuzing\n- ✏️ Yozish mashqi qiling\n\n**4-qadam: Eshitish**\n- 🎧 Koreys qo'shiqlar tinglang\n- 📺 K-drama va filmlar tomosha qiling\n- 🎙️ Koreys podkastlar tinglang\n\n**5-qadam: Suhbat mashqi**\n- 💬 Men bilan koreys tilida suhbatlashing\n- 👥 Koreys tilida gaplashadigan do'stlar toping\n- 🗣️ O'zingiz bilan koreyscha gaplashing\n\n**Foydali resurslar:**\n- Topik Play ilovasi\n- YouTube: KoreanClass101, Talk To Me In Korean\n- Kitoblar: TOPIK prep materials\n\n💡 **Eng muhimi:** Har kuni mashq qiling! Kuniga 30 daqiqa ham yetarli.`
  },
  {
    patterns: ['koreys gaplar', 'foydali gaplar', 'koreyscha gap', 'koreyscha nima deb'],
    response: `**Foydali koreys gaplari:** 💬\n\n**Salomlashish:**\n- 안녕하세요 (annyeonghaseyo) — Salom\n- 만나서 반갑습니다 (mannaseo bangapseumnida) — Tanishganimdan xursandman\n- 안녕히 가세요 (annyeonghi gaseyo) — Xayr (ketayotgan kishi uchun)\n- 안녕히 계세요 (annyeonghi gyeseyo) — Xayr (qolayotgan kishi uchun)\n\n**Rahmat:**\n- 감사합니다 (gamsahamnida) — Rahmat\n- 천만에요 (cheonmaneyo) — Arzimaydi\n\n**So'rash:**\n- 어떻게 지내세요? (otteoke jinaeseyo?) — Qalaysiz?\n- 이름이 뭐예요? (ireumi moyeyo?) — Ismingiz nima?\n- 어디에서 왔어요? (eodieseo wasseoyo?) — Qayerdan keldingiz?\n- 한국어가 잘 해요! (hangugeo ga jal hayo!) — Koreys tilingiz yaxshi!\n\n**Kundalik:**\n- 네 (ne) — Ha\n- 아니요 (aniyo) — Yo'q\n- 죄송합니다 (joesonghamnida) — Kechirasiz\n- 도와주세요 (dowajuseyo) — Yordam bering\n- 이해하지 못했어요 (ihaehaji motasseoyo) — Tushunmadim\n- 다시 한번 말해 주세요 (dasi hanbeun malhae juseyo) — Qayta ayting\n\n💡 **Maslahat:** Har kuni bitta yangi gap yodlang va ishlatib ko'ring!`
  },
  {
    patterns: ['koreys madaniyat', 'koreys an\'ana', 'koreys urf odat', 'k-pop', 'k-drama'],
    response: `**Koreys madaniyati:** 🇰🇷\n\n**K-pop (Korean Pop):**\n- BTS, BLACKPINK, TWICE, Stray Kids va boshqa guruhlar\n- Koreys pop musiqasi dunyoga mashhur\n- Koreys tilini o'rganish uchun yaxshi vosita\n\n**K-drama (Korean Drama):**\n- "Crash Landing on You", "Squid Game", "Goblin"\n- Subtitle bilan tomosha qilib, til o'rganing\n- Kundalik koreys tilini eshitish imkonini beradi\n\n**An'anaviy kiyim:**\n- 한복 (hanbok) — Koreys an'anaviy kiyimi\n- Bayramlarda kiyiladi\n\n**Taom madaniyati:**\n- Kimchi — har bir ovqatda\n- Choy ichish madaniyati\n- Birga ovqatlanish an'anasi\n\n**Bayramlar:**\n- 설날 (Seollal) — Koreys yangi yili\n- 추석 (Chuseok) — Hosil bayrami\n- 한글날 (Hangul kun) — 15-oktyabr\n\n💡 **Maslahat:** K-pop va K-drama orqali koreys tilini o'rganish juda qiziq va samarali!`
  },
  {
    patterns: ['koreys so\'zlar', 'koreys so\'z', 'koreys lugat', 'koreyscha so\'zlar'],
    response: `**Eng ko'p ishlatiladigan koreys so'zlar:** 📝\n\n**Asosiy so'zlar:**\n- 사람 (saram) — Kishi\n- 물 (mul) — Suv\n- 밥 (bap) — Ovqat/plov\n- 집 (jip) — Uy\n- 학교 (hyeogyo) — Maktab\n- 친구 (chingu) — Do'st\n- 사랑 (sarang) — Muhabbat\n- 가족 (gajok) — Oila\n- 일 (il) — Ish\n- 돈 (don) — Pul\n\n**Feyllar:**\n- 좋아요 (joayo) — Yaxshi / Yoqadi\n- 크다 (keuda) — Katta\n- 작다 (jakda) — Kichik\n- 덥다 (deuptda) — Issiq\n- 춥다 (chuptda) — Sovuq\n- 맛있어요 (masisseyo) — Mazali\n- 예뻐요 (yeppeoyo) — Chiroyli\n- 멋있어요 (meosisseoyo) — Ajoyib\n\n**Vaqt so'zlari:**\n- 오늘 (oneul) — Bugun\n- 내일 (naeil) — Ertaga\n- 어제 (eoje) — Kecha\n- 지금 (jigeum) — Hozir\n- 빨리 (ppalli) — Tez\n- 천천히 (cheoncheonhi) — Sekin\n\n💡 **Maslahat:** Har kuni 5 ta yangi so'z o'rganing va ular bilan gap tuzing!`
  },
  {
    patterns: ['koreys fe\'llar', 'fe\'llar', 'verbs', 'koreys fe\'l'],
    response: `**Koreys tilidagi ko'p ishlatiladigan fe'llar:** 📝\n\n**Kundalik fe'llar:**\n- 가다 (gada) — Ketmoq\n- 오다 (oda) — Kelmoq\n- 먹다 (meokda) — Yemoq\n- 마다 (mada) — Ichmoq\n- 자다 (jada) — Uxlamoq\n- 일하다 (ilhada) — Ishlamoq\n- 배우다 (baeuda) — O'rganmoq\n- 읽다 (ilkda) — O'qimoq\n- 쓰다 (seuda) — Yozmoq\n- 보다 (boda) — Ko'rmоq\n\n**Harakat fe'llari:**\n- 걷다 (geotda) — Yurmoq\n- 뛰다 (twida) — Yugurmoq\n- 앉다 (antda) — O'tirmоq\n- 서다 (seoda) — Turmoq\n- 일어나다 (ireonada) — Turmoq (yotib)\n- 눕다 (nuptda) — Yotmoq\n\n**Aqliy fe'llar:**\n- 알다 (alda) — Bilmoq\n- 생각하다 (saengghakhada) — O'ylamoq\n- 이해하다 (ihaehada) — Tushunmoq\n- 기억하다 (gieokhada) — Eslamoq\n- 잊다 (itda) — Unutmoq\n- 배우다 (baeuda) — O'rganmoq\n\n**Misol gaplar:**\n- 저는 한국어를 배워요 — Men koreys tilini o'rganaman\n- 밥을 먹어요 — Ovqat yeyman\n- 책을 읽어요 — Kitob o'qiyman\n\n💡 **Maslahat:** Har bir fe'lning -아/어요 shaklini o'rganing — bu eng keng tarqalgan gap tuzish usuli.`
  },
  {
    patterns: ['koreys sifat', 'sifatlilar', 'adjectives', 'koreys sifatlar'],
    response: `**Koreys tilidagi sifatlilar:** 🎨\n\n**Asosiy sifatlilar:**\n- 크다 (keuda) — Katta\n- 작다 (jakda) — Kichik\n- 길다 (gilda) — Uzun\n- 짧다 (jjalda) — Qisqa\n- 넓다 (neolpda) — Keng\n- 좁다 (jopda) — Tor\n- 많다 (manda) — Ko'p\n- 적다 (jeokda) — Kam\n- 많다 (manda) — Ko'p\n- 새다 (sae) — Yangi\n- 낡다 (nalpda) — Eski\n- 빠르다 (ppareuda) — Tez\n- 느리다 (neurida) — Sekin\n\n**His-tuyg'u sifatlilari:**\n- 행복하다 (haengbokhada) — Baxtli\n- 슬프다 (seulpeuda) — G'amgin\n- 기쁘다 (gippeuda) — Xursand\n- buồn (buon) — G'amgin\n- 재미있어요 (jaemiisseoyo) — Qiziqarli\n- 재미없어요 (jaemiisseoyo) — Zo'rsiz\n\n**Tashqi ko'rinish:**\n- 예뻐요 (yeppeoyo) — Chiroyli (ayol)\n- 멋있어요 (meosisseoyo) — Ajoyib (erkak)\n- 커다 (keuda) — Katta\n- 작다 (jakda) — Kichik\n\n**Misol gaplar:**\n- 이 책은 재미있어요 — Bu kitob qiziqarli\n- 한국은 커요 — Koreya katta\n- 날씨가 좋아요 — Ob-havo yaxshi\n\n💡 **Eslatma:** Koreys tilida sifatlilar ham fe'llar kabi -아/어요 qo'shimchasini oladi.`
  },
  {
    patterns: ['koreys so\'zlashish', 'gaplashish', 'suhbat', 'koreyscha gaplashish', 'koreyscha suhbat'],
    response: `**Koreys tilida suhbatlashish:** 💬\n\n**Suhbatni boshlash:**\n- 안녕하세요! — Salom!\n- 만나서 반갑습니다 — Tanishganimdan xursandman\n- 이름이 뭐예요? — Ismingiz nima?\n- 저는 [ism]이에요 — Men [ism]\n\n**Suhbatni davom ettirish:**\n- 어디에서 왔어요? — Qayerdan keldingiz?\n- 저는 우즈베키스탄에서 왔어요 — Men O'zbekistondan keldim\n- 한국어가 잘 해요! — Koreys tilingiz yaxshi!\n- 아니요, 아직 못 해요 — Yo'q, hali yozmayman\n\n**Suhbatni tugatish:**\n- 안녕히 가세요 — Xayr (ketayotgan kishi uchun)\n- 안녕히 계세요 — Xayr (qolayotgan kishi uchun)\n- 또 만나요 — Yana uchrashamiz\n- 좋은 하루 보내세요 — Yaxshi kun tilayman\n\n**Foydali gaplar:**\n- 이해했어요 — Tushundim\n- 이해하지 못했어요 — Tushunmadim\n- 다시 말해 주세요 — Qayta ayting\n- 천천히 말해 주세요 — Sekin ayting\n- 무슨 말이에요? — Nima deyapsiz?\n\n💡 **Maslahat:** Har kuni koreys tilida 5-10 daqiqa suhbat mashqi qiling!`
  },
  {
    patterns: ['koreys qo\'shiq', 'k-pop', 'koreys musiqa', 'koreys qo\'shiqlar'],
    response: `**K-pop va koreys musiqasi:** 🎵\n\n**Mashhur K-pop guruhlar:**\n- **BTS** — Dynamite, Butter, Spring Day\n- **BLACKPINK** — Pink Venom, How You Like That\n- **TWICE** — The Feels, Talk that Talk\n- **Stray Kids** — God's Menu, Maniac\n- **NewJeans** — OMG, Ditto\n- **SEVENTEEN** — Super, Hot\n\n**Koreys tilini o'rganish uchun qo'shiqlar:**\n\n1. **Begin Again - IU** — Sekin va tushunarli\n2. **Spring Day - BTS** — Chiroyli so'zlar\n3. **Through the Night - IU** — Oddiy gaplar\n4. **Love Scenario - iKON** — Kundalik so'zlar\n5. **Give You Love - Taeyeon** — Sevimli qo'shiq\n\n**Qanday o'rganish kerak?**\n1. 🎧 Qo'shiqni tinglang\n2. 📝 Matnni o'qing\n3. 📖 Noma'lum so'zlarni tarjima qiling\n4. 🗣️ Qo'shiq bilan birga kuylang\n5. 🔄 Takrorlang\n\n💡 **Maslahat:** Qo'shiqlar orqali til o'rganish juda qiziq va samarali!`
  },
  {
    patterns: ['koreys film', 'k-drama', 'koreys serial', 'koreys kinolar'],
    response: `**K-drama va koreys filmlar:** 📺\n\n**Mashhur K-dramalar:**\n- **Crash Landing on You** — Romantik komediya\n- **Squid Game** — Thriller\n- **Goblin** — Fantastik romantika\n- **Itaewon Class** — Drama\n- **Vincenzo** — Komediya/thriller\n- **Extraordinary Attorney Woo** — Huquqiy drama\n\n**Koreys tilini o'rganish uchun:**\n\n**Boshlang'ich daraja:**\n- **Hometown Cha-Cha-Cha** — Oddiy gaplar\n- **What's Wrong with Secretary Kim** — Rasmiy til\n\n**O'rta daraja:**\n- **Crash Landing on You** — Turli uslublar\n- **Itaewon Class** — Kundalik til\n\n**Yuqori daraja:**\n- **Vincenzo** — Murakkab gaplar\n- **Mr. Sunshine** — Tarixiy til\n\n**Qanday o'rganish kerak?**\n1. 📺 Subtitle bilan tomosha qiling\n2. 📝 Qiziqarli gaplarni yozib oling\n3. 🔄 Takrorlang\n4. 💬 O'zingiz bilan gaplashing\n\n💡 **Maslahat:** Birinchi marta koreyscha, ikkinchi marta o'zbekcha subtitle bilan tomosha qiling!`
  },
  {
    patterns: ['koreys yozish', 'yozish mashqi', 'koreyscha yozish', 'koreys yozuv mashq'],
    response: `**Koreys tilida yozish mashqi:** ✍️\n\n**Boshlang'ich mashqlar:**\n\n1. **Harflarni yozing**\n   - Har kuni 5 ta harfni yozib chiqing\n   - ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ\n\n2. **Oddiy so'zlar yozing**\n   - 가다 (gada) — Ketmoq\n   - 오다 (oda) — Kelmoq\n   - 사랑 (sarang) — Muhabbat\n\n3. **Gap tuzing**\n   - 저는 학생이에요 — Men talabaman\n   - 한국어를 배워요 — Koreys tilini o'rganaman\n   - 오늘 날씨가 좋아요 — Bugun ob-havo yaxshi\n\n**Yozish mavzulari:**\n- 📝 O'zingiz haqingizda yozing\n- 🏠 Uy haqingizda yozing\n- 👨‍👩‍👧‍👦 Oila haqingizda yozing\n- 🍜 Sevimli taomingiz haqida yozing\n- 🎵 Sevimli qo'shigingiz haqida yozing\n\n**Misol:**\n"저는 우즈베키스탄에서 왔어요. 이름은 [ism]이에요. 한국어를 배우고 싶어요. 한국 음식이 맛있어요."\n\n💡 **Maslahat:** Har kuni 3-5 ta gap yozing va ularni menga yuboring — tuzatib beraman!`
  },
  {
    patterns: ['koreys eshitish', 'eshitish mashqi', 'koreyscha eshitish', 'koreys eshitish mashq'],
    response: `**Koreys tilida eshitish mashqi:** 🎧\n\n**Boshlang'ich daraja:**\n- **Koreys qo'shiqlar** — Sekin va tushunarli\n- **K-drama** — Subtitle bilan\n- **YouTube kanallar:**\n  - KoreanClass101\n  - Talk To Me In Korean\n  - Learn Korean with Go! Go! Coryana\n\n**O'rta daraja:**\n- **Koreys podkastlar:**\n  - Korean Unnie\n  - Talk To Me In Korean\n- **Yangiliklar:**\n  - KBS World\n  - Arirang TV\n\n**Yuqori daraja:**\n- **Koreys filmlar** — Subtitlesiz\n- **Koreys kitoblar** — Oddiy matnlar\n- **Koreys yangiliklar** — TOPIK II daraja\n\n**Qanday mashq qilish kerak?**\n1. 🎧 Kuniga 15-30 daqiqa tinglang\n2. 📝 Eshitgan so'zlarni yozib oling\n3. 🔄 Takrorlang\n4. 🗣️ Eshitgan gaplarni takrorlang\n\n💡 **Maslahat:** Topik Play ilovasida eshitish mashqlari bor — har kuni bajaring!`
  },
  {
    patterns: ['koreys imtihon', 'topik tayyorlanish', 'topik qanday topshirish', 'topikga tayyorlanish'],
    response: `**TOPIK imtihoniga tayyorlanish:** 📋\n\n**TOPIK tuzilishi:**\n\n**TOPIK I (Boshlang'ich):**\n- 듣기 (Eshitish) — 25 savol, 30 daqiqa\n- 읽기 (O'qish) — 21 savol, 40 daqiqa\n- Jami: 46 savol, 70 daqiqa\n\n**TOPIK II (O'rta va yuqori):**\n- 듣기 (Eshitish) — 40 savol, 40 daqiqa\n- 읽기 (O'qish) — 54 savol, 55 daqiqa\n- 쓰기 (Yozish) — 4 savol, 30 daqiqa\n- Jami: 98 savol, 125 daqiqa\n\n**Tayyorlanish reja:**\n\n1. **Lug'at** — Kuniga 10-20 ta so'z o'rganing\n2. **Grammatika** — Kuniga 1-2 ta qoida o'rganing\n3. **Eshitish** — Kuniga 30 daqiqa tinglang\n4. **O'qish** — Kuniga 1-2 matn o'qing\n5. **Yozish** — Kuniga 1 ta mavzu yozing\n\n**Foydali resurslar:**\n- Topik Play ilovasi\n- TOPIK past papers\n- YouTube: TOPIK prep videos\n- Kitoblar: TOPIK Official Guide\n\n💡 **Maslahat:** Kamida 3-6 oy tayyorlaning. Har kuni mashq qiling!`
  },
  {
    patterns: ['koreys so\'zlar yodlash', 'yodlash', 'yodlash usullari', 'koreys yodlash'],
    response: `**Koreys so'zlarini yodlash usullari:** 🧠\n\n**1. Flashcard usuli**\n- Har bir so'z uchun karta yarating\n- Bir tomonda koreyscha, ikkinchi tomonda tarjima\n- Kuniga 10-20 ta karta takrorlang\n\n**2. Misol gaplar**\n- Har bir so'zni misol gapda ishlating\n- Misol: 사랑 (sarang) — 사랑해요 (saranghayo) — Men sevimli\n\n**3. Kategoriyalar**\n- So'zlarni guruhlarga ajrating\n- Masalan: oila, taom, ranglar, raqamlar\n\n**4. Takrorlash**\n- 1-kuni: Yangi so'zlar\n- 2-kuni: Kechagi so'zlar\n- 7-kuni: Haftalik takrorlash\n- 30-kuni: Oylik takrorlash\n\n**5. Ishlatish**\n- O'rganilgan so'zlarni gaplarda ishlating\n- Menga yozing — tuzatib beraman\n\n**6. O'yinlar**\n- Test savollari\n- So'z yozish mashqlari\n- Eshitish mashqlari\n\n💡 **Maslahat:** Kuniga 10 ta yangi so'z o'rganing va 20 ta eski so'zni takrorlang. Topik Play ilovasi yordam beradi!`
  },
  {
    patterns: ['koreys gap tuzish', 'gap tuzish', 'koreyscha gap tuzish', 'koreys gap qurish'],
    response: `**Koreys tilida gap tuzish:** 📝\n\n**Asosiy gap tuzilishi:**\n**Subyekt + Ob'ekt + Fe'l**\n\n**Misol:**\n- 저는 (Men) + 밥을 (ovqatni) + 먹어요 (yeyman)\n- 저는 밥을 먹어요 — Men ovqat yeyman\n\n**Eng ko'p ishlatiladigan qo'shimchalar:**\n\n1. **-은/는** (Subyekt belgisi)\n   - 저는 학생이에요 — Men talabaman\n   - 그는 의사예요 — U shifokor\n\n2. **-을/를** (Ob'ekt belgisi)\n   - 책을 읽어요 — Kitob o'qiyman\n   - 물을 마셔요 — Suv ichaman\n\n3. **-에** (Joy/vaqt)\n   - 학교에 가요 — Maktabga ketaman\n   - 3시에 만나요 — Soat 3 da uchrashamiz\n\n4. **-에서** (Joyda)\n   - 집에서 먹어요 — Uyda yeyman\n   - 학교에서 배워요 — Maktabda o'rganaman\n\n5. **-아/어요** (Polita fe'l)**\n   - 가요 (gayo) — Ketaman\n   - 먹어요 (meogeoyo) — Yeyman\n   - 읽어요 (igeoyo) — O'qiyman\n\n**Misol gaplar:**\n- 저는 우즈베키스탄에서 왔어요 — Men O'zbekistondan keldim\n- 한국어를 배우고 싶어요 — Koreys tilini o'rganmoqchiman\n- 오늘 날씨가 좋아요 — Bugun ob-havo yaxshi\n\n💡 **Maslahat:** Har kuni 5 ta yangi gap tuzing va menga yuboring!`
  },
  {
    patterns: ['koreys tilida ism', 'ism', 'koreys ism', 'koreyscha ism'],
    response: `**Koreys tilida ismlar:** 👤\n\n**Koreys ismlari tuzilishi:**\nKoreys ismlari odatda 2 ta harfdan iborat:\n- **Familiya + Ism**\n- Misol: 김민수 (Kim Min-su)\n\n**Eng ko'p uchraydigan familiyalar:**\n- 김 (Kim) — 20% aholi\n- 이/리 (Lee/Ri) — 15% aholi\n- 박 (Park) — 5% aholi\n- 최 (Choi) — 4% aholi\n\n**Mashhur erkak ismlari:**\n- 민수 (Min-su) — Aqlli va tez\n- 지훈 (Ji-hoon) — Donolik\n- 재원 (Jae-won) — Boylik\n- 서준 (Seo-jun) — Chiroyli\n\n**Mashhur ayol ismlari:**\n- 서연 (Seo-yeon) — Chiroyli va nozik\n- 지우 (Ji-woo) — Donolik\n- 하윤 (Ha-yoon) — Yumshoq\n- 수아 (Su-a) — Chiroyli\n\n**Ism so'rash:**\n- 이름이 뭐예요? — Ismingiz nima?\n- 저는 [ism]이에요 — Men [ism]\n\n💡 **Maslahat:** Koreys ismlari ma'noli — har bir harfning o'z ma'nosi bor.`
  },
  {
    patterns: ['koreys madaniyat', 'koreys an\'ana', 'koreys urf odat', 'koreys urf-odat'],
    response: `**Koreys madaniyati va urf-odatlari:** 🇰🇷\n\n**Hurmat madaniyati:**\n- Koreyslar yoshga va martabaga hurmat qiladi\n- Kattalarga -습니다/-ㅂ니다 shaklida gapirish kerak\n- Qo'l berishda ikki qo'l bilan bering\n\n**Ovqatlanish madaniyati:**\n- Ovqatdan oldin "잘 먹겠습니다" (jal meokgetseumnida) deyiladi\n- Kattalar ovqatlanishni boshlamaguncha, yoshlar boshlamaydi\n- Choyshak va qoshiq ishlatiladi\n\n**Kiyim madaniyati:**\n- 한복 (hanbok) — An'anaviy kiyim\n- Bayramlarda kiyiladi\n- Zamonaviy Koreyada g'arbiy kiyim kiyiladi\n\n**Bayramlar:**\n- 설날 (Seollal) — Koreys yangi yili (yanvar/fevral)\n- 추석 (Chuseok) — Hosil bayrami (sentabr/oktyabr)\n- 한글날 (Hangul kun) — 15-oktyabr\n\n**Qiziqarli faktlar:**\n- 🍜 Kimchi — 200+ tur mavjud\n- 🎵 K-pop — dunyoga mashhur\n- 📺 K-drama — butun dunyada sevimli\n- 🏔️ Bulguksa — qadimiy ibodatxona\n\n💡 **Maslahat:** Koreys madaniyatini tushunish til o'rganishda yordam beradi!`
  },
  {
    patterns: ['koreys so\'zlar soni', 'koreys tilida nechta so\'z', 'koreys tilida nechta so\'z bor'],
    response: `**Koreys tilidagi so'zlar soni:** 📊\n\n**Koreys tilida taxminan 100,000+ so'z bor.**\n\n**TOPIK darajalariga qarab:**\n- **TOPIK I-1:** 200-300 ta so'z\n- **TOPIK I-2:** 400-500 ta so'z\n- **TOPIK II-3:** 800-1,000 ta so'z\n- **TOPIK II-4:** 1,500-2,000 ta so'z\n- **TOPIK II-5:** 3,000-4,000 ta so'z\n- **TOPIK II-6:** 6,000+ ta so'z\n\n**Kundalik hayotda:**\n- 500 ta so'z bilan oddiy suhbatlashish mumkin\n- 1,000 ta so'z bilan kundalik muammolar hal qilinadi\n- 3,000+ ta so'z bilan erkin gaplashish mumkin\n\n**Topik Play ilovasida:**\n- TOPIK I: 300+ ta so'z\n- TOPIK II: 455+ ta so'z\n- Jami: 755+ ta so'z\n\n💡 **Maslahat:** Avval 500 ta eng ko'p ishlatiladigan so'zlarni o'rganing!`
  },
  {
    patterns: ['koreys tilini qancha vaqtda organish', 'qancha vaqt', 'koreys tilini o\'rganish vaqti'],
    response: `**Koreys tilini qancha vaqtda o'rganish mumkin?** ⏰\n\n**Darajalar bo'yicha vaqt:**\n\n| Daraja | Vaqt | Kuniga mashq |\n|--------|------|-------------|\n| TOPIK I-1 | 1-2 oy | 1 soat |\n| TOPIK I-2 | 2-3 oy | 1 soat |\n| TOPIK II-3 | 3-4 oy | 1-2 soat |\n| TOPIK II-4 | 4-6 oy | 2 soat |\n| TOPIK II-5 | 6-9 oy | 2-3 soat |\n| TOPIK II-6 | 9-12 oy | 3+ soat |\n\n**Tezroq o'rganish usullari:**\n1. 📝 Har kuni yangi so'zlar o'rganing\n2. 🎧 Koreys qo'shiqlar tinglang\n3. 📺 K-drama tomosha qiling\n4. 💬 Suhbat mashqi qiling\n5. 🧠 Muntazam test qiling\n\n**Topik Play ilovasi bilan:**\n- Kuniga 30 daqiqa mashq qilsangiz, 6 oyda TOPIK II-3 ga tayyorlanasiz\n- Kuniga 1 soat mashq qilsangiz, 4 oyda TOPIK II-3 ga tayyorlanasiz\n\n💡 **Maslahat:** Muntazamlik muhim! Kuniga 30 daqiqa ham yetarli.`
  },
  {
    patterns: ['koreys tilida raqam', 'koreys raqam', 'koreyscha raqam', 'koreys raqamlar'],
    response: `**Koreys tilida raqamlar:** 🔢\n\n**Koreys raqamlari (narsalarni sanash):**\n1 — 하나 (hana)\n2 — 둘 (dul)\n3 — 셋 (set)\n4 — 넷 (net)\n5 — 다섯 (daseot)\n6 — 여섯 (yeoseot)\n7 — 일곱 (ilgop)\n8 — 여덟 (yeodeol)\n9 — 아홉 (ahop)\n10 — 열 (yeol)\n\n**Xitoy-koreys raqamlari (sana, pul, telefon):**\n1 — 일 (il)\n2 — 이 (i)\n3 — 삼 (sam)\n4 — 사 (sa)\n5 — 오 (o)\n6 — 육 (yuk)\n7 — 칠 (chil)\n8 — 팔 (pal)\n9 — 구 (gu)\n10 — 십 (sip)\n\n**Yuz va ming:**\n- 100 — 백 (baek)\n- 1,000 — 천 (cheon)\n- 10,000 — 만 (man)\n\n**Misol:**\n- 나이가 스물다섯이에요 — Mening yoshim 25\n- 가격은 오천원이에요 — Narxi 5,000 won\n- 전화번호는 010-1234-5678 — Telefon raqam\n\n💡 **Eslatma:** 10 dan 99 gacha raqamlar xitoy-koreys tizimida aytiladi.`
  },
  {
    patterns: ['koreys tilida vaqt', 'koreys vaqt', 'koreyscha vaqt', 'koreys vaqtni so\'rash'],
    response: `**Koreys tilida vaqt:** ⏰\n\n**Soat so'rash:**\n- 지금 몇 시예요? — Hozir nechachi?\n- 몇 시에 만나요? — Soat nechada uchrashamiz?\n\n**Javob berish:**\n- 지금 오후 세 시예요 — Hozir soat 3\n- 10시에 만나요 — Soat 10 da uchrashamiz\n\n**Koreys raqamlari bilan vaqt:**\n- 한 시 (han si) — Soat 1\n- 두 시 (du si) — Soat 2\n- 세 시 (se si) — Soat 3\n- 네 시 (ne si) — Soat 4\n- 다섯 시 (daseot si) — Soat 5\n\n**Daqiqa:**\n- 분 (bun) — daqiqa\n- 세 시 오십 분 — Soat 3:50\n\n**Kunlar:**\n- 월요일 (woryoil) — Dushanba\n- 화요일 (hwayoil) — Seshanba\n- 수요일 (suyoil) — Chorshanba\n- 목요일 (mogyoil) — Payshanba\n- 금요일 (geumyoil) — Juma\n- 토요일 (toyoil) — Shanba\n- 일요일 (ilyoil) — Yakshanba\n\n**Oylar:**\n- 1월 (ilwol) — Yanvar\n- 2월 (iwol) — Fevral\n- 12월 (sip iwol) — Dekabr\n\n💡 **Maslahat:** Vaqt so'rash eng ko'p ishlatiladigan gaplar!`
  },
  {
    patterns: ['koreys ranglar', 'koreyscha rang', 'koreys ranglarni o\'rganish'],
    response: `**Koreys tilidagi ranglar:** 🎨\n\n| Koreyscha | O'zbekcha |\n|-----------|-----------|\n| 빨간색 (ppalgansaek) | 🔴 Qizil |\n| 파란색 (paransaek) | 🔵 Ko'k |\n| 초록색 (choroksaek) | 🟢 Yashil |\n| 노란색 (noransaek) | 🟡 Sariq |\n| 흰색 (hwinsek) | ⚪ Oq |\n| 검은색 (geomeunsaek) | ⚫ Qora |\n| 갈색 (galsaek) | 🟤 Jigarrang |\n| 분홍색 (bunhongsae) | 💗 Pushti |\n| 보라색 (borasaek) | 💜 Binafsha |\n| 주황색 (juhwangsaek) | 🟠 To'q sariq |\n\n**Foydali gaplar:**\n- 이 꽃은 무슨 색깔이에요? — Bu gul qanday rangda?\n- 이 꽃은 빨간색이에요 — Bu gul qizil rangda\n- 하늘은 파란색이에요 — Osmon ko'k rangda\n\n💡 **Eslatma:** "색" (saek) so'zi "rang" degan ma'noni beradi.`
  },
  {
    patterns: ['koreys oila', 'koreyscha oila', 'koreys oila a\'zolari'],
    response: `**Koreys tilida oila a'zolari:** 👨‍👩‍👧‍👦\n\n| Koreyscha | O'zbekcha |\n|-----------|-----------|\n| 아버지 (abeoji) | 👨 Ota |\n| 어머니 (eomeoni) | 👩 Ona |\n| 형/오빠 (hyeong/oppa) | 👦 Akka (erkak uchun) |\n| 언니 (eonni) | 👧 Opa (erkak uchun) |\n| 남동생 (namdongsaeng) | 👦 Uka |\n| 여동생 (yeodongsaeng) | 👧 Singil |\n| 할아버지 (harabeoji) | 👴 Bobo |\n| 할머니 (halmeoni) | 👵 Buvi |\n\n**Muhim:** Koreys tilida qarindoshlik atamalari yoshga qarab farq qiladi!\n\n**Misol:**\n- 아버지는 선생님이에요 — Otam o'qituvchi\n- 어머니는 의사예요 — Onam shifokor\n\n💡 **Eslatma:** 형/오빠 va 언니 farqini yaxshi tushuning — bu jiddiy xato qilinishi mumkin!`
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
  'to\'rt to\'qiz': '아홉/구 (ahop/gu)',
  'o\'n': '열/십 (yeol/sip)',
  'yuz': '백 (baek)',
  'ming': '천 (cheon)',
  'yigirma': '스물 (seumul)',
  'o\'ttiz': '서른 (seoreun)',
  'qirq': '마흔 (maheun)',
  'ellik': '쉰 (shin)',
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

  // Translation keywords - ONLY explicit translation requests
  const translationKeywords = ['tarjimasi', 'tarjima qilib', 'tarjima qiling', 'tarjima qilingan', 'nima degani', 'nima degan', 'ma\'nosi', 'ma\'no', 'translate', '번역', '뜻']
  if (translationKeywords.some(kw => msg.includes(kw))) return 'translation'

  // Help keywords
  const helpKeywords = ['yordam', 'help', 'nima qila olasiz', 'yordam bering', '도움', 'qanday yordam']
  if (helpKeywords.some(kw => msg.includes(kw))) return 'help'

  // Check general knowledge
  for (const entry of generalKnowledge) {
    if (entry.patterns.some(p => msg.includes(p))) return 'general'
  }

  // Default: handle as conversation (no auto-translation)
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
  let query = msg.replace(/^(tarjima|nima degani|nima degan|ma'no|tarjimasi|translate|번역|뜻)\s*(qil|qilish|qiling|qilingan|ber|bering|qilish|qiladigan)\s*(bering|qil|qiling|qilish|qiladigan)?\s*:?\s*/i, '').trim()

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
function _tryAutoTranslate(message) {
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
      `안녕하세요! 👋 Salom! Men **Asiye AI** — koreys tilini o'rganish bo'yicha aqlli yordamchiman.\n\nSizga qanday yordam bera olaman?\n- So'z tarjimasi uchun "**so'z tarjimasi**" deb yozing\n- Grammatika haqida so'rashingiz mumkin\n- Koreys tilida suhbatlashish\n- Test savollari\n- Hangul alifbo haqida\n- Koreys madaniyati haqida\n\nBemalol savol bering! 😊`,
      `안녕하세요! 👋 Assalomu alaykum! Men Asiye AI, koreys tilini o'rganishda yordam berishdan xursandman!\n\nQaysi mavzuda yordam kerak? 😊`,
      `Salom! 😊 Men Asiye AI. Koreys tilida suhbatlashishni boshlaymizmi?\n\nMisol: "Koreys alifbo haqida aytib bering" yoki "test" deb yozing!`
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // How are you
  if (msg.includes('qalaysiz') || msg.includes('yashasiz') || msg.includes('어떻게 지내')) {
    return `저는 잘 있어요! 😊 Men yaxshiman, rahmat! Siz qalaysiz?\n\nKoreys tilida "Qalaysiz?" deb so'rash uchun:\n- **어떻게 지내세요?** (otteoke jinaeseyo?) — Qalaysiz?\n- **잘 지내세요?** (jal jinaeseyo?) — Yaxshimisiz?\n\nJavob:\n- **잘 있어요** (jal isseoyo) — Yaxshiman\n- **괜찮아요** (gwaenchayo) — Yaxshi`
  }

  // Thank you
  if (msg.includes('rahmat') || msg.includes('tashakkur') || msg.includes('감사') || msg.includes('thank')) {
    const thanks = [
      `천만에요! 😊 Arzimaydi! Yana savollaringiz bo'lsa, bemalol so'rashingiz mumkin!`,
      `도와드릴 수 있어서 기뻐요! 😊 Yordam bera olganimdan xursandman!`
    ]
    return thanks[Math.floor(Math.random() * thanks.length)]
  }

  // Korean phrases explanation
  if (msg.includes('감사합니다') || msg.includes('고마워')) {
    return `**감사합니다** (gamsahamnida) — "Rahmat" degan ma'noni beradi. Rasmiy uslubda ishlatiladi.\n\n**고마워** (gomawo) — "Rahmat" degan ma'noni beradi. Norasmiy uslubda, do'stlar bilan ishlatiladi.\n\nBoshqa variantlar:\n- **감사해요** (gamsaheyo) — Rahmat (o'rta uslub)\n- **정말 고마워요** (jeongmal gomawoyo) — Juda rahmat`
  }

  if (msg.includes('안녕하세요')) {
    return `**안녕하세요** (annyeonghaseyo) — "Salom" degan ma'noni beradi. Bu eng keng tarqalgan salomlashish usuli.\n\nBoshqa salomlashish usullari:\n- **안녕** (annyeong) — norasmiy "Salom"\n- **반갑습니다** (bangapseumnida) — "Tanishganimdan xursandman"\n- **안녕히 가세요** (annyeonghi gaseyo) — "Xayr" (ketayotgan kishi uchun)`
  }

  // Check if message contains Korean - try to explain
  const hasKorean = /[가-힣]/.test(message)
  if (hasKorean) {
    // Search in word databases
    const wordResults = searchWord(message)
    if (wordResults.length > 0) {
      const word = wordResults[0]
      let response = `📖 **${word.korean}** — ${word.meaning}`
      if (word.example) {
        response += `\n\n💡 Misol: ${word.example}`
      }
      return response
    }
    // Search in dictionary
    for (const [key, value] of Object.entries(translationDict)) {
      if (message.includes(key) || key.includes(message)) {
        return `📖 **${key}** — ${value}\n\nBu so'zni yodlash uchun misol gap tuzib ko'ring!`
      }
    }
  }

  // Check general knowledge first
  const generalResult = generateGeneralResponse(message)
  if (generalResult) return generalResult

  // Try to find relevant info in word databases
  if (msg.split(/\s+/).length <= 5) {
    const wordResults = allWords.filter(w =>
      w.meaning.toLowerCase().includes(msg) || msg.includes(w.meaning.toLowerCase())
    )
    if (wordResults.length > 0 && wordResults.length <= 3) {
      let response = `Siz so'ragan so'zlar:\n\n`
      wordResults.forEach((word, i) => {
        response += `${i + 1}. **${word.korean}** — ${word.meaning}`
        if (word.example) response += `\n   💡 ${word.example}`
        response += `\n`
      })
      return response
    }
  }

  // Default conversation replies - more helpful
  const defaultReplies = [
    `Yaxshi savol! 🤔\n\nMen **Asiye AI** — koreys tilini o'rganish bo'yicha aqlli yordamchiman.\n\nSizga quyidagilar yordam bera olaman:\n\n📖 **Tarjima** — "so'z tarjimasi" deb yozing\n📝 **Grammatika** — "grammatika: qoida" deb yozing\n🧠 **Test** — "test" deb yozing\n💬 **Suhbat** — koreys tilida yozing\n📚 **Hangul** — alifbo haqida so'rashingiz mumkin\n🌍 **Madaniyat** — koreys madaniyati haqida\n\nMisol savollar:\n- "사랑 tarjimasi"\n- "koreys alifbo"\n- "koreys raqamlar"\n- "test"\n- "koreys taomlar"`,
    `Men **Asiye AI**! Koreys tilini o'rganishda yordam beraman.\n\nSavolingizni tushundim. Quyidagi mavzularda yordam bera olaman:\n\n📚 Hangul alifbo va harflar\n📖 So'zlar tarjimasi\n📝 Grammatika qoidalari\n🧠 Test savollari\n🌍 Koreys madaniyati va urf-odatlari\n⏰ Vaqt, kunlar, oylar\n🎨 Ranglar, raqamlar\n🍜 Koreys taomlari\n\nQaysi mavzuda yordam kerak?`,
    `Koreys tilini o'rganish ajoyib! 💪\n\nMen **Asiye AI** — sizning shaxsiy koreys o'qituvchingiz.\n\nMen 455+ koreys so'zi va 100+ grammatika qoidasi haqida bilaman. Shuningdek, koreys madaniyati, TOPIK imtihoni, Hangul alifbo va boshqa mavzularda ham yordam bera olaman.\n\nMisol savollar:\n- "koreys alifbo haqida"\n- "koreys tilini qanday o'rganish?"\n- "foydali koreys gaplar"\n- "test"\n\nQaysi mavzuda yordam kerak?`
  ]

  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)]
}

// ========================
// Main AI Response Generator
// ========================
function generateAIResponse(message, _chatHistory = []) {
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
