import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "Washington" },
  { country: "Albania", capital: "Tirana" },
  { country: "Armenia", capital: "Yerevan" },
  { country: "Costa Rica", capital: "San Jose" },
  { country: "Egypt", capital: "Cairo" },
  { country: "Germany", capital: "Berlin" },
  { country: "Georgia", capital: "Tbilisi" },
  { country: "Greece", capital: "Athens" },
  { country: "China", capital: "Beijing" },
  { country: "Chile", capital: "Santiago" },
  { country: "Italy", capital: "Rome" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Malaysia", capital: "Kuala Lumpur" },
  { country: "Morocco", capital: "Rabat" },
  { country: "Netherlands", capital: "Amsterdam" },
  { country: "Norway", capital: "Oslo" },
  { country: "Romania", capital: "Bucharest" },
  { country: "Portugal", capital: "Lisbon" },
  { country: "Saudi Arabia", capital: "Riyadh" },
  { country: "Slovenia", capital: "Ljubljana" },
  { country: "Slovakia", capital: "Bratislava" },
  { country: "South Korea", capital: "Seoul" },
  { country: "Spain", capital: "Madrid" },
  { country: "Sweden", capital: "Stockholm" },
  { country: "Switzerland", capital: "Bern" },
  { country: "Thailand", capital: "Bangkok" },
  { country: "Turkey", capital: "Ankara" },
  { country: "Tunisia", capital: "Tunis" },
  { country: "United Arab Emirates", capital: "Abu Dhabi" },
  { country: "Uruguay", capital: "Montevideo" },
  { country: "Uzbekistan", capital: "Tashkent" },
  { country: "Vietnam", capital: "Hanoi" },
  { country: "The Bahamas", capital: "Nassau" },
  { country: "Sri Lanka", capital: "Colombo" },
  { country: "Senegal", capital: "Dakar" },
  { country: "Russia", capital: "Moscow" },
  { country: "Qatar", capital: "Doha" },
  { country: "Poland", capital: "Warsaw" },
  { country: "Peru", capital: "Lima" },
  { country: "New Zealand", capital: "Wellington" },
  { country: "Maldives", capital: "Male" },
  { country: "Kyrgyzstan", capital: "Bishkek" },
  { country: "Kazakhstan", capital: "Astana" },
  { country: "Iran", capital: "Tehran" },
  { country: "Ireland", capital: "Dublin" },
  { country: "Iraq", capital: "Baghdad" },
  { country: "Indonesia", capital: "Jakarta" },
  { country: "Finland", capital: "Helsinki" },
  { country: "Estonia", capital: "Tallinn" },
  { country: "Ethiopia", capital: "Addis Ababa" },
  { country: "Czech Republic", capital: "Prague" },
  { country: "Cuba", capital: "Havana" },
  { country: "Croatia", capital: "Zagreb" },
  { country: "Canada", capital: "Ottawa" },
  { country: "Bulgaria", capital: "Sofia" },
  { country: "Brazil", capital: "Brasilia" },
  { country: "Belarus", capital: "Minsk" },
  { country: "Azerbaijan", capital: "Baku" },
  { country: "Austria", capital: "Vienna" },
  { country: "Australia", capital: "Canberra" },
  { country: "Argentina", capital: "Buenos Aires" },
  { country: "Afghanistan", capital: "Kabul" },
];

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
  }

  nextQuestion();

  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
