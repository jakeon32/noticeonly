# Changelog

All notable changes to the APEC 2025 Notice System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2025-01-XX - Minimal Version Release

### Added
- **🎯 Minimal Version**: 새로운 미니멀 버전 추가 (`index-minimal.html`)
  - 상단 배너 전용 버전
  - 코드 41% 감소 (1,217줄 → 708줄)
  - 핵심 기능만 포함
- **🖼️ SVG/PNG 아이콘 시스템**:
  - `gridicons_notice.svg`: 공지 아이콘 (20×20, 원형 배경)
  - `close.svg`: 배너 닫기 아이콘 (24×24, 흰색)
  - `x-close.png`: 모달 닫기 아이콘 (32×32, 검은색)
- **📱 모달 UX 개선**:
  - 동적 높이: 콘텐츠 길이에 따라 자동 조절
  - 스크롤 힌트: 하단 그라데이션으로 추가 내용 표시
  - 하단 여백: 40px 여백 확보 (`.detail-body::after`)
  - 모바일 상하 여백: 90vh (5% 여백)
- **⌨️ 키보드 단축키**: 방향키로 배너 네비게이션 지원

### Changed
- **🎨 배너 디자인 대폭 개선**:
  - 버튼 순서: `[공지] [1/2] [<] [>] [×]` (참조 이미지 반영)
  - 페이지 표시: 어두운 배경 + 배너 색상 텍스트 → 어두운 배경 + 흰색 텍스트
  - 네비게이션: 박스 스타일로 통일 (border + background)
  - 아이콘: 이모지 → SVG (원형 배경)
  - 닫기 버튼: 박스 배경 → 배경 없는 아이콘
- **📏 제목 말줄임 개선**:
  - PC: 1줄 (`white-space: nowrap`)
  - 모바일: 2줄 (`-webkit-line-clamp: 2`)
- **🗑️ 타입 필드 제거**: Google Sheets `type` 컬럼 완전 제거
  - 모든 공지가 동일하게 처리
  - 안 읽은 공지만 배너에 표시 (쿠키 기반)
- **🔄 배지 시스템 제거**: 페이지네이션과 중복되어 제거

### Removed
- ❌ **모달 팝업 제거** (미니멀 버전): `type: 'modal'` 지원 중단
- ❌ **플로팅 버튼 제거** (미니멀 버전)
- ❌ **사이드 패널 제거** (미니멀 버전)
- ❌ **읽음 추적 제거** (미니멀 버전): LocalStorage 기능 제거
- ❌ **배지 개수 제거**: View All 버튼 배지 삭제
- ❌ **터치 스와이프 제거** (미니멀 버전)

### Fixed
- **🔧 하단 패딩 문제 해결**: `::after` 가상 요소로 확실한 여백 확보
- **📐 모달 크기 문제 해결**: 고정 높이 → 동적 높이 (flexbox)
- **🎨 모바일 언밸런스 해결**: 전체 화면 → 90vh (상하 여백 추가)

### Technical
- **CSS 구조 개선**:
  - 2단 레이아웃: `.banner-main-row` + `.banner-action-row` → 1단 레이아웃
  - Flexbox: 헤더 고정 + 바디 스크롤
  - 가상 요소: `::after`로 하단 여백
- **쿠키 이름 통일**: `alertBanner_` → `noticeBanner_`
- **함수 간소화**: 불필요한 읽음 추적 함수 제거

---

## [1.1.0] - 2025-01-20

### Added
- **캐러셀 기능**: 모달 및 배너에서 여러 공지를 좌우로 넘기며 볼 수 있는 캐러셀 기능 추가
  - 모달: 중앙 팝업에서 여러 공지 탐색
  - 배너: 상단 배너에서 여러 공지 탐색
- **페이지 네비게이션**: 좌우 화살표 버튼과 페이지 인디케이터 (1 / 3) 추가
- **스와이프 제스처**: 모바일에서 좌우 스와이프로 공지 탐색 기능
- **버전 관리 시스템**: 캐시 버스팅을 위한 버전 관리 구축
  - `version.json` 파일 추가
  - HTML/CSS/JS 파일에 버전 쿼리 파라미터 추가
  - `VERSION_UPDATE_GUIDE.md` 가이드 문서 추가
  - `.htaccess` 캐시 설정 파일 추가
- **Google Sheets type 컬럼**: 공지 표시 방식을 제어하는 `type` 필드 추가
  - `modal`: 중앙 모달 팝업
  - `banner`: 상단 배너
  - `list`: 공지 목록만 표시

