const getStudentInformartions = () => {

    const fetchData = async() => {

        let aluno = localStorage.getItem('matricula')
        let url = `https://api-lionschool.onrender.com/v1/lion-school/alunos/${aluno}`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    var largura = window.innerWidth;

    const ctx = document.getElementById("myChart");
    ctx.style.height = '500px'
    ctx.style.width = '700px'

    if (largura < 400) {
        ctx.style.height = '300px'
        ctx.style.width = '350px'
    } else if (largura <= 650) {
        ctx.style.height = '300px'
        ctx.style.width = '500px'
    }

    const updateChart = async() => {
        const data = await fetchData();

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

    }

    const studentsInfo = async() => {
        let aluno = await fetchData()
        console.log(aluno);
        const container = document.getElementById("container");

        let studentProfile = document.getElementById('container-aluno-unico')

        let card = document.createElement('div')
        card.classList.add('card-aluno-unico')

        let img = document.createElement('img')
        img.classList.add('img-aluno-unico')
        img.src = aluno.aluno[0].Foto

        let nome = document.createElement('p')
        nome.classList.add('nome')
        nome.textContent = aluno.aluno[0].Aluno

        card.append(img, nome)
        studentProfile.append(card)
        container.replaceChildren(studentProfile, ctx);
    };

    studentsInfo();
    updateChart();
};
getStudentInformartions();