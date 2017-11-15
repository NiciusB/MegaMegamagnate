let settings = window.mmm_settings
if (!settings.hilo_leastChances) settings.hilo_leastChances = 40

var chances = { hi: 0, lo: 0 }
var cardPool = []

function initializeCardPool() {
	cardPool = []
	for (var x = 0; x < 13; x++) {
		cardPool[x] = [true, true, true, true] // 4 suits
	}
}

function getChances(type, currentNumber) {
	var cardsThatWork = 0
	var totalCards = 0
	cardPool.forEach((tipoList, key) => {
		var cardsLeft = tipoList.filter(suits => suits).length
		totalCards += cardsLeft
		if (type === 'hi' ? (key > currentNumber) : (key < currentNumber)) cardsThatWork += cardsLeft
	})
	return cardsThatWork / totalCards * 100
}

function detectarCarta() {
	let cardSize = [84, 124]
	let cardPos = $('.hilo').css('background-position').split('px').map(x => parseInt(x))
	let currentNumber = Math.abs(Math.floor(cardPos[0] / cardSize[0]))
	if (currentNumber === 13) currentNumber = 0 // "A" realmente es la que menos vale, aunque su posicion en el spritesheet es la final
	let currentSuit = Math.abs(Math.floor(cardPos[1] / cardSize[1]))
	return [currentNumber, currentSuit]
}

function updateChancesHtml() {
	let style = { hi: 'color: #222; font-weight: bold;', lo: 'color: #222; font-weight: bold;' }
	if (chances.hi > 50) {
		style.hi = 'color: limegreen; font-weight: bold;'
		style.lo = 'color: orangered; font-weight: normal;'
	} else if (chances.lo > 50) {
		style.lo = 'color: limegreen; font-weight: bold;'
		style.hi = 'color: orangered; font-weight: normal;'
	}
	var displayChances = {}
	Object.keys(chances).map(function (key) {
		displayChances[key] = Math.floor(chances[key] * 100) / 100
	})
	let newDiv = `
      <div id="chances" style="margin:0 5px;flex: 1 1;">
        <div>Hi chances: <span style="${style.hi}">${displayChances.hi}%</span></div>
        <div>Lo chances: <span style="${style.lo}">${displayChances.lo}%</span></div>
      </div>
    `
	$('#chances').html(newDiv)
}

function onJugada() {
	if ($('#bote').html() == '0') initializeCardPool()
	var currentCard = detectarCarta()

	if (cardPool[currentCard[0]][currentCard[1]]) { // The events fires double sometimes, because this is the only way we get it every time the state changes
		cardPool[currentCard[0]][currentCard[1]] = false
		chances.hi = getChances('hi', currentCard[0])
		chances.lo = getChances('lo', currentCard[0])
		updateChancesHtml()
	}
}

function apostarLaMejor() {
	if (chances.hi > chances.lo) {
		window.playHilo(1)
	} else {
		window.playHilo(2)
	}
}

function changeHiLoAuto() {
	window.HiLoAuto = !window.HiLoAuto
	$('#auto-boton').html(window.HiLoAuto ? 'Stop Auto' : 'Start Auto')
}

module.exports = {
	init() {
		$('.cajaHilo').css('height', 'auto').css('flex', '1 0').parent().css('display', 'flex')
		$('<a class="boton" style="width: 100px">La más probable</a><br><br>').insertBefore('#endGame').click(apostarLaMejor)
		$('<a id="auto-boton" class="boton" style="width: 100px;"></a><br><br>').prependTo('.cajaHilo').click(changeHiLoAuto)
		$('<div id=\'chances\'></div>').insertAfter('.cajaHilo')
		$('<span style=\'margin: 1em 0;color:#333;\'>Modo Auto: Seguirá apostando mientras tengas al menos un ' + settings.hilo_leastChances + '% de posibilidades de ganar, y hasta que no llegues a la cantidad objetivo ' + new Intl.NumberFormat('es-ES').format(settings.hilo_exitOn) + '</span>').appendTo('.cajaHilo')
		$('a[onclick="comienzaJuego()"]').attr('onclick', 'comienzaJuegoSinConfirmar()')
		$('#endGame').attr('onclick', 'playHilo(3)')
		$('#jugadaspendientes').parents('.tablaContenido2').last().after('<div id="HiLoHelper"></div>')
		$('#HiLoHelper').html('<a href="https://wizardofodds.com/games/blackjack/card-counting/high-low/" target="_blank"><img style="width:100%;" src="https://i.imgur.com/4FCUpB1.png"/></a>')

		window.comienzaJuegoSinConfirmar = () => {
			var savedConfirm = window.confirm
			window.confirm = () => true
			window.comienzaJuego()
			window.confirm = savedConfirm
		}

		window.HiLoAuto = true
		changeHiLoAuto()

		setInterval(() => {
			if (!window.HiLoAuto || window.flagPlaying) return false
			var isPlaying = $('#cajaJugando').css('display') !== 'none'
			var hasLostOrSold = $('.hilo_content').css('display') === 'none'
			if (!isPlaying || hasLostOrSold) {
				window.comienzaJuegoSinConfirmar()
			} else {
				if (chances.lo >= parseInt(settings.hilo_leastChances) || chances.hi >= parseInt(settings.hilo_leastChances)) {
					var bote = parseInt($('#bote').html().split('.').join(''))
					if (bote < parseInt(settings.hilo_exitOn)) {
						apostarLaMejor()
					} else {
						window.playHilo(3) // Terminar juego
					}
				} else changeHiLoAuto()
			}
		}, 100)

		$('#bote, #disponible').on('DOMSubtreeModified', onJugada)
	}
}
