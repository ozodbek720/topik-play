-- ============================================
-- Topik Play — Supabase SQL jadval yaratish
-- ============================================
-- Bu fayldagi SQL kodni Supabase Dashboard → SQL Editor da ishga tushiring
-- ============================================

-- 1. Profiles jadvali
CREATE TABLE IF NOT EXISTS profiles (
  uid UUID PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  bio TEXT,
  avatar TEXT,
  email TEXT,
  displayName TEXT,
  updatedAt TEXT
);

-- 2. Accounts jadvali (o'quv progress, sozlamalar, test natijalari)
CREATE TABLE IF NOT EXISTS accounts (
  uid UUID PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS messages (
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
CREATE TABLE IF NOT EXISTS friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  myUid UUID NOT NULL,
  friendUid UUID NOT NULL,
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
CREATE POLICY "Profiles are updatable by owners" ON profiles FOR UPDATE USING (auth.uid() = uid);

-- Accounts
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Accounts are viewable by owners" ON accounts FOR SELECT USING (auth.uid() = uid);
CREATE POLICY "Accounts are insertable by owners" ON accounts FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Accounts are updatable by owners" ON accounts FOR UPDATE USING (auth.uid() = uid);

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages are viewable by everyone" ON messages FOR SELECT USING (true);
CREATE POLICY "Messages are insertable by authenticated users" ON messages FOR INSERT WITH CHECK (auth.uid()::text = senderId);

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
