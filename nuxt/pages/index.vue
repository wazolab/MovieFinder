<template>
  <a-layout id="main">
    <TheHeader />
    <a-layout-content>
      <a-row type="flex" align="middle" justify="center" style="height: 100%;">
        <a-col :span="12">
          <SearchInput />
        </a-col>
      </a-row>
    </a-layout-content>
    <TheFooter />
  </a-layout>
</template>

<script>
export default {};
</script>

<style scoped>
#main {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("~assets/background.jpg");
}
</style>
