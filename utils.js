Function.prototype.clone = function () {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

var e_name = ['Estanco', 'Librería', 'Tienda de Ropa', 'Mercado', 'Joyería', 'Discoteca', 'Banco', 'Gasolinera', 'Centro Comercial', 'Industria'];
var e_aumentoPorOptimizar = [15, 30, 60, 120, 240, 480, 960, 1920, 3840, 7680]; //aumento por optimizar

var rentabilidadOptimizarNegocio = function (arrayEdificios, precioOptimizar) {
    var suma = 0;
    for (k = 0; k < e_name.length; k++) {
        suma += e_aumentoPorOptimizar[k] * arrayEdificios[k];
    }
    return Math.floor(suma / precioOptimizar * 10000) / 100;
};

var HiLo = {
    init() {
        $('#jugadaspendientes').parents('.tablaContenido2').last().after('<div id="HiLoHelper"></div>');
        $('#HiLoHelper').html('<a href="https://wizardofodds.com/games/blackjack/card-counting/high-low/" target="_blank"><img style="width:100%;" src="https://i.imgur.com/4FCUpB1.png"/></a>');
    }
};
