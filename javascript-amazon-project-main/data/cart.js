export let cart =   JSON.parse(localStorage.getItem('cart'));
if (!cart){
  cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}]
};

function saveToStorage(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
    saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}