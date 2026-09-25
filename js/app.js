import { iniciarRouter } from "./router.js";
import { iniciarValidacao } from "./validacao.js";
import {
    obterInscricoes,
    removerInscricao,
    limparInscricoes
} from "./storage.js";


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    iniciarMenu();

    iniciarRouter();

    inicializarValidacao();

    inicializarInscricoes();

    observarNavegacaoSPA();
});


/* =========================================
   MENU RESPONSIVO
========================================= */

function iniciarMenu() {

    const botaoMenu = document.querySelector(".menu-toggle");
    const navegacao = document.querySelector(".navegacao");


    if (!botaoMenu || !navegacao) {
        return;
    }


    botaoMenu.addEventListener("click", () => {

        const aberto =
            navegacao.classList.toggle("active");


        atualizarEstadoMenu(
            botaoMenu,
            aberto
        );
    });


    /*
        Fecha o menu quando o usuário pressiona
        a tecla ESC.
    */
    document.addEventListener("keydown", (evento) => {

        if (evento.key !== "Escape") {
            return;
        }


        if (!navegacao.classList.contains("active")) {
            return;
        }


        navegacao.classList.remove("active");

        atualizarEstadoMenu(
            botaoMenu,
            false
        );

        botaoMenu.focus();
    });


    /*
        Event delegation para os links do menu.
        Assim o código continua simples e robusto.
    */
    navegacao.addEventListener("click", (evento) => {

        const link = evento.target.closest("a");


        if (!link) {
            return;
        }


        navegacao.classList.remove("active");

        atualizarEstadoMenu(
            botaoMenu,
            false
        );
    });
}


/* =========================================
   ATUALIZAÇÃO DO ESTADO DO MENU
========================================= */

function atualizarEstadoMenu(
    botaoMenu,
    aberto
) {

    botaoMenu.setAttribute(
        "aria-expanded",
        String(aberto)
    );


    botaoMenu.setAttribute(
        "aria-label",
        aberto
            ? "Fechar menu"
            : "Abrir menu"
    );
}


/* =========================================
   VALIDAÇÃO DO FORMULÁRIO
========================================= */

function inicializarValidacao() {

    const formulario =
        document.querySelector("#form-cadastro");


    if (!formulario) {
        return;
    }


    /*
        Evita registrar os eventos duas vezes
        no mesmo formulário.
    */
    if (
        formulario.dataset.validacaoIniciada === "true"
    ) {
        return;
    }


    iniciarValidacao();


    formulario.dataset.validacaoIniciada =
        "true";
}


/* =========================================
   OBSERVADOR DA SPA
========================================= */

function observarNavegacaoSPA() {

    const main =
        document.querySelector("main");


    if (!main) {
        return;
    }


    /*
        Como o router modifica o innerHTML
        do <main>, o MutationObserver detecta
        quando uma nova página foi renderizada.
    */
    const observador =
        new MutationObserver(() => {

            inicializarValidacao();

            inicializarInscricoes();
        });


    observador.observe(main, {
        childList: true,
        subtree: true
    });
}


/* =========================================
   INSCRIÇÕES
========================================= */

function inicializarInscricoes() {

    const lista =
        document.querySelector("#lista-inscricoes");


    if (!lista) {
        return;
    }


    /*
        Evita inicializar a mesma página várias vezes.
    */
    if (
        lista.dataset.inscricoesIniciadas === "true"
    ) {
        atualizarListaInscricoes();

        return;
    }


    lista.dataset.inscricoesIniciadas =
        "true";


    atualizarListaInscricoes();


    /*
        Botão de limpar todas as inscrições.
    */
    const botaoLimpar =
        document.querySelector(
            "#limpar-inscricoes"
        );


    if (botaoLimpar) {

        botaoLimpar.addEventListener(
            "click",
            () => {

                const inscricoes =
                    obterInscricoes();


                if (inscricoes.length === 0) {

                    mostrarToast(
                        "Não existem inscrições para limpar.",
                        "info"
                    );

                    return;
                }


                const confirmou =
                    window.confirm(
                        "Deseja realmente excluir todas as inscrições?"
                    );


                if (!confirmou) {
                    return;
                }


                limparInscricoes();


                atualizarListaInscricoes();


                mostrarToast(
                    "Todas as inscrições foram removidas.",
                    "sucesso"
                );
            }
        );
    }


    /*
        Permite remover uma inscrição individual.
    */
    lista.addEventListener(
        "click",
        (evento) => {

            const botao =
                evento.target.closest(
                    "[data-remover-inscricao]"
                );


            if (!botao) {
                return;
            }


            const id =
                Number(
                    botao.dataset.removerInscricao
                );


            if (!Number.isFinite(id)) {
                return;
            }


            removerInscricao(id);


            atualizarListaInscricoes();


            mostrarToast(
                "Inscrição removida.",
                "sucesso"
            );
        }
    );
}


