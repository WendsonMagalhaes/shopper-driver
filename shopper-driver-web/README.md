# 🚖 Shopper Driver - Web

**Shopper Driver** é uma aplicação web intuitiva e funcional que conecta motoristas a clientes que precisam de transporte para compras ou entregas. A plataforma foi projetada como uma SPA (Single Page Application), utilizando React e TypeScript, garantindo uma experiência fluida e dinâmica para os usuários.

A aplicação permite aos clientes:

Solicitar viagens personalizadas.
Escolher motoristas com base em informações detalhadas, valor, perfil do motorista, avaliação e veículo.
Visualizar  o histórico de viagens realizadas.
A interação com a API backend é feita de forma eficiente, garantindo a troca de dados em tempo real e a persistência das informações necessárias para uma experiência completa..

---

## 🛠️ Tecnologias Utilizadas

* **React**: Framework para a construção da interface.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
* **API do Google Maps**: Para autocompletar os campos de endereço.
* **Axios**: Para realizar requisições HTTP.
* **CSS Modules**: Para estilização da página.
* **FontAwesome**: Ícones utilizados para representar informações como avaliação, distância, tempo, etc.
* **React Router**: Para navegação entre páginas.
* **React Hooks**: Para gerenciar o estado da tela (useState, useEffect, useMemo).

---

## 🚩 Pré-requisitos

Antes de executar a aplicação Shopper Driver, certifique-se de atender aos seguintes pré-requisitos:

1. **Node.js**  – para gerenciar pacotes e executar scripts.
2. **npm** – gerenciadores de pacotes para instalar dependências do projeto.
3. **Uma API funcional** que atenda às rotas esperadas pela aplicação. Exemplo:
Rota para histórico de viagens: GET /ride/:custumerId
Rota para listagem de motoristas e veículos disponíveis.
4. **Dependências do projeto**:
React, React-DOM e TypeScript.
Axios para requisições HTTP.
Bibliotecas de ícones (como Font Awesome ou outra biblioteca utilizada no design).
5. **Imagens personalizadas** para motoristas e veículos, armazenadas na pasta assets/images com nomes padronizados.
---

## 📦  Dependências

* `axios`: Para comunicação com a API.
* `react-router-dom`: Para navegação entre páginas.
* `react`: Biblioteca principal para construção da UI.
* `react-scripts`: Para facilitar o gerenciamento do build do projeto.
*` @types/react`: Tipos para o React em TypeScript.

---

### Principais Dependências:
* React & React Router:

  - `react`: Biblioteca principal para construir a interface da aplicação.
  - `react-dom`: Necessária para renderizar a aplicação React no DOM.
  - `react-router-dom`: Para navegação entre páginas na aplicação.
* Font Awesome:

  - `@fortawesome/free-regular-svg-icons`, `@fortawesome/free-solid-svg-icons`: Ícones utilizados no projeto.
  - `@fortawesome/react-fontawesome`: Biblioteca para integrar os ícones do FontAwesome no React.

* Axios:

  - `axios`: Biblioteca para fazer requisições HTTP, facilitando a comunicação com APIs.
* TypeScript:

  - `typescript`: Para tipagem estática e desenvolvimento com TypeScript.


---


##🏗️ Estrutura do Projeto

A estrutura do projeto segue o padrão do Create React App com as devidas personalizações para suportar TypeScript.


## 🚀 Funcionalidades

1. Solicitação de Viagem

  O usuário informa seu ID de Cliente, Origem e Destino. Após isso, a aplicação chama a API do backend para calcular a distância e a duração da viagem utilizando a Google Maps API.

2. Opções de Motoristas

  Com base na estimativa, o sistema oferece uma lista de motoristas disponíveis para a viagem, mostrando detalhes como o nome do motorista, valor estimado da corrida e a foto de perfil.

3. Confirmação da Viagem

  O usuário pode selecionar um motorista. A aplicação envia os dados para o backend e redireciona para a página de histórico de viagens.

4. Histórico de Viagens

  A aplicação mantém um histórico de todas as viagens realizadas, permitindo ao usuário acompanhar suas viagens passadas, com detalhes como data, origem, destino e tempo de viagem.

---

### 🖼️ Estrutura de Telas

#### 🚗 Solicitação de Viagem

A tela Solicitação de Viagem permite ao usuário solicitar uma estimativa de viagem. Ela utiliza a API do Google Maps para autocompletar os campos de Origem e Destino.

