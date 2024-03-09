import CategoryService from "../services/CategoryService.js";
class CategoryController {
    async getAllCategory(req, res) {
        await CategoryService.getAllCategories(res);
    }

    async getAllCategoryByPage(req, res) {
        const page = req.params.page;
        await CategoryService.getAllCategoriesByPage(res, page);
    }

    async getCategoryById(req, res) {
        const id = req.params.id;
        await CategoryService.getCategoryById(res, id);
    }

    async createCategory(req, res) {
        const { name } = req.body;
        await CategoryService.createCategory(res, { name });
    }

    async updateCategory(req, res) {
        const { id, name } = req.body;
        await CategoryService.updateCategory(res, id, { id, name });
    }

    async deleteCategory(req, res) {
        const id = req.params.id;
        await CategoryService.deleteCategory(res, id);
    }
}

export default new CategoryController();
