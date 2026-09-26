import { renderizarPagina } from "./templates.js";


/* =========================================
   CAMINHO BASE DO PROJETO
========================================= */

/*
    router.js está em:

    /js/router.js

    Portanto, ../ aponta para a raiz
    do projeto.

    Exemplo no GitHub Pages:

    https://usuario.github.io/Projeto-ong/

    BASE_PATH:
    /Projeto-ong
*/
const BASE_PATH = new URL("../", import.meta.url)
    .pathname
    .replace(/\/+$/, "");


/* =========================================
   FUNÇÕES AUXILIARES
========================================= */

/*
    Cria uma URL interna a partir da raiz
    do projeto.
*/
function criarCaminho(caminho = "/") {

    if (!caminho.startsWith("/")) {
        caminho = `/${caminho}`;
    }

    return `${BASE_PATH}${caminho}`;
}


/*
    Normaliza um caminho para comparação.
*/
function normalizarCaminho(caminho) {

    if (!caminho) {
        return BASE_PATH || "/";
    }


    /*
        Remove a barra final.
    */
    if (
        caminho.length > 1 &&
        caminho.endsWith("/")
    ) {
        caminho = caminho.replace(
            /\/+$/,
            ""
        );
    }


    /*
        Trata a raiz do projeto.
    */
    if (
        BASE_PATH &&
        caminho === `${BASE_PATH}/`
    ) {
        return BASE_PATH;
    }


    return caminho;
}


/*
    Extrai somente o pathname da URL.

    Query string e hash não são usados
    para identificar a rota.
*/
function obterCaminho(url) {

    return normalizarCaminho(
        url.pathname
    );
}


/*
    Verifica se uma URL pertence
    ao projeto atual.
*/
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

    /* Página inicial */
    [normalizarCaminho(
        criarCaminho("/")
    )]: "index",

    [normalizarCaminho(
        criarCaminho("/index.html")
    )]: "index",


    /* Projetos */
    [normalizarCaminho(
        criarCaminho("/html/projetos.html")
    )]: "projetos",


    /* Cadastro */
    [normalizarCaminho(
        criarCaminho("/html/cadastro.html")
    )]: "cadastro",


    /* Inscrições */
    [normalizarCaminho(
        criarCaminho("/html/inscricoes.html")
    )]: "inscricoes",


    /* Voluntariado */
    [normalizarCaminho(
        criarCaminho("/html/voluntariado.html")
    )]: "voluntariado",


    /* Sobre */
    [normalizarCaminho(
        criarCaminho("/html/sobre.html")
    )]: "sobre",


    /* Doações */
    [normalizarCaminho(
        criarCaminho("/html/doacoes.html")
    )]: "doacoes"
};


/* =========================================
   CAMINHOS CANÔNICOS
========================================= */

const caminhosCanonicos = {

    index:
        criarCaminho("/"),

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
   INICIALIZAÇÃO
========================================= */

export function iniciarRouter() {

    /*
        Evita registrar o router mais de uma vez.
    */
    if (
        document.body.dataset.routerIniciado ===
        "true"
    ) {
        return;
    }


    document.body.dataset.routerIniciado =
        "true";


    /* =====================================
       NAVEGAÇÃO POR LINKS
    ===================================== */

    document.addEventListener(
        "click",
        (evento) => {

            /*
                Apenas clique normal do botão esquerdo.
            */
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


            /*
                Não intercepta downloads.
            */
            if (
                link.hasAttribute("download")
            ) {
                return;
            }


            /*
                Não intercepta links para
                novas abas/janelas.
            */
            if (
                link.target === "_blank"
            ) {
                return;
            }


            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            /*
                Ignora links externos ou
                URLs fora do projeto.
            */
            if (
                !pertenceAoProjeto(url)
            ) {
                return;
            }


            const caminho =
                obterCaminho(url);


            /*
                Verifica se a rota existe.
            */
            const pagina =
                rotas[caminho];


            if (!pagina) {
                return;
            }


            evento.preventDefault();


            const caminhoCanonico =
                caminhosCanonicos[pagina];


            navegar(
                caminhoCanonico,
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
       CARREGAMENTO INICIAL
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


    /*
        Mantém query string e hash.
    */
    const novaUrl =
        `${novoCaminho}${query}${hash}`;


    const urlAtual =
        `${caminhoAtual}${window.location.search}${window.location.hash}`;


    /*
        Se já estiver exatamente no mesmo
        endereço, apenas renderiza.
    */
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
   CARREGAMENTO DA ROTA
========================================= */

function carregarRota(caminho) {

    const caminhoNormalizado =
        normalizarCaminho(
            caminho
        );


    const rota =
        rotas[caminhoNormalizado];


    /*
        Rota inexistente:
        renderiza a página inicial.
    */
    if (!rota) {

        renderizarPagina(
            "index"
        );

        return;
    }


    renderizarPagina(
        rota
    );
}
