import { axiosApi, authHeader, uploadHeader } from "@/configs/axios";

const sendRequest = async (
    method,
    path,
    params = null,
    auth = false,
    uploadFile = false
) => {
    let headers;
    if (auth) headers = authHeader;
    else if (uploadFile) headers = uploadHeader;
    const config = { headers };

    try {
        let response = await axiosApi[method](path, params, config);
        response = response.data;
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: "Network error" };
        }
    }
};

const create = async (path, params, auth = false, uploadFile = false) => {
    return sendRequest("post", path, params, auth, uploadFile);
};

const update = async (path, params, auth = false, uploadFile = false) => {
    return sendRequest("put", path, params, auth, uploadFile);
};

const destroy = async (path, auth = false) => {
    return sendRequest("delete", path, null, auth);
};

const get = async (path, auth = false) => {
    return sendRequest("get", path, null, auth);
};

export { create, update, destroy, get };
