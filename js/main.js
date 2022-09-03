function consultaCep(){
    $(".barra-progesso").show();
    var cep = document.getElementById("cep").value;
    var url = "https://viacep.com.br/ws/" + cep + "/json/";
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(response){
            console.log(response);
            $("#logradouro").html(response.logradouro);
            $(".cep").show();
            $(".barra-progesso").hide();
        }
    })
}

$(function(){
    $(".cep").hide();
    $(".barra-progesso").hide();
});