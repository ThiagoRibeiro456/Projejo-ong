# Juntos - Plataforma para ONG

Projeto acadêmico de desenvolvimento front-end para uma organização do terceiro setor. A plataforma **Juntos** tem como objetivo divulgar projetos sociais, incentivar o voluntariado, facilitar inscrições e apresentar formas de apoio às iniciativas da ONG.

## Sobre o projeto

A aplicação foi desenvolvida utilizando **HTML5, CSS3 e JavaScript (ES6)**, com foco em:

* organização e estruturação semântica das páginas;
* design responsivo;
* acessibilidade;
* navegação em formato SPA;
* validação de formulários;
* armazenamento de inscrições no `localStorage`;
* organização modular do JavaScript;
* otimização das imagens utilizando WebP;
* publicação por meio do GitHub Pages.

## Funcionalidades

### Página inicial

Apresenta a ONG, seus objetivos, principais áreas de atuação e projetos em destaque.

### Projetos

Apresenta iniciativas relacionadas a:

* Apoio à comunidade;
* Educação;
* Sustentabilidade.

### Cadastro

Permite o preenchimento de um formulário para participação nos projetos.

O formulário possui validação para:

* Nome completo;
* E-mail;
* Data de nascimento;
* CPF;
* Telefone;
* Endereço;
* CEP;
* Cidade;
* Estado;
* Área de interesse.

Também são utilizadas máscaras para CPF, telefone e CEP.

### Inscrições

As inscrições realizadas são armazenadas utilizando `localStorage`.

A página permite:

* visualizar inscrições salvas;
* remover uma inscrição individualmente;
* limpar todas as inscrições.

### Voluntariado

Apresenta formas de participação voluntária nas áreas de comunidade, educação e sustentabilidade.

### Doações

Apresenta diferentes formas de apoio às iniciativas da ONG.

### Sobre nós

Apresenta informações sobre:

* História;
* Missão;
* Visão;
* Valores;
* Áreas de atuação.

## Navegação SPA

A aplicação utiliza JavaScript modular para realizar a navegação entre as páginas sem a necessidade de recarregar todo o documento.

O sistema utiliza:

* `pushState()`;
* `popstate`;
* roteamento baseado em caminhos;
* templates renderizados dinamicamente;
* atualização do conteúdo do elemento `<main>`.

O sistema também considera a publicação do projeto dentro de uma subpasta do GitHub Pages.

## Estrutura do projeto

```text
Projeto-ong/
│
├── index.html
│
├── html/
│   ├── projetos.html
│   ├── cadastro.html
│   ├── inscricoes.html
│   ├── voluntariado.html
│   ├── sobre.html
│   └── doacoes.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── templates.js
│   ├── validacao.js
│   └── storage.js
│
├── img/
│   ├── logo.webp
│   ├── voluntarios.webp
│   ├── projeto-1.webp
│   ├── projeto-2.webp
│   └── projeto-3.webp
│
├── README.md
│
└── .gitignore
```

## Tecnologias utilizadas

### HTML5

Utilizado para a estrutura semântica das páginas, com elementos como:

```text
<header>
<nav>
<main>
<section>
<article>
<footer>
<form>
<fieldset>
<label>
```

### CSS3

Utilizado para:

* Design System;
* CSS Grid;
* Flexbox;
* responsividade;
* estados de interação;
* acessibilidade visual;
* componentes de feedback.

O projeto utiliza valores em `px` para tipografia, espaçamentos e componentes.

### JavaScript

O código foi dividido em módulos:

**app.js**

Responsável pela inicialização da aplicação, menu responsivo, inscrições, toast e integração entre os módulos.

**router.js**

Responsável pelo roteamento da SPA e navegação com `history.pushState()` e `popstate`.

**templates.js**

Responsável pelos templates utilizados para renderização dinâmica das páginas.

**validacao.js**

Responsável pela validação dos campos, máscaras, mensagens de erro e envio do formulário.

**storage.js**

Responsável pela comunicação com o `localStorage`.

## Acessibilidade

O projeto utiliza práticas voltadas à acessibilidade, incluindo:

* HTML semântico;
* `alt` em imagens;
* associação entre `label` e campos de formulário;
* `fieldset` e `legend`;
* `aria-label`;
* `aria-current`;
* `aria-expanded`;
* `aria-live`;
* navegação por teclado;
* foco visível;
* contraste adequado;
* suporte a `prefers-reduced-motion`.

## Responsividade

O CSS possui cinco pontos de quebra:

```text
1200px
1024px
768px
576px
400px
```

A interface adapta:

* menu de navegação;
* grid de projetos;
* cards;
* formulário;
* botões;
* imagens;
* rodapé;
* conteúdo principal.

## Imagens

As imagens utilizadas no projeto foram organizadas na pasta `img/` e convertidas para **WebP**.

Arquivos principais:

```text
logo.webp
voluntarios.webp
projeto-1.webp
projeto-2.webp
projeto-3.webp
```

O uso de WebP contribui para reduzir o tamanho dos arquivos e melhorar o carregamento das páginas.

## Armazenamento de dados

As inscrições são armazenadas localmente no navegador usando:

```text
localStorage
```

A chave utilizada pela aplicação é:

```text
juntos_inscricoes
```

Os dados são armazenados em formato JSON.

## Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/thiagoribeiro456/Projeto-ong.git
```

Entre na pasta:

```bash
cd Projeto-ong
```

Depois, abra o projeto utilizando um servidor local.

É recomendado utilizar uma extensão como **Live Server** no Visual Studio Code para executar os módulos JavaScript corretamente.

A página inicial estará disponível pelo:

```text
index.html
```

## Publicação

O projeto pode ser publicado utilizando **GitHub Pages**.

Estrutura esperada no repositório:

```text
Projeto-ong/
```

O arquivo `index.html` permanece na raiz para funcionar como página inicial da publicação.

Após o push para o GitHub, o conteúdo pode ser disponibilizado pelo GitHub Pages.

## Versionamento

O projeto utiliza Git para controle de versão.

Estrutura de branches considerada:

```text
main
develop
feature/*
hotfix/*
```

### Conventional Commits

Exemplos utilizados:

```text
feat: implementar navegação SPA
feat: adicionar validação do formulário
feat: implementar armazenamento local
fix: corrigir caminhos das páginas
fix: corrigir máscara do telefone
style: ajustar responsividade
docs: atualizar README
```

## Controle de versão

O projeto segue o padrão Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Exemplo de versão estável:

```text
v1.0.0
```

## Considerações finais

O projeto foi desenvolvido como uma aplicação front-end organizada em módulos, com foco em responsividade, acessibilidade, validação de formulários, armazenamento local e navegação dinâmica.

A estrutura foi preparada para facilitar manutenção, versionamento e publicação utilizando GitHub Pages.
