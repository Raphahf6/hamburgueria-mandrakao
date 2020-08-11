window.onload = function () {
    let btnCarrinho = document.getElementById('btn-carrinho')


    let carrinho = {
        produtos: [],
        total: 0
    }

    class ProdutoNoCatalogo {
        constructor(nome, img, preco, botaoComprar, inputQuantidade) {
            this.nome = nome
            this.img = img
            this.preco = preco
            this.comprar = botaoComprar
            this.quantidade = inputQuantidade

        }


    }


    class ProdutoNoCarrinho {
        constructor(nome, quantidade, preco) {
            this.nome = nome
            this.quantidade = quantidade
            this.preco = preco
        }
    }


    let uva = new ProdutoNoCatalogo('Uva', document.getElementById('imgUva'), document.getElementById('precoUva'), document.getElementById('comprarUva'), document.getElementById('quantidadeUva'))
    let uvaSemCaroco = new ProdutoNoCatalogo('Uva sem caroço', document.getElementById('imgUvaSemCaroco'), document.getElementById('precoUvaSemCaroco'), document.getElementById('comprarUvaSemCaroco'), document.getElementById('quantidadeUvaSemCaroco'))
    let maca = new ProdutoNoCatalogo('Maça', document.getElementById('imgMaca'), document.getElementById('precoMaca'), document.getElementById('comprarMaca'), document.getElementById('quantidadeMaca'))



    uva.comprar.addEventListener('click', () => {
        adicionaProdutoAoCarrinho(uva)
    })



    uvaSemCaroco.comprar.addEventListener('click', () => {
        adicionaProdutoAoCarrinho(uvaSemCaroco)

    })

    maca.comprar.addEventListener('click', () => {
        adicionaProdutoAoCarrinho(maca)

    })

    btnCarrinho.addEventListener('click', () => {
        visualizarCarrinho()
    })




    visualizarCarrinho = () => {
        for (i = 0; i < carrinho.produtos.length; i++) {
            let produtoAtual = carrinho.produtos[i]
            carrinho.total += produtoAtual.preco
            alert(`Produto: ${produtoAtual.nome} `)
        }
        alert(`Total: ${carrinho.total} reais`)
    }

    adicionaProdutoAoCarrinho = (produto) => {

        if (produto.quantidade.value && produto.preco.value) {
            let preco = produto.quantidade.value * produto.preco.value
            carrinho.produtos.push(produto = new ProdutoNoCarrinho(produto.nome, produto.quantidade.value, preco))
            alert(`O item ${produto.nome}, Quantidade: ${produto.quantidade} foi adicionado ao carrinho`)
        } else {
            alert(`Selecione a quantidade de produto que deseja primeiro`)
        }

    }

}