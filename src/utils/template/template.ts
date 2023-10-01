import { TData } from "../../types";
import { dateFormatter, locale } from "../formatters";

export const LENGTH = 6;
const date = dateFormatter();

export const html = (data: TData) => `
  <html>
    <head>
      ${css()}
    </head>
    <body>
      <img class="logo text-center" src="${logo}" alt="${bot} logo" />
      <h1 class="text-center title">
        ${name}
      </h1>
      <h4 class="text-center">
        <bold>PROMEDIO GENERAL: </bold>Bs. ${data.average}
      </h4>
      <h6 class="text-center date">
        ${date}
      </h6>

      <section class="data">
        ${card(data)}
      </section>

      <footer>
        <p>
          Imagen referencial por 
          <a target="_blank" href="${telegram}">${bot}</a>
          - Los valores son obtenidos por
          <a target="_blank" href="${source}">${source}</a><br />
          Para visualizar otros proyectos
          <a target="_blank" href="${git}">${git}</a>
        </p>
      </footer>
    </body>
  </html>
`;

export const average = (data: TData) => {
  let average = 0;

  if (!data.entities) {
    return format(0);
  }

  for (let index = 0; index < LENGTH; index++) {
    if (data.entities[index].info.title.toLowerCase() !== "petro") {
      average += data.entities[index].info.dollar ?? 0;
    }
  }

  return format(average / (LENGTH - 1));

};

const format = (number?: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(number ?? 0);

const card = (data: TData) => {
  if (!data.entities) {
    return;
  }

  const entities = data.entities.slice(0, LENGTH);

  return entities.map(item => `
    <div class="dollar-box-container">
      <div class="dollar-box text-center">
        <h5>
          ${item.info?.title}
        </h5>
        <img src="${item.info?.image}" alt="${item.info?.title}" height="25%" width="25%" />
        <p class="dollar"><sup>Bs.</sup>${format(item.info?.dollar)}</p>
        <ul class="features-list">
          <li><strong>Fecha de actualización: </strong><small>${item.info?.updatedDate}</small></li>
          <li><strong>Diferencia: </strong><small>Bs.</small> <small class="${item.info.tendencyColor}">${item.info.tendencyColor === "red" ? "-" : ""}${format(item.info.difference)}</small></li>
          <li><strong>Porcentaje: </strong><small class="${item.info.tendencyColor}">${item.info.tendencyColor === "red" ? "-" : ""}${item.info.differencePercentage}</small></li>
        </ul>
      </div>
    </div>
  `).join("");
};

const css = () => `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');

    * {
      box-sizing: border-box;
    }

    h1, h4, h6 {
      padding: 0px;
      margin: 0px;
      text-transform: uppercase;
    }

    body {
      background-color: #f6f5f7;
      font-family: 'Open Sans', sans-serif;
      min-width: 1124px;
      min-height: 1124px;

      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-content: stretch;
      align-items: center;
    }

    .data {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-content: stretch;
      align-items: center;

      margin-bottom: 100px;
    }

    .date {
      padding-bottom: 25px;
    }

    .logo {
      width: 125px;
      height: 125px;
      align-self: center;
    }
    
    .text-center {
      text-align: center;
    }

    .dollar-box-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .dollar-box {
      background-color: #ffffff;
      box-shadow: 0px 2px 15px 0px rgba(0,0,0,0.5);
      border-radius: 4px;
      flex: 1;
      padding: 0 30px 30px;
      margin: 2%;
      min-width: 250px;
      max-width: 350px;

      min-height: 350px;
      max-height: 350px;
    }

    .dollar-box h5 {
      text-transform: uppercase;
    }

    .dollar {
      margin: 24px 0;
      font-size: 36px;
      font-weight: 900;
    }

    .dollar sub, .dollar sup {
      font-size: 16px;
      font-weight: 100;
    }

    .features-list {
      padding: 0;
      list-style-type: none;
    }
    
    .features-list li {
      font-weight: 100;
      padding: 3px 0;
      font-weight: 100;
    }
    
    .features-list .green {
      color: rgb(19, 99, 0);
    }

    .features-list .red {
      color: rgb(99, 0, 0);
    }

    footer {
      padding-top: 10px;
      background-color: #222;
      color: #fff;
      font-size: 14px;
      bottom: 0;
      position: fixed;
      left: 0;
      right: 0;
      text-align: center;
    }
    
    footer p {
      margin: 10px 0;
    }
    
    footer i {
      color: red;
    }
    
    footer a {
      color: #3C97BF;
      text-decoration: none;
    }

  </style>
`;

const name = process.env.NAME;
const bot = process.env.BOT_NAME;
const logo = process.env.LOGO;
const source = process.env.SOURCE;
const telegram = process.env.TELEGRAM;
const git = process.env.GIT;