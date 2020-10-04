<template>
  <a-layout id="main">
    <TheHeader />
    <a-layout-content>
      <a-row type="flex" align="middle" justify="center" style="height: 100%;">
        <a-col :xs="20" :md="18">
          <a-page-header
            :ghost="false"
            :title="`Your search : &quot;${search}&quot;`"
            :sub-title="`${nbResults} match`"
            @back="() => $router.push('/')"
          >
            <Carousel v-if="!error" :dataSource="movies" />
            <a-alert v-else :message="error" type="error" show-icon />
          </a-page-header>
        </a-col>
      </a-row>
    </a-layout-content>
    <TheFooter />
  </a-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: "redirect",
  async asyncData({ store }) {
    await store.dispatch("getMovies");

    await store.dispatch("setDirectors");
  },
  computed: {
    ...mapState({
      search: "search",
      movies: "movies",
      nbResults: "nbResults",
      error: "error",
      loading: "loading"
    })
  }
};
</script>

<style>
#main {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("~assets/background.jpg");
}

.VueCarousel-navigation-prev {
  left: -8px;
}

.VueCarousel-navigation-next {
  right: -8px;
}

.ant-page-header {
  background-color: #f5f5f5;
  padding: 24px 44px;
}

.ant-page-header-content {
  overflow: unset;
}

.VueCarousel-slide {
  max-width: 100%;
}

@media screen and (min-width: 768px) {
  .VueCarousel-slide {
    max-width: 50%;
  }
}

@media screen and (min-width: 992px) {
  .VueCarousel-slide {
    max-width: 33.333333%;
  }
}

@media screen and (min-width: 1200px) {
  .VueCarousel-slide {
    max-width: 25%;
  }
}

@media screen and (max-width: 414px) {
  .ant-page-header-heading-sub-title {
    width: 100%;
    text-align: center;
  }
}
</style>
