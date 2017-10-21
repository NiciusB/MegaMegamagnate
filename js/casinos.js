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
      this.auto = !this.auto;
      $(this).text(this.auto ? 'Stop Auto' : 'Start Auto');
    }).click();
    $('<button></button>').appendTo(botones).click(function () {
      this.slowMode = !this.slowMode;
      $(this).text(this.slowMode ? 'Stop SlowMode' : 'Activar SlowMode');
    }).click();
    $('<button></button>').appendTo(botones).click(function () {
      this.salirEnBote = !this.salirEnBote;
      $(this).text(this.salirEnBote ? 'Stop SalirEnBote' : 'Activar SalirEnBote');
    }).click();
    $('<div style="margin: 1em 0;color:#333;">SlowMode: Si el bote es menos de 800.000, solamente se apuesta cada 10 segundos</div>').appendTo(botones);
    $('<div style="margin: 1em 0;color:#333;">SalirEnBote: Si el bote igual o menos de 100.000, avisar y salir automáticamente</div>').appendTo(botones);
    this.interval(this)
  },
  interval(self) {
    setTimeout(self.interval, 500, self);
    var casinoCerrado = $('.tablaerror').length > 0;
    var delta = new Date() * 1 - self.lastTs;
    self.lastTs = new Date() * 1;
    if (!casinoCerrado && self.auto) {
      var bote = parseInt($('#mbote').html().split('.').join(''));

      if (self.salirEnBote && bote <= 100000) {
        alert('Bote!!');
        document.location = '/casino/list';
        self.auto = false;
        return;
      }

      if (self.slowMode && bote < 800000) {
        var slowCounterMinValue = 10000;
      } else {
        var slowCounterMinValue = 500;
      }

      self.slowCounter += delta;
      if (self.slowCounter >= slowCounterMinValue) {
        self.slowCounter = 0;
        apostar();
      }
    }
  }
}

module.exports = casinos;
