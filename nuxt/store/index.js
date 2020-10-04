export const strict = false;

export const state = () => ({
  search: "",
  movies: [],
  nbResults: 0,
  loading: false,
  error: null
});

export const mutations = {
  setSearch: (state, search) => (state.search = search),
  setMovies: (state, movies) => (state.movies = movies),
  updateMovie: (state, { movie, index }) => (state.movies[index] = movie),
  setNbResults: (state, nbResults) => (state.nbResults = nbResults),
  setLoading: (state, loading) => (state.loading = loading),
  setError: (state, error) => (state.error = error)
};

export const actions = {
  async getMovies({ commit, state }) {
    commit("setLoading", true);

    return await this.$axios
      .$get("", {
        params: {
          apikey: "a4bf96a7",
          s: state.search,
          type: "movie"
        }
      })
      .then(response => {
        if (response.Response === "False") throw new Error(response.Error);

        commit("setNbResults", response.totalResults);
        commit("setMovies", response.Search);
        commit("setError", null);
      })
      .catch(e => {
        commit("setMovies", []);
        commit("setNbResults", 0);
        commit("setError", e.message);
      })
      .finally(() => {
        commit("setLoading", false);
      });
  },
  async getDirector({}, id) {
    return await this.$axios
      .$get("", {
        params: {
          apikey: "a4bf96a7",
          i: id,
          type: "movie"
        }
      })
      .then(response => {
        if (response.Response === "False") throw new Error(response.Error);

        return response.Director;
      })
      .catch(e => commit("setError", e.message));
  },
  setDirectors({ state, dispatch, commit }) {
    commit("setLoading", true);

    let tmp = [];
    state.movies.forEach(async movie => {
      return await dispatch("getDirector", movie.imdbID).then(director => {
        movie.Director = director;
        tmp.push(movie);
      });
    });

    commit("setMovies", tmp);
    commit("setLoading", false);
  }
};

export const getters = {};
