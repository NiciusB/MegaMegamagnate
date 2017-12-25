const edificios = new Array('Estancos', 'Librerías', 'Tiendas de Ropa', 'Mercados', 'Joyerías', 'Discotecas', 'Bancos', 'Gasolineras', 'Centros Comerciales', 'Industrias')
const destruccion = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero de destruccion de edificios
const bcostes = new Array(125, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000) //coste de edificio a nivel 0
const acostes = new Array(15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680) //aumentos basicos por grupo de edificios
const ccostes = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1) //numero edificios para aumento
const e_aumentoPorOptimizar = [15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680] //aumento por optimizar

module.exports = {
    dineroRobado(id, q) {
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
    rentabilidadOptimizarNegocio(arrayCantidadEdificios, precioOptimizar) {
        var suma = 0
        for (var k = 0; k < edificios.length; k++) {
            suma += e_aumentoPorOptimizar[k] * arrayCantidadEdificios[k]
        }
        return Math.floor(suma / parseInt(precioOptimizar) * 10000) / 100
    },
    puntuar(nStr) {
        nStr += ''
        let x1 = nStr

        let rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2')
        }
        return x1
    }
}