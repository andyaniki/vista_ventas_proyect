// src/stores/auth.js
import { defineStore } from 'pinia';
import { login as apiLogin } from '@/services/AuthService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      const data = await apiLogin(credentials);
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem('token', data.token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
