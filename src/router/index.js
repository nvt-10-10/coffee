import clientRouter from "./client.router";

import { createRouter, createWebHistory } from "vue-router";

const routes = [...clientRouter];

routes.push({
    path: "/login",
    name: "_login",
    component: () => import("../views/_login"),
});
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
