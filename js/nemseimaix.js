'use strict'
const fetchData = async function() {
    let matricula = localStorage.getItem('matricula')

    let url = `https://api-lionschool.onrender.com/v1/lion-school/alunos/${matricula}`

    let response = await fetch(url)
    let data = await response.json()


    return data
}
const criarAluno = function(aluno) {

    let odio = document.createElement('div')
    odio.classList.add('card-aluno-unico')

    let img = document.createElement('img')
    img.classList.add('img-aluno-unico')
    img.src = aluno.Foto

    let nome = document.createElement('p')
    nome.classList.add('nome')
    nome.textContent = aluno.Aluno

    odio.append(img, nome)

    return odio
}

const carregarAluno = async function() {

    let aluno = await fetchData()

    let container = document.getElementById('container-aluno-unico')
    let containerChart = document.getElementById('container-chart')

    let student = aluno.aluno.map(criarAluno)
    container.replaceChildren(...student)
    containerChart.replaceChildren(ctx)

    updateChart()


}
carregarAluno()

const ctx = document.getElementById('myChart');

const updateChart = async function() {
    const data = await fetchData()
    const disciplineName = data.aluno[0].Disciplinas.map((index) => {
        return index.nome
    })
    const disciplineAverage = data.aluno[0].Disciplinas.map((index) => {
        return index.media
    })
}

const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: disciplineName,
        datasets: [{
            label: `Media de Notas`,
            data: disciplineAverage,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: arrayColors,
        }, ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});