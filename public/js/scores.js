$(document).ready(function() {
    const tableBody = $('#table-body');
    const clearScoresBtn = $('#clearScores-btn');

    const getScores = () => {
        let highScores = JSON.parse(localStorage.getItem('highScores'));
        let sortedScores = highScores.sort(function(a, b) {
            return b.score - a.score;
        });

        for (let i = 0; i < sortedScores.length; i++) {
            const tableRow = $('<tr>');
            const initialsData = $('<td>').text(highScores[i].initials);
            const scoreData = $('<td>').text(highScores[i].score);
            tableBody.append(tableRow);
            tableRow.append([initialsData, scoreData]);

        }

        clearScoresBtn.on('click', function() {
            localStorage.clear();
            location.reload();
        });
    }

    

    getScores();

});