# Topik Play

Koreys tilini o‘zbek tilida o‘rgatuvchi React, Vite va Capacitor ilovasi.

## Firebase sozlamalari

Web Firebase sozlamalari `src/firebase.js` faylida. Firebase web ilovasi sozlamasidagi API kaliti brauzerda ko‘rinishi tabiiy; Firestore qoidalari foydalanuvchi ma’lumotlarini himoya qiladi.

Google orqali kirish va qurilmalararo saqlash uchun Firebase Console’da:

1. **Authentication → Kirish usuli → Google** provayderini yoqing va qo‘llab-quvvatlash elektron pochtasini tanlang.
2. **Authentication → Settings → Authorized domains** qismiga `localhost`, `127.0.0.1` va `topik-play.vercel.app` domenlarini qo‘shing.
3. **Firestore Database** bo‘limidan standart ma’lumotlar bazasini yarating.
4. Firestore **Rules** bo‘limiga `firestore.rules` faylining mazmunini ko‘chirib, **Publish** tugmasini bosing. Bu qoida har bir foydalanuvchiga faqat o‘zining `users/{uid}` ma’lumotlarini o‘qish va yozish huquqini beradi.

Google-д анх удаа нэвтрэхэд энэ төхөөрөмжид өмнө нь хадгалагдсан суралцах мэдээллийг аккаунтын Firestore баримт болгон хуулна. Аккаунтад cloud мэдээлэл аль хэдийн байвал түүнийг төхөөрөмжийн мэдээллийн оронд ашиглана.

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
