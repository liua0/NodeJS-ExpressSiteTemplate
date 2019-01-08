$("#login-btn")
    .api({
        url: "/api/user/login",
        method: "POST",
        data: {
            username: "",
            pwd: "",
        },
        onSuccess: function (response) {
            if (response.ok) {
                window.location.reload();
            } else {
                showErr(response.message)
            }
        },
        onError: function (errorMessage) {
            alert("登陆失败")
        },
        beforeSend: function (settings) {
            let username = $("[name='account']").val();
            let pwd;
            $("input[name='password']").each(function () {
                pwd = $(this).val();
            });

            if (username == "" || pwd == "") {
                showErr("请输入登陆信息");
                return false
            } else {
                settings.data.username = username;
                settings.data.pwd = pwd;
                return settings

            }
        }
    });

function showErr(msg) {
    $("p.ui.message.red.hidden").text(msg);
    $("p.ui.message.red.hidden").removeClass("hidden");
}

function showLogin() {
    // 弹出登陆
    $('.ui.modal')
        .modal('show')
    ;
}

$('.ui.dropdown')
    .dropdown();
$(window).resize(function () {
    if ($(window).scrollTop() == 0) {
        $("#back-to-top").css("display", "none")
    } else {
        $("#back-to-top").removeAttr("style");
        $("#back-to-top").css("top", $(window).height() - 400);
        $("#back-to-top").css("left", $(window).width() - 50)
    }
});
// $(document).ready(function () {
//     showBackToTop()
// });

$(window).scroll(function () {
    if ($(window).scrollTop() == 0) {
        $("#back-to-top").css("display", "none")
    } else {
        $("#back-to-top").removeAttr("style");
        $("#back-to-top").css("top", $(window).height() - 400);
        $("#back-to-top").css("left", $(window).width() - 50)
    }
});


// 收藏/取消收藏 书籍
$('a.ui.right.floated.red.tiny.button').api({
    onSuccess: function (response) {
        if (!$(this).children('i').hasClass('outline')) {
            $(this).html('<i class=\"heart tiny icon\"></i>收藏');
            $(this).children('i').addClass("outline");
        } else {
            $(this).children('i').removeClass("outline");
            $(this).html('<i class=\"heart tiny icon\"></i>已收藏')
        }

    },
    beforeSend: function (settings) {
        // 判断是否已收藏
        let book_id = $(this).attr("book-id");
        if (!$(this).children('i').hasClass('outline')) {
            settings.url = "/api/user/collect/del";
        } else {
            settings.url = "/api/user/collect/add";
        }
        settings.method = "POST";
        settings.data.book_id = book_id;
        return settings
    },
});
