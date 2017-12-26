import mmUtils from './lib/mm.utils.js'

module.exports = {
	calcNewInfo() {
		var arrayCantidadEdificios = []
		$('.tablaContenido2 tr').each(function () {
			if ($(this).attr('id')) {
				if (!$(this).find('.eficiencia_precio').length) { // First time
					$(this).find('.imageListadoDiv').css('margin-bottom', '5em')
					$(this).find('br').last()
					.before('<br><p style="display:inline" title="Dinero que recibe el atacante por atacar este edificio">- Dinero para atacante: <span class="dinero_para_atacante"></span></p>')
					.before('<br><p style="display:inline" title="Coste de recuperarte de un ataque (Volver a comprar los edificios destruidos)">- Coste de recuperación: <span class="coste_recuperacion_ataque"></span></p>')
					.before('<br><p style="display:inline" title="Beneficios diarios / Precio">- Eficiencia sobre precio: <span class="eficiencia_precio"></span></p>')
					.before('<br><p style="display:inline" title="Beneficios diarios * Edificios destruidos al atacar (1, 2, 3, etc) / Coste de recuperación">- Eficiencia sobre recuperación: <span class="eficiencia_recuperacion"></span></p>')
					//.before('<br><p style="display:inline" title="Eficiencia 1 * Eficiencia 2 * 100">- Eficiencia total: <span class="eficiencia_total"></span></p>')
				}

				const ed_id = parseInt($(this).attr('id').replace('cachoEdificio', ''))
				const precio = parseInt($('#ped' + ed_id).html().split('.').join(''))
				const cantidad = parseInt($('#ned' + ed_id).html().split('.').join(''))
				arrayCantidadEdificios.push(cantidad)
				const beneficiosdia = parseInt($(this).text().split(': +')[2].split('\n')[0].split('.').join(''))
				const dinero_para_atacante = mmUtils.dineroRobadoEdificios(ed_id, cantidad)
				var coste_recuperacion_ataque = 0
				for(let k = 0; k < mmUtils.edificiosDestruidos(ed_id); k++) coste_recuperacion_ataque += mmUtils.precioEdificio(ed_id, cantidad - 1 - k)
				const eficiencia_precio = beneficiosdia / precio
				const eficiencia_recuperacion = beneficiosdia * mmUtils.edificiosDestruidos(ed_id) / coste_recuperacion_ataque
				//const eficiencia_total = eficiencia_atacante * eficiencia_precio * 100

				$(this).find('.eficiencia_precio').html((eficiencia_precio * 100).toFixed(2) + '%')
				$(this).find('.eficiencia_recuperacion').html((eficiencia_recuperacion * 100).toFixed(2) + '%')
				//$(this).find('.eficiencia_total').html((eficiencia_total * 100).toFixed(2) + '%')
				$(this).find('.coste_recuperacion_ataque').html(mmUtils.puntuar(coste_recuperacion_ataque))
				$(this).find('.dinero_para_atacante').html(mmUtils.puntuar(dinero_para_atacante))
			}
		})
		const precioOptimizar = $('#precioOptimizarNegocio').val().split('.').join('')
		if (precioOptimizar) $('#eficienciaOptimizarNegocio').html(mmUtils.rentabilidadOptimizarNegocio(arrayCantidadEdificios, precioOptimizar) + '%')
	},
	init() {
		// verificarPrecio se llama después de comprar un edificio y parsear el ajax
		var old_verificarPrecio = window.verificarPrecio.clone()
		window.verificarPrecio = id => {
			this.calcNewInfo()
			old_verificarPrecio(id)
		}
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
			this.calcNewInfo()
		})
		this.calcNewInfo()
	}
}
