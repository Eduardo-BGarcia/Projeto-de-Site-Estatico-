document.addEventListener("DOMContentLoaded", (event)=>{
    buscarInscritos();
    construirModal();    

    const temaLocal = localStorage.getItem("tema");
    document.body.setAttribute("data-theme", temaLocal);
});

let idiomaAtual = "pt";

function alterarIdioma() {
    idiomaAtual = idiomaAtual == "pt" ? "en" : "pt";
    carregarIdioma(idiomaAtual);
}

function carregarIdioma(idioma){
    fetch(`json/${idioma}.json`).then(data => data.json()).then(data =>{traduzirPagina(data);});
}

function traduzirPagina(linguagem){
    document.querySelectorAll("[data-i18n]").forEach(elemento =>{
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n");
        console.log(chave);
        if(linguagem[chave]){
            elemento.textContent = linguagem[chave];
        }
        //para imagens
        
    });
}

function construirModal(){
    const botaoSaibaMais = document.getElementById("saiba-mais");
    const modal = document.getElementById("modal");
    const fecharModal = document.getElementById("fechar-modal");
    botaoSaibaMais.addEventListener("click", ()=> {
        modal.classList.remove("hidden");
    });
    
    window.addEventListener("click", (e) =>{
        console.log(e.target);
        if(e.target == modal){
            modal.classList.add("hidden");
        }
    });

    fecharModal.addEventListener("click", (e)=>{
        modal.classList.add("hidden");
    })

}

function alterarTema() {
    //DOM -> document objetc model
    const tema = document.body.getAttribute("data-theme");
    //Se tema = dark, muda novoTema para light, se não, muda
    //novoTema para dark
    const novoTema = tema == "dark" ? "light" : "dark";
    localStorage.setItem("tema", novoTema);
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
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch("/json/inscritos.json").then(res => res.json()).then(res=> {const divInscritos = document.getElementById("inscritos");
        res.forEach(user => {
            const novoParagrafo = document.createElement("p");
            novoParagrafo.textContent = `Nome: ${user.nome}`;
            divInscritos.appendChild(novoParagrafo);
        });
        
    }).catch(e=>console.log(e));

    // alert("Olá");
}