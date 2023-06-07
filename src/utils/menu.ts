export const commands = [
  {
    title: 'start',
    command: '/start',
    description: 'Entabla comunicación conmigo.',
    example: 'Utiliza el comando /start y el bot iniciará comunicación contigo.'
  },
  {
    title: 'help',
    command: '/help <comando>',
    description: 'Conoce los comandos disponibles u obtén información detallada de un comando específico.',
    example: 'Puedes utilizar únicamente el comando /help para conocer los comandos disponibles o utilizar el comando /help seguido del comando que deseas obtener mayor información. Por ejemplo "/help dolar".'
  },
  {
    title: 'about',
    command: '/about',
    description: 'Conoce la información detallada sobre el bot y su desarrollo.',
    example: 'Utiliza el comando /about y el bot te responderá con información detallada sobre su desarrollo.'
  },
  {
    title: 'dolar',
    command: '/dolar',
    description: 'Obtén los valores del dólar según varias fuentes monitoras del dólar en Venezuela.',
    example: 'Utiliza el comando /dolar y el bot te responderá con un mensaje que contendrá los valores de cada entidad monitora del dólar, su última fecha de actualización y un promedio entre todas las entidades monitoras.'
  },
  {
    title: 'fuente',
    command: '/fuente <nombre>',
    description: 'Obtén los valores del dólar según una fuente especificada seguida del comando /fuente.',
    example: 'Utiliza el comando /fuente <nombre> y el bot te responderá con un mensaje que contendrá los valores de cada entidad monitora del dólar que haya coincidido con el nombre que suministraste. Por ejemplo, "/fuente Monitor".'
  },
  {
    title: 'calcular',
    command: '/calcular <moneda> <monto> <fuente>',
    description: 'Calcula el valor de un monto indicado según la moneda que especifíques. Puedes suministrar la fuente que desees que el bot utilice para hacer el cálculo, de lo contrario, se hará el cálculo según todas las fuentes.',
    example: 'Utiliza el comando /calcular <moneda> <monto> <fuente> y el bot te responderá con un mensaje que contendrá el cálculo realizado. El bot hará el cálculo para la moneda distinta, es decir, si se indica "/calcular Bs 1080", el bot hará el cálculo del monto en dólares. Si se suministra la fuente a la que se quiere realizar el cálculo, se filtrará y solo mostrarán los cálculos según las fuentes que coincidan con lo que desea el usuario, por ejemplo "/calcular $ 50 Paralelo".'
  },
  {
    title: 'avisos',
    command: '/avisos',
    description: 'Activa los avisos diarios del cambio del dólar.',
    example: 'Utiliza el comando /avisos para que el bot te envíe diariamente dos mensajes con el reporte del dólar. Un mensaje a las 09:00 AM y otro a la 01:00 PM.'
  },
  {
    title: 'remover',
    command: '/remover',
    description: 'Desactiva los avisos diarios del cambio del dólar.',
    example: 'Utiliza el comando /remover para que el bot deje de enviar diaramente los mensajes con el reporte del dólar.'
  }
]

export const menu = (): string => {
  let menuString = '*Comandos disponibles:*\n'

  commands.forEach(item => {
    menuString += `${item.command} - ${item.description}\n`
  })

  return menuString
}