### Changed
- **모달 레이아웃 개선**: 콘텐츠 길이와 관계없이 일정한 크기 유지
  - `min-height: 400px` 고정
  - 제목 영역 2줄 고정 (`min-height: 66px`)
  - 콘텐츠 영역 최대 높이 제한 (`max-height: 200px`)
- **배너 네비게이션 UI 개선**: 화살표 버튼을 그룹화하여 닫기 버튼 옆에 배치
  - 버튼 그룹에 배경 추가
  - 버튼 간격 좁게 조정 (4px)
- **네비게이션 버튼 위치**: 모달의 화살표 버튼을 페이지 인디케이터 양옆으로 이동
  - 이전: 모달 양옆에 절대 위치
  - 개선: 인디케이터와 함께 중앙 정렬

### Fixed
- **View Full Details 버그 수정**: "자세히 보기" 버튼 클릭 시 현재 보고 있는 공지를 정확히 표시
  - 이전: 항상 첫 번째 공지만 표시
  - 수정: 현재 모달의 공지를 표시
- **모달 크기 변동 문제 해결**: 공지마다 제목 길이가 달라 모달 크기가 변하던 문제 수정
- **콘텐츠 스크롤 문제 해결**: 콘텐츠가 길 때 하단 버튼이 안 보이던 문제 수정

### Technical
- **슬라이드 애니메이션**: 모달/배너 전환 시 부드러운 좌우 슬라이드 효과
  - 이전: 페이드 인/아웃
  - 개선: translateX + opacity 조합
- **쿠키 관리**: 각 공지별 개별 쿠키로 닫기 상태 관리
  - `alertModal_{id}_closed`
  - `alertBanner_{id}_closed`
- **하위 호환성**: type 컬럼 없는 기존 데이터와 호환
  - `content: row[4] || row[3]`
  - `type: row[3] || 'list'`

---

## [1.0.0] - 2025-01-20

### Added
- **초기 프로젝트 구축**: APEC 2025 공지사항 시스템 기본 기능
- **Google Sheets 연동**: Google Sheets API를 통한 실시간 데이터 로드
- **공지 목록**: 사이드 패널 형식의 공지 목록 표시
- **플로팅 버튼**: 우측 하단 플로팅 액션 버튼
- **읽음/안 읽음 추적**: LocalStorage 기반 읽은 공지 관리
- **배지 시스템**: 안 읽은 공지 개수 표시
- **카테고리 시스템**: URGENT, INFO, NOTICE 카테고리별 색상 구분
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응
- **알림 배너**: 상단 긴급 공지 배너 (초기 버전)
  - 쿠키 기반 24시간 닫기
  - 클릭 시 상세 내용 표시

### Features
- HTML 콘텐츠 지원 (굵게, 목록, 링크, 하이라이트 등)
- ESC 키로 패널 닫기
- 부드러운 애니메이션 효과
- 접근성 지원 (aria-label)

### Design
- APEC 브랜드 컬러 적용 (#1a237e)
- 그라디언트 배경
- 카드 형식 UI
- 그림자 효과

---

## 버전 규칙

- **Major (X.0.0)**: 대규모 변경, 호환성 깨지는 변경
- **Minor (0.X.0)**: 새로운 기능 추가, 하위 호환
- **Patch (0.0.X)**: 버그 수정, 작은 개선

---

## 예정된 기능 (Roadmap)

### v1.2.0 (계획)
- [ ] 공지 검색 기능
- [ ] 공지 필터링 (카테고리별)
- [ ] 공지 정렬 옵션
- [ ] 다국어 지원 (한국어/영어)

### v1.3.0 (계획)
- [ ] 이미지 첨부 지원
- [ ] 파일 다운로드 기능
- [ ] 공지 공유 기능
- [ ] PWA 지원

### v2.0.0 (미정)
- [ ] 사용자 인증
- [ ] 관리자 페이지
- [ ] 실시간 푸시 알림
- [ ] 댓글 시스템

---

## 링크

- **Live Site**: https://jakeon32.github.io/apec-notice/
- **Repository**: https://github.com/jakeon32/apec-notice
- **Google Sheet Template**: [링크 추가 예정]

---

## 기여자

- **Developer**: Claude Code Assistant
- **Project**: APEC 2025 KOREA Transportation Guide

---

**Last Updated**: 2025-01-20
