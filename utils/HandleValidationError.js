function handleValidationError(errors) {
    let result = "";
    errors.map((error) => {
        if (error.type.includes("unique")) {
            result += error.path + " đã tồn tại";
        } else if (error.type.includes("required")) {
            result += error.path + " không được bỏ trống";
        } else if (error.type.includes("format")) {
            result += error.path + " không đúng định dạng";
        } else if (error.type.includes("range")) {
            result += error.path + " không nằm trong phạm vi được cho phép";
        } else if (error.type.includes("length")) {
            result += error.path + " độ dài không đúng";
        } else if (error.validatorKey.includes("isEmail")) {
            result += "Email không đúng định dạng";
        } else {
            result += error.message;
        }
        result += ",";
    });
    result = result.slice(0, -1);
    return result;
}

export { handleValidationError };
