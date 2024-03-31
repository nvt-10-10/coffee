<template>
    <header class="header">
        <div class="container-lg">
            <div
                class="header-wrap d-flex align-items-center justify-content-between justify-content-sm-start"
            >
                <router-link to="./"
                    ><img
                        src="../assets/imgs/logo (1).png"
                        alt=""
                        class="header-logo"
                /></router-link>
                <input
                    type="text"
                    v-model="search"
                    class="header-search d-none d-sm-block"
                    placeholder="Search Product.."
                    @keyup.enter="searchProduct"
                />

                <nav class="navbar d-flex align-items-center gap-10">
                    <div class="cart">
                        <i class="fa-solid fa-bag-shopping text-white"></i>
                    </div>

                    <img
                        src="../assets/imgs/avatars/avatar-5.jpg"
                        alt=""
                        class="avatar"
                    />
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import { ref } from "vue";
export default {
    props: {},
    setup(props, context) {
        const search = ref("");
        const searchProduct = (event) => {
            if (event.key === "Enter") {
                console.log(search.value);
                context.emit("searchProduct", search.value);
            }
        };
        return {
            search,
            searchProduct,
        };
    },
};
</script>
