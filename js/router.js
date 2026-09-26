import { renderizarPagina } from "./templates.js";


/* =========================================
   CAMINHO BASE DO PROJETO
========================================= */

/*
    router.js está em:

    /js/router.js

    ../ aponta para a raiz do projeto.

    Exemplo:

    https://thiagoribeiro456.github.io/Projeto-ong/

    BASE_PATH será:

    /Projeto-ong
*/

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


/*
    Normaliza o caminho para facilitar
    a comparação entre as rotas.
*/
function normalizarCaminho(caminho) {

    if (!caminho) {
        return BASE_PATH || "/";
    }


    /*
        Remove barras finais.
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
    Retorna somente o pathname.
*/
function obterCaminho(url) {

    return normalizarCaminho(
        url.pathname
    );
}


/*
    Verifica se a URL pertence ao projeto.
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
   CORRIGIR LINKS DO MENU
========================================= */

function corrigirLinksMenu() {

    const links =
        document.querySelectorAll(
            ".menu a"
        );


    if (!links.length) {
        return;
    }


    links.forEach((link) => {

        const hrefOriginal =
            link.getAttribute("href");


        if (!hrefOriginal) {
            return;
        }


        /*
            Ignora âncoras, e-mail, telefone
            e outros tipos de link.
        */
        if (
            hrefOriginal.startsWith("#") ||
            hrefOriginal.startsWith("mailto:") ||
            hrefOriginal.startsWith("tel:") ||
            hrefOriginal.startsWith("javascript:")
        ) {
            return;
        }


        /*
            Obtém apenas o nome do arquivo.
        */
        const caminhoLimpo =
            hrefOriginal
                .split("?")[0]
                .split("#")[0];


        const arquivo =
            caminhoLimpo
                .split("/")
                .filter(Boolean)
                .pop();


        let pagina = null;


        switch (arquivo) {

            case "index.html":
                pagina = "index";
                break;

            case "projetos.html":
                pagina = "projetos";
                break;

            case "cadastro.html":
                pagina = "cadastro";
                break;

            case "inscricoes.html":
                pagina = "inscricoes";
                break;

            case "voluntariado.html":
                pagina = "voluntariado";
                break;

            case "sobre.html":
                pagina = "sobre";
                break;

            case "doacoes.html":
                pagina = "doacoes";
                break;
        }


        /*
            Se o link pertence a uma página
            conhecida, substitui pelo caminho
            absoluto dentro do projeto.
        */
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
   ATUALIZAR LINK ATIVO
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


        const ativo =
            caminhoAtual ===
            caminhoLink;


        if (ativo) {

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

    /*
        Evita iniciar o router mais de uma vez.
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
                Apenas clique normal.
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
                Downloads não são tratados
                pelo router.
            */
            if (
                link.hasAttribute("download")
            ) {
                return;
            }


            /*
                Nova aba/janela.
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
                Links externos continuam
                sendo tratados pelo navegador.
            */
            if (
                !pertenceAoProjeto(url)
            ) {
                return;
            }


            const caminho =
                obterCaminho(url);


            const pagina =
                rotas[caminho];


            /*
                Se não for uma rota conhecida,
                não interfere no link.
            */
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


    const urlAtual =
        `${caminhoAtual}${window.location.search}${window.location.hash}`;


    const novaUrl =
        `${novoCaminho}${query}${hash}`;


    /*
        Evita criar uma nova entrada
        quando já estamos na mesma página.
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


    if (!rota) {

        renderizarPagina(
            "index"
        );

        corrigirLinksMenu();

        return;
    }


    renderizarPagina(
        rota
    );


    /*
        Muito importante:
        depois de mudar o <main>, corrigimos
        novamente os links do menu.
    */
    corrigirLinksMenu();
}
