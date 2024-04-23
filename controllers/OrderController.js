import Order from "../models/entities/Order.js";
import OrderService from "../services/OrderService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
class OrderController {
    async getDetailById(req, res) {
        await OrderService.getDetailById(req, res);
    }
    async getAll(req, res) {
        await OrderService.getAll(req, res);
    }

    async getOrderDetailByID(req, res) {
        await OrderService.getOrderDetailByID(req, res);
    }

    async getAllByUser(req, res) {
        await OrderService.getAllByUser(req, res);
    }

    async createOrder(req, res) {
        await OrderService.createOrder(req, res);
    }
    async updateReview(req, res) {
        const { id } = req.body;
        Order.update({ isReview: true }, { where: { id: id } });
        ResponseHandler.success(res, "update thanh cong");
    }

    async updateOrder(req, res) {
        const { id, status } = req.body;
        await OrderService.updateOrder(res, id, status);
    }

    async deleteOrder(req, res) {
        const id = req.params.id;
        await OrderService.deleteOrder(res, id);
    }
}

export default new OrderController();
