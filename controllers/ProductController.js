import ProductService from "../services/ProductService.js";
class ProductController {
    async getAllProduct(req, res) {
        await ProductService.getAllProduct(res);
    }

    async getAllProductCategory(req, res) {
        const { id, product_id } = req.params;
        await ProductService.getAllProductByCategory(res, id, product_id);
    }

    async getFilter(req, res) {
        const { search, category_id, page, price } = req.query;

        await ProductService.getFilter(res, search, category_id, page, price);
    }

    async getProductById(req, res) {
        const { id } = req.params;
        await ProductService.getProductById(res, id);
    }

    async getProductDetailById(req, res) {
        const id = req.params.id;
        await ProductService.getProductDetailById(res, id);
    }

    async createProduct(req, res) {
        const {
            name,
            price,
            quantity,
            descriptions,
            size,
            isFeatured,
            category_id,
        } = req.body;
        console.log(req.body);
        let file;
        if (req.uploadedFile) {
            file = req.uploadedFile;
            console.log(file);
        }
        await ProductService.createProduct(
            res,
            {
                name,
                price,
                quantity,
                descriptions,
                size,
                isFeatured,
                category_id,
            },
            file
        );
    }

    async updateProduct(req, res) {
        const {
            id,
            name,
            price,
            quantity,
            descriptions,
            size,
            isFeatured,
            category_id,
        } = req.body;
        let file;
        if (req.uploadedFile) {
            file = req.uploadedFile;
        }

        console.log("file", file);
        await ProductService.updateProduct(
            res,
            id,
            {
                id,
                name,
                price,
                quantity,
                descriptions,
                size,
                isFeatured,
                category_id,
            },
            file
        );
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        await ProductService.deleteProduct(res, id);
    }
}

export default new ProductController();
