<template>
    <article class="product-item mx-sm-5 mx-md-7 mx-lg-10 mx-xl-15">
        <figure class="product-thumb">
            <img
                :src="require('@/assets/imgs/' + product.image)"
                :alt="product.name"
                class="product-img"
            />
            <a href="" class="product-card">
                <i class="fa-solid fa-bag-shopping"></i>
            </a>
        </figure>
        <div class="product-info">
            <div>
                <router-link
                    :to="`/product/${convertToSlug(product.name)}/${
                        product.id
                    }`"
                    class="product-name line-clamp line-clamp-2"
                >
                    {{ product.name }}
                </router-link>
                <span
                    class="product-category d-block text-left line-clamp line-clamp-2"
                    >Category: {{ product.category }}</span
                >
            </div>
            <div class="product-price">
                {{ product.price }}
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        product: Object,
    },
    setup() {
        const convertToSlug = (text) => {
            return text
                .toLowerCase() // Chuyển đổi thành chữ thường

                .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
        };
        return {
            convertToSlug,
        };
    },
};
</script>

<style>
.product-name {
    height: 30px;
}
.product-category {
    text-align: left;
}
</style>
