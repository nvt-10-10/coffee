const breakpoint = (classShow) => {
    const itemsData = items(classShow);
    const breakpoints = {
        0: {
            itemsToShow: itemsData.xs,
            snapAlign: "start",
        },
        576: {
            itemsToShow: itemsData.sm,
            snapAlign: "start",
        },
        768: {
            itemsToShow: itemsData.md,
            snapAlign: "start",
        },
        992: {
            itemsToShow: itemsData.lg,
            snapAlign: "start",
        },

        1200: {
            itemsToShow: itemsData.xl,
            snapAlign: "start",
        },
    };
    return breakpoints;
};

const items = (classShow) => {
    let itemsData;
    if (classShow == "our-latest-new") {
        itemsData = {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
        };
    } else if (classShow == "our-product") {
        itemsData = {
            xs: 2,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
        };
    } else if (classShow == "review") {
        itemsData = {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
        };
    }
    return itemsData;
};

const initSetting = (size, itemsData, length) => {
    let breakpoint = "";
    if (size < 576) breakpoint = "xs";
    else if (size < 768) breakpoint = "sm";
    else if (size < 992) breakpoint = "md";
    else if (size < 1200) breakpoint = "lg";
    else if (size < 1400) breakpoint = "xl";
    else breakpoint = "xxl";

    const item = itemsData[breakpoint];
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
        nav = true;
    } else {
        nav = false;
    }
    let autoplay = false;
    if (size > 1200) {
        mouseDrag = false;
    }

    if (breakpoint == "sm") autoplay = true;
    return { nav, mouseDrag, autoplay };
};

const init = (size, length, classShow) => {
    const itemsData = items(classShow);
    const breakpoints = breakpoint(classShow);
    const initSettings = initSetting(size, itemsData, length);
    return {
        breakpoints,
        initSettings,
    };
};

export { init };
