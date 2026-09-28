import { iniciarRouter } from "./router.js";
import { iniciarValidacao } from "./validacao.js";
import {
    obterInscricoes,
    removerInscricao,
    limparInscricoes
} from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenu();
    iniciarRouter();
    inicializarValidacao();
    inicializarInscricoes();
    observarNavegacaoSPA();
    atualizarMenuAtivo();
});

/* MENU RESPONSIVO */

function iniciarMenu() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const navegacao = document.querySelector(".navegacao");

    if (!botaoMenu || !navegacao) return;

    botaoMenu.addEventListener("click", () => {
        const aberto = navegacao.classList.toggle("active");
        atualizarEstadoMenu(botaoMenu, aberto);
    });

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key !== "Escape" ||
            !navegacao.classList.contains("active")
        ) {
            return;
        }

        navegacao.classList.remove("active");
        atualizarEstadoMenu(botaoMenu, false);
        botaoMenu.focus();
    });

    navegacao.addEventListener("click", (evento) => {
        const link = evento.target.closest("a");

        if (!link) return;

        navegacao.classList.remove("active");
        atualizarEstadoMenu(botaoMenu, false);
    });
}

function atualizarEstadoMenu(botaoMenu, aberto) {
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
}

/* LINK ATIVO DO MENU */

function atualizarMenuAtivo() {
    const links = document.querySelectorAll(".menu a");

    if (!links.length) return;

    const caminhoAtual = normalizarCaminho(
        window.location.pathname
    );

    links.forEach((link) => {
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

function normalizarCaminho(caminho) {
    if (!caminho) return "/";

    if (caminho.length > 1) {
        caminho = caminho.replace(/\/+$/, "");
    }

    if (caminho.endsWith("/index.html")) {
        return (
            caminho.substring(
                0,
                caminho.length - "/index.html".length
            ) || "/"
        );
    }

    return caminho;
}

/* VALIDAÇÃO */

function inicializarValidacao() {
    const formulario = document.querySelector("#form-cadastro");

    if (!formulario) return;

    if (formulario.dataset.validacaoIniciada === "true") {
        return;
    }

    iniciarValidacao();
    formulario.dataset.validacaoIniciada = "true";
}

/* OBSERVAÇÃO DA SPA */

function observarNavegacaoSPA() {
    const main = document.querySelector("main");

    if (!main) return;

    const observador = new MutationObserver(() => {
        inicializarValidacao();
        inicializarInscricoes();
        atualizarMenuAtivo();
    });

    observador.observe(main, {
        childList: true
    });
}

/* INSCRIÇÕES */

function inicializarInscricoes() {
    const lista = document.querySelector("#lista-inscricoes");

    if (!lista) return;

    if (lista.dataset.inscricoesIniciadas === "true") {
        atualizarListaInscricoes();
        return;
    }

    lista.dataset.inscricoesIniciadas = "true";
    atualizarListaInscricoes();

    const botaoLimpar = document.querySelector("#limpar-inscricoes");

    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", () => {
            const inscricoes = obterInscricoes();

            if (inscricoes.length === 0) {
                mostrarToast(
                    "Não existem inscrições para limpar.",
                    "info"
                );
                return;
            }

            if (
                !window.confirm(
                    "Deseja realmente excluir todas as inscrições?"
                )
            ) {
                return;
            }

            if (!limparInscricoes()) {
                mostrarToast(
                    "Não foi possível limpar as inscrições.",
                    "erro"
                );
                return;
            }

            atualizarListaInscricoes();

            mostrarToast(
                "Todas as inscrições foram removidas.",
                "sucesso"
            );
        });
    }

    lista.addEventListener("click", (evento) => {
        const botao = evento.target.closest(
            "[data-remover-inscricao]"
        );

        if (!botao) return;

        const id = botao.dataset.removerInscricao;

        if (!id) return;

        if (!removerInscricao(id)) {
            mostrarToast(
                "Não foi possível remover a inscrição.",
                "erro"
            );
            return;
        }

        atualizarListaInscricoes();

        mostrarToast(
            "Inscrição removida.",
            "sucesso"
        );
    });
}

/* ATUALIZAR LISTA */

function atualizarListaInscricoes() {
    const lista = document.querySelector("#lista-inscricoes");

    if (!lista) return;

    const inscricoes = obterInscricoes();

    if (inscricoes.length === 0) {
        lista.innerHTML = `
            <article class="card">
                <h3>Nenhuma inscrição encontrada</h3>
                <p>Ainda não existem inscrições salvas neste navegador.</p>
                <a href="cadastro.html" class="btn btn-primario">
                    Fazer cadastro
                </a>
            </article>
        `;
        return;
    }

    lista.innerHTML = "";

    inscricoes.forEach((inscricao) => {
        const card = document.createElement("article");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = inscricao.nome || "Sem nome";

        const email = document.createElement("p");
        email.innerHTML = `
            <strong>E-mail:</strong>
            ${escaparHTML(inscricao.email || "-")}
        `;

        const telefone = document.createElement("p");
        telefone.innerHTML = `
            <strong>Telefone:</strong>
            ${escaparHTML(inscricao.telefone || "-")}
        `;

        const interesse = document.createElement("p");
        interesse.innerHTML = `
            <strong>Interesse:</strong>
            ${escaparHTML(traduzirInteresse(inscricao.interesse))}
        `;

        const data = document.createElement("p");
        data.innerHTML = `
            <strong>Cadastro:</strong>
            ${formatarData(inscricao.dataCadastro)}
        `;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn btn-secundario";
        botao.textContent = "Remover";
        botao.dataset.removerInscricao = String(inscricao.id);

        const acoes = document.createElement("div");
        acoes.className = "acoes-formulario";
        acoes.appendChild(botao);

        card.append(
            titulo,
            email,
            telefone,
            interesse,
            data,
            acoes
        );

        lista.appendChild(card);
    });
}

/* INTERESSE */

function traduzirInteresse(interesse) {
    const valores = {
        voluntariado: "Voluntariado",
        doacoes: "Doações",
        projetos: "Participação em projetos"
    };

    return valores[interesse] || "Não informado";
}

/* DATA */

function formatarData(data) {
    if (!data) return "Não informada";

    const dataObjeto = new Date(data);

    if (Number.isNaN(dataObjeto.getTime())) {
        return "Data inválida";
    }

    return dataObjeto.toLocaleString("pt-BR");
}

/* SEGURANÇA */

function escaparHTML(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* TOAST */

export function mostrarToast(mensagem, tipo = "info") {
    let toast = document.querySelector(".toast");

    if (toast) {
        toast.remove();
    }

    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.dataset.tipo = tipo;
    toast.textContent = mensagem;

    document.body.appendChild(toast);

    window.setTimeout(() => {
        if (toast.isConnected) {
            toast.remove();
        }
    }, 3000);
}
