//Construção do site da SoundGarden
//Marcos Aurélio, Júlia Alberton, Vanilson Lins

//Página constates

//Concatena a data do evento + a hora para enviar para o padrão da API
//Só assim consegue gravar na API
function retornarData(data) {
  let soData = new Date(data);
  let novaData = `${soData.getUTCFullYear()}-${(soData.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${soData.getUTCDate().toString().padStart(2, "0")} `;
  // yyyy-mm-dd

  let novaHora = `${soData.getUTCHours().toString().padStart(2, "0")}:${soData
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}`;

  return novaData + novaHora;
}

//Funções para formatar data
const formatNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  }

  return number;
};

const formatDate = (date) => {
  const newDate = new Date(date);

  return (
    `${newDate.getFullYear()}-${formatNumber(
      newDate.getMonth() + 1
    )}-${formatNumber(newDate.getDate())}` +
    `T${formatNumber(newDate.getHours())}:${newDate.getMinutes()}`
  );
};

//Insere a div para o gif animado
const myModal = `
    <div class="close">
        <a id="close"> X </a>
    </div>
    <div id="gif">
        <img src="img/carregando.gif" id="loadingModal" alt="Carregando Gif" />
    </div>
`;
