let palavraDeParada = "EOF";
let i = 0;
let nomes = [];

while(i < lines.length) {
    let linha = lines[i++].trim();
    if(linha === palavraDeParada) break;

    if (linha !== "") {
        nomes.push(linha);
    }
}

let ultimoNome = nomes.reduce((maior, atual) => {
    return atual.toLowerCase() > maior.toLowerCase() ? atual : maior;
});

console.log(ultimoNome);