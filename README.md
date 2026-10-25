# Topik Play

Koreys tilini o'zbek tilida o'rgatuvchi React, Vite va Capacitor ilovasi.

## Firebase sozlamalari

Web Firebase sozlamalari src/firebase.js faylida. O'z Firebase loyihangiz ma'lumotlarini qo'ying.

Firebase Console'da (console.firebase.google.com):

1. **Yangi loyiha yarating** yoki mavjud loyihangizni oching.
2. **Web ilovasini qo'shing** (</> belgisi) va konfiguratsiya ma'lumotlarini oling.
3. src/firebase.js faylida irebaseConfig obyektiga o'z qiymatlaringizni qo'ying:
   - piKey, uthDomain, projectId, storageBucket, messagingSenderId, ppId
4. **Authentication → Sign-in method** bo'limida:
   - **Email/Password** provayderini yoqing
   - **Phone** provayderini yoqing
5. **Authentication → Settings → Authorized domains** qismiga localhost, 127.0.0.1 va 	opik-play.vercel.app domenlarini qo'shing.
6. **Firestore Database** bo'limidan standart ma'lumotlar bazasini yarating.
7. Firestore **Rules** bo'limiga irestore.rules faylining mazmunini ko'chirib, **Publish** tugmasini bosing.

### Vercel Environment Variables

Vercel'da deploy qilish uchun Firebase kalitlarini environment variables sifatida qo'shing:

1. **Vercel Dashboard** ga kiring va loyihangizni tanlang.
2. **Settings → Environment Variables** ga o'ting.
3. Quyidagi o'zgaruvchilarni qo'shing (Production, Development, Preview uchun):
   - VITE_FIREBASE_API_KEY — Firebase API kalit
   - VITE_FIREBASE_AUTH_DOMAIN — Firebase authDomain
   - VITE_FIREBASE_PROJECT_ID — Firebase loyiha ID
   - VITE_FIREBASE_STORAGE_BUCKET — Firebase storage bucket
   - VITE_FIREBASE_MESSAGING_SENDER_ID — Firebase sender ID
   - VITE_FIREBASE_APP_ID — Firebase app ID
4. Qiymatlarni Firebase Console > Project Settings > General > Your apps > Web app dan oling.
5. Loyihani qayta deploy qiling.

.env.example faylida barcha kerakli o'zgaruvchilar ro'yxati keltirilgan.

### Kirish usullari

Ilovada 3 ta kirish usuli mavjud:

- **Email orqali kirish** — email va parol bilan hisob ochish va kirish
- **Telefon orqali kirish** — telefon raqam va SMS kod bilan kirish
- **Qurilmada davom etish** — faqat qurilmada saqlash (localStorage)

Google orqali ilk kirishda qurilmada saqlangan o'quv ma'lumotlari akkauntning Firestore ma'lumotlariga ko'chiriladi. Akkauntda avvaldan bulutli ma'lumot bo'lsa, qurilmadagi ma'lumotlar o'rniga o'sha ma'lumot yuklanadi.

Google akkauntsiz foydalanish uchun kirish ekranidagi **Qurilmada davom etish** tugmasini bosing. O'quv ma'lumotlari faqat shu qurilma brauzerida saqlanadi va Google akkauntiga sinxronlanmaydi. Ilovaga qayta kirganda qurilma usuli saqlanib qoladi; ilova ichidagi **Kirish usulini tanlash** tugmasi orqali Google usuliga o'tish mumkin.

Kirish usuli va kunduzgi/tungi mavzuni ilovaning **Sozlamalar** bo'limidan boshqaring.

Ilovaning pastki menyusida **TOPIK I**, **TOPIK II** va **Sozlamalar** bo'limlari bor. TOPIK II ichida **Lug'at** (30 kun, har kuni 33 tadan), **Sigi (쓰기, yozish)**, **Ilgi (읽기, o'qish)** va **Titki (듣기, eshitish)** yo'nalishlari ajratilgan. Birinchi kunning 33 ta so'zi o'zbekcha tarjimasi bilan qo'shilgan; qolgan kunlar PDF manbasi kelgach to'ldiriladi.

## Ishga tushirish

`powershell
npm install
npm run dev
`

Vercel'ga tarqatishda o'zgarishlarni GitHub'ga yuboring; 	opik-play.vercel.app domeni Firebase'da ruxsat etilgan bo'lishi kerak.

## Android

`powershell
npm run build
npx cap sync android
`

So'ng Android Studio'da ndroid papkasini ochib, debug APK yarating. Android ilovasida Google OAuth ishlashi uchun Firebase Authentication'da Android ilovasini ham ro'yxatdan o'tkazib, SHA-1 fingerprint va OAuth sozlamalarini qo'shish talab qilinadi.