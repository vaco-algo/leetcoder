# LEETCODER

> 알고리즘 스터디를 진행하면서, 템플릿을 복사해서 깃헙에 업로드하는 것이 비효율적으로 느껴져 만들게 된 **leetcoder** 입니다!
<br />

leetcode에서 코드를 가져와 github 레포지토리로 업로드하는 파일 업로드 서버입니다.

알고리즘 스터디를 진행하는 매 주 화, 목요일 11시에 업로드됩니다.

`axios`, `Github API`, `cron`을 사용하였습니다!
<br />
<br />

### 파일 업로드 예시
```javascript
/**
 * leetcode problem link: https://leetcode.com/problems/valid-parentheses/ 파일 상단에 leetcode 링크가 추가 됩니다.
 *
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) { // `var` 선언자는 `const`로 변경합니다.
   
};
```
<br />

### 서버 업로드 정보
```javascript
{
  "problem": "", // 가장 최근 업로드한 문제 제목이 표시됩니다.
  "url": "", // 해당 문제의 url이 표시됩니다.
  "latestWakedUp": "2023-01-18T10:40:00.089Z" // 서버를 유지시키기위해 매 10분마다 서버를 깨웁니다.
}
```
<br />

### 버전 기록

2.1.0: puppeteer 배포 환경 문제로, axios를 이용한 크롤링으로 변경.

2.0.0: 파일 업로드 서버로 변경. cron 추가.

1.1.0: 날짜 선택 프로세스 추가

1.0.0: url 입력 / 문제 크롤링 및 파일 생성 / github push 기능 추가
