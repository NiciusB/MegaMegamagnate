!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";var o=new Array("Estancos","Librerías","Tiendas de Ropa","Mercados","Joyerías","Discotecas","Bancos","Gasolineras","Centros Comerciales","Industrias"),i=new Array(10,9,8,7,6,5,4,3,2,1),r=new Array(125,250,500,1e3,2e3,4e3,8e3,16e3,32e3,64e3),a=new Array(15,30,60,120,240,480,960,1920,3840,7680),s=new Array(10,9,8,7,6,5,4,3,2,1),l=[15,30,60,120,240,480,960,1920,3840,7680];e.exports={edificiosDestruidos:function(e){return e--,i[e]},dineroRobadoEdificios:function(e,t){var n=r[--e];n-=2*a[e],t-=i[e];for(var o=0;o<=t+1;o++)n+=a[e]*Math.ceil(o/s[e]+1e-16);return t>=i[e]&&(t=i[e]),n=Math.round(n*t/2)},precioEdificio:function(e,t){var n=r[--e];n-=2*a[e];for(var o=0;o<=t+1;o++)n+=a[e]*Math.ceil(o/s[e]+1e-16);return n},rentabilidadOptimizarNegocio:function(e,t){for(var n=0,i=0;i<o.length;i++)n+=l[i]*e[i];return Math.floor(n/parseInt(t)*1e4)/100},puntuar:function(e){for(var t=e+="",n=/(\d+)(\d{3})/;n.test(t);)t=t.replace(n,"$1.$2");return t}}},function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(0));e.exports={init:function(){for(var e=document.querySelectorAll(".reporteMision"),t=0;t<e.length;t++){var n=document.createElement("div"),o=this.getBuildings(e[t]);n.innerHTML="\n\t\t\t<span style='cursor: pointer; color: blue; text-decoration: underline;' class='showInsights'>+ Info</span>\n\t\t\t<div class='insights' style='display:none;'>"+this.calcProfit(o)+"</div>\n\t\t\t",e[t].parentNode.insertBefore(n,e[t].parentNode.childNodes[2]),e[t].parentNode.removeChild(e[t].parentNode.childNodes[3]),t==e.length-1&&function(){for(var e=document.querySelectorAll(".showInsights"),t=0;t<e.length;t++)!function(t){e[t].addEventListener("click",function(){"none"==e[t].parentNode.querySelector(".insights").style.display?(e[t].innerHTML="- Info",e[t].parentNode.querySelector(".insights").style.display="block"):(e[t].innerHTML="+ Info",e[t].parentNode.querySelector(".insights").style.display="none")})}(t)}()}},getBuildings:function(e){var t=e.querySelector(".boton").parentNode.innerHTML.split("</div>")[1].split("<br>");return t=t.map(function(e){var t=e.split(" ");return parseInt(t[t.length-1])})},calcProfit:function(e){for(var t=new Array("Estancos","Librerías","Tiendas de Ropa","Mercados","Joyerías","Discotecas","Bancos","Gasolineras","Centros Comerciales","Industrias"),n=new Array(10,9,8,7,6,5,4,3,2,1),i="",r=[],a=[],s=[],l=void 0,c=0;c<e.length;c++){var d=e[c];s[c]=d;var u=s[c]-n[c];u<0?(u=0,l=s[c]):l=n[c],r[c]=o.default.precioEdificio(c+1,s[c]),a[c]=o.default.dineroRobadoEdificios(c+1,s[c]),a[c]+""!="NaN"&&(i+="<br />Si destruyes "+l+" <u>"+t[c]+"</u> ganas <b>"+o.default.puntuar(a[c])+"</b> &euro; y quedarán <i>"+u+"</i> edificios. El precio individual es de <u>"+o.default.puntuar(r[c])+"</u> &euro;.")}var p=0,f=0;for(var m in r)r[m]>=p&&(p=r[m],f=m);var h=0,y=0;for(var w in a)a[w]>=h&&(h=a[w],y=w);return i+="<br /><br />El edificio más caro es: <u>"+t[f]+"</u> con un precio de <u>"+o.default.puntuar(r[f])+"</u> &euro;.",i+="<br /><b>El edificio más rentable de atacar es: <u>"+t[y]+"</u> ganando <u>"+o.default.puntuar(a[y])+"</u> &euro;.</b>"}}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n(3);var i=o(n(4)),r=o(n(5)),a=o(n(7)),s=o(n(8)),l=o(n(9)),c=o(n(10));document.querySelector(".chatMC")&&l.default.init();var d=window.mmm_settings,u=d.advanced_devMode?"dev":"production";console.log("Mega Megamagnate "+d.version+" ("+u+" mode) is loaded"),window.formatNumber=function(e){var t=new window.NumberFormat;return t.setInputDecimal("."),t.setNumber(e),t.setPlaces("0",!1),t.setCurrencyValue(""),t.setCurrency(!0),t.setCurrencyPosition(t.RIGHT_OUTSIDE),t.setNegativeFormat(t.LEFT_DASH),t.setNegativeRed(!0),t.setSeparators(!0,".","."),t.toFormatted()},$(".footer").hide(),d.general_playButton||$('.trozoLogin a[href="https://play.google.com/store/apps/details?id=net.megamagnate"]').hide(),d.general_moneyTimer&&($(".cajaDinero").css("font-family","monospace").prepend('<span id="tiempoHastaLlenado" style="font-size: 0.225em;color:#aaa;"></span>'),$("#cajetoDinero").css("font-size","0.85em").html(window.formatNumber(window.dinero)),$("#cajetoDinero").attr("data")&&setInterval(function(){var e=parseInt($("#cajetoDinero").attr("data").split(":")[1].split(".").join("")),t=parseFloat($("#alsegundo").html()),n=(e-window.dinero)/t;n>0?$("#tiempoHastaLlenado").html(function(e){var t=parseInt(e,10);return[Math.floor(t/3600),Math.floor(t/60)%60,t%60].map(function(e){return e<10?"0"+e:e}).filter(function(e,t){return"00"!==e||t>0}).join(":")}(n)+" hasta llenado"):$("#tiempoHastaLlenado").html("Lleno")},500)),function(e){switch(e[0]){case"buildings":i.default.init();break;case"casino":"play"===e[1]?r.default.init():"hilo"===e[1]&&a.default.init();break;case"messages":"inbox"===e[1]&&s.default.init();break;case"heroes":c.default.init()}}(window.location.pathname.split("/").splice(1)),window.mmm_settings=void 0},function(e,t,n){"use strict";Function.prototype.clone=function(){var e=this,t=function(){return e.apply(this,arguments)};for(var n in this)this.hasOwnProperty(n)&&(t[n]=this[n]);return t}},function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(0));e.exports={calcNewInfo:function(){var e=[];$(".tablaContenido2 tr").each(function(){if($(this).attr("id")){$(this).find(".eficiencia_precio").length||($(this).find(".imageListadoDiv").css("margin-bottom","5em"),$(this).find("br").last().before('<br><p style="display:inline" title="Dinero que recibe el atacante por atacar este edificio">- Dinero para atacante: <span class="dinero_para_atacante"></span></p>').before('<br><p style="display:inline" title="Coste de recuperarte de un ataque (Volver a comprar los edificios destruidos)">- Coste de recuperación: <span class="coste_recuperacion_ataque"></span></p>').before('<br><p style="display:inline" title="Beneficios diarios / Precio">- Eficiencia sobre precio: <span class="eficiencia_precio"></span></p>').before('<br><p style="display:inline" title="Beneficios diarios * Edificios destruidos al atacar (1, 2, 3, etc) / Coste de recuperación">- Eficiencia sobre recuperación: <span class="eficiencia_recuperacion"></span></p>'));var t=parseInt($(this).attr("id").replace("cachoEdificio","")),n=parseInt($("#ped"+t).html().split(".").join("")),i=parseInt($("#ned"+t).html().split(".").join(""));e.push(i);for(var r=parseInt($(this).text().split(": +")[2].split("\n")[0].split(".").join("")),a=o.default.dineroRobadoEdificios(t,i),s=0,l=0;l<o.default.edificiosDestruidos(t);l++)s+=o.default.precioEdificio(t,i-1-l);var c=r/n,d=r*o.default.edificiosDestruidos(t)/s;$(this).find(".eficiencia_precio").html((100*c).toFixed(2)+"%"),$(this).find(".eficiencia_recuperacion").html((100*d).toFixed(2)+"%"),$(this).find(".coste_recuperacion_ataque").html(o.default.puntuar(s)),$(this).find(".dinero_para_atacante").html(o.default.puntuar(a))}});var t=$("#precioOptimizarNegocio").val().split(".").join("");t&&$("#eficienciaOptimizarNegocio").html(o.default.rentabilidadOptimizarNegocio(e,t)+"%")},init:function(){var e=this,t=window.verificarPrecio.clone();window.verificarPrecio=function(n){e.calcNewInfo(),t(n)},$(".tablaContenido2").last().after('\n\t\t\t<table  class="tablaContenido2" cellspacing="0" cellpadding="0" style="margin-top:15px">\n\t\t\t<tr>\n\t\t\t\t<td class="topTitulo2"> Eficiencia de Optimizar Negocio </td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\tPrecio de Optimizar Negocio: <input type="text" id="precioOptimizarNegocio" />\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<p style="display:inline" title="Porcentaje del coste que se recupera al día">- Eficiencia: <span id="eficienciaOptimizarNegocio">0%</span></p>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t'),$("#precioOptimizarNegocio").on("change, input",function(){e.calcNewInfo()}),this.calcNewInfo()}}},function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(6)),i=window.mmm_settings,r={slowMode:!1,salirEnBote:!1,auto:!0,slowCounter:0,lastTs:1*new Date,lastBote:0,init:function(){o.default.get("monsterMode")&&this.monsterModeInit();var e=document.getElementById("fichas");e.value=5*e.length;var t=$('<div style="text-align:center;margin:1em;"></div>').insertBefore("#mensajescasino");$("<button></button>").appendTo(t).click(function(){r.auto=!r.auto,$(this).text(r.auto?"Stop Auto":"Start Auto")}).click(),$("<button></button>").appendTo(t).click(function(){r.slowMode=!r.slowMode,$(this).text(r.slowMode?"Stop SlowMode":"Activar SlowMode")}).click(),$("<button></button>").appendTo(t).click(function(){r.salirEnBote=!r.salirEnBote,$(this).text(r.salirEnBote?"Stop SalirEnBote":"Activar SalirEnBote")}).click(),$('<div style="margin: 1em 0;color:#333;">SlowMode: Si el bote es menor a '+new Intl.NumberFormat("es-ES").format(i.casinos_slowAmount)+", solamente se apuesta cada "+i.casinos_slowTimer+" segundos</div>").appendTo(t),$('<div style="margin: 1em 0;color:#333;">SalirEnBote: Si se reparte un bote, se saldrá automáticamente del casino.</div>').appendTo(t),this.interval()},monsterModeInit:function(){r.slowMode=!0,r.salirEnBote=!0,window.jAlert=function(){},setInterval(function(){document.getElementById("palanca").src==="https://s3.eu-central-1.amazonaws.com/eu.megamagnate/casinos/MMM"+window.tipo_casino+"/palancaon.gif"&&(window.flag=0)},1)},interval:function(){setTimeout(r.interval,50);var e=$(".tablaerror").length>0,t=1*new Date-r.lastTs;if(r.lastTs=1*new Date,!e&&r.auto){var n=parseInt($("#mbote").html().split(".").join(""));if(r.salirEnBote&&n<r.lastBote)return alert("Bote!!"),document.location="/casino/list",void(r.auto=!1);var o;o=r.slowMode&&n<parseInt(i.casinos_slowAmount)?1e3*parseInt(i.casinos_slowTimer):50,r.slowCounter+=t,r.slowCounter>=o&&(r.slowCounter=0,r.lastBote=n,window.apostar())}}};e.exports=r},function(e,t,n){"use strict";var o,i,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(a){var s=!1;if(void 0!==(i="function"==typeof(o=a)?o.call(t,n,t,e):o)&&(e.exports=i),s=!0,"object"===r(t)&&(e.exports=a(),s=!0),!s){var l=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=l,c}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}function t(n){function o(t,i,r){var a;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(r=e({path:"/"},o.defaults,r)).expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*r.expires),r.expires=s}r.expires=r.expires?r.expires.toUTCString():"";try{a=JSON.stringify(i),/^[\{\[]/.test(a)&&(i=a)}catch(e){}i=n.write?n.write(i,t):encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var l="";for(var c in r)r[c]&&(l+="; "+c,!0!==r[c]&&(l+="="+r[c]));return document.cookie=t+"="+i+l}t||(a={});for(var d=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,p=0;p<d.length;p++){var f=d[p].split("="),m=f.slice(1).join("=");this.json||'"'!==m.charAt(0)||(m=m.slice(1,-1));try{var h=f[0].replace(u,decodeURIComponent);if(m=n.read?n.read(m,h):n(m,h)||m.replace(u,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(e){}if(t===h){a=m;break}t||(a[h]=m)}catch(e){}}return a}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(t,n){o(t,"",e(n,{expires:-1}))},o.withConverter=t,o}return t(function(){})})},function(e,t,n){"use strict";function o(){f=[];for(var e=0;e<13;e++)f[e]=[!0,!0,!0,!0]}function i(e,t){var n=0,o=0;return f.forEach(function(i,r){var a=i.filter(function(e){return e}).length;o+=a,("hi"===e?r>t:r<t)&&(n+=a)}),n/o*100}function r(){if(!u.hilo_mereceLaPena)return!0;var e=window.parseInt(document.querySelector("#bote").innerHTML.replace(/\./g,"")),t=window.parseFloat(document.querySelector(".comboBox").innerHTML.replace("x",""));return t*e>u.hilo_exitOn&&(t=u.hilo_exitOn/e),p.hi>p.lo?window.parseFloat(p.hi/100*t)>1:window.parseFloat(p.lo/100*t)>1}function a(){var e=[84,124],t=$(".hilo").css("background-position").split("px").map(function(e){return parseInt(e)}),n=Math.abs(Math.floor(t[0]/e[0]));return 13===n&&(n=0),[n,Math.abs(Math.floor(t[1]/e[1]))]}function s(){var e={hi:"color: #222; font-weight: bold;",lo:"color: #222; font-weight: bold;"};p.hi>50?(e.hi="color: limegreen; font-weight: bold;",e.lo="color: orangered; font-weight: normal;"):p.lo>50&&(e.lo="color: limegreen; font-weight: bold;",e.hi="color: orangered; font-weight: normal;");var t={};Object.keys(p).map(function(e){t[e]=Math.floor(100*p[e])/100});var n='\n      <div id="chances" style="margin:0 5px;flex: 1 1;">\n        <div>Hi chances: <span style="'+e.hi+'">'+t.hi+'%</span></div>\n        <div>Lo chances: <span style="'+e.lo+'">'+t.lo+"%</span></div>\n      </div>\n    ";$("#chances").html(n)}function l(){"0"==$("#bote").html()&&o();var e=a();f[e[0]][e[1]]&&(f[e[0]][e[1]]=!1,p.hi=i("hi",e[0]),p.lo=i("lo",e[0]),s())}function c(){p.hi>p.lo?window.playHilo(1):window.playHilo(2)}function d(){window.HiLoAuto=!window.HiLoAuto,$("#auto-boton").html(window.HiLoAuto?"Stop Auto":"Start Auto")}var u=window.mmm_settings;void 0===u.hilo_mereceLaPena&&(u.hilo_mereceLaPena=!0);var p={hi:0,lo:0},f=[];e.exports={init:function(){$(".cajaHilo").css("height","auto").css("flex","1 0").parent().css("display","flex"),$('<a class="boton" style="width: 100px">La más probable</a><br><br>').insertBefore("#endGame").click(c),$('<a id="auto-boton" class="boton" style="width: 100px;"></a><br><br>').prependTo(".cajaHilo").click(d),$("<div id='chances'></div>").insertAfter(".cajaHilo"),$("<span style='margin: 1em 0;color:#333;'>Modo Auto: Seguirá apostando mientras no llegues a la cantidad objetivo "+new Intl.NumberFormat("es-ES").format(u.hilo_exitOn)+"</span><br><span>Sólo si merece la pena: Sólo se continuará apostando si el riesgo de la apuesta no es superior a la máxima recompensa obtenible.</span>").appendTo(".cajaHilo"),$('a[onclick="comienzaJuego()"]').attr("onclick","comienzaJuegoSinConfirmar()"),$("#endGame").attr("onclick","playHilo(3)"),$("#jugadaspendientes").parents(".tablaContenido2").last().after('<div id="HiLoHelper"></div>'),$("#HiLoHelper").html('<a href="https://wizardofodds.com/games/blackjack/card-counting/high-low/" target="_blank"><img style="width:100%;" src="https://i.imgur.com/4FCUpB1.png"/></a>'),window.comienzaJuegoSinConfirmar=function(){var e=window.confirm;window.confirm=function(){return!0},window.comienzaJuego(),window.confirm=e},window.HiLoAuto=!0,d(),setInterval(function(){if(!window.HiLoAuto||window.flagPlaying)return!1;var e="none"!==$("#cajaJugando").css("display"),t="none"===$(".hilo_content").css("display");!e||t?window.comienzaJuegoSinConfirmar():parseInt($("#bote").html().split(".").join(""))<parseInt(u.hilo_exitOn)&&r()?c():window.playHilo(3)},100),$("#bote, #disponible").on("DOMSubtreeModified",l)}}},function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(1));e.exports={init:function(){o.default.init()}}},function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(1));e.exports={chatNum:0,time:0,lastChat:"",init:function(){var e=this,t=document.createElement("div");t.id="meinChat",t.innerHTML="<div class='cajaChat' style='overflow-x: hidden;'></div>",t.style.cssText="display: none; position: fixed; bottom: 26px; right: 0px; z-index: 100; background: white; width: 400px; font-family: Arial, sans-serif; font-size: 12px; border: 2px solid black;",document.querySelector("body").appendChild(t),document.querySelector(".chatMC a").addEventListener("click",function(n){n.preventDefault(),"none"==t.style.display?(t.style.display="",e.markAsRead(),e.listenReports(),$("#meinChat .cajaChat").scrollTop($("#meinChat .cajaChat")[0].scrollHeight)):t.style.display="none"});var n=document.createElement("input");n.id="meinInput",n.type="text",n.placeholder="Presiona ENTER para enviar",n.style.width="100%",t.appendChild(n),n.addEventListener("keypress",function(t){13==t.which&&e.say(t.target.value)}),this.fetchChat(),setInterval(function(){return e.fetchChat()},1e4)},fetchChat:function(){var e=this;$.ajax({type:"POST",url:"/petition/megacorp",dataType:"json",data:{event:"getChat",myChat:this.chatNum,myTime:this.time}}).done(function(t){"ok"==t.error&&(t.mensaje!=e.lastChat&&(e.lastChat=t.mensaje,document.querySelector("#meinChat .cajaChat").innerHTML=e.lastChat,$("#meinChat .cajaChat").scrollTop($("#meinChat .cajaChat")[0].scrollHeight)),e.chatNum=t.chatNum,e.time=t.time)})},say:function(e){var t=this;$.ajax({type:"POST",url:"/petition/megacorp",dataType:"json",data:{event:"sendChat",txt:e}}).done(function(e){if("ok"!=e.error)return!1;$("#meinInput").val(""),$("#meinChat .cajaChat").append(e.mensaje),$("#meinChat .cajaChat").scrollTop($("#meinChat .cajaChat")[0].scrollHeight),t.chatNum=e.chatNum,t.time=e.time})},markAsRead:function(){var e=new XMLHttpRequest;e.open("GET","https://www.megamagnate.net/megacorp/chat"),e.send(),document.querySelector(".menuCabecera").innerHTML="Chat Alianza"},listenReports:function(){for(var e=document.querySelector("#meinChat").querySelectorAll(".manual-ajax"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){e.preventDefault(),$.get(e.target.href,function(e){$(e).appendTo("body").modal(),o.default.init()})})}}},function(e,t,n){"use strict";e.exports={init:function(){var e=this;this.costes=[[80,100,150],[80,100,100],[100,200,200]],this.leaderID=window.parseInt(document.querySelectorAll("[onclick*=infoh]")[0].getAttribute("onclick").substring(document.querySelectorAll("[onclick*=infoh]")[0].getAttribute("onclick").indexOf("useSkill(")+9,document.querySelectorAll("[onclick*=infoh]")[0].getAttribute("onclick").indexOf(");")).split(",")[0]),this.lvl=window.parseInt(document.querySelector(".tablaContenido2:not(.tablaok)").innerHTML.match(/(Lvl)+\s+[0-9]{1,4}/g)[0].replace("Lvl ","")),this.heroType=window.parseInt(document.querySelector("#habilidad1").src.substring(document.querySelector("#habilidad1").src.indexOf(".gif")-3,document.querySelector("#habilidad1").src.indexOf(".gif")-2)),this.energy=window.parseInt(document.querySelector("#energia_left").innerHTML),this.exp=window.parseInt(document.querySelector("#puntos_left").innerHTML),this.maxEnergy=window.parseInt(document.querySelector("#energia_maxima").innerHTML),this.maxExp=window.parseInt(document.querySelector("#puntos_left").parentNode.innerHTML.substring(document.querySelector("#puntos_left").parentNode.innerHTML.indexOf("/")+8).trim()),new MutationObserver(function(){var t=window.parseInt(document.querySelector("[onclick^=useSkill]").getAttribute("onclick").split(",")[1].replace(");",""));if(!document.querySelector("#useAll")&&2==t){var n=document.createElement("a");n.className="boton",n.id="useAll",n.style.display="block",n.style.textAlign="center",n.innerText="Activar todo",n.addEventListener("click",function(){e.useAll()}),document.querySelector("#infoh2").appendChild(n)}}).observe(document.querySelector("#infoh2"),{subtree:!0,childList:!0}),window.useSkill=function(t,n){$.ajax({type:"POST",url:"/petition/lideres",dataType:"json",data:{event:"useSkill",idl:t,skill:n}}).done(function(t){if(e.doItDad(n),""!=t.url){var o=void 0;o=1==e.heroType?1==n?"+"+20*e.lvl+" fuerza":2==n?"+"+(100+5*e.lvl)+" saboteadores":"+1 sabotaje":2==e.heroType?1==n?"+"+20*e.lvl+" defensa":2==n?"+"+(500+10*e.lvl)+" guardias":"+1 seguridad":1==n?"Herida Letal ON":2==n?"+Regeneración Rápida":"+Pierde Mitad de Vida",e.msg(o,e.costes[e.heroType-1][n-1])}else window.jAlert(t.mensaje,"Lideres")})}},useAll:function(){var e=this,t=window.parseInt(window.parseInt(document.querySelector("#energia_left").innerHTML)/100);if(t<1)return!1;for(var n=[],o=0;o<t;o++)n.push(new Promise(function(t){$.ajax({type:"POST",url:"/petition/lideres",dataType:"json",data:{event:"useSkill",idl:e.leaderID,skill:2}}).done(function(){e.doItDad(2),t()})}));Promise.all(n).then(function(){2==e.heroType?e.msg("+"+t*(500+10*e.lvl)+" guardias",t*e.costes[e.heroType-1][1]):e.msg("+"+t*(100+5*e.lvl)+" saboteadores",t*e.costes[e.heroType-1][1])})},doItDad:function(e){var t=this;if(this.energy-=this.costes[this.heroType-1][e-1],this.exp+=this.costes[this.heroType-1][e-1],this.exp>=this.maxExp){this.lvl++,this.exp-=this.maxExp,this.maxExp+=1e3,this.msg("Tu héroe ha subido al nivel "+this.lvl+"!"),document.querySelector("#puntos_restantes").innerHTML=window.parseInt(document.querySelector("#puntos_restantes").innerHTML)+10,document.querySelector("#puntos_left").parentNode.innerHTML=document.querySelector("#puntos_left").parentNode.innerHTML.replace("/ "+this.maxExp,"/ "+(this.maxExp+1e3));for(var n=function(e){document.querySelector("#sn"+e).className="",document.querySelector("#sn"+e).addEventListener("click",function(){if(window.parseInt(document.querySelector("#puntos_restantes").innerHTML)>0)window.subir_puntos(e,t.leaderID),document.querySelector("#puntos_restantes").innerHTML=window.parseInt(document.querySelector("#puntos_restantes").innerHTML)-1;else for(var n=1;n<=document.querySelectorAll("[id^=sn]").length;n++)document.querySelector("#sn"+n).className="transparente",document.querySelector("#sn"+n).addEventListener("click",function(e){return e.preventDefault()})})},o=1;o<=document.querySelectorAll("[id^=sn]").length;o++)n(o)}document.querySelector("#barra_energia").style.width=this.energy/this.maxEnergy*109+"px",document.querySelector("#barra_experiencia").style.width=this.exp/this.maxExp*109+"px",document.querySelector("#energia_left").innerHTML=this.energy,document.querySelector("#puntos_left").innerHTML=this.exp},msg:function(e,t){var n=document.querySelectorAll(".infoDiv").length+1,o=document.createElement("div");o.className="infoDiv",o.style.cssText="display: none; position: fixed; border: 1px solid rgba(255, 255, 255, .1); border-radius: 3px; top: "+(window.innerHeight-70*n)+"px; left: 10px; background: #333; font-size: 11px; font-family: 'Arial'; padding: 10px 15px;",o.innerHTML="\n      <span style='color: lightgreen; font-weight: bold; font-size: 13px;'>"+e+"</span>\n    ",t&&(o.innerHTML+="\n      <br><span style='color: red;'>-"+t+" Energía</span><br>\n      <span style='color: yellow;'>+"+t+" EXP</span>\n    "),document.querySelector("body").appendChild(o),$(".infoDiv").fadeIn(),window.setTimeout(function(){$(".infoDiv").fadeOut(1e3,function(){o.remove()})},3e3)}}}]);