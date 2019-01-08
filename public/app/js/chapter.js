let a = $("#chapter-footer-left").offset().left;
let b = $("#chapter-footer-right").offset().left;
let top1 = $(window).height();
reSet(top1);
changPos(a, b);
$("#chapter-login").attr("ref",window.location.href);
$(window).resize(function () {
    let top = $(window).height();
    reSet(top);
    let left = $("#chapter-footer-left").offset().left;
    let right = $("#chapter-footer-right").offset().left;
    changPos(left, right);
    let scrollTop = $(window).scrollTop();
    if (scrollTop > 100) {
        $("#chapter-footer-left").css("top", "0px");
    } else {
        $("#chapter-footer-left").css("top", "114px");
    }
});

$(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    if (scrollTop > 100) {
        $("#chapter-footer-left").css("top", "0px");
    } else {
        $("#chapter-footer-left").css("top", "114px");
    }
});

function changPos(left, right) {
    $("#chapter-footer-left").css("position", "fixed");
    $("#chapter-footer-left").css("left", left);

    $("#chapter-footer-right").css("position", "fixed");
    $("#chapter-footer-right").css("left", right);
}

function reSet(top) {
    $("#chapter-footer-left").css("position", "absolute");
    $("#chapter-footer-left").css("left", "-82px");
    $("#chapter-footer-left").css("top", "114px");

    $("#chapter-footer-right").css("position", "absolute");
    $("#chapter-footer-right").css("left", "701px");
    $("#chapter-footer-right").css("top", top - 142 + "px");
}