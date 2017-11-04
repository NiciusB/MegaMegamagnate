import Cookies from './js.cookie.min.js'

let settings = JSON.parse($('#mm_settings').val())
var casinos = {
	slowMode: false,
	salirEnBote: false,
	auto: true,
	slowCounter: 0,
	lastTs: new Date() * 1,
	lastBote: 0,
	init() {
		if (Cookies.get('monsterMode')) this.monsterModeInit()

		var fichas = document.getElementById('fichas')
		fichas.value = fichas.length * 5
		var botones = $('<div style="text-align:center;margin:1em;"></div>').insertBefore('#mensajescasino')
		$('<button></button>').appendTo(botones).click(function () {
			casinos.auto = !casinos.auto
			$(this).text(casinos.auto ? 'Stop Auto' : 'Start Auto')
		}).click()
		$('<button></button>').appendTo(botones).click(function () {
			casinos.slowMode = !casinos.slowMode
			$(this).text(casinos.slowMode ? 'Stop SlowMode' : 'Activar SlowMode')
		}).click()
		$('<button></button>').appendTo(botones).click(function () {
			casinos.salirEnBote = !casinos.salirEnBote
			$(this).text(casinos.salirEnBote ? 'Stop SalirEnBote' : 'Activar SalirEnBote')
		}).click()
		$('<div style="margin: 1em 0;color:#333;">SlowMode: Si el bote es menor a ' + new Intl.NumberFormat('es-ES').format(settings.casinos_slowAmount) + ', solamente se apuesta cada ' + settings.casinos_slowTimer + ' segundos</div>').appendTo(botones)
		$('<div style="margin: 1em 0;color:#333;">SalirEnBote: Si se reparte un bote, se saldrá automáticamente del casino.</div>').appendTo(botones)
		this.interval()
	},
	monsterModeInit() {
		casinos.slowMode = true
		casinos.salirEnBote = true
		window.jAlert = () => {}
		setInterval(()=>{
			if(document.getElementById('palanca').src === 'https://s3.eu-central-1.amazonaws.com/eu.megamagnate/casinos/MMM'+tipo_casino+'/palancaon.gif') flag = 0
		}, 1)
	},
	interval() {
		setTimeout(casinos.interval, 50)
		var casinoCerrado = $('.tablaerror').length > 0
		var delta = new Date() * 1 - casinos.lastTs
		casinos.lastTs = new Date() * 1
		if (!casinoCerrado && casinos.auto) {
			var bote = parseInt($('#mbote').html().split('.').join(''))

			if (casinos.salirEnBote && bote < casinos.lastBote) {
				alert('Bote!!')
				document.location = '/casino/list'
				casinos.auto = false
				return
			}
			var slowCounterMinValue
			if (casinos.slowMode && bote < parseInt(settings.casinos_slowAmount)) {
				slowCounterMinValue = parseInt(settings.casinos_slowTimer) * 1000
			} else {
				slowCounterMinValue = 50
			}

			casinos.slowCounter += delta
			if (casinos.slowCounter >= slowCounterMinValue) {
				casinos.slowCounter = 0
				casinos.lastBote = bote
				window.apostar()
			}
		}
	}
}

module.exports = casinos
