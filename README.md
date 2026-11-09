# Projeto Termo Polar - Aplicação Web

Esse é o projeto que desenvolvi para a disciplina de desenvolvimento web. A ideia foi criar um sistema de orçamento para a "Termo Polar", uma empresa que trabalha com instalação e manutenção de ar-condicionado. 

O objetivo do trabalho foi duplo: resolver um problema de negócio da empresa (organizar a captação de orçamentos) e colocar em prática tudo o que foi estudado na matéria, mostrando a separação correta entre a estrutura (HTML), o visual (CSS) e o comportamento (JavaScript).

## O problema que o site resolve
Hoje, a empresa agenda visitas e passa orçamentos de forma meio informal, pelo WhatsApp e Ligacoes durante o servico. Isso acaba sendo desorganizado e faz a equipe perder tempo. 

O site resolve isso direto na fonte. O cliente entra, escolhe o que precisa (instalação, limpeza, desinstalação, manutenção), preenche os dados do aparelho e o sistema já gera a solicitação. Fica muito mais rápido para o técnico analisar e fechar o serviço com clientes residenciais ou comerciais.

## Estrutura e Funcionalidades

Para cumprir os requisitos da matéria, estruturei o site em várias páginas ligadas por um menu de navegação:

* **Início (`main.html`):** A vitrine da empresa. Toda construída com tags semânticas (como `<header>`, `<main>`, `<section>`) e com design responsivo.
* **Serviços (`servicos.html`):** Uma página com cards detalhando os serviços que a empresa faz.
* **Contato (`contato.html`):** Endereço e um formulário básico para dúvidas.
* **Orçamento Avançado (O coração do projeto):** Um formulário complexo usando `<fieldset>`, checkboxes, selects e caixas de texto. 

### Mostrando a evolução do código
Para o professor ver o passo a passo da construção, eu dividi a página de orçamento em três arquivos diferentes:
1. `orcamento-puro.html`: Tem apenas o esqueleto em HTML, provando que sei usar as tags de formulário.
2. `orcamento-css.html`: HTML + CSS. Aqui o site ganha todo o design, mas continua estático (sem ações).
3. `orcamento.html`: A versão final e completa, onde entra o JavaScript.

### Os diferenciais em JavaScript
Na versão final (`orcamento.html`), coloquei algumas funções para deixar o projeto com cara de sistema profissional:
* **Gerador de Orçamento na Tela:** Quando o cliente preenche os dados e clica em enviar, o JS esconde o formulário, soma os preços dos serviços sozinhos e monta um recibo na tela simulando um PDF (com data, hora e número do pedido), pronto para imprimir.
* **Validação de Erros:** Se o usuário tentar enviar sem colocar o nome, o WhatsApp ou o endereço, as bordas desses campos ficam vermelhas e o envio é travado.
* **Modo Escuro (Dark Mode):** Criei um botão no menu que muda as cores do site inteiro para o modo noturno. Usando o `localStorage`, o navegador lembra dessa escolha mesmo que a pessoa mude de página.

## Como testar o projeto

É bem simples, não precisa instalar nenhum servidor.
1. Baixe a pasta com os arquivos.
2. Dê dois cliques no arquivo `main.html` para abrir ele direto no seu navegador.
3. Use e teste.