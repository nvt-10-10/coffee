import CategoryService from "../services/CategoryService.js";
class CategoryController {
    async getAllCategory(req, res) {
        await CategoryService.getAllCategories(res);
    }

    async getAllCategoryByPage(req, res) {
        const page = req.params.page;
        await CategoryService.getAllCategoriesByPage(res, page);
    }
    async getCategoriesByTypeWithItems(req, res) {
        await CategoryService.getCategoriesByTypeWithItems(res);
    }

    async getCategoryById(req, res) {
        const id = req.params.id;
        await CategoryService.getCategoryById(res, id);
    }

    async createCategory(req, res) {
        const { name, type } = req.body;
        await CategoryService.createCategory(res, { name, type });
    }

    async updateCategory(req, res) {
        const { id, name, type } = req.body;
        await CategoryService.updateCategory(res, id, { id, name, type });
    }

    async deleteCategory(req, res) {
        const id = req.params.id;
        await CategoryService.deleteCategory(res, id);
    }
}

export default new CategoryController();
