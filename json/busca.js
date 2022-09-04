//A cada evento, percorre as postagens e separa handles em um vetor.
//A primeira atualização ocorre após 5 segundos
var postagens;
var handles;
var probabilidades = [];

function handlers()
{
    var postagens = Array.from(document.querySelectorAll('article'));
    handles = postagens.map((postagem) =>
    {
        var handle = [...postagem.innerHTML.match(`\@.*?<`).join('')];
        return handle.slice(0, handle.length - 1).join('');
    });

    //Para cada handle, analisa, por meio do Pegabot, se a conta é um bot ou não.
    handles.forEach((handle) =>
    {
        fetch(`https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${handle}&search_for=profile&limit=1`)
            .then((retorno) => retorno.json()).then((info, indice) => 
                                                    { 
                                                        var chanceDeSerBot = info.profiles[0].bot_probability.all;
                                                        probabilidades.push(chanceDeSerBot);
            
                                                        //O que fazer na página dependendo do resultado
                                                        if(chanceDeSerBot >= 0.9)
                                                        {
                                                            //Ocultar tweet, mas permitindo que o usuário o revele, caso ache necessário
                                                            document.querySelectorAll('article')[indice].style.display = 'none';   
                                                        }
                                                        else if(chanceDeSerBot >= 0.5)
                                                        {
                                                            document.querySelectorAll('span')[indice].style.color = 'red';
                                                        }
                                                        else
                                                        {
                                                            document.querySelectorAll('span')[indice].style.color = 'green';
                                                        }
                                                        document.querySelectorAll('span')[indice].innerHTML += '<div class="extPegaBot">' + chanceDeSerBot * 100 + '% de chance de ser bot</div>';
                                                    
                                                    });
    });


}

var updating = setInterval(handlers, 8000);
