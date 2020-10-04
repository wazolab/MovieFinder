<template>
  <div>
    <label>Type any movie title you want:</label>
    <a-input-search
      placeholder="Ex: Star Wars"
      enter-button
      v-model="search"
      size="large"
      @search="handleSearch"
    />
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
      search: ""
    };
  },
  methods: {
    handleSearch(value) {
      this.$store.commit("setSearch", value);
      this.$router.push("/results");
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
