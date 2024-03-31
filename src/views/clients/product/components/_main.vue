<template>
    <main class="main">
        <div class="container-lg">
            <div class="row">
                <Breadcrumb></Breadcrumb>
                <LeftMain
                    :categories="categories"
                    :maxPrice="products.maxPrice"
                    @updateProductByCategory="updateProductByCategory"
                    @updateProductByPrice="updateProductByPrice"
                ></LeftMain>
                <RightMain
                    :productsProp="products"
                    :updateProduct="updateProductByPage"
                >
                </RightMain>
            </div>
        </div>
    </main>
</template>

<script>
import Breadcrumb from "./_breadcrumb.vue";
import LeftMain from "./LeftMain.vue";
import RightMain from "./RightMain.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { categoryApi, productApi } from "../../../../api/index.api";

export default {
    props: { searchProp: String },
    components: { Breadcrumb, LeftMain, RightMain },
    setup(props) {
        const categories = ref([]);
        const products = ref([]);
        const filterProduct = reactive({
            page: 0,
            category_id: [],
            search: "",
            price: 10000000,
        });

        const updateProductByPage = async (data) => {
            filterProduct.page = data;
            await fetchProduct();
        };

        const updateProductByCategory = async (data) => {
            filterProduct.category_id = data;
            filterProduct.page = 0;
            await fetchProduct();
        };

        const updateProductByPrice = async (price) => {
            console.log(price);
            filterProduct.price = price;
            await fetchProduct();
        };

        const fetchProduct = async () => {
            const result = await productApi.getFilter(filterProduct);
            if (result.success) {
                products.value = result.data;
            }
        };

        onMounted(async () => {
            let result = await categoryApi.getCategoriesByTypeWithItems();
            if (result.success) {
                categories.value = result.data;
            }
            await fetchProduct();
        });
        watch(
            () => props.searchProp,
            async () => {
                filterProduct.search = props.searchProp;
                filterProduct.page = 0;
                await fetchProduct();
            }
        );
        return {
            categories,
            products,
            updateProductByPage,
            updateProductByCategory,
            updateProductByPrice,
        };
    },
};
</script>
