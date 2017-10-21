function setListeners() {
  let hilo = document.querySelector('.hilo')
  let cardSize = 82
  let firingEvts = document.querySelectorAll("#jugadas, #disponible")
  for (let i = 0; i < firingEvts.length; i++) {
    firingEvts[i].addEventListener('DOMSubtreeModified', e => {
      let cardPos = parseInt(hilo.style.backgroundPosition.split("px")[0])
      let currentCard = Math.abs(Math.floor(cardPos / cardSize))
      currentCard > 12 ? currentCard = 0 : null
      let chances = { hi: (12 - currentCard) / 12, lo: (currentCard) / 12 }
      let style = { hi: 'color: #222; font-weight: bold;', lo: 'color: #222; font-weight: bold;' }
      if (chances.hi > .5) {
        style.hi = 'color: limegreen; font-weight: bold;'
        style.lo = 'color: orangered; font-weight: normal;'
      } else if (chances.lo > .5) {
        style.lo = 'color: limegreen; font-weight: bold;'
        style.hi = 'color: orangered; font-weight: normal;'
      }
      Object.keys(chances).map(function (key, index) {
        chances[key] = Math.floor(chances[key] * 10000) / 100
        chances[key] = chances[key] < 10 ? "0" + chances[key] : chances[key]
      })
      let newDiv = `
        <div id="chances" style="margin:0 5px;flex: 1 1;">
          <div>Hi chances: <span style="${style.hi}">${chances.hi}%</span></div>
          <div>Lo chances: <span style="${style.lo}">${chances.lo}%</span></div>
        </div>
      `
      $("#chances").html(newDiv)
    })
  }
}
function init() {
  $(".cajaHilo").css("flex", "1 0").parent().css("display", "flex")
  $("<div id='chances'></div>").insertAfter(".cajaHilo")
  $('#jugadaspendientes').parents('.tablaContenido2').last().after('<div id="HiLoHelper"></div>');
  $('#HiLoHelper').html('<a href="https://wizardofodds.com/games/blackjack/card-counting/high-low/" target="_blank"><img style="width:100%;" src="https://i.imgur.com/4FCUpB1.png"/></a>');
  setListeners()
}

module.exports = { init, setListeners }
