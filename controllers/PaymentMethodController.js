import PaymentMethodService from "../services/PaymentMethodService.js";
class PaymentMethodController {
    async getAllPaymentMethod(req, res) {
        await PaymentMethodService.getAllPaymentMethod(res);
    }

    async getAllPaymentMethodByPage(req, res) {
        const { page } = req.body;
        await PaymentMethodService.getAllPaymentMethodByPage(res, page);
    }

    async getPaymentMethodById(req, res) {
        const id = req.params.id;
        await PaymentMethodService.getPaymentMethodById(res, id);
    }

    async createPaymentMethod(req, res) {
        const { name } = req.body;
        await PaymentMethodService.createPaymentMethod(res, { name });
    }

    async updatePaymentMethod(req, res) {
        const { id, name } = req.body;
        await PaymentMethodService.updatePaymentMethod(res, id, { id, name });
    }

    async deletePaymentMethod(req, res) {
        const id = req.params.id;
        await PaymentMethodService.deletePaymentMethod(res, id);
    }
}

export default new PaymentMethodController();
