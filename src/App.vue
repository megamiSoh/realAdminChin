<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: 'APP'
  }
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';
@import './styles/index.scss'; // 전역 맞춤 CSS 스타일
</style>
