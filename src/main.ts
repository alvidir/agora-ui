import { createApp } from "vue";
import App from "./App.vue";
import includeCards from "vue-cards/src/main";
import router from "./router";

const app = createApp(App).use(router);
includeCards(app);

app.mount("#app");
