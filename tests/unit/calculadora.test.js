const calculadora = require("../../models/calculadora");

test("Somar 2 + 2 deveria dar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 'banana' + 100 deveria dar erro", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});