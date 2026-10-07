# EM ATUALIZAÇÃO


## Finalidade do projeto

O projeto simula uma API de gerenciamento de veículos e utiliza o WireMock para representar o comportamento de um backend real, permitindo testar diferentes respostas da API sem depender de um sistema de produção.

Na prática, os testes automatizados simulam operações que um usuário ou sistema cliente faria, como:

Consultar veículos → GET /api/cars
Cadastrar um veículo válido → POST /api/cars → 201
Tentar cadastrar um veículo inexistente/não encontrado → POST /api/cars → 404
Tentar cadastrar um modelo não permitido → POST /api/cars → 500

O CodeceptJS envia as requisições e valida se a API retorna exatamente o comportamento esperado. O WireMock atua como o backend simulado, fornecendo respostas previamente configuradas.

Linha de raciocínio sob a perspectiva do usuário final

Uma forma simples de explicar todo o projeto seria:

Imagine que o usuário esteja utilizando uma aplicação de veículos.
Essa aplicação precisa conversar com uma API para consultar e cadastrar veículos.

Quando o usuário solicita a consulta de veículos, a aplicação faz uma requisição GET para a API. O sistema deve responder corretamente com os veículos disponíveis.
Quando o usuário cadastra um veículo válido, a aplicação envia uma requisição POST. O sistema deve confirmar o cadastro com uma resposta de sucesso (201) e retornar os dados esperados.

Porém, nem todas as operações serão bem-sucedidas. Por isso, o projeto também verifica como o sistema se comporta diante de situações de erro, como um veículo não encontrado (404) ou um modelo não permitido que provoque um erro interno (500).
Para reproduzir esses diferentes comportamentos de maneira controlada, o projeto utiliza o WireMock, que simula a API e permite definir previamente quais respostas devem ser retornadas.
Por fim, o CodeceptJS automatiza essas interações e verifica se a API realmente responde conforme o comportamento esperado.

## Em uma única frase

É um projeto de automação de testes de API que simula uma aplicação de gerenciamento de veículos, utilizando o WireMock como backend simulado e o CodeceptJS para validar automaticamente cenários de sucesso e diferentes condições de erro.

<img width="1312" height="1199" alt="Infográfico de Testes de API com CodeceptJS e WireMock" src="https://github.com/user-attachments/assets/953ca99a-9606-49ca-97c6-40d9f62a36c8" />



## 🤖 Testes de API com CodeceptJS e WireMock

Projeto de automação de testes de API desenvolvido com **CodeceptJS**, utilizando os helpers `REST` e `JSONResponse`, executados contra uma API simulada com **WireMock**.

O projeto demonstra a aplicação de testes automatizados para validação de diferentes comportamentos de uma API REST, contemplando cenários de **sucesso, recurso inexistente e erro interno**.

A estrutura é organizada para permitir uma configuração simples e reproduzível do ambiente, facilitando a execução.

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

Valida uma requisição:

```http
GET /api/cars
```

Resultado esperado:

```text
HTTP 200
```

---

#### 2. Cadastro de veículo

Valida o cadastro do veículo:

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

Valida o comportamento da API ao receber um veículo não encontrado:

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

