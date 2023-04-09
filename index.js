const readlineSync = require("readline-sync");
const chalk = require("chalk");
let score = 0;

const highScores = {
  names: ["Avil","Vivek"],
  score: 4
}


//array of objects
const countryQuiz = [
  {
    question: "What is the capital of Bangladesh ?",
    options: ["Madaripur", "Dhaka", "Khulna", "Barisal"],
    answer: 2
  },
  {
    question: "What is the capital of Thailand ?",
    options: ["Sing Buri", "Seol", "Bangkok", "Burma"],
    answer: 3
  },
  {
    question: "What is the capital of Singapore ?",
    options: ["Kluang", "Malacca", "Singapore", "Taiping"],
    answer: 3
  },
  {
    question: "What is the capital of Nepal ?",
    options: ["Kathmandu","Nepalgunj", "Bharatpur","Patan"],
    answer: 1
  },
  {
    question: "What is the capital of Japan ?",
    options: ["Kyoto", "Nagoya", "Hiroshima", "Tokyo"],
    answer: 4
  }
];

function playQuiz(){
  console.log(chalk.black.bgWhite.bold("\n\nWelcome to Country and Capital Quiz game"));
  for(let i=0; i<countryQuiz.length; i++){
      let questionNum = i+1;
      console.log("\nQ."+questionNum+" "+countryQuiz[i].question);
      const userAnswer = readlineSync.keyInSelect(countryQuiz[i].options, "Answer: ")+1;
    if(userAnswer === countryQuiz[i].answer){
      score = score+1;
      console.log(chalk.green("Correct Answer"));
    }
    else{
      console.log(chalk.red("Wrong Answer"));
    }
    console.log(".......................................................");
  }
  checkHighScore();
}

//play leap year
function playLeapYear(){
  console.log(chalk.black.bgWhite.bold("\n\nWelcome to.. were you born on a leap year ?\n"));
  console.log("Please enter you DOB in format DD/MM/YYYY");
  
  const DOB = readlineSync.prompt({limit:[/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/],limitMessage: chalk.red("ERROR : $<lastInput> is either not correct or not in the format DD/MM/YYYY")}).split("/");
  
  if(checkLeapYear(DOB)){
    console.log(chalk.black.bgMagenta.bold("\n\nYou were born in a  L E A P  Y E A R. Share this on your social media"));
  }
  else if(checkLeapYear(DOB) === 0){
    console.log(chalk.red.bold("\nIncorrect Date. You cannot have more than 29 days in February"));
  }
  else{
     console.log(chalk.black.bgMagenta.bold("\n\nYou were  N O T  born in a  L E A P  Y E A R"));
  }
}

//play prime number
function playPrimeNumber(dob){
  console.log(chalk.black.bgWhite.bold("\n\nWelcome to.. is your birth day a prime number ?\n"));
  console.log("Please enter you DOB in format DD/MM");
  
  const DOB = readlineSync.prompt({limit:[/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/],limitMessage: chalk.red("ERROR : $<lastInput> is either not correct or not in the format DD/MM")});

  if(checkPrimeNumber(DOB)){
    console.log(chalk.black.bgMagenta.bold("\n\nYour birth day  I S  A  P R I M E  N U M B E R. Share this on your social media"));
  }
  else if(checkPrimeNumber(DOB) === 0){
    console.log(chalk.red.bold("\nIncorrect Date. You cannot have more than 29 days in February"));
  }
  else{
    console.log(chalk.black.bgMagenta.bold("\n\nYour birth day  I S  N O T  A  P R I M E  N U M B E R."));
  }
}

function checkPrimeNumber(dob){
  const DD = parseInt(dob.split("/")[0]);
  const MM = parseInt(dob.split("/")[1]);
  if(MM === 02 && DD > 29){
    return 0;
  }
  else{
    const number = parseInt(dob.replace("/",""));
    let isPrime = true;
    for(let i=2; i<number; i++){
      if(number%i === 0){
        isPrime = false;
        break;
      }
    }
    return isPrime;
  }
}


//check leap year
function checkLeapYear(dob){
  const DD = parseInt(dob[0]);
  const MM = parseInt(dob[1]);
  const YYYY = parseInt(dob[2]);
  // console.log("DD "+DD+", MM "+MM+", YYYY "+YYYY);
  if(MM === 02 && DD > 29){
    return 0;
  }
  else{
    if(YYYY%4 === 0){
      if(YYYY%100 !== 0){
        return true;
      }
      else if(YYYY%400 === 0){
        return true;
      }
      else{
        return false;
      }
    }
  }
}

//Welcome user
function welcomeUser(){
  const userName = readlineSync.question("What's your name ? ");
  console.log(chalk.blue.bold("\nHi "+userName+","));
  const game = readlineSync.keyInSelect(["Country and Capital Quiz","Were you born on a leap year ?", "Is your birth day a prime number ?"],"Which game would you like to play ?")+1;
  if(game === 1){
    playQuiz();
  }
  else if(game === 2){
    playLeapYear();
  }
  else{
    playPrimeNumber();
  }
}

//print final score
function checkHighScore()
{
  if(score === highScores.score){
    console.log(chalk.black.bgMagenta("Hey...Congrats you have "+chalk.bold.underline("matched the high score.")+"\nSend me the screenshot I will update the high scorers.\n"));
    console.log(chalk.bold("Your Final Score : "+score+" \n"));
  }
  else if(score > highScores.score){
    console.log(chalk.black.bgMagenta("Hey...Congrats you have "+chalk.bold.underline("beaten the high score.")+"\nSend me the screenshot I will update the high scorers.\n"));
    console.log(chalk.bold("Your Final Score : "+score+" \n"));
  }
  else{
    console.log(chalk.bold("\nYour Final Score : "+score+" \n"));
  }
  console.log("Current high scorers and the score : ");
  for(let i=0; i<highScores.names.length; i++){    
    console.log(highScores.names[i]+" : "+highScores.score);
  }
}

welcomeUser();