# 🚗 QA — Testes de API com CodeceptJS e WireMock

Projeto de automação de testes de API desenvolvido com **CodeceptJS**, utilizando os helpers `REST` e `JSONResponse`, executados contra uma API simulada com **WireMock**.

O projeto demonstra a aplicação de testes automatizados para validação de diferentes comportamentos de uma API REST, contemplando cenários de **sucesso, recurso inexistente e erro interno**.

A estrutura é organizada para permitir uma configuração simples e reproduzível do ambiente, facilitando a execução.

---

## 📌 Finalidade do projeto

O projeto simula uma API de gerenciamento de veículos e utiliza o WireMock para representar o comportamento de um backend real, permitindo testar diferentes respostas da API sem depender de um sistema de produção.

Na prática, os testes automatizados simulam operações que um usuário ou sistema cliente faria, como:

- Consultar veículos → `GET /api/cars` → `200`
- Cadastrar um veículo válido → `POST /api/cars` → `201`
- Tentar cadastrar um veículo inexistente → `POST /api/cars` → `404`
- Tentar cadastrar um modelo não permitido → `POST /api/cars` → `500`

O CodeceptJS envia as requisições e valida se a API retorna exatamente o comportamento esperado. O WireMock atua como o backend simulado, fornecendo respostas previamente configuradas.

### Linha de raciocínio sob a perspectiva do usuário final

Imagine que o usuário esteja utilizando uma aplicação de veículos. Essa aplicação precisa conversar com uma API para consultar e cadastrar veículos.

- Quando o usuário **consulta veículos**, a aplicação faz uma requisição GET. O sistema deve responder com os veículos disponíveis.
- Quando o usuário **cadastra um veículo válido**, a aplicação envia uma requisição POST. O sistema deve confirmar o cadastro com uma resposta de sucesso (`201`).
- O projeto também verifica como o sistema se comporta diante de **situações de erro**, como um veículo não encontrado (`404`) ou um modelo não permitido que provoque um erro interno (`500`).

### Em uma única frase

> É um projeto de automação de testes de API que simula uma aplicação de gerenciamento de veículos, utilizando o WireMock como backend simulado e o CodeceptJS para validar automaticamente cenários de sucesso e diferentes condições de erro.

---

<img width="1312" height="1199" alt="Infográfico de Testes de API com CodeceptJS e WireMock (1)" src="https://github.com/user-attachments/assets/d57003a9-7681-4c06-8428-da980fe51768" />


---

## 🧪 O que é testado

Os testes automatizados validam o endpoint:

```text
/api/cars
```

A suíte contempla quatro cenários:

| Cenário                       | Método | Resposta esperada                     |
| ----------------------------- | ------ | ------------------------------------- |
| Consultar veículos            | `GET`  | `200`                                 |
| Cadastrar veículo (fusca)     | `POST` | `201` + mensagem de sucesso e `carId` |
| Veículo inexistente (ronaldo) | `POST` | `404` + `Vehicle not found.`          |
| Modelo não permitido (up tsi) | `POST` | `500` + mensagem de erro interno      |

### Cenários automatizados

#### 1. Consulta de veículos

```http
GET /api/cars
```

Resultado esperado:

```text
HTTP 200
```

---

#### 2. Cadastro de veículo

```json
{
  "brand": "volks",
  "model": "fusca",
  "year": 2019
}
```

Resultado esperado:

```text
HTTP 201
```

Com retorno contendo:

```json
{
  "message": "Car successfully registered!",
  "carId": 6
}
```

---

#### 3. Veículo inexistente

```json
{
  "brand": "volks",
  "model": "ronaldo",
  "year": 2019
}
```

Resultado esperado:

```text
HTTP 404
```

Com retorno:

```json
{
  "message": "Vehicle not found."
}
```

---

#### 4. Modelo não permitido

```json
{
  "brand": "volks",
  "model": "up tsi",
  "year": 2019
}
```

Resultado esperado:

```text
HTTP 500
```

Com retorno:

```json
{
  "message": "Internal server error: model 'up tsi' is not allowed."
}
```

---

## 📁 Estrutura do projeto

