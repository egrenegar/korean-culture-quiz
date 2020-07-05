$(document).ready(function () {

    const questionsDiv = $('.quiz-questions');
    const timer = $('#time-left');
    let timeLeft = 75;
    let timeInterval;
    let questionIndex = 0;
    let score;

    // Quiz questions and answers
    const questions = [
        {
            q: '1. What is the name of South Korea\'s current president?',
            a: ['A. Park Geun-Hye', 'B. Moon Jae-In', 'C. Kim Jong-Un', 'D. Choi Ji-Min'],
            correct: 'B. Moon Jae-In'
        },
        {
            q: '2. What is the capitol of South Korea?',
            a: ['A. Incheon', 'B. Busan', 'C. Seoul', 'D. Pyeongchang'],
            correct: 'C. Seoul'
        },
        {
            q: '3. What is the equivalent of "Cheers!" in Korean language?',
            a: ['A. "Geonbae!"', 'B. "Maekju!"', 'C. "Gamsahabnida!"', 'D. "Annyeong!"'],
            correct: 'A. "Geonbae!"'
        },
        {
            q: '4. Which of the following is NOT a famous K-Pop group?',
            a: ['A. BLACKPINK', 'B. BTS', 'C. iKON', 'D. HelloGoodbye'],
            correct: 'D. HelloGoodbye'
        },
        {
            q: '5. Who created the written Korean language, "Hangeul"?',
            a: ['A. Heo Jun', 'B. King Sejong', 'C. Gong Yoo', 'D. Yi Sun-Shin'],
            correct: 'B. King Sejong'
        },
        {
            q: '6. Which of the following is NOT a traditional Korean dish?',
            a: ['A. Bibimbap', 'B. Kimchi Jjigae', 'C. Korean Fried Chicken', 'D. Japchae'],
            correct: 'C. Korean Fried Chicken'
        },
        {
            q: '7. What would you be doing if you went to a "Noraebang?"',
            a: ['A. Getting a massage', 'B. Playing computer games', 'C. Buying groceries', 'D. Singing karaoke'],
            correct: 'D. Singing karaoke'
        },
        {
            q: '8. Which word in Korean means "Older Sister?"',
            a: ['A. Unnie', 'B. Oppa', 'C. Noona', 'D. Hyeong'],
            correct: 'A. Unnie'
        },
        {
            q: '9. Which of the following behaviors is considered impolite in Korean culture?',
            a: ['A. Pouring your own drink', 'B. Shaking hands with both hands', 'C. Covering your chest and shoulders in public', 'D. Removing your shoes before entering someone\'s home'],
            correct: 'A. Pouring your own drink'
        },
        {
            q: '10. What is "soju?"',
            a: ['A. A city in South Korea', 'B. A speech level', 'C. An alcoholic beverage', 'D. Korean traditional dress'],
            correct: 'C. An alcoholic beverage'
        },
        {
            q: '11. When do Koreans traditionally add another year to their age?',
            a: ['A. Their actual birth date', 'B. At Chuseok- the holiday that celebrates the harvest', 'C. When a new year begins on January 1', 'D. At Seollal- Lunar New Year'],
            correct: 'C. When a new year begins on January 1'
        },
        {
            q: '12. What is the national sport of Korea?',
            a: ['A. Soccer', 'B. Baseball', 'C. Badminton', 'D. Taekwondo'],
            correct: 'B. Baseball'
        }
    ]

    // Start the timer at 75 seconds
    const startTimer = () => {
        timeInterval = setInterval(function () {
            timer.text(timeLeft);
            timeLeft--;
        }, 1000);

        ask();
    }

    // Check whether or not all questions have been answered
    const checker = () => {
        questionIndex++;
        if (questions[questionIndex] === undefined) {
            endQuiz();
        } else {
            questionsDiv.empty();
            ask();
        }
    }

    // Ask a quiz question depending on the current quiz index
    const ask = () => {
        // Display the question
        const newQ = $('<h3>').addClass(['header', 'question-header']).text(questions[questionIndex].q);
        const answersArray = questions[questionIndex].a;
        questionsDiv.append(newQ);

        // Display the answers
        for (let i = 0; i < answersArray.length; i++) {
            const answerChoice = $('<button>').addClass(['button', 'answer-btn']).attr('value', answersArray[i]).text(answersArray[i]);
            questionsDiv.append(answerChoice);
        }

        // Determine right or wrong answer
        $('.answer-btn').on('click', function () {
            console.log('You answered: ' + this.value);
            if (questions[questionIndex].correct !== this.value) {
                timeLeft -= 10;
                checker();
            } else {
                console.log('Correct!');
                checker();
            }
        });

    }

    const endQuiz = () => {
        $('.row.centered').empty();
        score = timer.text();
        clearInterval(timeInterval);
        // Creating the initials form
        const formHeader = $('<h3>').text(`Your score is ${score}.`);
        const newRow = $('<div>').addClass(['row', 'centered']);
        const form = $('<div>').addClass(['ui', 'form']);
        const field = $('<div>').addClass('field');
        const label = $('<label>').text('Enter Your Initials:');
        const input = $('<input>').attr({type: 'text', id: 'initials-input'});
        const submit = $('<input>').attr({type: 'submit', id: 'submitInitials-btn', class: 'ui button'}).text('Submit');
        $('.row.centered').append(formHeader);
        $('.ui.column.grid').append(newRow);
        $(newRow).append(form);
        $(field).append([label, input]);
        $(form).append([field, submit]);
        

        // Set user initials and score to local storage
        submit.on('click', function () {
            const initials = $('#initials-input').val().trim();
            let highScores = localStorage.getItem('highScores');

            if (highScores !== null) {
                highScores = JSON.parse(highScores);
            } else {
                highScores = [];
            }

            let scoreObj = {score, initials};
            highScores.push(scoreObj);
            localStorage.setItem('highScores', JSON.stringify(highScores));
            window.location.assign('/scores.html');

        })
    }

    startTimer();

});