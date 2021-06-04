$('.main-menu-wrap .menu-title span').on('click',function(e){
    const id = e.target.dataset.id
    if (id) {
        $('.menu-title').removeClass('active-title')
        if (!$('.main-menu-wrap .menu-list').eq(id-1).is(':hidden')) {
            $('.main-menu-wrap .menu-list').slideUp()
        }else{
            $('.main-menu-wrap .menu-list').slideUp()
            $(this).parent().addClass('active-title')
            $('.main-menu-wrap .menu-list').eq(id-1).slideToggle()
        }
    }
})
$('.menu-item').on('click',function(){
    removeActiveClass()
    $(this).addClass('active-menu')
})

$('a.menu-title').on('click',function(){
    removeActiveClass()
    $('.main-menu-wrap .menu-list').slideUp()
    $('.menu-title').removeClass('active-title')
    $(this).addClass('active-menu')
})

function removeActiveClass() {
    $('.menu-item').removeClass('active-menu')
    $('a.menu-title').removeClass('active-menu')
}



$('.search-btn').on('click',function(e) {
    let val = $('#keywords-input').val()
    if (val==='') {
        alert('请输入搜索关键字')
    }else{
        const list = $('.menu-item')
        let id = null
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if (element.innerText.indexOf(val)>-1) {
                id = $(element).parent().data('id')
                $(element).click()
                location.href = element.href
                if ($('.main-menu-wrap .menu-list').eq(id-1).is(':hidden')) {
                    $('.main-menu-wrap .menu-list').slideUp()
                    $('.main-menu-wrap .menu-list').eq(id-1).slideToggle()
                }
            }
            
        }
        if (!id) {
            alert('未找到结果')
        }
        
    }
})