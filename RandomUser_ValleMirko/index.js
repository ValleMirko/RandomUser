"use strict";

let _img,
    _lblArgoment, _lblContent,
    _lastButton,
    _dettagli,
    _rdo,
    _range;

let persone, persona, i = -1;

const URL = "https://randomuser.me/api?"

$(document).ready(function(){	
	
    _img = $("#user_photo img");
    _dettagli = $(".details");
    _lblContent = $("#user_value");
    _lblArgoment = $("#user_title");
    _rdo = $(".rdo");
    _range = $("#numeroPersone");
    inviaRichiesta();
});

function inviaRichiesta() {
    let nPersone = _range.prop("value");
    let gender = $(_rdo[0]).prop("checked") ? "" : $(_rdo[1]).prop("checked") ? "male" : "female";
    let _chk = $(".chk");
    let naz = "";
    for (let nationality of _chk)
        naz += $(nationality).prop("checked") ? $(nationality).prop("value") + "," : "";
    let par = `results=${nPersone}&gender=${gender}&nat=${naz}`;
    console.log(par);
    inviaRichiestaAlServer(par, aggiornaPagina);
}

function inviaRichiestaAlServer(paramaters, callBack) {
    $.ajax({
        "url": "https://randomuser.me/api",
        "type": "GET",
        "data": paramaters,
        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
        "dataType": "json",
        "async": true,
        "timeout": 5000,
        "success": callBack,
        "error": function (jqXHR, test_status, str_error) {
            alert(`Server Error: ${jqXHR.status} - ${jqXHR.responseText}`);
        }
    });
}

//Gestione visualizzazione  User
function aggiornaPagina(data) {
    persone = data["results"];
    i = -1;
    console.log(persone);
    visualizzaPersona("plus");
}

function visualizzaPersona(sign) {
    persona = persone[sign == 'plus' ? ++i : --i];
    $("#fc_min").css("visibility", "visible");
    $("#fc_plus").css("visibility", "visible");
    if (i == 0)
    {
        $("#fc_min").css("visibility", "hidden");
        $(".refresh").attr("href", "javascript:visualizzaPersona('plus');");
    }
    if (i == persone.length - 1)
    {
        $("#fc_plus").css("visibility", "hidden");
        $(".refresh").attr("href", "javascript:visualizzaPersona('min');");
    }
    _img.prop("src", persone[i]["picture"]["large"]);
    mostraDettagli($(_dettagli[0]));
    _lblArgoment.text("Hi, my name is");
    _lblContent.text((`${persona["name"]["first"]} ${persona["name"]["last"]}`).replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); }));
    _lastButton = $("#name").css("background-position-y", "-96px");
    $("#nPersone").css("width", `${(i + 1) / persone.length * 100}%`);
    $("#nPersone").text(`${i + 1}/${persone.length}`);
}

function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}