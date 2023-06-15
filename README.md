# venecodollarbot

<div align="center">
  <img src="https://img.shields.io/github/repo-size/gustavoerivero/venecodollarbot" alt="project size" />
  <img src="https://img.shields.io/github/contributors/gustavoerivero/venecodollarbot" alt="project collabs" />
  <img src="https://img.shields.io/github/last-commit/gustavoerivero/venecodollarbot" alt="project last commit" />
  <img src="https://img.shields.io/github/languages/count/gustavoerivero/venecodollarbot" alt="project languages" />
  <img src="https://img.shields.io/github/languages/top/gustavoerivero/venecodollarbot" alt="project major language percent" />
</div>

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> English </a></td>
          <td><a href="./README-ES.md"> Spanish </a></td>
      </tr>
  </table>
</div>

Venecodollar bot represents a bot for the instant messaging application, Telegram. This bot consumes the [Venecodollar API](https://github.com/gustavoerivero/venecodollar), which provides the dollar values in terms of bolivar measured by some monitors of its value, among which we can get the Banco Central de Venezuela (BCV), enParalelo, DolarToday and even the dollar rate in Binance.

Among the functions provided by the bot, we have:

### start
```http
  /start
```

Allows to start the conversation with the bot and start using its functions.

### about
```http
  /about
```

Shows a little more about the project that corresponds to the bot.

### help
```http
  /help
```

Shows the commands available to be executed by the bot

### detalle
```http
  /detalle <command>
```

This command, allows you to get a more specified detail of the command you want to know that information about. If no additional command is supplied, the bot returns a specific detail of all its commands with examples included.

### dolar
```http
  /dolar
```

The bot returns the dollar values according to various sources monitoring the dollar in Venezuela.

### fuente
```http
  /fuente <name>
```

The bot returns dollar values according to a specified source followed by the /source command.

### calcular
```http
  /calcular <currency> <amount> <source>
```

Calculates the equivalent value of an amount entered based on the Dollar <-> Bolivar conversion. Available currencies are bolivars (Bs) and dollars ($). If you provide a specific source, the bot will use only that source to perform the calculation, otherwise all available sources will be used. For example, "/calcular $ 1080 BCV", will return the equivalent value in BCV bolivars. "/calcular Bs 1080", to obtain the equivalent value in dollars according to all sources.

### avisos
```http
  /avisos
```

(Currently in testing) Activates the daily notices of the dollar exchange rate.

### remover
```http
  /remover
```

(Currently in testing) Disables the daily dollar exchange notices.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---
⌨️ made with ❤️ by [gustavoerivero](https://github.com/gustavoerivero) 