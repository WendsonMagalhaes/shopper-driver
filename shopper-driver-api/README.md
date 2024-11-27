# 🚖 Shopper Driver - Api

**Shopper Driver** é uma aplicação que conecta motoristas a clientes que necessitam de transporte para suas compras ou entregas. A API REST desenvolvida com **Node.js** e **TypeScript** permite que os usuários solicitem viagens, calculem rotas, escolham motoristas disponíveis, confirmem viagens e acesso o histórico de viagens de forma eficiente.

---

## 📝 Descrição do Projeto
Esta aplicação backend permite que os clientes:

* Solicitem uma estimativa de valor de viagem.
* Confirmem uma viagem com um motorista escolhido.
* Consultem o histórico de viagens realizadas.

A API se comunica com o Google Maps para calcular rotas e fornecer estimativas de tempo e distância.

---

## 🛠️ Tecnologias Utilizadas
* **Node.js**: Ambiente de execução do JavaScript no backend.
* **TypeScript**: Superset do JavaScript para tipagem estática e mais segurança.
* **Express**: Framework minimalista para a construção de APIs REST.
* **Axios**: Cliente HTTP para fazer chamadas à API do Google Maps.
* **Docker**: Containerização da aplicação para facilitar a execução em qualquer ambiente.
* **Docker Compose**: Ferramenta para definir e gerenciar multi-contêineres Docker.

---

## 🚩 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter o seguinte instalado na sua máquina:

* **Node.js** (v20.11.0 ou superior)
* **Docker** e **Docker Compose**
* **Git** (para versionamento)

---

## 📦  Dependências

Este projeto usa as seguintes dependências:

### Dependências de produção:
- **axios**: Cliente HTTP para fazer requisições a APIs externas.
- **body-parser**: Middleware para analisar corpos de requisições.
- **cors**: Middleware para habilitar o CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carregar variáveis de ambiente a partir de um arquivo `.env`.
- **express**: Framework web para construir a API.
- **sqlite3**: Biblioteca SQLite para interação com o banco de dados..

### Dependências de desenvolvimento:
- **@types/cors**: Tipos TypeScript para a biblioteca CORS.
- **@types/express**: Tipos TypeScript para o Express.
- **@types/jest**: Tipos TypeScript para Jest (testes).
- **@types/node**: Tipos TypeScript para Node.js.
- **@types/sqlite3**: Tipos TypeScript para SQLite3.
- **@types/supertest**: Tipos TypeScript para Supertest (testes HTTP).
- **jest**: Framework de testes.
- **nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **supertest**: Biblioteca para testar APIs HTTP.
- **ts-jest**: Integração do Jest com TypeScript.
- **ts-node**: Executar TypeScript diretamente.
- **typescript**: Compilador TypeScript.

---

## 💻 Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/WendsonMagalhaes/shopper-driver.git
```

2. Navegue até o diretório do projeto:
```bash
cd shopper-driver/shopper-driver-api
```

3. Instale as Dependências:
```bash
npm install
```

3. Configuração do Ambiente
- Registre-se na Google Cloud Platform.
- Crie um novo projeto e habilite a API do Google Maps.
- Gere uma chave de API e configure-a no backend da aplicação.
- Crie um arquivo `.env` na raiz do projeto e adicione a chave da API do Google Maps
```bash
GOOGLE_API_KEY = Sua_chave_de_API_do_Google_Maps.
```
4. Docker
Para rodar a aplicação com Docker, execute:
```bash
docker-compose up
```

Isso irá subir a aplicação e os serviços necessários, expondo o backend na porta 8080.

5. Rodando o Servidor Localmente
Se preferir rodar localmente, use:
```bash
npm run dev
```
O servidor estará disponível em http://localhost:8080.

---

## 🚀 Funcionalidades
### Estimativa de Viagem
##### **API Endpoint:** `POST /ride/estimate`
Este endpoint permite que o cliente calcule a distância e o tempo estimado entre o ponto de origem e o destino, além de calcular as opções de motoristas disponíveis com base na quilometragem mínima e no valor da viagem.

**Exemplo de requisição:**
* **Corpo da Requisição**:
  - `customer_id`: ID do cliente.
  - `origin`: Endereço de origem.
  - `destination`: Endereço de destino.

```json
{
    "customer_id": "123",
    "origin": "Rua São Domingos, Campina Grande, PB",
    "destination": "Rua Snta Maria, Campina Grande, PB"
  
}
```
**Exemplo de resposta:**

```json
{
    "origin": {
        "latitude": -7.223995700000001,
        "longitude": -35.9070184
    },
    "destination": {
        "latitude": -7.230561199999999,
        "longitude": -35.900156
    },
    "distance": 1889,
    "duration": "6 minutos",
    "options": [
        {
            "id": 1,
            "name": "Homer Simpson",
            "description": "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
            "vehicle": "Plymouth Valiant 1973 rosa e Enferrujado",
            "review": {
                "rating": 2,
                "comment": "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts."
            },
            "value": 4.72
        }
    ],
    "routeResponse": { "google_maps_data": "response" }
}
```
###Confirmação de Viagem
##### **API Endpoint:** `PATCH /ride/confirm`
Após a estimativa, o cliente pode confirmar a viagem escolhendo um motorista disponível e fornecendo as informações necessárias, como distância, duração e valor.

**Exemplo de requisição**:
* **Corpo da Requisição**:
  - `customer_id`: ID do cliente.
  - `origin`: Endereço de origem.
  - `destination`: Endereço de destino.
  - `driver`: Objeto contendo informações do motorista (ID, nome).
  - `distance`: Distância estimada.
  - `duration`: Duração estimada.
  - `value`: Valor calculado da viagem.

```json
{
  "customer_id": "99",
  "origin": "Rua A, 123",
  "destination": "Rua B, 456",
  "distance": 10,
  "duration": "25 mins",
  "driver": {
    "id": 3,
    "name": "James Bond"
  },
  "value": 50.0
}

