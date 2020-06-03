// https://servicodados.ibge.gov.br/api/v1/localidades/estados

function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option> ";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const colectedItems = document.querySelector("input[name=items");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  // adicionar ou remover uma classe com javaScript
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  // Verificar se existem itens selecionados, se sim
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  // Se ja estiver selecionado
  if (alreadySelected >= 0) {
    // tirar da selecao
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });

    selectedItems = filteredItems;
  } else {
    // se não estiver selecionado, adicionar à selecao
    // adicionar a selecao
    selectedItems.push(itemId);
  }

  // atualizar campos escondidos com os itens selecionados
  colectedItems.value = selectedItems;
}
