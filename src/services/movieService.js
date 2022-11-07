import api from './apiService'

const endpoints = {
    movies: '/movies',
}

export const getAllMovies = async (queryParameters) => {
    let params = [];

    for (const param in queryParameters) {
        if (queryParameters[param]) {
          params.push(`${param}=${queryParameters[param]}`);
        }
      }

    const {data} = await api.get(endpoints.movies + "?" + params.join("&"));
    return data.data
}

export const getSingleMovie = async (id) => {
    const {data} = await api.get(`${endpoints.movies}/${id}`)
    return data.data
}
export const movieCreate = async (movieData) => {
    const {data} = await api.post(endpoints.movies, movieData);
    return data.data
}
export const movieEdit = async (movieData, id) => {
    const {data} = await api.put(`${endpoints.movies}/${id}`, movieData);
    return data.data
}
export const movieDelete  = async (id) => {
    const {data} = await api.delete(`${endpoints.movies}/${id}`);
    return data.data
}
export const commentCreate = async (comment, movieId) => {
    const {data} = await api.post(`${endpoints.movies}/${movieId}/comments`, comment);
    return data
}
export const commentDelete = async (movieId, commentId) => {
    const {data} = await api.delete(`${endpoints.movies}/${movieId}/comments/${commentId}`);
    return data
}

export const likeCreate = async (like, movieId) => {
    const {data} = await api.put(`${endpoints.movies}/${movieId}/likes`, {like: like});
    return data.data
}
export const likeDelete = async (movieId, likeId) => {
    const {data} = await api.delete(`${endpoints.movies}/${movieId}/likes/${likeId}`);
    return data
}
export const genres = async () => {
    const {data} = await api.get('/get-configuration');
    return data
}
