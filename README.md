# Topik Play

Koreys tilini o‘zbek tilida o‘rgatuvchi React, Vite va Capacitor ilovasi.

## Firebase sozlamalari

Web Firebase sozlamalari `src/firebase.js` faylida. Firebase web ilovasi sozlamasidagi API kaliti brauzerda ko‘rinishi tabiiy; Firestore qoidalari foydalanuvchi ma’lumotlarini himoya qiladi.

Google orqali kirish va qurilmalararo saqlash uchun Firebase Console’da:

1. **Authentication → Kirish usuli → Google** provayderini yoqing va qo‘llab-quvvatlash elektron pochtasini tanlang.
2. **Authentication → Settings → Authorized domains** qismiga `localhost`, `127.0.0.1` va `topik-play.vercel.app` domenlarini qo‘shing.
3. **Firestore Database** bo‘limidan standart ma’lumotlar bazasini yarating.
4. Firestore **Rules** bo‘limiga `firestore.rules` faylining mazmunini ko‘chirib, **Publish** tugmasini bosing. Bu qoida har bir foydalanuvchiga faqat o‘zining `users/{uid}` ma’lumotlarini o‘qish va yozish huquqini beradi.

Google orqali ilk kirishda qurilmada saqlangan o‘quv ma’lumotlari akkauntning Firestore ma’lumotlariga ko‘chiriladi. Akkauntda avvaldan bulutli ma’lumot bo‘lsa, qurilmadagi ma’lumotlar o‘rniga o‘sha ma’lumot yuklanadi.

Google akkauntsiz foydalanish uchun kirish ekranidagi **Qurilmada davom etish** tugmasini bosing. O‘quv ma’lumotlari faqat shu qurilma brauzerida saqlanadi va Google akkauntiga sinxronlanmaydi. Ilovaga qayta kirganda qurilma usuli saqlanib qoladi; ilova ichidagi **Kirish usulini tanlash** tugmasi orqali Google usuliga o‘tish mumkin.

Kirish usuli va kunduzgi/tungi mavzuni ilovaning **Sozlamalar** bo‘limidan boshqaring.

Ilovaning pastki menyusida **TOPIK 1**, **TOPIK 2** va **Sozlamalar** bo‘limlari bor. TOPIK 2 ichida **Sigi (쓰기, yozish)**, **Ilgi (읽기, o‘qish)** va **Titki (듣기, eshitish)** yo‘nalishlari ajratilgan; ularning o‘quv mazmuni keyin qo‘shiladi.

## Ishga tushirish

```powershell
npm install
npm run dev
```

Vercel’ga tarqatishda o‘zgarishlarni GitHub’ga yuboring; `topik-play.vercel.app` domeni Firebase’da ruxsat etilgan bo‘lishi kerak.

## Android

```powershell
npm run build
npx cap sync android
```

So‘ng Android Studio’da `android` papkasini ochib, debug APK yarating. Android ilovasida Google OAuth ishlashi uchun Firebase Authentication’da Android ilovasini ham ro‘yxatdan o‘tkazib, SHA-1 fingerprint va OAuth sozlamalarini qo‘shish talab qilinadi.
