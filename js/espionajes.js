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
		let resultados = []
		for (let k = 0; k < userData.length; k++) {
			const recompensa = mmUtils.dineroRobadoEdificios(k + 1, userData[k])
			if (recompensa + '' != 'NaN') {
				resultados.push({
					id: k,
					nombre: mmUtils.getEdificioName(k + 1),
					recompensa,
					recuperacion: mmUtils.precioRecuperacion(k + 1, userData[k])
				})
			}
		}

		const best = resultados.reduce((a, b) => a.recompensa > b.recompensa ? a : b)
		let responseData = ''
		resultados.forEach(val => {
			responseData += '<br/>'
			if (best.id === val.id) responseData += '<b><u>' + val.nombre + '</u></b>'
			else responseData += '<u>' + val.nombre + '</u>'
			responseData += ': ganas <b>' + mmUtils.puntuar(val.recompensa) + '</b> &euro; y el coste de recuperación es de <u>' + mmUtils.puntuar(val.recuperacion) + '</u> &euro;.'
		})

		return responseData
	}
}