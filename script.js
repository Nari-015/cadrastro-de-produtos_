const form = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

let produtos = [];

// CADASTRAR PRODUTO
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;

  // VALIDAÇÃO
  if (nome === "" || preco === "" || quantidade === "") {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  if (Number(preco) < 0 || Number(quantidade) < 0) {
    alert("⚠️ Preço e quantidade não podem ser negativos!");
    return;
  }

  // CRIAR PRODUTO
  const produto = {
    nome: nome,
    preco: Number(preco),
    quantidade: Number(quantidade)
  };

  // ADICIONAR À LISTA
  produtos.push(produto);

  // ATUALIZAR TABELA
  mostrarProdutos();

  // LIMPAR FORMULÁRIO
  form.reset();
});


// MOSTRAR PRODUTOS
function mostrarProdutos() {

  listaProdutos.innerHTML = "";

  produtos.forEach(function(produto, indice) {

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${produto.nome}</td>

      <td>
        R$ ${produto.preco.toFixed(2).replace(".", ",")}
      </td>

      <td>
        ${produto.quantidade}
      </td>

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


// EXCLUIR PRODUTO
function excluirProduto(indice) {

  const confirmar = confirm(
    "Tem certeza que deseja excluir este produto?"
  );

  if (confirmar) {

    produtos.splice(indice, 1);

    mostrarProdutos();
  }
}


// EDITAR PRODUTO
function editarProduto(indice) {
