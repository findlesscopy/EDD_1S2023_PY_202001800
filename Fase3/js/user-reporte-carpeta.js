
let obj = localStorage.getItem("grafica_user");


function generarGrafica(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = obj
    console.log(body)
    $("#image").attr("src", url + body);
}

window.addEventListener("load", function() {
    generarGrafica();
  });
