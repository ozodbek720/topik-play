-- ============================================
-- Topik Play — Supabase SQL jadval yaratish
-- ============================================
-- MUHIM: Agar jadval allaqachon yaratilgan bo'lsa, avval o'chiring!
-- Quyidagi DROP qoidalari eski jadvalni o'chiradi va yangi yaratadi.
-- ============================================

-- Eski jadvalarni o'chirish (agar mavjud bo'lsa)
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 1. Profiles jadvali (uid TEXT — device foydalanuvchilar uchun)
CREATE TABLE profiles (
  uid TEXT PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  bio TEXT,
  avatar TEXT,
  email TEXT,
  displayName TEXT,
  updatedAt TEXT
);

-- 2. Accounts jadvali (o'quv progress, sozlamalar, test natijalari)
CREATE TABLE accounts (
  uid TEXT PRIMARY KEY,
  words JSONB DEFAULT '[]'::jsonb,
  customGrammar JSONB DEFAULT '[]'::jsonb,
  mistakes JSONB DEFAULT '[]'::jsonb,
  learningProgress JSONB DEFAULT '{}'::jsonb,
  gameState JSONB DEFAULT '{}'::jsonb,
  selectedTheme TEXT,
  colorMode TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  updatedAt TEXT
);

-- 3. Messages jadvali (chat xabarlari)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chatId TEXT NOT NULL,
  senderId TEXT NOT NULL,
  senderName TEXT,
  text TEXT NOT NULL,
  timestamp TEXT NOT NULL
);

CREATE INDEX idx_messages_chatId ON messages(chatId);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);

-- 4. Friends jadvali (dostlar)
CREATE TABLE friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  myUid TEXT NOT NULL,
  friendUid TEXT NOT NULL,
  addedAt TEXT,
  UNIQUE(myUid, friendUid)
);

CREATE INDEX idx_friends_myUid ON friends(myUid);

-- ============================================
-- Row Level Security (RLS) qoidalari
-- ============================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Profiles are insertable by authenticated users" ON profiles FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Profiles are insertable by anyone (device users)" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Profiles are updatable by owners" ON profiles FOR UPDATE USING (auth.uid() = uid);
CREATE POLICY "Profiles are updatable by uid" ON profiles FOR UPDATE USING (uid = uid);

-- Accounts
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Accounts are viewable by owners" ON accounts FOR SELECT USING (auth.uid() = uid);
CREATE POLICY "Accounts are insertable by owners" ON accounts FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Accounts are updatable by owners" ON accounts FOR UPDATE USING (auth.uid() = uid);

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages are viewable by everyone" ON messages FOR SELECT USING (true);
CREATE POLICY "Messages are insertable by anyone" ON messages FOR INSERT WITH CHECK (true);

-- Friends
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Friends are viewable by owners" ON friends FOR SELECT USING (auth.uid() = myUid);
CREATE POLICY "Friends are insertable by owners" ON friends FOR INSERT WITH CHECK (auth.uid() = myUid);
CREATE POLICY "Friends are deletable by owners" ON friends FOR DELETE USING (auth.uid() = myUid);

-- ============================================
-- Real-time yoqish
-- ============================================
-- Supabase Dashboard → Database → Replication da
-- profiles, messages, friends jadvalлари uchun "Replicate" ni yoqing
-- ============================================
