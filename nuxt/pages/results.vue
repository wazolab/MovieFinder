<template>
  <a-layout id="main">
    <TheHeader />
    <a-layout-content>
      <a-row type="flex" align="middle" justify="center" style="height: 100%;">
        <a-col :span="12">
          <nuxt-link to="/">
            <a-button type="primary"> <a-icon type="left" />Go back </a-button>
          </nuxt-link>

          <h3 style="color: #FFFFFF;">
            Your search: "{{ search }}" ({{ nbResults }} match)
          </h3>
          <a-carousel arrows dot-position="top">
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px;zIndex: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div
              slot="nextArrow"
              class="custom-slick-arrow"
              style="right: 10px"
            >
              <a-icon type="right-circle" />
            </div>
            <a-card
              :bordered="false"
              :key="movie.imdbID"
              v-for="movie in movies"
            >
              <img
                slot="cover"
                :alt="movie.Title"
                :src="
                  movie.Poster === 'N/A'
                    ? 'https://place-hold.it/285x380'
                    : movie.Poster
                "
              />
              <a-card-meta :title="movie.Title">
                <template slot="description">
                  {{ movie.Director }}
                  -
                  <span style="font-size: 12px; font-style: oblique;">{{
                    movie.Year
                  }}</span>
                </template>
              </a-card-meta>
            </a-card>
          </a-carousel>
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
  },
  computed: {
    ...mapState({
      search: "search",
      movies: "movies",
      nbResults: "nbResults",
      error: "error"
    })
  }
};
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

.ant-carousel >>> .slick-slide {
  text-align: center;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide .ant-card {
  width: 285px !important;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
</style>
