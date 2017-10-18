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

var e_name = new Array('Estanco','Librería','Tienda de Ropa','Mercado','Joyería','Discoteca','Banco','Gasolinera','Centro Comercial','Industria');
var e_aumentoPorOptimizar = new Array(15,30,60,120,240,480,960,1920,3840,7680); //aumento por optimizar

var rentabilidadOptimizarNegocio = function(arrayEdificios, precioOptimizar) {
	var suma = 0;
	for(k=0; k < e_name.length; k++) {
		var beneficio = e_aumentoPorOptimizar[k] * arrayEdificios[k];
		suma = suma + beneficio[k];
	}
	return Math.floor(suma / precioOptimizar * 10000) / 100;
}
