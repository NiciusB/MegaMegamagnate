const edificios = new Array('Estancos', 'Librerías', 'Tiendas de Ropa', 'Mercados', 'Joyerías', 'Discotecas', 'Bancos', 'Gasolineras', 'Centros Comerciales', 'Industrias')
const destruccion = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero de destruccion de edificios
const bcostes = new Array(125, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000) //coste de edificio a nivel 0
const acostes = new Array(15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680) //aumentos basicos por grupo de edificios
const ccostes = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero edificios para aumento
const e_aumentoPorOptimizar = [15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680] //aumento por optimizar

module.exports = {
    edificiosDestruidos(id) {
        id--
        return destruccion[id]
    },
    dineroRobadoEdificios(id, q) {
        id--
        let ttotal = bcostes[id]
        ttotal -= 2 * acostes[id]
        q -= destruccion[id]
        for (let i = 0; i <= q + 1; i++) {
            let taumento = acostes[id] * Math.ceil((i / ccostes[id]) + 0.0000000000000001)
            ttotal += taumento
        }
        if (q >= destruccion[id]) q = destruccion[id]
        ttotal = Math.round((ttotal * q) / 2)
        return ttotal
    },
    precioEdificio(id, q) {
        id--
        let ttotal = bcostes[id]
        ttotal -= 2 * acostes[id]
        for (let i = 0; i <= q + 1; i++) {
            let taumento = acostes[id] * Math.ceil((i / ccostes[id]) + 0.0000000000000001)
            ttotal += taumento
        }
        return ttotal
    },
    infoOptimizarNegocio(arrayCantidadEdificios, precioOptimizar) {
        precioOptimizar = parseInt(precioOptimizar)
        var suma = 0
        for (var k = 0; k < edificios.length; k++) {
            suma += e_aumentoPorOptimizar[k] * arrayCantidadEdificios[k]
        }
        return {
            payback: this.puntuar(precioOptimizar / suma),
            ingresosGanados: this.puntuar(suma)
        }
    },
    puntuar(nStr) {
        nStr = Math.round(parseFloat(nStr) * 10) / 10 + ''
        let x1 = nStr

        let rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2')
        }
        return x1
    },
    redoTooltips() {
        // https://www.dcode.fr/javascript-unobfuscator
        // http://jsbeautifier.org/
        $('.toolTip').hover(function () {
            var dataAttr = $(this).attr('data')
            $(this).data('tipText', dataAttr).removeAttr('data')
            $('<div class="masterTooltip">').text(dataAttr).appendTo('body').fadeIn('fast')
        }, function () {
            $(this).attr('data', $(this).data('tipText'))
            $('.masterTooltip').remove()
        }).mousemove(function (event) {
            $('.masterTooltip').css({
                top: event.pageY + 10,
                left: event.pageX + 0
            })
        })
    }
}