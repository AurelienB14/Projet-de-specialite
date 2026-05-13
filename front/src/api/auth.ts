import api from './api';

export const login = (email: string, password: string) =>
    api.post('/login', { email, password });

export const getCurrentUserId = (): number | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id; // ← on va ajouter ça dans Symfony
};