<template>
    <article class="about-item d-flex gap-15 mx-sm-5 mx-md-7 mx-lg-10 mx-xl-15">
        <img
            :src="require('@/assets/imgs/about/' + about.image)"
            :alt="about.title"
            class="about-img"
        />
        <div class="">
            <h4 class="title">
                {{ about.title }}
            </h4>

            <div class="border-bottom-1 d-flex justify-content-between mt-10">
                <a :href="about.source" class="about-link">Suara.com</a>
                <span class="about-date">{{ about.date }}</span>
            </div>

            <a href="Suara.com" class="btn mt-15">Read More</a>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        about: Object,
    },
};
</script>
