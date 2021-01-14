## 애플 스트로크 디자인 클론 코딩

#### html

- html 작성
  - svg 파일은 img가 아닌 object로 사용
  - 스크롤 값에 따라 움직이는 태그들에 sticky-elem class 붙이기

#### css

- 틀 잡아놓기
  - sticky-elem은 position : fixed로
  - 가운데 정렬은 translate3d(50%, 50%, 0)

#### js

- 필요한 태그 불러오기 > object로 만들기

- 각 section에 높이 정해주기

- 스크롤 값에 따라 보이는 section을 정해주기

  - body에 class 추가

- 스크롤 값에 따라 변하는 값을 return하는 함수 만들기

- 값에 따라 스타일을 적용해주기
