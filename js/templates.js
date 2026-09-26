/* =========================================
   CAMINHO BASE DO PROJETO
========================================= */

/*
    templates.js está em:

    /js/templates.js

    ../ aponta para a raiz do projeto.

    Funciona localmente e no GitHub Pages,
    inclusive quando o projeto está publicado
    dentro de uma subpasta.
*/

const BASE = new URL("../", import.meta.url);


/* =========================================
   CAMINHOS DAS IMAGENS
========================================= */

const imagemVoluntarios =
    new URL(
        "img/voluntarios.webp",
        BASE
    ).href;

const imagemComunidade =
    new URL(
        "img/projeto-1.webp",
        BASE
    ).href;

const imagemEducacao =
    new URL(
        "img/projeto-2.webp",
        BASE
    ).href;

const imagemSustentabilidade =
    new URL(
        "img/projeto-3.webp",
        BASE
    ).href;


/* =========================================
   CAMINHOS DAS PÁGINAS
========================================= */

const paginaInicio =
    new URL(
        "index.html",
        BASE
    ).pathname;

const paginaProjetos =
    new URL(
        "html/projetos.html",
        BASE
    ).pathname;

const paginaCadastro =
    new URL(
        "html/cadastro.html",
        BASE
    ).pathname;

const paginaInscricoes =
    new URL(
        "html/inscricoes.html",
        BASE
    ).pathname;

const paginaVoluntariado =
    new URL(
        "html/voluntariado.html",
        BASE
    ).pathname;

const paginaSobre =
    new URL(
        "html/sobre.html",
        BASE
    ).pathname;

const paginaDoacoes =
    new URL(
        "html/doacoes.html",
        BASE
    ).pathname;


/* =========================================
   TEMPLATES
========================================= */

