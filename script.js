document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Termo Polar Iniciado!");

    // --- 1. MENU ATIVO AUTOMÁTICO ---
    const currentLocation = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll('#menu a');
    
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentLinkMatches(currentLocation, linkHref)) {
            link.style.backgroundColor = 'var(--primary)';
            link.style.color = '#ffffff';
        }
    });

    function currentLinkMatches(current, href) {
        if (current === "" && href === "main.html") return true;
        return current === href;
    }

    // --- 2. GERAÇÃO DE ORÇAMENTO EM TELA (orcamento.html) ---
    const formOrcamento = document.getElementById('formOrcamento');
    
    if (formOrcamento) {
        const inputWhatsapp = document.getElementById('whatsapp');

        // Máscara para WhatsApp
        if (inputWhatsapp) {
            inputWhatsapp.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });
        }

        // Nova Tabela de Preços Oficiais
        const tabelaPrecos = {
            "Instalação": 450.00,
            "Desinstalação": 300.00,
            "Manutenção e Limpeza": 250.00,
            "Infraestrutura (por metro)": 150.00,
            "Combo: Desinstalação + Instalação": 700.00 // Preço do combo com desconto
        };

        // Interceptar o envio do formulário
        formOrcamento.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede a página de recarregar
            
            // Coletando os dados do cliente
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('whatsapp').value;
            const endereco = document.getElementById('endereco').value;
            const capacidade = document.getElementById('capacidade').value;
            const detalhes = document.getElementById('detalhes').value; 
            
            const checkboxes = document.querySelectorAll('input[name="servico"]:checked');
            const tbody = document.getElementById('docTabelaBody');
            
            // Limpa a tabela antes de preencher
            tbody.innerHTML = '';
            let valorTotal = 0;

            // Se não marcou nada, adicionamos apenas uma taxa de visita
            if(checkboxes.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td>Visita Técnica e Diagnóstico (${capacidade})</td>
                        <td>R$ 180,00</td>
                        <td>1.0</td>
                        <td>R$ 180,00</td>
                    </tr>
                `;
                valorTotal = 180.00;
            } else {
                // Adiciona cada serviço escolhido na tabela
                checkboxes.forEach(chk => {
                    const servicoNome = chk.value;
                    const preco = tabelaPrecos[servicoNome] || 180.00; // Preço fallback
                    valorTotal += preco;

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${servicoNome} (${capacidade})</td>
                        <td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td>1.0</td>
                        <td>${preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }

            // Preenchendo os dados no documento gerado
            document.getElementById('docCliente').textContent = nome;
            document.getElementById('docContato').textContent = telefone;
            document.getElementById('docEndereco').textContent = endereco;
            
            // Injetando o texto que o cliente digitou, se estiver vazio bota um texto padrão
            document.getElementById('docDetalhes').textContent = detalhes ? detalhes : "Nenhuma observação ou solicitação adicional descrita pelo cliente.";
            
            // Formatar os valores totais
            const valorFormatado = valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            document.getElementById('docTotalServicos').textContent = valorFormatado;
            document.getElementById('docTotalFinal').textContent = valorFormatado;

            // Gerar Data e Número do Documento
            const hoje = new Date();
            const dataFormatada = hoje.toLocaleDateString('pt-BR') + ' ' + hoje.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
            document.getElementById('docData').textContent = dataFormatada;
            
            const numAleatorio = Math.floor(Math.random() * 9000) + 1000;
            document.getElementById('docNum').textContent = `202611-${numAleatorio}`;

            // Efeito visual: Esconder o form e mostrar o documento
            document.getElementById('areaFormulario').style.display = 'none';
            document.getElementById('areaRecibo').style.display = 'block';
        });
    }

    // --- 3. EFEITO DE HOVER NOS CARDS (mantido) ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.borderColor = 'var(--primary)');
        card.addEventListener('mouseleave', () => card.style.borderColor = 'var(--border-color)');
    });
});