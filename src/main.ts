import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTable,
  faEye,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons"; // Íconos que usaremos

library.add(faTable, faEye, faExchangeAlt); // Añadir los íconos a la librería

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon) // Registrar el componente globalmente
  .mount("#app");
