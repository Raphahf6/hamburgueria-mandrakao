window.onload = () => {
    const div = document.createElement('div')
    const divModal = document.getElementById('modal-body')
    const divCardapio = document.getElementById('cardapio')
    const urlProdutos = 'http://localhost:3000/produtos'
    const urlCarrinho = 'http://localhost:3000/carrinho'
    div.className = 'container'

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
                    constructor(nome, quantidade, preco) {
                        this.nome = nome
                        this.quantidade = quantidade
                        this.preco = preco
                    }
                }


                btnComprar.addEventListener('click', () => {
                    //adicionaProdutoAoCarrinho(produtoAtual)
                    if (inputQuantidade.value) {
                        event.preventDefault()
                        let preco = inputPreco * inputQuantidade.value
                        console.log(preco)
                        console.log(inputPreco * inputQuantidade.value)


                        let novoProduto = new ProdutoNoCarrinho(produtoAtual.nome, inputQuantidade.value, preco)
                        console.log(novoProduto)

                        //   axios.post(urlCarrinho, {
                        //       "nome": "novoProduto.nome",
                        //       "preco": "novoProduto.preco",
                        //       "quantidade": "novoProduto.quantidade"
                        //   })
                        //       .then(response => {
                        //           alert('Adicionado ao carrinho')
                        //       })

                        carrinho.total = carrinho.total + novoProduto.preco
                        inputTotal.value = carrinho.total

                        divModal.innerHTML += `<strong id="carrinho-produtos"> <img id="img-produto-carrinho"src="${produtoAtual.imgUrl}">Produto: ${novoProduto.nome} Quantidade: ${novoProduto.quantidade} Preco: ${novoProduto.preco} <button class="btn" id="remove-produto">X</button><br>
                         </strong>`
                        alert(`${produtoAtual.nome} adicionado ao carrinho`)
                    } else {
                        alert('Insira a quantidade primeiro')
                    }

                })


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

            let carrinho = {
                produtos: [],
                total: 0
            }







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
            alert(`Endereço da API local não encontrado`)
        })


}












