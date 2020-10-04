<template>
  <a-layout-header>
    <nuxt-link to="/">
      <h1>
        <Logo />
        <span>MovieFinder</span>
      </h1>
    </nuxt-link>

    <h2>Get infos on latest movies</h2>
  </a-layout-header>
</template>

<script>
export default {};
</script>

<style scoped>
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
}

h1,
h2 {
  color: #ffffff;
  margin-bottom: 0;
}

h1 {
  display: flex;
  align-items: center;
}

h2 {
  font-size: 14px;
}

.NuxtLogo {
  width: 48px;
  height: 48px;
  margin: 0 12px 0 0;
}

@media screen and (max-width: 414px) {
  .NuxtLogo {
    width: 28px;
    height: 28px;
  }

  h1 {
    font-size: 18px;
  }

  h2 {
    display: none;
  }
}
</style>
