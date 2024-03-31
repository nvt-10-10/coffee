import { get } from "./service.api";

async function getCategoriesByTypeWithItems() {
    let queryString = "/categories/type";
    return await get(queryString);
}

export { getCategoriesByTypeWithItems };
