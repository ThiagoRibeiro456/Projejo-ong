const CHAVE_STORAGE = "juntos_inscricoes";


/* ================================
   OBTER INSCRIÇÕES
================================ */

export function obterInscricoes() {

    try {

        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (!dados) {
            return [];
        }

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao recuperar inscrições:",
            erro
        );

        return [];
    }
}


/* ================================
   SALVAR INSCRIÇÃO
================================ */

export function salvarInscricao(dados) {

    try {

        const inscricoes = obterInscricoes();

        inscricoes.push({
            ...dados,
            id: Date.now(),
            dataCadastro: new Date().toISOString()
        });

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


/* ================================
   REMOVER INSCRIÇÃO
================================ */

export function removerInscricao(id) {

    try {

        const inscricoes = obterInscricoes();

        const novasInscricoes = inscricoes.filter(
            (inscricao) => inscricao.id !== id
        );

        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(novasInscricoes)
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


/* ================================
   LIMPAR TODAS AS INSCRIÇÕES
================================ */

export function limparInscricoes() {

    try {

        localStorage.removeItem(CHAVE_STORAGE);

        return true;

    } catch (erro) {

        console.error(
            "Erro ao limpar inscrições:",
            erro
        );

        return false;
    }
}
