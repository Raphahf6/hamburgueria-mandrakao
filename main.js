
const btnCarrinho = document.getElementById('btn-carrinho')
const inputTotal = document.getElementById('total')
const btnComprar = document.getElementById('comprar')
const inputQuantidade = document.querySelectorAll('input#quantidade')
const inputPreco = document.querySelectorAll('input#preco')


let carrinho = {
    produtos: [],
    total: 0
}

class ProdutoNoCarrinho {
    constructor(nome, quantidade, preco) {
        this.nome = nome
        this.quantidade = quantidade
        this.preco = preco
    }
}




btnComprar.addEventListener('click', () => {
    adicionaProdutoAoCarrinho('Macã')

})



btnCarrinho.addEventListener('click', () => {
    visualizarCarrinho()
})


visualizarCarrinho = () => {
    event.preventDefault()
    for (i = 0; i < carrinho.produtos.length; i++) {
        let produtoAtual = carrinho.produtos[i]
        alert(`Produto: ${produtoAtual.nome} Quantidade: ${produtoAtual.quantidade}`)
    }

}

adicionaProdutoAoCarrinho = (nome) => {
    event.preventDefault()
    for (i = 0; i < inputQuantidade.length; i++) {
        let quantidade = inputQuantidade[i].value
        if (quantidade) {
            let preco = quantidade * inputPreco[i].value
            carrinho.produtos.push(produto = new ProdutoNoCarrinho(nome, quantidade, preco))
            carrinho.total = carrinho.total + produto.preco
        } else{
            alert(`Digite a quantidade de produtos`)
        }
    }
    inputTotal.value = carrinho.total

}




criaProduto = () => {

}





