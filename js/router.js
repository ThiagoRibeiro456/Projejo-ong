import { renderizarPagina } from "./templates.js";


/* =========================================
   CAMINHO BASE DO PROJETO
========================================= */

const BASE_PATH = new URL("../", import.meta.url)
    .pathname
    .replace(/\/+$/, "");


/* =========================================
   FUNÇÕES AUXILIARES
========================================= */

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

    if (
        caminho.length > 1 &&
        caminho.endsWith("/")
    ) {
        caminho = caminho.replace(
            /\/+$/,
            ""
        );
    }

    if (
        BASE_PATH &&
        caminho === `${BASE_PATH}/`
    ) {
        return BASE_PATH;
    }

    return caminho;
}


function obterCaminho(url) {

    return normalizarCaminho(
        url.pathname
    );
}


function pertenceAoProjeto(url) {

    const caminho =
        normalizarCaminho(
            url.pathname
        );

    return (
        url.origin === window.location.origin &&
        (
            caminho === BASE_PATH ||
            caminho.startsWith(
                `${BASE_PATH}/`
            )
        )
    );
}


/* =========================================
   ROTAS
========================================= */

const rotas = {

    [normalizarCaminho(
        criarCaminho("/")
    )]: "index",

    [normalizarCaminho(
        criarCaminho("/index.html")
    )]: "index",

    [normalizarCaminho(
        criarCaminho("/html/projetos.html")
    )]: "projetos",

    [normalizarCaminho(
        criarCaminho("/html/cadastro.html")
    )]: "cadastro",

    [normalizarCaminho(
        criarCaminho("/html/inscricoes.html")
    )]: "inscricoes",

    [normalizarCaminho(
        criarCaminho("/html/voluntariado.html")
    )]: "voluntariado",

    [normalizarCaminho(
        criarCaminho("/html/sobre.html")
    )]: "sobre",

    [normalizarCaminho(
        criarCaminho("/html/doacoes.html")
    )]: "doacoes"
};


/* =========================================
   CAMINHOS CANÔNICOS
========================================= */

const caminhosCanonicos = {

    index:
        criarCaminho("/index.html"),

    projetos:
        criarCaminho(
            "/html/projetos.html"
        ),

    cadastro:
        criarCaminho(
            "/html/cadastro.html"
        ),

    inscricoes:
        criarCaminho(
            "/html/inscricoes.html"
        ),

    voluntariado:
        criarCaminho(
            "/html/voluntariado.html"
        ),

    sobre:
        criarCaminho(
            "/html/sobre.html"
        ),

    doacoes:
        criarCaminho(
            "/html/doacoes.html"
        )
};


/* =========================================
   CORRIGIR LINKS DO CABEÇALHO
========================================= */

function corrigirLinksCabecalho() {

    /*
        Corrige a logo.
    */
    const logo =
        document.querySelector(".logo");

    if (logo) {

        logo.setAttribute(
            "href",
            caminhosCanonicos.index
        );
    }


    /*
        Corrige os links do menu.
    */
    const links =
        document.querySelectorAll(
            ".menu a"
        );


    links.forEach((link) => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        if (
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }


        const nomeArquivo =
            href
                .split("?")[0]
                .split("#")[0]
                .split("/")
                .filter(Boolean)
                .pop();


        const paginas = {

            "index.html": "index",
            "projetos.html": "projetos",
            "cadastro.html": "cadastro",
            "inscricoes.html": "inscricoes",
            "voluntariado.html": "voluntariado",
            "sobre.html": "sobre",
            "doacoes.html": "doacoes"
        };


        const pagina =
            paginas[nomeArquivo];


        if (
            pagina &&
            caminhosCanonicos[pagina]
        ) {

            link.setAttribute(
                "href",
                caminhosCanonicos[pagina]
            );
        }
    });


    atualizarPaginaAtiva();
}


/* =========================================
   ATUALIZAR PÁGINA ATIVA
========================================= */

function atualizarPaginaAtiva() {

    const links =
        document.querySelectorAll(
            ".menu a"
        );


    const caminhoAtual =
        normalizarCaminho(
            window.location.pathname
        );


    links.forEach((link) => {

        const url =
            new URL(
                link.href,
                window.location.href
            );


        const caminhoLink =
            normalizarCaminho(
                url.pathname
            );


        if (
            caminhoAtual ===
            caminhoLink
        ) {

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.removeAttribute(
                "aria-current"
            );
        }
    });
}


/* =========================================
   INICIALIZAÇÃO
========================================= */

export function iniciarRouter() {

    if (
        document.body.dataset.routerIniciado ===
        "true"
    ) {
        return;
    }


    document.body.dataset.routerIniciado =
        "true";


    /* =====================================
       CLIQUES
    ===================================== */

    document.addEventListener(
        "click",
        (evento) => {

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


            const link =
                evento.target.closest("a");


            if (!link) {
                return;
            }


            if (
                link.target === "_blank" ||
                link.hasAttribute("download")
            ) {
                return;
            }


            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            if (
                !pertenceAoProjeto(url)
            ) {
                return;
            }


            const caminho =
                obterCaminho(url);


            const pagina =
                rotas[caminho];


            if (!pagina) {
                return;
            }


            evento.preventDefault();


            navegar(
                caminhosCanonicos[pagina],
                url.search,
                url.hash
            );
        }
    );


    /* =====================================
       VOLTAR / AVANÇAR
    ===================================== */

    window.addEventListener(
        "popstate",
        () => {

            carregarRota(
                window.location.pathname
            );
        }
    );


    /* =====================================
       INICIALIZAÇÃO
    ===================================== */

    carregarRota(
        window.location.pathname
    );
}


/* =========================================
   NAVEGAÇÃO
========================================= */

function navegar(
    caminho,
    query = "",
    hash = ""
) {

    const caminhoAtual =
        normalizarCaminho(
            window.location.pathname
        );


    const novoCaminho =
        normalizarCaminho(
            caminho
        );


    const urlAtual =
        `${caminhoAtual}${window.location.search}${window.location.hash}`;


    const novaUrl =
        `${novoCaminho}${query}${hash}`;


    if (
        urlAtual === novaUrl
    ) {

        carregarRota(
            novoCaminho
        );

        return;
    }


    history.pushState(
        {},
        "",
        novaUrl
    );


    carregarRota(
        novoCaminho
    );
}


/* =========================================
   CARREGAR ROTA
========================================= */

function carregarRota(caminho) {

    const caminhoNormalizado =
        normalizarCaminho(
            caminho
        );


    const rota =
        rotas[caminhoNormalizado];


    if (!rota) {

        renderizarPagina(
            "index"
        );

        corrigirLinksCabecalho();

        return;
    }


    renderizarPagina(
        rota
    );


    /*
        Corrige novamente a logo e o menu
        depois que a SPA muda de página.
    */
    corrigirLinksCabecalho();
}
