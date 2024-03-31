<template>
    <div class="col-12 col-sm-6 col-md-6 col-lg-4">
        <figure class="product-thumb">
            <img
                class="product-img"
                :src="require('@/assets/imgs/' + product.img)"
            />
            <a href="" class="product-card">
                <i class="fa-solid fa-bag-shopping"></i
            ></a>
        </figure>
        <div class="product-info">
            <div class="">
                <router-link
                    :to="`/${slug}/${product?.id}`"
                    class="product-name text-left line-clamp line-clamp-2"
                >
                    {{ product?.name }}
                </router-link>
                <span class="product-category d-block text-left line-clamp">{{
                    product?.category?.name
                }}</span>
            </div>
            <div class="product-price">{{ product?.price }}</div>
        </div>
        <p class="mt-10 product-review">
            <i class="fa-solid fa-star text-warning"></i>
            {{ product?.averageStar }}|{{ product?.count_review }} review
        </p>
    </div>
</template>

<script>
import { convertToSlug } from "@/utils/index.js";
import { ref, watchEffect } from "vue";
export default {
    props: {
        productProp: Object,
    },
    setup(props) {
        const product = ref(props.productProp);
        let slug;
        watchEffect(() => {
            product.value = props.productProp;
            slug = convertToSlug(product?.value.name);
        });
        return { slug, product };
    },
};
</script>

<style scoped>
.product-review {
    font-size: 1.2rem;
}
</style>
