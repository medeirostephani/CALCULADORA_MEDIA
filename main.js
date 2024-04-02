/*GLOBAIS*/
let linhas = ''; /*CRIA VARIÁVEL VAZIA, PRECISA VIR ANTES DE PREVENT DEFAULT PQ SE NÃO RESETA AS LINHAS SEMPRE QUE APERTA O BOTAO, E NÃO FICA O REGISTRO DE LINHAS*/
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji triste"/>';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota minima:"));

const form = document.getElementById('form-atividade');
form.addEventListener('submit', function (e) {
    e.preventDefault(); /*REMOVE COMPORTAMENTO PADRÃO: ATUALIZAR*/

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
})

function adicionaLinha() { /*FUNÇÃO PARA CRIAR O PROCEDIMENTO DE ADD LINHAS*/
/*ATRIBUI OS VALORES DE ENTRADA DOS CAMPOS ÀS CLASSES*/
    const inputNomeAtividade = document.getElementById('nome-atividade'); 
    const inputNotaAtividade = document.getElementById('nota-atividade');

/*PROCEDIMENTO PARA BLOQUEAR ATIVIDADES DUPLICADAS*/
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else {

/*ENVIAR AS ENTRADAS PRO ARRAY*/
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value)); /*PARSEFLOAT PRA TRANSFORMAR A ENTRADA Q ERA UMA STRING (TEXTO) EM NUMERO*/

/*CRIAR PROCEDIMENTO PARA O PREENCHIMENTO DAS NOVAS LINHAS COM OS VALORES DE ENTRADA */
        let linha = '<tr>'; /*CRIA NOVA LINHA */
        linha += `<td>${inputNomeAtividade.value}</td>`; /* += TEM A FUNÇÃO DE CONCATENAR */ /*COLUNA 1 DA NOVA LINHA*/
        linha += `<td>${inputNotaAtividade.value}</td>`; /*COLUNA 2 DA NOVA LINHA*/
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>` /* ? é if, : é else */ /*COLUNA 3 DA NOVA LINHA*/
        linha += '</tr>' /*FECHA A LINHA*/

/*VARIAVEL LINHAS RECEBE: CONCATENAR TODAS AS LINHAS*/
        linhas += linha; 
    }

/*LIMPAR CAMPOS*/
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}


/*FUNÇÕES*/
function atualizaTabela () { /*ATRIBUIR O PROCEDIMENTO CRIADO AO HTML E JOGAR AS INFORMAÇÕES PRO CORPO DA TABELA */    
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas /*INNER.HMTL ATRIBUI UM CONTEUDO DENTRO DE UMA TAG*/
}


function atualizaMediaFinal() { /*CRIA A VARIAVEL DE MEDIA E ATRIBUI O VALOR DA FUNÇÃO DE CALCULO DA MEDIA*/
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2) /*ATRIBUI O VALOR DA MEDIA AO ID HTML DE VALOR DA MEDIA*/
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; /*ATRIBUI O VALOR DA MEDIA AO ID HTML DE APRO OU REPRO*/
}

function calculaMediaFinal () { /*CALCULO DA MEDIA*/
    let somaDasNotas = 0;
    for (let i=0; i <notas.length; i++) {
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length
}


