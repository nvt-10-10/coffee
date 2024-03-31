<template>
    <article class="product-item mx-sm-5 mx-md-7 mx-lg-10 mx-xl-15">
        <figure class="product-thumb">
            <img
                :src="require('@/assets/imgs/' + product?.image)"
                :alt="product?.name"
                class="product-img"
            />
            <a href="" class="product-card">
                <img :src="require('@/assets/icons/shopping.svg')" alt="" />
            </a>
        </figure>
        <div class="product-info">
            <div>
                <router-link
                    :to="`/${slug}/${product?.id}`"
                    class="product-name line-clamp line-clamp-2"
                >
                    {{ product?.name }}
                </router-link>
                <span
                    class="product-category d-block text-left line-clamp line-clamp-2"
                    >Category: {{ product?.category }}</span
                >
            </div>
            <div class="product-price">
                {{ product?.price }}
            </div>
        </div>
    </article>
</template>

<script>
import { convertToSlug } from "@/utils/index";
export default {
    props: {
        product: Object,
    },
    setup(props) {
        const slug = convertToSlug(props.product?.name);
        return { slug };
    },
};
</script>

<style scope>
.product-category {
    text-align: left;
}

.product-card > img {
    height: 16px;
    width: 16px;
    object-fit: contain;
}
</style>
