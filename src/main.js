import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import vuetify from './plugins/vuetify';

const app = createApp(App);

// Usa Pinia para la gestión del estado global
app.use(createPinia());

// Usa el router
app.use(router);

// Usa Vuetify
app.use(vuetify);

app.mount('#app');
