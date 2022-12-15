# LEETCODER

leetcoder는 leetcode 문제 url을 입력해 vaco-algo-study repository로 push해주는 uploader입니다.

puppeteer를 이용해 문제 페이지를 크롤링하여 코드를 가져오고, 문제 파일을 생성해 줍니다.

problems repository로 push까지 진행할 수 있습니다.

## 사용 방법

```
$ npm run add

$ (url을 입력해주세요: ) leetcode url 입력

$ (Github으로 push 하시겠습니까?) push 여부 선택
```


## 버전

0.1.0: url 입력 / 문제 크롤링 및 파일 생성 / github push 기능 추가
