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


    criarNovoProdutoNoCatalogo = (nome, imgUrl, preco) => {

        const novoProduto = new Produto(nome, imgUrl, preco)
        const container = document.querySelector('.row')
        const divElement = document.createElement('div').className('col-sm-12 col-lg-4')

        const cardElement = document.createElement('div').className('card')
        const cardBody = document.createElement('div').className('card-body')
        const cardText = document.createElement('p').className('card-text')
        const imgCard = document.createElement('img').className('card-img-top')

        const nomeProduto = document.createElement('h5').className('card-title')
        const inputPreco = document.createElement('input').id(`preco${nome}`)
        const inputQuantidade = document.createElement('input').className(`${nome}Quantidade`)
        

        imgCard.setAttribute("src", novoProduto.imgUrl)
        nomeProduto.textContent = novoProduto.nome
        cardText.textContent = 'Preco:'
        inputPreco.setAttribute('value', preco)

        divElement.appendChild(cardElement)
        divElement.appendChild(cardBody)
        divElement.appendChild(cardText)


    }

    visualizarCarrinho = () => {
        for (i = 0; i < carrinho.produtos.length; i++) {
            let produtoAtual = carrinho.produtos[i]
            carrinho.total += produtoAtual.preco
            alert(`Produto: ${produtoAtual.nome} `)
        }
        alert(`Total: ${carrinho.total} reais`)
    }

    adicionaProdutoAoCarrinho = (produto) => {

        if(produto.quantidade.value && produto.preco.value){
            let preco = produto.quantidade.value * produto.preco.value
            carrinho.produtos.push(produto = new ProdutoNoCarrinho(produto.nome, produto.quantidade.value, preco))
            alert(`O item ${produto.nome}, Quantidade: ${produto.quantidade} foi adicionado ao carrinho`)
        } else{
            alert(`Selecione a quantidade de produto que deseja primeiro`)
        }
        
    }

}