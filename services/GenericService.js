import PaginatePaginate from "../models/PaginatePaginate.js";
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
            console.log(res);
            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllByPage(res, page, scope = null) {
        try {
            let result;
            if (scope) {
                result = await this.model.scope(scope).findAll({
                    limit: 10,
                    offset: page * 10 - 1 > 0 ? page * 10 - 1 : 0,
                });
            } else {
                result = await this.model.findAll();
            }
            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
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
            console.log(result);
            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
            console.log(error);
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
    async filter(res, paginationParams) {
        console.log(paginationParams);
        try {
            let { page, size, sort } = paginationParams;
            size = parseInt(size);
            page = parseInt(page);
            const limit = size;
            const offset = (page - 1) * size > 0 ? (page - 1) * size : 0;

            const { rows, count: total } = await this.model.findAndCountAll({
                order: [["createdAt"]],
                limit: limit,
                offset: offset,
            });

            const data = new PaginatePaginate(rows, total, page, size).get();
            ResponseHandler.success(res, `Lấy dữ liệu thành công `, data);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}

export default GenericService;
