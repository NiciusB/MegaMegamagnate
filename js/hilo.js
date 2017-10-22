var chances = { hi: 0, lo: 0 }
let settings = JSON.parse(document.querySelector("#mm_settings").value)

function setListeners() {
  let hilo = document.querySelector('.hilo')
  let cardSize = 82
  let firingEvts = document.querySelectorAll("#jugadas, #disponible")
  for (let i = 0; i < firingEvts.length; i++) {
    firingEvts[i].addEventListener('DOMSubtreeModified', e => {
      let cardPos = parseInt(hilo.style.backgroundPosition.split("px")[0])
      let currentCard = Math.abs(Math.floor(cardPos / cardSize))
      currentCard > 12 ? currentCard = 0 : null
      chances.hi = (12 - currentCard) / 12
      chances.lo = (currentCard) / 12
      let style = { hi: 'color: #222; font-weight: bold;', lo: 'color: #222; font-weight: bold;' }
      if (chances.hi > .5) {
        style.hi = 'color: limegreen; font-weight: bold;'
        style.lo = 'color: orangered; font-weight: normal;'
      } else if (chances.lo > .5) {
        style.lo = 'color: limegreen; font-weight: bold;'
        style.hi = 'color: orangered; font-weight: normal;'
      }
      var displayChances = {}
      Object.keys(chances).map(function (key, index) {
        displayChances[key] = Math.floor(chances[key] * 10000) / 100
      })
      let newDiv = `
        <div id="chances" style="margin:0 5px;flex: 1 1;">
          <div>Hi chances: <span style="${style.hi}">${displayChances.hi}%</span></div>
          <div>Lo chances: <span style="${style.lo}">${displayChances.lo}%</span></div>
        </div>
      `
      $("#chances").html(newDiv)
    })
  }
}

function apostarLaMejor() {
  if (chances.hi > chances.lo) {
    playHilo(1)
  } else {
    playHilo(2)
  }
}

function changeHiLoAuto() {
  window.HiLoAuto = !window.HiLoAuto
  $('#auto-boton').html(window.HiLoAuto ? 'Stop Auto' : 'Start Auto')
}

module.exports = {
  init() {
    $(".cajaHilo").css("height", "auto").css("flex", "1 0").parent().css("display", "flex")
    $('<a class="boton" style="width: 100px">La más probable</a><br><br>').insertBefore('#endGame').click(apostarLaMejor)
    $('<a id="auto-boton" class="boton" style="width: 100px;"></a><br><br>').prependTo(".cajaHilo").click(changeHiLoAuto)
    $("<div id='chances'></div>").insertAfter(".cajaHilo")
    $("<span style='margin: 1em 0;color:#333;'>Modo Auto: Seguirá apostando hasta que no llegue a la cantidad objetivo " + new Intl.NumberFormat("es-ES").format(settings.hilo_exitOn) + "</span>").appendTo(".cajaHilo")
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
      if (!window.HiLoAuto || flagPlaying) return false
      var isPlaying = $('#cajaJugando').css('display') !== 'none'
      var hasLostOrSold = $('.hilo_content').css('display') === 'none'
      if (!isPlaying || hasLostOrSold) {
        window.comienzaJuegoSinConfirmar()
      } else {
        var bote = parseInt($('#bote').html().split('.').join(''))
        if (bote < parseInt(settings.hilo_exitOn)) {
          apostarLaMejor()
        } else {
          window.playHilo(3) // Terminar juego
        }
      }
    }, 200)

    setListeners()
  }
}
