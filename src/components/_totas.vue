<template>
    <div
        aria-live="polite"
        aria-atomic="true"
        style="position: relative; min-height: 200px"
    >
        <div style="position: absolute; top: 0; right: 0">
            <div
                class="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-delay="5000"
            >
                <div class="toast-header">
                    <strong class="mr-auto">Toast Title</strong>
                    <button
                        type="button"
                        class="ml-2 mb-1 close"
                        data-dismiss="toast"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">{{ message }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: { message },
    setup() {},
};
</script>
