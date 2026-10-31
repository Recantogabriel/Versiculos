// Lista de referências no formato:
// livro, capítulo, versículo inicial, versículo final, nome
const REFERENCES = [
  [43, 3, 16, 16, "João"], [19, 23, 1, 1, "Salmos"], [50, 4, 13, 13, "Filipenses"], [20, 3, 5, 6, "Provérbios"], [45, 8, 28, 28, "Romanos"],
  [23, 41, 10, 10, "Isaías"], [6, 1, 9, 9, "Josué"], [19, 46, 1, 1, "Salmos"], [40, 11, 28, 28, "Mateus"], [24, 29, 11, 11, "Jeremias"],
  [45, 12, 2, 2, "Romanos"], [19, 119, 105, 105, "Salmos"], [46, 13, 4, 4, "1 Coríntios"], [48, 5, 22, 23, "Gálatas"], [58, 11, 1, 1, "Hebreus"],
  [40, 6, 33, 33, "Mateus"], [19, 27, 1, 1, "Salmos"], [55, 1, 7, 7, "2 Timóteo"], [23, 40, 31, 31, "Isaías"], [49, 2, 8, 9, "Efésios"],
  [19, 121, 1, 2, "Salmos"], [20, 16, 3, 3, "Provérbios"], [40, 5, 16, 16, "Mateus"], [43, 14, 6, 6, "João"], [45, 5, 8, 8, "Romanos"],
  [60, 5, 7, 7, "1 Pedro"], [19, 37, 4, 4, "Salmos"], [50, 4, 6, 7, "Filipenses"], [51, 3, 23, 23, "Colossenses"], [59, 1, 5, 5, "Tiago"],
  [19, 91, 1, 2, "Salmos"], [40, 28, 20, 20, "Mateus"], [43, 8, 12, 12, "João"], [25, 3, 22, 23, "Lamentações"], [33, 6, 8, 8, "Miqueias"],
  [19, 34, 8, 8, "Salmos"], [45, 15, 13, 13, "Romanos"], [62, 4, 19, 19, "1 João"], [20, 18, 10, 10, "Provérbios"], [23, 26, 3, 3, "Isaías"],
  [19, 139, 14, 14, "Salmos"], [43, 15, 5, 5, "João"], [47, 5, 7, 7, "2 Coríntios"], [21, 3, 1, 1, "Eclesiastes"], [19, 100, 4, 5, "Salmos"],
  [40, 7, 7, 7, "Mateus"], [20, 27, 17, 17, "Provérbios"], [19, 62, 1, 1, "Salmos"], [58, 13, 8, 8, "Hebreus"], [52, 5, 16, 18, "1 Tessalonicenses"],
  [5, 31, 6, 6, "Deuteronômio"], [19, 16, 11, 11, "Salmos"], [43, 16, 33, 33, "João"], [49, 4, 32, 32, "Efésios"], [20, 4, 23, 23, "Provérbios"],
  [19, 103, 1, 2, "Salmos"], [45, 10, 17, 17, "Romanos"], [59, 4, 8, 8, "Tiago"], [34, 1, 7, 7, "Naum"], [36, 3, 17, 17, "Sofonias"]
];

// Caso a API falhe, usamos um versículo salvo no site.
const FALLBACK = [
  ["João 3:16", "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."],
  ["Salmos 23:1", "O Senhor é o meu pastor, nada me faltará."],
  ["Filipenses 4:13", "Posso todas as coisas em Cristo que me fortalece."],
  ["Provérbios 3:5-6", "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas."],
  ["Josué 1:9", "Não to mandei eu? Esforça-te, e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor teu Deus é contigo, por onde quer que andares."],
  ["Isaías 41:10", "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te esforço, e te ajudo, e te sustento com a destra da minha justiça."],
  ["Mateus 11:28", "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei."],
  ["Salmos 46:1", "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia."],
  ["Jeremias 29:11", "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais."],
  ["Salmos 119:105", "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho."],
  ["Mateus 6:33", "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas."]
];

