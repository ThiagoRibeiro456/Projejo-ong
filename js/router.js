import { renderizarPagina } from "./templates.js";


/* =========================================
   CAMINHO BASE DO PROJETO
========================================= */

/*
    O arquivo está em:

    js/router.js

    ../ aponta para a raiz do projeto.

    Em um GitHub Pages como:

    https://usuario.github.io/juntos/

    o BASE_PATH será:

    /juntos
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
    Remove barras extras e trata a raiz
    do projeto corretamente.
*/
function normalizarCaminho(caminho) {

    if (!caminho) {
        return BASE_PATH || "/";
    }


    if (
        BASE_PATH &&
        (
            caminho === BASE_PATH ||
            caminho === `${BASE_PATH}/`
        )
    ) {
        return BASE_PATH || "/";
    }


    /*
        Remove barra final.

        Exemplo:
        /juntos/html/projetos.html/
        ->
        /juntos/html/projetos.html
    */
    if (caminho.length > 1) {
        caminho = caminho.replace(/\/+$/, "");
    }


    return caminho;
}


/*
    Retorna apenas o caminho da URL,
    removendo query string e hash.
*/
function obterCaminho(url) {

    return normalizarCaminho(
        url.pathname
    );
}


/* =========================================
   ROTAS
========================================= */

const rotas = {

    /* -------------------------------------
       Página inicial
    ------------------------------------- */

    [normalizarCaminho(
        criarCaminho("/")
    )]: "index",

    [normalizarCaminho(
        criarCaminho("/index.html")
    )]: "index",


    /* -------------------------------------
       Páginas principais
    ------------------------------------- */

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

    index: criarCaminho("/"),

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


    /* -------------------------------------
       Navegação por links
    ------------------------------------- */

    document.addEventListener(
        "click",
        (evento) => {

            /*
                Apenas cliques normais do botão esquerdo.
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
                Links destinados a outras abas
                ou downloads não são interceptados.
            */
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


            /*
                Links externos continuam
                funcionando normalmente.
            */
            if (
                url.origin !==
                window.location.origin
            ) {
                return;
            }


            const caminho =
                obterCaminho(url);


            /*
                Verifica se a URL pertence
                ao sistema de rotas.
            */
            if (!rotas[caminho]) {
                return;
            }


            evento.preventDefault();


            const pagina =
                rotas[caminho];


            const caminhoCanonico =
                caminhosCanonicos[pagina];


            navegar(
                caminhoCanonico
            );
        }
    );


    /* -------------------------------------
       Botões voltar / avançar
    ------------------------------------- */

    window.addEventListener(
        "popstate",
        () => {

            carregarRota(
                window.location.pathname
            );
        }
    );


    /* -------------------------------------
       Carregamento inicial
    ------------------------------------- */

    carregarRota(
        window.location.pathname
    );
}


/* =========================================
   NAVEGAÇÃO
========================================= */

function navegar(caminho) {

    const caminhoAtual =
        normalizarCaminho(
            window.location.pathname
        );


    const novoCaminho =
        normalizarCaminho(
            caminho
        );


    /*
        Se o usuário já estiver na página,
        não adiciona uma nova entrada ao histórico.
    */
    if (
        caminhoAtual ===
        novoCaminho
    ) {

        carregarRota(
            novoCaminho
        );

        return;
    }


    history.pushState(
        {},
        "",
        novoCaminho
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
        Caso o caminho não exista,
        volta para a página inicial.
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
