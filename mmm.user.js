// ==UserScript==
// @name         Mega Megamagnate
// @namespace    https://tampermonkey.net/
// @version      0.4
// @description  Utils for Megamagnate
// @author       NiciusB
// @match        *://www.megamagnate.net/*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    $(function() {
        switchLocation(window.location.pathname.split('/').splice(1));
        formatNumber = function(numero) {
            var num = new NumberFormat();
            num.setInputDecimal('.');
            num.setNumber(numero);
            num.setPlaces('0', false);
            num.setCurrencyValue('');
            num.setCurrency(true);
            num.setCurrencyPosition(num.RIGHT_OUTSIDE);
            num.setNegativeFormat(num.LEFT_DASH);
            num.setNegativeRed(true);
            num.setSeparators(true, '.', '.');
            return num.toFormatted();
        };
    });

    function switchLocation(loc) {
        switch(loc[0]) {
            case 'buildings':
                buildings.init();
                break;
            case 'casino':
                if(loc[1] === 'play') casinos.init();
                else if(loc[1] === 'hilo') HiLo.init();
                break;
        }
    }

    var HiLo = {
        init() {
            $('#jugadaspendientes').parents('.tablaContenido2').after('<div id="HiLoHelper"></div>');
            $('#HiLoHelper').html('<a href="https://wizardofodds.com/games/blackjack/card-counting/high-low/" target="_blank"><img style="width:100%;" src="https://www.blackjack-trainer.net/wp-content/uploads/2015/02/card-counting.png"/></a>');
        }
    };

    var casinos = {
        init() {
            var botones = $('<div style="text-align:center;margin:1em;"></div>').insertBefore('#mensajescasino');
            $('<button>Auto</button>').appendTo(botones).attr('disabled', $('.tablaerror').length > 0).click(function() {
                if ($(this).text() === 'Auto') {
                    $(this).text('Stop');
                    casinos.timerId = setInterval(casinos.interval, 500);
                } else {
                    $(this).text('Auto');
                    clearInterval(casinos.timerId);
                }
            });
            $('<button>Max fichas</button>').appendTo(botones).click(function() {
                var fichas = document.getElementById("fichas");
                fichas.value = fichas.length*5;
            });
        },
        timerId: false,
        interval() {
            apostar();
        }
    };

    var buildings = {
        calc() {
            $('.tablaContenido2 tr td').each(function(elm) {
                var content = $(this).text();
                var precio = /- Precio: (.+)\n/gm.exec(content);
                var beneficiosdia = /- Bºs al dia: (.+)\n/gm.exec(content);
                if (precio && beneficiosdia) {
                    precio = parseInt(precio[1].replace('.', ''));
                    beneficiosdia = parseInt(beneficiosdia[1].replace('.', ''));
                    var eficiencia = beneficiosdia/precio;
                    if(!$(this).find('.eficiencia').length) {
                        $(this).find('.imageListadoDiv').css('margin-bottom', '1em');
                        $(this).find('br').last().before('<br><p style="display:inline" title="Porcentaje del coste que se recupera al día">- Eficiencia: <span class="eficiencia"></span></p>');
                    }
                    $(this).find('.eficiencia').html((eficiencia*100).toFixed(2) + '%');
                }
            });
        },
        init() {
            // verificarPrecio se llama después de comprar un edificio y parsear el ajax
            var old_verificarPrecio = verificarPrecio.clone();
            verificarPrecio = function(id) {
                buildings.calc();
                old_verificarPrecio(id);
            };
            buildings.calc();
        }
    };

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
})();