```text
QA-teste-api-wiremock-codeceptjs/
├── backend/                         # Testes automatizados com CodeceptJS
│   ├── codecept.conf.js             # Configuração do CodeceptJS
│   ├── package.json                 # Dependências e scripts do projeto
│   ├── mochawesome-report/          # Relatórios gerados pelo Mochawesome
│   └── tests/
│       └── veiculos_teste.js        # Cenários automatizados da API
├── mappings/                        # Rotas e respostas simuladas do WireMock
│   ├── api-cars.json                # GET /api/cars → 200
│   ├── post-cars.json               # POST /api/cars → 201
│   ├── post-cars-404.json           # POST /api/cars → 404
│   └── post-cars-500.json           # POST /api/cars → 500
├── __files/
│   └── cars.json                    # Body de resposta do GET /api/cars
├── .gitignore
└── README.md
```

> ⚠️ O arquivo `wiremock-standalone-3.9.1.jar` **não está versionado** no repositório por ser um binário pesado. Veja as instruções de download na seção de instalação.

### Responsabilidade de cada diretório

| Diretório/arquivo    | Responsabilidade                                                     |
| -------------------- | -------------------------------------------------------------------- |
| `backend/`           | Contém a configuração e os testes do CodeceptJS                      |
| `backend/tests/`     | Contém os cenários automatizados                                     |
| `mappings/`          | Define os endpoints, requisições e respostas simuladas pelo WireMock |
| `__files/`           | Contém os bodies de resposta referenciados pelos mappings            |
| `README.md`          | Documentação do projeto                                              |

---

## 🏷️ Tecnologias utilizadas

