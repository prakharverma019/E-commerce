export let cart =[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];

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

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
}