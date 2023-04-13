'use strict'

//Constante que faz a criação do dos cards chmando pelo parametro de curso
const criarCardsCurso = (curso) => {


    let nome = curso.nome.split(' ')[4] + ' ' + curso.nome.split(' ')[5] + ' ' + curso.nome.split(' ')[6]

    //Constant que cria o elemento na constante card
    const card = document.createElement('a')

    //Card que tem a propriedade "href" para ser criada no caminho "tela-alunos"
    card.href = "../html/tela-alunos.html"

    //Card que vai ser adicionado no elemento "box"
    card.classList.add('box')

    //Card que tem a propriedade "id" e vai filtrar o curso pela sigla
    card.id = curso.sigla


    //Constante que img que vai criar o elemento img
    const img = document.createElement('img')


    //Img vai adicionar no parametro imagem
    img.classList.add('imagem')


    //Img com a propriedade de string "src" vai receber o curso pela sigla e adicionar na pasta img
    img.src = `../img/${curso.sigla}.png`


  //Costante nome vai receber o elemento criado "span"
    const name = document.createElement('span')


    //Dentro da propriedade nome vai ser adicionado o prametro "nome"
    name.classList.add('nome')


    
    name.textContent = nome

    card.append(img, name)

    card.addEventListener('click', function() {
        localStorage.setItem("id", card.id);
        localStorage.setItem("curso", nome);
    })
    return card

}
const carregarCardsCurso = async() => {

    let url = "https://api-lionschool.onrender.com/v1/lion-school/cursos"

    let response = await fetch(url)
    let data = await response.json()
    let cursos = await data.cursos

    const buttons = document.getElementById('boxs')

    const courses = cursos.map(criarCardsCurso)

    buttons.replaceChildren(...courses)

}

const criarCardsAlunos = (alunos) => {

    const aluno = document.createElement('a')
    aluno.id = alunos.matricula
    aluno.href = '../html/tela-matricula.html'

    if (alunos.status == 'Cursando')
        aluno.classList.add('alunos-cursando')
    else
        aluno.classList.add('alunos-finalizado')


    const imgAluno = document.createElement('img')
    imgAluno.classList.add('aluno')
    imgAluno.src = alunos.foto


    const nomeAluno = document.createElement('p')
    nomeAluno.classList.add('nome')
    nomeAluno.textContent = alunos.nome.toUpperCase()

    aluno.addEventListener('click', function() {
        localStorage.setItem('matricula', aluno.id)
    })


    aluno.append(imgAluno, nomeAluno)

    return aluno
}
const carregarCardsAlunos = async() => {

    const comboBoxStatus = document.getElementById('selectStatus')
    const comboBoxConclusao = document.getElementById('selectConclusao')

    let curso = localStorage.getItem('id')
    let status = comboBoxStatus.value
    let conclusao = comboBoxConclusao.value

    const gerarEstudantes = async function(status = 'Status', conclusao = "Conclusao") {
        //status = 'Status' => É quando o status está undefined, o mesmo acontece com conclusao

        let url = `https://api-lionschool.onrender.com/v1/lion-school/alunos?curso=${curso}`

        if (status != 'Status' && conclusao == 'Conclusao') {
            url = `https://api-lionschool.onrender.com/v1/lion-school/alunos?status=${status}&curso=${curso}`
        } else if (status == "Status" && conclusao != "Conclusao") {
            url = `https://api-lionschool.onrender.com/v1/lion-school/alunos?curso=${curso}&conclusao=${conclusao}`
        } else if (status != 'Status' && conclusao != "Conclusao") {
            url = `https://api-lionschool.onrender.com/v1/lion-school/alunos?status=${status}&curso=${curso}&conclusao=${conclusao}`

        }
        let response = await fetch(url)
        if (response.status != 404) {
            let data = await response.json()
            let alunos = data.alunos
            let container = document.getElementById('container-alunos')
            let students = alunos.map(criarCardsAlunos)
            container.replaceChildren(...students)
        } else {
            let title = document.createElement('h2')
            title.classList.add('title')
            title.textContent = "Não há alunos com esse filtro"

            let container = document.getElementById('container-alunos')

            container.replaceChildren(title)
        }
    }

    comboBoxStatus.addEventListener('click', async function() {

        gerarEstudantes(comboBoxStatus.value, comboBoxConclusao.value)
    })

    comboBoxConclusao.addEventListener('click', function() {
        gerarEstudantes(comboBoxStatus.value, comboBoxConclusao.value)
    })
    gerarEstudantes()
}
const carregarTitle = () => {

    const title = document.createElement('h2')
    title.classList.add('title')
    title.textContent = localStorage.getItem('curso')

    document.getElementById('titulo-curso').replaceChildren(title)
}

const criarConclusao = function(conclusao) {

    const selectConclusao = document.getElementById('selectConclusao')

    const ano = document.createElement('option')

    ano.value = conclusao

    ano.textContent = conclusao

    selectConclusao.append(ano)

    return selectConclusao
}

const carregarConclusao = async function() {

    let curso = localStorage.getItem('id')

    const comboBoxConclusao = document.getElementById('selectConclusao')

    let url = "https://api-lionschool.onrender.com/v1/lion-school/conclusao/alunos"

    let response = await fetch(url)
    let data = await response.json()
    let alunos = data.conclusao

    const select = document.getElementById('conclusao')
    const students = alunos.map(criarConclusao)

    select.replaceChildren(...students)

}




carregarCardsCurso()
carregarCardsAlunos()
carregarTitle()
carregarConclusao()