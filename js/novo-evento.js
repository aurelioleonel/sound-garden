//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página novo evento

//Laço para deixar todos os inputs com obrigatoriedade
const inputTags = document.querySelectorAll("input");
inputTags.forEach((input) => {
  input.setAttribute("required", "");
});

//Essas contantes são usadas no arquivo main-eventos.js
const nomeEvento = document.querySelector("#nome");
const artistas = document.querySelector("#atracoes");
const descricao = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const reservaEvento = document.querySelector("#lotacao");
const formNewEvent = document.querySelector("form");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".my-modal");

//Link da API
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

//Função para gravar os dados na API
formNewEvent.onsubmit = async (event) => {
  event.preventDefault();

  //Enviado para a função o metodo = POST e endpoint = "/events"
  enviarEvento("POST", "/events");
};
