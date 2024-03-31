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
import { onMounted } from "vue";
export default {
    components: { Header, Main, Footer },
    setup() {
        onMounted(() => {
            document.title = "Home";
        });
    },
};
</script>

<style scope>
@import url("../../../assets/css/home.css");
</style>
