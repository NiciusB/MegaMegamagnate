import mmUtils from './lib/mm.utils.js'

module.exports = {
	calcNewInfo() {
		var arrayCantidadEdificios = []
		$('.tablaContenido2 tr').each(function () {
			if ($(this).attr('id')) {
				if (!$(this).find('.mainContent').length) { // First time
					const generatedFirstColumn = $('<div></div>').css('text-align', 'center').css('padding', '0 0.5em')
					generatedFirstColumn.append($(this).find('.imageListadoDiv').css('margin-bottom', '0').css('margin-right', '0').css('background-repeat', 'no-repeat').css('float', 'none').prop('outerHTML'))
					generatedFirstColumn.append($(this).find('p a.boton').css('margin-top', '0.75em').css('float', 'none'))
					$(this).find('td .imageListadoDiv').remove()
					$(this).find('td p a.boton').parent().remove()
					const generatedMainContent = $('<div class="mainContent"></div>').html($(this).find('td').html())
					$(this).find('td').empty().css('display', 'flex').css('flex-direction', 'row').append(generatedFirstColumn).append(generatedMainContent).appendTo(this)
					$(this).find('br').last()
						.before('<br><p style="display:inline" title="Dinero que recibe el atacante por atacar este edificio">- Dinero para atacante: <span class="dinero_para_atacante"></span></p>')
						.before('<br><p style="display:inline" title="Días hasta recuperar inversión">- Pay back: <span class="payback"></span></p>')
				}

				const ed_id = parseInt($(this).attr('id').replace('cachoEdificio', ''))
				const precio = parseInt($('#ped' + ed_id).html().split('.').join(''))
				const cantidad = parseInt($('#ned' + ed_id).html().split('.').join(''))
				arrayCantidadEdificios.push(cantidad)
				const beneficiosdia = parseInt($(this).text().split(': +')[2].split('\n')[0].split('.').join(''))
				const dinero_para_atacante = mmUtils.dineroRobadoEdificios(ed_id, cantidad)

				$(this).find('.payback').html(mmUtils.puntuar(precio / beneficiosdia) + ' días')
				$(this).find('.dinero_para_atacante').html(mmUtils.puntuar(dinero_para_atacante))
			}
		})
		mmUtils.redoTooltips()
		const precioOptimizar = $('#precioOptimizarNegocio').val().split('.').join('')
		if (precioOptimizar) $('#paybackOptimizarNegocio').html(mmUtils.paybackOptimizarNegocio(arrayCantidadEdificios, precioOptimizar) + ' días')
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
					<p style="display:inline" title="Días hasta recuperar inversión">- Pay back: <span id="paybackOptimizarNegocio">?</span></p>
				</td>
			</tr>
			</table>
		`)
		$('#precioOptimizarNegocio').on('change, input', () => {
			this.calcNewInfo()
		})
		this.calcNewInfo()
		$.ajax({
				type: "GET",
				url: "/research"
		}).done(msg => {
			const price = parseInt($(msg).find('#pskill5').html().split('.').join(''))
			$('#precioOptimizarNegocio').val(price)
			this.calcNewInfo()
		})
	}
}
