import { Sequelize, ValidationError } from "sequelize";
import ResponseHandler from "../utils/ResponseHandler.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import Order from "../models/entities/Order.js";
import GenericService from "./GenericService.js";
import Cart from "../models/entities/Cart.js";
import OrderDetail from "../models/entities/OrderDetail.js";
import Product from "../models/entities/Product.js";

class OrderService extends GenericService {
    constructor() {
        super(Order);
    }

    async getDetailById(req, res) {
        try {
            const id = req.params.id;
            const orders = await Order.findOne({
                include: [
                    {
                        model: OrderDetail,
                        as: "order_details",
                        attributes: ["quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: ["name", "price"],
                            },
                        ],
                    },
                ],
                where: {
                    id: id,
                },
            });
            return res.status(200).json({
                success: true,
                message: "Lấy dữ liệu thành công",
                data: orders, // Sửa thành biến orders
            });
        } catch (error) {
            console.error("Xảy ra lỗi ở máy chủ:", error);
            return res.status(500).json({
                success: false,
                message: "Xảy ra lỗi ở máy chủ",
            });
        }
    }

    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: OrderDetail,
                        as: "order_details",
                        attributes: ["quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: ["name", "price"],
                            },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
            return res.status(200).json({
                success: true,
                message: "Lấy dữ liệu thành công",
                data: orders, // Sửa thành biến orders
            });
        } catch (error) {
            console.error("Xảy ra lỗi ở máy chủ:", error);
            return res.status(500).json({
                success: false,
                message: "Xảy ra lỗi ở máy chủ",
            });
        }
    }

    async getAllByUser(req, res) {
        console.log("dagoi ");
        try {
            const user_id = req.user.id;
            console.log("usser", req.user);
            const orders = await Order.findAll({
                attributes: ["id", "note", "total", "status", "isReview"],
                include: [
                    {
                        model: OrderDetail,
                        as: "order_details",
                        attributes: ["quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: ["name", "price"],
                            },
                        ],
                    },
                ],
                where: {
                    client_id: user_id,
                },
            });
            return res.status(200).json({
                success: true,
                message: "Lấy dữ liệu thành công",
                data: orders, // Sửa thành biến orders
            });
        } catch (error) {
            console.error("Xảy ra lỗi ở máy chủ:", error);
            return res.status(500).json({
                success: false,
                message: "Xảy ra lỗi ở máy chủ",
            });
        }
    }

    async getOrderDetailByID(req, res) {
        try {
            const id = req.params.id;
            const orders = await Order.findOne({
                attributes: [
                    "id",
                    "note",
                    "total",
                    "name",
                    "address",
                    "phone",
                    "email",
                    "status",
                ],
                include: [
                    {
                        model: OrderDetail,
                        as: "order_details",
                        attributes: ["quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: ["name", "price", "img", "id"],
                            },
                        ],
                    },
                ],
                where: {
                    id: id,
                },
            });
            return res.status(200).json({
                success: true,
                message: "Lấy dữ liệu thành công",
                data: orders, // Sửa thành biến orders
            });
        } catch (error) {
            console.error("Xảy ra lỗi ở máy chủ:", error);
            return res.status(500).json({
                success: false,
                message: "Xảy ra lỗi ở máy chủ",
            });
        }
    }

    async createOrder(req, res) {
        try {
            const { name, address, phone, email, note, total } = req.body;
            const user_id = req.user.id;
            const order = await this.create({
                name,
                address,
                phone,
                email,
                client_id: user_id,
                status: 1,
                note,
                total,
            });
            const carts = await Cart.findAll({
                where: {
                    user_id: user_id,
                },
            });
            let outOfStockProducts = [];

            for (const cart of carts) {
                const product = await Product.findByPk(cart.product_id);
                if (!product || product.quantity < cart.quantity) {
                    outOfStockProducts.push({
                        id: cart.product_id,
                        name: product ? product.name : "Sản phẩm không tồn tại",
                    });
                }
            }

            if (outOfStockProducts.length === 0) {
                for (const cart of carts) {
                    await OrderDetail.create({
                        product_id: cart.product_id,
                        order_id: order.id,
                        quantity: cart.quantity,
                    });

                    await Product.update(
                        {
                            quantity: Sequelize.literal(
                                `quantity - ${cart.quantity}`
                            ),
                        },
                        {
                            where: {
                                id: cart.product_id,
                            },
                        }
                    );
                }

                await Cart.destroy({
                    where: {
                        user_id: user_id,
                    },
                });

                ResponseHandler.success(res, "Tạo đơn hàng thành công");
            } else {
                ResponseHandler.error(
                    res,
                    "Có sản phẩm đã hết hàng trong giỏ hàng" +
                        outOfStockProducts.join(",")
                );
            }
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                ResponseHandler.error(
                    res,
                    "Có sản phẩm đã hết hàng trong giỏ hàng" +
                        JSON.stringify(outOfStockProducts)
                );
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateOrder(res, id, status) {
        try {
            await Order.update(
                { status: status },
                {
                    where: { id: id },
                }
            );
            ResponseHandler.success(res, "Cap nhap thanh cong");
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteOrder(res, id) {
        await this.delete(id, res);
    }
}
export default new OrderService();
