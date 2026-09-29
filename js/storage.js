const CHAVE_STORAGE = "juntos_inscricoes";

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

function dadosValidos(dados) {
    return (
        dados !== null &&
        typeof dados === "object" &&
        !Array.isArray(dados)
    );
}

export function obterInscricoes() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (!dados) {
            return [];
        }

        const inscricoes = JSON.parse(dados);

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

export function salvarInscricao(dados) {
    try {
        if (!dadosValidos(dados)) {
            console.error("Dados de inscrição inválidos.");
            return false;
        }

        const inscricoes = obterInscricoes();

        inscricoes.push({
            ...dados,
            id: gerarId(),
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

export function removerInscricao(id) {
    try {
        const inscricoes = obterInscricoes();

        const novasInscricoes = inscricoes.filter(
            (inscricao) =>
                String(inscricao.id) !== String(id)
        );

        if (novasInscricoes.length === inscricoes.length) {
            return false;
        }

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
