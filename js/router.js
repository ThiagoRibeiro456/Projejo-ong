import { renderizarPagina } from "./templates.js";


/* =========================================
   CAMINHO BASE DO PROJETO
========================================= */

/*
    Descobre automaticamente a pasta em que
    o projeto está publicado.

    Exemplo:
    https://usuario.github.io/juntos/

    BASE_PATH = "/juntos"
*/
const BASE_PATH = new URL("../", import.meta.url)
    .pathname
    .replace(/\/$/, "");


/* =========================================
   FUNÇÕES AUXILIARES
========================================= */

function criarCaminho(caminho) {
    return `${BASE_PATH}${caminho}`;
}


function normalizarCaminho(caminho) {

    if (!caminho) {
        return "/";
    }

    /*
        Remove a barra final, exceto quando
        o caminho é apenas "/".
    */
    if (caminho.length > 1) {
        caminho = caminho.replace(/\/+$/, "");
    }

    /*
        No GitHub Pages, "/juntos/" e "/juntos"
        representam a página inicial do projeto.
    */
    if (
        BASE_PATH &&
        (caminho === BASE_PATH || caminho === `${BASE_PATH}/`)
    ) {
        return BASE_PATH;
    }

    return caminho;
}


/* =========================================
   ROTAS
========================================= */

const rotas = {

    /* Página inicial */
    [normalizarCaminho(criarCaminho("/"))]: "index",

    [normalizarCaminho(
        criarCaminho("/index.html")
    )]: "index",


    /* Páginas reais */
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
    )]: "doacoes",


    /*
        Compatibilidade com os caminhos usados
        nos templates antigos.

        Exemplo:
        projetos.html
        será direcionado para:
        html/projetos.html
    */

    [normalizarCaminho(
        criarCaminho("/projetos.html")
    )]: "projetos",

    [normalizarCaminho(
        criarCaminho("/cadastro.html")
    )]: "cadastro",

    [normalizarCaminho(
        criarCaminho("/inscricoes.html")
    )]: "inscricoes",

    [normalizarCaminho(
        criarCaminho("/voluntariado.html")
    )]: "voluntariado",

    [normalizarCaminho(
        criarCaminho("/sobre.html")
    )]: "sobre",

    [normalizarCaminho(
        criarCaminho("/doacoes.html")
    )]: "doacoes"
};


/* =========================================
   CAMINHOS CANÔNICOS
========================================= */

const caminhosCanonicos = {

    index: criarCaminho("/"),

    projetos: criarCaminho(
        "/html/projetos.html"
    ),

    cadastro: criarCaminho(
        "/html/cadastro.html"
    ),

    inscricoes: criarCaminho(
        "/html/inscricoes.html"
    ),

    voluntariado: criarCaminho(
        "/html/voluntariado.html"
    ),

    sobre: criarCaminho(
        "/html/sobre.html"
    ),

    doacoes: criarCaminho(
        "/html/doacoes.html"
    )
};


/* =========================================
   INICIALIZAÇÃO DO ROUTER
========================================= */

export function iniciarRouter() {

    document.addEventListener(
        "click",
        (evento) => {

            /*
                Não intercepta cliques modificados.

                Isso preserva comportamentos como:
                Ctrl + clique
                Shift + clique
                Alt + clique
                clique do botão do meio
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


            const link = evento.target.closest("a");


            if (!link) {
                return;
            }


            /*
                Não intercepta links que devem abrir
                em outra aba/janela.
            */
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


            /*
                Links externos continuam funcionando
                normalmente.
            */
            if (
                url.origin !== window.location.origin
            ) {
                return;
            }


            const caminho = normalizarCaminho(
                url.pathname
            );


            /*
                Verifica se o caminho pertence
                ao SPA.
            */
            if (!rotas[caminho]) {
                return;
            }


            evento.preventDefault();


            /*
                Descobre o nome da página.
            */
            const pagina = rotas[caminho];


            /*
                Usa sempre o caminho canônico.
            */
            const caminhoFinal =
                caminhosCanonicos[pagina];


            navegar(caminhoFinal);
        }
    );


    /* =====================================
       BOTÕES AVANÇAR / VOLTAR DO NAVEGADOR
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

function navegar(caminho) {

    const caminhoAtual = normalizarCaminho(
        window.location.pathname
    );

    const novoCaminho = normalizarCaminho(
        caminho
    );


    /*
        Evita criar uma entrada desnecessária
        no histórico quando o usuário já está
        na mesma página.
    */
    if (caminhoAtual === novoCaminho) {

        carregarRota(novoCaminho);

        return;
    }


    history.pushState(
        {},
        "",
        caminho
    );


    carregarRota(caminho);
}


/* =========================================
   CARREGAMENTO DA ROTA
========================================= */

function carregarRota(caminho) {

    const caminhoNormalizado =
        normalizarCaminho(caminho);


    const rota =
        rotas[caminhoNormalizado] || "index";


    renderizarPagina(rota);
}
