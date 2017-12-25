import mmUtils from './lib/mm.utils.js'

module.exports = {
	init() {
		let espionajes = document.querySelectorAll('.reporteMision')
		for (let i = 0; i < espionajes.length; i++) {
			let profitData = document.createElement('div')
			let buildings = this.getBuildings(espionajes[i])
			profitData.innerHTML = `
			<span style='cursor: pointer; color: blue; text-decoration: underline;' class='showInsights'>+ Info</span>
			<div class='insights' style='display:none;'>${this.calcProfit(buildings)}</div>
			`
			espionajes[i].parentNode.insertBefore(profitData, espionajes[i].parentNode.childNodes[2])
			espionajes[i].parentNode.removeChild(espionajes[i].parentNode.childNodes[3])
			if (i == espionajes.length - 1) {
				let insightButton = document.querySelectorAll('.showInsights')
				for (let j = 0; j < insightButton.length; j++) {
					insightButton[j].addEventListener('click', () => {
						if (insightButton[j].parentNode.querySelector('.insights').style.display == 'none') {
							insightButton[j].innerHTML = '- Info'
							insightButton[j].parentNode.querySelector('.insights').style.display = 'block'
						} else {
							insightButton[j].innerHTML = '+ Info'
							insightButton[j].parentNode.querySelector('.insights').style.display = 'none'
						}
					})
				}
			}
		}
	},
	getBuildings(espionaje) {
		let espionajeData = espionaje.querySelector('.boton').parentNode.innerHTML.split('</div>')[1].split('<br>')
		espionajeData = espionajeData.map(value => {
			let finalValue = value.split(' ')
			return parseInt(finalValue[finalValue.length - 1])
		})
		return espionajeData
	},
	calcProfit(userData) {
		const edificios = new Array('Estancos', 'Librerías', 'Tiendas de Ropa', 'Mercados', 'Joyerías', 'Discotecas', 'Bancos', 'Gasolineras', 'Centros Comerciales', 'Industrias')
		const destruccion = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero de destruccion de edificios
		let responseData = ''
		let scostes = []
		let capturas = []
		let cantidades = []

		let dest
		for (let k = 0; k < userData.length; k++) {
			let num = userData[k]
			cantidades[k] = num
			let quedan = cantidades[k] - destruccion[k]
			if (quedan < 0) { quedan = 0; dest = cantidades[k] } else { dest = destruccion[k] }

			scostes[k] = mmUtils.precioEdificio(k + 1, cantidades[k])
			capturas[k] = mmUtils.dineroRobado(k + 1, cantidades[k])

			if (capturas[k] + '' != 'NaN') {
				responseData += '<br />Si destruyes ' + dest + ' <u>' + edificios[k] + '</u> ganas <b>' + mmUtils.puntuar(capturas[k]) + '</b> &euro; y quedarán <i>' + quedan + '</i> edificios. El precio individual es de <u>' + mmUtils.puntuar(scostes[k]) + '</u> &euro;.'
			}

		}


		//mas caro
		let zr = 0
		let zn = 0
		for (let m in scostes) {
			if (scostes[m] >= zr) {
				zr = scostes[m]
				zn = m
			}
		}


		//mas rentable
		let mr = 0
		let mn = 0

		for (let m in capturas) {
			if (capturas[m] >= mr) {
				mr = capturas[m]
				mn = m
			}
		}



		responseData += '<br /><br />El edificio más caro es: <u>' + edificios[zn] + '</u> con un precio de <u>' + mmUtils.puntuar(scostes[zn]) + '</u> &euro;.'
		responseData += '<br /><b>El edificio más rentable de atacar es: <u>' + edificios[mn] + '</u> ganando <u>' + mmUtils.puntuar(capturas[mn]) + '</u> &euro;.</b>'
		return responseData
	}
}