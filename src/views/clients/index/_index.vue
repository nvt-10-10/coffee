<template>
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
    <router-view></router-view>
</template>
<script>
import Header from "./components/_header.vue";
import Main from "./components/_main.vue";
import Footer from "../../../components/_footer.vue";
export default {
    components: { Header, Main, Footer },
    setup() {},
};
</script>

<style>
@import url("../../../assets/css/home.css");
</style>
