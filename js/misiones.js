import messageDB from './messageDB.js'
import Cookies from './lib/js.cookie.min.js'

module.exports = {
  init() {
    $('.tablaContenido2:last').after(`
      <table class="tablaContenido2" cellspacing="0" cellpadding="0" style="margin-top:5px" id="groupMisionesContainer">
      <tr>
        <td class="topTitulo2">Espionajes de Grupo</td>
      </tr>
      <tr>
        <td class="topTitulo2">ID de grupo: <input style="width:50%" type="text" id="groupSecretKeyInput" placeholder="Be careful, nobody should be able to guess it"></input></td>
      </tr>
      </table>
    `)
    $('#groupSecretKeyInput')
      .val(Cookies.get('groupSecretKey'))
      .on('change', () => {
        Cookies.set('groupSecretKey', $('#groupSecretKeyInput').val())
        this.loadMessages()
      })
    this.loadMessages()
  },
  loadMessages() {
    $('.misionLoadedElm').remove()
    messageDB.getMessages().then(data => {
      if (data && data.result.length) {
        data.result.forEach(function(element) {
          $('#groupMisionesContainer').append('<tr class="misionLoadedElm" style="text-align:left"><td>' + $("<div>").text(element).html() + '</td></tr>')
        }, this)
      } else {
        $('#groupMisionesContainer').append('<tr class="misionLoadedElm" style="text-align:left"><td>Aún no hay nada por aquí!</td></tr>')
      }
      return data
    })
  }
}