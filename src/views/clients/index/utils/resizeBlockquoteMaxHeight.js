export default function resizeBlockquoteMaxHeight() {
    const blockquotes = document.querySelectorAll(".review-item blockquote");
    let maxHeight = 0;
    blockquotes.forEach((blockquote) => {
        const height = blockquote.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    blockquotes.forEach((blockquote) => {
        blockquote.style.height = maxHeight + "px";
    });
}
