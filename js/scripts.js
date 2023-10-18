const tmbForm = document.querySelector('#calculadora')

const macrosForm = document.querySelector('#calculadoramacros')

// resetar formulario
function resetForm() {
    tmbForm.reset()
}

// laço para verificar sexo escolhido
function obterSexo() {
    let opcoesSexo = tmbForm.elements['sexo']

    let sexoSelecionado

    for (let i = 0; i < opcoesSexo.length; i ++) {
        if (opcoesSexo[i].checked) {
            sexoSelecionado = opcoesSexo[i].value
            break
        }
    }

    return sexoSelecionado
}

// verificar peso digitado
function obterPeso() {
    let inputPeso = document.querySelector('#peso')
    let peso = inputPeso.value
    return peso
}

// verificar altura digitada
function obterAltura() {
    let inputAltura = document.querySelector('#altura')
    let altura = inputAltura.value
    return altura
}

// verificar idade digitada
function obterIdade() {
    let inputIdade = document.querySelector('#idade')
    let idade = inputIdade.value
    return idade
}

// calcular tmb
function obterTmb() {
    let tmb
    let sexo = obterSexo()
    let peso = obterPeso()
    let altura = obterAltura()
    let idade = obterIdade()

    if (sexo === 'homem') {
        tmb = (9.99 * peso) + (6.25 * altura) - (4.92 * idade) + 5
    } else if (sexo === 'mulher') {
        tmb = (9.99 * peso) + (6.25 * altura) - (4.92 * idade) -161
    }

    return tmb
}

// laço para verificar escolha de atividade
function gastoCalorico() {
    let opcoesGasto = tmbForm.elements['gastocalorico']

    let gastoSelecionado

    for (let i = 0; i < opcoesGasto.length; i ++) {
        if (opcoesGasto[i].checked) {
            gastoSelecionado = opcoesGasto[i].value
            break
        }
    }

    return gastoSelecionado
}

// calcular get
function obterGet() {
    let gasto = gastoCalorico()
    let tmb = obterTmb()
    let get

    if (gasto === 'sedentario') {
        get = tmb * 1.2
    } else if (gasto === 'leve') {
        get = tmb * 1.375
    } else if (gasto === 'moderado') {
        get = tmb * 1.55
    } else if (gasto === 'ativo') {
        get = tmb * 1.725
    } else if (gasto === 'atleta') {
        get = tmb * 1.9
    }

    return get
}

// laço para verificar escolha de objetivo
function obterObjetivo() {
    let opcoesObjetivo = tmbForm.elements['objetivo']

    let opcaoSelecionada

    for (let i = 0; i < opcoesObjetivo.length; i ++) {
        if (opcoesObjetivo[i].checked) {
            opcaoSelecionada = opcoesObjetivo[i].value
            break
        }
    }

    let get = obterGet()
    let caloriasObjetivo

    if (opcaoSelecionada === 'cutting') {
        caloriasObjetivo = get - (get * (15 / 100))
    } else if (opcaoSelecionada === 'manterpeso') {
        caloriasObjetivo = get
    } else if (opcaoSelecionada === 'bulking') {
        caloriasObjetivo = get + (get * (10 / 100))
    }

    return caloriasObjetivo
}

// verificando imc
function imcTeste(imc) {
    let imcTipo

    if (imc < 18.5) {
        imcTipo = 'Seu IMC está <b>abaixo do recomendado</b> para a sua altura.'
    } else if (imc > 18.5 && imc < 24.9) {
        imcTipo = 'Seu IMC é considerado <b>normal</b> para a sua altura.'
    } else if (imc > 25 && imc < 29.9) {
        imcTipo = 'Seu IMC é considerado de <b>sobrepeso</b> para a sua altura.'
    } else if (imc > 30 && imc < 34.9) {
        imcTipo = 'Seu IMC é considerado de <b>obesidade grau I</b> para a sua altura.'
    } else if (imc > 35 && imc < 39.9) {
        imcTipo = 'Seu IMC é considerado de <b>obesidade grau II</b> para a sua altura.'
    } else if (imc > 40) {
        imcTipo = 'Seu IMC é considerado de <b>obesidade grau III</b> para a sua altura.'
    }

    return imcTipo
}

// imc manter ou atingir
function imcPesoIdeal(imc, pesoIdeal1, pesoIdeal2) {
    let imcFrase

    if (imc > 18.5 && imc < 24.9) {
        imcFrase = `Para manter o valor de IMC normal, seu peso deve estar entre <b>${pesoIdeal1.toFixed(1)} e ${pesoIdeal2.toFixed(1)} kg</b>.`
    } else {
        imcFrase = `Para atingir um valor de IMC normal, seu peso deve estar entre <b>${pesoIdeal1.toFixed(1)} e ${pesoIdeal2.toFixed(1)} kg</b>.`
    }

    return imcFrase
}

