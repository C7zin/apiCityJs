const key = "f4aa246a774ba7222f6a0b5d8078b217";

function cliqueiNoBotao() {
  const cidade = document.querySelector(".input-cidade").value;

  // Verifica se a cidade foi preenchida
  if (!cidade) {
    alert("Digite uma cidade");
    return; // Sai da função se não houver valor
  }

  buscarCidade(cidade); // Faz a busca somente se o campo não estiver vazio
}

// Função assíncrona para buscar dados da cidade
async function buscarCidade(cidade) {
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    );

    if (!resposta.ok) {
      throw new Error("Cidade não encontrada");
    }

    const dados = await resposta.json();
    colocarDadosNaTela(dados);
  } catch (erro) {
    alert("Erro ao buscar dados: " + erro.message);
  }
}

// Exibir os dados na tela
function colocarDadosNaTela(dados) {
  console.log(dados);
  document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
  document.querySelector(".temp").innerHTML =
    Math.floor(dados.main.temp) + "°C";
  document.querySelector(".texto-previsao").innerHTML =
    dados.weather[0].description;
  document.querySelector(".umidade").innerHTML = +dados.main.humidity + "%";
  document.querySelector(
    ".img-previsao"
  ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}
