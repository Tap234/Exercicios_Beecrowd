let index = 0;
const totalCasos = parseInt(lines[index++].trim(), 10);

function calcularMDC(a, b) {
  while (b !== 0) {
    const resto = a % b;
    a = b;
    b = resto;
  }
  return a;
}

for (let numeroDoCaso = 1; numeroDoCaso <= totalCasos; numeroDoCaso++) {

  const stringBinaria1 = lines[index++].trim();
  const stringBinaria2 = lines[index++].trim();


  const valorDecimal1 = parseInt(stringBinaria1, 2);
  const valorDecimal2 = parseInt(stringBinaria2, 2);


  const mdc = calcularMDC(valorDecimal1, valorDecimal2);

  if (mdc > 1) {
    console.log(`Pair #${numeroDoCaso}: All you need is love!`);
  } else {
    console.log(`Pair #${numeroDoCaso}: Love is not all you need!`);
  }
}
