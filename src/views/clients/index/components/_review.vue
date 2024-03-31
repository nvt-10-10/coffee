<template>
    <article class="review-item mx-sm-5 mx-md-7 mx-lg-10 mx-xl-15 w-100">
        <blockquote class="blockquote">{{ review.text }}</blockquote>
        <div class="d-flex align-items-center gap-10 mt-20">
            <img
                :src="require(`@/assets/imgs/avatars/${review.avatar}`)"
                :alt="review.author"
                class="user-avatar"
            />
            <div class="">
                <h3 class="user-name">
                    {{ review.author }}
                </h3>
                <span class="user-job"> {{ review.job }}</span>
            </div>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        review: Object,
    },
};
</script>
