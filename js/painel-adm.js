//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página painel administrativo

const elemento = document.querySelector("body");
const tabela = document.querySelector("#tabelaEventos");
const gifAnimado = document.querySelector("#gifAnimado");

gifAnimado.style.display = "block"; //Carregando GIF

//Link da API
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

elemento.onload = async () => {
  try {
    //Constantes para consumir a API
    const linkEventos = await fetch(`${BASE_URL}/events`, { method: "GET" });
    const linkEventosJson = await linkEventos.json();
    gifAnimado.style.display = "none";

    //Laço para preencher a tabela com os dados
    for (let index = 0; index < 10; index++) {
      //A data do evento será formatada para dd/mm/yyyy
      const dataEvento = new Date(linkEventosJson[index].scheduled);

      //Construido a tabela com os eventos
      // o id de cada botão é o proprio id de cada evento que esta na API
      // para facilitar a exclusão, alteração e ver as reservas
      tabela.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
        <th scope="row">
            ${index + 1}
        </th>
        <td>
             ${dataEvento.toLocaleDateString("pt-BR")}
             
        </td>
        <td>
            ${linkEventosJson[index].name}
        </td>
        <td>
            ${linkEventosJson[index].attractions}
        </td>
        <td> 
            <a href="reservas.html?id=${linkEventosJson[index]._id}" class="btn btn-dark"> ver reservas</a>
           <a href="editar-evento.html?id=${linkEventosJson[index]._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${linkEventosJson[index]._id}" class="btn btn-danger">excluir</a>
        </td>
    </tr>
        
        `
      );
    }
  } catch (error) {
    console.log(error);
    gifAnimado.style.display = "none";
    alert("Ocorreu um erro de " + error);
  }
};
