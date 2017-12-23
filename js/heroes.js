module.exports = {
  init() {
    let costes = [[80, 100, 150], [80, 100, 100], [100, 200, 200]]
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
          let leaderID = window.parseInt(document.location.href.split('/')[document.location.href.split('/').length - 1])
          let lvl = window.parseInt(document.querySelector('.tablaContenido2:not(.tablaok)').innerHTML.match(/(Lvl)+\s+[0-9]{1,4}/g)[0].replace('Lvl ', ''))
          let heroType = window.parseInt(document.querySelector('#habilidad1').src.substring(document.querySelector('#habilidad1').src.indexOf('.gif') - 3, document.querySelector('#habilidad1').src.indexOf('.gif') - 2))
          let energy = window.parseInt(document.querySelector('#energia_left').innerHTML)
          let exp = window.parseInt(document.querySelector('#puntos_left').innerHTML)
          let maxEnergy = window.parseInt(document.querySelector('#energia_maxima').innerHTML)
          let maxExp = window.parseInt(document.querySelector('#puntos_left').parentNode.innerHTML.substring(document.querySelector('#puntos_left').parentNode.innerHTML.indexOf('/') + 8).trim())
          let newExp = exp + costes[heroType - 1][skill - 1]
          if (newExp >  maxExp) {
            this.msg(`Tu héroe ha subido al nivel ${lvl + 1}!`)
            newExp -= maxExp
            maxExp += 1000
            document.querySelector('#puntos_restantes').innerHTML = window.parseInt(document.querySelector('#puntos_restantes').innerHTML) + 10
            document.querySelector('#puntos_left').parentNode.innerHTML = document.querySelector('#puntos_left').parentNode.innerHTML.replace(`/ ${maxExp}`, `/ ${maxExp + 1000}`)
            for (let i = 1; i < document.querySelectorAll('[id^=sn]').length; i++) {
              document.querySelector(`#sn${i}`).className = ''
              document.querySelector(`#sn${i}`).addEventListener('click', () => {
                if (window.parseInt(document.querySelector('#puntos_restantes').innerHTML) > 0) {
                  window.subir_puntos(i, leaderID)
                  document.querySelector('#puntos_restantes').innerHTML = window.parseInt(document.querySelector('#puntos_restantes').innerHTML) - 1
                } else {
                  for (let i = 1; i <= document.querySelectorAll('[id^=sn]').length; i++) {
                    document.querySelector(`#sn${i}`).className = 'transparente'
                    document.querySelector(`#sn${i}`).addEventListener('click', e => e.preventDefault())
                  }
                }
              })
            }
          }
          document.querySelector('#barra_energia').style.width = `${((energy - costes[heroType - 1][skill - 1]) / maxEnergy) * 109}px`
          document.querySelector('#barra_experiencia').style.width = `${(newExp / maxExp) * 109}px`
          document.querySelector('#energia_left').innerHTML = energy - costes[heroType - 1][skill - 1]
          document.querySelector('#puntos_left').innerHTML = newExp
          let divHeader
          if (heroType == 1) {
            if (skill == 1) {
              divHeader = `+${20 * lvl} fuerza`
            } else if (skill == 2) {
              divHeader = `+${100 + (5 * lvl)} saboteadores`
            } else {
              divHeader = '+1 sabotaje'
            }
          } else if (heroType == 2) {
            if (skill == 1) {
              divHeader = `+${20 * lvl} defensa`
            } else if (skill == 2) {
              divHeader = `+${500 + (10 * lvl)} guardias`
            } else {
              divHeader = '+1 seguridad'
            }
          } else {
            if (skill == 1) {
              divHeader = 'Herida Letal ON'
            } else if (skill == 2) {
              divHeader = '+Regeneración Rápida'
            } else {
              divHeader = '+Pierde Mitad de Vida'
            }
          }
          this.msg(divHeader, costes[heroType - 1][skill - 1])
        } else {
          window.jAlert(msg['mensaje'], 'Lideres')
        }
      })
    }
  },
  msg(bonus, spent) {
    let numMsgs = document.querySelectorAll('.infoDiv').length + 1
    let infoDiv = document.createElement('div')
    infoDiv.className = 'infoDiv'
    infoDiv.style.cssText = `display: none; position: fixed; border: 1px solid rgba(255, 255, 255, .1); border-radius: 3px; top: ${window.innerHeight - (70 * numMsgs)}px; left: 10px; background: #333; font-size: 11px; font-family: 'Arial'; padding: 10px 15px;`
    infoDiv.innerHTML = `
      <span style='color: lightgreen; font-weight: bold; font-size: 13px;'>${bonus}</span>
    `
    if (spent) infoDiv.innerHTML += `
      <br><span style='color: red;'>-${spent} Energía</span><br>
      <span style='color: yellow;'>+${spent} EXP</span>
    `
    document.querySelector('body').appendChild(infoDiv)
    $('.infoDiv').fadeIn()
    window.setTimeout(() => {
      $('.infoDiv').fadeOut(1000, () => {
        infoDiv.remove()
      })
    }, 3000)
  }
}