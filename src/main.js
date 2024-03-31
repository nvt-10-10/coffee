import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

const app = createApp(App);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.mount("#app");
