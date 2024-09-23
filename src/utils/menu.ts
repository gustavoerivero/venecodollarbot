export const commands = [
  {
    title: 'start',
    command: '/start',
    description: 'Entabla comunicación conmigo.',
    example: 'Utiliza el comando /start y el bot iniciará comunicación contigo.',
  },
  {
    title: 'help',
    command: '/help',
    description: 'Conoce los comandos disponibles.',
    example: 'Puedes utilizar únicamente el comando /help para conocer los comandos disponibles.',
  },
  {
    title: 'detalle',
    command: '/detalle <comando>',
    description: 'Obtén información detallada de un comando específico.',
    example:
      'Puedes utilizar el comando /detalle seguido del comando que deseas obtener mayor información. Por ejemplo "/detalle dolar".',
  },
  {
    title: 'about',
    command: '/about',
    description: 'Conoce la información detallada sobre el bot y su desarrollo.',
    example: 'Utiliza el comando /about y el bot te responderá con información detallada sobre su desarrollo.',
  },
  {
    title: 'dolar',
    command: '/dolar',
    description: 'Obtén los valores del dólar según varias fuentes monitoras del dólar en Venezuela.',
    example:
      'Utiliza el comando /dolar y el bot te responderá con un mensaje que contendrá los valores de cada entidad monitora del dólar, su última fecha de actualización y un promedio entre todas las entidades monitoras.',
  },
  {
    title: 'euro',
    command: '/euro',
    description: 'Obtén los valores del euro según varias fuentes monitoras del euro en Venezuela.',
    example:
      'Utiliza el comando /euro y el bot te responderá con un mensaje que contendrá los valores de cada entidad monitora del euro, su última fecha de actualización y un promedio entre todas las entidades monitoras.',
  },
  {
    title: 'fuente',
    command: '/fuente <nombre>',
    description: 'Obtén los valores del dólar según una fuente especificada seguida del comando /fuente.',
    example:
      'Utiliza el comando /fuente <nombre> y el bot te responderá con un mensaje que contendrá los valores de cada entidad monitora del dólar que haya coincidido con el nombre que suministraste. Por ejemplo, "/fuente Monitor".',
  },
  {
    title: 'euroFuente',
    command: '/euroFuente <nombre>',
    description: 'Obtén los valores del euro según una fuente especificada seguida del comando /fuente.',
    example:
      'Utiliza el comando /fuente <nombre> y el bot te responderá con un mensaje que contendrá los valores de cada entidad monitora del euro que haya coincidido con el nombre que suministraste. Por ejemplo, "/fuente Monitor".',
  },
  {
    title: 'calcular',
    command: '/calcular <moneda> <monto> <fuente>',
    description:
      'Calcula el valor equivalente de un monto ingresado basado en la conversión Dólar <-> Bolívar. Las monedas disponibles son bolívares (Bs) y dólares ($). Si proporcionas una fuente específica, el bot utilizará solo esa fuente para realizar el cálculo, en caso contrario se utilizarán todas las fuentes disponibles. Por ejemplo, "/cacular $ 1080 BCV", devolverá el valor equivalente en bolívares BCV. "/calcular Bs 1080", para obtener el valor equivalente en dólares según todas las fuentes.',
    example:
      'Utiliza el comando /calcular <moneda> <monto> <fuente> y el bot te responderá con el cálculo correspondiente. El bot realizará el cálculo en la moneda opuesta a la indicada. Por ejemplo, si escribes "/calcular $ 50", el bot te dará el valor en bolívares de $50. Si proporcionas una fuente específica, solo se mostrarán los cálculos basados en esas fuentes. Siguiendo el ejemplo anterior, "/calcular $ 50 Paralelo" filtrará los resultados a la fuente "Paralelo" para calcular el valor en bolívares de $50.',
  },
  {
    title: 'euroCalcular',
    command: '/euroCalcular <moneda> <monto> <fuente>',
    description:
      'Calcula el valor equivalente de un monto ingresado basado en la conversión Euro <-> Bolívar. Las monedas disponibles son bolívares (Bs) y euro (€). Si proporcionas una fuente específica, el bot utilizará solo esa fuente para realizar el cálculo, en caso contrario se utilizarán todas las fuentes disponibles. Por ejemplo, "/cacular € 1080 BCV", devolverá el valor equivalente en bolívares BCV. "/calcular Bs 1080", para obtener el valor equivalente en euros según todas las fuentes.',
    example:
      'Utiliza el comando /calcular <moneda> <monto> <fuente> y el bot te responderá con el cálculo correspondiente. El bot realizará el cálculo en la moneda opuesta a la indicada. Por ejemplo, si escribes "/calcular EUR 50", el bot te dará el valor en bolívares de €50. Si proporcionas una fuente específica, solo se mostrarán los cálculos basados en esas fuentes. Siguiendo el ejemplo anterior, "/calcular € 50 Paralelo" filtrará los resultados a la fuente "Paralelo" para calcular el valor en bolívares de €50.',
  },
  {
    title: 'avisos',
    command: '/avisos',
    description: 'Activa los avisos diarios del cambio del dólar.',
    example:
      'Utiliza el comando /avisos para que el bot te envíe diariamente dos mensajes con el reporte del dólar. Un mensaje a las 09:00 AM y otro a la 01:00 PM.',
  },
  {
    title: 'remover',
    command: '/remover',
    description: 'Desactiva los avisos diarios del cambio del dólar.',
    example:
      'Utiliza el comando /remover para que el bot deje de enviar diaramente los mensajes con el reporte del dólar.',
  },
];

export const menu = (): string => {
  let menuString = '*Comandos disponibles:*\n\n';

  commands.forEach((item) => {
    menuString += `${item.command} - ${item.description}\n`;
  });

  return menuString;
};