function pegarElemento(id) {
  return document.getElementById(id);
}

const verseEl = pegarElemento("verse");
const refEl = pegarElemento("reference");
const statusEl = pegarElemento("status");
let current = null;

function indiceDoDia(data = new Date()) {
  const dataUtc = Date.UTC(data.getFullYear(), data.getMonth(), data.getDate());
  return Math.floor(dataUtc / 3600000) % REFERENCES.length;
}

function mostrarData() {
  const hoje = new Date();
  const textoData = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  pegarElemento("date").textContent = textoData;
}

function limparHtml(textoHtml) {
  const container = document.createElement("div");
  container.innerHTML = textoHtml.replace(/<br\s*\/?>/gi, " ");
  return container.textContent.replace(/\s+/g, " ").trim();
}

function formatarReferencia(livro, capitulo, versiculoInicial, versiculoFinal, nome) {
  const parteFinal = versiculoFinal !== versiculoInicial ? "-" + versiculoFinal : "";
  return `${nome} ${capitulo}:${versiculoInicial}${parteFinal}`;
}

async function carregarVersiculo() {
  const traducao = "ARA";
  const [livro, capitulo, versiculoInicial, versiculoFinal, nome] = REFERENCES[indiceDoDia()];
  const referencia = formatarReferencia(livro, capitulo, versiculoInicial, versiculoFinal, nome);

  statusEl.textContent = "";
  statusEl.classList.remove("error");

  const chaveCache = `verse2:${new Date().toDateString()}:${traducao}`;

  try {
    const versiculoSalvo = localStorage.getItem(chaveCache);
    if (versiculoSalvo) {
      const dados = JSON.parse(versiculoSalvo);
      renderizarVersiculo(dados);
      return;
    }
  } catch (erro) {

  }

  try {
    const resposta = await fetch(`https://bolls.life/get-text/${traducao}/${livro}/${capitulo}/`);
    if (!resposta.ok) {
      throw new Error("HTTP " + resposta.status);
    }

    const versos = await resposta.json();
    const texto = versos
      .filter(verso => verso.verse >= versiculoInicial && verso.verse <= versiculoFinal)
      .map(verso => limparHtml(verso.text))
      .join(" ");

    if (!texto) {
      throw new Error("Versículo não encontrado");
    }

    const dados = { text: texto, reference: referencia };

    try {
      localStorage.setItem(chaveCache, JSON.stringify(dados));
    } catch (erro) {
      // Ignora erro do localStorage e continua normalmente.
    }

    renderizarVersiculo(dados);
  } catch (erro) {
    console.error(erro);
    const indiceFallback = indiceDoDia() % FALLBACK.length;
    const [referenciaFallback, textoFallback] = FALLBACK[indiceFallback];
    renderizarVersiculo({ text: textoFallback, reference: referenciaFallback });
    statusEl.textContent = "Não consegui acessar a API agora. Este é um versículo salvo no site.";
  }
}

function renderizarVersiculo({ text, reference }) {
  current = { text, reference };
  verseEl.textContent = "“" + text + "”";
  refEl.textContent = reference;
  verseEl.style.animation = "none";
  void verseEl.offsetWidth;
  verseEl.style.animation = "";
}

function textoParaCopiar() {
  return `“${current.text}” — ${current.reference}`;
}

pegarElemento("copy").addEventListener("click", async () => {
  if (!current) {
    return;
  }

  try {
    await navigator.clipboard.writeText(textoParaCopiar());
    statusEl.textContent = "Versículo copiado.";
  } catch (erro) {
    statusEl.textContent = "Não foi possível copiar. Selecione o texto manualmente.";
  }
});

if (navigator.share) {
  pegarElemento("share").hidden = false;
  pegarElemento("share").addEventListener("click", () => {
    if (current) {
      navigator.share({
        title: "Versículo do dia",
        text: textoParaCopiar()
      }).catch(() => {});
    }
  });
}

mostrarData();
carregarVersiculo();