* Funcionalidades:
  - Campos de Entrada: O usuário pode inserir o ID do Usuário, Endereço de Origem e Endereço de Destino.
  - Autocompletar: Utiliza o Google Maps para sugerir endereços para Origem e Destino.
  - Estimativa de Viagem: Ao enviar o formulário, a aplicação faz uma requisição para estimar o valor da viagem com base nos dados informados.
  - Exibição de Erros: Caso ocorra algum erro durante a estimativa da viagem, uma modal de erro será exibida com a mensagem correspondente.


#### 🔀 Opções de Viagem

A tela Opções de Viagem permite ao usuário visualizar as informações detalhadas da rota e escolher um motorista para a viagem. Ela apresenta uma lista de motoristas disponíveis com base na origem e destino fornecidos, e também exibe informações como distância e duração da viagem.

* Funcionalidades:
 - Informações da Rota: Exibe a origem, destino, distância e duração da viagem.
  - Mapa da Rota: Exibe um mapa estático com a rota entre o ponto de origem e destino.
  - Motoristas Disponíveis: Apresenta uma lista de motoristas com as opções de confirmação de viagem.
  - Confirmar Viagem: O usuário pode escolher um motorista e confirmar a viagem. O sistema envia os dados para o backend e, em caso de sucesso, redireciona para o histórico de viagens.
  - Exibição de Erros: Caso ocorra algum erro, uma modal de erro será exibida com a descrição do problema.


##### 🗓️ Histórico de Viagens
A tela Histórico de Viagens permite ao usuário consultar e filtrar o histórico de viagens realizadas, com base no ID do cliente e do motorista. Ela oferece um formulário de filtro para que o usuário possa buscar viagens específicas e visualizar os resultados de forma organizada.

O usuário pode:
Informar seu ID e aplicar um filtro para ver o histórico de viagens realizadas.
Exibir dados como data, motorista, origem, destino, distância, tempo e valor da viagem.
* Funcionalidades:
  - Filtros de Busca: O usuário pode filtrar o histórico de viagens por:
ID do Cliente (obrigatório).
Motorista (opcional), com uma lista de motoristas pré-definidos.

  - Exibição de Viagens: Após a aplicação do filtro, o sistema exibe as viagens relacionadas.
 - Exibição de Erros: Caso ocorra algum erro, uma modal de erro será exibida com a descrição do problema.


#### 🗺️ Componente: RideCard
O componente RideCard é responsável por exibir as informações detalhadas de uma viagem realizada, incluindo dados do motorista, origem, destino, distância, duração e valor da corrida. Ele é utilizado na tela de histórico de viagens para apresentar cada viagem de forma organizada e visualmente agradável.

#### ⚠️ Componente: ErrorModal
O componente ErrorModal é responsável por exibir um modal (janela sobreposta) que apresenta mensagens de erro ao usuário. Este componente é utilizado para notificar o usuário sobre falhas ou problemas na aplicação de forma visualmente clara e destacada.

#### 🧑‍✈️ Componente: DriverCard
O componente DriverCard exibe as informações de um motorista e permite ao usuário confirmar a escolha do motorista para uma corrida. Ele apresenta detalhes sobre o motorista, o veículo e o valor da corrida, além de exibir uma avaliação do motorista baseada em estrelas.


---

## 🛡️ Tratamento de Erros
* Mensagens claras em modais amigáveis.
* Gerenciamento inteligente de exceções.
* Respostas HTTP padronizadas, utilizando  de status.

## Configuração do TypeScript

Este projeto utiliza TypeScript, garantindo maior segurança e facilidade de manutenção do código. A configuração do tsconfig.json está otimizada para permitir o uso de JSX com React e a tipagem rigorosa do TypeScript.

---

