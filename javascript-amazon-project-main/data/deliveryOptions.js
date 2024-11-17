export const deliveryOptions = [
    {
        id: "1",
        deliveryTime: "7",
        priceCents: ""
    }, 
    {
        id: "2",
        deliveryTime: "3",
        priceCents: "399"
    },
    {
        id: "3",
        deliveryTime: "1",
        priceCents: "999"
    },   
];

export function getDeliveryOption(deliveryOptionId)
{let deliveryOption;
      deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
          deliveryOption=option;
      }
    });
    return deliveryOption || deliveryOptions[0] ;
}