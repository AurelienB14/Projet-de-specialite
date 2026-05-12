import api from './api'

export const getUsers = () => api.get('/users');
export const getUser = (id: number) => api.get(`/users/${id}`);
export const createUser = (data: object) => api.post('/users', data);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);
export const updateUser = (id: number, data: object) => api.put(`/users/${id}`, data);
