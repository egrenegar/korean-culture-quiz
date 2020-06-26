$(document).ready(function () {

    const questionsDiv = $('.quiz-questions');
    const timer = $('#time-left');
    let timeInterval;
    let leaderboard = {
        score: [],
        initials: []
    };
    let questionIndex = 0;
    let timeLeft = 75;
    // All quiz questions and answers
    const questions = [
        {
            q: 'What is the name of South Korea\'s current president?',
            a: ['Park Geun-Hye', 'Moon Jae-In', 'Kim Jong-Un', 'Choi Ji-Min'],
            correct: 'Moon Jae-In'
        },
        {
            q: 'What is the capitol of South Korea?',
            a: ['Incheon', 'Busan', 'Seoul', 'Pyeongchang'],
            correct: 'Seoul'
        },
        {
            q: 'What is the equivalent of "Cheers!" in Korean language?',
            a: ['"Geonbae!"', '"Maekju!"', '"Gamsahabnida!"', '"Annyeong!"'],
            correct: '"Geonbae!"'
        },
        {
            q: 'Which of the following is NOT a famous K-Pop group?',
            a: ['BLACKPINK', 'BTS', 'iKON', 'HelloGoodbye'],
            correct: 'HelloGoodbye'
        },
        {
            q: 'Who created the written Korean language, "Hangeul"?',
            a: ['Heo Jun', 'King Sejong', 'Gong Yoo', 'Yi Sun-Shin'],
            correct: 'King Sejong'
        },
        {
            q: 'Which of the following is NOT a traditional Korean dish?',
            a: ['Bibimbap', 'Kimchi Jjigae', 'Korean Fried Chicken', 'Japchae'],
            correct: 'Korean Fried Chicken'
        },
        {
            q: 'What would you be doing if you went to a "Noraebang?"',
            a: ['Getting a massage', 'Playing computer games', 'Buying groceries', 'Singing karaoke'],
            correct: 'Singing karaoke'
        },
        {
            q: 'Which word in Korean means "Older Sister?"',
            a: ['Oppa', 'Unnie', 'Noona', 'Hyeong'],
            correct: 'Unnie'
        },
        {
            q: 'Which of the following behaviors is considered impolite in Korean culture?',
            a: ['Pouring your own drink', 'Shaking hands with both hands', 'Covering your chest and shoulders in public', 'Removing your shoes before entering someone\'s home'],
            correct: 'Pouring your own drink'
        },
        {
            q: 'What is "soju?"',
            a: ['A city in South Korea', 'A speech level', 'An alcoholic beverage', 'Korean traditional dress'],
            correct: 'An alcoholic beverage'
        },
        {
            q: 'When do Koreans traditionally add another year to their age?',
            a: ['Their actual birth date', 'At Chuseok- the holiday that celebrates the harvest', 'When a new year begins on January 1', 'At Seollal- Lunar New Year'],
            correct: 'When a new year begins on January 1'
        },
        {
            q: 'What is the national sport of Korea?',
            a: ['Soccer', 'Baseball', 'Badminton', 'Taekwondo'],
            correct: 'Baseball'
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
    // Ask a quiz question depending on the current quiz index
    const ask = () => {
        if (questions[questionIndex] === undefined) {
            enterInitials();
        }

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
                questionIndex++
            } else {
                console.log('Correct!');
                questionIndex++
            }
            // Clear previous question and ask next question
            questionsDiv.empty();
            ask();
        });

    }

    const enterInitials = () => {
        $('.row.centered').empty();
        userScore = timer.text();
        leaderboard.score.push(userScore);
        console.log(leaderboard);
        clearInterval(timeInterval);
        // Creating the initials form
        const formHeader = $('<h3>').text(`Your score is ${userScore}.`);
        const newRow = $('<div>').addClass(['row', 'centered']);
        const form = $('<div>').addClass(['ui', 'form']);
        const field = $('<div>').addClass('field');
        const label = $('<label>').text('Enter Your Initials:');
        const input = $('<input>').attr('type', 'text').attr('id', 'initials-input');
        const submit = $('<a>').addClass(['ui', 'button']).text('Submit');
        $('.row.centered').append(formHeader);
        $('.ui.column.grid').append(newRow);
        $(newRow).append(form);
        $(form).append(field);
        $(field).append(label);
        $(field).append(input);
        $(form).append(submit);

        // localStorage.setItem('userScore', leaderboard);
        submit.on('submit', function () {
            console.log('initials submitted');
            let initials = $('#initials-input').val();
            leaderboard.initials.push(initials);
            console.log(leaderboard);
        });
    }

    startTimer();

});
