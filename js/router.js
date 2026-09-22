import { renderizarPagina } from "./templates.js";


/* ================================
   ROTAS
================================ */

const rotas = {
    "/": "index",
    "/index.html": "index",
    "/projetos.html": "projetos",
    "/cadastro.html": "cadastro",
    "/sobre.html": "sobre",
    "/inscricoes.html": "inscricoes",
    "/voluntariado.html": "voluntariado",
    "/doacoes.html": "doacoes"
};


/* ================================
   INICIALIZAÇÃO
================================ */

export function iniciarRouter() {

    document.addEventListener("click", (evento) => {

        const link = evento.target.closest("a");

        if (!link) {
            return;
        }

        const url = new URL(
            link.href,
            window.location.origin
        );

        if (url.origin !== window.location.origin) {
            return;
        }

        const caminho = url.pathname;

        if (!rotas[caminho]) {
            return;
        }

        evento.preventDefault();

        navegar(caminho);
    });


    window.addEventListener("popstate", () => {
        carregarRota(window.location.pathname);
    });


    carregarRota(window.location.pathname);
}


/* ================================
   NAVEGAÇÃO
================================ */

function navegar(caminho) {

    history.pushState(
        {},
        "",
        caminho
    );

    carregarRota(caminho);
}


/* ================================
   CARREGAMENTO DA ROTA
================================ */

function carregarRota(caminho) {

    const rota = rotas[caminho] || "index";

    renderizarPagina(rota);
}
