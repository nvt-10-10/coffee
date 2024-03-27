<template>
    <section class="our-latest-new">
        <div class="container-lg">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-heading mb-30">Our Latest News</h2>
                </div>
                <div class="col-12">
                    <Carousel
                        v-bind="settings"
                        :breakpoints="breakpoints"
                        :wrap-around="true"
                        :mouseDrag="initSettings.mouseDrag"
                        :autoplay="initSettings.autoplay ? 3000 : 0"
                    >
                        <Slide v-for="about in abouts" :key="about.id">
                            <About :about="about"></About>
                        </Slide>

                        <template #addons>
                            <Navigation v-show="initSettings.nav" />
                        </template>
                    </Carousel>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import About from "./_about.vue";
import "vue3-carousel/dist/carousel.css";
import { carousel } from "@/configs/index";
import { resizeImg } from "../utils/index.js";
export default {
    components: {
        Carousel,
        Slide,
        Navigation,
        About,
    },
    setup() {
        const abouts = [
            {
                image: "img-1.png",
                title: "Indonesian Coffee Exports Reach IDR 16.44 Trillion",
                source: "Suara.com",
                date: "18 Jul",
            },
            {
                image: "img-2.png",
                title: "Indonesian Coffee Exports Reach IDR 16.44 Trillion",
                source: "Suara.com",
                date: "18 Jul",
            },
            {
                image: "img-3.jpg",
                title: "Indonesian Coffee Exports Reach IDR 16.44 Trillion",
                source: "Suara.com",
                date: "18 Jul",
            },
        ];

        let configCarousel = carousel.init(
            1200,
            abouts.length,
            "our-latest-new"
        );
        const breakpoints = ref(Object);
        const initSettings = ref(Object);
        onMounted(() => {
            let width = window.innerWidth;
            configCarousel = carousel.init(
                width,
                abouts.length,
                "our-latest-new"
            );

            Promise.all([updateCarousel(), resizeImg("about-img")]);
            window.addEventListener("resize", () => {
                Promise.all([updateCarousel(), resizeImg("about-img")]);
            });
        });
        const updateCarousel = () => {
            let width = window.innerWidth;
            configCarousel = carousel.init(
                width,
                abouts.length,
                "our-latest-new"
            );
            breakpoints.value = configCarousel.breakpoints;
            initSettings.value = configCarousel.initSettings;
        };
        return {
            abouts,
            breakpoints,
            initSettings,
        };
    },
};
</script>
