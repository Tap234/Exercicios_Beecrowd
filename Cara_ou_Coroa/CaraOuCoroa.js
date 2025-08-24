let i = 0;

while (true) {
  let N = parseInt(lines[i]); 
  if (N === 0) break;     

  let resultados = lines[i + 1].split(" ").map(Number);
  let maria = 0;
  let joao = 0;

  for (let j = 0; j < N; j++) {
    if (resultados[j] === 0) {
      maria++;
    } else {
      joao++;
    }
  }

  console.log(`Mary won ${maria} times and John won ${joao} times`);

  i += 2;
}