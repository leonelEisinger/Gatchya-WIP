$(document).ready(function () {
    const cards = $('.raridade');
    const results = ["Common", "Rare", "Mythical", "Legendary"];
    const loadingSpinner = $('.loading');
    loadingSpinner.hide();

    // Definir as probabilidades para cada raridade
    const probabilities = {
        "Common": 62,
        "Rare": 27,
        "Mythical": 10.95,
        "Legendary": 0.05
    };

    // Inicializando os contadores de raridade
    const rarityCounters = {
        "Common": 0,
        "Rare": 0,
        "Mythical": 0,
        "Legendary": 0
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
    }

    $('#spin').click(function () {
        // Exibe a animação de carregamento
        loadingSpinner.show();

        // Reseta as cartas
        cards.css({ opacity: 0, transform: 'scale(0.5)' });

        // Adiciona a animação de spin
        $('.carousel').addClass('spin-animation');

        setTimeout(function () {
            $('.carousel').removeClass('spin-animation');
            loadingSpinner.hide(); // Esconde a animação de carregamento

            // Obtém a raridade com base nas probabilidades
            const selectedRarity = getRarity();
            
            // Encontra o índice correspondente à raridade selecionada
            const selectedIndex = results.indexOf(selectedRarity);

            const selectedCard = cards.eq(selectedIndex);

            selectedCard.css({ opacity: 1, transform: 'scale(1)' }); // Exibe a raridade selecionada

            // Incrementa o contador da raridade selecionada
            rarityCounters[selectedRarity]++;

            // Atualiza os contadores na tela
            updateCounters();
        }, 3000); // Duração da animação de 3 segundos
    });

});
