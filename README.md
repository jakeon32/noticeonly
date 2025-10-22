# APEC 2025 Notice System

Google Sheets 기반 미니멀 공지사항 시스템 with 상단 배너

## 🌟 프로젝트 개요

## 배포 페이지
https://jakeon32.github.io/noticeonly/

APEC 2025 경주 교통 안내를 위한 심플한 공지사항 시스템입니다. Google Sheets를 데이터베이스로 사용하여 별도의 백엔드 없이 실시간으로 공지사항을 관리할 수 있습니다.

**두 가지 버전 제공:**
- 🎯 **Minimal Version** (`index.html`) - 상단 배너 전용, 핵심 기능만 ⭐ 메인
- 📄 **Full Version** (`index-old.html`) - 사이드 패널, 플로팅 버튼, 복합 기능

## ✨ 주요 기능

### 미니멀 버전 특징
- ✅ **상단 고정 배너** - 스크롤해도 항상 보임
- ✅ **자동 순환** - 여러 공지 자동 전환 (5초 간격)
- ✅ **페이지네이션** - 공지 개수 표시 (1/3)
- ✅ **수동 네비게이션** - 화살표 버튼으로 이동
- ✅ **모달 상세보기** - 배너 클릭 시 전체 내용 표시
- ✅ **24시간 숨김** - 닫기 버튼으로 하루 동안 숨기기
- ✅ **키보드 지원** - ESC, 방향키 단축키
- ✅ **반응형 디자인** - 모바일/태블릿/PC 완벽 지원

### 전체 버전 추가 기능
- 📢 **플로팅 버튼** - 우측 하단 고정 버튼
- 📋 **사이드 패널** - 전체 공지 목록 보기
- 🔔 **읽음 표시** - LocalStorage 기반 읽음 추적
- 🎨 **배지 시스템** - 안 읽은 공지 개수 표시

## 🛠 기술 스택

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Data Source:** Google Sheets API
- **Icons:** SVG (gridicons_notice.svg, close.svg, x-close.png)
- **Storage:** Cookie (24시간 숨김 기능)
- **Hosting:** GitHub Pages (권장)

## 📂 파일 구조

```
notice_toponly/
├── index.html                      # 미니멀 버전 ⭐ 메인
├── style.css                       # 미니멀 버전 스타일 ⭐
├── script.js                       # 미니멀 버전 스크립트 ⭐
├── index-old.html                  # 전체 버전 (구버전)
├── style-old.css                   # 전체 버전 스타일
├── script-old.js                   # 전체 버전 스크립트
├── images/
│   ├── gridicons_notice.svg        # 공지 아이콘
│   ├── close.svg                   # 배너 닫기 아이콘 (흰색)
│   └── x-close.png                 # 모달 닫기 아이콘 (검은색)
├── README.md                       # 프로젝트 문서
├── CHANGELOG.md                    # 변경 이력
├── GOOGLE_SHEETS_SETUP_GUIDE.md   # Google Sheets 연동 가이드
├── GOOGLE_SHEETS_SETUP_SIMPLE.md  # 간단한 연동 방법
├── NOTICE_WRITING_GUIDE.md        # 공지 작성 가이드
└── VERSION_UPDATE_GUIDE.md        # 버전 업데이트 가이드
```

## 🚀 빠른 시작

### 1. Google Sheets 설정

