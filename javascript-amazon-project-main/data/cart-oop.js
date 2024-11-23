function Cart(){
  const cart= {
    cartItems: undefined,

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
        if (!this.cartItems){
          this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId:"1"
        },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2"
        }]
        };
    },

    saveToStorage(){
        localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
      },

    addToCart(productId) {
        let matchingcartItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingcartItem = cartItem;
          }
        });
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = quantitySelector ? Number(quantitySelector.value) : 0;
        if (matchingcartItem) {
          matchingcartItem.quantity += quantity;
        } else {
          this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId : "1"
          })
        }
        this.saveToStorage();
    },

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
        this.saveToStorage();
    },

    calculateCartQuantity(){
        let cartQuantity =0;
        this.cartItems.forEach((cartItem)=> {
         cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    },
       
    updateQuantity(productId, newQuantity) {
         let matchingItem;
         this.cartItems.forEach((cartItem) => {
           if (productId === cartItem.productId) {
             matchingItem = cartItem;
           }
         });
         matchingItem.quantity = newQuantity;
         this.saveToStorage();
    },
       
    updateDeliveryOption (productId, deliveryOptionId) {
         let matchingcartItem;
           this.cartItems.forEach((cartItem) => {
             if (productId === cartItem.productId) {
               matchingcartItem = cartItem;
             }
           });
           matchingcartItem.deliveryOptionId = deliveryOptionId;
           this.saveToStorage();
    }

  };
  return cart;
};

const cart = Cart();

cart.loadFromStorage();










