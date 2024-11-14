import {calculateCartQuantity, cart, removeFromCart, updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
 const productId = cartItem.productId;

 let matchingItem;
 products.forEach((product) => {
    if (product.id === productId) {
        matchingItem = product; 
    }
 });
 cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class=" update-quantity-link link-primary js-update-link" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input js-quantity-input-${matchingItem.id}" data-product-id="${matchingItem.id}"> </input>
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingItem.id}"> save </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input-${matchingItem.id}"
                    name="delivery-option-1}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input-${matchingItem.id}"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input-${matchingItem.id}"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
          document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

          document.querySelectorAll('.js-delete-link').forEach((link)=>{
            link.addEventListener("click", ()=>{
              const productId = link.dataset.productId;
              removeFromCart(productId);
              const container = document.querySelector(`.js-cart-item-container-${productId}`)
              container.remove();
              updateCartQuantity();
            })

          });

          document.querySelectorAll('.js-update-link')
          .forEach((link)=>{
            link.addEventListener("click", ()=>{
             const productId= link.dataset.productId; 
             const container = document.querySelector(`.js-cart-item-container-${productId}`);
             container.classList.add('is-editing-quantity');

            });
          });

          document.querySelectorAll('.js-save-link')
          .forEach((link)=>{
            link.addEventListener("click", ()=>{handleQuantityUpdate(link)});
          });

          document.querySelectorAll('.js-quantity-input')
          .forEach((input)=>{
            input.addEventListener("keydown", (event)=>{
              if(event.key==="enter"){
                handleQuantityUpdate(event);
              }
            })
          })
          
}); 
function updateCartQuantity(link) {
  const cartQuantity = calculateCartQuantity();
 document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
} 
updateCartQuantity();


function handleQuantityUpdate(link){
  
    const productId = link.dataset.productId;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity= Number(quantityInput.value);
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateQuantity(productId, newQuantity); 

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
    
  }



    