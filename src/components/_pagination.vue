<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center gap-5">
            <li :class="`page-item ${meta.page - 1 < 0 ? 'disabled' : ''}`">
                <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    @click.prevent="pageClick(meta.page - 1)"
                    >Previous</a
                >
            </li>
            <li
                v-for="index in meta?.total_pages"
                @click="pageClick(index - 1)"
                :key="index.id"
                :class="`page-item ${index === meta.page + 1 ? 'active' : ''}`"
            >
                <a class="page-link" href="#">{{ index }}</a>
            </li>
            <li
                :class="`page-item ${
                    meta.page + 1 == meta?.total_pages ? 'disabled' : ''
                }`"
            >
                <a
                    class="page-link"
                    @click.prevent="pageClick(meta.page + 1)"
                    href="#"
                    >Next</a
                >
            </li>
        </ul>
    </nav>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
    props: { metaProp: Object },
    setup(props, context) {
        const meta = ref(props.metaProp);
        const pageClick = (page) => {
            console.log(page);
            if (
                page != meta.value.page &&
                page >= 0 &&
                page < meta.value.total_pages
            )
                context.emit("updatePage", page);
        };
        watchEffect(() => {
            meta.value = props.metaProp;
        });
        return {
            pageClick,
            meta,
        };
    },
};
</script>

<style scoped>
.page-link {
    font-size: 1.6rem;
    color: #000;
}

.active > .page-link {
    background: #000 !important;
    color: aliceblue !important;
    border: none;
}
</style>