// exibindo resultados tmb get imc
tmbForm.addEventListener('submit', function(event) {
    event.preventDefault()

    let peso = obterPeso()
    let altura = obterAltura()
    let idade = obterIdade()

    let error = document.querySelector('#error')
    let resultado = document.querySelector('#resultadotmb')

    if (peso === '' || altura === '' || idade === '') {
        if (resultado.style.display === 'block') {
            resultado.style.display = 'none'
        }

        error.style.display = 'block'

        resetForm()
    } else if (peso > 0 && altura > 0 && idade > 0) {
        if (error.style.display === 'block') {
            error.style.display = 'none'
        }

        let tmb = obterTmb()
        let get = obterGet()

        let objetivo = obterObjetivo()

        let alturaConvertida = altura / 100
        let imc = peso / (alturaConvertida * alturaConvertida)

        let pesoIdeal1 = 18.5 * (alturaConvertida * alturaConvertida) 
        let pesoIdeal2 = 24.9 * (alturaConvertida * alturaConvertida)

        resultado.style.display = 'block'

        resultado.innerHTML = `
        <b>Taxa Metabólica Basal:</b> ${tmb.toFixed(0)} calorias diárias.
        <br>
        <b>Gasto Energético Total:</b> ${get.toFixed(0)} calorias diárias.
        <br>
        De acordo com seu objetivo, você deve consumir <b>${objetivo.toFixed(0)} calorias diárias<b>.
        <br>
        <b>Índice de Massa Corporal:</b> ${imc.toFixed(1)} kg/m²
        <br>
        ${imcTeste(imc)}
        ${imcPesoIdeal(imc, pesoIdeal1, pesoIdeal2)}
        `
    }
})

// calcular macros
macrosForm.addEventListener('submit', function(event) {
    event.preventDefault()

    let resultado = document.querySelector('#resultadomacros')

    let peso = obterPeso()

    let proteina = proteinas()
    let proteinaNumero = Number(proteina)

    let gramasProteina

    if (proteinaNumero === 1.6) {
        gramasProteina = 1.6 * peso
    } else if (proteinaNumero === 1.8) {
        gramasProteina = 1.8 * peso
    } else if (proteinaNumero === 2) {
        gramasProteina = 2 * peso
    } else {
        gramasProteina = proteina * peso
    }

    let caloriasProteina = gramasProteina * 4 
    
    let gordura = gorduras()
    let gorduraNumero = Number(gordura)

    let gramasGordura

    if (gorduraNumero === 0.5) {
        gramasGordura = 0.5 * peso
    } else if (gorduraNumero === 0.7) {
        gramasGordura = 0.7 * peso
    } else if (gorduraNumero === 1) {
        gramasGordura = 1 * peso
    } else {
        gramasGordura = gordura * peso
    }
    
    let caloriasGordura = gramasGordura * 9

    let objetivo = obterObjetivo()

    let gramasCarboidrato = (objetivo - (caloriasProteina + caloriasGordura)) / 4

    resultado.style.display = 'block'

    resultado.innerHTML = `
    <h3><b>Macronutrientes diários:</b></h3>
    <b>Proteínas:</b> ${gramasProteina}g
    <br>
    <b>Gordura:</b> ${gramasGordura}g
    <br>
    <b>Carboidratos:</b> ${gramasCarboidrato.toFixed(0)}g
    `
})

// verifica proteina
function proteinas() {
    let opcoesProteina = macrosForm.elements['proteina']
    let numeroProteina = document.querySelector('#numeroproteina')

    let proteinaSelecionada

    for (let i = 0; i < opcoesProteina.length; i ++) {
        if (opcoesProteina[i].checked) {
            proteinaSelecionada = opcoesProteina[i].value
            break
        }
    }

    if (proteinaSelecionada === '0') {
        proteinaSelecionada = numeroProteina.value
    }

    return proteinaSelecionada
}

// verifica gordura
function gorduras() {
    let opcoesGordura = macrosForm.elements['gordura']
    let numeroGordura = document.querySelector('#numerogordura')

    let gorduraSelecionada

    for (let i = 0; i < opcoesGordura.length; i ++) {
        if (opcoesGordura[i].checked) {
            gorduraSelecionada = opcoesGordura[i].value
            break
        }
    }

    if (gorduraSelecionada === '0') {
        gorduraSelecionada = numeroGordura.value
    }

    return gorduraSelecionada
}