Valida o comportamento da API diante de um erro interno:

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
teste-codeceptjs-api/
├── backend/                         # Testes automatizados com CodeceptJS
│   ├── codecept.conf.js             # Configuração do CodeceptJS
│   ├── package.json                 # Dependências e scripts do projeto
│   └── tests/
│       └── veiculos_teste.js        # Cenários automatizados da API
├── mappings/                        # Rotas e respostas simuladas do WireMock
│   ├── get-apicars-*.json
│   ├── post-apicars-*.json
│   └── ...
├── .gitignore
├── README.md
└── wiremock-standalone-3.9.1.jar    # Executável do WireMock
```

### Responsabilidade de cada diretório

| Diretório/arquivo               | Responsabilidade                                                     |
| ------------------------------- | -------------------------------------------------------------------- |
| `backend/`                      | Contém a configuração e os testes do CodeceptJS                      |
| `backend/tests/`                | Contém os cenários automatizados                                     |
| `mappings/`                     | Define os endpoints, requisições e respostas simuladas pelo WireMock |
| `wiremock-standalone-3.9.1.jar` | Executa o servidor WireMock localmente                               |
| `README.md`                     | Documentação do projeto                                              |

---

# ⚙️ Instalação e configuração do ambiente

Esta seção apresenta o passo a passo completo para configurar o ambiente, instalar as dependências e executar os testes automatizados.

O procedimento foi validado em ambiente **Windows utilizando PowerShell**.

---

## 1. Pré-requisitos

Antes de iniciar, certifique-se de que as seguintes ferramentas estejam instaladas:

| Ferramenta     | Finalidade                                      |
| -------------- | ----------------------------------------------- |
| **Git**        | Clonar o repositório e controlar versões        |
| **Node.js**    | Executar o ambiente JavaScript                  |
| **npm**        | Instalar e gerenciar as dependências do projeto |
| **Java JDK**   | Executar o WireMock                             |
| **PowerShell** | Executar os comandos deste guia                 |

### Tecnologias utilizadas

* [CodeceptJS](https://codecept.io/)
* [WireMock](https://wiremock.org/)
* [Node.js](https://nodejs.org/)
* Java
* Git

---

## 2. Verificar as instalações

Abra o **PowerShell** e verifique se as ferramentas estão disponíveis.

### Git

```powershell
git --version
```

### Node.js

```powershell
node --version
```

### npm

```powershell
npm --version
```

### Java

```powershell
java -version
```

Se os comandos retornarem as respectivas versões, o ambiente básico está disponível.

> **Importante:** caso algum comando não seja reconhecido, a respectiva ferramenta precisa ser instalada e configurada no `PATH` do sistema antes de continuar.

---

## 3. Clonar o repositório

No PowerShell, execute:

```powershell
git clone https://github.com/diogoamanciosilva/teste-api-wiremock-codeceptjs.git
```

Entre na pasta do projeto:

```powershell
cd teste-api-wiremock-codeceptjs
```

Para confirmar que você está no diretório correto:

```powershell
Get-ChildItem
```

A estrutura principal deverá ser semelhante a:

```text
teste-api-wiremock-codeceptjs/
├── backend/
├── mappings/
├── .gitignore
├── README.md
└── wiremock-standalone-3.9.1.jar
```

> **Importante:** os comandos deste guia devem ser executados a partir dos diretórios indicados em cada etapa.

---

## 4. Instalar as dependências do projeto

Entre na pasta `backend`:

```powershell
cd backend
```

Instale as dependências:

```powershell
npm install
```

O `npm` instalará os pacotes necessários para execução dos testes automatizados definidos no `package.json`.

> **Importante:** o comando `npm install` deve ser executado dentro da pasta `backend`, pois é nela que está localizado o `package.json` utilizado pelo projeto.

Após a instalação, o diretório poderá conter também o arquivo `package-lock.json` e a pasta `node_modules`, conforme o gerenciamento de dependências do npm.

---

# 🚀 Execução do projeto

A execução do projeto envolve dois processos:

1. **WireMock**, responsável por simular a API;
2. **CodeceptJS**, responsável por executar os testes automatizados.

Por esse motivo, serão utilizadas **duas janelas do PowerShell**.

---

## 5. Iniciar o WireMock

### 5.1 Abrir um segundo terminal

Mantenha o terminal utilizado para instalação das dependências aberto.

Abra uma **segunda janela do PowerShell**.

Na segunda janela, acesse a **raiz do projeto**, onde estão localizados o arquivo `wiremock-standalone-3.9.1.jar` e a pasta `mappings`.

Exemplo:

```powershell
cd C:\QAZANDO\teste-codeceptjs-api
```

> Substitua o caminho pelo diretório onde o repositório foi clonado na sua máquina.

### 5.2 Executar o WireMock

Execute:

```powershell
java -jar .\wiremock-standalone-3.9.1.jar --port 8080
```

Quando o WireMock iniciar corretamente, deverá apresentar informações semelhantes a:

```text
version: 3.9.1
port: 8080
```

Isso significa que o servidor simulado está disponível na porta:

```text
8080
```

### ⚠️ Importante

**Não feche essa janela do PowerShell.**

O processo do WireMock precisa permanecer em execução enquanto os testes forem executados.

O WireMock carregará as rotas simuladas existentes na pasta:

```text
mappings/
```

---

## 6. Validar o WireMock

Antes de executar a suíte automatizada, é possível verificar diretamente se o servidor está respondendo.

Abra ou utilize a **segunda janela do PowerShell** e execute:

```powershell
Invoke-RestMethod http://localhost:8080/api/cars
```

O endpoint deverá retornar a resposta configurada no mapping de consulta.

Entre os dados esperados está o veículo:

```json
{
  "brand": "volks",
  "model": "gol",
  "year": 2018
}
```

Essa etapa permite validar que o WireMock está funcionando antes da execução dos testes automatizados.

---

## 7. Executar os testes automatizados

Volte para a janela do PowerShell utilizada para trabalhar com o projeto.

Se necessário, acesse novamente a pasta `backend`:

```powershell
cd C:\QAZANDO\teste-codeceptjs-api\backend
```

Execute a suíte:

```powershell
npx codeceptjs run
```

O CodeceptJS executará os cenários definidos em:

```text
backend/tests/veiculos_teste.js
```

---

## 8. Resultado esperado

Quando o ambiente estiver configurado corretamente e todos os testes forem aprovados, o terminal deverá apresentar um resultado semelhante a:

```text
Consulta de veiculos --

  √ Fazendo um GET para o endpoint
  √ Cadastrando um veículo utilizando POST
  √ Validando veículo inexistente POST 404
  √ Validando veículo com erro POST 500

  OK  | 4 passed
