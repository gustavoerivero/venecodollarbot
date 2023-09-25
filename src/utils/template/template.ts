import { TData } from "../../types";
import { dateFormatter } from "../formatters";

const date = dateFormatter();
const logo = "https://github.com/gustavoerivero/venecodollarbot/blob/main/assets/goose-removebg.png?raw=true";

export const html = (data: TData) => `
  <html>
    <head>
    ${css()}
    </head>
    <body>
      <img class="logo text-center" src="${logo}" alt="Venecodollar logo" />
      <h1 class="text-center">
        Venecodollar
      </h1>
      <section="average">
        <h5 class="text-center">
          ${date}
        </h2>
      </section>

      <section class="data">
        ${card(data)}
      </section>

      <footer>
        <p>
          Imagen referencial por 
          <a target="_blank" href="https://t.me/venecodollarbot">Venecodollar</a>
          - Los valores son obtenidos por
          <a target="_blank" href="https://exchangemonitor.net">https://exchangemonitor.net</a><br />
          Para visualizar otros proyectos
          <a target="_blank" href="https://github.com/gustavoerivero">https://github.com/gustavoerivero</a>
        </p>
      </footer>
    </body>
  </html>
`;

const card = (data: TData) => {
  if (!data.entities) {
    return;
  }

  const entities = data.entities.slice(0, 6);

  return entities.map(item => `
    <div class="dollar-box-container">
      <div class="dollar-box text-center">
        <h5>
          ${item.info?.title}
        </h5>
        <img src="${item.info?.image}" alt="${item.info?.title}" />
        <p class="dollar"><sup>Bs.</sup>${item.info?.dollar}</p>
        <ul class="features-list">
          <li><strong>Fecha de actualización: </strong><small>${item.info?.updatedDate}</small></li>
          <li><strong>Diferencia: </strong><small>Bs.</small> <small class="${item.info.tendencyColor}">${item.info.tendencyColor === "red" ? "-" : ""}${item.info.difference}</small></li>
          <li><strong>Porcentaje: </strong><small class="${item.info.tendencyColor}">${item.info.tendencyColor === "red" ? "-" : ""}${item.info.differencePercentage}</small></li>
        </ul>
      </div>
    </div>
  `).join();
};

const css = () => `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');

    * {
      box-sizing: border-box;
    }

    body {
      background-color: #f6f5f7;
      font-family: 'Open Sans', sans-serif;
      margin-bottom: 50px;
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

    .average {
      min-height: 250px;
      padding-bottom: 10px;

      justify-content: center;
      align-items: center;
    }

    .average h3, .average p {
      text-transform: uppercase;
    }

    .average h3, .average p {
      font-size: 24px;
    }

    .average sub, .average sup {
      font-size: 16px;
      font-weight: 100;
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