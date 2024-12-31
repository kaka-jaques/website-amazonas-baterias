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

var customer;
var product;
var price;
var address;
var sendType;
var paymentMethod;

function openBuyOverlay(el){

    gtag_report_conversion();

    let productData = el.querySelector('.text-left').getElementsByTagName('p');

    product = productData[0].textContent + ' ' + productData[1].textContent.replace('Corrente: ', '') + ' ' + productData[2].textContent.replace('Código: ', '');

    document.querySelector('#selected-product').textContent = '1x ' + product;
    
    // gsap.to('.purchase-back-overlay', {
    //     display: 'flex',
    //     duration: 0,
    //     onComplete: () => {
    //         gsap.to('.purchase-back-overlay', {
    //             opacity: 1,
    //             duration: 0.4
    //         })
    //     }
    // })
}

function closeBuyOverlay(){
    gsap.to('.purchase-back-overlay', {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            gsap.to('.purchase-back-overlay', {
                display: 'none',
                duration: 0
            })
        }
    })
}

function handlePayment(el){
    paymentMethod = el.textContent;
    
    document.querySelectorAll('.payment').forEach(el2 => {
        if(el2 != el){
            el2.classList.remove('payment-active');
        }
    })

    el.classList.add('payment-active');
}

function handleSendType(el){
    if(el.checked){
        document.querySelector('#customer-address').disabled = true;
        document.querySelector('#customer-address').value = '';
    }else{
        document.querySelector('#customer-address').disabled = false;
    }
}

function sendPurchase(){

    let completeQueue;

    let temporalGreeting;

    // customer = document.querySelector('#customer-name').value;
    // address = document.querySelector('#customer-address').value;
    // try{
    //     paymentMethod = document.querySelector('.payment-active').textContent.replace('                                ', '');
    // }catch{
    //     paymentMethod = '';
    // }
    

    // if(customer == '' || (address == '' && !document.querySelector('#customer-address-checkbox').checked) || paymentMethod == ''){
    //     alert('Preencha todos os campos!');
    //     return
    // }

    if(new Date().getHours() < 12){
        temporalGreeting = 'Olá! Bom dia!';
    }else if(new Date().getHours() < 18){
        temporalGreeting = 'Olá! Boa tarde!';
    }else{
        temporalGreeting = 'Olá! Boa noite!';
    }

    completeQueue = temporalGreeting+'%0AGostaria de saber o valor e comprar *'+product+'*!'

    // if(document.querySelector('#customer-address-checkbox').checked){

    //     completeQueue = temporalGreeting+'%0AMe chamo *'+customer+'* e gostaria de comprar *'+product+'*%0APagamento será por *'+paymentMethod+'* e irei *RETIRAR* na loja!'

    // }else{

    //     completeQueue = temporalGreeting+'%0AMe chamo *'+customer+'* e gostaria de comprar *'+product+'*.%0APagamento será por *'+paymentMethod+'* e a entrega no endereço *'+address+'*!'

    // }

    // closeBuyOverlay();

    window.open('https://api.whatsapp.com/send?phone=5531990770066&text='+completeQueue);

}