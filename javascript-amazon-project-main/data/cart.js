export const cart =[];
export function addToCart(productId) {
    let matchingcartItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingcartItem = cartItem;
      }
    })
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    /*const quantity = Number(quantitySelector.value);*/
    if (matchingcartItem) {
      matchingcartItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity
      })
    }
}