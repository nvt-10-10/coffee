<template>
    <section class="review">
        <div class="container-lg">
            <div class="row">
                <div class="col-12 text-center">
                    <h2 class="head-text text-heading">
                        See what <strong>others are saying</strong>.
                    </h2>
                </div>
                <div class="col-12">
                    <Carousel
                        v-bind="settings"
                        :breakpoints="breakpoints"
                        :wrap-around="true"
                        :mouseDrag="initSettings.mouseDrag"
                        :autoplay="initSettings.autoplay ? 3000 : 0"
                    >
                        <Slide v-for="review in reviews" :key="review.id">
                            <Review :review="review"></Review>
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
import "vue3-carousel/dist/carousel.css";
import { carousel } from "@/configs/index";
import Review from "./_review.vue";
import { resizeHeightText } from "@/utils/index.js";

export default {
    components: {
        Carousel,
        Slide,
        Navigation,
        Review,
    },
    setup() {
        const reviews = [
            {
                text: "Feel happy shopping from Damiun products, the place is clean, the service is good, what is most appropriate for me is because the prices are friendly for the lower class Feel happy shopping from Damiun products, the place is clean, the service is good, what is most appropriate for me is because the prices are friendly for the lower class Feel happy shopping from Damiun products, the place is clean, the service is good, what is most appropriate for me is because the prices are friendly for the lower class",
                author: "Katty Rahmawati",
                job: "Freelance",
                avatar: "avatar-1.jpg",
            },
            {
                text: "We highly recommend ordering Damiun Coffee Shop for your event, we have tried it and we are satisfied.",
                author: "Anandya Mustika",
                job: "Sr. Manager at Digital Agency",
                avatar: "avatar-2.jpg",
            },
            {
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, voluptas ipsum! At, magni distinctio non reprehenderit modi obcaecati! Enim officiis voluptatibus quia eius! Architecto similique itaque quos recusandae fugiat non. Nihil at, atque illo aspernatur iure eos? Similique ipsa hic, vel excepturi rerum adipisci animi molestias, nam sit provident ab sunt quo, sapiente laborum cum dolor voluptate. Non, alias? Rem?",
                author: "Katty Rahmawati",
                job: "Freelance",
                avatar: "avatar-3.jpg",
            },
            {
                text: "Feel happy shopping from Damiun products, the place is clean, the service is good, what is most appropriate for me is because the prices are friendly for the lower class",
                author: "Katty Rahmawati",
                job: "Freelance",
                avatar: "avatar-4.jpg",
            },
            {
                text: "Feel happy shopping from Damiun products, the place is clean, the service is good, what is most appropriate for me is because the prices are friendly for the lower class",
                author: "Katty Rahmawati",
                job: "Freelance",
                avatar: "avatar-1.jpg",
            },
            {
                text: "Feel happy shopping from Damiun products, the place is clean, the service is good, what is most appropriate for me is because the prices are friendly for the lower class",
                author: "Katty Rahmawati",
                job: "Freelance",
                avatar: "avatar-1.jpg",
            },
        ];

        let configCarousel = carousel.init(1200, reviews.length, "review");
        const breakpoints = ref(Object);
        const initSettings = ref(Object);
        onMounted(() => {
            let width = window.innerWidth;
            configCarousel = carousel.init(width, reviews.length, "review");

            Promise.all([
                updateCarousel(),
                resizeHeightText("review-item", "blockquote"),
            ]);
            window.addEventListener("resize", () => {
                Promise.all([
                    updateCarousel(),
                    resizeHeightText("review-item", "blockquote"),
                ]);
            });
        });
        const updateCarousel = () => {
            let width = window.innerWidth;
            configCarousel = carousel.init(width, reviews.length, "review");
            breakpoints.value = configCarousel.breakpoints;
            initSettings.value = configCarousel.initSettings;
        };

        return {
            reviews,
            breakpoints,
            initSettings,
        };
    },
};
</script>

<style></style>
