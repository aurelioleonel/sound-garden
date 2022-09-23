//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página reservas para evento

const elemento = document.querySelector("body");
const tabelaListaReserva = document.querySelector("#tabela-eventos");
const gifAnimado = document.querySelector("#loading");

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

//separa o id da URL para procurar somente as reservas do evento selecionado
const ID_ATUAL = window.location.search.split("=");

gifAnimado.style.display = "block"; //Loading Gif

//monta a tabela com as reserva do event selcionad
elemento.onload = async () => {
  try {
    //Monta as reservas de acordo com a documentação da API
    const respostaListaReservas = await fetch(
      `${BASE_URL}/bookings/event/${ID_ATUAL[1]}`,
      { method: "GET" }
    );

    //Montando o Json
    const respostaListaReservasJson = await respostaListaReservas.json();
    gifAnimado.style.display = "none";

    //populariza a tabela com as reservas do evento selecionado
    respostaListaReservasJson.forEach((tagTd, index) => {
      tabelaListaReserva.insertAdjacentHTML(
        "beforeend",
        `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${tagTd.owner_name}</td>
                    <td>${tagTd.owner_email}</td>
                    <td>${tagTd.number_tickets}</td>
                </tr>
            `
      );
    });
  } catch (error) {
    console.log(error);
    gifAnimado.style.display = "none";
    alert("Ocorreu um erro de " + error);
  }
};
