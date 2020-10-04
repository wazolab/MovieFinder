<template>
  <a-card :loading="loading" :bordered="false">
    <a-spin class="spinner" v-if="loading" slot="cover" />
    <img
      v-else
      slot="cover"
      :alt="movie.Title"
      :src="
        movie.Poster == 'N/A'
          ? 'https://placeimg.com/200/200/any?1'
          : movie.Poster
      "
    />

    <a-card-meta :title="movie.Title">
      <template slot="description">
        {{ movie.Director }} -
        <span style="font-size: 12px; font-style: oblique;">{{
          movie.Year
        }}</span>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.spinner {
  text-align: center;
  background: rgba(207, 216, 220, 0.4);
  border-radius: 4px 4px 0 0;
  margin-bottom: 20px;
  padding: 30px 50px;
}

.ant-card {
  height: 100%;
}

.ant-card-cover img {
  max-height: 256px;
  object-fit: scale-down;
}

.ant-card-cover {
  background-color: rgb(13, 10, 57);
}
</style>
