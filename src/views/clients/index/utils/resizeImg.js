export default function resizeImg() {
    let className = "product-img";
    document.querySelectorAll(`.${className}`).forEach((item) => {
        console.log(item);
        item.onload = () => {
            let maxHeight = 0;
            document.querySelectorAll(`.${className}`).forEach((item) => {
                maxHeight = Math.max(maxHeight, item.offsetHeight);
            });

            document.querySelectorAll(`.${className}`).forEach((item) => {
                item.style.height = maxHeight + "px";
            });
        };
    });
}
