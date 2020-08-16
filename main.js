const div = document.createElement('div')
const btnCarrinho = document.getElementById('modal')
const divModal = document.getElementById('modal-body')
const divCardapio = document.getElementById('cardapio')
const divBebidas = document.getElementById('cardapio-bebidas')
const urlProdutos = 'https://raphahf6.github.io/hamburgueria-mandrakao/db.json'
div.className = 'container'
const btnDark = document.getElementById('dark-mode')
const btnLight = document.getElementById('light-mode')

btnLight.addEventListener('click', () =>{
    document.body.setAttribute('style', 'background-color: #EFD09E;')
    const tituloProdutos = document.querySelectorAll('div#titulo-produtos')
    for(i = 0; i < tituloProdutos.length; i++){
        tituloProdutos[i].setAttribute('style', 'color: black;')

    }
})

btnDark.addEventListener('click', () =>{
    document.body.setAttribute('style', 'background-color: #272932;')
    const tituloProdutos = document.querySelectorAll('div#titulo-produtos')
    for(i = 0; i < tituloProdutos.length; i++){
        tituloProdutos[i].setAttribute('style', 'color: #F0F8EA;')

    }
})


class Carrinho {
    constructor() {
        this.id = []
        this.produtos = []
        this.total = 0
    }

    adicionaProdutoAoCarrinho(produto) {
        this.id.push(produto.id)
        this.produtos.push(produto)
        this.total += produto.preco
    }

    subtraiTotal(novoTotal) {
        this.total -= novoTotal
    }

    somaTotal(preco) {
        this.total += preco
    }

    removeProduto(produto) {
        this.produtos.splice(produto.id)

    }
}

let carrinho = new Carrinho()

class ProdutoNoCarrinho {
    constructor(nome, quantidade, preco, id) {
        this.nome = nome
        this.quantidade = quantidade
        this.preco = preco
        this.id = id
    }

    alteraQuantidade(novaQuantidade) {
        this.quantidade += novaQuantidade
    }

    alteraPreco(novoPreco) {
        this.preco += novoPreco
    }



    produtoExiste(produto) {

    }
}

const inputTotal = document.getElementById('total')
const footer = document.createElement('footer')
footer.className = 'container-fluid bg-dark text-light p-5 mt-3'
footer.innerHTML = `
                        <div class="d-flex bd-highlight">
                            <div class="mr-auto bd-highlight">
                        <p>Hamburgueria Mandrakao®</p>
                        </div>
                            <div class=" bd-highlight"><a href="https://www.arbyte.com.br/"><img src="assets/img/favicon.ico"
                                alt="Logo Arbyte" class="brand-icon ml-auto"></a></div>
                            </div>
                            `

document.body.appendChild(footer)



const btnLimparCarrinho = document.getElementById('limpar-carrinho')


btnLimparCarrinho.addEventListener('click', () => {
    limparCarrinho()
})

limparCarrinho = () => {
    carrinho.total = 0
    carrinho.produtos.splice(0, carrinho.produtos.length)
    inputTotal.value = carrinho.total
    divModal.innerHTML = ''
}


