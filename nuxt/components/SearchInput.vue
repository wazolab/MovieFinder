<template>
  <div>
    <label>Type any movie title you want:</label>
    <a-auto-complete
      v-model="search"
      :data-source="dataSource"
      size="large"
      style="width: 100%"
      placeholder="Ex: Star Wars"
      :allowClear="true"
      :autoFocus="true"
      not-found-content="0 Result"
      :loading="fetching"
      @select="onSelect"
      @search="handleSearch"
    >
      <a-input-search enter-button size="large" />
      <template slot="dataSource">
        <a-select-option
          v-for="(opt, index) in dataSource"
          :key="index"
          :label="opt.text"
          :value="opt.value"
        >
          <div class="item-content">
            <img class="item-thumbnail" :src="opt.poster" :alt="opt.text" />
            <div class="item-infos">
              {{ opt.text }}
              <span>{{ opt.year }}</span>
            </div>
          </div>
        </a-select-option>
      </template>
    </a-auto-complete>
    <a-alert
      v-if="!search || search.length < 3"
      message="Type at least 3 letters."
      banner
    />
  </div>
</template>

<script>
import { groupBy } from "lodash";

export default {
  data() {
    return {
      search: "",
      fetching: false,
      dataSource: []
    };
  },
  methods: {
    async getMovies(value) {
      if (value && value.length >= 3) {
        this.fetching = true;

        const result = await this.$axios.$get("", {
          params: {
            apikey: "a4bf96a7",
            s: value,
            type: "movie"
          }
        });

        if (result.Response === "True") {
          const data = result.Search.map(movie => ({
            text: movie.Title,
            value: movie.imdbID,
            poster: movie.Poster,
            year: movie.Year
          }));

          this.dataSource = data;
          this.fetching = false;
        } else if (result.Response === "False") {
          this.dataSource = [];
        }
      }
    },
    handleSearch(value) {
      this.getMovies(value);
    },
    handleChange(value) {
      this.search = value;
      this.getMovies(value);
    },
    onSelect(value) {
      console.log(value);

      //TODO: Fetch the selected Movies and redirect to result page
    }
  }
};
</script>

<style>
label {
  display: inline-block;
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 8px;
}

.ant-select-selection__clear {
  right: 64px;
}

.ant-select-dropdown-menu-item .item-content {
  display: flex;
  align-items: center;
}

.ant-select-dropdown-menu-item .item-content .item-thumbnail {
  width: 55px;
  margin-right: 12px;
}

.ant-select-dropdown-menu-item .item-content .item-infos span {
  display: block;
  font-size: 12px;
  font-style: oblique;
}
</style>
