var buildings = {
  calcEficiencia() {
    $('.tablaContenido2 tr td').each(function (elm) {
      var content = $(this).text();
      var precio = /- Precio: (.+)\n/gm.exec(content);
      var beneficiosdia = /- Bºs al dia: (.+)\n/gm.exec(content);
      if (precio && beneficiosdia) {
        precio = parseInt(precio[1].split('.').join(''));
        beneficiosdia = parseInt(beneficiosdia[1].split('.').join(''));
        var eficiencia = beneficiosdia / precio;
        if (!$(this).find('.eficiencia').length) {
          $(this).find('.imageListadoDiv').css('margin-bottom', '1em');
          $(this).find('br').last().before('<br><p style="display:inline" title="Porcentaje del coste que se recupera al día">- Eficiencia: <span class="eficiencia"></span></p>');
        }
        $(this).find('.eficiencia').html((eficiencia * 100).toFixed(2) + '%');
      }
    });
  },
  calcEficienciaOptimizar() {
    var arrayEdificios = [];
    for (var k = 0; k < e_name.length; k++) {
      arrayEdificios[k] = parseInt($('#ned' + (k + 1)).html());
    }
    $('#eficienciaOptimizarNegocio').html(rentabilidadOptimizarNegocio(arrayEdificios, $('#precioOptimizarNegocio').val().split('.').join('')) + '%');
  },
  init() {
    // verificarPrecio se llama después de comprar un edificio y parsear el ajax
    var old_verificarPrecio = verificarPrecio.clone();
    verificarPrecio = function (id) {
      buildings.calcEficiencia();
      buildings.calcEficienciaOptimizar();
      old_verificarPrecio(id);
    };
    buildings.calcEficiencia();
    $('.tablaContenido2').last().after(`
    <table  class="tablaContenido2" cellspacing="0" cellpadding="0" style="margin-top:15px">
    <tr>
      <td class="topTitulo2"> Eficiencia de Optimizar Negocio </td>
    </tr>
    <tr>
      <td>
        Precio de Optimizar Negocio: <input type="number" id="precioOptimizarNegocio" />
      </td>
    </tr>
    <tr>
      <td>
        <p style="display:inline" title="Porcentaje del coste que se recupera al día">- Eficiencia: <span id="eficienciaOptimizarNegocio">0%</span></p>
      </td>
    </tr>
    </table>
  `);
    $('#precioOptimizarNegocio').on('change, input', () => {
      buildings.calcEficienciaOptimizar();
    });
  }
};