axios.get(urlProdutos)
    .then(response => {
        const api = response.data
        const {hamburgueres} = api
        console.log(hamburgueres)

        const container = document.createElement('div')
        container.className = 'container'
        container.id = 'app'
        const divRow = document.createElement('div')
        divRow.className = 'row'



        for (i = 0; i < hamburgueres.length; i++) {
            let produtoAtual = hamburgueres[i]
            let divCard = document.createElement('div')
            divCard.className = 'col-sm-12 offset-sm-0 col-md-5 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0'
            divCard.innerHTML = ` 
                <div class="card text-center text-white bg-dark">
                    <img src="${produtoAtual.imgUrl}" class="card-img-top" alt="..." id="imgProduto">
                    <div class="card-body">
                        <h5 class="card-title">${produtoAtual.nome}</h5>
                        <p class="card-text">
                            Preço:<input value="${produtoAtual.preco}" class="preco text-black-50" id="preco-${produtoAtual.id}" disabled></p>


                        <div class="input-group mb-3">
                            <input type="text" class="form-control col-sm-12 col-md-12 col-lg-12 quantidade " id="quantidade-${produtoAtual.id}" placeholder="Quantidade"
                                aria-label="Digite a quantidade" aria-describedby="button-addon2">
                                <button type="button" class="btn col-sm-12 col-md-12 col-lg-12" id="comprar-${produtoAtual.id}">Adicionar ao carrinho</button>


                        </div>
                    </div>
                </div>
                `
            divRow.appendChild(divCard)
            container.appendChild(divRow)
            divCardapio.appendChild(container)

            const btnComprar = document.getElementById(`comprar-${produtoAtual.id}`)
            const inputQuantidade = document.getElementById(`quantidade-${produtoAtual.id}`)
            const inputPreco = document.getElementById(`preco-${produtoAtual.id}`).value

            class ProdutoNoCarrinho {
                constructor(nome, quantidade, preco, id) {
                    this.nome = nome
                    this.quantidade = quantidade
                    this.preco = preco
                    this.id = id
                }
            }

            btnComprar.addEventListener('click', () => {
                //adicionaProdutoAoCarrinho(produtoAtual)


                if (inputQuantidade.value === '') {
                    inputQuantidade.value = 1
                }

                event.preventDefault()
                let preco = inputPreco * inputQuantidade.value


                let novoProduto = new ProdutoNoCarrinho(produtoAtual.nome, inputQuantidade.value, preco, produtoAtual.id)

                //   axios.post(urlCarrinho, {
                //       "nome": "novoProduto.nome",
                //       "preco": "novoProduto.preco",
                //       "quantidade": "novoProduto.quantidade"
                //   })
                //       .then(response => {
                //           alert('Adicionado ao carrinho')
                //       })

                carrinho.produtos.push(novoProduto)
                carrinho.somaTotal(novoProduto.preco)
                inputTotal.value = carrinho.total



                divModal.innerHTML += `<ul class="list-group" id="carrinho-${novoProduto.id}" 
                    style="list-style: none;"> <li id="carrinho-produtos-${novoProduto.id}"> 
                    <img id="img-produto-carrinho" src="${produtoAtual.imgUrl}"> 
                    Produto: ${novoProduto.nome} Quantidade: ${novoProduto.quantidade} 
                    Preco: ${novoProduto.preco}<button type="button" class="btn-produtos" id="btn-produtos-${novoProduto.id}">x</button><br>
                    </li></ul>`
                alert(`${novoProduto.nome} Quantidade: ${novoProduto.quantidade} foi adicionado ao carrinho`)
                inputQuantidade.value = ''







            })


        }

        btnCarrinho.addEventListener('click', () => {
            if (carrinho.produtos.length > 0) {
                for (i = 0; i < carrinho.produtos.length; i++) {
                    let produtoAtualNoCarrinho = carrinho.produtos[i]
                    let btnRemoveProduto = document.getElementById(`btn-produtos-${produtoAtualNoCarrinho.id}`)

                    btnRemoveProduto.addEventListener('click', () => {
                        let divCarrinho = document.getElementById(`carrinho-${produtoAtualNoCarrinho.id}`)
                        divCarrinho.outerHTML = ''
                        carrinho.removeProduto(produtoAtualNoCarrinho, 1)
                        carrinho.subtraiTotal(produtoAtualNoCarrinho.preco)
                        inputTotal.value = carrinho.total



                    })
                }
            }
        })







    })





    .catch(err => {
        alert(`${err}`)
    })


    
