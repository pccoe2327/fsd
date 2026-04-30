let total = 0;

function addToCart(name, price) {

  total += price;

  document.getElementById("cart").innerHTML += 
    `<div class="cart-item">${name} - ₹${price}</div>`;

  document.getElementById("cartTotal").innerText = total;
}