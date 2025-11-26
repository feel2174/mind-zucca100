-- Supabase에서 실행할 SQL 스크립트
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- subscribers 테이블 생성
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 이메일 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- RLS (Row Level Security) 정책 설정
-- 모든 사용자가 읽기 가능하도록 설정 (필요시 수정)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 익명 사용자가 SELECT 가능하도록 정책 생성 (중복 체크용)
CREATE POLICY "Allow anonymous select" ON subscribers
  FOR SELECT
  TO anon
  USING (true);

-- 익명 사용자가 INSERT만 가능하도록 정책 생성
CREATE POLICY "Allow anonymous inserts" ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 인증된 사용자가 모든 작업 가능하도록 정책 생성 (관리자용)
CREATE POLICY "Allow authenticated all" ON subscribers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

