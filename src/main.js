import './assets/styles/global/main.scss';
import './assets/styles/global/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/App.vue';
import router from './app/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
