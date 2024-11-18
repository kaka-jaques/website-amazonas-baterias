const productSwiper = new Swiper('.productSwiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 4000
    },
    breakpoints: {
        1000:{
            slidesPerView: 3,
            grid:{
                rows: 2
            }
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})