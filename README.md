# Football Fixtures Viewer

Acompanhe todos os jogos dos campeonatos disponíveis (veja lista abaixo). É possível realizar a filtragem por time e rodada.
O projeto consome a API disponível em [Footbal Data API](https://www.football-data.org/documentation/quickstart)

## Demonstração

<p align="center">
  <img src="https://res.cloudinary.com/fmonline/image/upload/v1719503647/FootballFixtures-Brave2024-06-2711-53-42-ezgif.com-video-to-gif-converter_m8dzgm.gif" alt="Football Fixtures Viewer demo" />
</p>

[Acesse o link em produção](https://football-fixtures-viewer.vercel.app/)

## Campeonatos disponíveis

- Campeonato Brasileiro Série A
- Championship
- Premier League
- UEFA Champions League
- European Championship
- Ligue 1
- Bundesliga
- Serie A
- Eredivisie
- Primeira Liga
- Copa Libertadores
- Primera Division
- FIFA World Cup

## Compartilhamento

A URL da página pode ser compartilhada para maior velocidade na consulta das informações. São 3 atributos disponíveis:

- championship (Identificador do campeonato selecionado)
- team (Identificador do time)
- matchday (Número da rodada)

Exemplo: Para a URL `https://football-fixtures-viewer.vercel.app/?championship=2013&team=1783&matchday=10`, será exibido o jogo do Flamengo (time com ID 1783) da 10ª rodada do campeonato Brasileiro (campeonato com ID 2013).

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu .env

`X_AUTH_KEY`

O valor de `X_AUTH_KEY` é o valor fornecido pela API ao criar uma conta. Está disponível em [Footbal Data API](https://www.football-data.org/documentation/quickstart)

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:gabrielsxp/football-fixtures-viewer.git
```

Entre no diretório do projeto

```bash
  football-fixtures-viewer
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Build local

Para buildar a aplicação e executá-la localmente, execute

```bash
  npm run build && npm run start
```

## Rodando os testes

Abra a pasta do projeto e execute os testes

```bash
  cd football-fixtures-viewer
  npm run test
```

## Deploy

Para fazer o deploy desse projeto, primeiramente é necessário ter a `vercel` instalada globalmente. Para isso, execute

```bash
  npm install -g vercel
```

Entre na pasta do projeto e execute o comando para fazer o login em sua conta da vercel.

```bash
  cd football-fixtures-viewer
  vercel login
```

Após realizar o login, execute o comando

```bash
  npm run deploy
```

Algumas perguntas serão feitas nesta etapa

```bash
    Set up and deploy "~/football-fixtures-viewer"?
    Responda: Y e aperte Enter
```

```bash
    Which scope do you want to deploy to?
    Aperte Enter
```

```bash
    Link to existing project?
    Responda: N e aperte Enter
```

```bash
    What’s your project’s name?
    Aperte Enter ou digite algum nome
```

```bash
    In which directory is your code located? ./
    Aperte Enter
```

```bash
    Want to modify these settings?
    Responda: N e aperte Enter
```

Após a conclusão do deploy, um link público da versão em produção ficará disponível no terminal.

## Autores

- [@gabrielsxp](https://www.github.com/gabrielsxp)

## Stack utilizada

**Front-end:** React, Next.js, Tailwind, RadixUI, Jest, React Testing Library