/* =========================================
   ATUALIZAÇÃO DA LISTA
========================================= */

function atualizarListaInscricoes() {

    const lista =
        document.querySelector("#lista-inscricoes");


    if (!lista) {
        return;
    }


    const inscricoes =
        obterInscricoes();


    if (inscricoes.length === 0) {

        lista.innerHTML = `
            <article class="card">

                <h3>
                    Nenhuma inscrição encontrada
                </h3>

                <p>
                    Ainda não existem inscrições salvas
                    neste navegador.
                </p>

            </article>
        `;

        return;
    }


    lista.innerHTML = "";


    inscricoes.forEach((inscricao) => {

        const card =
            document.createElement("article");


        card.className = "card";


        const titulo =
            document.createElement("h3");


        titulo.textContent =
            inscricao.nome ||
            "Sem nome";


        const email =
            document.createElement("p");


        email.innerHTML =
            `<strong>E-mail:</strong> ${escaparHTML(
                inscricao.email || "-"
            )}`;


        const telefone =
            document.createElement("p");


        telefone.innerHTML =
            `<strong>Telefone:</strong> ${escaparHTML(
                inscricao.telefone || "-"
            )}`;


        const interesse =
            document.createElement("p");


        interesse.innerHTML =
            `<strong>Interesse:</strong> ${escaparHTML(
                traduzirInteresse(
                    inscricao.interesse
                )
            )}`;


        const data =
            document.createElement("p");


        data.innerHTML =
            `<strong>Cadastro:</strong> ${formatarData(
                inscricao.dataCadastro
            )}`;


        const botao =
            document.createElement("button");


        botao.type = "button";

        botao.className =
            "btn btn-secundario";


        botao.textContent =
            "Remover";


        botao.dataset.removerInscricao =
            String(inscricao.id);


        const acoes =
            document.createElement("div");


        acoes.className =
            "acoes-formulario";


        acoes.appendChild(botao);


        card.appendChild(titulo);
        card.appendChild(email);
        card.appendChild(telefone);
        card.appendChild(interesse);
        card.appendChild(data);
        card.appendChild(acoes);


        lista.appendChild(card);
    });
}


/* =========================================
   TRADUZ INTERESSE
========================================= */

function traduzirInteresse(interesse) {

    const valores = {
        voluntariado: "Voluntariado",
        doacoes: "Doações",
        projetos: "Participação em projetos"
    };


    return valores[interesse] || "Não informado";
}


/* =========================================
   FORMATA DATA
========================================= */

function formatarData(data) {

    if (!data) {
        return "Não informada";
    }


    const dataObjeto =
        new Date(data);


    if (Number.isNaN(
        dataObjeto.getTime()
    )) {
        return "Data inválida";
    }


    return dataObjeto.toLocaleString(
        "pt-BR"
    );
}


/* =========================================
   ESCAPE DE HTML
========================================= */

function escaparHTML(valor) {

    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================
   TOAST
========================================= */

export function mostrarToast(
    mensagem,
    tipo = "info"
) {

    let toast =
        document.querySelector(".toast");


    if (toast) {
        toast.remove();
    }


    toast =
        document.createElement("div");


    toast.className =
        "toast";


    toast.setAttribute(
        "role",
        "status"
    );


    toast.setAttribute(
        "aria-live",
        "polite"
    );


    toast.dataset.tipo =
        tipo;


    toast.textContent =
        mensagem;


    document.body.appendChild(
        toast
    );


    window.setTimeout(() => {

        if (toast.isConnected) {
            toast.remove();
        }

    }, 3000);
}
