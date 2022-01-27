import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/currency-converter",
    name: "CurrencyConverter",
    component: CurrencyConverter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;