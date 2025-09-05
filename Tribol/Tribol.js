let i = 0;
const C = parseInt(lines[i++].trim(), 10);

for (let t = 0; t < C; t++) {
  while (i < lines.length && lines[i].trim() === '') i++;

  const quantidadeGols = parseInt(lines[i++].trim(), 10);

  let golG = 0, golR = 0, golB = 0;

  for (let g = 0; g < quantidadeGols; g++) {
    let gols = lines[i++].trim().split(/\s+/);

    // dobro (sentido horário): RG, GB, BR
    if ((gols[0] === 'R' && gols[1] === 'G') ||
        (gols[0] === 'G' && gols[1] === 'B') ||
        (gols[0] === 'B' && gols[1] === 'R')) {
      if (gols[0] === 'G') golG += 2;
      else if (gols[0] === 'R') golR += 2;
      else golB += 2;
    } else {
      // normal (anti-horário): GR, BG, RB
      if (gols[0] === 'G') golG += 1;
      else if (gols[0] === 'R') golR += 1;
      else golB += 1;
    }
  }

  const maior = Math.max(golG, golR, golB);

  if (golG === golR && golG === golB) {
    console.log('trempate');
  } else if (
    (golG === maior && golR === maior) ||
    (golG === maior && golB === maior) ||
    (golR === maior && golB === maior)
  ) {
    console.log('empate');
  } else if (golG === maior) {
    console.log('green');
  } else if (golR === maior) {
    console.log('red');
  } else {
    console.log('blue');
  }
}
