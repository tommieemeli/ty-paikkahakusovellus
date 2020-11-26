
var jasondatat;
var opetusaladatat;

//funktio joka lähettää AJAX kutsun Vantaan kaupungin palvelimelle

function haeData() {

    var url = "https://gis.vantaa.fi/rest/tyopaikat/v1";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("tuloksia").innerHTML = xmlhttp.responseText;            
            jasondatat = JSON.parse(xmlhttp.responseText);
        }
    }
}

// funktio joka hakee opetusalan dataa

function opetusalaData() {

    var url = "http://gis.vantaa.fi/rest/tyopaikat/v1/Opetusala";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {           
            opetusaladatat = JSON.parse(xmlhttp.responseText);
            alert("DATA LADATTU !\nVoit nyt ladata opetusalan työpaikat kortteihin !");
        }
    }
}

// listaa ammattialat ja vapaana olevien työpaikkojen määrän pöytään

 function ammattiAlat() {
   var data = jasondatat;
   var pöytä = "<table border='5px'>"; 
   for (var i = 0; i < data.length; i++) {
       pöytä += '<tr>';
       pöytä += '<th>' + data[i].ammattiala + ": vapaita työpaikkoja: " + data[i].lukumäärä + '</th>';
       pöytä += '</tr>';
   }
   pöytä += "</table>";
   document.getElementById("ammattialat").innerHTML = pöytä;
}

// testinappula joka helpottaa selvittämään tuleeko oikeaa dataa

function testiTapaus(){
    var data = opetusaladatat;
    console.log();
}

// funktio joka ohjaa haetun datan kortti muotoon

function dataKorttiin(){
    var data = opetusaladatat;
    var kortti = '<div class="card" style="width: 25rem;">';
    for (var i = 0; i < data.length; i++){
        kortti += '<div class="card-body">';
        kortti += '<h5 class="card-title" id="ammattiala">' + data[i].ammattiala + '</h5>';
        kortti += '<p class="card-text" id="työtehtävä">' + data[i].tyotehtava + '</p>';
        kortti += '</div>';
        kortti += '<ul class="list-group list-group-flush">';
        kortti += '<li id="osoite">' + data[i].osoite + '</li>';
        kortti += '<li id="haku">' + "Haku päättyy: " + data[i].haku_paattyy_pvm + '</li>';
        kortti += '</ul>';
        kortti += '<div class="card-body" id="linkki">';
        kortti += '<a href="#" class="card-link">' + data[i].linkki + '</a>';
        kortti += '<hr>';
        kortti += '</div>';  
                
    }
    kortti += '</div>';
    document.getElementById("opetus").innerHTML = kortti;
}
