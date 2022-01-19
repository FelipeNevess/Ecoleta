# Projeto Ecoleta

Ecoleta é um projeto com fins de aprendizagem onde o seu objetivo é que uma pessoa usuária cadastre um ponto de coleta em sua região, foi um dos projetos de desafio da <a href="https://www.rocketseat.com.br/">Rocketseat</a> que me proporcionou grandes aprendizagens.

---

**Ferramenta de desenvolvimento da aplicação**

- Visual Studio Code

**Front-end**

- React
- Typescript
- APIs externas
  - <a href="https://servicodados.ibge.gov.br/api/docs/localidades">IBGE</a>
  - <a href="https://leafletjs.com/">Leaflet</a>

**Back-end**

- Node
- Express
- Typescript
- Knex
  - Banco de dados SQL - SQLITE3

_Eslint configurado_ com prettier

**Como usar ?**

- Entre na pasta service e rode o comando **npm** ou **yarn start**
- Entre na pasta client e rode o comando **npm** ou **yarn dev**

O banco está configurando com método **up** e **down** que possibilita voltar atrás caso aconteça algum tipo de problemas ou bugs

Caso o arquivo **database.sqlite** da pasta **service/src/database** seja apagado, o comando **knex:migrate** ira criá lo novamente e, o comando **knex:seed** ira adicionar os itens necessário na tabela items

Aplicação no ar --> https://ecoletan.netlify.app/
