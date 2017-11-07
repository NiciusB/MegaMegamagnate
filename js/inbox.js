import espionajes from './espionajes.js'
import messageDB from './messageDB.js'

module.exports = {
  init() {
    espionajes.init()
    $(".reporteMision").each((i, el) => {
      const messageId = $(el).parents('.tablaContenido2').attr('id').replace('id_mensaje_', '')
      messageDB.shareMessage(messageId, el.textContent)
    })
  }
}