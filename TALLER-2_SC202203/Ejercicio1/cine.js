var peliculas = {
    "cartelera": 
    [
    {"portada": "img/endgame.jpg",
    "titulo": "Avengers: End Game",
    "duracion": "200 min",
    "clasificacion": "A (Todos)",
    "horario": "11:45, 12:00, 4:00",
    "butacas": "Tradicionales"},


    {"portada": "img/thenun.jpg",
    "titulo": "The Nun",
    "duracion": "150 min",
    "clasificacion": "C (Mayores de 17 años)",
    "horario": "11:30, 12:00, 4:00",
    "butacas": "Tradicionales"},


    {"portada": "img/minions.jpg",
    "titulo": "Minions: Nace un Villano",
    "duracion": "100 min",
    "clasificacion": "A (Todos)",
    "horario": "11:30, 1:00, 3:00",
    "butacas": "Tradicionales"},


    {"portada": "img/thor.jpg",
    "titulo": "Thor: Love & Thunder",
    "duracion": "180 min",
    "clasificacion": "A (Todos)",
    "horario": "11:20, 10:00, 2:00",
    "butacas": "Tradicionales"},
    ]
    };




    var div = document.getElementById("info");
      div.innerHTML = volcarDatos(peliculas.cartelera);

      function volcarDatos(datos){
      var total = datos.length;
       data = "<ul class=\"grid\">\n";
    
       for(var i=0; i<total; i++){
        data += "<li class=\"box\">\n";
        data += "<div class=\"box-shadow\"></div>\n";
        data += "<div class=\"box-gradient\">\n";

         data += "<img src=\"" + datos[i].portada + "\" alt=\ " + datos[i].titulo + " " + "\" class=\"avatar\" />\n";
         data += "<h4>\n "  + datos[i].titulo +  "\n</h4>\n";
         data += "<p>\nDuración: " + datos[i].duracion + "\n";
         data += "<p>\nClasificación: " + datos[i].clasificacion + "\n<br />\n";
         data += "<p>\nHorarios: " + datos[i].horario + "\n";
         data += "<p>Butacas: " + datos[i].butacas + "\n</p>\n";
         data += "</div>\n";
         data += "</li>\n";
    }
    data += "</ul>\n";
    return data;
    }

