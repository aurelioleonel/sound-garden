//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página editar evento

//constantes
const nomeEvento = document.querySelector("#nome");
const bannerEvent = document.querySelector("#banner");
const artistas = document.querySelector("#atracoes");
const descricao = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const reservaEvento = document.querySelector("#lotacao");
const formEdit = document.querySelector("form");
const body = document.querySelector("body");
const inputTags = document.querySelectorAll("input");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".my-modal");
const carregando = document.querySelector("#loading");

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const ID_ATUAL = window.location.search.split("=");

carregando.style.display = "block"; //carregando Gif

//Função usada no main-eventos
body.onload = buscarDadosEventos(); //main-eventos.js

formEdit.onsubmit = async (event) => {
  event.preventDefault();

  enviarEvento("PUT", `/events/${ID_ATUAL[1]}`);
};
