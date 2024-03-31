<template>
    <Header @searchProduct="searchProduct"></Header>
    <Main :searchProp="search"></Main>
    <Footer></Footer>
    <router-view></router-view>
</template>

<script>
import Header from "../../../components/_header.vue";
import Footer from "../../../components/_footer.vue";
import Main from "./components/_main.vue";
import { onMounted, ref } from "vue";
export default {
    components: { Header, Main, Footer },
    setup() {
        const search = ref("");
        const searchProduct = (data) => {
            search.value = data;
        };
        onMounted(() => {
            document.title = "Product";
        });
        return { search, searchProduct };
    },
};
</script>
<style scope>
@import url("../../../assets/css/product.css");
</style>
