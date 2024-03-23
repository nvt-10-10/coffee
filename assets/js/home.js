async function getItems(classShow) {
    let items;
    if (classShow == "our-latest-new") {
        items = {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
        };
    } else if (classShow == "our-product") {
        items = {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
        };
    } else if (classShow == "review") {
        items = {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
        };
    }
    return items;
}

async function getInit(size, items, length) {
    let breakpoint = "";
    if (size < 576) breakpoint = "xs";
    else if (size < 768) breakpoint = "sm";
    else if (size < 992) breakpoint = "md";
    else if (size < 1200) breakpoint = "lg";
    else if (size < 1400) breakpoint = "xl";
    else breakpoint = "xxl";

    const item = items[breakpoint];
    let nav = true;
    let mouseDrag = true;
    if (item >= length) {
        nav = false;
        mouseDrag = false;
    }
    if (
        nav &&
        (breakpoint == "lg" ||
            breakpoint == "xl" ||
            breakpoint == "xxl" ||
            breakpoint == "md")
    ) {
        $(".owl-nav").css("display", "block");
    } else {
        nav = false;
        $(".owl-nav").css("display", "none");
    }
    let autoplay = false;
    if (breakpoint == "xs") autoplay = true;
    return { nav, mouseDrag, autoplay };
}

async function slider_carouselInit(classShow, size, length) {
    const classIndex = `.${classShow} .owl-carousel.slider_carousel`;
    const items = await getItems(classShow);
    let { nav, mouseDrag, autoplay } = await getInit(size, items, length);
    if (classShow == "review") autoplay = true;
    console.table({ classShow, nav, mouseDrag });
    const init = {
        dots: false,
        loop: true,
        margin: 30,
        stagePadding: 2,
        nav: nav,
        navText: [
            `<i class="fa-solid fa-arrow-left"></i>`,
            `<i class="fa-solid fa-arrow-right"></i>`,
        ],
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        mouseDrag: mouseDrag,
        autoplay: autoplay,
        responsive: {
            0: {
                items: items.xs,
            },
            576: {
                items: items.sm,
            },
            768: {
                items: items.md,
            },
            992: {
                items: items.lg,
            },

            1200: {
                items: items.xl,
            },
        },
    };

    console.table(init);
    $(classIndex).owlCarousel(init);
}
$(document).ready(function () {
    const productLength = $(".product-item").length;
    const reviewLength = $(".review-item").length;
    const aboutLength = $(".about-item").length;

    $(".menu-toggle").on("click", (event) => {
        event.preventDefault();
        $(".menu-drawer").addClass("show");
        $(".menu-overlay").addClass("show");
    });

    $(".menu-overlay").on("click", (event) => {
        event.preventDefault();
        $(".menu-drawer").removeClass("show");
        $(".menu-overlay").removeClass("show");
    });

    $(window).resize(async () => {
        const size = $(window).width();
        await slider_carouselInit("our-latest-new", size, aboutLength);
        await slider_carouselInit("review", size, reviewLength);
        await slider_carouselInit("our-product", size, productLength);
    });

    $(window).on("load", async () => {
        const size = $(window).width();
        await slider_carouselInit("our-latest-new", size, aboutLength);
        await slider_carouselInit("review", size, reviewLength);
        await slider_carouselInit("our-product", size, productLength);

        const blockquotes = $(".slider_carousel blockquote");
        let maxHeight = 0;

        blockquotes.each(function () {
            var height = $(this).outerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        blockquotes.css("height", maxHeight + "px");

        const about_imgs = $(".slider_carousel .about-img");
        maxHeight = 0;

        about_imgs.each(function () {
            var height = $(this).outerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        about_imgs.css("height", maxHeight + "px");
    });
});

// $(document).ready(function () {
//     $("#footer").load("footer.html");
// });
