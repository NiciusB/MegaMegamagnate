const edificios = new Array('Estancos', 'Librerías', 'Tiendas de Ropa', 'Mercados', 'Joyerías', 'Discotecas', 'Bancos', 'Gasolineras', 'Centros Comerciales', 'Industrias')
const destruccion = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero de destruccion de edificios
const bcostes = new Array(125, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000) //coste de edificio a nivel 0
const acostes = new Array(15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680) //aumentos basicos por grupo de edificios
const ccostes = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero edificios para aumento
const e_aumentoPorOptimizar = [15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680] //aumento por optimizar

module.exports = {
    edificiosDestruidos(q) {
        q--
        return destruccion[q]
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
    paybackOptimizarNegocio(arrayCantidadEdificios, precioOptimizar) {
        var suma = 0
        for (var k = 0; k < edificios.length; k++) {
            suma += e_aumentoPorOptimizar[k] * arrayCantidadEdificios[k]
        }
        return this.puntuar(parseInt(precioOptimizar) / suma)
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
        // xd
        var _0xa2d4=["\x70\x61\x67\x65\x58","\x70\x61\x67\x65\x59","\x63\x73\x73","\x2E\x6D\x61\x73\x74\x65\x72\x54\x6F\x6F\x6C\x74\x69\x70","\x6D\x6F\x75\x73\x65\x6D\x6F\x76\x65","\x64\x61\x74\x61","\x61\x74\x74\x72","\x72\x65\x6D\x6F\x76\x65\x41\x74\x74\x72","\x74\x69\x70\x54\x65\x78\x74","\x66\x61\x73\x74","\x66\x61\x64\x65\x49\x6E","\x62\x6F\x64\x79","\x61\x70\x70\x65\x6E\x64\x54\x6F","\x74\x65\x78\x74","\x3C\x70\x20\x63\x6C\x61\x73\x73\x3D\x22\x6D\x61\x73\x74\x65\x72\x54\x6F\x6F\x6C\x74\x69\x70\x22\x3E\x3C\x2F\x70\x3E","\x72\x65\x6D\x6F\x76\x65","\x68\x6F\x76\x65\x72","\x2E\x74\x6F\x6F\x6C\x54\x69\x70","\x72\x65\x61\x64\x79"];$(document)[_0xa2d4[18]](function(){$(_0xa2d4[17])[_0xa2d4[16]](function(){var _0xf14ax4=$(this)[_0xa2d4[6]](_0xa2d4[5]);$(this)[_0xa2d4[5]](_0xa2d4[8],_0xf14ax4)[_0xa2d4[7]](_0xa2d4[5]);$(_0xa2d4[14])[_0xa2d4[13]](_0xf14ax4)[_0xa2d4[12]](_0xa2d4[11])[_0xa2d4[10]](_0xa2d4[9])},function(){$(this)[_0xa2d4[6]](_0xa2d4[5],$(this)[_0xa2d4[5]](_0xa2d4[8]));$(_0xa2d4[3])[_0xa2d4[15]]()})[_0xa2d4[4]](function(_0xf14ax1){var _0xf14ax2=_0xf14ax1[_0xa2d4[0]]+ 0;var _0xf14ax3=_0xf14ax1[_0xa2d4[1]]+ 10;$(_0xa2d4[3])[_0xa2d4[2]]({top:_0xf14ax3,left:_0xf14ax2})})})
    }
}