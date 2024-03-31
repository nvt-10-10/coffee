function convertToSlug(text) {
    if (typeof text !== "string") {
        throw new Error("Input is not a string");
    }
    return text.toLowerCase().replace(/\s+/g, "-").trim();
}

export default convertToSlug;
