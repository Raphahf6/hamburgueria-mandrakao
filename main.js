const div = document.createElement('div')
const btnCarrinho = document.getElementById('modal')
const divModal = document.getElementById('modal-body')
const divCardapio = document.getElementById('cardapio')
const urlProdutos = 'http://localhost:3000/produtos'
const urlCarrinho = 'http://localhost:3000/carrinho'
div.className = 'container'

let carrinho = {
    produtos: [],
    total: 0
}


axios.get(urlProdutos)
    .then(response => {
        const api = response.data
        const container = document.createElement('div')
        container.className = 'container'
        container.id = 'app'
        const divRow = document.createElement('div')
        divRow.className = 'row'



        for (i = 0; i < api.length; i++) {
            let produtoAtual = api[i]
            let divCard = document.createElement('div')
            divCard.className = 'col-sm-12 col-lg-4'
            divCard.innerHTML = ` 
                <div class="card text-center text-white bg-dark">
                    <img src="${produtoAtual.imgUrl}" class="card-img-top" alt="..." id="imgProduto">
                    <div class="card-body">
                        <h5 class="card-title">${produtoAtual.nome}</h5>
                        <p class="card-text">
                            Preço:<input value="${produtoAtual.preco}" class="preco" id="preco-${produtoAtual.id}" disabled></p>


                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="quantidade-${produtoAtual.id}" placeholder="Quantidade"
                                aria-label="Digite a quantidade" aria-describedby="button-addon2">
                                <button class="btn" id="comprar-${produtoAtual.id}">Adicionar ao carrinho</button>


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
                if (inputQuantidade.value) {
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
                    carrinho.total = carrinho.total + novoProduto.preco
                    inputTotal.value = carrinho.total



                    divModal.innerHTML += `<ul class="list-group" id="carrinho-${novoProduto.id}" style="list-style: none;"> <li id="carrinho-produtos-${novoProduto.id}"> <img id="img-produto-carrinho" src="${produtoAtual.imgUrl}"> Produto: ${novoProduto.nome} Quantidade: ${novoProduto.quantidade} Preco: ${novoProduto.preco}<button  class="btn" id="btn-produtos-${novoProduto.id}">X</button><br>
                    </li></ul>`
                    alert(`${novoProduto.nome} Quantidade: ${novoProduto.quantidade} foi adicionado ao carrinho`)





                } else {
                    alert('Insira a quantidade primeiro')
                }
            })


        }

        btnCarrinho.addEventListener('click', () => {
            if (carrinho.produtos.length > 0) {
                for (i = 0; i < carrinho.produtos.length; i++) {
                    let produtoAtualNoCarrinho = carrinho.produtos[i]
                    let btnRemoveProduto = document.getElementById(`btn-produtos-${produtoAtualNoCarrinho.id}`)

                    btnRemoveProduto.addEventListener('click', () => {
                        let divCarrinho = document.getElementById(`carrinho-${produtoAtualNoCarrinho.id}`)
                        let listaCarrinho = document.getElementById(`carrinho-produtos-${produtoAtualNoCarrinho.id}`)
                        divCarrinho.outerHTML = ''
                        carrinho.produtos.splice(produtoAtualNoCarrinho, 1)
                        carrinho.total -= produtoAtualNoCarrinho.preco
                        inputTotal.value = carrinho.total



                    })
                }
            }
        })




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
            inputTotal.value = carrinho.total
            divModal.innerHTML = ''
        }


    })





    .catch(err => {
        alert(`${err}`)
    })



















