$.fn.api.settings.api = {
    'del book': '/api/user/collect/book/del',
    'add book': '/api/user/collect/book/add',
    'get books': '/api/user/collect/books',
};
function del_book() {
    $('body > div.ui.container > div > div.twelve.wide.column > table > tbody > tr > td > a').api({
        action: "del book",
        method: "GET",
        data: {
            class_id: null,
            book_id: null,
        },
        onSuccess: function (response) {
            if (response.ok) {
                $(this).parent('td').parent().remove()
            } else {
                showErr(response.message)
            }
        },
        beforeSend: function (settings) {
            let class_id = $('a.item.active').attr('class-id');
            let book_id = $(this).attr("book-id");
            if (class_id == null || book_id == null) {
                alert("网络错误");
                return false
            } else {
                settings.data.class_id = class_id;
                settings.data.book_id = book_id;
                return settings
            }
        }
    });
}
del_book();

let tb = $('body > div.ui.container > div > div.twelve.wide.column > table')
$('body > div.ui.container > div > div.ui.small.vertical.menu.column > a').api({
    action: "get books",
    method: "GET",
    onSuccess: function (response) {
        // 修改active样式
        $('a.item.active').removeClass("active");
        $(this).addClass("active");

        response.forEach(function (element, index, array) {
            let items = $('<tr></tr>');
            items.append($('<td><a href="/book/'+ element.book_id +'" target="_blank">' + element.name + '</a></td>'));
            items.append($('<td><a href="/chapter/">' + element.last_read + '</a></td>'));
            items.append($('<td><a href="#">' + element.last + '</a></td>'));
            items.append($('<td><a href="#">'+ element.author +'</a></td>'));
            items.append($('<td><a title="移除该书" class="ui mini red button icon" href="javascript:;" book-id="'+ element.book_id +'"><i class="x icon"></i></a>'));
            tb.append(items)
        });
        del_book();
    },
    beforeSend: function (settings) {
        if ($(this).hasClass('active')) {
            return false
        }
        $('body > div.ui.container > div > div.twelve.wide.column > table > tbody > tr').remove();
        let class_id = $(this).attr('class-id');
        settings.data.class_id = class_id;
        return settings
    }

});

$('#edit_bs').click(function () {
    $('.ui.basic.modal')
        .modal('show')
    ;
});

