// Importando o módulo API do CodeceptJS
Feature("Consulta de veiculos");

Scenario("Fazendo um GET para o endpoint", ({ I }) => {
  I.sendGetRequest("/api/cars");
  I.seeResponseCodeIs(200); //GET retorna 200//
});

Scenario("Cadastrando um veículo utilizando POST", ({ I }) => {
  I.sendPostRequest("/api/cars", { brand: "volks", model: "fusca", year: 2019 });
  I.seeResponseCodeIs(201); //POST retorna 201//
  I.seeResponseContainsJson({
    message: "Car successfully registered!",
    carId: 6,
  });
});

Scenario("Validando veículo inexistente POST 404", ({ I }) => {
  I.sendPostRequest("/api/cars", {
    brand: "volks",
    model: "ronaldo",
    year: 2019,
  });
  I.seeResponseCodeIs(404);
  I.seeResponseContainsJson({ message: "Vehicle not found." });
});

Scenario("Validando veículo com erro POST 500", ({ I }) => {
  I.sendPostRequest("/api/cars", {
    brand: "volks",
    model: "up tsi",
    year: 2019,
  });
  I.seeResponseCodeIs(500);
  I.seeResponseContainsJson({
    message: "Internal server error: model 'up tsi' is not allowed.",
  });
});