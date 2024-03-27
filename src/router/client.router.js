const routers = [
    {
        path: "",
        name: "index",
        component: () => import("../views/clients/index/_index.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/product/:name/:id",
        name: "ProductDetail",
        component: () => import("../views/clients/productDetail/_index.vue"),
        props: true,
    },
];
export default routers;
