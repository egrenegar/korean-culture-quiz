const questionsDiv = $('.quiz-questions');
const timer = $('#time-left');
var questionIndex = 0;
var timeLeft = 75;
let userScore;

var questions = [
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

function startTimer() {
    let timeInterval = setInterval(function () {
        timer.text(timeLeft);
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
    
    ask();
    
}

function ask() {
    // console.log(questionIndex);
    if (questions[questionIndex] === undefined) {
        clearInterval(timeInterval);
        userScore = timeLeft;
        // create a blank object to push initials
        // key: user score & initials
        // value: score from score variable 
        // have two properties for 
        // scoreArr.push(userScore);
        // console.log(scoreArr);
        // console.log(userScore);
        location.redirect('/initials');
    }

    var newQ = $('<h3>').addClass(['header', 'question-header']).text(questions[questionIndex].q);
    var answersArray = questions[questionIndex].a;
    questionsDiv.append(newQ);

    for (let i = 0; i < answersArray.length; i++) {
        let answerChoice = $('<button>').addClass(['button', 'answer-btn']).text(answersArray[i]);
        questionsDiv.append(answerChoice);
    }
    
    $('.answer-btn').on('click', function() {
        console.log('clicked');
        if (questions[questionIndex].correct === this.value) {
            questionIndex++
        } else {
            timeLeft -= 10;
            questionIndex++
        }
        questionsDiv.empty();
        ask();
    });

    
}

startTimer();