axios.get(urlProdutos)
    .then(response => {
        const api = response.data
        const {bebidas} = api
        const container = document.createElement('div')
        container.className = 'container'
        container.id = 'app'
        const divRow = document.createElement('div')
        divRow.className = 'row'



        for (i = 0; i < bebidas.length; i++) {
            let produtoAtual = bebidas[i]
            let divCard = document.createElement('div')
            divCard.className = 'col-sm-12 offset-sm-0 col-md-5 offset-md-0 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0'
            divCard.innerHTML = ` 
                <div class="card text-center text-white bg-dark">
                    <img src="${produtoAtual.imgUrl}" class="card-img-top" alt="..." id="imgProduto">
                    <div class="card-body">
                        <h5 class="card-title">${produtoAtual.nome}</h5>
                        <p class="card-text">
                            Preço:<input value="${produtoAtual.preco}" class="preco text-black-50" id="preco-${produtoAtual.id}" disabled></p>


                        <div class="input-group mb-3">
                            <input type="text" class="form-control col-sm-12 col-md-12 col-lg-12 quantidade" id="quantidade-${produtoAtual.id}" placeholder="Quantidade"
                                aria-label="Digite a quantidade" aria-describedby="button-addon2">
                                <button type="button" class="btn col-sm-12 col-md-12 col-lg-12" id="comprar-${produtoAtual.id}">Adicionar ao carrinho</button>


                        </div>
                    </div>
                </div>
                `
            divRow.appendChild(divCard)
            container.appendChild(divRow)
            divBebidas.appendChild(container)

            const btnComprar = document.getElementById(`comprar-${produtoAtual.id}`)
            const inputQuantidade = document.getElementById(`quantidade-${produtoAtual.id}`)
            const inputPreco = document.getElementById(`preco-${produtoAtual.id}`).value

            class ProdutoNoCarrinho {
                constructor(nome, quantidade, preco, id) {
                    this.nome = nome
                    this.quantidade = quantidade
                    this.preco = preco
                    this.id = id
                }
            }

            btnComprar.addEventListener('click', () => {
                //adicionaProdutoAoCarrinho(produtoAtual)


                if (inputQuantidade.value === '') {
                    inputQuantidade.value = 1
                }

                event.preventDefault()
                let preco = inputPreco * inputQuantidade.value


                let novoProduto = new ProdutoNoCarrinho(produtoAtual.nome, inputQuantidade.value, preco, produtoAtual.id)

                //   axios.post(urlCarrinho, {
                //       "nome": "novoProduto.nome",
                //       "preco": "novoProduto.preco",
                //       "quantidade": "novoProduto.quantidade"
                //   })
                //       .then(response => {
                //           alert('Adicionado ao carrinho')
                //       })

                carrinho.produtos.push(novoProduto)
                carrinho.somaTotal(novoProduto.preco)
                inputTotal.value = carrinho.total



                divModal.innerHTML += `<ul class="list-group" id="carrinho-${novoProduto.id}" 
                    style="list-style: none;"> <li id="carrinho-produtos-${novoProduto.id}"> 
                    <img id="img-produto-carrinho" src="${produtoAtual.imgUrl}"> 
                    Produto: ${novoProduto.nome} Quantidade: ${novoProduto.quantidade} 
                    Preco: ${novoProduto.preco}<button type="button" class="btn-produtos" id="btn-produtos-${novoProduto.id}">x</button><br>
                    </li></ul>`
                alert(`${novoProduto.nome} Quantidade: ${novoProduto.quantidade} foi adicionado ao carrinho`)
                inputQuantidade.value = ''







            })


        }

        btnCarrinho.addEventListener('click', () => {
            if (carrinho.produtos.length > 0) {
                for (i = 0; i < carrinho.produtos.length; i++) {
                    let produtoAtualNoCarrinho = carrinho.produtos[i]
                    let btnRemoveProduto = document.getElementById(`btn-produtos-${produtoAtualNoCarrinho.id}`)

                    btnRemoveProduto.addEventListener('click', () => {
                        let divCarrinho = document.getElementById(`carrinho-${produtoAtualNoCarrinho.id}`)
                        divCarrinho.outerHTML = ''
                        carrinho.removeProduto(produtoAtualNoCarrinho, 1)
                        carrinho.subtraiTotal(produtoAtualNoCarrinho.preco)
                        inputTotal.value = carrinho.total



                    })
                }
            }
        })

    })
    .catch(err => {
        alert(`${err}`)
    })



