const templates = {

    /* =====================================
       INÍCIO
    ===================================== */

    index: `
        <section
            class="hero"
            aria-labelledby="titulo-principal"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Juntos por um futuro melhor
                </span>

                <h1 id="titulo-principal">
                    Pequenas ações podem transformar grandes histórias
                </h1>

                <p>
                    A Juntos conecta pessoas, voluntários e projetos sociais
                    para criar oportunidades e melhorar a vida da comunidade.
                </p>

                <div class="acoes">

                    <a
                        href="${paginaProjetos}"
                        class="btn btn-primario"
                    >
                        Conheça nossos projetos
                    </a>

                    <a
                        href="${paginaCadastro}"
                        class="btn btn-secundario"
                    >
                        Quero participar
                    </a>

                </div>

            </div>


            <div class="hero-imagem">

                <img
                    src="${imagemVoluntarios}"
                    alt="Voluntários participando de uma ação de apoio à comunidade"
                >

            </div>

        </section>


        <section
            class="sobre"
            aria-labelledby="titulo-sobre"
        >

            <div class="section-titulo">

                <span class="badge">
                    Sobre a ONG
                </span>

                <h2 id="titulo-sobre">
                    Unidos podemos fazer a diferença
                </h2>

                <p>
                    Nosso objetivo é aproximar pessoas que desejam ajudar
                    de iniciativas que precisam de apoio.
                </p>

            </div>


            <div class="cards">

                <article class="card">

                    <h3>
                        Projetos sociais
                    </h3>

                    <p>
                        Desenvolvemos iniciativas voltadas para diferentes
                        necessidades da comunidade.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Voluntariado
                    </h3>

                    <p>
                        Incentivamos a participação de voluntários em ações
                        que geram impacto social.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Doações
                    </h3>

                    <p>
                        Facilitamos o apoio a projetos através de campanhas
                        e contribuições.
                    </p>

                </article>

            </div>

        </section>


        <section
            class="projetos-destaque"
            aria-labelledby="titulo-projetos"
        >

            <div class="section-titulo">

                <span class="badge">
                    Nossas iniciativas
                </span>

                <h2 id="titulo-projetos">
                    Projetos que fazem a diferença
                </h2>

            </div>


            <div class="projetos-grid">

                <article class="card-projeto">

                    <img
                        src="${imagemComunidade}"
                        alt="Voluntários organizando doações para a comunidade"
                        loading="lazy"
                    >

                    <div class="card-conteudo">

                        <h3>
                            Apoio à comunidade
                        </h3>

                        <p>
                            Ações para apoiar famílias e pessoas em situação
                            de vulnerabilidade.
                        </p>

                        <a href="${paginaProjetos}">
                            Saiba mais
                        </a>

                    </div>

                </article>


                <article class="card-projeto">

                    <img
                        src="${imagemEducacao}"
                        alt="Crianças estudando em uma sala de aula"
                        loading="lazy"
                    >

                    <div class="card-conteudo">

                        <h3>
                            Educação
                        </h3>

                        <p>
                            Projetos que incentivam o acesso à educação
                            e ao desenvolvimento pessoal.
                        </p>

                        <a href="${paginaProjetos}">
                            Saiba mais
                        </a>

                    </div>

                </article>


                <article class="card-projeto">

                    <img
                        src="${imagemSustentabilidade}"
                        alt="Voluntários separando materiais para reciclagem"
                        loading="lazy"
                    >

                    <div class="card-conteudo">

                        <h3>
                            Sustentabilidade
                        </h3>

                        <p>
                            Iniciativas para promover consciência ambiental
                            e práticas sustentáveis.
                        </p>

                        <a href="${paginaProjetos}">
                            Saiba mais
                        </a>

                    </div>

                </article>

            </div>

        </section>


        <section
            class="chamada"
            aria-labelledby="titulo-chamada"
        >

            <h2 id="titulo-chamada">
                Faça parte dessa transformação
            </h2>

            <p>
                Cadastre-se para conhecer oportunidades de voluntariado,
                projetos e campanhas da nossa ONG.
            </p>

            <a
                href="${paginaCadastro}"
                class="btn btn-primario"
            >
                Quero participar
            </a>

        </section>
    `,


    /* =====================================
       PROJETOS
    ===================================== */

    projetos: `
        <section
            class="hero hero-menor"
            aria-labelledby="titulo-projetos"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Nossas iniciativas
                </span>

                <h1 id="titulo-projetos">
                    Projetos que transformam vidas
                </h1>

                <p>
                    Conheça as iniciativas da Juntos e descubra como
                    você pode contribuir para cada uma delas.
                </p>

            </div>

        </section>


        <section
            class="projetos"
            aria-labelledby="titulo-iniciativas"
        >

            <div class="section-titulo">

                <h2 id="titulo-iniciativas">
                    Nossos projetos
                </h2>

                <p>
                    Cada projeto é desenvolvido para atender necessidades
                    reais da comunidade.
                </p>

            </div>


            <div class="projetos-grid">

                <article class="card-projeto">

                    <img
                        src="${imagemComunidade}"
                        alt="Voluntários organizando doações para a comunidade"
                        loading="lazy"
                    >

                    <div class="card-conteudo">

                        <span class="badge">
                            Comunidade
                        </span>

                        <h3>
                            Apoio à comunidade
                        </h3>

                        <p>
                            Oferecemos apoio a famílias em situação
                            de vulnerabilidade através de campanhas
                            e ações sociais.
                        </p>

                        <div class="card-footer">

                            <a
                                href="${paginaCadastro}"
                                class="btn btn-primario"
                            >
                                Participar
                            </a>

                        </div>

                    </div>

                </article>


                <article class="card-projeto">

                    <img
                        src="${imagemEducacao}"
                        alt="Crianças estudando em uma sala de aula"
                        loading="lazy"
                    >

                    <div class="card-conteudo">

                        <span class="badge">
                            Educação
                        </span>

                        <h3>
                            Educação para todos
                        </h3>

                        <p>
                            Incentivamos o acesso à educação através
                            de atividades, oficinas e apoio ao aprendizado.
                        </p>

                        <div class="card-footer">

                            <a
                                href="${paginaCadastro}"
                                class="btn btn-primario"
                            >
                                Participar
                            </a>

                        </div>

                    </div>

                </article>


                <article class="card-projeto">

                    <img
                        src="${imagemSustentabilidade}"
                        alt="Voluntários separando materiais para reciclagem"
                        loading="lazy"
                    >

                    <div class="card-conteudo">

                        <span class="badge">
                            Sustentabilidade
                        </span>

                        <h3>
                            Comunidade sustentável
                        </h3>

                        <p>
                            Promovemos ações de educação ambiental,
                            reciclagem e preservação dos espaços
                            comunitários.
                        </p>

                        <div class="card-footer">

                            <a
                                href="${paginaCadastro}"
                                class="btn btn-primario"
                            >
                                Participar
                            </a>

                        </div>

                    </div>

                </article>

            </div>

        </section>


        <section
            class="chamada"
            aria-labelledby="titulo-voluntario"
        >

            <h2 id="titulo-voluntario">
                Quer ajudar a transformar essas iniciativas?
            </h2>

            <p>
                Cadastre-se e encontre uma forma de contribuir
                com a nossa ONG.
            </p>

            <a
                href="${paginaCadastro}"
                class="btn btn-primario"
            >
                Quero ser voluntário
            </a>

        </section>
    `,


    /* =====================================
       CADASTRO
    ===================================== */

    cadastro: `
        <section
            class="hero hero-menor"
            aria-labelledby="titulo-cadastro"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Faça parte
                </span>

                <h1 id="titulo-cadastro">
                    Cadastre-se para participar
                </h1>

                <p>
                    Preencha o formulário para demonstrar interesse
                    em nossos projetos e ações.
                </p>

            </div>

        </section>


        <section
            class="formulario-section"
            aria-labelledby="titulo-formulario"
        >

            <div class="section-titulo">

                <h2 id="titulo-formulario">
                    Formulário de cadastro
                </h2>

                <p>
                    Os campos marcados com * são obrigatórios.
                </p>

            </div>


            <form
                id="form-cadastro"
                class="formulario"
                novalidate
            >

                <fieldset>

                    <legend>
                        Dados pessoais
                    </legend>


                    <div class="campo">

                        <label for="nome">
                            Nome completo *
                        </label>

                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome completo"
                            autocomplete="name"
                            minlength="3"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-nome"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">

                        <label for="email">
                            E-mail *
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="exemplo@email.com"
                            autocomplete="email"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-email"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">

                        <label for="data-nascimento">
                            Data de nascimento *
                        </label>

                        <input
                            type="date"
                            id="data-nascimento"
                            name="dataNascimento"
                            autocomplete="bday"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-data-nascimento"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">

                        <label for="cpf">
                            CPF *
                        </label>

                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="000.000.000-00"
                            inputmode="numeric"
                            maxlength="14"
                            pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                            autocomplete="off"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-cpf"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">
                     
                        <label for="telefone">
                           Telefone *
                        </label>
                     
                        <input
                           type="tel"
                           id="telefone"
                           name="telefone"
                           placeholder="(00) 00000-0000"
                           inputmode="tel"
                           maxlength="15"
                           pattern="[(][0-9]{2}[)] [0-9]{4,5}-[0-9]{4}"
                           autocomplete="tel"
                           required
                        >
                     
                        <span
                           class="mensagem-erro"
                           id="erro-telefone"
                           aria-live="polite"
                        ></span>
                  
                  </div>
                </fieldset>


                <fieldset>

                    <legend>
                        Endereço
                    </legend>


                    <div class="campo">

                        <label for="endereco">
                            Endereço *
                        </label>

                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            placeholder="Rua, número e complemento"
                            autocomplete="street-address"
                            minlength="5"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-endereco"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">

                        <label for="cep">
                            CEP *
                        </label>

                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            placeholder="00000-000"
                            inputmode="numeric"
                            maxlength="9"
                            pattern="[0-9]{5}-[0-9]{3}"
                            autocomplete="postal-code"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-cep"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">

                        <label for="cidade">
                            Cidade *
                        </label>

                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            placeholder="Digite sua cidade"
                            autocomplete="address-level2"
                            required
                        >

                        <span
                            class="mensagem-erro"
                            id="erro-cidade"
                            aria-live="polite"
                        ></span>

                    </div>


                    <div class="campo">

                        <label for="estado">
                            Estado *
                        </label>

                        <select
                            id="estado"
                            name="estado"
                            autocomplete="address-level1"
                            required
                        >

                            <option value="">
                                Selecione o estado
                            </option>

                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>

                        </select>

                        <span
                            class="mensagem-erro"
                            id="erro-estado"
                            aria-live="polite"
                        ></span>

                    </div>

                </fieldset>


                <fieldset>

                    <legend>
                        Participação
                    </legend>


                    <div class="campo">

                        <label for="interesse">
                            Área de interesse *
                        </label>

                        <select
                            id="interesse"
                            name="interesse"
                            required
                        >

                            <option value="">
                                Selecione uma opção
                            </option>

                            <option value="voluntariado">
                                Voluntariado
                            </option>

                            <option value="doacoes">
                                Doações
                            </option>

                            <option value="projetos">
                                Participação em projetos
                            </option>

                        </select>

                    </div>


                    <div class="campo">

                        <label for="mensagem">
                            Mensagem
                        </label>

                        <textarea
                            id="mensagem"
                            name="mensagem"
                            rows="5"
                            placeholder="Conte-nos como gostaria de ajudar..."
                        ></textarea>

                    </div>

                </fieldset>


                <div
                    id="mensagem-formulario"
                    class="alert"
                    aria-live="polite"
                ></div>


                <div class="acoes-formulario">

                    <button
                        type="submit"
                        class="btn btn-primario"
                    >
                        Enviar cadastro
                    </button>

                    <button
                        type="reset"
                        class="btn btn-secundario"
                    >
                        Limpar
                    </button>

                </div>

            </form>

        </section>
    `,


    /* =====================================
       SOBRE
    ===================================== */

    sobre: `
        <section
            class="hero hero-menor"
            aria-labelledby="titulo-sobre"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Sobre nós
                </span>

                <h1 id="titulo-sobre">
                    Unidos por uma causa
                </h1>

                <p>
                    Conheça a Juntos e nosso propósito de aproximar
                    pessoas de iniciativas que geram impacto social.
                </p>

            </div>

        </section>


        <section
            class="sobre"
            aria-labelledby="titulo-historia"
        >

            <div class="section-titulo">

                <span class="badge">
                    Nossa história
                </span>

                <h2 id="titulo-historia">
                    Construindo oportunidades juntos
                </h2>

                <p>
                    A Juntos nasceu com a missão de conectar pessoas
                    dispostas a ajudar com projetos que precisam de apoio.
                </p>

            </div>


            <div class="cards">

                <article class="card">

                    <h3>
                        Missão
                    </h3>

                    <p>
                        Conectar pessoas e organizações para promover
                        ações que contribuam para uma sociedade mais
                        solidária e participativa.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Visão
                    </h3>

                    <p>
                        Ser uma plataforma de referência para participação
                        social, voluntariado e apoio a projetos comunitários.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Valores
                    </h3>

                    <p>
                        Solidariedade, respeito, transparência,
                        responsabilidade e colaboração.
                    </p>

                </article>

            </div>

        </section>


        <section
            class="projetos-destaque"
            aria-labelledby="titulo-atuacao"
        >

            <div class="section-titulo">

                <span class="badge">
                    Nossa atuação
                </span>

                <h2 id="titulo-atuacao">
                    Áreas em que trabalhamos
                </h2>

            </div>


            <div class="cards">

                <article class="card">

                    <h3>
                        Comunidade
                    </h3>

                    <p>
                        Apoio a famílias e pessoas que precisam
                        de oportunidades e recursos.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Educação
                    </h3>

                    <p>
                        Incentivo ao aprendizado e ao desenvolvimento
                        de crianças, jovens e adultos.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Sustentabilidade
                    </h3>

                    <p>
                        Ações de conscientização e preservação
                        do meio ambiente.
                    </p>

                </article>

            </div>

        </section>


        <section
            class="chamada"
            aria-labelledby="titulo-sobre-chamada"
        >

            <h2 id="titulo-sobre-chamada">
                Faça parte da Juntos
            </h2>

            <p>
                Existem muitas formas de contribuir.
                Escolha como você gostaria de participar.
            </p>

            <a
                href="${paginaCadastro}"
                class="btn btn-primario"
            >
                Quero participar
            </a>

        </section>
    `,


    /* =====================================
       VOLUNTARIADO
    ===================================== */

    voluntariado: `
        <section
            class="hero hero-menor"
            aria-labelledby="titulo-voluntariado"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Voluntariado
                </span>

                <h1 id="titulo-voluntariado">
                    Faça a diferença como voluntário
                </h1>

                <p>
                    Doe seu tempo, seus conhecimentos e suas habilidades
                    para contribuir com projetos que transformam vidas.
                </p>

            </div>

        </section>


        <section
            class="projetos"
            aria-labelledby="titulo-formas-ajudar"
        >

            <div class="section-titulo">

                <h2 id="titulo-formas-ajudar">
                    Encontre uma forma de ajudar
                </h2>

                <p>
                    Você pode participar de diferentes áreas
                    de atuação da Juntos.
                </p>

            </div>


            <div class="cards">

                <article class="card">

                    <h3>
                        Apoio à comunidade
                    </h3>

                    <p>
                        Ajude na organização e distribuição de recursos
                        para famílias e pessoas da comunidade.
                    </p>

                    <a
                        href="${paginaCadastro}"
                        class="btn btn-primario"
                    >
                        Quero participar
                    </a>

                </article>


                <article class="card">

                    <h3>
                        Educação
                    </h3>

                    <p>
                        Contribua com oficinas, atividades educativas
                        e apoio ao aprendizado.
                    </p>

                    <a
                        href="${paginaCadastro}"
                        class="btn btn-primario"
                    >
                        Quero participar
                    </a>

                </article>


                <article class="card">

                    <h3>
                        Sustentabilidade
                    </h3>

                    <p>
                        Participe de ações de reciclagem, educação
                        ambiental e preservação.
                    </p>

                    <a
                        href="${paginaCadastro}"
                        class="btn btn-primario"
                    >
                        Quero participar
                    </a>

                </article>

            </div>

        </section>


        <section
            class="chamada"
            aria-labelledby="titulo-voluntariado-chamada"
        >

            <h2 id="titulo-voluntariado-chamada">
                Pronto para ajudar?
            </h2>

            <p>
                Faça seu cadastro e descubra oportunidades
                de voluntariado.
            </p>

            <a
                href="${paginaCadastro}"
                class="btn btn-primario"
            >
                Cadastrar-me
            </a>

        </section>
    `,


    /* =====================================
       DOAÇÕES
    ===================================== */

    doacoes: `
        <section
            class="hero hero-menor"
            aria-labelledby="titulo-doacoes"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Doações
                </span>

                <h1 id="titulo-doacoes">
                    Sua contribuição pode transformar vidas
                </h1>

                <p>
                    Toda contribuição pode ajudar a manter projetos
                    e ampliar o impacto das nossas ações.
                </p>

            </div>

        </section>


        <section
            class="projetos"
            aria-labelledby="titulo-formas-doar"
        >

            <div class="section-titulo">

                <h2 id="titulo-formas-doar">
                    Formas de contribuir
                </h2>

                <p>
                    Existem diferentes maneiras de apoiar
                    as iniciativas da Juntos.
                </p>

            </div>


            <div class="cards">

                <article class="card">

                    <h3>
                        Doação financeira
                    </h3>

                    <p>
                        Contribuições financeiras podem ajudar na
                        manutenção das ações e campanhas sociais.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Doação de materiais
                    </h3>

                    <p>
                        Materiais e itens essenciais podem ser
                        direcionados para famílias e projetos.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Compartilhe
                    </h3>

                    <p>
                        Divulgue nossos projetos e ajude a aproximar
                        novas pessoas da causa.
                    </p>

                </article>

            </div>

        </section>


        <section
            class="projetos-destaque"
            aria-labelledby="titulo-destino"
        >

            <div class="section-titulo">

                <span class="badge">
                    Impacto
                </span>

                <h2 id="titulo-destino">
                    Para onde sua contribuição pode ir
                </h2>

            </div>


            <div class="cards">

                <article class="card">

                    <h3>
                        Apoio à comunidade
                    </h3>

                    <p>
                        Apoio a campanhas e ações destinadas
                        a pessoas em situação de vulnerabilidade.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Educação
                    </h3>

                    <p>
                        Recursos destinados a atividades,
                        oficinas e ações de aprendizagem.
                    </p>

                </article>


                <article class="card">

                    <h3>
                        Sustentabilidade
                    </h3>

                    <p>
                        Apoio a iniciativas de educação ambiental,
                        reciclagem e preservação.
                    </p>

                </article>

            </div>

        </section>


        <section
            class="chamada"
            aria-labelledby="titulo-doacao-chamada"
        >

            <h2 id="titulo-doacao-chamada">
                Quer contribuir com a Juntos?
            </h2>

            <p>
                Cadastre-se para acompanhar nossos projetos
                e oportunidades de participação.
            </p>

            <a
                href="${paginaCadastro}"
                class="btn btn-primario"
            >
                Quero participar
            </a>

        </section>
    `,


    /* =====================================
       INSCRIÇÕES
    ===================================== */

    inscricoes: `
        <section
            class="hero hero-menor"
            aria-labelledby="titulo-inscricoes"
        >

            <div class="hero-conteudo">

                <span class="badge">
                    Minhas inscrições
                </span>

                <h1 id="titulo-inscricoes">
                    Minhas inscrições
                </h1>

                <p>
                    Consulte os cadastros realizados neste navegador.
                </p>

            </div>

        </section>


        <section
            class="projetos"
            aria-labelledby="titulo-lista-inscricoes"
        >

            <div class="section-titulo">

                <h2 id="titulo-lista-inscricoes">
                    Inscrições realizadas
                </h2>

                <p>
                    Os dados são armazenados localmente no navegador
                    usando localStorage.
                </p>

            </div>


            <div
                id="lista-inscricoes"
                class="cards"
                aria-live="polite"
            >

                <article class="card">

                    <h3>
                        Nenhuma inscrição encontrada
                    </h3>

                    <p>
                        Ainda não existem inscrições salvas neste navegador.
                    </p>

                    <a
                        href="${paginaCadastro}"
                        class="btn btn-primario"
                    >
                        Fazer cadastro
                    </a>

                </article>

            </div>


            <div class="acoes-formulario">

                <button
                    type="button"
                    id="limpar-inscricoes"
                    class="btn btn-secundario"
                >
                    Limpar inscrições
                </button>

            </div>

        </section>
    `
};


/* =========================================
   RENDERIZAÇÃO
========================================= */

export function renderizarPagina(pagina) {

    const main =
        document.querySelector("main");


    if (!main) {

        console.error(
            "Elemento <main> não encontrado."
        );

        return;
    }


    /* =====================================
       PÁGINA NÃO ENCONTRADA
    ===================================== */

    if (!templates[pagina]) {

        main.innerHTML = `
            <section
                class="hero hero-menor"
                aria-labelledby="titulo-erro"
            >

                <div class="hero-conteudo">

                    <span class="badge">
                        Erro
                    </span>

                    <h1 id="titulo-erro">
                        Página não encontrada
                    </h1>

                    <p>
                        A página que você tentou acessar
                        não existe.
                    </p>

                    <a
                        href="${paginaInicio}"
                        class="btn btn-primario"
                    >
                        Voltar para o início
                    </a>

                </div>

            </section>
        `;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    /* =====================================
       RENDERIZAÇÃO DA PÁGINA
    ===================================== */

    main.innerHTML =
        templates[pagina];


    /* =====================================
       VOLTA PARA O TOPO
    ===================================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
