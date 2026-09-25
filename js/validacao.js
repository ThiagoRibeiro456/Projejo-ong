import { salvarInscricao } from "./storage.js";


/* =========================================
   INICIALIZAÇÃO
========================================= */

export function iniciarValidacao() {

    const formulario =
        document.querySelector("#form-cadastro");


    if (!formulario) {
        return;
    }


    /*
        Evita registrar os mesmos eventos
        mais de uma vez no mesmo formulário.
    */
    if (
        formulario.dataset.validacaoIniciada === "true"
    ) {
        return;
    }


    formulario.dataset.validacaoIniciada =
        "true";


    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    /* =====================================
       EVENTOS DOS CAMPOS
    ===================================== */

    campos.forEach((campo) => {

        campo.addEventListener(
            "input",
            () => {

                aplicarMascara(campo);

                validarCampo(campo);
            }
        );


        campo.addEventListener(
            "blur",
            () => {

                validarCampo(campo);
            }
        );


        campo.addEventListener(
            "change",
            () => {

                validarCampo(campo);
            }
        );
    });


    /* =====================================
       ENVIO
    ===================================== */

    formulario.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            let formularioValido = true;


            campos.forEach((campo) => {

                /*
                    Campos opcionais vazios não
                    impedem o envio.
                */
                if (!validarCampo(campo)) {
                    formularioValido = false;
                }
            });


            if (!formularioValido) {

                mostrarMensagem(
                    "Verifique os campos destacados.",
                    "erro"
                );


                const primeiroInvalido =
                    formulario.querySelector(
                        ":invalid"
                    );


                if (primeiroInvalido) {
                    primeiroInvalido.focus();
                }


                return;
            }


            const dados =
                Object.fromEntries(
                    new FormData(formulario).entries()
                );


            const salvo =
                salvarInscricao(dados);


            /*
                Confirma se o localStorage conseguiu
                salvar os dados.
            */
            if (!salvo) {

                mostrarMensagem(
                    "Não foi possível salvar o cadastro. Tente novamente.",
                    "erro"
                );

                return;
            }


            mostrarMensagem(
                "Cadastro realizado com sucesso!",
                "sucesso"
            );


            formulario.reset();


            limparEstadoCampos(
                formulario
            );
        }
    );


    /* =====================================
       RESET
    ===================================== */

    formulario.addEventListener(
        "reset",
        () => {

            /*
                reset() é executado antes da limpeza
                efetiva dos valores. Por isso utilizamos
                requestAnimationFrame.
            */
            requestAnimationFrame(() => {

                limparEstadoCampos(
                    formulario
                );


                limparMensagem();
            });
        }
    );
}


/* =========================================
   VALIDAÇÃO DE CAMPO
========================================= */

function validarCampo(campo) {

    /*
        Limpa erros personalizados antes
        de recalcular a validade.
    */
    campo.setCustomValidity("");


    /*
        Data de nascimento não pode estar
        no futuro.
    */
    if (
        campo.id === "data-nascimento" &&
        campo.value
    ) {

        const dataNascimento =
            new Date(
                `${campo.value}T00:00:00`
            );


        const hoje =
            new Date();


        hoje.setHours(0, 0, 0, 0);


        if (
            dataNascimento > hoje
        ) {

            campo.setCustomValidity(
                "A data de nascimento não pode ser futura."
            );
        }
    }


    /*
        Validação básica do CPF.
    */
    if (
        campo.id === "cpf" &&
        campo.value
    ) {

        const cpfValido =
            validarCPF(campo.value);


        if (!cpfValido) {

            campo.setCustomValidity(
                "Digite um CPF válido."
            );
        }
    }


    const valido =
        campo.checkValidity();


    campo.classList.toggle(
        "valido",
        valido
    );


    campo.classList.toggle(
        "invalido",
        !valido
    );


    const mensagem =
        obterMensagemErro(campo);


    const elementoErro =
        document.querySelector(
            `#erro-${campo.id}`
        );


    if (elementoErro) {

        elementoErro.textContent =
            mensagem;
    }


    return valido;
}


/* =========================================
   MENSAGENS DE ERRO
========================================= */

