const routers = [
    {
        path: "",
        name: "index",
        component: () => import("../views/clients/index/_index.vue"),
        meta: { requiresAuth: true },
    },

    // {
    //     path: "/:name/:id",
    //     name: "ProductDetail",
    //     component: () => import("../views/clients/productDetail/_index.vue"),
    //     props: true,
    // },

    {
        path: "/product",
        name: "ProductDetail",
        component: () => import("../views/clients/product/_index.vue"),
        props: true,
    },
];
export default routers;
