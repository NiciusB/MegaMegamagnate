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
					$(this).find('.imageListadoDiv').css('margin-bottom', '1em')
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
	init() {
		// verificarPrecio se llama después de comprar un edificio y parsear el ajax
		var old_verificarPrecio = window.verificarPrecio.clone()
		window.verificarPrecio = id => {
			this.calcEficiencia()
			this.calcEficienciaOptimizar()
			old_verificarPrecio(id)
		}
		this.calcEficiencia()
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
