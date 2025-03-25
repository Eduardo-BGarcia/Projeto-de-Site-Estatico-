function alterarTema() {
    //DOM -> document objetc model
    const tema = document.body.getAttribute("data-theme");
    //Se tema = dark, muda novoTema para light, se não, muda
    //novoTema para dark
    const novoTema = tema == "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", novoTema);
    mudarImagem(novoTema);
}

function mudarImagem(tema) {
    if(tema === "dark"){
        var imagem = document.getElementById("icone-alterar-tema");
        imagem.src = "imagens/sun.png";
    }else{
        var imagem = document.getElementById("icone-alterar-tema");
        imagem.src = "imagens/moon.png";
    }

}
function buscarInscritos(){
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res=> {const divInscritos = document.getElementById("inscritos");
        res.forEach(user => {
            const novoParagrafo = document.createElement("p");
            novoParagrafo.textContent = `Nome: ${user.name}`;
            divInscritos.appendChild(novoParagrafo);
        });
        
    }).catch(e=>console.log(e));
}