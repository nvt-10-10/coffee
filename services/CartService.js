import { ValidationError } from "sequelize";
import ResponseHandler from "../utils/ResponseHandler.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import Product from "../models/entities/Product.js";
import Cart from "../models/entities/Cart.js";
import GenericService from "./GenericService.js";
class CartService extends GenericService {
    constructor() {
        super(Cart);
    }
    async getAll(req, res) {
        try {
            const user = req.user;
            console.log(user);
            let carts = await Cart.findAll({
                where: {
                    user_id: user.id,
                },
            });

            const cartsWithProducts = await Promise.all(
                carts.map(async (cart) => {
                    const product = await Product.findByPk(cart.product_id, {
                        attributes: ["id", "name", "price", "quantity", "img"],
                    });
                    return {
                        ...cart.toJSON(),
                        product: product,
                    };
                })
            );
            console.log(cartsWithProducts);
            ResponseHandler.success(
                res,
                "Lấy dữ liệu thành công",
                cartsWithProducts
            );
        } catch (error) {
            console.error("Xảy ra lỗi ở máy chủ:", error);
            return res.status(500).json({
                success: false,
                message: "Xảy ra lỗi ở máy chủ",
            });
        }
    }

    async getAllCheckout(req, res) {
        try {
            const user = req.user;
            let carts = await Cart.findAll({
                where: {
                    user_id: user.id,
                },
            });
            let errors = [];

            if (carts.length === 0) {
                errors.push("Giỏ hàng của bạn hiện đang trống");
            }

            for (const cart of carts) {
                const product = await Product.findByPk(cart.product_id);

                if (product.quantity === 0) {
                    await cart.destroy();
                    errors.push(`Sản phẩm "${product.name}" đã hết hàng`);
                } else if (product.quantity < cart.quantity) {
                    cart.quantity = product.quantity;
                    await cart.save();
                    errors.push(
                        `Sản phẩm "${product.name}" chỉ còn ${product.quantity} sản phẩm trong kho`
                    );
                }
            }

            if (errors.length > 0) {
                return ResponseHandler.error(
                    res,
                    "Có lỗi xảy ra khi kiểm tra giỏ hàng",
                    errors.join(", ")
                );
            }

            ResponseHandler.success(
                res,
                "Lấy dữ liệu giỏ hàng thành công",
                carts
            );
        } catch (error) {
            console.error("Xảy ra lỗi ở máy chủ:", error);
            return res.status(500).json({
                success: false,
                message: "Xảy ra lỗi ở máy chủ",
            });
        }
    }

    async createCart(req, res) {
        try {
            const user_id = req.user.id;
            console.log(user_id);
            console.log(req.user);
            const { product_id, quantity } = req.body;
            console.log({ product_id, quantity, user_id });
            const product = await Product.findByPk(product_id); // Sử dụng await để đợi lấy dữ liệu từ cơ sở dữ liệu
            if (product) {
                if (product.quantity - quantity < 0) {
                    return ResponseHandler.error(res, "Sản phẩm đã hết hàng");
                } else {
                    const productCart = await Cart.findOne({
                        where: {
                            product_id: product_id,
                            user_id: user_id,
                        },
                    });
                    console.log(productCart);
                    if (!productCart) {
                        await Cart.create({ product_id, quantity, user_id });
                    } else {
                        await Cart.increment(
                            { quantity: 1 }, // Increment the quantity by 1
                            { where: { id: productCart.id } } // Specify the condition to update the cart item
                        );
                    }
                    return ResponseHandler.success(
                        res,
                        "Them giỏ hàng thành công"
                    );
                }
            } else {
                return ResponseHandler.success(res, "San Pham khong ton tai");
            }
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateCart(res, id, cartData) {
        try {
            await this.update(id, cartData, res);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteCart(res, id) {
        await this.delete(id, res);
    }
}
export default new CartService();
