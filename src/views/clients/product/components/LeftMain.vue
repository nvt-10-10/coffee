<template>
    <div class="d-none d-md-block col-md-3">
        <div class="main-left">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="main-left-title">filter</h4>
                <button class="btn ml-auto">Reset</button>
            </div>
            <hr />
            <div class="">
                <label for="customRange3" class="form-label main-left-title"
                    >Price</label
                >
                <div class="slidecontainer">
                    <div class="position-relative">
                        <input
                            type="range"
                            v-model="rangeValue"
                            min="0"
                            :max="maxPrice"
                            :value="rangeValue"
                            step="1"
                            class="custom-range"
                            @change="changeRange"
                        />
                    </div>
                    <p class="mt-15">
                        Max: <span id="demo">{{ rangeValue }}</span>
                    </p>
                </div>
            </div>
            <hr />

            <div class="category">
                <div
                    class="category-column"
                    v-for="(category, index) in categories"
                    :key="category.id"
                >
                    <h4 class="category-type">{{ category.type }}</h4>
                    <ul class="category-list mt-20">
                        <li
                            class="category-item"
                            v-for="item in category.items"
                            :key="item.id"
                        >
                            <div class="checkbox-rect2">
                                <input
                                    type="checkbox"
                                    :id="item.id"
                                    name="check"
                                    :value="item.id"
                                    v-model="categoriesChecked"
                                    @change="checked"
                                />
                                <label :for="item.id" class="category-name">{{
                                    item.name
                                }}</label>
                            </div>
                        </li>
                    </ul>
                    <hr v-if="index < categories.length - 1" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
    props: {
        categories: Array,
        maxPrice: Number,
    },
    setup(props, context) {
        const rangeValue = ref(props.maxPrice);
        const categoriesChecked = ref([]);
        const checked = async () => {
            context.emit("updateProductByCategory", categoriesChecked.value);
        };
        const changeRange = async () => {
            context.emit("updateProductByPrice", rangeValue.value);
        };

        watchEffect(() => {
            rangeValue.value = props.maxPrice;
        });
        return {
            rangeValue,
            categoriesChecked,
            checked,
            changeRange,
        };
    },
};
</script>