```

O resultado:

```text
OK | 4 passed
```

confirma que os quatro cenários automatizados foram executados com sucesso.

---

## 9. Executar os testes em modo detalhado

Para visualizar informações adicionais durante a execução, utilize:

```powershell
npx codeceptjs run --verbose
```

Esse modo é útil principalmente durante atividades de:

* análise de falhas;
* depuração;
* manutenção dos testes;
* investigação de respostas da API;
* desenvolvimento de novos cenários.

---

# 🔄 Fluxo completo de execução

O processo completo pode ser resumido da seguinte maneira:

```text
1. Instalar Git, Node.js, npm e Java
        ↓
2. Clonar o repositório
        ↓
3. Acessar a pasta backend
        ↓
4. Executar npm install
        ↓
5. Abrir um segundo PowerShell
        ↓
6. Acessar a raiz do projeto
        ↓
7. Iniciar o WireMock na porta 8080
        ↓
8. Validar /api/cars
        ↓
9. Executar npx codeceptjs run
        ↓
10. Confirmar "OK | 4 passed"
```

---

# ⚙️ Configuração do CodeceptJS

A URL base utilizada pelos testes está configurada em:

```text
backend/codecept.conf.js
```

A configuração do helper REST é semelhante a:

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

### URL base

O endpoint configurado é:

```text
http://localhost:8080
```

Os testes utilizam caminhos relativos, como:

```javascript
"/api/cars"
```

Dessa forma, o CodeceptJS combina a URL base com o endpoint utilizado no cenário.

---

## 🔧 Alteração da porta do WireMock

Caso seja necessário executar o WireMock em outra porta, por exemplo:

```powershell
java -jar .\wiremock-standalone-3.9.1.jar --port 9090
```

a URL configurada no CodeceptJS também deverá ser alterada.

No arquivo:

```text
backend/codecept.conf.js
```

altere:

```javascript
endpoint: 'http://localhost:8080'
```

para:

```javascript
endpoint: 'http://localhost:9090'
```

> **Importante:** a porta utilizada pelo WireMock e a porta configurada no `endpoint` do CodeceptJS precisam ser iguais.

---

# 🧩 Como o WireMock funciona neste projeto

O WireMock atua como uma API simulada.

Os comportamentos dos endpoints são definidos pelos arquivos JSON presentes em:

```text
mappings/
```

Por exemplo, existe um mapping para:

```text
GET /api/cars
```

e mappings específicos para os diferentes comportamentos do:

```text
POST /api/cars
```

Dessa forma, cada cenário de teste possui uma resposta controlada e previsível.

### Arquitetura simplificada

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
    ├── GET /api/cars → 200
    │
    ├── POST /api/cars → 201
    │
    ├── POST /api/cars → 404
    │
    └── POST /api/cars → 500
```

Essa abordagem permite executar os testes localmente sem depender de uma API externa.

---

# 🛠️ Problemas comuns

