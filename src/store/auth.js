// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null, // Almacena el token en el almacenamiento local
    user: null, // Si tienes información del usuario, también puedes guardarla aquí
  }),
  actions: {
    login(token) {
      this.token = token;
      localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    },
  },
});
