<template>
    <div class="col-12 col-md-9">
        <div class="row" style="--bs-gutter-x: 15px; --bs-gutter-y: 15px">
            <Product
                v-for="product in products.data"
                :productProp="product"
                :key="product.id"
            ></Product>
        </div>

        <Pagination
            v-if="products.meta?.total_pages > 1"
            class="mt-30"
            :metaProp="products.meta"
            @updatePage="updateProduct"
        ></Pagination>
    </div>
</template>

<script>
import Product from "./_product.vue";
import Pagination from "../../../../components/_pagination.vue";
import { ref, watchEffect } from "vue";
export default {
    components: { Product, Pagination },
    props: { productsProp: Object, updateProduct: Function },
    setup(props) {
        const products = ref(props.productsProp);
        watchEffect(() => {
            products.value = props.productsProp;
        });

        return { products };
    },
};
</script>
