export default function resizeHeightText(classParent, classChild) {
    // const texts = document.querySelectorAll(".review-item blockquote");
    const texts = document.querySelectorAll(`.${classParent} .${classChild}`);
    let maxHeight = 0;
    texts.forEach((text) => {
        const height = text.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    texts.forEach((text) => {
        text.style.height = maxHeight + "px";
    });
}
