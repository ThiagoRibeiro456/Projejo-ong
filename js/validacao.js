import { salvarInscricao } from "./storage.js";


/* ================================
   INICIALIZAÇÃO
================================ */

export function iniciarValidacao() {

    const formulario = document.querySelector("#form-cadastro");

    if (!formulario) {
        return;
    }

    const campos = formulario.querySelectorAll(
        "input, select, textarea"
    );

    campos.forEach((campo) => {

        campo.addEventListener("input", () => {
            aplicarMascara(campo);
            validarCampo(campo);
        });

        campo.addEventListener("blur", () => {
            validarCampo(campo);
        });

        campo.addEventListener("change", () => {
            validarCampo(campo);
        });

    });


    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        let formularioValido = true;

        campos.forEach((campo) => {

            if (!validarCampo(campo)) {
                formularioValido = false;
            }

        });

        if (!formularioValido) {

            mostrarMensagem(
                "Verifique os campos destacados.",
                "erro"
            );

            return;
        }

        const dados = Object.fromEntries(
            new FormData(formulario).entries()
        );

        salvarInscricao(dados);

        mostrarMensagem(
            "Cadastro realizado com sucesso!",
            "sucesso"
        );

        formulario.reset();

        campos.forEach((campo) => {
            campo.classList.remove("valido");
            campo.classList.remove("invalido");
        });
    });
}


/* ================================
   VALIDAÇÃO
================================ */

function validarCampo(campo) {

    if (
        campo.tagName === "TEXTAREA" &&
        !campo.required &&
        campo.value.trim() === ""
    ) {
        return true;
    }

    const valido = campo.checkValidity();

    campo.classList.toggle("valido", valido);
    campo.classList.toggle("invalido", !valido);

    const mensagem = obterMensagemErro(campo);

    const elementoErro = document.querySelector(
        `#erro-${campo.id}`
    );

    if (elementoErro) {
        elementoErro.textContent = mensagem;
    }

    return valido;
}


/* ================================
   MENSAGENS DE ERRO
================================ */

function obterMensagemErro(campo) {

    if (campo.validity.valueMissing) {
        return "Este campo é obrigatório.";
    }

    if (campo.validity.typeMismatch) {
        return "Digite um valor válido.";
    }

    if (campo.validity.tooShort) {
        return `Digite pelo menos ${campo.minLength} caracteres.`;
    }

    if (campo.validity.patternMismatch) {
        return "Digite no formato solicitado.";
    }

    return "";
}


/* ================================
   MÁSCARAS
================================ */

function aplicarMascara(campo) {

    if (campo.id === "cpf") {
        campo.value = mascaraCPF(campo.value);
    }

    if (campo.id === "telefone") {
        campo.value = mascaraTelefone(campo.value);
    }

    if (campo.id === "cep") {
        campo.value = mascaraCEP(campo.value);
    }
}


function mascaraCPF(valor) {

    valor = valor.replace(/\D/g, "");
    valor = valor.substring(0, 11);

    valor = valor.replace(
        /(\d{3})(\d)/,
        "$1.$2"
    );

    valor = valor.replace(
        /(\d{3})(\d)/,
        "$1.$2"
    );

    valor = valor.replace(
        /(\d{3})(\d{1,2})$/,
        "$1-$2"
    );

    return valor;
}


function mascaraTelefone(valor) {

    valor = valor.replace(/\D/g, "");
    valor = valor.substring(0, 11);

    if (valor.length <= 10) {

        valor = valor.replace(
            /(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

    } else {

        valor = valor.replace(
            /(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );
    }

    return valor;
}


function mascaraCEP(valor) {

    valor = valor.replace(/\D/g, "");
    valor = valor.substring(0, 8);

    valor = valor.replace(
        /(\d{5})(\d)/,
        "$1-$2"
    );

    return valor;
}


/* ================================
   MENSAGEM DO FORMULÁRIO
================================ */

function mostrarMensagem(texto, tipo) {

    const mensagem = document.querySelector(
        "#mensagem-formulario"
    );

    if (!mensagem) {
        return;
    }

    mensagem.textContent = texto;

    mensagem.className = `alert ${tipo}`;

    mensagem.setAttribute(
        "role",
        "alert"
    );
}
