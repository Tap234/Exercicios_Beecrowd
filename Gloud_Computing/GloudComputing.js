let i = 0;

while (true) {
  let [N, M] = lines[i].trim().split(" ").map(Number);
  if (N === 0 && M === 0) break;

  // Servidores
  let servidores = [];
  for (let s = 0; s < N; s++) {
    let parts = lines[i + 1 + s].trim().split(" ");
    let Q = parseInt(parts[0]);
    let apps = new Set(parts.slice(1, Q + 1));
    servidores.push(apps);
  }

  // Clientes
  let totalConexoes = 0;
  for (let c = 0; c < M; c++) {
    let parts = lines[i + 1 + N + c].trim().split(" ");
    let P = parseInt(parts[0]);
    let appsCliente = parts.slice(1, P + 1);

    let conexoes = new Set();

    for (let app of appsCliente) {
      for (let s = 0; s < N; s++) {
        if (servidores[s].has(app)) {
          conexoes.add(s); // conecta cliente ao servidor s
        }
      }
    }

    totalConexoes += conexoes.size;
  }

  console.log(totalConexoes);

  i += 1 + N + M;
}