![API](https://img.shields.io/badge/API-Testing-1E88E5?style=for-the-badge)
![REST API](https://img.shields.io/badge/REST%20API-Testing-6C63FF?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![CodeceptJS](https://img.shields.io/badge/CodeceptJS-API%20Testing-6C63FF?style=for-the-badge)
![Mochawesome](https://img.shields.io/badge/Mochawesome-Test%20Reporting-6C63FF?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Test%20Automation-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white)
![WireMock](https://img.shields.io/badge/WireMock-API%20Mocking-6C63FF?style=for-the-badge)
![JSON](https://img.shields.io/badge/JSON-Data%20Format-000000?style=for-the-badge&logo=json&logoColor=white)
![Java](https://img.shields.io/badge/Java-Runtime-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![npm](https://img.shields.io/badge/npm-Package%20Manager-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)
![PowerShell](https://img.shields.io/badge/PowerShell-Terminal-5391FE?style=for-the-badge&logo=powershell&logoColor=white)

---

# ⚙️ Instalação e configuração do ambiente

O procedimento foi validado em ambiente **Windows utilizando PowerShell**.

---

## 1. Pré-requisitos

| Ferramenta     | Finalidade                                      |
| -------------- | ----------------------------------------------- |
| **Git**        | Clonar o repositório e controlar versões        |
| **Node.js**    | Executar o ambiente JavaScript                  |
| **npm**        | Instalar e gerenciar as dependências do projeto |
| **Java JDK**   | Executar o WireMock                             |
| **PowerShell** | Executar os comandos deste guia                 |

---

## 2. Verificar as instalações

```powershell
git --version
node --version
npm --version
java -version
```

> **Importante:** caso algum comando não seja reconhecido, a respectiva ferramenta precisa ser instalada e configurada no `PATH` do sistema antes de continuar.

---

## 3. Clonar o repositório

```powershell
git clone https://github.com/diogoamanciosilva/QA-teste-api-wiremock-codeceptjs.git
cd QA-teste-api-wiremock-codeceptjs
```

---

## 4. Baixar o WireMock

O arquivo `wiremock-standalone-3.9.1.jar` não está versionado no repositório. Faça o download executando o comando abaixo na **raiz do projeto**:

```powershell
Invoke-WebRequest -Uri "https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/3.9.1/wiremock-standalone-3.9.1.jar" -OutFile "wiremock-standalone-3.9.1.jar"
```

Após o download, confirme que o arquivo está na raiz do projeto:

```powershell
dir *.jar
```

---

## 5. Instalar as dependências do projeto

```powershell
cd backend
npm install
```

> **Importante:** o comando `npm install` deve ser executado dentro da pasta `backend`.

---

# 🚀 Execução do projeto

A execução envolve dois processos rodando em paralelo — utilize **duas janelas do PowerShell**.

---

## Terminal 1 — Iniciar o WireMock

Na raiz do projeto, execute:

```powershell
java -jar .\wiremock-standalone-3.9.1.jar --port 8080
```

Quando iniciado corretamente:

```text
version: 3.9.1
port: 8080
```

> ⚠️ **Não feche esse terminal.** O WireMock precisa permanecer em execução durante os testes.

---

## Terminal 2 — Executar os testes

```powershell
cd backend
npx codeceptjs run
```

### Resultado esperado

```text
Consulta de veiculos --

  √ Fazendo um GET para o endpoint
  √ Cadastrando um veículo utilizando POST
  √ Validando veículo inexistente POST 404
  √ Validando veículo com erro POST 500

  OK  | 4 passed
```

### Modo detalhado

```powershell
npx codeceptjs run --verbose
```

---

# 🔄 Fluxo completo de execução

```text
1. Instalar Git, Node.js, npm e Java
        ↓
2. Clonar o repositório
        ↓
3. Baixar o wiremock-standalone-3.9.1.jar
        ↓
4. Acessar a pasta backend e executar npm install
        ↓
5. Terminal 1 → iniciar o WireMock na porta 8080
        ↓
6. Terminal 2 → executar npx codeceptjs run
        ↓
7. Confirmar "OK | 4 passed"
```

---

# ⚙️ Configuração do CodeceptJS

```javascript
helpers: {
  REST: {
    endpoint: 'http://localhost:8080',
    defaultHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  JSONResponse: {}
}
```

> **Importante:** a porta utilizada pelo WireMock e a configurada no `endpoint` do CodeceptJS precisam ser iguais.

---

# 🧩 Como o WireMock funciona neste projeto

```text
CodeceptJS
    │
    │ HTTP Request
    ▼
http://localhost:8080
    │
    ▼
WireMock
    │
    ├── GET  /api/cars → 200
    ├── POST /api/cars → 201
    ├── POST /api/cars → 404
    └── POST /api/cars → 500
```

---

## 🔭 Postman

O Postman complementa a automação como ferramenta de exploração e validação manual:

- **Validar endpoints** antes de automatizar
- **Conferir** método HTTP, payload e status codes
- **Diagnosticar** falhas durante o desenvolvimento

> Postman → validação manual → CodeceptJS → automação → WireMock → simulação do backend.


### 1. Consultar veículos

| ID | Descrição | Endpoint / Fluxo |
| :--- | :--- | :--- |
| **01** | **Cenário:** Consulta de lista de veículos cadastrados com sucesso <br><br> **Dado** que a API esteja online e com registros cadastrados na base de dados <br> **Quando** o cliente enviar uma requisição `GET` para o endpoint `/api/cars` <br> **Então** o sistema deve retornar a lista de veículos cadastrados | Consultar veículos → `GET /api/cars` → `200` |

🎬 **Vídeo:**

https://github.com/user-attachments/assets/76369f5c-6d55-410b-abad-0dc24e388ae4

---

### 2. Cadastrar um veículo válido

| ID | Descrição | Endpoint / Fluxo |
| :--- | :--- | :--- |
| **02** | **Cenário:** Cadastro de veículo com dados válidos <br><br> **Dado** que o payload da requisição contenha todos os campos obrigatórios e válidos <br> **Quando** o cliente enviar uma requisição `POST` para o endpoint `/api/cars` <br> **Então** o sistema deve cadastrar o veículo na base de dados | Cadastrar um veículo válido → `POST /api/cars` → `201` |

## 🎬 **Vídeo:**

https://github.com/user-attachments/assets/d6ed52f9-1536-4c3e-9c4c-c939ca61e228

---

### 3. Tentar cadastrar um veículo inexistente

| ID | Descrição | Endpoint / Fluxo |
| :--- | :--- | :--- |
| **03** | **Cenário:** Tentativa de cadastro referenciando um recurso inexistente <br><br> **Dado** que o payload informe um identificador de recurso não cadastrado <br> **Quando** o cliente enviar uma requisição `POST` para o endpoint `/api/cars` <br> **Então** o sistema deve recusar o cadastro | Tentar cadastrar um veículo inexistente → `POST /api/cars` → `404` |


## 🎬 **Vídeo:**

https://github.com/user-attachments/assets/53cf60da-51ed-4f51-820b-f6e1c1b8f48f

---

### 4. Tentar cadastrar um modelo não permitido

| ID | Descrição | Endpoint / Fluxo |
| :--- | :--- | :--- |
| **04** | **Cenário:** Tentativa de cadastro com modelo não permitido <br><br> **Dado** que o payload contenha um modelo restrito ou inválido para o sistema <br> **Quando** o cliente enviar uma requisição `POST` para o endpoint `/api/cars` <br> **Então** o servidor deve retornar uma falha interna | Tentar cadastrar um modelo não permitido → `POST /api/cars` → `500` |

## 🎬 **Vídeo:**

https://github.com/user-attachments/assets/41e2e5ef-0b70-4623-a24e-5e31b2a15d8c

---

## 📊 Relatórios de testes: Mochawesome

O projeto utiliza o **Mochawesome Repor**t para gerar relatórios visuais das execuções dos testes automatizados realizados com CodeceptJS.

O relatório permite acompanhar de forma clara os cenários executados, resultados, falhas e duração dos testes, proporcionando maior visibilidade, rastreabilidade e facilidade na análise dos resultados.

Essa prática transforma os resultados da automação em uma evidência estruturada da qualidade da aplicação, facilitando a identificação de falhas e a comunicação dos resultados entre QA, desenvolvimento e demais envolvidos no projeto.

O projeto utiliza o **Mochawesome** para gerar relatórios visuais das execuções, o relatório pode ser consultado em:

```text
backend/mochawesome-report/mochawesome.html
```

## 🎬 **Vídeo:**

https://github.com/user-attachments/assets/d63cd263-7e91-4a78-bfe9-212dab089143

---

# 🛠️ Problemas comuns

| Sintoma                                 | Causa provável                                   | Solução                                                     |
| --------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| Testes retornam `404`                   | WireMock iniciado fora da raiz do projeto        | Inicie o WireMock na pasta que contém `mappings`            |
| `Invalid URL`                           | URL sem a barra inicial                          | Utilize `"/api/cars"` em vez de `"api/cars"`                |
| `I.seeResponseCodeIs is not a function` | Helper `JSONResponse` ausente                    | Adicione `JSONResponse: {}` na configuração                 |
| Porta `8080` em uso                     | Outro processo utilizando a porta                | Encerre o processo anterior ou utilize outra porta          |
| `java` não é reconhecido                | Java não instalado ou fora do `PATH`             | Instale o Java e execute `java -version`                    |
| `node` não é reconhecido                | Node.js não instalado ou fora do `PATH`          | Instale o Node.js e execute `node --version`                |
| `npm install` apresenta erro            | Comando executado fora da pasta `backend`        | Execute `cd backend` antes de `npm install`                 |
| Testes não conectam à API               | WireMock não está em execução                    | Inicie o WireMock na porta configurada                      |
| `Unable to access jarfile`              | Arquivo `.jar` ausente na raiz do projeto        | Execute o comando de download do WireMock (ver seção 4)     |

---

# ✅ Validação do ambiente

O ambiente está correto quando todas as condições abaixo forem atendidas:

1. Git, Node.js, npm e Java instalados e disponíveis no terminal
2. Repositório clonado corretamente
3. WireMock baixado e presente na raiz do projeto
4. Dependências instaladas com `npm install` dentro de `backend/`
5. WireMock iniciado na porta `8080`
6. Os quatro cenários executados sem falhas
7. Terminal apresenta `OK | 4 passed`

 ---

## 🚧 Limitações e escopo



------------


 ## 🚀 Próximos passos (CI/CD)


 ---
 
## 💡 Aprendizados técnicos



 ---
 
 ## 📬 Contato

 
| LinkedIn                   |  https://www.linkedin.com/in/diogoamanciosilva/ |
| ------------------------- | ------: |

| E-mail                   |  diogoamanciosilva@gmail.com/ |
| ------------------------- | ------: |

