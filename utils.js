Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

var e_name = ['Estanco','Librería','Tienda de Ropa','Mercado','Joyería','Discoteca','Banco','Gasolinera','Centro Comercial','Industria'];
var e_aumentoPorOptimizar = [15,30,60,120,240,480,960,1920,3840,7680]; //aumento por optimizar

var rentabilidadOptimizarNegocio = function(arrayEdificios, precioOptimizar) {
	var suma = 0;
	for(k=0; k < e_name.length; k++) {
		suma += e_aumentoPorOptimizar[k] * arrayEdificios[k];
	}
	return Math.floor(suma / precioOptimizar * 10000) / 100;
};
