# 🎯 면접 도우미 (Interview Helper)

취업 면접과 입시 면접을 위한 종합 준비 도구입니다. Next.js와 TypeScript로 개발되었습니다.

## ✨ 주요 기능

### 1. 면접 타입 선택
- **취업 면접**: 기업 면접 준비를 위한 질문 연습과 답변 작성 도움
- **입시 면접**: 대학 입시 면접 준비를 위한 질문 연습과 답변 작성 도움

### 2. 면접 질문 생성기
- 카테고리별 질문 선택 (자기소개, 지원동기, 강점/약점 등)
- 랜덤 질문 생성 기능
- 자주 나오는 질문 목록 제공
- 취업/입시별 맞춤 질문 데이터베이스

### 3. 답변 작성 도우미
- 질문별 답변 작성 가이드 제공
- 답변 품질 자동 체크 (잘한 점/개선할 점)
- STAR 기법 등 답변 작성 팁
- 실시간 답변 길이 표시

### 4. 면접 성공 팁
- 면접 전/중/후 준비사항
- 답변 구성 방법 가이드
- 취업/입시별 맞춤 팁
- 클릭하여 상세 내용 확인 가능

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 🛠️ 기술 스택

- **Next.js 16** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4** - 스타일링
- **React 19** - UI 라이브러리

## 📁 프로젝트 구조

```
freeimagetoolsnext/
├── app/
│   ├── components/
│   │   ├── AnswerHelper.tsx          # 답변 작성 도우미
│   │   ├── InterviewTips.tsx         # 면접 팁
│   │   ├── InterviewTypeSelector.tsx # 면접 타입 선택
│   │   └── QuestionGenerator.tsx     # 질문 생성기
│   ├── layout.tsx                    # 레이아웃
│   ├── page.tsx                      # 메인 페이지
│   └── globals.css                   # 전역 스타일
├── public/                           # 정적 파일
└── package.json
```

## 🎨 디자인 특징

- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다크 모드 지원
- ✅ 현대적인 UI/UX
- ✅ 직관적인 인터페이스

## 📝 사용 방법

1. 메인 페이지에서 **취업 면접** 또는 **입시 면접** 선택
2. 질문 카테고리를 선택하거나 **랜덤 질문 생성** 버튼 클릭
3. 답변을 작성하고 자동 피드백 확인
4. **면접 팁** 섹션에서 추가 정보 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🔗 링크

- [GitHub 저장소](https://github.com/futureurhero-stack/FreeimageToolsNext)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
