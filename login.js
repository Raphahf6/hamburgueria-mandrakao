const inputLogin = document.querySelector('#login')
const inputSenha = document.querySelector('#password')
const btnLogin = document.querySelector('#btnLogin')
const cadastrarUsuario = document.querySelector('#cadastrar-usuario')


class Usuario {
    constructor(login, senha, isAdmin) {
        this.login = login
        this.senha = senha
        this.admin = isAdmin
    }


}


let usuarios = [
    raphael = new Usuario('raphael', '58723624', true)
]

btnLogin.addEventListener('click', () => {
    login()
})

cadastrarUsuario.addEventListener('click', () => {
    cadastroDeUsuario()
})

cadastroDeUsuario = () => {
    event.preventDefault()

    if (inputLogin.value && inputSenha.value) {
        let novoUsuario = new Usuario(inputLogin.value, inputSenha.value, false)
        usuarios.push(novoUsuario)
        alert(`Usuario ${novoUsuario.login} cadastrado com sucesso!`)
    } else{
        alert(`Digite um login e senha para o cadastro`)
    }

}


login = () => {
    event.preventDefault()
    for (i = 0; i < usuarios.length; i++) {
        let usuarioAtual = usuarios[i]
        if (usuarioAtual.login === inputLogin.value && usuarioAtual.senha === inputSenha.value) {
            location.href = 'mercado.html'
        }
    }
}


