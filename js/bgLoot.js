$(document).ready(function () {
    const cards = $('.raridade');
    const results = ["Common", "Rare", "Mythical", "Legendary"];
    const loadingSpinner = $('.loading');
    const animationDuration = 1000; // 1 segundo dura a animação
	const delay = 1500;
	let cont = 0;
    loadingSpinner.hide();

    // Definir as probabilidades para cada raridade
    const probabilities = {
        "Common": 55,
        "Rare": 30,
        "Mythical": 10,
        "Legendary": 4.99,
		"Hidden": 0.01
    };

    // Inicializando os contadores de raridade
    const rarityCounters = {
        "Common": 0,
        "Rare": 0,
        "Mythical": 0,
        "Legendary": 0,
		"Hidden": 0,
        "Total": 0
    };

    

    // Definir as cores para cada raridade
    const rarityColors = {
        "Common": "#aaa", // Cor para 'Common' (cinza)
        "Rare": "#4287f5",   // Cor para 'Rare' (azul)
        "Mythical": "#8e44ad", // Cor para 'Mythical' (dourado)
        "Legendary": "#f1c40f", // Cor para 'Legendary' (laranja forte)
		"Hidden": "#2c3e50" // Cor para 'Hidden' (Azul Escuro-Cinza)
    };

    // Função para selecionar uma raridade com base nas probabilidades
    function getRarity() {
        const rand = Math.random() * 100; // Gera um número entre 0 e 100
        let cumulativeProbability = 0;

        for (let rarity in probabilities) {
            cumulativeProbability += probabilities[rarity];
            if (rand <= cumulativeProbability) {
                return rarity;
            }
        }
    }

    // Função para atualizar os contadores de raridade na tela
    function updateCounters() {
        // Atualiza os valores dos contadores na interface
        $('#commonCount').text(rarityCounters["Common"]);
        $('#rareCount').text(rarityCounters["Rare"]);
        $('#mythicalCount').text(rarityCounters["Mythical"]);
        $('#legendaryCount').text(rarityCounters["Legendary"]);
		$('#hidden').text(rarityCounters["Hidden"]);
        $('#total').text(rarityCounters["Total"]);
    }

    // Função para adicionar o histórico com quadrados coloridos
    function updateHistory(rarity) {
    const historyList = $('#historicoLista'); // O container do histórico
    const maxHistoryItems = 138; // Defina o número máximo de quadrados no histórico

    // Verifica se o número de itens no histórico excede o limite
    if (historyList.children().length >= maxHistoryItems) {
        historyList.children().last().remove(); // Remove o quadrado mais antigo
    }

    // Cria um novo quadrado colorido
    const historyItem = $('<div>') 
        .css({
            width: '25px',   // Tamanho do quadrado
            height: '25px',  // Tamanho do quadrado
            backgroundColor: rarityColors[rarity], // Cor do quadrado
            borderRadius: '4px', // Tornar os quadrados ligeiramente arredondados
        });

    // Adiciona o quadrado ao container de histórico
    historyList.prepend(historyItem);
}

// Função para rodar até achar lendário
function legendary($button) {
    let stop = false;
	let cont = rarityCounters["Legendary"];
    // Enquanto a raridade não for "Legendary" e não atingirmos o número máximo de tentativas
    function trySpin() {
        if (stop) {
            $button.prop('disabled', false); // Habilita o botão novamente
            return;
        }

        setTimeout(() => {
            spin($button); // Executa a rotação

            // Checa se a raridade foi "Legendary"
            if (rarityCounters["Legendary"] > cont) {
				cont = rarityCounters["Legendary"];
                stop = true; // Para a rotação quando "Legendary" for encontrada
				return;
            } else {
                trySpin(); // Continua tentando se não for "Legendary"
            }
        }, delay);
    }

    // Desabilita o botão enquanto roda a roleta
    $button.prop('disabled', true);

    trySpin();
}



    // Função para rodar a roleta 10 vezes
    function ten($button, times) {
       
        
        for (let i = 0; i < times; i++) {
            setTimeout(() => {
                spin($button);
            }, delay);
	    $button.prop('disabled', true);
        }
    }

    function spin($button) {
    // Exibe a animação de carregamento
    loadingSpinner.show();

    // Reseta as cartas
    cards.css({ opacity: 0, transform: 'scale(0.5)' });

    // Adiciona a animação de spin
    $('.carousel').addClass('spin-animation');

    // Usamos um tempo maior para garantir que a animação do spin seja visível
    setTimeout(function () {
        try {
            // Remove a animação de spin
            $('.carousel').removeClass('spin-animation');

            // Esconde a animação de carregamento
            loadingSpinner.hide();

            // Obtém a raridade com base nas probabilidades
            const selectedRarity = getRarity();

            // Encontra o índice correspondente à raridade selecionada
            const selectedIndex = results.indexOf(selectedRarity);

            const selectedCard = cards.eq(selectedIndex);

            selectedCard.css({ opacity: 1, transform: 'scale(1)' }); // Exibe a raridade selecionada

            if(selectedRarity === "Hidden"){
				$('hidden-container').show;
				rarityCounters[selectedRarity]++;
			}
			// Incrementa o contador da raridade selecionada
            rarityCounters[selectedRarity]++;
			

            // Incrementa o contador total de aberturas
            rarityCounters['Total']++;

            // Atualiza os contadores na tela
            updateCounters();

            // Atualiza o histórico com o quadrado colorido
            updateHistory(selectedRarity);


        } catch (error) {
            console.error("Erro durante o processamento:", error);
        } finally {
            // Garante que o botão seja reabilitado independentemente de qualquer erro
            $button.prop('disabled', false);
        }
    }, animationDuration);
}


    // Evento do botão para girar até aparecer uma Legendary
    $('#legendary').click(function () {
        var $button = $(this); // Seleciona o botão
        $button.prop('disabled', true); // desabilita o botão
        legendary($button);
    });

    // Evento do botão para girar 10 vezes
    $('#ten').click(function () {
        var $button = $(this); // Seleciona o botão
        $button.prop('disabled', true); // desabilita o botão
        ten($button, 10);
    });

    // Evento do botão para girar uma vez (original)
    $('#spin').click(function () {
        var $button = $(this); // Seleciona o botão
        $button.prop('disabled', true); // Desabilita o botão para evitar múltiplos cliques
        spin($button);
    });

    
});