| Sintoma                                 | Causa provável                                      | Solução                                                     |
| --------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| Testes retornam `404`                   | WireMock iniciado fora da raiz do projeto           | Inicie o WireMock na pasta que contém `mappings`            |
| `Invalid URL`                           | URL do teste sem a barra inicial                    | Utilize `"/api/cars"` em vez de `"api/cars"`                |
| `I.seeResponseCodeIs is not a function` | Helper `JSONResponse` ausente                       | Adicione `JSONResponse: {}` na configuração                 |
| Porta `8080` em uso                     | Outro processo está utilizando a porta              | Encerre o processo anterior ou utilize outra porta          |
| `java` não é reconhecido                | Java não está instalado ou configurado no `PATH`    | Instale/configure o Java e execute `java -version`          |
| `node` não é reconhecido                | Node.js não está instalado ou configurado no `PATH` | Instale/configure o Node.js e execute `node --version`      |
| `npm install` apresenta erro            | Comando executado fora da pasta `backend`           | Execute `cd backend` antes de `npm install`                 |
| Testes não conseguem conectar à API     | WireMock não está em execução                       | Inicie o WireMock na porta configurada                      |
| Testes apresentam falhas inesperadas    | Configuração do WireMock ou endpoint incorreta      | Verifique o WireMock, a porta `8080` e o `codecept.conf.js` |

---

## 🔍 WireMock não inicia

Se o comando:

```powershell
java -jar .\wiremock-standalone-3.9.1.jar --port 8080
```

apresentar erro relacionado ao Java, verifique:

```powershell
java -version
```

Caso o comando não seja reconhecido, será necessário instalar e configurar o **Java JDK**.

Também confirme se o terminal está localizado na raiz do projeto, onde o arquivo:

```text
wiremock-standalone-3.9.1.jar
```

está presente.

---

## 🔍 Erro ao executar `npm install`

Confirme o diretório atual:

```powershell
Get-Location
```

O caminho deverá terminar em:

```text
\teste-codeceptjs-api\backend
```

Depois execute:

```powershell
npm install
```

---

## 🔍 Erro de conexão durante os testes

Se o CodeceptJS não conseguir acessar a API, verifique:

### 1. WireMock está em execução?

A janela do WireMock deverá permanecer aberta.

### 2. Qual porta está sendo utilizada?

O projeto utiliza:

```text
8080
```

### 3. O endpoint está configurado corretamente?

Verifique:

```text
backend/codecept.conf.js
```

O valor esperado é:

```javascript
endpoint: 'http://localhost:8080'
```

### 4. A API simulada responde?

Execute:

```powershell
Invoke-RestMethod http://localhost:8080/api/cars
```

Se o endpoint responder, o WireMock está acessível.

---

## 🔍 Os testes apresentam falha

Primeiro confirme se o WireMock está executando.

Depois confirme se o CodeceptJS está sendo executado a partir da pasta `backend`:

```powershell
cd backend
```

Execute novamente:

```powershell
npx codeceptjs run
```

Para obter informações adicionais:

```powershell
npx codeceptjs run --verbose
```

---

# 📌 Observações importantes

* O **WireMock** é utilizado para simular a API utilizada pelos testes.
* Os endpoints e respostas simuladas são definidos pelos arquivos JSON presentes em `mappings/`.
* Os testes automatizados são executados pelo **CodeceptJS**.
* O helper `REST` é utilizado para realizar as requisições HTTP.
* O helper `JSONResponse` é utilizado para validações relacionadas às respostas JSON.
* As dependências JavaScript são gerenciadas pelo **npm**.
* O projeto utiliza a porta `8080` por padrão.
* O processo do WireMock deve permanecer ativo durante a execução dos testes.
* O CodeceptJS deve ser executado dentro da pasta `backend`.
* O WireMock deve ser iniciado na raiz do projeto, onde estão o arquivo `.jar` e a pasta `mappings`.
* A execução dos testes não depende de uma API externa.
* Os cenários possuem respostas controladas por mappings do WireMock.
* O resultado esperado da suíte atual é de **4 testes aprovados**.

---

## Postman

O Postman é importante no projeto porque permite testar e validar a API manualmente antes e durante a automação.

No seu cenário, ele cumpre principalmente três funções:

