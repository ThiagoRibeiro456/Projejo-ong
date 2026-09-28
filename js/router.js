import { renderizarPagina } from "./templates.js";

const BASE_PATH = new URL("../", import.meta.url)
    .pathname
    .replace(/\/+$/, "");

const paginas = {
    "index.html": "index",
    "projetos.html": "projetos",
    "cadastro.html": "cadastro",
    "inscricoes.html": "inscricoes",
    "voluntariado.html": "voluntariado",
    "sobre.html": "sobre",
    "doacoes.html": "doacoes"
};

function criarCaminho(caminho = "/") {
    if (!caminho.startsWith("/")) {
        caminho = `/${caminho}`;
    }

    return `${BASE_PATH}${caminho}`;
}

function normalizarCaminho(caminho) {
    if (!caminho) {
        return BASE_PATH || "/";
    }

    if (caminho.length > 1) {
        caminho = caminho.replace(/\/+$/, "");
    }

    return caminho === `${BASE_PATH}/`
        ? BASE_PATH
        : caminho;
}

function obterCaminho(url) {
    return normalizarCaminho(url.pathname);
}

function pertenceAoProjeto(url) {
    const caminho = normalizarCaminho(url.pathname);

    return (
        url.origin === window.location.origin &&
        (caminho === BASE_PATH ||
            caminho.startsWith(`${BASE_PATH}/`))
    );
}

const caminhosCanonicos = {
    index: criarCaminho("/index.html"),
    projetos: criarCaminho("/html/projetos.html"),
    cadastro: criarCaminho("/html/cadastro.html"),
    inscricoes: criarCaminho("/html/inscricoes.html"),
    voluntariado: criarCaminho("/html/voluntariado.html"),
    sobre: criarCaminho("/html/sobre.html"),
    doacoes: criarCaminho("/html/doacoes.html")
};

const rotas = {
    [normalizarCaminho(criarCaminho("/"))]: "index",
    [normalizarCaminho(criarCaminho("/index.html"))]: "index",
    [normalizarCaminho(criarCaminho("/html/projetos.html"))]: "projetos",
    [normalizarCaminho(criarCaminho("/html/cadastro.html"))]: "cadastro",
    [normalizarCaminho(criarCaminho("/html/inscricoes.html"))]: "inscricoes",
    [normalizarCaminho(criarCaminho("/html/voluntariado.html"))]: "voluntariado",
    [normalizarCaminho(criarCaminho("/html/sobre.html"))]: "sobre",
    [normalizarCaminho(criarCaminho("/html/doacoes.html"))]: "doacoes"
};

function corrigirLinksCabecalho() {
    const logo = document.querySelector(".logo");

    if (logo) {
        logo.setAttribute("href", caminhosCanonicos.index);
    }

    document.querySelectorAll(".menu a").forEach((link) => {
        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }

        const nomeArquivo = href
            .split("?")[0]
            .split("#")[0]
            .split("/")
            .filter(Boolean)
            .pop();

        const pagina = paginas[nomeArquivo];

        if (pagina && caminhosCanonicos[pagina]) {
            link.setAttribute(
                "href",
                caminhosCanonicos[pagina]
            );
        }
    });

    atualizarPaginaAtiva();
}

function atualizarPaginaAtiva() {
    const caminhoAtual = normalizarCaminho(
        window.location.pathname
    );

    document.querySelectorAll(".menu a").forEach((link) => {
        const caminhoLink = normalizarCaminho(
            new URL(link.href, window.location.href).pathname
        );

        if (caminhoAtual === caminhoLink) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

export function iniciarRouter() {
    if (document.body.dataset.routerIniciado === "true") {
        return;
    }

    document.body.dataset.routerIniciado = "true";

    document.addEventListener("click", (evento) => {
        if (
            evento.defaultPrevented ||
            evento.button !== 0 ||
            evento.metaKey ||
            evento.ctrlKey ||
            evento.shiftKey ||
            evento.altKey
        ) {
            return;
        }

        const link = evento.target.closest("a");

        if (!link) {
            return;
        }

        if (link.classList.contains("logo")) {
            evento.preventDefault();
            window.location.assign(caminhosCanonicos.index);
            return;
        }

        if (
            link.target === "_blank" ||
            link.hasAttribute("download")
        ) {
            return;
        }

        const url = new URL(
            link.href,
            window.location.href
        );

        if (!pertenceAoProjeto(url)) {
            return;
        }

        const pagina = rotas[obterCaminho(url)];

        if (!pagina) {
            return;
        }

        evento.preventDefault();

        navegar(
            caminhosCanonicos[pagina],
            url.search,
            url.hash
        );
    });

    window.addEventListener("popstate", () => {
        carregarRota(window.location.pathname);
    });

    carregarRota(window.location.pathname);
}

function navegar(caminho, query = "", hash = "") {
    const caminhoAtual = normalizarCaminho(
        window.location.pathname
    );

    const novoCaminho = normalizarCaminho(caminho);

    const urlAtual =
        `${caminhoAtual}${window.location.search}${window.location.hash}`;

    const novaUrl =
        `${novoCaminho}${query}${hash}`;

    if (urlAtual === novaUrl) {
        carregarRota(novoCaminho);
        return;
    }

    history.pushState({}, "", novaUrl);
    carregarRota(novoCaminho);
}

function carregarRota(caminho) {
    const rota = rotas[normalizarCaminho(caminho)];

    renderizarPagina(rota || "index");
    corrigirLinksCabecalho();
}