function obterMensagemErro(campo) {

    if (
        campo.validity.customError
    ) {
        return campo.validationMessage;
    }


    if (
        campo.validity.valueMissing
    ) {
        return "Este campo é obrigatório.";
    }


    if (
        campo.validity.typeMismatch
    ) {
        return "Digite um valor válido.";
    }


    if (
        campo.validity.tooShort
    ) {
        return `Digite pelo menos ${campo.minLength} caracteres.`;
    }


    if (
        campo.validity.patternMismatch
    ) {
        return "Digite no formato solicitado.";
    }


    if (
        campo.validity.badInput
    ) {
        return "Digite um valor válido.";
    }


    if (
        campo.validity.rangeUnderflow ||
        campo.validity.rangeOverflow
    ) {
        return "O valor informado está fora do limite permitido.";
    }


    return "";
}


/* =========================================
   MÁSCARAS
========================================= */

function aplicarMascara(campo) {

    if (campo.id === "cpf") {

        campo.value =
            mascaraCPF(
                campo.value
            );
    }


    if (campo.id === "telefone") {

        campo.value =
            mascaraTelefone(
                campo.value
            );
    }


    if (campo.id === "cep") {

        campo.value =
            mascaraCEP(
                campo.value
            );
    }
}


/* =========================================
   MÁSCARA CPF
========================================= */

function mascaraCPF(valor) {

    valor =
        valor.replace(
            /\D/g,
            ""
        );


    valor =
        valor.substring(
            0,
            11
        );


    if (valor.length > 3) {

        valor =
            valor.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );
    }


    if (valor.length > 7) {

        valor =
            valor.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );
    }


    if (valor.length > 11) {

        valor =
            valor.replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );
    }


    return valor;
}


/* =========================================
   VALIDAÇÃO CPF
========================================= */

function validarCPF(valor) {

    const cpf =
        valor.replace(
            /\D/g,
            ""
        );


    if (cpf.length !== 11) {
        return false;
    }


    /*
        Rejeita CPFs formados por
        números repetidos.
    */
    if (
        /^(\d)\1{10}$/.test(cpf)
    ) {
        return false;
    }


    let soma = 0;


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        soma +=
            Number(cpf[i]) *
            (10 - i);
    }


    let resto =
        (soma * 10) % 11;


    if (resto === 10) {
        resto = 0;
    }


    if (
        resto !==
        Number(cpf[9])
    ) {
        return false;
    }


    soma = 0;


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        soma +=
            Number(cpf[i]) *
            (11 - i);
    }


    resto =
        (soma * 10) % 11;


    if (resto === 10) {
        resto = 0;
    }


    return (
        resto ===
        Number(cpf[10])
    );
}


/* =========================================
   MÁSCARA TELEFONE
========================================= */

function mascaraTelefone(valor) {

    valor =
        valor.replace(
            /\D/g,
            ""
        );


    /*
        O HTML atual aceita telefone
        celular com 11 dígitos.
    */
    valor =
        valor.substring(
            0,
            11
        );


    if (valor.length <= 2) {
        return valor;
    }


    if (valor.length <= 7) {

        return valor.replace(
            /(\d{2})(\d+)/,
            "($1) $2"
        );
    }


    return valor.replace(
        /(\d{2})(\d{5})(\d{1,4})/,
        "($1) $2-$3"
    );
}


/* =========================================
   MÁSCARA CEP
========================================= */

function mascaraCEP(valor) {

    valor =
        valor.replace(
            /\D/g,
            ""
        );


    valor =
        valor.substring(
            0,
            8
        );


    if (valor.length <= 5) {
        return valor;
    }


    return valor.replace(
        /(\d{5})(\d{1,3})/,
        "$1-$2"
    );
}


/* =========================================
   LIMPAR ESTADO DOS CAMPOS
========================================= */

function limparEstadoCampos(formulario) {

    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    campos.forEach((campo) => {

        campo.classList.remove(
            "valido",
            "invalido"
        );


        campo.setCustomValidity("");


        const elementoErro =
            document.querySelector(
                `#erro-${campo.id}`
            );


        if (elementoErro) {
            elementoErro.textContent = "";
        }
    });
}


/* =========================================
   MENSAGEM DO FORMULÁRIO
========================================= */

function mostrarMensagem(
    texto,
    tipo
) {

    const mensagem =
        document.querySelector(
            "#mensagem-formulario"
        );


    if (!mensagem) {
        return;
    }


    mensagem.textContent =
        texto;


    mensagem.className =
        `alert ${tipo}`;


    mensagem.setAttribute(
        "role",
        "alert"
    );
}


/* =========================================
   LIMPAR MENSAGEM
========================================= */

function limparMensagem() {

    const mensagem =
        document.querySelector(
            "#mensagem-formulario"
        );


    if (!mensagem) {
        return;
    }


    mensagem.textContent = "";

    mensagem.className =
        "alert";

    mensagem.removeAttribute(
        "role"
    );
}
