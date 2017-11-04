import espionajes from './espionajes.js'

module.exports = {
	chatNum: 0,
	time: 0,
	init() {
		// Set up outer box
		let chatBox = document.createElement('div')
		chatBox.id = 'meinChat'
		chatBox.innerHTML = '<div class=\'cajaChat\' style=\'overflow-x: hidden;\'></div>'
		chatBox.style.cssText = 'display: none; position: fixed; bottom: 26px; right: 0px; z-index: 100; background: white; width: 400px; font-family: Arial, sans-serif; font-size: 12px; border: 2px solid black;'
		document.querySelector('body').appendChild(chatBox)
		document.querySelector('.chatMC a').addEventListener('click', e => {
			e.preventDefault()
			if (chatBox.style.display == 'none') {
				chatBox.style.display = ''
				$('#meinChat .cajaChat').scrollTop($('#meinChat .cajaChat')[0].scrollHeight)
			} else {
				chatBox.style.display = 'none'
			} 
		})

		// Set up chat input
		let meinInput = document.createElement('input')
		meinInput.id = 'meinInput'
		meinInput.type = 'text'
		meinInput.placeholder = 'Presiona ENTER para enviar'
		meinInput.style.width = '100%'
		chatBox.appendChild(meinInput)
		meinInput.addEventListener('keypress', e => {
			if (e.which == 13) this.say(e.target.value)
		})

		// Fill chat and set interval
		this.fetchChat()
		setInterval(() => this.fetchChat(), 5000)
	},
	fetchChat() {
		$.ajax({
			type: 'POST',
			url: '/petition/megacorp',
			dataType: 'json',
			data: { 'event': 'getChat', 'myChat': this.chatNum, 'myTime': this.time }
		}).done(function (msg) {
			if (msg['error'] == 'ok') {
				if (msg['mensaje'] !== $('#meinChat .cajaChat').html()) {
					document.querySelector('#meinChat .cajaChat').innerHTML = msg['mensaje']
					$('#meinChat .cajaChat').scrollTop($('#meinChat .cajaChat')[0].scrollHeight)
				}
				this.chatNum = msg['chatNum']
				this.time = msg['time']
			}
			// Init espionajes on msgs
			let sharedMsgs = document.querySelectorAll('.manual-ajax')
			for (let i = 0; i < sharedMsgs.length; i++) {
				sharedMsgs[i].addEventListener('click', e => {
					e.preventDefault()
					$.get(e.target.href, html => {
						$(html).appendTo('body').modal()
						espionajes.init()
					})
				})
			}
		})
	},
	say(what) {
		$.ajax({
			type: 'POST',
			url: '/petition/megacorp',
			dataType: 'json',
			data: { 'event': 'sendChat', 'txt': what }
		}).done(function (msg) {
			if (msg['error'] != 'ok') {
				return false
			} else {
				$('#meinInput').val('')
				$('#meinChat .cajaChat').append(msg['mensaje'])
				$('#meinChat .cajaChat').scrollTop($('#meinChat .cajaChat')[0].scrollHeight)
				this.chatNum = msg['chatNum']
				this.time = msg['time']
			}
		})
	}
}