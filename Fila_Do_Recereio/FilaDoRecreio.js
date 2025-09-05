let i = 0;
let casos = parseInt(lines[i++].trim(), 10);

for (let c = 0; c< casos; c++) {
    let alunos = parseInt(lines[i++].trim(), 10);
    let notas = lines[i++].trim().split(/\s+/).map(Number);
    let notasOrdenadas = [...notas].sort((a, b) => b - a);
    let naoMudaram = 0;

    for (let a= 0; a<alunos; a++) {
        if (notas[a] ===notasOrdenadas[a])
            naoMudaram++;
    }
    console.log(naoMudaram);  
}