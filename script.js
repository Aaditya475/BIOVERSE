function explore() {
    document.getElementById("modules").scrollIntoView({
        behavior: "smooth"
    });
}

// SIMULATION CONTROL

let heartTimer;
let lungTimer;
let digestionTimer;

function stopAll() {
    clearInterval(heartTimer);
    clearInterval(lungTimer);
    clearInterval(digestionTimer);
}

function openSimulation(type) {

    stopAll();

    const title = document.getElementById("simTitle");
    const content = document.getElementById("simContent");

    if (type === "heart") {

        title.innerText = "❤️ Heart Simulation";

        content.innerHTML = `
            <div id="heart" class="sim-visual">❤️</div>

            <h3>Circulatory System</h3>

            <p>
                The heart pumps blood throughout the body.
                It supplies oxygen and nutrients to body tissues.
            </p>

            <div class="sim-controls">
                <button onclick="startHeart()">Start Heartbeat</button>
                <button onclick="stopHeart()">Pause</button>
            </div>

            <p id="heartStatus">Simulation ready.</p>
        `;
    }

    else if (type === "lungs") {

        title.innerText = "🫁 Lungs Simulation";

        content.innerHTML = `
            <div id="lungs" class="sim-visual">🫁</div>

            <h3>Respiratory System</h3>

            <p id="breathing">
                Explore how the lungs take in oxygen and release carbon dioxide.
            </p>

            <div class="sim-controls">
                <button onclick="startLungs()">Start Breathing</button>
                <button onclick="stopLungs()">Pause</button>
            </div>
        `;
    }

    else if (type === "digestive") {

        title.innerText = "🥗 Digestive System";

        content.innerHTML = `
            <div class="sim-visual">🥗</div>

            <h3>Food Digestion Process</h3>

            <p id="digestion">
                Start the simulation to follow the journey of food.
            </p>

            <div class="sim-controls">
                <button onclick="startDigestion()">Start Digestion</button>
                <button onclick="stopDigestion()">Pause</button>
            </div>
        `;
    }
}


// HEART SIMULATION

function startHeart() {

    stopAll();

    const heart = document.getElementById("heart");
    const status = document.getElementById("heartStatus");

    if (!heart) return;

    heart.classList.add("heartbeat");

    if (status) {
        status.innerText = "Heartbeat animation running.";
    }
}

function stopHeart() {

    clearInterval(heartTimer);

    const heart = document.getElementById("heart");

    if (heart) {
        heart.classList.remove("heartbeat");
    }

    const status = document.getElementById("heartStatus");

    if (status) {
        status.innerText = "Heartbeat paused.";
    }
}


// LUNGS SIMULATION

function startLungs() {

    stopAll();

    const lungs = document.getElementById("lungs");
    const breathing = document.getElementById("breathing");

    if (!lungs || !breathing) return;

    lungs.classList.add("lung-animation");

    let inhale = true;

    breathing.innerText = "Inhalation – Air enters the lungs.";

    lungTimer = setInterval(() => {

        inhale = !inhale;

        breathing.innerText = inhale
            ? "Inhalation – Air enters the lungs."
            : "Exhalation – Air moves out of the lungs.";

    }, 2000);
}

function stopLungs() {

    clearInterval(lungTimer);

    const lungs = document.getElementById("lungs");

    if (lungs) {
        lungs.classList.remove("lung-animation");
    }

    const breathing = document.getElementById("breathing");

    if (breathing) {
        breathing.innerText = "Breathing simulation paused.";
    }
}


// DIGESTIVE SYSTEM

function startDigestion() {

    stopAll();

    const digestion = document.getElementById("digestion");

    if (!digestion) return;

    const steps = [

        "1. Mouth – Food is chewed and mixed with saliva.",

        "2. Oesophagus – Food moves towards the stomach.",

        "3. Stomach – Food mixes with digestive juices.",

        "4. Small Intestine – Most nutrients are absorbed.",

        "5. Large Intestine – Water is absorbed.",

        "6. Rectum and Anus – Waste is eliminated."

    ];

    let index = 0;

    digestion.innerText = steps[index++];

    digestionTimer = setInterval(() => {

        if (index >= steps.length) {

            clearInterval(digestionTimer);

            digestion.innerText =
                "Digestion journey completed!";

            return;
        }

        digestion.innerText = steps[index++];

    }, 2500);
}

function stopDigestion() {

    clearInterval(digestionTimer);

    const digestion = document.getElementById("digestion");

    if (digestion) {
        digestion.innerText = "Digestion simulation paused.";
    }
}


// BIOLOGY QUIZ

const questions = [

    {
        question: "Which organ pumps blood throughout the body?",
        options: ["Brain", "Heart", "Lungs", "Kidney"],
        answer: "Heart"
    },

    {
        question: "Which organ is mainly responsible for breathing?",
        options: ["Lungs", "Stomach", "Liver", "Heart"],
        answer: "Lungs"
    },

    {
        question: "Where does most nutrient absorption occur?",
        options: ["Mouth", "Stomach", "Small intestine", "Large intestine"],
        answer: "Small intestine"
    },

    {
        question: "Which organ controls body activities?",
        options: ["Heart", "Brain", "Lungs", "Kidney"],
        answer: "Brain"
    },

    {
        question: "Which system transports blood?",
        options: ["Digestive", "Respiratory", "Circulatory", "Nervous"],
        answer: "Circulatory"
    }

];

let currentQuestion = 0;
let totalScore = 0;

function loadQuiz() {

    const q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;

    const answers = document.getElementById("answers");

    answers.innerHTML = "";

    document.getElementById("quizResult").innerText = "";

    document.getElementById("nextQuestion").style.display = "none";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.innerText = option;

        button.onclick = () => checkAnswer(option);

        answers.appendChild(button);

    });

}

function checkAnswer(selected) {

    const correct = questions[currentQuestion].answer;

    const buttons = document.querySelectorAll("#answers button");

    buttons.forEach(button => {

        button.disabled = true;

        if (button.innerText === correct) {
            button.style.background = "#087b60";
        }

    });

    if (selected === correct) {

        totalScore++;

        document.getElementById("quizResult").innerText =
            "Correct answer! Excellent work.";

    } else {

        document.getElementById("quizResult").innerText =
            "Incorrect. Correct answer: " + correct;

    }

    document.getElementById("nextQuestion").style.display = "inline-block";

}

function nextQuiz() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        document.getElementById("question").innerText =
            "Quiz Completed!";

        document.getElementById("answers").innerHTML = "";

        document.getElementById("quizResult").innerText =
            "Your final score: " + totalScore + " / " + questions.length;

        document.getElementById("nextQuestion").style.display = "none";

        document.getElementById("score").innerText =
            "Thank you for exploring BIOVERSE!";

        return;
    }

    loadQuiz();
}

loadQuiz();