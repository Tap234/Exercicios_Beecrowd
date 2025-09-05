// ---------- leitura robusta (Node 12+) ----------
const fs = require("fs");
const raw = fs.readFileSync(0, "utf8").split(/\r?\n/);
let P = 0;
function nextLine() {
  while (P < raw.length) {
    const s = raw[P++].trim();
    if (s.length) return s;
  }
  return null;
}

// ---------- Manacher: raios ímpar/par ----------
function manacher(s) {
  const n = s.length;
  const odd = Array(n).fill(0);
  const even = Array(n).fill(0);

  // ímpar
  let L = 0, R = -1;
  for (let c = 0; c < n; c++) {
    let k = 1;
    if (c <= R) k = Math.min(odd[L + R - c], R - c + 1);
    while (c - k >= 0 && c + k < n && s[c - k] === s[c + k]) k++;
    odd[c] = k;
    if (c + k - 1 > R) { L = c - (k - 1); R = c + (k - 1); }
  }

  // par
  L = 0; R = -1;
  for (let c = 0; c < n; c++) {
    let k = 0;
    if (c <= R) k = Math.min(even[L + R - c + 1], R - c + 1);
    while (c - k - 1 >= 0 && c + k < n && s[c - k - 1] === s[c + k]) k++;
    even[c] = k;
    if (c + k - 1 > R) { L = c - k; R = c + k - 1; }
  }
  return { odd, even };
}

// ---------- Heap máximo bem simples ----------
class MaxHeap {
  constructor() { this.a = []; }
  push(x) {
    const a = this.a; a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].key >= a[i].key) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  peek() { return this.a.length ? this.a[0] : null; }
  pop() {
    const a = this.a; if (!a.length) return null;
    const top = a[0], last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        let l = i * 2 + 1, r = l + 1, m = i;
        if (l < a.length && a[l].key > a[m].key) m = l;
        if (r < a.length && a[r].key > a[m].key) m = r;
        if (m === i) break;
        [a[i], a[m]] = [a[m], a[i]];
        i = m;
      }
    }
    return top;
  }
}

// ---------- maior retângulo em histograma ----------
function largestRect(heights, D) {
  const h = heights.slice();
  h.push(0);
  const st = [];
  let best = 0;
  for (let i = 0; i < h.length; i++) {
    while (st.length && h[st[st.length - 1]] > h[i]) {
      const t = st.pop();
      const left = st.length ? st[st.length - 1] + 1 : 0;
      const width = i - left;
      const area = Math.min(h[t], D) * width;
      if (area > best) best = area;
    }
    st.push(i);
  }
  return best;
}

// ---------- raios -> maior palíndromo que COMEÇA em j (separado por paridade) ----------
function startsFromRadii(N, odd, even) {
  // buckets por início j
  const buckOdd  = Array.from({ length: N }, () => []);
  const buckEven = Array.from({ length: N }, () => []);

  // ÍMPAR: intervalos [a..b=c], val(j)=2c+1-2j
  for (let c = 0; c < N; c++) {
    const r = odd[c];
    if (r <= 0) continue;
    const a = c - (r - 1);
    if (a >= 0) buckOdd[a].push({ key: 2 * c + 1, end: c });
  }
  // PAR: intervalos [a..b=c-1], val(j)=2c-2j
  for (let c = 0; c < N; c++) {
    const r = even[c];
    if (r <= 0) continue;
    const a = c - r, b = c - 1;
    if (a >= 0 && a <= b) buckEven[a].push({ key: 2 * c, end: b });
  }

  const oddStart  = new Array(N).fill(0); // sem forçar 1 aqui
  const evenStart = new Array(N).fill(0);

  // varredura com heap (remoção preguiçosa)
  let H = new MaxHeap();
  for (let j = 0; j < N; j++) {
    for (const it of buckOdd[j]) H.push(it);
    let top = H.peek();
    while (top && top.end < j) { H.pop(); top = H.peek(); }
    if (top) {
      const v = top.key - 2 * j; // maior comprimento ímpar começando em j
      if (v > oddStart[j]) oddStart[j] = v;
    }
  }

  H = new MaxHeap();
  for (let j = 0; j < N; j++) {
    for (const it of buckEven[j]) H.push(it);
    let top = H.peek();
    while (top && top.end < j) { H.pop(); top = H.peek(); }
    if (top) {
      const v = top.key - 2 * j; // maior comprimento par começando em j
      if (v > evenStart[j]) evenStart[j] = v;
    }
  }

  // garante limites físicos (>=0)
  for (let j = 0; j < N; j++) {
    if (oddStart[j]  < 0) oddStart[j]  = 0;
    if (evenStart[j] < 0) evenStart[j] = 0;
  }
  return { oddStart, evenStart };
}

// ---------- resolve um caso ----------
function solveCase(N, D, S) {
  const { odd, even } = manacher(S);
  const { oddStart, evenStart } = startsFromRadii(N, odd, even);

  let ans = 0;

  for (let r = 0; r < D; r++) {
    const Hodd  = [];
    const Heven = [];

    for (let j = r; j < N; j += D) {
      // cap físico e por D
      const lim = Math.min(D, N - j);

      // ímpar: ajusta para MAIOR ≤ lim que seja ímpar
      let ho = Math.min(oddStart[j], lim);
      if (ho > 0 && (ho & 1) === 0) ho--;      // força ímpar
      if (ho <= 0) ho = (lim >= 1 ? 1 : 0);    // p=1 sempre cabe se lim>=1

      // par: ajusta para MAIOR ≤ lim que seja par (mínimo 2)
      let he = Math.min(evenStart[j], lim);
      if (he >= 2) {
        if (he & 1) he--;                      // força par
      } else {
        he = 0;                                // não existe p par começando aqui
      }

      Hodd.push(ho);
      Heven.push(he);
    }

    const a1 = largestRect(Hodd,  D);
    const a2 = largestRect(Heven, D);
    if (a1 > ans) ans = a1;
    if (a2 > ans) ans = a2;
  }

  return ans;
}

// ---------- main ----------
const out = [];
for (;;) {
  const hdr = nextLine();
  if (!hdr) break;
  const [Ns, Ds] = hdr.split(/\s+/);
  const N = +Ns, D = +Ds;
  if (N === 0 && D === 0) break;
  const S = (nextLine() || "");
  out.push(String(solveCase(N, D, S)));
}
console.log(out.join("\n"));
