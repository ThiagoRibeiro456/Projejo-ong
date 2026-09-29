import { salvarInscricao } from "./storage.js";

export function iniciarValidacao() {
    const formulario = document.querySelector("#form-cadastro");

    if (!formulario || formulario.dataset.validacaoIniciada === "true") {
        return;
    }

    formulario.dataset.validacaoIniciada = "true";

    const campos = formulario.querySelectorAll(
        "input, select, textarea"
    );

    campos.forEach((campo) => {
        campo.addEventListener("input", () => {
            aplicarMascara(campo);
            validarCampo(campo);
        });

        campo.addEventListener("blur", () => validarCampo(campo));
        campo.addEventListener("change", () => validarCampo(campo));
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const formularioValido = [...campos].every(validarCampo);

        if (!formularioValido) {
            mostrarMensagem(
                "Verifique os campos destacados.",
                "erro"
            );

            formulario.querySelector(":invalid")?.focus();
            return;
        }

        const dados = Object.fromEntries(
            new FormData(formulario).entries()
        );

        if (!salvarInscricao(dados)) {
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
        limparEstadoCampos(formulario);
    });

    formulario.addEventListener("reset", () => {
        requestAnimationFrame(() => {
            limparEstadoCampos(formulario);
            limparMensagem();
        });
    });
}

/* VALIDAÇÃO */

function validarCampo(campo) {
    campo.setCustomValidity("");

    if (campo.id === "data-nascimento" && campo.value) {
        const dataNascimento = new Date(
            `${campo.value}T00:00:00`
        );
        const hoje = new Date();

        hoje.setHours(0, 0, 0, 0);

        if (dataNascimento > hoje) {
            campo.setCustomValidity(
                "A data de nascimento não pode ser futura."
            );
        }
    }

    if (campo.id === "cpf" && campo.value) {
        if (!validarCPF(campo.value)) {
            campo.setCustomValidity("Digite um CPF válido.");
        }
    }

    const valido = campo.checkValidity();

    campo.classList.toggle("valido", valido);
    campo.classList.toggle("invalido", !valido);

    const elementoErro = document.getElementById(
        `erro-${campo.id}`
    );

    if (elementoErro) {
        elementoErro.textContent = obterMensagemErro(campo);
    }

    return valido;
}

function obterMensagemErro(campo) {
    const validade = campo.validity;

    if (validade.customError) {
        return campo.validationMessage;
    }

    if (validade.valueMissing) {
        return "Este campo é obrigatório.";
    }

    if (validade.typeMismatch || validade.badInput) {
        return "Digite um valor válido.";
    }

    if (validade.tooShort) {
        return `Digite pelo menos ${campo.minLength} caracteres.`;
    }

    if (validade.patternMismatch) {
        return "Digite no formato solicitado.";
    }

    if (validade.rangeUnderflow || validade.rangeOverflow) {
        return "O valor informado está fora do limite permitido.";
    }

    return "";
}

/* MÁSCARAS */

function aplicarMascara(campo) {
    const mascaras = {
        cpf: mascaraCPF,
        telefone: mascaraTelefone,
        cep: mascaraCEP
    };

    const mascara = mascaras[campo.id];

    if (mascara) {
        campo.value = mascara(campo.value);
    }
}

/* CPF */

function mascaraCPF(valor) {
    const cpf = valor
        .replace(/\D/g, "")
        .substring(0, 11);

    if (cpf.length <= 3) {
        return cpf;
    }

    if (cpf.length <= 6) {
        return cpf.replace(
            /(\d{3})(\d+)/,
            "$1.$2"
        );
    }

    if (cpf.length <= 9) {
        return cpf.replace(
            /(\d{3})(\d{3})(\d+)/,
            "$1.$2.$3"
        );
    }

    return cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
        "$1.$2.$3-$4"
    );
}

function validarCPF(valor) {
    const cpf = valor.replace(/\D/g, "");

    if (
        cpf.length !== 11 ||
        /^(\d)\1{10}$/.test(cpf)
    ) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== Number(cpf[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto === Number(cpf[10]);
}

/* TELEFONE */

function mascaraTelefone(valor) {
    valor = valor
        .replace(/\D/g, "")
        .substring(0, 11);

    if (valor.length <= 2) {
        return valor;
    }

    if (valor.length <= 6) {
        return valor.replace(
            /(\d{2})(\d+)/,
            "($1) $2"
        );
    }

    if (valor.length <= 10) {
        return valor.replace(
            /(\d{2})(\d{4})(\d{1,4})/,
            "($1) $2-$3"
        );
    }

    return valor.replace(
        /(\d{2})(\d{5})(\d{1,4})/,
        "($1) $2-$3"
    );
}

/* CEP */

function mascaraCEP(valor) {
    valor = valor
        .replace(/\D/g, "")
        .substring(0, 8);

    if (valor.length <= 5) {
        return valor;
    }

    return valor.replace(
        /(\d{5})(\d{1,3})/,
        "$1-$2"
    );
}

/* LIMPEZA */

function limparEstadoCampos(formulario) {
    formulario
        .querySelectorAll("input, select, textarea")
        .forEach((campo) => {
            campo.classList.remove("valido", "invalido");
            campo.setCustomValidity("");

            const elementoErro = document.getElementById(
                `erro-${campo.id}`
            );

            if (elementoErro) {
                elementoErro.textContent = "";
            }
        });
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.querySelector(
        "#mensagem-formulario"
    );

    if (!mensagem) {
        return;
    }

    mensagem.textContent = texto;
    mensagem.className = `alert ${tipo}`;
    mensagem.setAttribute("role", "alert");
}

function limparMensagem() {
    const mensagem = document.querySelector(
        "#mensagem-formulario"
    );

    if (!mensagem) {
        return;
    }

    mensagem.textContent = "";
    mensagem.className = "alert";
    mensagem.removeAttribute("role");
}
