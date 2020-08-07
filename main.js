window.onload = function () {

    let carrinho = {
        produtos: []
    }

    class Produto {
        constructor(nome, img, preco, botaoComprar, inputQuantidade) {
            this.nome = nome
            this.img = img
            this.preco = preco
            this.comprar = botaoComprar
            this.quantidade = inputQuantidade

        }


    }

    let visualizarCarrinho = document.getElementById('btn-carrinho')

    let uva = new Produto('Uva', document.getElementById('imgUva'), document.getElementById('precoUva'), document.getElementById('comprarUva'), document.getElementById('quantidadeUva'))
    let uvaSemCaroco = new Produto('Uva sem caroço', document.getElementById('imgUvaSemCaroco'), document.getElementById('precoUvaSemCaroco'), document.getElementById('comprarUvaSemCaroco'), document.getElementById('quantidadeUvaSemCaroco'))
    let maca = new Produto('Maça', document.getElementById('imgMaca'), document.getElementById('precoMaca'), document.getElementById('comprarMaca'), document.getElementById('quantidadeMaca'))



    uva.comprar.addEventListener('click', () => {
        let preco = uva.quantidade.value * uva.preco.value
        alert(`Total: ${preco}`)
        carrinho.produtos.push(ProdutoUva = {
            nome: uva.nome,
            preco: preco,
            quantidade: uva.quantidade.value
        })

        alert(`O item ${uva.nome} foi adicionado ao carrinho`)

    })

    uvaSemCaroco.comprar.addEventListener('click', () => {
        let preco = uvaSemCaroco.quantidade.value * uvaSemCaroco.preco.value
        carrinho.produtos.push(ProdutoUvaSemCaroco = {
            nome: uvaSemCaroco.nome,
            preco: preco,
            quantidade: uvaSemCaroco.quantidade.value
        })
        alert(`O item ${uvaSemCaroco.nome} foi adicionado ao carrinho`)
    })

    maca.comprar.addEventListener('click', () => {
        let preco = maca.quantidade.value * maca.preco.value
        carrinho.produtos.push(ProdutoMaca = {
            nome: maca.nome,
            preco: preco,
            quantidade: maca.quantidade.value
        })
        alert(`O item ${maca.nome} foi adicionado ao carrinho`)
    })

    visualizarCarrinho.addEventListener('click', () => {
        for (i = 0; i < carrinho.produtos.length; i++) {
            alert(`Produto ${carrinho.produtos[i].nome} Quantidade: ${carrinho.produtos[i].quantidade} Preco: ${carrinho.produtos[i].preco}`)
            
        }

    })


    criarNovoProduto = (nome, img, preco) => {
        const novoProduto = new Produto(nome, img, preco)

        const container = document.querySelector('.row')
        const divElement = document.createElement('div').className('col-sm-12 col-lg-4')
        const cardElement = document.createElement('div').className('card')
        const imgCard = document.createElement('img').className('card-img-top')
        const cardBody = document.createElement('div').className('card-body')
        const nomeProduto = document.createElement('h5').className('card-title')
        const cardText = document.createElement('p').className('card-text')
        const inputPreco = document.createElement('input').id(`preco${nome}`)
        const inputQuantidade = document.createElement('input').className(`${nome}Quantidade`)

        imgCard.setAttribute("src", novoProduto.img)
        nomeProduto.textContent = novoProduto.nome
        cardText.textContent = 'Preco:'
        inputPreco.setAttribute('value', preco)


    }

}