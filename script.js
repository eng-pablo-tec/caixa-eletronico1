// Agora o saldo está fora da função, como uma variável global
let saldoAtual = 1500;

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const cartao = document.getElementById("cartao").value;
  const senha = document.getElementById("senha").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const acao = document.getElementById("acao").value;

  let mensagem = "";

  if (cartao === "" || senha === "" || isNaN(valor)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (acao === "saldo") {
    mensagem = `Seu saldo é R$ ${saldoAtual.toFixed(2)}`;
  } else if (acao === "sacar") {
    if (valor > saldoAtual) {
      mensagem = "Saldo insuficiente!";
    } else {
      saldoAtual -= valor;
      mensagem = `Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`;
    }
  }

  document.getElementById("mensagem").textContent = "Retire seu comprovante.";
  gerarComprovante(cartao, acao, valor, saldoAtual, mensagem);
});

function gerarComprovante(cartao, acao, valor, saldo, mensagemFinal) {
  const div = document.getElementById("comprovante");
  div.style.display = "block";

  const hora = new Date().toLocaleString("pt-BR");
  div.innerHTML = `
    <h3>Comprovante de ${acao === "saldo" ? "Consulta de Saldo" : "Saque"}</h3>
    <p>Cartão: **** **** **** ${cartao.slice(-4)}</p>
    <p>Ação: ${acao}</p>
    <p>Valor: R$ ${valor.toFixed(2)}</p>
    <p>Saldo atual: R$ ${saldo.toFixed(2)}</p>
    <p>Data/Hora: ${hora}</p>
    <p>Mensagem: ${mensagemFinal}</p>
  `;

  html2canvas(div).then(canvas => {
    const link = document.createElement('a');
    link.download = 'comprovante.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
