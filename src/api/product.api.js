import { get } from "./service.api";

async function getFilter(params) {
    let queryString = "/products/filter?";
    const { page, category_id, search, price } = params;

    if (category_id.length > 0) {
        queryString +=
            category_id.map((id) => `category_id=${id}`).join("&") + "&";
    }

    if (search.trim().length > 0) {
        queryString += `search=${search}&`;
    }

    queryString += `page=${page}&`;
    queryString += `price=${price}`;
    console.log(queryString);
    return await get(queryString);
}

export { getFilter };
