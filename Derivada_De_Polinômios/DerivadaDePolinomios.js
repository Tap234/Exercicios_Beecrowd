var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split(/\r?\n/);

let i = 0;

while (i < lines.length) {
    while (i < lines.length && lines[i].trim() === '') i++;
    if (i >= lines.length) break;
    
    const tline = lines[i++].trim();
    if (tline === undefined) break;

    let quantidadeTermos = parseInt(tline.trim(), 10);
    let expressao = lines[i++].trim();
    let termos = expressao.split('+').map(t => t.trim());
    for (let te = 0; te < quantidadeTermos; te++) {
        let termosDivididos = termos[te].match(/([0-9]+)x([0-9]+)/);
        let coeficiente = parseInt(termosDivididos[1], 10);
        let expoente = parseInt(termosDivididos[2], 10);
        let novoCoeficiente = coeficiente * expoente;
        let novoExpoente = expoente - 1;

        if (te > 0) process.stdout.write(' + ');

        if (novoExpoente === 1) process.stdout.write(`${novoCoeficiente}x`);
        else process.stdout.write(`${novoCoeficiente}x${novoExpoente}`);   
    }
    process.stdout.write('\n');
}