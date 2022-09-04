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
    handles.forEach((handle, indice) =>
    {
        fetch(`https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${handle}&search_for=profile&limit=12`)
            .then((retorno) => retorno.json()).then((info) => 
                                                    { 
                                                        var chanceDeSerBot = info.profiles[0].bot_probability.all;
                                                        console.log(`---\nUsuário em Análise: ${handle}\nChance de ser bot: ${chanceDeSerBot}\n---`);
                                                        probabilidades.push(chanceDeSerBot);
                                                        if (!document.querySelectorAll('article')[indice].querySelector('.extPegaBot')){
                                                        //O que fazer na página dependendo do resultado
                                                        if(chanceDeSerBot >= 0.9)
                                                        {
                                                            //Ocultar tweet, mas permitindo que o usuário o revele, caso ache necessário
                                                           document.querySelectorAll('article')[indice].querySelector('span').style.display = 'none';   
                                                        }
                                                        else if(chanceDeSerBot >= 0.6)
                                                        {
                                                            //Probabilidade Alta
                                                            document.querySelectorAll('article')[indice].querySelector('span').style.color = 'red';
                                                        }
                                                        else
                                                        {
                                                            //Probabilidade Baixa
                                                            document.querySelectorAll('article')[indice].querySelector('span').style.color = 'green';
                                                        }
                                                        document.querySelectorAll('article')[indice].querySelector('span').innerHTML += '<div class="extPegaBot">' + chanceDeSerBot * 100 + '% de chance de ser bot</div>';
                                                        }
                                                    });
    });
}

console.log("\n\nExtensão PegaBot em Execução\n\n");
var updating = setInterval(handlers, 5000);
