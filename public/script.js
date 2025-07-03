document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.querySelector("input[type='text']").value;

  if (!email.includes("@")) {
    alert("Digite um e-mail válido.");
    return;
  }

  try {
    const res = await fetch("/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.mensagem);
    } else {
      alert("Erro: " + data.erro);
    }
  } catch (err) {
    alert("Erro ao conectar com o servidor.");
  }
});
