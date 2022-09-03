//A cada evento, percorre as postagens e separa handles em um vetor.
var postagens = Array.from(document.querySelectorAll('article'));
var handles = [];
handles = postagens.map((postagem) =>
{
    var handle = [...postagem.innerHTML.match(`\@.*?<`).join('')];
    return handle.slice(0, handle.length - 1).join('');
});

//Para cada handle, analisa, por meio do Pegabot, se a conta é um bot ou não.
var probabilidades = [];
handles.forEach((handle) =>
{
    fetch(`https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${handle}&search_for=profile&limit=1`)
        .then((retorno) => retorno.json()).then((info) => { probabilidades.push(info.profiles[0].bot_probability.all); });
});
