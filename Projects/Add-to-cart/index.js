
/*

   // some basic things

*/
// products section elements
const productsSection=document.querySelector(".products");
const productsH=document.querySelector(".productsH");
const homeMenu=document.querySelector(".home-menu");

// cart section elements
const cartSection=document.getElementById("Cart");
const cartH = document.querySelector(".cartH");
const cartMenu = document.querySelector(".cart-menu");


// hide cart section onload
document.body.onload=function(){
    cartH.style.display="none"
 cartSection.style.display="none"
}

// show cart section on clicking the cart menu on navbar
cartMenu.onclick=function(){
    productsH.style.display="none"
    productsSection.style.display="none"
    cartH.style.display="flex"
    cartSection.style.display="flex"
}

// show products section on clicking the home menu on navbar
homeMenu.onclick=function(){
    cartH.style.display="none"
    cartSection.style.display="none"
    productsH.style.display="flex"
    productsSection.style.display="flex"
}

/*


// data of all products to show


*/

// const shopItemsData = [
//     {
//       id: 1,
//       name: "Casual Shirt",
//       price: 45,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.lorem20 means by itself even",
//       img: "https://images.pexels.com/photos/899357/pexels-photo-899357.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 2,
//       name: "Office Shirt",
//       price: 100,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 3,
//       name: "T Shirt",
//       price: 25,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/2356344/pexels-photo-2356344.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 4,
//       name: "Mens Suit",
//       price: 300,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/4894829/pexels-photo-4894829.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 5,
//       name: "Womens Jewellery",
//       price: 3900,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/15181110/pexels-photo-15181110/free-photo-of-woman-in-traditional-bridal-saree-dress.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id:6,
//       name: "Womens Saree",
//       price: 6000,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/10637779/pexels-photo-10637779.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 7,
//       name: "Bag",
//       price: 600,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 8,
//       name: "Backpack",
//       price: 300,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id:9,
//       name: "Womens Ring",
//       price: 20000,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 10,
//       name: "Womens Earrings",
//       price: 4000,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id: 11,
//       name: "Smart Watches",
//       price: 2000,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       id:12,
//       name: "Earpods",
//       price: 6000,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//       img: "https://images.pexels.com/photos/16703772/pexels-photo-16703772/free-photo-of-close-up-of-wireless-earphones-and-case.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//     },
//   ];

const fetchProducts=async()=>{
  try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products= await response.json();
      return products;


  } catch (error) {
      console.log(error)
  }
}

const shopItemsData = await fetchProducts();











 // cart slice 





  // initiate cart products count | only unique items will be added
  const itemsInCart= new Set();
  let basket= JSON.parse(localStorage.getItem("cartItems")) || []

// length of cart items
const cartitemLength=document.querySelector(".itemLength");

// render products in cart section
  const showCartProducts=(product,id)=>{
    
   

    
    itemsInCart.forEach((id)=>{
      if(product.id===id){
       

      const cartCard = document.createElement("div");
      cartCard.classList.add("card");
      cartCard.innerHTML=`<div class="image"><img src=${product.img}  class="itemImg" alt=${product.name}></div>
      <p class="title">${product.name}</p>
      <p class="description">${product.desc}</p>
      <p class="price">Price : <span class="itemPrice">${product.price}</span></p>
      <div class="buttons1">
      <button class="removeFromCart" >Remove From Cart (-) </button>
  </div>
      <div class="buttons2">
          <button class="addItemNo" title="Increase Item No">+</button>
          <span class="noOfItem">1</span>
          <button class="decreaseItemNo" title="Decrease Item No">-</button>
      </div>`

      const removeFromCartBtn=cartCard.querySelector(".removeFromCart");

      
      cartSection.appendChild(cartCard);
      
      removeFromCartBtn.addEventListener("click",()=>{
        removeFromCart(product,(product.id));
        cartSection.removeChild(cartCard);
      })
      //  localStorage.setItem("cartProducts",JSON.stringify([...itemsInCart]))
    }
  })
  

}
      
       
  

  const addToCart=(product,id)=>{
   

      itemsInCart.add(id)
      cartitemLength.innerHTML=itemsInCart.size;
      console.log(itemsInCart);
     
      showCartProducts(product,id)
  
      
    
     
  }
  
  const removeFromCart=(product,id)=>{
      itemsInCart.forEach((id)=>{
          if(product.id===id){

            itemsInCart.delete(id)
          }
      })
      cartitemLength.innerHTML=itemsInCart.size
      console.log(itemsInCart);

    
      showCartProducts(product,id)

   

  }


  //function on how to show data 
 
  const getAllProducts=()=>{
  
    shopItemsData.forEach((product)=>{
     
        const productCard=document.createElement("div");
        productCard.classList.add("card");
        productCard.innerHTML=`<div class="image"><img src=${product.img}  class="itemImg" alt=${product.name}></div>
        <p class="title">${product.name}</p>
        <p class="description">${product.desc}</p>
        <p class="price">Price : <span class="itemPrice">${product.price}</span></p>
        <div class="buttons1">
            <button class="addToCart" >Add to Cart (+) </button> &nbsp;
        </div>
        <div class="buttons2">
            <button class="addItemNo" title="Increase Item No">+</button>
            <span class="noOfItem">1</span>
            <button class="decreaseItemNo" title="Decrease Item No">-</button>
        </div>`
       
        const addToCartBtn=productCard.querySelector(".addToCart");
        addToCartBtn.addEventListener("click",()=>{
          addToCart(product,(product.id));
          basket.push(product);
           localStorage.setItem("cartItems",JSON.stringify(basket));

          if(itemsInCart.size===0){
            addToCartBtn.setAttribute("disabled","false")
          }else{
            addToCartBtn.setAttribute("disabled","true");

          }
        })
      
        
        
        
        productsSection.appendChild(productCard)
        
       

    })

  }

  getAllProducts();


