module.exports = {
  init() {
    this.costes = [[80, 100, 150], [80, 100, 100], [100, 200, 200]]
    this.leaderID = window.parseInt(document.querySelectorAll('[onclick*=infoh]')[0].getAttribute('onclick').substring(document.querySelectorAll('[onclick*=infoh]')[0].getAttribute('onclick').indexOf('useSkill(') + 9, document.querySelectorAll('[onclick*=infoh]')[0].getAttribute('onclick').indexOf(');')).split(',')[0])
    this.lvl = window.parseInt(document.querySelector('.tablaContenido2:not(.tablaok)').innerHTML.match(/(Lvl)+\s+[0-9]{1,4}/g)[0].replace('Lvl ', ''))
    this.heroType = window.parseInt(document.querySelector('#habilidad1').src.substring(document.querySelector('#habilidad1').src.indexOf('.gif') - 3, document.querySelector('#habilidad1').src.indexOf('.gif') - 2))
    this.energy = window.parseInt(document.querySelector('#energia_left').innerHTML)
    this.exp = window.parseInt(document.querySelector('#puntos_left').innerHTML)
    this.maxEnergy = window.parseInt(document.querySelector('#energia_maxima').innerHTML)
    this.maxExp = window.parseInt(document.querySelector('#puntos_left').parentNode.innerHTML.substring(document.querySelector('#puntos_left').parentNode.innerHTML.indexOf('/') + 8).trim())
    let observer = new MutationObserver(() => {
      let skill = window.parseInt(document.querySelector('[onclick^=useSkill]').getAttribute('onclick').split(',')[1].replace(');', ''))
      if (!document.querySelector('#useAll') && skill == 2) {
        let boton = document.createElement('a')
        boton.className = 'boton'
        boton.id = 'useAll'
        boton.style.display = 'block'
        boton.style.textAlign = 'center'
        boton.innerText = 'Activar todo'
        boton.addEventListener('click', () => {
          this.useAll()
        })
        document.querySelector('#infoh2').appendChild(boton)
      }
    })
    observer.observe(document.querySelector('#infoh2'), { subtree: true, childList: true })
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
          this.doItDad(skill)
          let divHeader
          if (this.heroType == 1) {
            if (skill == 1) {
              divHeader = `+${20 * this.lvl} fuerza`
            } else if (skill == 2) {
              divHeader = `+${100 + (5 * this.lvl)} saboteadores`
            } else {
              divHeader = '+1 sabotaje'
            }
          } else if (this.heroType == 2) {
            if (skill == 1) {
              divHeader = `+${20 * this.lvl} defensa`
            } else if (skill == 2) {
              divHeader = `+${500 + (10 * this.lvl)} guardias`
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
          this.msg(divHeader, this.costes[this.heroType - 1][skill - 1])
        } else {
          window.jAlert(msg['mensaje'], 'Lideres')
        }
      })
    }
  },
  useAll() {
    let usages = window.parseInt(window.parseInt(document.querySelector('#energia_left').innerHTML) / 100)
    if (usages < 1) return false
    let promises = []
    for (let i = 0; i < usages; i++) {
      promises.push(new Promise(resolve => {
        $.ajax({
          type: 'POST',
          url: '/petition/lideres',
          dataType: 'json',
          data: {
            'event': 'useSkill',
            'idl': this.leaderID,
            'skill': 2
          }
        }).done(() => {
          this.doItDad(2)
          resolve()
        })
      }))
    }
    Promise.all(promises).then(() => {
      if (this.heroType == 2) {
        this.msg(`+${usages * (500 + (10 * this.lvl))} guardias`, usages * this.costes[this.heroType - 1][1])
      } else {
        this.msg(`+${usages * (100 + (5 * this.lvl))} saboteadores`, usages * this.costes[this.heroType - 1][1])
      }
    })
  },
  doItDad(skill) { // https://www.youtube.com/watch?v=_J9b_xrDlTc
    this.energy -= this.costes[this.heroType - 1][skill - 1]
    this.exp += this.costes[this.heroType - 1][skill - 1]
    if (this.exp >= this.maxExp) { // Lvl up
      this.lvl++
      this.exp -= this.maxExp
      this.maxExp += 1000
      this.msg(`Tu héroe ha subido al nivel ${this.lvl}!`)
      document.querySelector('#puntos_restantes').innerHTML = window.parseInt(document.querySelector('#puntos_restantes').innerHTML) + 10
      document.querySelector('#puntos_left').parentNode.innerHTML = document.querySelector('#puntos_left').parentNode.innerHTML.replace(`/ ${this.maxExp}`, `/ ${this.maxExp + 1000}`)
      for (let i = 1; i <= document.querySelectorAll('[id^=sn]').length; i++) {
        document.querySelector(`#sn${i}`).className = ''
        document.querySelector(`#sn${i}`).addEventListener('click', () => {
          if (window.parseInt(document.querySelector('#puntos_restantes').innerHTML) > 0) {
            window.subir_puntos(i, this.leaderID)
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
    document.querySelector('#barra_energia').style.width = `${((this.energy) / this.maxEnergy) * 109}px`
    document.querySelector('#barra_experiencia').style.width = `${(this.exp / this.maxExp) * 109}px`
    document.querySelector('#energia_left').innerHTML = this.energy
    document.querySelector('#puntos_left').innerHTML = this.exp
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