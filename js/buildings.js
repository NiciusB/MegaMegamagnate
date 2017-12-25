module.exports = {
	calcEficiencia() {
		$('.tablaContenido2 tr td').each(function () {
			var content = $(this).text()
			var precio = /- Precio: (.+)\n/gm.exec(content)
			var beneficiosdia = /- Bºs al dia: (.+)\n/gm.exec(content)
			if (precio && beneficiosdia) {
				precio = parseInt(precio[1].split('.').join(''))
				beneficiosdia = parseInt(beneficiosdia[1].split('.').join(''))
				var eficiencia = beneficiosdia / precio
				if (!$(this).find('.eficiencia').length) {
					$(this).find('.imageListadoDiv').css('margin-bottom', '4em')
					$(this).find('br').last().before('<br><p style="display:inline" title="Porcentaje del coste que se recupera al día">- Eficiencia: <span class="eficiencia"></span></p>')
				}
				$(this).find('.eficiencia').html((eficiencia * 100).toFixed(2) + '%')
			}
		})
	},
	calcEficienciaOptimizar() {
		var e_name = ['Estanco', 'Librería', 'Tienda de Ropa', 'Mercado', 'Joyería', 'Discoteca', 'Banco', 'Gasolinera', 'Centro Comercial', 'Industria']
		var e_aumentoPorOptimizar = [15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680] //aumento por optimizar
    
		var rentabilidadOptimizarNegocio = function (arrayEdificios, precioOptimizar) {
			var suma = 0
			for (k = 0; k < e_name.length; k++) {
				suma += e_aumentoPorOptimizar[k] * arrayEdificios[k]
			}
			return Math.floor(suma / parseInt(precioOptimizar) * 10000) / 100
		}
		var arrayEdificios = []
		for (var k = 0; k < e_name.length; k++) {
			arrayEdificios[k] = parseInt($('#ned' + (k + 1)).html())
		}
		$('#eficienciaOptimizarNegocio').html(rentabilidadOptimizarNegocio(arrayEdificios, $('#precioOptimizarNegocio').val().split('.').join('')) + '%')
	},
	calcAttackProfit() {
		let responseData = ''
		let edificios = new Array('Estancos','Librerías','Tiendas de Ropa','Mercados','Joyerías','Discotecas','Bancos','Gasolineras','Centros Comerciales','Industrias')
		let destruccion = new Array(10,9,8,7,6,5,4,3,2,1) //numero de destruccion de edificios
		let bcostes = new Array(125,250,500,1000,2000,4000,8000,16000,32000,64000) //coste de edificio a nivel 0
		let acostes = new Array(15,30,60,120,240,480,960,1920,3840,7680) //aumentos basicos por grupo de edificios
		let ccostes = new Array(10,9,8,7,6,5,4,3,2,1) //numero edificios para aumento
		let scostes = []
		let capturas = []
		let cantidades = []

		function bent(id, q) {
			let ttotal = bcostes[id]
			ttotal -=  2 * acostes[id]
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
		$('.tablaContenido2 tr').each(function () {
			if ($(this).attr('id')) {
				var ed_id = parseInt($(this).attr('id').replace('cachoEdificio', ''))
				var cantidad = parseInt($('#ned' + ed_id).html())
				var dinero_para_atacante = bent(ed_id - 1, cantidad)
				if (!$(this).find('.dinero_para_atacante').length) {
					$(this).find('br').last().before('<br><p style="display:inline" title="Dinero que recibe el atacante por atacar este edificio">- Dinero para el atacante: <span class="dinero_para_atacante"></span></p>')
				}
				$(this).find('.dinero_para_atacante').html(puntua(dinero_para_atacante))
			}
		})
	},
	init() {
		// verificarPrecio se llama después de comprar un edificio y parsear el ajax
		var old_verificarPrecio = window.verificarPrecio.clone()
		window.verificarPrecio = id => {
			this.calcEficiencia()
			this.calcAttackProfit()
			this.calcEficienciaOptimizar()
			old_verificarPrecio(id)
		}
		this.calcEficiencia()
		this.calcAttackProfit()
		$('.tablaContenido2').last().after(`
    <table  class="tablaContenido2" cellspacing="0" cellpadding="0" style="margin-top:15px">
    <tr>
      <td class="topTitulo2"> Eficiencia de Optimizar Negocio </td>
    </tr>
    <tr>
      <td>
        Precio de Optimizar Negocio: <input type="text" id="precioOptimizarNegocio" />
      </td>
    </tr>
    <tr>
      <td>
        <p style="display:inline" title="Porcentaje del coste que se recupera al día">- Eficiencia: <span id="eficienciaOptimizarNegocio">0%</span></p>
      </td>
    </tr>
    </table>
  `)
		$('#precioOptimizarNegocio').on('change, input', () => {
			this.calcEficienciaOptimizar()
		})
	}
}
