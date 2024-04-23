import { INTEGER } from "sequelize";

class PaginatePaginate {
    constructor(data, total = 0, page = 1, size = 9) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.size = size;
        this.meta = this.initMeta();
        this.deleteProperties();
    }

    initMeta() {
        const size = this.size;
        const page = parseInt(this.page);
        const pages = Math.ceil(this.total / this.size);

        return {
            page,
            size,
            total_data: this.total,
            total_pages: pages,
            length: this.data.length,
        };
    }

    deleteProperties() {
        delete this.total;
        delete this.page;
        delete this.size;
    }

    get() {
        return {
            data: this.data,
            meta: this.meta,
        };
    }
}

export default PaginatePaginate;
