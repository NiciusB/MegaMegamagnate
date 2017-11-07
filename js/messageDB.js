import Cookies from './lib/js.cookie.min.js'
import AesCtr from './lib/aes-ctr.js'
import sha256 from 'js-sha256'

const serverURL = 'https://balbona.me/MM/msgServer/index.php'

module.exports = {
  shareMessage(messageId, message) {
    const groupSecretKey = Cookies.get('groupSecretKey')
    if (!groupSecretKey) return Promise.resolve(false)

    message = AesCtr.encrypt(message, groupSecretKey, 256)
    $.ajax({
      url: serverURL,
      type: 'POST',
      data: {
        groupPubKey: sha256('^mmm%salt&' + groupSecretKey),
        id: messageId,
        message
      }
    })
  },
  getMessages() {
    const groupSecretKey = Cookies.get('groupSecretKey')
    if (!groupSecretKey) return Promise.resolve(false)

    return $.ajax({
      url: serverURL,
      type: 'GET',
      data: { 
        groupPubKey: sha256('^mmm%salt&' + groupSecretKey)
      }
    }).then(function(data) {
      data.result.forEach(function(element, index) {
        data.result[index] = AesCtr.decrypt(element, groupSecretKey, 256)
      }, this)
      return data
    })
  }
}