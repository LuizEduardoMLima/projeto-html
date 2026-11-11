document.addEventListener("DOMContentLoaded", function () {
  console.log("Sistema Termo Polar Iniciado!");

  // --- 1. MODO ESCURO (DARK MODE) COM LOCALSTORAGE ---
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      if (currentTheme === "dark") themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      }
    });
  }

  // --- 2. MENU ATIVO AUTOMÁTICO ---
  const currentLocation = window.location.pathname.split("/").pop();
  const menuLinks = document.querySelectorAll("#menu a");

  menuLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (
      currentLocation === linkHref ||
      (currentLocation === "" && linkHref === "main.html")
    ) {
      link.style.backgroundColor = "var(--primary)";
      link.style.color = "#ffffff";
    }
  });

  // --- 3. GERAÇÃO DE ORÇAMENTO EM TELA (orcamento.html) ---
  const formOrcamento = document.getElementById("formOrcamento");

  if (formOrcamento) {
    const inputWhatsapp = document.getElementById("whatsapp");

    if (inputWhatsapp) {
      inputWhatsapp.addEventListener("input", function (e) {
        let x = e.target.value
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      });
    }

    const tabelaPrecos = {
      Instalação: 450.0,
      Desinstalação: 300.0,
      "Manutenção e Limpeza": 250.0,
      "Infraestrutura (por metro)": 150.0,
      "Combo: Desinstalação + Instalação": 700.0,
    };

    formOrcamento.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação Visual
      const nomeInput = document.getElementById("nome");
      const zapInput = document.getElementById("whatsapp");
      const endInput = document.getElementById("endereco");

      nomeInput.style.border = "1px solid #cbd5e1";
      zapInput.style.border = "1px solid #cbd5e1";
      endInput.style.border = "1px solid #cbd5e1";

      let camposValidos = true;

      if (!nomeInput.value.trim()) {
        nomeInput.style.border = "2px solid #ef4444";
        camposValidos = false;
      }
      if (!zapInput.value.trim() || zapInput.value.length < 14) {
        zapInput.style.border = "2px solid #ef4444";
        camposValidos = false;
      }
      if (!endInput.value.trim()) {
        endInput.style.border = "2px solid #ef4444";
        camposValidos = false;
      }

      if (!camposValidos) {
        alert(
          "Atenção: Por favor, preencha corretamente os campos destacados em vermelho antes de gerar o orçamento.",
        );
        return;
      }

      const nome = nomeInput.value;
      const telefone = zapInput.value;
      const endereco = endInput.value;
      const capacidade = document.getElementById("capacidade").value;
      const detalhes = document.getElementById("detalhes").value;

      const checkboxes = document.querySelectorAll(
        'input[name="servico"]:checked',
      );
      const tbody = document.getElementById("docTabelaBody");

      tbody.innerHTML = "";
      let valorTotal = 0;

      if (checkboxes.length === 0) {
        tbody.innerHTML = `
                    <tr>
                        <td>Visita Técnica e Diagnóstico (${capacidade})</td>
                        <td>R$ 180,00</td>
                        <td>1.0</td>
                        <td>R$ 180,00</td>
                    </tr>
                `;
        valorTotal = 180.0;
      } else {
        checkboxes.forEach((chk) => {
          const servicoNome = chk.value;
          const preco = tabelaPrecos[servicoNome] || 180.0;
          valorTotal += preco;

          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${servicoNome} (${capacidade})</td>
                        <td>${preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                        <td>1.0</td>
                        <td>${preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                    `;
          tbody.appendChild(tr);
        });
      }

      document.getElementById("docCliente").textContent = nome;
      document.getElementById("docContato").textContent = telefone;
      document.getElementById("docEndereco").textContent = endereco;
      document.getElementById("docDetalhes").textContent = detalhes
        ? detalhes
        : "Nenhuma observação ou solicitação adicional descrita pelo cliente.";

      const valorFormatado = valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      document.getElementById("docTotalServicos").textContent = valorFormatado;
      document.getElementById("docTotalFinal").textContent = valorFormatado;

      const hoje = new Date();
      const dataFormatada =
        hoje.toLocaleDateString("pt-BR") +
        " " +
        hoje.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
      document.getElementById("docData").textContent = dataFormatada;

      const numAleatorio = Math.floor(Math.random() * 9000) + 1000;
      document.getElementById("docNum").textContent = `202611-${numAleatorio}`;

      document.getElementById("areaFormulario").style.display = "none";
      document.getElementById("areaRecibo").style.display = "block";
    });
  }

  // --- 4. EFEITO DE HOVER NOS CARDS ---
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener(
      "mouseenter",
      () => (card.style.borderColor = "var(--primary)"),
    );
    card.addEventListener(
      "mouseleave",
      () => (card.style.borderColor = "var(--border-color)"),
    );
  });
});
