import PaginatePaginate from "../models/PaginatePaginate.js";
import encodeImageToBase64 from "../utils/encodeImageToBase64.js";
import ResponseHandler from "../utils/ResponseHandler.js";
class GenericService {
    constructor(model) {
        this.model = model;
    }

    async getAll(res, scope = null) {
        try {
            let result;
            if (scope) {
                result = await this.model.scope(scope).findAll();
            } else {
                result = await this.model.findAll();
            }

            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllByPage(res, page = 0, scope = null) {
        try {
            let result;
            let totalCount;
            if (scope) {
                const queryResult = await this.model
                    .scope(scope)
                    .findAndCountAll({
                        limit: 9,
                        offset: page * 9 - 1 > 0 ? page * 9 - 1 : 0,
                    });
                result = queryResult.rows;
                totalCount = queryResult.count;
            } else {
                const queryResult = await this.model.findAndCountAll({
                    limit: 9,
                    offset: page * 9 - 1 > 0 ? page * 9 - 1 : 0,
                });
                result = queryResult.rows;
                totalCount = queryResult.count;
            }

            result = new PaginatePaginate(result, totalCount, page).get();
            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getById(id, scope = null) {
        if (scope) {
            return await this.model.scope(scope).findByPk(id);
        } else {
            return await this.model.findByPk(id);
        }
    }

    async getByIdRes(res, id, scope = null) {
        try {
            let result;
            if (scope) {
                result = await this.model.scope(scope).findByPk(id);
            } else {
                result = await this.model.findByPk(id);
            }
            if (result)
                ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
            else
                ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async create(data) {
        return this.model.create(data);
    }
    async update(id, newData, res) {
        try {
            const item = await this.getById(id);
            if (!item) {
                ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
                throw new Error();
            } else {
                await item.update(newData);
                ResponseHandler.success(
                    res,
                    `${this.model.name} cập nhật thành công`
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async delete(id, res) {
        try {
            const item = await this.getById(id);
            if (item == null) {
                ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
            } else {
                await item.destroy({
                    where: {
                        id: id,
                    },
                });
                ResponseHandler.success(
                    res,
                    `${this.model.name} đã xoá thành công`
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async filter(res, paginationParams, order = "createdAt") {
        try {
            let { page, size, sort } = paginationParams;
            size = parseInt(size);
            page = parseInt(page);
            const limit = size;
            const offset = (page - 1) * size > 0 ? (page - 1) * size : 0;

            const { rows, count: total } = await this.model.findAndCountAll({
                order: [order],
                limit: limit,
                offset: offset,
            });

            const data = new PaginatePaginate(rows, total, page, size).get();
            ResponseHandler.success(res, `Lấy dữ liệu thành công `, data);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async coverImgBase64(result) {
        const name = this.model.name;
        if (name == "Producs") {
            encodeImageToBase64(result.img);
        }

        if (name == "Users") {
            encodeImageToBase64(result.avatar);
        }
    }
}

export default GenericService;
