import CartService1 from "../services/CartService.js";
class CartController {
    async getAll(req, res) {
        await CartService1.getAll(req, res);
    }

    async createCart(req, res) {
        await CartService1.createCart(req, res);
    }

    async updateCart(req, res) {
        const { id,product_id,quantity } = req.body;
        await CartService1.updateCart(res, id, { id,product_id,quantity } );
    }

    async deleteCart(req, res) {
        const id = req.params.id;
        await CartService1.deleteCart(res, id);
    }
}

export default new CartController();
