const FATOR_LIMITE = 6;   // limite de compra = renda mensal x 6
const MAX_CLIENTES = 10;  // máximo de análises por vez

let analises = [];

const formulario = document.getElementById("formulario");
const secaoResultado = document.getElementById("resultado");
const resTitulo = document.getElementById("resTitulo");
const resTexto = document.getElementById("resTexto");
const semAnalises = document.getElementById("semAnalises");
const lista = document.getElementById("lista");

function formatarReais(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function analisarCredito(renda, preco) {
  const limite = renda * FATOR_LIMITE;
  const aprovado = preco <= limite;
  return { limite: limite, aprovado: aprovado };
}

function mostrarAviso(classe, titulo, texto) {
  secaoResultado.className = "cartao " + classe;
  resTitulo.textContent = titulo;
  resTexto.textContent = texto;
}

function mostrarResultado(analise) {
  if (analise.aprovado) {
    mostrarAviso(
      "aprovado",
      "Crédito aprovado!",
      "Parabéns, " + analise.nome + "! Seu crédito foi aprovado para o veículo " + analise.modelo + "."
    );
  } else {
    mostrarAviso(
      "reprovado",
      "Crédito reprovado por renda insuficiente",
      "O limite de compra é " + formatarReais(analise.limite) +
      " e o veículo custa " + formatarReais(analise.preco) + "."
    );
  }
}

function mostrarRelatorio() {
  lista.innerHTML = ""; // limpa a lista antes de montar de novo
  semAnalises.classList.toggle("escondido", analises.length > 0);

  for (let i = 0; i < analises.length; i++) {
    const a = analises[i];
    const item = document.createElement("li");
    item.className = a.aprovado ? "ok" : "nao";
    item.textContent =
      (i + 1) + ". " + a.nome + " | " + a.modelo + " | " + formatarReais(a.preco) +
      " | Limite: " + formatarReais(a.limite) + " | " + (a.aprovado ? "Aprovado" : "Reprovado");
    lista.appendChild(item);
  }
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar

  const nome = document.getElementById("nome").value.trim();
  const modelo = document.getElementById("modelo").value.trim();
  const renda = Number(document.getElementById("renda").value);
  const preco = Number(document.getElementById("preco").value);

  if (analises.length >= MAX_CLIENTES) {
    mostrarAviso("reprovado", "Limite atingido",
      "Só é possível fazer " + MAX_CLIENTES + " análises por vez. Recarregue a página para recomeçar.");
    return;
  }

  if (nome === "" || modelo === "") {
    mostrarAviso("reprovado", "Dados incompletos", "Preencha o nome e o modelo do veículo.");
    return;
  }

  const resultado = analisarCredito(renda, preco);

  const analise = {
    nome: nome,
    modelo: modelo,
    renda: renda,
    preco: preco,
    limite: resultado.limite,
    aprovado: resultado.aprovado
  };

  analises.push(analise);  
  mostrarResultado(analise);
  mostrarRelatorio();
  formulario.reset();      
});
