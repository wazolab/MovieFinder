export const strict = false;

export const state = () => ({
  search: "",
  movies: [],
  nbResults: 0,
  loading: false,
  error: ""
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
  async getMovies({ commit, state, dispatch }) {
    commit("setLoading", true);
    const response = await this.$axios.$get("", {
      params: {
        apikey: "a4bf96a7",
        s: state.search,
        type: "movie"
      }
    });

    if (response.Response === "True") {
      commit("setNbResults", response.totalResults);
      dispatch("setDirectors", response.Search).then(function(res) {
        console.log(res);
        commit("setMovies", res);
      });
    } else if (response.Response === "False") {
      commit("setMovies", []);
      commit("setNbResults", 0);
      commit("setError", response.Error);
    }

    commit("setLoading", false);
  },
  async getDirector({}, id) {
    const response = await this.$axios.$get("", {
      params: {
        apikey: "a4bf96a7",
        i: id,
        type: "movie"
      }
    });

    if (response.Response === "True") return response.Director;
    else if (response.Response === "False") throw new Error(response.Error);
  },
  setDirectors({ dispatch }, data) {
    let tmp = [];
    data.forEach(async (movie, index) => {
      const director = await dispatch("getDirector", movie.imdbID);
      movie.Director = director;
      tmp.push(movie);
    });
    return tmp;
  }
};

export const getters = {};
