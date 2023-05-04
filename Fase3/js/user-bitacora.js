//console.log(localStorage.getItem("bitacora"))
function reporteBitacora(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = localStorage.getItem("bitacora")
    var cadenaSinEscape = body.replace(/\\/g, "");
    
    $("#image").attr("src",url+cadenaSinEscape)
    console.log(url+cadenaSinEscape)
}

window.addEventListener("load", function() {
    reporteBitacora();
  });
