// getting all the products-section elements
const homeMenu = document.querySelector("li> .home-menu"),
  productsHeading = document.querySelector(".productsH"),
  productsSection = document.querySelector(".products");

// getting all the cart-section elements
const cartMenu = document.querySelector("li > .cart-menu"),
  cartSection = document.querySelector("#Cart"),
  cartHeading = document.querySelector(".cartH"),
  cartItemLength = document.querySelector(".itemLength");

  //function to show the products-section but hide the cart
function hideCartAndShowProducts() {
  cartHeading.style.display = "none";
  cartSection.style.display = "none";
  productsHeading.style.display = "flex";
  productsSection.style.display = "flex";
}


//function to hide the products-section but show the cart
function showCartAndHideProducts() {
  productsHeading.style.display = "none";
  productsSection.style.display = "none";
  cartHeading.style.display = "flex";
  cartSection.style.display = "flex";
}

//onloading of the page , only show the products section
document.body.onload = hideCartAndShowProducts;

//onclicking the cart menu show the cart but hide the products-section
cartMenu.onclick = showCartAndHideProducts;

//onclicking the home menu show the products-section but hide the cart
homeMenu.onclick = hideCartAndShowProducts;


// incrementing the item count per product on button click
function increaseCount(id) {
  let itemCountVal = Number(
    document.querySelectorAll(".noOfItem")[id - 1].innerText
  );
  document.querySelectorAll(".noOfItem")[id - 1].innerText = itemCountVal + 1;
}

//Decrementing item count per product (not less than 1) on button click
function decreaseCount(id) {
  let itemCountVal = Number(
    document.querySelectorAll(".noOfItem")[id - 1].innerText
  );
  if (itemCountVal > 1) {
    document.querySelectorAll(".noOfItem")[id - 1].innerText = itemCountVal - 1;
  }
}





// fetch all the products
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//initiate the cartproducts set
let initialCartState = new Set();

// function of add-to-cart , remove-from-cart customisably as per actionType
const cartSlice = (actionType, payload, cardItem) => {
  // add-to-cart function
  const addToCart = () => {
    // add the requested product to cart if only the product doesn't already exist in cart
    if (![...initialCartState].includes(payload)) {
      initialCartState.add(payload);
      //update and show the number of items in cart
      cartItemLength.innerHTML = initialCartState.size;
      //copy the passed div-element to add to the cartSection
      let cartCard = cardItem.cloneNode(true);
      //hide the addToCart button in cart and add onclick function to removeFromCart button
      let twoButtons1 = cartCard.querySelector(".buttons1");
      twoButtons1.querySelector(".addToCart").style.display = "none";
      twoButtons1.querySelector(".removeFromCart").onclick = function () {
        cartSlice("REMOVE FROM CART", payload, cartCard);
      };

      //onclick event for increaseCount and decreaseCount buttons for current item
      let twoButtons2 = cartCard.querySelector(".buttons2");
      
      //initiate the item count value
      let itemCountValue;

      twoButtons2.querySelector(".increaseCount").onclick=function increaseCount(){
         //assigning the span-innertext to item count value and converting into a number
       itemCountValue = Number(
          cartCard.querySelector(".noOfItem").innerText
        );
        
        cartCard.querySelector(".noOfItem").innerText = itemCountValue + 1;
      }
      twoButtons2.querySelector(".decreaseCount").onclick=function decreaseCount(){
        //assigning the span-innertext to item count value and converting into a number
       itemCountValue = Number(
          cartCard.querySelector(".noOfItem").innerText
        );
     
        if (itemCountValue > 1) {
          cartCard.querySelector(".noOfItem").innerText = itemCountValue - 1;
        }
      }

       // add the div-element in cartSection
      cartSection.appendChild(cartCard);
      cardItem.querySelector(".noOfItem").innerText=1

     
    }else{
      alert("Already added to cart!")
    }
  };

  // remove from cart function
  const removeFromCart = () => {
    // check if the item exists in the cart or not
    if ([...initialCartState].includes(payload)) {
      // remove the product from cart
      initialCartState.delete(payload);
      //update and show the number of items in cart
      cartItemLength.innerHTML = initialCartState.size;
      // select the cartCard to remove from cart
      let cartCard = cartSection.querySelector(`#product-${payload.id}`);
      cartSection.removeChild(cartCard);
     
    } 
  
  };
//customised as per the actionType
  if (actionType === "ADD TO CART") {
    addToCart();
  } else {
    removeFromCart();
  }
};





// show all the products in products-section
const showAllProducts = async () => {
  //getting all products
  const products = await fetchProducts();

  // create a html-div element with the mentioned innerHTML per product
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    // assigning id to each product to keep track of it
    card.id = `product-${product.id}`;
    card.innerHTML = `<div class="image"><img src=${
      product.image
    } class="itemImg" alt="${product.title}"></div>
   <p class="title">${product.title}</p>
   <p class="category">Category : <span class="itemCategory">${
     product.category
   }</span></p>
   <p class="description">${product.description.slice(0, 100)}</p>
   <p class="price">Price : <span class="itemPrice">${product.price}</span></p>
   <p class="rating">Rating : <span class="itemRating">${product.rating.rate}(${
      product.rating.count
    })</span></p>
   <div class="buttons1">
       <button class="addToCart" >Add to Cart (+) </button> &nbsp;
       <button class="removeFromCart">Remove From Cart (-) </button>
   </div>
   <div class="buttons2">
   <button class="increaseCount" onclick="increaseCount(${
     product.id
   })" title="Increase the no. of item(s)" >+</button> &nbsp;
   no. of item(s) : <span class="noOfItem">1</span>
   <button class="decreaseCount" onclick="decreaseCount(${
     product.id
   })" title="Decrease the no. of item(s)" >-</button>
   </div>`;

   // add to cart action on button click
    const addToCartBtn = card.querySelector(".addToCart");
    addToCartBtn.onclick = function () {
      cartSlice("ADD TO CART", product, card);
    };

    // remmove from cart action on button click
    const removeFromCartBtn = card.querySelector(".removeFromCart");
    removeFromCartBtn.onclick = function removeFromCart() {
      cartSlice("REMOVE FROM CART", product, card);
    };
//adding the div to the produts section
    productsSection.appendChild(card);
  });
};

//show all products in products-section
showAllProducts();
