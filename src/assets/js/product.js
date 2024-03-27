$(document).ready(function () {
    const slider = $("#myRange"); // Lấy jQuery object của thanh trượt
    const output = $("#demo"); // Lấy jQuery object của phần tử hiển thị giá trị
    const maxValue = slider.attr("max"); // Lấy giá trị tối đa của thanh trượt

    // Cập nhật giá trị hiển thị ban đầu
    output.text(slider.val());

    // Xử lý sự kiện "input" của thanh trượt
    slider.on("input", function () {
        const currentVal = $(this).val(); // Giá trị hiện tại của thanh trượt
        const percentage = (currentVal / maxValue) * 100; // Tính toán phần trăm

        output.text(currentVal);

        const sliderTrack = $(this).parent(); // Lấy jQuery object của phần tử container của thanh trượt
        let progressElement = sliderTrack.find(".slider-after"); // Tìm phần tử progress

        if (!progressElement.length) {
            progressElement = $('<div class="slider-after"></div>'); // Tạo phần tử progress
            sliderTrack.append(progressElement); // Thêm phần tử progress vào container
        }
        const x = (15 * (100 - percentage)) / 100;
        console.log(`calc(${percentage}% + ${x}px)`);
        progressElement.css("width", `calc(${percentage}% + ${x}px)`);
    });

    // $("#see-all").click(function (event) {
    //     event.preventDefault();

    //     $(this)
    //         .closest(".category-column")
    //         .find('input[type="checkbox"]')
    //         .prop("checked", true);
    // });

    $(".see-all").click(function (event) {
        event.preventDefault();
        $(this)
            .closest(".category-column")
            .find('input[type="checkbox"]')
            .prop("checked", true);

        $(this).addClass("d-none");
        $(this).siblings(".hidden-all").removeClass("d-none");
    });

    $(".hidden-all").click(function (event) {
        event.preventDefault();
        $(this)
            .closest(".category-column")
            .find('input[type="checkbox"]')
            .prop("checked", false);

        $(this).addClass("d-none");
        $(this).siblings(".see-all").removeClass("d-none");
    });

    $(".filter-toggle").on("click", (event) => {
        event.preventDefault();
        $(".filter").addClass("show");
    });

    $("#done").on("click", (event) => {
        event.preventDefault();
        $(".filter").removeClass("show");
    });

    $("#cancel").on("click", (event) => {
        event.preventDefault();
        $(".filter").removeClass("show");
    });
});
