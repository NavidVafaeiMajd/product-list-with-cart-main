let productItem=[
    {
        productName: "Waffle with Berries",
        category:"Waffle",
        price: "$ 6.50",
        photo: "waffle-desktop.jpg"
    },
    {
        productName: "Vanilla Bean Crème Brûlée",
        category:"Crème Brûlée",
        price: "$ 7.00",
        photo: "creme-brulee-desktop.jpg"
    },
    {
        productName: "Macaron Mix of Five",
        category:"Macaron",
        price: "$ 8.00",
        photo: "macaron-desktop.jpg"
    },
    {
        productName: "Classic Tiramisu",
        category:"Tiramisu",
        price: "$ 5.50",
        photo: "tiramisu-desktop.jpg"
    },
    {
        productName: "Pistachio Baklava",
        category:"Baklava",
        price: "$ 4.00",
        photo: "baklava-desktop.jpg"
    },
    {
        productName: "Lemon Meringue Pie",
        category:"Pie",
        price: "$ 5.00",
        photo: "meringue-desktop.jpg"
    },
    {
        productName: "Red Velvet Cake",
        category:"Cake",
        price: "$ 4.50",
        photo: "cake-desktop.jpg"
    },
    {
        productName: "Salted Caramel Brownie",
        category:"Brownie",
        price: "$ 4.50",
        photo: "brownie-desktop.jpg"
    },
    {
        productName: "Vanilla Panna Cotta",
        category:"Panna Cotta",
        price: "$ 6.50",
        photo: "panna-cotta-desktop.jpg"
    }
]
//build automatic carts
var count = 1
productItem.map((item)=>{
    document.getElementById("main-list-of-cart").innerHTML = document.getElementById("main-list-of-cart").innerHTML+ 
 `
 <div class="cart">
<div id="cart-img">
 <img src="assets/images/image-${item.photo}" alt="">
</div>
<div id="add-to-cart">
 <a class="add-to-cart-button"> Add to Cart</a>
</div>
<div id="cart-cat">
 <span>${item.category}</span>
</div>
<div id="cart-title">
 ${item.productName}
</div>
<div id="cart-price">
 <b>${item.price}</b>
</div>
</div>`;

count++

})
//managment add to cart button
let cartCount = 1;

/////json


document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", (e) => {
        if (!button.classList.contains("add-to-cart-button-active")) {
            //count right side title
            const totalCartTitleCount = (document.getElementById("total-cart-main").children.length) - 1;
            document.getElementById("total-cart-title-count").innerText = ` ( ${totalCartTitleCount} ) `;
            //confirm button section
            document.getElementById("total-cart-button").innerHTML=`
            <div id="total-cart-button-number">
            <span id="total-cart-button-number-left">Order Total</span>
            <span id="total-cart-button-number-right">$46.5</span>
            </div>
            <div id="total-cart-button-allert">
                <p>This is a <b>carbon-neutral</b> delivery</p>
            </div>
            <div >
            <button id="total-cart-button-confirm">Confirm Order</button>
            `;
            document.getElementById("total-cart-button-confirm").addEventListener("click" , (e)=>{

            })
            //get element of cart
            let productElement = e.currentTarget.parentElement.parentElement;
            const productTitle = productElement.children[3].innerText;
            const productPrice = parseFloat(productElement.children[4].innerText.replace('$', ''));
            const currentCartImg = e.currentTarget.parentElement.parentElement.children[0];
            currentCartImg.children[0].style.border = "3px solid hsl(14, 86%, 42%)";

            //change button setting
            button.classList = "add-to-cart-button-active";
            let cartCount = 1;
            button.innerHTML = `
                <img class="decrement-button" src="assets/images/icon-decrement-quantity.svg" alt="">
                <span>${cartCount}</span>
                <img class="increment-button" src="assets/images/icon-increment-quantity.svg" alt="">
            `;

            // Create and add new cart item
            const newCartItem = document.createElement("div");
            newCartItem.className = "row-of-product";
            newCartItem.innerHTML = `
                <div class="right-row-of-products">
                    <b><p class="right-row-of-products-title">${productTitle}</p></b>
                    <span class="amount-of-cart">${cartCount}x</span> <span class="price-of-cart">@ ${productPrice}.00</span> <span class="total-price-of-cart">$${cartCount * productPrice}.00</span>
                </div>
                <div class="left-row-of-products">
                    <img class="left-row-of-products-img" src="assets/images/icon-remove-item.svg" alt="">
                </div>
                
            `;
            document.getElementById("total-cart-main").appendChild(newCartItem);

            const updateCartDisplay = () => {
                newCartItem.querySelector(".amount-of-cart").innerText = `${cartCount}x`;
                newCartItem.querySelector(".total-price-of-cart").innerText = `$${(cartCount * productPrice).toFixed(2)}`;
                updateTotalOrderPrice();
            };

            // Increment button
            button.querySelector(".increment-button").addEventListener("click", (ei) => {
                cartCount++;
                button.querySelector("span").innerText = `${cartCount}`;
                updateCartDisplay();
            });

            // Decrement button
            button.querySelector(".decrement-button").addEventListener("click", (ei) => {
                if (cartCount > 1) {
                    cartCount--;
                    button.querySelector("span").innerText = `${cartCount}`;
                    updateCartDisplay();
                }
            });

            // Event listener for remove button
            newCartItem.querySelector(".left-row-of-products-img").addEventListener("click", (ei) => {
                newCartItem.remove();
                button.classList.remove("add-to-cart-button-active");
                button.innerHTML = "Add to Cart";
                currentCartImg.children[0].style.border = "none";
                const totalCartTitleCount = document.getElementById("total-cart-main").children.length - 2;
                document.getElementById("total-cart-title-count").innerText = ` ( ${totalCartTitleCount} ) `;
                if (totalCartTitleCount === 0) {
                    document.getElementById("total-cart-main-empty").style.display = "flex";
                    document.getElementById("total-cart-button").innerHTML = ``;
                }
                updateTotalOrderPrice();
            });

            // Hide empty cart message
            document.getElementById("total-cart-main-empty").style.display = "none";
            updateTotalOrderPrice();
        }
    });

    const updateTotalOrderPrice = () => {
        let totalOrderPrice = 0;
        document.querySelectorAll(".row-of-product").forEach((item) => {
            const itemPrice = parseFloat(item.querySelector(".total-price-of-cart").innerText.replace('$', ''));
            totalOrderPrice += itemPrice;
        });
        document.getElementById("total-cart-button-number-right").innerText = `$${totalOrderPrice.toFixed(2)}`;
        document.getElementById("total-cart-button-confirm").addEventListener("click" , (e)=>{
            const totalCartContent = document.getElementById("total-cart-main").innerHTML 
            document.getElementById("main-conetent-item").innerHTML = totalCartContent
            document.getElementById("popup").style.display = "flex";
        })
    };
});

