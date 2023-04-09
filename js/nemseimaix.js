'use strict'
const fetchData = async function() {
    let matricula = localStorage.getItem('matricula')

    let url = `https://api-lionschool.onrender.com/v1/lion-school/alunos/${matricula}`

    let response = await fetch(url)
    let data = await response.json()


    return data
}
const criarAluno = function(aluno) {

    let container = document.getElementById('container-aluno-unico')

    let odio = document.createElement('div')
    odio.classList.add('card-aluno-unico')

    let img = document.createElement('img')
    img.classList.add('img-aluno-unico')
    img.src = aluno.Foto

    let nome = document.createElement('p')
    nome.classList.add('nome')
    nome.textContent = aluno.Aluno

    odio.append(img, nome)

    container.append(odio)
    return container
}

const ctx = document.getElementById('myChart');

const carregarAluno = async function() {

    let aluno = await fetchData()

    let containerChart = document.getElementById('container')

    let student = aluno.aluno.map(criarAluno)
    containerChart.replaceChildren(...student)
}
carregarAluno()


const updateChart = async function() {
    const data = await fetchData()
    const disciplineName = data.aluno[0].Disciplinas.map((index) => {
        return index.nome
    })
    const disciplineAverage = data.aluno[0].Disciplinas.map((index) => {
        return index.media
    })

    let arrayColors = [];
    disciplineAverage.forEach((mediaMateria) => {
        if (mediaMateria >= 0 && mediaMateria < 50) {
            arrayColors.push("rgba(193, 16, 16, 1)");
        } else if (mediaMateria >= 50 && mediaMateria < 80) {
            arrayColors.push("rgba(229, 182, 87, 1)");
        } else if (mediaMateria >= 80 && mediaMateria <= 100) {
            arrayColors.push("rgba(51, 71, 176, 1)");
        }
    });


    new Chart(ctx, {
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
}