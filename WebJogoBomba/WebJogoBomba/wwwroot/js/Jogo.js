var objetoJogo = new Object();

objetoJogo.IniciaVariaveis = function () {
    objetoJogo.chances = 3;
    objetoJogo.numSelecao = 1;
    objetoJogo.qtdClick = 0;
    objetoJogo.pontuacaoTotal = 0;
}

objetoJogo.IniciarJogo = async function () {
    $('#infoFimJogo').hide();
    objetoJogo.qtdClick = 0;

    objetoJogo.numSelecao = Math.floor(Math.random() * 9) + 1;

    console.log(objetoJogo.numSelecao);

    $('.caixaSelecao').css('background-color', 'white');

    await objetoJogo.AdicionaClick();

    if (objetoJogo.chances > 0) {

        $('#txtChance').text(objetoJogo.chances);
        $('#selecao_' + objetoJogo.numSelecao).click(
            function () {
                objetoJogo.chances--;
                objetoJogo.pontuacaoTotal += objetoJogo.qtdClick;
                $("#txtPontos").text(objetoJogo.pontuacaoTotal);
                $("#txtchanceBomba").text(objetoJogo.chances);
                $("#txtPontoBomba").text(objetoJogo.pontuacaoTotal);

                $("#selecao_" + objetoJogo.numSelecao).unbind("click");

                if (objetoJogo.chances > 0) {
                    $("#divBomba").show();
                }

                objetoJogo.IniciarJogo();
            }
        );

    } else {
        //Quando não tiver mais chances
        $('.caixaSelecao').addClass('caixaSelecaoExplode');
        $('#txtPontos').text(objetoJogo.pontuacaoTotal);

        setInterval(objetoJogo.MostraFimJogo, 2000);

        setInterval(objetoJogo.reiniciarJogo, 10000);
    }
}

objetoJogo.AdicionaClick = async function () {

    $('#selecao_1').unbind('click');
    $('#selecao_2').unbind('click');
    $('#selecao_3').unbind('click');
    $('#selecao_4').unbind('click');
    $('#selecao_5').unbind('click');
    $('#selecao_6').unbind('click');
    $('#selecao_7').unbind('click');
    $('#selecao_8').unbind('click');
    $('#selecao_9').unbind('click');

    $('#selecao_' + objetoJogo.numSelecao).unbind('click');

    for (var i = 1; i < 10; i++) {

        if (objetoJogo.numSelecao !== i) {

            $('#selecao_' + i).click(

                function () {

                    $(this).css('background-color', '#90ee90');

                    objetoJogo.qtdClick++;

                    if (objetoJogo.qtdClick === 8) {

                        alert('VOCÊ NÃO CAIU NA BOMBA! PARABÉNS, SUA PONTUAÇÃO É DE: ' + objetoJogo.qtdClick);
                        objetoJogo.pontuacaoTotal += objetoJogo.qtdClick;
                        $("#txtPontos").text(objetoJogo.pontuacaoTotal);
                        $("#selecao_" + objetoJogo.numSelecao).unbind("click");
                        objetoJogo.IniciarJogo();
                    }
                }
            );
        }
    }
}

objetoJogo.ClickBotaoJogar = function () {

    $('#btnJogar').click(

        function () {

            $('#divBomba').hide();
        }
    );
}

objetoJogo.AcionaLuz = function () {

    $('#btnLuz').click(
        function () {
            if ($('#btnLuz').val() === 'Apagar Luz') {

                $('body').css('background-color', 'black');
                $('.textoTela').css('color', 'white');
                $('#btnLuz').val('Acender Luz');
            } else {

                $('body').css('background-color', 'white');
                $('.textoTela').css('color', 'black');
                $('#btnLuz').val('Apagar Luz');
            }
        }
    );
}

objetoJogo.MostraFimJogo = function () {

    $('#divBomba').show();
    $('#infoFimJogo').show();
}

objetoJogo.reiniciarJogo = function () {
    location.reload();
}

$(function () {

    objetoJogo.IniciaVariaveis();
    objetoJogo.IniciarJogo();
    objetoJogo.ClickBotaoJogar();
    objetoJogo.AcionaLuz();
});