<template>
    <router-view></router-view>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    components: { FontAwesomeIcon },
    name: "app",

    data() {
        return {};
    },
};
</script>

<style>
@import url("./assets/css/library/bootstrap.min.css");
</style>
