let total = 0;

function addToCart(name, price) {

  total += price;

  document.getElementById("cart").innerHTML += 
    `<div class="cart-item">${name} - ₹${price}</div>`;

  document.getElementById("total").innerText = total;
}

 or


let total = 0;
let count = 0;

function addToCart(name, price) {
  total += price;
  count++;

  document.getElementById("cart").innerHTML +=
    `<div class="cart-item" id="item-${count}">
        ${name} - ₹${price}
        <button onclick="removeItem('item-${count}', ${price})" 
        style="float:right; border:none; background:red; color:white; border-radius:5px;">X</button>
     </div>`;

  document.getElementById("total").innerText = total;
}

function removeItem(id, price) {
  let item = document.getElementById(id);

  if (item) {
    item.remove();
    total -= price;

    if (total < 0) total = 0;

    document.getElementById("total").innerText = total;
  }
}

function filterItems(type) {
  let items = document.querySelectorAll(".item");

  items.forEach(item => {
    if (type === "All" || item.classList.contains(type)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}