Validar os endpoints: permite verificar GET /api/cars e POST /api/cars diretamente.
Conferir requisições e respostas: facilita analisar método HTTP, payload JSON, status codes (200, 201, 404, 500) e mensagens retornadas.
Dar suporte à automação: antes de transformar um cenário em teste automatizado no CodeceptJS, o Postman permite confirmar qual é o comportamento esperado da API.
Em resumo

Postman → validação manual da API → CodeceptJS → automação dos cenários → WireMock → simulação controlada do backend.

Ou seja, o Postman não substitui o CodeceptJS. Ele complementa a automação, funcionando como uma ferramenta de exploração, validação e diagnóstico da API.

Essa combinação demonstra uma abordagem interessante: primeiro entender e validar o comportamento da API; depois automatizar os cenários que precisam ser executados de forma repetitiva e confiável.

# ✅ Validação do ambiente

O ambiente está configurado corretamente quando todas as condições abaixo forem atendidas:

1. Git está instalado e disponível no terminal;
2. Node.js está instalado;
3. npm está disponível;
4. Java está instalado e disponível;
5. O repositório foi clonado corretamente;
6. As dependências foram instaladas com `npm install`;
7. O WireMock inicia corretamente na porta `8080`;
8. O endpoint `GET /api/cars` responde;
9. O CodeceptJS consegue acessar o WireMock;
10. Os quatro cenários são executados sem falhas;
11. O terminal apresenta:

```text
OK | 4 passed
```

Esse resultado confirma que o ambiente de testes está configurado corretamente e que a suíte automatizada pode ser executada com sucesso.

---

## 🏷️ Tecnologias utilizadas

![API](https://img.shields.io/badge/API-Testing-1E88E5?style=for-the-badge)
![API Testing](https://img.shields.io/badge/API%20Testing-Automation-1E88E5?style=for-the-badge)
![REST API](https://img.shields.io/badge/REST%20API-Testing-6C63FF?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge\&logo=postman\&logoColor=white)
![CodeceptJS](https://img.shields.io/badge/CodeceptJS-API%20Testing-6C63FF?style=for-the-badge)
![Mochawesome](https://img.shields.io/badge/Mochawesome-Test%20Reporting-6C63FF?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Test%20Automation-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![WireMock](https://img.shields.io/badge/WireMock-API%20Mocking-6C63FF?style=for-the-badge)
![JSON](https://img.shields.io/badge/JSON-Data%20Format-000000?style=for-the-badge\&logo=json\&logoColor=white)
![HTTP](https://img.shields.io/badge/HTTP-Protocol-005571?style=for-the-badge)
![Automated Testing](https://img.shields.io/badge/Automated%20Testing-QA-1E88E5?style=for-the-badge)
![Test Scripts](https://img.shields.io/badge/Test%20Scripts-Automation-CB171E?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-Runtime-ED8B00?style=for-the-badge\&logo=openjdk\&logoColor=white)
![npm](https://img.shields.io/badge/npm-Package%20Manager-CB3837?style=for-the-badge\&logo=npm\&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github\&logoColor=white)
![PowerShell](https://img.shields.io/badge/PowerShell-Terminal-5391FE?style=for-the-badge\&logo=powershell\&logoColor=white)
---

## 🎯 Resultado esperado

Ao final da configuração, o projeto deverá permitir a execução local de uma suíte de testes de API composta por quatro cenários:

```text
GET  /api/cars → 200
POST /api/cars → 201
POST /api/cars → 404
POST /api/cars → 500
```

Com todos os cenários aprovados:

```text
OK | 4 passed
```

Isso demonstra que o ambiente, o servidor simulado WireMock, a configuração do CodeceptJS e a suíte de testes estão funcionando de forma integrada.


## 📊 Relatórios de testes

O projeto utiliza o **Mochawesome Report** para gerar relatórios visuais das execuções dos testes automatizados realizados com **CodeceptJS**.

O relatório permite acompanhar de forma clara os **cenários executados, resultados, falhas e duração dos testes**, proporcionando maior **visibilidade, rastreabilidade e facilidade na análise dos resultados**.

Essa prática transforma os resultados da automação em uma evidência estruturada da qualidade da aplicação, facilitando a identificação de falhas e a comunicação dos resultados entre **QA, desenvolvimento e demais envolvidos no projeto**.

O relatório pode ser consultado por meio do arquivo `mochawesome.html`, disponibilizado na pasta `backend/mochawesome-report/`.

