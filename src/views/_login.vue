<template>
    <div class="login-container">
        <h1>Đăng nhập</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Tên đăng nhập:</label>
                <input
                    type="text"
                    id="username"
                    v-model="formData.username"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input
                    type="password"
                    id="password"
                    v-model="formData.password"
                    required
                />
            </div>
            <div class="button-container">
                <button type="submit">Đăng nhập</button>
            </div>
        </form>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { authApi } from "../api/index.api";
import { reactive, ref } from "vue"; // Thêm ref từ Vue

export default {
    setup() {
        const formData = reactive({
            username: "",
            password: "",
        });

        const errorMessage = ref(null);

        const handleSubmit = async () => {
            try {
                const response = await authApi.login(formData);
                console.log(response);
                if (!response.success) {
                    errorMessage.value = response.message;
                    console.log(response);
                } else errorMessage.value = "DDanwh nhap thanh cong";
            } catch (error) {
                errorMessage.value = error.errorMessage; // Generic error message
            } finally {
                formData.username = "";
                formData.password = "";
            }
        };

        return {
            formData,
            errorMessage,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
/* Add your styling for the login form and error message */
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.form-group {
    margin-bottom: 10px;
}

.error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>
