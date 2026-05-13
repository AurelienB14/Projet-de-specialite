import api from './api';

export const login = (email: string, password: string) =>
    api.post('/login', { email, password });

export const register = (data: { email: string; pseudo: string; prenom: string; password: string; nom?: string }) =>
    api.post('/register', data);

export const logout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
};

export const isAuthenticated = (): boolean => !!localStorage.getItem('token');
