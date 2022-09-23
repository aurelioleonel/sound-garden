//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página excluir evento

//Laço para deixar todos os inputs com obrigatoriedade
const inputTags = document.querySelectorAll("input");
inputTags.forEach((input) => {
  input.setAttribute("required", "");
});

//constantes
const nomeEvento = document.querySelector("#nome");
const bannerEvent = document.querySelector("#banner");
const artistas = document.querySelector("#atracoes");
const descricao = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const reservaEvento = document.querySelector("#lotacao");
const formDelete = document.querySelector("form");
const body = document.querySelector("body");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".my-modal");
const carregando = document.querySelector("#loading");

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const ID_ATUAL = window.location.search.split("=");

carregando.style.display = "block"; //Carregando Gif

//Função usada no main-eventos
body.onload = buscarDadosEventos(); //main-eventos.js

formDelete.onsubmit = async (event) => {
  event.preventDefault();

  //Caixa de dialogo para confirmação da exclusão
  const resultado = confirm(
    "Você esta prestes a excluir o evento e suas reservas!\nDeseja excluir o evento: " +
    nomeEvento.value +
    " ?"
  );
  if (resultado == true) {
    try {
      modal.insertAdjacentHTML("afterbegin", myModal);
      modalContainer.classList.add("show");

      const loadingModal = document.querySelector("#loadingModal");
      loadingModal.style.display = "block";

      //Excluiremos primeiro as reservas do evento
      const respostaListaReservas = await fetch(
        `${BASE_URL}/bookings/event/${ID_ATUAL[1]}`,
        { method: "GET" }
      );
      //Montando o Json com todas as reservas do evento selecionado
      const respostaListaReservasJson = await respostaListaReservas.json();

      //Excluindo todas as reservas do evento selecionado
      respostaListaReservasJson.forEach((index) => {
        const idEvento = index._id;
        const excluirReservas = fetch(`${BASE_URL}/bookings/${idEvento}`, {
          method: "DELETE",
        });
      });

      //Excluindo o evento
      const excluirEvento = await fetch(`${BASE_URL}/events/${ID_ATUAL[1]}`, {
        method: "DELETE",
      });
      alert("Evento excluido com sucesso!!!");
      window.location.href = "admin.html"; // apos a exclusão retorna para o painel administrativo
    } catch (error) {
      console.log(error);
      modalContainer.classList.remove("show");
      alert("Ocorreu um erro de " + error);
    }
  } //Fim do if
};