```
**Exemplo de resposta**:

```json
{
    "success": true
}
```
###Histórico de Viagens
#####  **API Endpoint:** `GET /ride/{customer_id}?driver_id={id}`

Este endpoint permite listar as viagens realizadas por um determinado cliente, podendo filtrar por motorista.

**Exemplo de requisição:**
 * **Parâmetros de URL**:
  - `customer_id`: 99.

**Exemplo de resposta:**

```json

{
    "customer_id": "99",
    "rides": [
        {
            "id": 142,
            "date": "2024-11-27 18:23:55",
            "origin": "Rua A, 123",
            "destination": "Rua B, 456",
            "distance": 10,
            "duration": "25 mins",
            "driver": {
                "id": 3,
                "name": "James Bond"
            },
            "value": 50
        }
    ]
}
```

## 🗂️ Estrutura do Projeto
```bash
.
├── .env                            # Arquivo de configuração para variáveis de ambiente (ex: credenciais, configurações)
├── database.db                     # Arquivo SQLite que armazena o banco de dados
├── dist                            # Diretório gerado após a transpilação do TypeScript para JavaScript
│   ├── app.js                      # Arquivo principal transpilado para inicializar a aplicação
│   ├── controllers                 # Controladores transpilados
│   │   └── rideController.js       # Lógica para gerenciar endpoints relacionados a viagens
│   ├── database.js                 # Configuração do banco de dados transpilada
│   ├── migrations                  # Scripts transpilados para inicializar ou atualizar o banco
│   │   └── populateDrivers.js      # Script que preenche dados iniciais de motoristas no banco
│   ├── server.js                   # Configuração do servidor transpilada
│   └── services                    # Serviços transpilados (contêm lógica de negócios)
│       ├── initDataBase.js         # Inicialização e configuração do banco de dados
│       └── rideService.js          # Lógica de negócios para manipulação de dados de viagens
├── dockerfile                      # Arquivo de configuração para criação do contêiner Docker
├── jest.config.js                  # Configuração do framework de testes Jest
├── package.json                    # Gerenciador de dependências do projeto (npm ou yarn)
├── package-lock.json               # Versões bloqueadas das dependências para consistência
├── README.md                       # Documentação do projeto
├── src                             # Código-fonte do projeto em TypeScript
│   ├── app.ts                      # Arquivo principal para inicializar a aplicação
│   ├── controllers                 # Controladores (gerenciam endpoints da API)
│   │   └── rideController.ts       # Controlador para endpoints de viagens
│   ├── database.ts                 # Configuração do banco de dados
│   ├── migrations                  # Scripts para inicialização ou atualização do banco
│   │   └── populateDrivers.ts      # Script para preenchimento inicial de motoristas
│   ├── server.ts                   # Configuração do servidor HTTP
│   └── services                    # Serviços (implementação da lógica de negócios)
│       ├── initDataBase.ts         # Inicialização e configuração do banco de dados
│       └── rideService.ts          # Lógica de manipulação de dados de viagens
├── tests                           # Diretório de testes automatizados
│   └── controllers                 # Testes relacionados aos controladores
│       └── rideController.test.ts  # Teste para o controlador de viagens
└── tsconfig.json                   # Configuração do compilador TypeScript

```

---

## 🧪 Como Rodar os Testes

Testes unitários são fundamentais para garantir a qualidade do código. Para rodar os testes, execute:

```bash
npx jest
```
