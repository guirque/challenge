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
            .then((retorno) => retorno.json()).then((info) => { probabilidades.push(info.profiles[0].bot_probability.all); console.log("\nESTÁ FUNCIONANDO\n")});
    });
}

setTimeout(handlers, 5000);
