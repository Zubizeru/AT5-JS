/* Avaliação 1 - Crie um algoritmo de pagamento em que se cadastre os prestadores de serviço, pegando os seguintes dados: nome completo, um número do PIS/PASEP, 
o valor da sua hora trabalhada e a quantidade de horas trabalhadas de 5 a 50 pessoas. No fim dos cadastros deve-se mostrar os dados, 
o valor bruto do serviço e o líquido descontado na página html dos cadastrados.

Regras
Todos os campos devem ser válidos e cumprir os requisitos mínimos de validação.
O valor da hora: mínimo de 20 reais e máximo de 500 reais.
A quantidade de horas sempre estará entre 20 e 200 horas trabalhadas no mês.
O valor líquido do prestador de serviço tem descontos de impostos a recolher sendo o INSS (tabela), ISS (5%) e IR (tabela).. 

Valor (R$)
Até 1500,99
INSS
Alíquota
Valor (R$)
7,5%
Até 1500,99
De 1501 a 3000,99
9%
De 1501 a 2000,99

IRPF
Alíquota 0% 7,5%
De 3001 a 5000,99
12%
De 2001 a 3000,99
15%
De 5001 +
14%
De 3001 a 4000,99
22,5%
De 4001+
27,5%*/

principal1();
function principal1() {
    let nomes = [];
    let PASEP = [];
    let val_horarios = [];
    let quant_horas_trabalhadas = [];
    let continuar = true;

    while (continuar && nomes.length < 50) {
        cadastrarFuncionario(nomes, PASEP, val_horarios, quant_horas_trabalhadas);
        if (nomes.length >= 2) {
            continuar = confirm("Deseja continuar o cadastro? (OK para sim, Cancelar para não)");
        }
    }
    exibirCadastrodePrestadoresdeServico(nomes, PASEP, val_horarios, quant_horas_trabalhadas);
}

function cadastrarFuncionario(nomes, PASEP, val_horarios, quant_horas_trabalhadas) {
    let nome = CadastrarNome(nomes.length + 1);
    let PIS = CadastrarPIS(nomes.length + 1);
    let val_horas = Cadastrarvalordehoratrabalhada(nomes.length + 1);
    let hora_trabalhada = CadastrarHoratrabalhada(nomes.length + 1);

    // Adicionando os dados às listas
    nomes.push(nome);
    PASEP.push(PIS);
    val_horarios.push(val_horas);
    quant_horas_trabalhadas.push(hora_trabalhada);
}

function CadastrarNome(indice) {
    let nome = '';
    do {
        nome = prompt(`Informe nome e sobrenome do ${indice}º prestador de serviço:`).trim();
        if (nome === '' || /[0-9]/.test(nome) || nome.indexOf(" ") < 3) {
            alert("Nome inválido. Por favor, informe seu nome e sobrenome.");
        }
    } while (nome === '' || /[0-9]/.test(nome) || nome.indexOf(" ") < 3);
    return nome;
}

function CadastrarPIS(indice) {
    let PIS = '';
    do {
        PIS = prompt(`Informe o número PIS do ${indice}º prestador de serviço:`).trim();
        if (PIS === "" || !(/^[0-9]{11}$/.test(PIS))) {
            alert("PIS inválido, por favor, informe um PIS válido.");
        }
    } while (PIS === "" || !(/^[0-9]{11}$/.test(PIS)));
    return PIS;
}

function Cadastrarvalordehoratrabalhada(indice) {
    let val_horas;
    do {
        val_horas = prompt(`Informe o valor das horas trabalhadas mensais do ${indice}º prestador de serviço:`).trim();
        val_horas = parseFloat(val_horas);
        if (isNaN(val_horas) || val_horas < 20 || val_horas > 500) {
            alert("Valor inválido, por favor, informe um valor entre 20 e 500 reais.");
        }
    } while (isNaN(val_horas) || val_horas < 20 || val_horas > 500);
    return val_horas;
}

function CadastrarHoratrabalhada(indice) {
    let hora_trabalhada;
    do {
        hora_trabalhada = prompt(`Informe as horas trabalhadas mensais do ${indice}º prestador de serviço:`).trim();
        hora_trabalhada = parseFloat(hora_trabalhada);
        if (isNaN(hora_trabalhada) || hora_trabalhada < 20 || hora_trabalhada > 200) {
            alert("Horário inválido, por favor, informe um horário entre 20 e 200 horas mensais.");
        }
    } while (isNaN(hora_trabalhada) || hora_trabalhada < 20 || hora_trabalhada > 200);
    return hora_trabalhada;
}

function calcularImpostos(val_horas, hora_trabalhada) {
    const valorBruto = val_horas * hora_trabalhada;
    let inss, imposto_de_renda, imposto_sobre_serviço;

    if (valorBruto <= 1500.99) {
        inss = valorBruto * 0.075;
    } else if (valorBruto <= 3000.99) {
        inss = valorBruto * 0.09;
    } else if (valorBruto <= 5000.99) {
        inss = valorBruto * 0.12;
    } else {
        inss = valorBruto * 0.14;
    }

    if (valorBruto <= 2000.99) {
        imposto_de_renda = 0;
    } else if (valorBruto <= 3000.99) {
        imposto_de_renda = valorBruto * 0.075;
    } else if (valorBruto <= 4000.99) {
        imposto_de_renda = valorBruto * 0.15;
    } else {
        imposto_de_renda = valorBruto * 0.275;
    }

    imposto_sobre_serviço = valorBruto * 0.05;

    let totalDescontos = inss + imposto_de_renda + imposto_sobre_serviço;
    let valorLiquido = valorBruto - totalDescontos;

    return { valorBruto, inss, imposto_de_renda, imposto_sobre_serviço, valorLiquido };
}

function exibirCadastrodePrestadoresdeServico(nomes, PASEP, val_horarios, quant_horas_trabalhadas) {
    let mensagem = '';
    for (let i = 0; i < nomes.length; i++) {
        let { valorBruto, inss, imposto_de_renda, imposto_sobre_serviço, valorLiquido } = calcularImpostos(val_horarios[i], quant_horas_trabalhadas[i]);
        mensagem += `<h2>${i + 1}° Prestador de serviço:</h2>
        <b>Nome</b>: ${nomes[i]}<br> <b>PIS</b>: ${PASEP[i]}<br> 
        <b>Valor Hora</b>: R$${val_horarios[i].toFixed(2)}<br> 
        <b>Horas Trabalhadas</b>: ${quant_horas_trabalhadas[i]}<br> 
        <b>Valor Bruto</b>: R$${valorBruto.toFixed(2)}<br> 
        <b>INSS</b>: R$${inss.toFixed(2)}<br> 
        <b>IR</b>: R$${imposto_de_renda.toFixed(2)}<br> 
        <b>ISS</b>: R$${imposto_sobre_serviço.toFixed(2)}<br> 
        <b>Valor Líquido</b>: R$${valorLiquido.toFixed(2)}<br><br>`;
    }
    document.write(mensagem);
}