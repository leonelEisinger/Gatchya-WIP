
window.mainLoot = {

    // Função para selecionar uma raridade com base nas probabilidades
    getRarity: function(probabilities) {
        const rand = Math.random() * 100;
        let cumulativeProbability = 0;

        for (let rarity in probabilities) {
            cumulativeProbability += probabilities[rarity];
            if (rand <= cumulativeProbability) {
                return rarity;
            }
        }
    },

    // Função para atualizar os contadores na tela
    updateCounters: function(rarityCounters) {
        $('#commonCount').text(rarityCounters["Common"]);
        $('#rareCount').text(rarityCounters["Rare"]);
        $('#mythicalCount').text(rarityCounters["Mythical"]);
        $('#legendaryCount').text(rarityCounters["Legendary"]);
        $('#total').text(rarityCounters["Total"]);
    },

    // Função para adicionar o histórico com quadrados coloridos
    updateHistory: function(rarity, rarityColors) {
        const historyList = $('#historicoLista');
        const maxHistoryItems = 138;

        if (historyList.children().length >= maxHistoryItems) {
            historyList.children().last().remove();
        }

        const historyItem = $('<div>').css({
            width: '25px',
            height: '25px',
            backgroundColor: rarityColors[rarity],
            borderRadius: '4px',
        });

        historyList.prepend(historyItem);
    }
};
