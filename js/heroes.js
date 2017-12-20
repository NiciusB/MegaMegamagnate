module.exports = {
  init() {
    let costes = [[80, 100, 150], [80, 100, 150], [100, 200, 200]]
    window.useSkill = (idl, skill) => {
      $.ajax({
        type: 'POST',
        url: '/petition/lideres',
        dataType: 'json',
        data: {
          'event': 'useSkill',
          'idl': idl,
          'skill': skill
        }
      }).done(msg => {
        if (msg['url'] != '') {
          let lvl = window.parseInt(document.querySelector('.tablaContenido2').innerHTML.substring(document.querySelector('.tablaContenido2').innerHTML.indexOf('Lvl ') + 4, document.querySelector('.tablaContenido2').innerHTML.indexOf(' - ')))
          let heroType = window.parseInt(document.querySelector('#habilidad1').src.substring(document.querySelector('#habilidad1').src.indexOf('.gif') - 3, document.querySelector('#habilidad1').src.indexOf('.gif') - 2))
          let energy = window.parseInt(document.querySelector('#energia_left').innerHTML)
          let exp = window.parseInt(document.querySelector('#puntos_left').innerHTML)
          let maxEnergy = window.parseInt(document.querySelector('#energia_maxima').innerHTML)
          let maxExp = window.parseInt(document.getElementById('puntos_left').parentNode.innerHTML.substring(document.getElementById('puntos_left').parentNode.innerHTML.indexOf('/') + 8).trim())
          document.querySelector('#barra_energia').style.width = `${((energy - costes[heroType - 1][skill - 1]) / maxEnergy) * 109}px`
          document.querySelector('#barra_experiencia').style.width = `${((exp + costes[heroType - 1][skill - 1]) / maxExp) * 109}px`
          document.querySelector('#energia_left').innerHTML = energy - costes[heroType - 1][skill - 1]
          document.querySelector('#puntos_left').innerHTML = exp + costes[heroType - 1][skill - 1]
          let msg
          if (heroType == 1) {
            if (skill == 1) {
              msg = `+${20 * lvl} fuerza`
            } else if (skill == 2) {
              msg = `+${100 + (5 * lvl)} saboteadores`
            } else {
              msg = '+1 sabotaje'
            }
          } else if (heroType == 2) {
            if (skill == 1) {
              msg = `+${20 * lvl} defensa`
            } else if (skill == 2) {
              msg = `+${500 + (10 * lvl)} guardias`
            } else {
              msg = '+1 seguridad'
            }
          } else {
            if (skill == 1) {
              msg = 'Herida Letal ON'
            } else if (skill == 2) {
              msg = '+Regeneración Rápida'
            } else {
              msg = '+Pierde Mitad de Vida'
            }
          }
          this.msg(msg, costes[heroType - 1][skill - 1])
        } else {
          window.jAlert(msg['mensaje'], 'Lideres')
        }
      })
    }
  },
  msg(bonus, spent) {
    let infoDiv = document.createElement('div')
    infoDiv.id = 'infoDiv'
    infoDiv.style.cssText = `display: none; position: absolute; borde-radius: 3px; top: ${window.innerHeight - 70}px; left: 10px; background: #333; font-size: 11px; font-family: 'Arial'; padding: 10px 15px;`
    infoDiv.innerHTML = `
    <span style='color: lightgreen; font-weight: bold; font-size: 13px;'>${bonus}</span> <br>
    <span style='color: red;'>-${spent} Energía</span><br>
    <span style='color: yellow;'>+${spent} EXP</span>
    `
    document.querySelector('body').appendChild(infoDiv)
    $('#infoDiv').fadeIn()
    window.setTimeout(() => {
      $('#infoDiv').fadeOut()
    }, 3000)
  }
}