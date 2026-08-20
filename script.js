const form = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Pega os produtos que já estão salvos
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Mostra os produtos assim que a página abrir
mostrarProdutos();

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;

  if (nome === "" || preco === "" || quantidade === "") {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  if (Number(preco) < 0 || Number(quantidade) < 0) {
    alert("⚠️ Preço e quantidade não podem ser negativos!");
    return;
  }

  const produto = {
    nome: nome,
    preco: Number(preco),
    quantidade: Number(quantidade)
  };

  produtos.push(produto);

  // Salva no navegador
  localStorage.setItem("produtos", JSON.stringify(produtos));

  mostrarProdutos();

  form.reset();
});

function mostrarProdutos() {
  listaProdutos.innerHTML = "";

  produtos.forEach(function(produto, indice) {

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
      <td>${produto.quantidade}</td>
      <td>
        <button onclick="editarProduto(${indice})">
          ✏️ Editar
        </button>

        <button onclick="excluirProduto(${indice})">
          🗑️ Excluir
        </button>
      </td>
    `;

    listaProdutos.appendChild(linha);
  });
}

function excluirProduto(indice) {
  const confirmar = confirm(
    "Tem certeza que deseja excluir este produto?"
  );

  if (confirmar) {
    produtos.splice(indice, 1);

    // Atualiza o armazenamento
    localStorage.setItem("produtos", JSON.stringify(produtos));

    mostrarProdutos();
  }
}

function editarProduto(indice) {
  const produto = produtos[indice];

  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("quantidade").value = produto.quantidade;

  produtos.splice(indice, 1);

  // Atualiza o armazenamento
  localStorage.setItem("produtos", JSON.stringify(produtos));

  mostrarProdutos();

  document.getElementById("nome").focus();
}
