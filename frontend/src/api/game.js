import api from './api'

export const getGames = () => api.get('/games');
export const getGame = (id) => api.get(`/game/${id}`);