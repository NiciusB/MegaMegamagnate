import './utils.js'
import buildings from './buildings.js'
import casinos from './casinos.js'
import * as HiLo from './hilo.js'

console.log('Mega Megamagnate as loaded!')

function switchLocation(loc) {
  switch (loc[0]) {
    case 'buildings':
      buildings.init();
      break;
    case 'casino':
      if (loc[1] === 'play') casinos.init()
      else if (loc[1] === 'hilo') HiLo.init();
      break;
  }
}

function onLoadChanges() {
  formatNumber = function (numero) {
    var num = new NumberFormat();
    num.setInputDecimal('.');
    num.setNumber(numero);
    num.setPlaces('0', false);
    num.setCurrencyValue('');
    num.setCurrency(true);
    num.setCurrencyPosition(num.RIGHT_OUTSIDE);
    num.setNegativeFormat(num.LEFT_DASH);
    num.setNegativeRed(true);
    num.setSeparators(true, '.', '.');
    return num.toFormatted();
  };
  $('.footer').hide();
  $('.trozoLogin div').first().hide();
  $('.cajaDinero').hide().css('font-family', 'monospace').prepend('<span id="tiempoHastaLlenado" style="font-size: 0.25em;color:#aaa;"></span>');
  setTimeout(() => {
    $('.cajaDinero').show();
  }, 500);
  setInterval(() => {
    if (!$('#cajetoDinero').attr('data')) return false; // sometimes it doesn't find it for some reason
    var toHHMMSS = (secs) => {
      var sec_num = parseInt(secs, 10);
      var hours = Math.floor(sec_num / 3600) % 24;
      var minutes = Math.floor(sec_num / 60) % 60;
      var seconds = sec_num % 60;
      return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    };
    var limite_caja = parseInt($('#cajetoDinero').attr('data').split(':')[1].split('.').join(''));
    var al_segundo = parseFloat($("#alsegundo").html());
    var segundos_que_quedan = (limite_caja - dinero) / al_segundo;
    if (segundos_que_quedan > 0) {
      $('#tiempoHastaLlenado').html(toHHMMSS(segundos_que_quedan) + ' hasta llenado');
    } else {
      $('#tiempoHastaLlenado').html('Lleno');
    }
  }, 500);
}

if ($('#cajetoDinero').length) {
  onLoadChanges();
  switchLocation(window.location.pathname.split('/').splice(1));
}