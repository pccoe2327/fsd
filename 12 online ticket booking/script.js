let selectedMovie = "";
let ticketPrice = 0;
let selectedSeats = 0;

// 🎥 Select movie
function selectMovie(name, price) {
  selectedMovie = name;
  ticketPrice = price;

  document.getElementById("movie").innerText = name;
  updateTotal();
}

// 🎟️ Generate seats
let seatContainer = document.getElementById("seats");

for (let i = 1; i <= 40; i++) {
  let seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = i;

  seat.onclick = function () {
    seat.classList.toggle("selected");

    if (seat.classList.contains("selected")) {
      selectedSeats++;
    } else {
      selectedSeats--;
    }

    document.getElementById("seatCount").innerText = selectedSeats;
    updateTotal();
  };

  seatContainer.appendChild(seat);
}

// 💰 Total calculation
function updateTotal() {
  let total = selectedSeats * ticketPrice;
  document.getElementById("total").innerText = total;
}