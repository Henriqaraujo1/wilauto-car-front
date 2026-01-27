export function gerarCNPJ() {
  const randomDigits = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10)
  );
  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += randomDigits[i] * (5 + (i % 8));
  }
  let primeiroDigito = 0;
  if (soma % 11 >= 2) {
    primeiroDigito = 11 - (soma % 11);
  }
  randomDigits.push(primeiroDigito);

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += randomDigits[i] * (6 + (i % 8));
  }
  let segundoDigito = 0;
  if (soma % 11 >= 2) {
    segundoDigito = 11 - (soma % 11);
  }
  randomDigits.push(segundoDigito);

  // Retornar CNPJ sem pontuação
//   console.log(randomDigits)
  return randomDigits.join("");
}

// console.log(gerarCNPJ());
