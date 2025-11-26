# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입/로그인
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 설정
4. 리전 선택 (가장 가까운 리전 권장)
5. 프로젝트 생성 완료 대기 (약 2분)

## 2. API 키 확인

1. Supabase Dashboard에서 프로젝트 선택
2. Settings > API 메뉴로 이동
3. 다음 정보 복사:
   - **Project URL** (예: `https://xxxxx.supabase.co`)
   - **anon/public key** (예: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성 (없으면 생성):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요! (이미 `.gitignore`에 포함됨)

## 4. 데이터베이스 테이블 생성

1. Supabase Dashboard > SQL Editor로 이동
2. `supabase-setup.sql` 파일의 내용을 복사하여 실행
3. 또는 아래 SQL을 직접 실행:

```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated all" ON subscribers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

## 5. 테스트

1. 개발 서버 재시작: `pnpm dev`
2. 랜딩 페이지에서 이메일 구독 테스트
3. Supabase Dashboard > Table Editor에서 `subscribers` 테이블 확인

## 문제 해결

### 환경 변수가 인식되지 않는 경우
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 개발 서버를 재시작하세요 (`pnpm dev`)

### RLS 정책 오류
- Supabase Dashboard > Authentication > Policies에서 정책 확인
- 필요시 `supabase-setup.sql` 다시 실행

### 연결 오류
- Supabase 프로젝트가 활성화되어 있는지 확인
- API 키가 올바른지 확인
- 네트워크 연결 확인

## 데이터 확인 방법

Supabase Dashboard > Table Editor > subscribers 테이블에서 구독자 목록 확인 가능


