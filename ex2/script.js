/* 
Avaliação 2 - Houve um vestibular para ingresso de alunos na instituição baseado em 5 matérias: Natureza, Humanas, Linguagens, Matemática e Redação com notas de 0 a 1000. 
Precisa-se de um sistema que cadastre o nome completo, número de inscrição, ano de nascimento e as matérias com as notas dos vestibulandos de 5 até 20 pessoas.
A mensagem "Aprovado", nas matérias acima de 550;
A mensagem "Reprovado", nas matérias abaixo de 400;
A mensagem "Recuperação", nas matérias entre 401 e 549.
Exiba todos os dados cadastrados e os seus resultados na página HTML.
Regras
Todos os campos devem ser válidos e cumprir os requisitos mínimos de validação. Os anos de nascimento ficam entre 1901 e 2007.
Número de Inscrição tem 10 digitos sendo que deve começar com 2024XXXXXX. */
principal2();
function principal2() {
    const nomes = [];
    const matriculas = [];
    const anosDeNascimento = [];
    const notas = [];
    let continuar = true;

    while (continuar && nomes.length < 20) {
        cadastrarAlunos(nomes, matriculas, anosDeNascimento, notas);
        if (nomes.length >= 2) {
            continuar = confirm("Deseja continuar o cadastro? (OK para sim, Cancelar para não)");
        }
    }
    exibirCadastrodeAlunos(nomes, matriculas, anosDeNascimento, notas);
}

function cadastrarAlunos(nomes, matriculas, anosDeNascimento, notas) {
    const nome = obterNome(nomes.length + 1);
    const numeroDeInscricao = obterInscricao(nomes.length + 1);
    const anoDeNascimento = obterNascimento(nomes.length + 1);
    const notasAluno = obterNotas(nomes.length + 1);

    // Adicionando os dados às listas
    nomes.push(nome);
    matriculas.push(numeroDeInscricao);
    anosDeNascimento.push(anoDeNascimento);
    notas.push(notasAluno);
}

function obterNome(indice) {
    let nome;
    do {
        nome = prompt(`Informe nome e sobrenome do ${indice}º aluno:`).trim();
        if (nome === "") {
            alert("Nome inválido. O campo não pode estar vazio.");
        } else if (/[0-9]/.test(nome)) {
            alert("Nome inválido. O nome não pode conter números.");
        } else if (nome.indexOf(" ") < 3) {
            alert("Nome inválido. Você deve informar seu nome e sobrenome.");
        }
    } while (nome === '' || /[0-9]/.test(nome) || nome.indexOf(" ") < 3);
    return nome;
}

function obterInscricao(indice) {
    let inscricao;
    do {
        inscricao = prompt(`Informe o número da ${indice}º inscrição (10 dígitos):`).trim();
        if (inscricao === "") {
            alert("Inscrição inválida. O campo não pode estar vazio.");
        } else if (inscricao.length !== 10 || inscricao.substring(0, 4) !== "2024") {
            alert("Inscrição inválida. A inscrição deve ter exatamente 10 dígitos e começar com 2024.");
        } else if (isNaN(inscricao)) {
            alert("Inscrição inválida. A inscrição deve conter apenas números.");
        }
    } while (inscricao === "" || inscricao.length !== 10 || inscricao.substring(0, 4) !== "2024" || isNaN(inscricao));
    
    return inscricao;
}

function obterNascimento(indice) {
    let ano;
    do {
        ano = prompt(`Informe o ano de nascimento do ${indice}º aluno (entre 1901 e 2007):`).trim();
        if (ano === "" || isNaN(ano) || ano < 1901 || ano > 2007) {
            alert("Ano de nascimento inválido. Deve ser um número entre 1901 e 2007.");
        }
    } while (ano === "" || isNaN(ano) || ano < 1901 || ano > 2007);
    return ano;
}

function obterNotas() {
    const materias = ["Natureza", "Humanas", "Linguagens", "Matemática", "Redação"];
    const notasAluno = [];
    for (let i = 0; i < materias.length; i++) {
        let nota;
        do {
            nota = prompt(`Informe a nota obtida em ${materias[i]} (0 a 1000):`).trim();
            nota = parseFloat(nota);
            if (nota === "" || isNaN(nota) || nota < 0 || nota > 1000) {
                alert("Nota inválida. Deve ser um número entre 0 e 1000.");
            }
        } while (nota === "" || isNaN(nota) || nota < 0 || nota > 1000);
        notasAluno.push(nota);
    }
    return notasAluno;
}

function exibirCadastrodeAlunos(nomes, matriculas, anosDeNascimento, notas) {
    const materias = ["Natureza", "Humanas", "Linguagens", "Matemática", "Redação"];
    let mensagem = "<h1>Cadastro de Alunos</h1>";
    const statusNotas = ["Aprovado", "Recuperação", "Reprovado"];
    /* O "loop for" externo, que usa i, itera sobre cada aluno na lista de nomes.
          O "loop for" interno, que usa j, itera sobre cada nota do aluno atual. */
    for (let i = 0; i < nomes.length; i++) {
        mensagem += `<h2>${i + 1}° Aluno:</h2>
            <p>Nome: ${nomes[i]}</p>
            <p>Inscrição: ${matriculas[i]}</p>
            <p>Ano de Nascimento: ${anosDeNascimento[i]}</p>
            <p>Notas:</p>`;

        for (let j = 0; j < notas[i].length; j++) {
            let status;
            if (notas[i][j] > 550) {
                status = statusNotas[0];
            } else if (notas[i][j] < 400) {
                status = statusNotas[2];
            } else {
                status = statusNotas[1];
            }
           mensagem += `<p>${materias[j]}: ${notas[i][j]} - ${status}</p>`;
        }
        mensagem += `<br>`;
    }
    document.write(mensagem);
}
