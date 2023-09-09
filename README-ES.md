# Venecodollarbot

<h1 align="center">
  <img src="./assets/goose-removebg.png" alt="venecodollarbot" width="300" height="300" />
</h1>

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

Venecodollar bot representa un bot para la aplicación de mensajería instantánea, Telegram. Este bot consume la [API de Venecodollar](https://github.com/gustavoerivero/venecodollar), la cuál provee de los valores del dólar en términos de bolívar medido por algunos monitores de su valor, entre los que podemos conseguir al Banco Central de Venezuela (BCV), enParalelo, DolarToday e incluso, la tasa del dólar en Binance.

Entre las funciones que provee el bot, tenemos:

### start
```http
  /start
```

Permite iniciar la conversación con el bot y comenzar a hacer uso de sus funciones.

### about
```http
  /about
```

Muestra un poco más acerca del proyecto que corresponde al bot.

### help
```http
  /help
```

Muestra los comandos disponibles para ejecutar por el bot

### detalle
```http
  /detalle <comando>
```

Este comando, permite obtener un detalle más especificado del comando del que se desea conocer dicha información. Si no se suministra ningún comando adicional, el bot devuelve un detalle específico de todos sus comandos con ejemplos incluídos.

### dolar
```http
  /dolar
```

El bot devuelve los valores del dólar según varias fuentes monitoras del dólar en Venezuela.

### fuente
```http
  /fuente <nombre>
```

El bot retorna los valores del dólar según una fuente especificada seguida del comando /fuente.

### calcular
```http
  /calcular <moneda> <monto> <fuente>
```

Calcula el valor equivalente de un monto ingresado basado en la conversión Dólar <-> Bolívar. Las monedas disponibles son bolívares (Bs) y dólares ($). Si proporcionas una fuente específica, el bot utilizará solo esa fuente para realizar el cálculo, en caso contrario se utilizarán todas las fuentes disponibles. Por ejemplo, "/cacular $ 1080 BCV", devolverá el valor equivalente en bolívares BCV. "/calcular Bs 1080", para obtener el valor equivalente en dólares según todas las fuentes.

### avisos
```http
  /avisos
```

(Actualmente en pruebas) Activa los avisos diarios del cambio del dólar.

### remover
```http
  /remover
```

(Actualmente en pruebbbas) Desactiva los avisos diarios del cambio del dólar.

## Contribuciones

Se aceptan pull requests. Para cambios mayores, por favor abra una issue primero para discutir lo que le gustaría cambiar.

Por favor, asegúrese de actualizar las pruebas según corresponda.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)


---
⌨️ hecho con ❤️ por [gustavoerivero](https://github.com/gustavoerivero)
