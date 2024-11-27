

# 🚖 Shopper Driver
**Shopper Driver** é uma aplicação que conecta motoristas a clientes que necessitam de transporte para suas compras ou entregas. O sistema é composto por dois módulos principais: o **backend** (API REST) e o **frontend** (interface de usuário). Ambos os módulos estão totalmente dockerizados, o que facilita a execução da aplicação em qualquer ambiente.

Este repositório contém a configuração completa para rodar a aplicação com Docker, incluindo o arquivo `docker-compose.yml` para subir o backend e o frontend.

---

## 📝 Descrição do Projeto
O **Shopper Driver** oferece aos clientes a capacidade de:

* Solicitar uma estimativa de valor de viagem.
* Confirmar uma viagem com um motorista escolhido.
* Consultar o histórico de viagens realizadas.

A API de backend se comunica com o **Google Maps** para calcular rotas e fornecer estimativas de tempo e distância.

A aplicação frontend exibe as informações ao cliente, permitindo interação com o sistema.

---

## 🛠️ Tecnologias Utilizadas
###Backend:
* **Node.js** e **TypeScript**: Ambiente de execução e tipagem estática.
* **Express**: Framework para construção da API REST.
* **Axios**: Cliente HTTP para chamadas à API do Google Maps.
* **SQLite3**: Banco de dados local para armazenar informações de viagens.
* **Docker** e **Docker Compose**: Containerização da aplicação.

###Frontend:
* **React**: Biblioteca JavaScript para construir a interface de usuário.
* **CSS**: Estilos para o design da aplicação.
* **Docker** e **Docker Compose**: Containerização do frontend.

---

##🚩 Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados na sua máquina:

* **Docker** e **Docker Compose**
* **Git** (para versionamento)
* **Chave da API do Google Maps** (obtida no Google Cloud Platform)

---

##📦 Estrutura do Projeto
A estrutura do repositório contém duas pastas principais: **shopper-driver-api** (backend) e **shopper-driver-web** (frontend). A raiz do repositório também contém o arquivo `docker-compose.yml`.

```bash
.
├── docker-compose.yml          # Arquivo de configuração para orquestrar os containers
├── shopper-driver-api          # Backend da aplicação
│   ├── .env                    # Arquivo de configuração para variáveis de ambiente (API Key)
│   ├── dist                    # Código compilado em JavaScript
│   ├── src                     # Código-fonte em TypeScript
│   └── package.json            # Dependências do backend
│
├── shopper-driver-web          # Frontend da aplicação
│   ├── public                  # Arquivos estáticos
│   ├── src                     # Código-fonte da interface
│   ├── package.json            # Dependências do frontend
│   └── Dockerfile              # Dockerfile para o frontend
├── .env                        # Chaves de API e variáveis de ambiente
└── README.md                   # Documentação do projeto
```

---
##🛠️ Docker Compose
O arquivo `docker-compose.yml` configura dois serviços: **shopper-driver-api** e **shopper-driver-web**, permitindo que o backend e o frontend sejam executados em containers separados, mas de forma orquestrada.

---
##💻 Como Rodar o Projeto
###Passo 1: Clone o repositório
Clone o repositório para sua máquina local:
```bash
git clone https://github.com/WendsonMagalhaes/shopper-driver.git
```

###Passo 2: Navegue até o diretório do projeto
```bash
cd shopper-driver
```

###Passo 3: Configure a chave da API do Google
No arquivo `.env` na raiz do repositório, adicione a chave da API do Google Maps. O formato do arquivo é:

```env
GOOGLE_API_KEY=Sua_chave_de_API_do_Google_Maps
```

###Passo 4: Suba a aplicação com Docker
Na raiz do projeto, execute o seguinte comando para subir a aplicação e os serviços necessários:
```
docker-compose up
```

Isso irá:

* Criar e rodar os containers para o backend (`shopper-driver-api`) e o frontend (`shopper-driver-web`).
* Expor a API do backend na porta **8080**.
* Expor o frontend na porta **80**.
###Passo 5: Acesse a aplicação
* O frontend estará disponível em: `http://localhost`.
* O backend estará disponível em: `http://localhost:8080`.

---
🚀 Funcionalidades da API (Backend)
###Estimativa de Viagem
####Endpoint: `POST /ride/estimate`

Este endpoint permite que o cliente calcule a distância e o tempo estimado entre o ponto de origem e o destino, além de calcular as opções de motoristas disponíveis com base na quilometragem mínima e no valor da viagem.

###Confirmação de Viagem
####Endpoint: `PATCH /ride/confirm`

Após a estimativa, o cliente pode confirmar a viagem escolhendo um motorista disponível.

###Histórico de Viagens
###Endpoint: `GET /ride/{customer_id}?driver_id={id}`

Este endpoint permite listar as viagens realizadas por um determinado cliente, podendo filtrar por motorista.

---
##🗂️ Estrutura dos Containers Docker
O `docker-compose.yml` foi configurado para orquestrar o ambiente de desenvolvimento, criando os seguintes containers:

* **shopper-driver-api**: O backend, exposto na porta **8080**.
* **shopper-driver-web**: O frontend, exposto na porta **80**.
---

