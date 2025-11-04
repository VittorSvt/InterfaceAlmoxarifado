# 🚀 Sistema de Consulta e Reserva de Estoque (Google Apps Script)

Este é um aplicativo web responsivo, construído com Google Apps Script e o **Design System do Gov.br**, para consulta de inventário e solicitação de reservas por e-mail.

A aplicação lê dados diretamente de uma Planilha Google, exibe em uma interface interativa com busca e paginação, e permite ao usuário montar uma "cesta de pedidos" (carrinho) para solicitar os itens via um formulário que dispara um e-mail formatado.

![Exemplo de Screenshot da Aplicação](<img width="1902" height="933" alt="image" src="https://github.com/user-attachments/assets/693423bd-9b44-4139-ab8b-c623dd4d303d" />
) 

---

## ✨ Funcionalidades Principais

* **Interface Responsiva:** Utiliza o Design System do Gov.br para se adaptar a desktops e dispositivos móveis.
* **Tabela Interativa:** Lista os itens do inventário com paginação, busca e ordenação (via DataTables.js).
* **Cesta de Pedidos:** Permite ao usuário adicionar múltiplos itens a uma lista de solicitação (carrinho).
* **Formulário de Solicitação:** Um modal coleta dados do usuário (nome, e-mail, turma, datas) para a reserva.
* **Notificação por E-mail:** Envia automaticamente um e-mail formatado (com uma tabela HTML dos itens) para um destinatário especificado.
* **Notificações na Interface:** Usa "toasts" (alertas) do Gov.br para feedback de sucesso ou erro.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** Google Apps Script (`.gs`)
* **Fonte dos Dados:** Google Sheets
* **Frontend:** HTML5, CSS3, JavaScript (ES5)
* **Design System:** [Design System do Gov.br](https://www.gov.br/ds/home) (para componentes de UI e estilos)
* **Bibliotecas JavaScript:**
    * jQuery (Manipulação do DOM)
    * DataTables.js (Para as tabelas interativas)
    * Font Awesome (Ícones)

---

## ⚙️ Como Configurar e Implantar

Para rodar este projeto, você precisa de uma Planilha Google e dos arquivos de script deste repositório.

### Passo 1: Configurar a Planilha Google (O Banco de Dados)

1.  Crie uma nova **Planilha Google** na sua conta.
2.  **Importe os Dados:** O projeto usa algumas abas para organizar os dados. Você pode importar os arquivos `.csv` deste repositório para criar as abas iniciais:
    * `Estoque.csv` -> aba **Estoque**
    * `Localizações.csv` -> aba **Localizações**
    * `Unidade de medida.csv` -> aba **Unidade de medida**
3.  **Crie a Aba `interface` (MUITO IMPORTANTE):** O script `Code.gs` (função `getInventory`) foi escrito para ler dados *especificamente* de uma aba chamada `interface`.
    * Crie uma nova aba e renomeie-a para `interface`.
    * O script lê as colunas **F**, **G**, e **H** desta aba.
    * Você deve popular estas colunas com os dados das outras abas. A forma mais fácil é usar uma fórmula `QUERY` na célula `A1` da sua aba `interface` (ou em outra coluna e referenciar). O objetivo é que:
        * **Coluna F:** Tenha a descrição do item.
        * **Coluna G:** Tenha a quantidade em estoque (ex: "10: UN").
        * **Coluna H:** Tenha a localização (ex: "J02: SALA MATERIAIS").

    *Exemplo de como a aba `interface` deve parecer (o script só lê F, G, H):*
| A | B | C | D | E | **F (Descrição)** | **G (Estoque)** | **H (Local)** |
|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | Insumo: Acaricida... | 1: KG | AA: Abrigo... |
| ... | ... | ... | ... | ... | Adaptador 1" interno... | 152: UN | J02: SALA... |

### Passo 2: Adicionar os Arquivos de Script

1.  Na sua Planilha Google, vá em **Extensões** > **Apps Script**.
2.  O editor de script será aberto com um arquivo `Code.gs`. Apague o conteúdo padrão e **cole o conteúdo do `Code.gs`** deste repositório.
3.  **Adicione os outros arquivos `.gs`:**
    * Clique no `+` ao lado de "Arquivos" e selecione `Script`.
    * Nomeie o novo arquivo como `solicitar` (sem `.gs`).
    * Copie e cole o conteúdo do `solicitar.gs` deste repositório.
    * Repita o processo para `formatarItens.gs`.
4.  **Adicione os arquivos `.html`:**
    * Clique no `+` ao lado de "Arquivos" e selecione `HTML`.
    * Nomeie o novo arquivo como `index` (sem `.html`).
    * Copie e cole o conteúdo do `index.html` deste repositório.
    * Repita o processo para `Scripts.html`.
5.  Salve o projeto (ícone de disquete).

### Passo 3: Implantar o Aplicativo Web

1.  No editor de Apps Script, clique em **Implantar** (canto superior direito) > **Nova implantação**.
2.  Clique no ícone de engrenagem (ao lado de "Selecionar tipo") e escolha **Aplicativo da Web**.
3.  Nas configurações de implantação:
    * **Descrição:** (Opcional) "Sistema de Reserva de Estoque"
    * **Executar como:** Selecione `Eu (seu-email@gmail.com)`
    * **Quem pode acessar:** Selecione `Qualquer pessoa com uma conta do Google` (ou `Qualquer pessoa` se for para acesso público).
4.  Clique em **Implantar**.
5.  **Autorizar Permissões:** O Google pedirá permissão para que o script possa:
    * Acessar suas Planilhas Google (para ler o inventário).
    * Enviar e-mail em seu nome (para enviar a solicitação).
    * Clique em "Autorizar acesso" e siga as etapas (pode ser necessário clicar em "Avançado" > "Acessar... (não seguro)").
6.  **Copie a URL:** Após a implantação, será exibida uma **URL do Aplicativo da Web**. Esta é a URL pública da sua aplicação.

---

## 📂 Estrutura dos Arquivos

* `Code.gs`: Ponto de entrada do backend. Responsável por servir a página (`doGet`), buscar dados da planilha (`getInventory`) e incluir arquivos HTML (`include`).
* `solicitar.gs`: Contém a lógica de backend (`solicitar`) que é chamada pelo frontend. Processa os dados do formulário, valida o e-mail, formata e envia a notificação por e-mail.
* `formatarItens.gs`: Função auxiliar (`formatarItens`) que gera a tabela HTML dos itens para ser inserida no corpo do e-mail.
* `index.html`: A página web principal. Contém toda a estrutura HTML e o CSS (embutido na tag `<style>`).
* `Scripts.html`: Todo o JavaScript do lado do cliente (frontend). Controla a inicialização do DataTables, os eventos de clique (adicionar/remover do carrinho), a exibição do modal e a chamada para as funções do backend (`google.script.run`).

---

## 📄 Licença

Distribuído sob a Licença MIT.