## 💻 Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/WendsonMagalhaes/shopper-driver.git
```

2. Navegue até o diretório do projeto:
```bash
cd shopper-driver/shopper-driver-web
```
3. Instale as dependências:
```bash
npm install
```
4. Configuração da API do Google Maps
* Registre-se na Google Cloud Platform.
* Crie um novo projeto e habilite a API do Google Maps.
* Gere uma chave de API e configure-a no frontend da aplicação para permitir o uso de mapas e autocomplete.
* Crie um arquivo .env na raiz do projeto e adicione a chave da API do Google Maps:
```bash
REACT_GOOGLE_API_KEY: Sua chave de API do Google Maps.
```

5. Inicie o servidor de desenvolvimento
Após a configuração da API e instalação das dependências, inicie o servidor de desenvolvimento:
```bash
npm start
```
A aplicação estará disponível em http://localhost:3000.

6. Produção: Para gerar o build de produção, execute:
```bash
npm run build
```

---

## Scripts Disponíveis:
* `npm start`: Inicia o aplicativo em modo de desenvolvimento.
* `npm run build`: Cria o build de produção.
* `npm test`: Executa os testes.
* `npm run eject`: Remove a configuração do Create React App e expõe toda a configuração interna (não recomendado para iniciantes).

---


## 🗂️ Estrutura do Projeto - Diretorios

```bash
.
├── .env                            # Arquivo de configuração para variáveis de ambiente (ex: credenciais, configurações)
├── build                          # Diretório gerado pelo processo de build da aplicação
│   ├── asset-manifest.json        # Manifesto contendo os ativos gerados pelo build
│   ├── favicon.ico                # Ícone da aba do navegador
│   ├── index.html                 # Arquivo principal que carrega a aplicação React
│   ├── logo192.png                # Logo em tamanho 192x192 (usado em PWA)
│   ├── logo512.png                # Logo em tamanho 512x512 (usado em PWA)
│   ├── manifest.json              # Manifesto para Progressive Web App (PWA)
│   ├── robots.txt                 # Configuração para bots e rastreadores (SEO)
│   └── static                     # Arquivos estáticos gerados pelo build
│       ├── css                    # Arquivos CSS
│       │   ├── main.4a363ae9.css  # Estilos principais minificados
│       │   └── main.4a363ae9.css.map  # Mapa de origem para depuração de CSS
│       ├── js                     # Arquivos JavaScript
│       │   ├── 453.48f44178.chunk.js   # Chunk de JS (carregado sob demanda)
│       │   ├── main.64c2de0b.js        # Arquivo JS principal
│       │   ├── main.64c2de0b.js.LICENSE.txt  # Licenças de bibliotecas usadas
│       │   └── main.64c2de0b.js.map   # Mapa de origem para depuração de JS
│       └── media                  # Imagens e outros recursos usados na aplicação
│           ├── Aston.16f64ca5e49eae5cf9e5.webp    # Exemplo: imagem de carro Aston
│           ├── car_default.e150eac43411b8486283.webp  # Imagem de carro padrão
│           ├── car_driver.933e44f930167680fca2.webp   # Imagem de motorista no carro
│           └── ...                # Outras imagens (carros e motoristas)
├── dockerfile                     # Arquivo de configuração para criação do contêiner Docker
├── jest.config.ts                 # Configuração para o framework de testes Jest
├── package.json                   # Gerenciador de dependências do projeto (npm ou yarn)
├── package-lock.json              # Versões bloqueadas das dependências (consistência)
├── public                         # Arquivos públicos (acessíveis diretamente pelo navegador)
│   ├── favicon.ico                # Ícone da aba do navegador
│   ├── index.html                 # Ponto de entrada da aplicação (sem React ainda)
│   ├── logo192.png                # Logo para PWA
│   ├── logo512.png                # Logo para PWA
│   ├── manifest.json              # Configuração de PWA
│   └── robots.txt                 # Controle de indexação por mecanismos de busca
├── README.md                      # Arquivo de documentação do projeto
├── src                            # Código-fonte principal da aplicação
│   ├── App.css                    # Estilos principais da aplicação
│   ├── App.test.tsx               # Testes unitários para o componente principal
│   ├── App.tsx                    # Componente principal da aplicação
│   ├── assets                     # Recursos estáticos (imagens, fontes, etc.)
│   │   └── images                 # Imagens usadas na aplicação
│   │       ├── cars               # Imagens relacionadas a carros
│   │       └── drivers            # Imagens relacionadas a motoristas
│   ├── components                 # Componentes reutilizáveis da aplicação
│   │   ├── DriverCard             # Cartão de informações do motorista
│   │   ├── ErrorModal             # Modal para exibir mensagens de erro
│   │   └── RideCard               # Cartão de informações de viagens
│   ├── index.css                  # Estilos globais
│   ├── index.tsx                  # Ponto de entrada da aplicação React
│   ├── pages                      # Páginas da aplicação (cada uma com estilos e lógica própria)
│   │   ├── RideHistory            # Página para histórico de viagens
│   │   ├── RideOptions            # Página para exibir opções de viagem
│   │   └── RideRequest            # Página para solicitar uma nova viagem
│   ├── react-app-env.d.ts         # Tipos adicionais para o ambiente React
│   ├── reportWebVitals.ts         # Métricas de desempenho da aplicação
│   ├── services                   # Serviços para interagir com APIs ou lógica de negócios
│   │   └── api.ts                 # Configuração para chamadas à API
│   └── setupTests.ts              # Configuração para inicialização de testes
└── tsconfig.json                  # Configuração do compilador TypeScript

```