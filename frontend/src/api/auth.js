// src/api/auth.js
import api from './api';

export const login = (email, password) =>
    api.post('/login', { email, password });

export const register = (data) => {
    return api.post('/register', data);
};
export const logout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
};

export const isAuthenticated = () => !!localStorage.getItem('token');

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
};

export const getCurrentUserId = () => {
    const user = getCurrentUser();
    return user ? user.id : null;
};