export const currencyFormat = (price)=> new Intl.NumberFormat('vi-VN',{
    style: 'currency',
    currency: 'VND'
}).format(price);

