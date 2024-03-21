import ProductService from "../services/ProductService.js";
class ProductController {
    async getAllProduct(req, res) {
        await ProductService.getAllProduct(res);
    }

    async getAllProductByPage(req, res) {
        const page = req.params.page;
        await ProductService.getAllProductByPage(res, page);
    }

    async getAllProductByFilter(req, res) {
        const { page, size, sort } = req.query;
        await ProductService.filterProduct(res, { page, size, sort });
    }

    async getAllProductByCategory(req, res) {
        const page = req.params.page;
        const category_id = req.params.category_id;
        await ProductService.getAllProductByCategory(res, category_id, page);
    }

    async getProductById(req, res) {
        const { id } = req.params;
        console.log(req.query);
        await ProductService.getProductById(res, id);
    }

    async getProductDetailById(req, res) {
        const id = req.params.id;
        await ProductService.getProductDetailById(res, id);
    }

    async createProduct(req, res) {
        const { name, price, quantity } = req.body;
        console.log(req.body);
        let file;
        if (req.uploadedFile) {
            file = req.uploadedFile;
            console.log(file);
        }
        await ProductService.createProduct(
            res,
            { name, price, quantity },
            file
        );
    }

    async updateProduct(req, res) {
        const { id, name, price, quantity } = req.body;
        console.log();
        let file;
        if (req.uploadedFile) {
            file = req.uploadedFile;
        }

        await ProductService.updateProduct(
            res,
            id,
            {
                id,
                name,
                price,
                quantity,
            },
            file
        );
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        await ProductService.deleteProduct(res, id);
    }

    async test(req, res) {
        const { page, price, category_id } = req.query;
        await ProductService.getAllAndFilter(res, { page, price, category_id });
    }
}

export default new ProductController();
