import clientRouter from "./client.router";

import { createRouter, createWebHistory } from "vue-router";

const routes = [...clientRouter];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach(async (to, from, next) => {
//     const isAuthenticated = await checkAuth();
//     const requiredAuth = to.matched.some((record) => record.meta.requiresAuth);
//     if (requiredAuth && !isAuthenticated) {
//         next("/login");
//     } else {
//         next();
//     }
// });

export default router;
