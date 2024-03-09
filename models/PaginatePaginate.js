class PaginatePaginate {
    constructor(items, total = 0, page = 1, size = 10) {
        this.items = items;
        this.total = total;
        this.page = page;
        this.size = size;
        this.meta = this.initMeta();
        this.deleteProperties();
    }

    initMeta() {
        const size = this.size;
        const page = this.page;
        const pages = Math.ceil(this.total / this.size);

        return {
            page,
            size,
            total_items: this.total,
            total_pages: pages,
        };
    }

    deleteProperties() {
        delete this.total;
        delete this.page;
        delete this.size;
    }

    get() {
        return {
            item: this.items,
            meta: this.meta,
        };
    }
}

export default PaginatePaginate; // Xuất hàm tạo của lớp
