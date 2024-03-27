<template>
    <section class="our-product">
        <div class="container-lg">
            <Carousel
                v-bind="settings"
                :breakpoints="breakpoints"
                :wrap-around="true"
                :mouseDrag="initSettings.mouseDrag"
                :autoplay="initSettings.autoplay ? 3000 : 0"
            >
                <Slide v-for="product in products" :key="product.id">
                    <Product :product="product"></Product>
                </Slide>

                <template #addons>
                    <Navigation v-show="initSettings.nav" />
                </template>
            </Carousel>

            <div class="text-center mt-15">
                <a href="product.html" class="btn bg-dark text-white"
                    >View All</a
                >
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import Product from "./_product.vue";
import "vue3-carousel/dist/carousel.css";
import { carousel } from "@/configs/index";
import { resizeImg } from "../utils/index.js";
export default {
    components: {
        Carousel,
        Slide,
        Navigation,
        Product,
    },
    setup() {
        const products = [
            {
                name: "Espresso Ice Coffee",
                image: "Cappucino-Ice-Coffee.png",
                category: "Ice Coffee",
                price: "$10.000",
            },

            {
                name: "Cappucino-Ice-Coffee",
                image: "Espresso-Ice-Coffee.png",
                category: "Ice Coffee",
                price: "$10.000",
            },

            {
                name: "Cappucino-Ice-Coffee",
                image: "Robusta-Coffee.png",
                category: "Ice Coffee",
                price: "$10.000",
            },

            {
                name: "Cappucino-Ice-Coffee",
                image: "Cappucino-Ice-Coffee.png",
                category: "Ice Coffee",
                price: "$10.000",
            },

            {
                name: "Cappucino-Ice-Coffee",
                image: "Cappucino-Ice-Coffee.png",
                category: "Ice Coffee",
                price: "$10.000",
            },

            {
                name: "Cappucino-Ice-Coffee",
                image: "Cappucino-Ice-Coffee.png",
                category: "Ice Coffee",
                price: "$10.000",
            },
        ];

        let configCarousel = carousel.init(
            1200,
            products.length,
            "our-product"
        );
        const breakpoints = ref(Object);
        const initSettings = ref(Object);
        onMounted(() => {
            let width = window.innerWidth;
            configCarousel = carousel.init(
                width,
                products.length,
                "our-product"
            );

            Promise.all([updateCarousel(), resizeImg("product-img")]);
            window.addEventListener("resize", () => {
                Promise.all([updateCarousel(), resizeImg("product-img")]);
            });
        });
        const updateCarousel = () => {
            let width = window.innerWidth;
            configCarousel = carousel.init(
                width,
                products.length,
                "our-product"
            );
            breakpoints.value = configCarousel.breakpoints;
            initSettings.value = configCarousel.initSettings;
        };
        return {
            products,

            breakpoints,
            initSettings,
        };
    },
};
</script>

<style scoped>
.carousel > button {
    background-color: #fff;
    border-radius: 50%;
}

.btn:hover {
    background-color: #fff;
    opacity: 0.85;
}
</style>
