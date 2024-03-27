<template>
    <main>
        <About></About>
        <OurProduct></OurProduct>
        <OrderForEvents></OrderForEvents>
        <Review></Review>
        <BlogPosts></BlogPosts>
    </main>
</template>
<script>
import About from "./about-section.vue";
import OurProduct from "./our-product-section.vue";
import OrderForEvents from "./orderForEvents-section.vue";
import Review from "./review-section.vue";
import BlogPosts from "./blogPosts-section.vue";
export default {
    components: { About, OurProduct, OrderForEvents, Review, BlogPosts },
};
</script>