1. [Google Sheets](https://sheets.google.com/)에서 새 스프레드시트 생성
2. 첫 번째 행에 헤더 입력:
   ```
   title | date | category | content
   ```
3. 시트 탭 이름을 **"notices"**로 변경
4. 시트 공개 설정: **"링크가 있는 모든 사용자"** (뷰어)

### 2. Google Cloud API 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. **Google Sheets API** 활성화
4. **API 키** 생성
5. HTTP 리퍼러 제한 설정:
   ```
   https://yourdomain.github.io/*
   http://localhost/*
   ```

### 3. 코드 설정

`script.js` 파일의 6-8번째 줄 수정:

```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';  // Sheets URL의 /d/ 와 /edit 사이 값
const API_KEY = 'YOUR_API_KEY';            // Google Cloud에서 생성한 API 키
const SHEET_NAME = 'notices';              // 시트 탭 이름
```

### 4. 데이터 입력

| title | date | category | content |
|-------|------|----------|---------|
| Traffic Control Notice | 2025-10-16 | URGENT | `<p>교통 통제 안내...</p>` |
| Shuttle Service | 2025-10-15 | INFO | `<p>셔틀버스 운행...</p>` |

**Category 옵션:**
- `URGENT` - 긴급 (빨간색 배경)
- `INFO` - 정보 (파란색 배경)
- `NOTICE` - 일반 (회색 배경)

**Content HTML 지원:**
```html
<p>일반 문단</p>
<p><strong>굵은 글씨</strong>로 강조</p>
<ul>
  <li>목록 항목 1</li>
  <li>목록 항목 2</li>
</ul>
<a href="https://example.com">링크</a>
<div class="notice-highlight">하이라이트 박스</div>
```

## 📱 로컬 테스트

### Python 서버:
```bash
cd notice_toponly
python -m http.server 8000
# http://localhost:8000/index.html
```

### Node.js 서버:
```bash
npx http-server -p 8000
# http://localhost:8000/index.html
```

## 🎨 디자인 특징

### 미니멀 배너 구조
```
┌────────────────────────────────────────────┐
│ [🔵] Notice Title...  [1/3] [<] [>] [×]   │
└────────────────────────────────────────────┘
```

- **아이콘** - 원형 배경 + SVG 아이콘
- **제목** - PC 1줄, 모바일 2줄 (말줄임)
- **페이지** - 어두운 배경 (정보 느낌)
- **네비게이션** - 밝은 박스 (버튼 느낌)
- **닫기** - 배경 없는 X 아이콘

### 모달 팝업
```
┌─────────────────────┐
│ Title          [×]  │
│ 2025-10-16 • INFO  │
│ ─────────────────── │
│                     │
│ Content here...     │
│ (스크롤 가능)        │
│                     │
│ ░░░░░░░░░░░░░░░░░  │ ← 스크롤 힌트
└─────────────────────┘
```

- 콘텐츠 길이에 따라 자동 조절
- 스크롤 가능 시 하단 그라데이션 표시
- 하단 40px 여백 확보
- 배경 클릭으로 닫기

## ⚙️ 설정 옵션

### 자동 순환 시간 변경
```javascript
// script.js
const AUTO_SCROLL_INTERVAL = 5000;  // 5초 (밀리초)
```

### 쿠키 만료 시간 변경
```javascript
// closeBanner() 함수 내
expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000)); // 24시간
```

## 🎯 사용 시나리오

1. **페이지 로드** → Google Sheets에서 공지 가져오기
2. **쿠키 확인** → 24시간 내 닫은 공지는 제외
3. **배너 표시** → 첫 번째 공지 표시
4. **자동 순환** → 5초마다 다음 공지로 전환
5. **사용자 클릭**
   - **배너 텍스트** → 모달 상세보기
   - **< >** → 수동 네비게이션
   - **×** → 24시간 숨김
6. **키보드 단축키**
   - **ESC** → 모달 닫기
   - **← →** → 배너 네비게이션

## 🌍 배포 (GitHub Pages)

1. GitHub 저장소 생성
2. 코드 업로드
3. Settings → Pages
4. Source: `main` 브랜치 선택
5. 배포 완료 (1-2분 소요)
6. `https://USERNAME.github.io/REPO_NAME/` 접속

## 📊 버전 비교

| 기능 | 전체 버전 | 미니멀 버전 |
|------|----------|------------|
| 상단 배너 | ✅ | ✅ |
| 플로팅 버튼 | ✅ | ❌ |
| 사이드 패널 | ✅ | ❌ |
| 읽음 추적 | ✅ (LocalStorage) | ❌ |
| 배지 개수 | ✅ | ❌ |
| 자동 순환 | ✅ | ✅ |
| 모달 상세 | ✅ | ✅ |
| 코드량 | 1,217줄 | 708줄 (-41%) |
| 복잡도 | 높음 | 낮음 |
| 권장 용도 | 다기능 필요 시 | 심플한 공지만 |

## 🔧 커스터마이징

### 배너 색상 변경
```css
/* style.css */
#topBanner.urgent {
    background: linear-gradient(135deg, #d32f2f 0%, #c62828 100%);
}
```

### 아이콘 교체
`images/` 폴더에 동일한 파일명으로 교체:
- `gridicons_notice.svg` - 공지 아이콘 (20×20)
- `close.svg` - 배너 닫기 (24×24, 흰색)
- `x-close.png` - 모달 닫기 (32×32, 검은색)

### 모달 최대 높이 조절
```css
/* style.css */
.detail-card {
    max-height: 85vh;  /* 화면의 85% */
}
```

## 🐛 문제 해결

### 공지가 표시되지 않음
1. F12 개발자 도구 → Console 확인
2. Google Sheets 공개 설정 확인
3. API 키 및 Sheet ID 확인
4. 브라우저 쿠키 확인 (24시간 숨김 여부)

### 이미지가 안 보임
1. `images/` 폴더 경로 확인
2. 파일명 대소문자 확인
3. 브라우저 캐시 삭제 (Ctrl+Shift+R)

### 모바일에서 레이아웃 깨짐
1. viewport 메타태그 확인
2. 브라우저 줌 레벨 100% 확인
3. 최신 브라우저 사용

## 📝 업데이트 히스토리

자세한 변경 내역은 [CHANGELOG.md](CHANGELOG.md)를 참조하세요.

### v2.0.0 - Minimal Version (2025-01-XX)
- ✨ 미니멀 버전 추가
- 🎨 배너 디자인 개선 (박스 스타일 페이지네이션)
- 🖼️ SVG/PNG 아이콘 시스템
- 📱 모달 UX 개선 (동적 높이, 스크롤 힌트)
- 🔧 코드 41% 감소 (1,217줄 → 708줄)

### v1.1.0 (2025-01-20)
- ✅ 캐러셀 기능 추가
- ✅ 페이지 네비게이션
- ✅ 스와이프 제스처
- ✅ 타입 필드 제거 (간소화)

### v1.0.0 (2025-01-20)
- 🎉 초기 프로젝트 생성
- ✅ Google Sheets 연동
- ✅ 반응형 디자인

## 📚 관련 문서

- [Google Sheets 연동 가이드](GOOGLE_SHEETS_SETUP_GUIDE.md)
- [공지 작성 가이드](NOTICE_WRITING_GUIDE.md)
- [버전 업데이트 가이드](VERSION_UPDATE_GUIDE.md)

## 🤝 기여

이슈 및 풀 리퀘스트 환영합니다!

## 📄 라이선스

MIT License

## 👤 제작

**Made for APEC 2025 Gyeongju**

---

## 💡 개발 팁

### Google Sheets 데이터 즉시 반영
- Sheets 수정 → 자동 저장 → 웹사이트 새로고침 (F5)

### 쿠키 초기화 (테스트용)
- F12 → Application → Cookies → 해당 사이트 쿠키 삭제

### 공지 작성 Best Practices
- 제목: 30자 이내
- 날짜: YYYY-MM-DD 형식 권장
- 카테고리: 용도에 맞게 선택
- Content: HTML로 구조화

**Happy Coding! 🚀**
