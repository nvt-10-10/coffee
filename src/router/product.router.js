const routers = [
    {
        path: "/product",
        name: "product",
        component: () => import("../views/createPost/_index.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/product-details/:id",
        name: "product-detail",
        component: () => import("../views/postDetails/_index.vue"),
    },
    {
        path: "/",
        name: "post-list",
        component: () => import("../views/listPost/_index.vue"),
    },
];
export default routers;
