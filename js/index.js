//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página principal

// constates
const divEvents = document.querySelector("#events");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".my-modal");
const subtitle = document.querySelector("#subtitle");
const send = document.querySelector("#send");
const close = document.querySelector("#close");
const formNewBooking = document.querySelector("form");
const nameUser = document.querySelector("#name");
const emailUser = document.querySelector("#email");
const ticketsUser = document.querySelector("#tickets");
const gifAnimado = document.querySelector("#loading");
const divModal = document.querySelector(".limpaModal");

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

gifAnimado.style.display = "block"; //GIF wait

//Click do botão reservar ingrressos no Modal
close.addEventListener("click", () => {
  modalContainer.classList.remove("show");
  modalContainer.event.preventDefault()
});

//Ao pressionar a tecla Esc o fecha o modal
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Escape") {
    modalContainer.classList.remove("show");
    modalContainer.event.preventDefault()
  }
});

//Reseta as constantes do Modal
formNewBooking.onsubmit = async (event) => {
  novaReserva();
  event.preventDefault();

};


