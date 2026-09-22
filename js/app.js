import { iniciarRouter } from "./router.js";
import { iniciarValidacao } from "./validacao.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenu();
    iniciarRouter();
    iniciarValidacao();
});


/* ================================
   MENU RESPONSIVO
================================ */

function iniciarMenu() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const navegacao = document.querySelector(".navegacao");

    if (!botaoMenu || !navegacao) {
        return;
    }

    botaoMenu.addEventListener("click", () => {
        const aberto = navegacao.classList.toggle("active");

        botaoMenu.setAttribute(
            "aria-expanded",
            String(aberto)
        );

        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

    const links = navegacao.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            navegacao.classList.remove("active");

            botaoMenu.setAttribute(
                "aria-expanded",
                "false"
            );

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu"
            );
        });
    });
}


/* ================================
   TOAST
================================ */

export function mostrarToast(mensagem, tipo = "info") {
    let toast = document.querySelector(".toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";

        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        document.body.appendChild(toast);
    }

    toast.textContent = mensagem;
    toast.dataset.tipo = tipo;

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
