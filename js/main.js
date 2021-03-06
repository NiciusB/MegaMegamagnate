import './utils.js'
import buildings from './buildings.js'
import casinos from './casinos.js'
import HiLo from './hilo.js'
import inbox from './inbox.js'
import chat from './chat.js'
import heroes from './heroes.js'

if (document.querySelector('.chatMC')) chat.init() // Solo si estas en una MC

let settings = window.mmm_settings
let mode = settings.advanced_devMode ? 'dev' : 'production'
console.log('Mega Megamagnate '+ settings.version +' (' + mode + ' mode) is loaded')

function switchLocation(loc) {
  switch (loc[0]) {
  case 'buildings':
    buildings.init()
    break
  case 'casino':
    if (loc[1] === 'play') casinos.init()
    else if (loc[1] === 'hilo') HiLo.init()
    break
  case 'messages':
    if (loc[1] === 'inbox') inbox.init()
    break
  case 'heroes':
    heroes.init()
    break
  }
}

window.formatNumber = function (numero) {
  var num = new window.NumberFormat()
  num.setInputDecimal('.')
  num.setNumber(numero)
  num.setPlaces('0', false)
  num.setCurrencyValue('')
  num.setCurrency(true)
  num.setCurrencyPosition(num.RIGHT_OUTSIDE)
  num.setNegativeFormat(num.LEFT_DASH)
  num.setNegativeRed(true)
  num.setSeparators(true, '.', '.')
  return num.toFormatted()
}

if(!settings.general_playButton) $('.trozoLogin a[href="https://play.google.com/store/apps/details?id=net.megamagnate"]').hide()

if (settings.general_moneyTimer) {
  $('.cajaDinero').css('font-family', 'monospace').prepend('<span style="font-size: 0.225em;color:#aaa;"></span>')
  $('#cajetoDinero').css('font-size', '0.85em').html(window.formatNumber(window.dinero))
  if ($('#cajetoDinero').attr('data')) {
    setInterval(() => {
      var toHHMMSS = secs => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600) // Como la unidad máx de medida es horas, que puedan superar las 24
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
        return [hours, minutes, seconds]
          .map(v => v < 10 ? '0' + v : v)
          .filter((v, i) => v !== '00' || i > 0)
          .join(':')
      }
      var limite_caja = parseInt($('#cajetoDinero').attr('data').split(':')[1].split('.').join(''))
      var al_segundo = parseFloat($('#alsegundo').html())
      var segundos_que_quedan = (limite_caja - window.dinero) / al_segundo
      if (segundos_que_quedan > 0) {
        $('.cajaDinero>span:first').html(toHHMMSS(segundos_que_quedan) + ' hasta llenado')
      } else {
        $('.cajaDinero>span:first').html('Lleno')
      }
    }, 500)
  }
}

try {
  switchLocation(window.location.pathname.split('/').splice(1))
} catch (e) {
  console.error(e)
}

$('.menuOpciones:last').append(`
<a target="_blank" href="https://discord.gg/juYwrx5"><p>
  - Discord <img src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg" style="
  width: 1em;
  height: 1em;
  margin: 0 0.2em;
  vertical-align: middle;"/> (no oficial)
</p></a>
`)

window.mmm_settings = undefined