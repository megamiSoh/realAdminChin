<template>
  <div class="errPage-container">
    <err-code></err-code>

    <h3>오른쪽 상단의 버그 차트를 클릭하십시오.</h3>
    <code>
      이제 배경의 관리는 기본적으로 스파의 형태이며, 사용자 경험을 향상 시키지만, 페이지 문제의 가능성을 증가 시키며, 전체 페이지 교착 상태를 초래하는 작은 과실 일 수 있습니다. 다행히도, Vue 웹 사이트는 취급 예외를 잡는 방법을 제공합니다
    </code>
    <a href="#"><img src='http://panjiachen.github.io/images/errHandler.png'></a>
  </div>
</template>

<script>
import errCode from './errcode'

export default {
  components: { errCode }
}
</script>

<style scoped>
  .errPage-container {
    padding: 30px;
  }
</style>
