var casinos = {
  slowMode: false,
  salirEnBote: false,
  auto: true,
  slowCounter: 0,
  lastTs: new Date() * 1,
  init() {
    var fichas = document.getElementById("fichas");
    fichas.value = fichas.length * 5;
    var botones = $('<div style="text-align:center;margin:1em;"></div>').insertBefore('#mensajescasino');
    $('<button></button>').appendTo(botones).click(function () {
      casinos.auto = !casinos.auto;
      $(this).text(casinos.auto ? 'Stop Auto' : 'Start Auto');
    }).click();
    $('<button></button>').appendTo(botones).click(function () {
      casinos.slowMode = !casinos.slowMode;
      $(this).text(casinos.slowMode ? 'Stop SlowMode' : 'Activar SlowMode');
    }).click();
    $('<button></button>').appendTo(botones).click(function () {
      casinos.salirEnBote = !casinos.salirEnBote;
      $(this).text(casinos.salirEnBote ? 'Stop SalirEnBote' : 'Activar SalirEnBote');
    }).click();
    $('<div style="margin: 1em 0;color:#333;">SlowMode: Si el bote es menos de 800.000, solamente se apuesta cada 10 segundos</div>').appendTo(botones);
    $('<div style="margin: 1em 0;color:#333;">SalirEnBote: Si el bote igual o menos de 100.000, avisar y salir automáticamente</div>').appendTo(botones);
    this.interval()
  },
  interval() {
    setTimeout(casinos.interval, 500);
    var casinoCerrado = $('.tablaerror').length > 0;
    var delta = new Date() * 1 - casinos.lastTs;
    casinos.lastTs = new Date() * 1;
    if (!casinoCerrado && casinos.auto) {
      var bote = parseInt($('#mbote').html().split('.').join(''));

      if (casinos.salirEnBote && bote <= 100000) {
        alert('Bote!!');
        document.location = '/casino/list';
        casinos.auto = false;
        return;
      }

      if (casinos.slowMode && bote < 800000) {
        var slowCounterMinValue = 10000;
      } else {
        var slowCounterMinValue = 500;
      }

      casinos.slowCounter += delta;
      if (casinos.slowCounter >= slowCounterMinValue) {
        casinos.slowCounter = 0;
        apostar();
      }
    }
  }
}

module.exports = casinos;
