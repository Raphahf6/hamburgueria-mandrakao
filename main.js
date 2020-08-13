window.onload = () => {
    const div = document.createElement('div')
    const btnModal = document.getElementById('modal')
    const divModal = document.getElementById('modal-body')
    const url = 'http://localhost:3000/produtos'
    div.className = 'container'

    axios.get(url)
        .then(response => {
            const api = response.data
            const { nome, preco } = api
            const container = document.createElement('div')
            container.className = 'container'
            container.id = 'app'
            const divRow = document.createElement('div')
            divRow.className = 'row'



            for (i = 0; i < api.length; i++) {
                let produtoAtual = api[i]
                let divCard = document.createElement('div')
                divCard.className = 'col-sm-12 col-lg-12'
                divCard.innerHTML = `
                <div class="card text-center text-white bg-dark">
                    <img src="${produtoAtual.imgUrl}" class="card-img-top" alt="..." id="imgProduto">
                    <div class="card-body">
                        <h5 class="card-title">${produtoAtual.nome}</h5>
                        <p class="card-text">
                            Preço:<input value="${produtoAtual.preco}" class="preco" id="preco" disabled></p>


                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="quantidade" placeholder="Quantidade"
                                aria-label="Digite a quantidade" aria-describedby="button-addon2">
                                <button class="btn" id="comprar">Adicionar ao carrinho</button>


                        </div>
                    </div>
                </div>
                `
                divRow.appendChild(divCard)
                container.appendChild(divRow)
                divModal.appendChild(container)


            }
            const inputTotal = document.getElementById('total')
            const btnComprar = document.querySelectorAll('button#comprar')
            const inputQuantidade = document.querySelectorAll('input#quantidade')
            const inputPreco = document.querySelectorAll('input#preco')
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

            class ProdutoNoCarrinho {
                constructor(nome, quantidade, preco) {
                    this.nome = nome
                    this.quantidade = quantidade
                    this.preco = preco
                }
            }



            for (i = 0; i < btnComprar.length; i++) {
                btnComprar[i].addEventListener('click', () => {
                    adicionaProdutoAoCarrinho('lanche')

                })
            }

            adicionaProdutoAoCarrinho = (nome) => {
                event.preventDefault()
                for (i = 0; i < inputQuantidade.length; i++) {
                    let quantidade = inputQuantidade[i].value
                    console.log(quantidade)
                    console.log(inputPreco[i].value)

                    let preco = quantidade * inputPreco[i].value
                    console.log(preco)
                    carrinho.produtos.push(produto = new ProdutoNoCarrinho(nome, quantidade, preco))
                    carrinho.total = carrinho.total + produto.preco

                }
                inputTotal.value = carrinho.total

            }

            const btnLimparCarrinho = document.getElementById('limpar-carrinho')

            btnLimparCarrinho.addEventListener('click', () =>{
                limparCarrinho()
            })

            limparCarrinho = () => {
                carrinho.total = 0
                inputTotal.value = carrinho.total
            }
        })

        .catch(err => {
            console.log(err)
        })




}








