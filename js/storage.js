const CHAVE_STORAGE = "juntos_inscricoes";


/* =========================================
   UTILITÁRIOS
========================================= */

/*
    Gera um ID único para cada inscrição.

    crypto.randomUUID() é usado quando disponível.
    Caso contrário, usa timestamp + número aleatório.
*/
function gerarId() {

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }


    return `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;
}


/*
    Garante que os dados recebidos sejam
    um objeto válido.
*/
function dadosValidos(dados) {

    return (
        dados !== null &&
        typeof dados === "object" &&
        !Array.isArray(dados)
    );
}


/* =========================================
   OBTER INSCRIÇÕES
========================================= */

export function obterInscricoes() {

    try {

        const dados =
            localStorage.getItem(
                CHAVE_STORAGE
            );


        if (!dados) {
            return [];
        }


        const inscricoes =
            JSON.parse(dados);


        /*
            Verifica se o conteúdo armazenado
            realmente é um array.
        */
        if (!Array.isArray(inscricoes)) {

            console.warn(
                "Os dados armazenados não estão no formato esperado."
            );

            return [];
        }


        return inscricoes;


    } catch (erro) {

        console.error(
            "Erro ao recuperar inscrições:",
            erro
        );


        return [];
    }
}


/* =========================================
   SALVAR INSCRIÇÃO
========================================= */

export function salvarInscricao(dados) {

    try {

        /*
            Impede que valores inválidos
            sejam armazenados.
        */
        if (!dadosValidos(dados)) {

            console.error(
                "Dados de inscrição inválidos."
            );

            return false;
        }


        const inscricoes =
            obterInscricoes();


        const novaInscricao = {

            ...dados,

            id: gerarId(),

            dataCadastro:
                new Date().toISOString()
        };


        inscricoes.push(
            novaInscricao
        );


        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(inscricoes)
        );


        return true;


    } catch (erro) {

        console.error(
            "Erro ao salvar inscrição:",
            erro
        );


        return false;
    }
}


/* =========================================
   REMOVER INSCRIÇÃO
========================================= */

export function removerInscricao(id) {

    try {

        const inscricoes =
            obterInscricoes();


        const novasInscricoes =
            inscricoes.filter(
                (inscricao) =>
                    String(inscricao.id) !==
                    String(id)
            );


        /*
            Verifica se realmente houve
            uma alteração.
        */
        if (
            novasInscricoes.length ===
            inscricoes.length
        ) {

            return false;
        }


        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(
                novasInscricoes
            )
        );


        return true;


    } catch (erro) {

        console.error(
            "Erro ao remover inscrição:",
            erro
        );


        return false;
    }
}


/* =========================================
   LIMPAR TODAS AS INSCRIÇÕES
========================================= */

export function limparInscricoes() {

    try {

        localStorage.removeItem(
            CHAVE_STORAGE
        );


        return true;


    } catch (erro) {

        console.error(
            "Erro ao limpar inscrições:",
            erro
        );


        return false;
    }
}
