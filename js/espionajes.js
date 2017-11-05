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
		let responseData = ''
		let edificios = new Array('Estancos','Librerías','Tiendas de Ropa','Mercados','Joyerías','Discotecas','Bancos','Gasolineras','Centros Comerciales','Industrias')
		let destruccion = new Array(10,9,8,7,6,5,4,3,2,1) //numero de destruccion de edificios
		let bcostes = new Array(125,250,500,1000,2000,4000,8000,16000,32000,64000) //coste de edificio a nivel 0
		let acostes = new Array(15,30,60,120,240,480,960,1920,3840,7680) //aumentos basicos por grupo de edificios
		let ccostes = new Array(10,9,8,7,6,5,4,3,2,1) //numero edificios para aumento
		let scostes = []
		let capturas = []
		let cantidades = []

		//calculo beneficio edificio
		function ben(id) {
			let ttotal = bcostes[id]
			ttotal -=  2 * acostes[id]
			let q = cantidades[id]
			for (let i = 0; i <= q + 1; i++) {
				let taumento = acostes[id] * Math.ceil((i / ccostes[id]) + 0.0000000000000001)
				ttotal += taumento
			}
			return ttotal
		}

		function bent(id) {
			let ttotal = bcostes[id]
			ttotal -=  2 * acostes[id]
			let q = cantidades[id]
			for (let i = 0; i <= q + 1; i++) {
				let taumento = acostes[id] * Math.ceil((i / ccostes[id]) + 0.0000000000000001)
				ttotal += taumento
			}
			if (q >= destruccion[id]) q = destruccion[id]
			ttotal = Math.round((ttotal * q)/2)
			return ttotal
		}


		//puntuar miles
		function puntua(nStr){
			nStr += ''
			let x1 = nStr

			let rgx = /(\d+)(\d{3})/
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + '.' + '$2')
			}
			return x1
		}

		let dest
		for(let k = 0; k < userData.length; k++){
			let num = userData[k]
			cantidades[k] = num
			let quedan = cantidades[k] - destruccion[k]
			if(quedan < 0){quedan = 0; dest = cantidades[k] } else{dest = destruccion[k] }


			scostes[k] = ben(k)
			capturas[k] = bent(k)

			if(capturas[k]+'' != 'NaN'){
				responseData += '<br />Si destruyes ' + dest + ' <u>' + edificios[k] + '</u> ganas <b>' + puntua(capturas[k]) + '</b> &euro; y quedarán <i>' + quedan + '</i> edificios. El precio individual es de <u>' + puntua(scostes[k]) + '</u> &euro;.'
			}

		}


		//mas caro
		let zr = 0
		let zn = 0
		for (let m in scostes){
			if (scostes[m] >= zr){
				zr = scostes[m]
				zn = m
			}
		}


		//mas rentable
		let mr = 0
		let mn = 0

		for (let m in capturas){
			if (capturas[m] >= mr){
				mr = capturas[m]
				mn = m
			}
		}



		responseData += '<br /><br />El edificio más caro es: <u>'+edificios[zn]+'</u> con un precio de <u>'+puntua(scostes[zn])+'</u> &euro;.'
		responseData += '<br /><b>El edificio más rentable de atacar es: <u>'+edificios[mn]+'</u> ganando <u>'+puntua(capturas[mn])+'</u> &euro;.</b>'
		return responseData
	}
}