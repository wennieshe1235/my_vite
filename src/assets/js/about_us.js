import {createApp} from "vue";
import Nav from "@/components/Nav.vue";
import SkyImage from "@/components/SkyImage.vue"; // 加這行

createApp(Nav).mount("#header");
createApp(SkyImage).mount("#app"); // 加這行