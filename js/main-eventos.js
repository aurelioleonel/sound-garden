//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página dos eventos GET, POST, PUT, DELETE

// carrega a quantidadde de eventos de acordo com parametro "cards"
// essa função é para a pagina principal "index.html" e todos eventos "eventos.html"
const carregarEventos = async (cards, index) => {
  try {
    const linkEventos = await fetch(`${BASE_URL}/events`, { method: "GET" });
    const linkEventosJson = await linkEventos.json();
    gifAnimado.style.display = "none";

    // laço para implementar os eventos na página
    for (let i = index; i < cards; i++) {
      const DataEvento = new Date(linkEventosJson[i].scheduled);

      divEvents.insertAdjacentHTML(
        "beforeend",
        `
                <article class="evento card p-5 m-3">
                    <h2 id="nomeData">
                        ${linkEventosJson[i].name
        } - ${DataEvento.toLocaleDateString("pt-br")}
                    </h2>
                    <h4 id="atracoes">
                        ${linkEventosJson[i].attractions}
                    </h4>
                    <p id="descricao">
                        ${linkEventosJson[i].description}
                    </p>
                    <p class="senhas">
                        Senhas disponiveis: ${linkEventosJson[i].number_tickets}
                    </p>
                    <a id="botao" data-id="${linkEventosJson[i]._id
        }" class="btn btn-primary open">
                        reservar ingressos
                    </a>
                </article>
            `
      );
    }

    //Criando a classe "open" para o botão reservar ingressos
    const open = document.querySelectorAll(".open");
    //Reseta as constantes do Modal
    reloadModal();
    open.forEach((elemento) => {
      elemento.addEventListener("click", async () => {
        const responseEventId = await fetch(
          `${BASE_URL}/events/${elemento.getAttribute("data-id")}`,
          { method: "GET" }
        );

        const contentResponseEventId = await responseEventId.json();
        subtitle.innerHTML = contentResponseEventId.name;

        modalContainer.classList.add("show");
        send.setAttribute("data-id", `${elemento.getAttribute("data-id")}`);
      });
    });
  } catch (error) {
    console.log(error);
    carregando.style.display = "none";
    alert("Ocorreu um erro de " + error);
  }
};

//Função usada para o modal quando aciona o botão "resevar evento"
const novaReserva = async () => {
  try {
    const reserva = {
      owner_name: nameUser.value,
      owner_email: emailUser.value,
      number_tickets: ticketsUser.value,
      event_id: send.getAttribute("data-id"),
    };

    const options = {
      method: "POST",
      body: JSON.stringify(reserva),
      headers: {
        "Content-Type": "application/json",
      },
    };

    modal.innerHTML = myModal;
    const loadingModal = document.querySelector("#loadingModal");
    loadingModal.style.display = "block";

    const responseBookings = await fetch(`${BASE_URL}/bookings`, options);
    gifAnimado.style.display = "none";

    alert("Evente reservado com successo!!!");
    window.location.reload();

    modalContainer.classList.remove("show");

  } catch (error) {
    console.log(error);
    modalContainer.classList.remove("show");

    alert("Ocorreu um erro de " + error);
  }
};

//função para cadastra um novo evento no painel administradtivo "admin.html"
//Usada tambem no editar-evento.html
const enviarEvento = async (sendMethod, endPoint) => {
  try {
    //essas constantes estão no arquivo novo-evento.js
    const evento = {
      name: nomeEvento.value,
      poster: "Link do banner",
      attractions: artistas.value.split(", "),
      description: descricao.value,
      scheduled: dataEvento.value,
      number_tickets: reservaEvento.value,
    };

    const options = {
      method: sendMethod,
      body: JSON.stringify(evento),
      headers: {
        "Content-Type": "application/json",
      },
    };

    modal.insertAdjacentHTML("afterbegin", myModal);

    modalContainer.classList.add("show");

    const loadingModal = document.querySelector("#loadingModal");
    loadingModal.style.display = "block";

    //Enviado os dados para a API
    const responseEvent = await fetch(`${BASE_URL}${endPoint}`, options);

    modalContainer.classList.remove("show");

    alert("Evento registrado com sucesso!!!");
    window.location.href = "admin.html"; //chama novamente o form com os inputs vazio
  } catch (error) {
    console.log(error);
    modalContainer.classList.remove("show");

    alert("Ocorreu um erro de " + error);
  }
};


//Função usada no editar-evento.js e exclur-evento.js
const buscarDadosEventos = async () => {
  try {
    const responseEvent = await fetch(`${BASE_URL}/events/${ID_ATUAL[1]}`, {
      method: "GET",
    });
    const contentResponseEvent = await responseEvent.json();
    loading.style.display = "none";

    const {
      name,
      poster,
      attractions,
      description,
      scheduled,
      number_tickets,
    } = await contentResponseEvent;

    nomeEvento.value = name;
    bannerEvent.value = poster;
    artistas.value = attractions;
    descricao.value = description;
    dataEvento.value = retornarData(scheduled); //formatDate(scheduled); //constantes.js;
    reservaEvento.value = number_tickets;
  } catch (error) {
    console.log(error);
    loading.style.display = "none";
    alert("Ocorreu um erro de " + error);
  }
};

//Reseta as constantes do Modal
function reloadModal() {
  nameUser.value = "";
  emailUser.value = "";
  ticketsUser.value = "";

}