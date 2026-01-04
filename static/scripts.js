function checkLogin() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  let userError = document.getElementById("userError");
  let passError = document.getElementById("passError");

  userError.innerHTML = "";
  passError.innerHTML = "";

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (user === "") {
    userError.innerHTML = "Enter email";
    return false;
  }
  if (!emailPattern.test(user)) {
    userError.innerHTML = "Invalid email";
    return false;
  }
  if (pass === "") {
    passError.innerHTML = "Enter password";
    return false;
  }
  if (pass !== "123") {
    passError.innerHTML = "Wrong password";
    return false;
  }

  window.location.href = "/menu";
  return false;
}


const prices = { b:150, p:200, j:80, s:130, f:90, i:100 };

function updateCart() {
  let tbody = document.getElementById("cart-items");
  tbody.innerHTML = "";
  let total = 0;

  for (let id in prices) {
    let qty = parseInt(document.getElementById(id).innerText);
    if (qty > 0) {
      let amount = qty * prices[id];
      total += amount;

      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${getFoodName(id)}</td>
        <td>₹${prices[id]}</td>
        <td>${qty}</td>
        <td>₹${amount}</td>
      `;
      tbody.appendChild(row);
    }
  }

  document.getElementById("total").innerHTML = total;
  console.log(total);
  document.getElementById("billBtn").disabled = total === 0;
}

// function showTotal() {
//   let cart = {};

//   for (let id in prices) {
//     let qty = parseInt(document.getElementById(id).innerText);
//     if (qty > 0) cart[id] = qty;
//   }

//   fetch("/show-total", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(cart)
//   })
//   .then(res => res.json())
//   .then(data => {
//     let box = document.getElementById("cart-items");
//     box.innerHTML = "";

//     data.items.forEach(i => {
//       box.innerHTML += `
//         <div class="cart-item">
//           <span>${i.name}</span>
//           <span>${i.price}</span>
//           <span>${i.qty}</span>
//           <span>₹${i.amount}</span>
//         </div>
//       `;
//     });

//     document.getElementById("total").innerText = data.total;
//     document.getElementById("billBtn").disabled = false;
//   });
// }

function printBill() {
  let cart = {};

  for (let id in prices) {
    let qty = parseInt(document.getElementById(id).innerText);
    if (qty > 0) cart[id] = qty;
  }

  fetch("/print-bill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart)
  })
  .then(res => res.json())
  .then(data => {

    document.getElementById("invoiceNumber").innerText = data.invoice;
    document.getElementById("receiptDateTime").innerText = data.datetime;
    document.getElementById("receipt-total").innerText = data.total;

    let box = document.getElementById("receipt-items");
    box.innerHTML = "";

    data.items.forEach(i => {
      box.innerHTML += `
        <div class="receipt-row">
          <span>${i.name}</span>
          <span>${i.price}</span>
          <span>${i.qty}</span>
          <span>${i.amount}</span>
        </div>
      `;
    });

    document.getElementById("receiptBox").style.display = "block";
    window.print();
  });
}

function increase(id) {
  let c = document.getElementById(id);
  c.innerText = parseInt(c.innerText) + 1;
  updateCart();
}

function decrease(id) {
  let c = document.getElementById(id);
  if (parseInt(c.innerText) > 0) {
    c.innerText = parseInt(c.innerText) - 1;
    updateCart();
  }
}

function getFoodName(id) {
  return {
    b:"Burger", p:"Pizza", j:"Juice",
    s:"Sandwich", f:"Fries", i:"Ice Cream"
  }[id];
}

function logout() {
  window.location.href = "/";
}
