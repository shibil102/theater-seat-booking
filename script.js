const container = document.querySelector(".container"); //selected container tag
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); //selected whole bunch of seats without occupied seats
const count = document.getElementById("count"); // selected count
const total = document.getElementById("total"); // selected total
const movieSelect = document.getElementById("movie"); // selected movie


let ticketPrice = +movieSelect.value; // got ticket price


// set index and value of movie store in local storage

const setMovieData = (index, value) => {
  localStorage.setItem('selectedMovieIndex', index)
  localStorage.setItem('selectedMovieValue', value)
}

// Movie select count

const updateSelectedValues = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
   
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)) 
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))

  const lengthOfseat = selectedSeats.length;
  count.innerText = lengthOfseat;
  total.innerText = lengthOfseat * ticketPrice;
};

// Get data from localstorage and populate UI

const populateUi = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
     if(selectedSeats.indexOf(index) > -1){
       seat.classList.add('selected')
     }
    })
  }

  const selectMovieIndex = localStorage.getItem('selectedMovieIndex')

  if(selectMovieIndex !== null) {
    movieSelect.selectedIndex = selectMovieIndex
  }

}

populateUi();


// Movie ticket price change handler

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedValues();
});

container.addEventListener("click", (e) => {
  //get the eventListner to the container
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedValues();
  }
});


updateSelectedValues()
