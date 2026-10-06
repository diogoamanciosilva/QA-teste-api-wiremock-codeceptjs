# Testes de API com CodeceptJS e WireMock

Projeto de automação de testes de API. Os testes são escritos em **CodeceptJS** (helpers `REST` e `JSONResponse`) e executados contra uma API simulada com **WireMock**.

## O que é testado

Endpoint `/api/cars`:

| Cenário | Método | Resposta esperada |
|---|---|---|
| Consultar veículos | GET | 200 |
| Cadastrar veículo (fusca) | POST | 201 + mensagem de sucesso e `carId` |
| Veículo inexistente (ronaldo) | POST | 404 + `Vehicle not found.` |
| Modelo não permitido (up tsi) | POST | 500 + mensagem de erro interno |

## Estrutura do projeto

```
teste-codeceptjs-api/
├── backend/                         # Testes CodeceptJS
│   ├── codecept.conf.js
│   ├── package.json
│   └── tests/veiculos_teste.js
├── mappings/                        # Rotas simuladas do WireMock (arquivos .json)
└── wiremock-standalone-3.9.1.jar    # WireMock
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [Java](https://www.java.com/) (para executar o WireMock)
- Git

Para conferir as instalações:

```powershell
node -v
java -version
```

> Se o arquivo `wiremock-standalone-3.9.1.jar` não estiver no repositório, baixe-o em [wiremock.org](https://wiremock.org/docs/standalone/) e coloque na raiz do projeto, ao lado da pasta `mappings`.

## Como executar

### 1. Clonar o repositório

```powershell
git clone https://github.com/diogoamanciosilva/teste-api-wiremock-codeceptjs.git
cd teste-api-wiremock-codeceptjs
```

### 2. Iniciar o WireMock

Na **raiz do projeto** (onde fica a pasta `mappings`):

```powershell
java -jar wiremock-standalone-3.9.1.jar --port 8080
```

Deixe esse terminal aberto. O WireMock carrega automaticamente as rotas da pasta `mappings`.

Para conferir, em **outro terminal**:

```powershell
Invoke-RestMethod http://localhost:8080/api/cars
```

Deve retornar o veículo `gol`.

### 3. Instalar as dependências

```powershell
cd backend
npm install
```

### 4. Executar os testes

```powershell
npx codeceptjs run
```

Resultado esperado:

```
OK  | 4 passed
```

Para ver os detalhes de cada requisição e resposta:

```powershell
npx codeceptjs run --verbose
```

## Configuração

A URL base da API está em `backend/codecept.conf.js`:

```js
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

Se o WireMock usar outra porta, altere o valor de `endpoint`.

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Testes retornam 404 | WireMock iniciado fora da raiz do projeto | Inicie o WireMock na pasta que contém `mappings` |
| `Invalid URL` | URL do teste sem a barra inicial | Use `"/api/cars"`, e não `"api/cars"` |
| `I.seeResponseCodeIs is not a function` | Helper `JSONResponse` ausente | Adicione `JSONResponse: {}` em `helpers` |
| Porta 8080 em uso | Outro WireMock já está rodando | Encerre o processo anterior ou use outra porta |

## Tecnologias

- [CodeceptJS](https://codecept.io/)
- [WireMock](https://wiremock.org/)
- Node.js
