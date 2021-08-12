const readline = require('readline-sync');
exports.findMonthlyPayment = findMonthlyPayment;

/*
REQUIREMENTS: Create a program that
  - Requests the following information from the user:
    - The loan amount
    - The Annual Percentage Rate (APR)
    - The loan duration (in years)
  - Return to the user:
    - Payment amount format dollar and cents ($123.45)
EXECUTION:
  - Greet user
  - Acquire user input values
  - Generate output content
  - Return inquiry results to user
  - Good luck hunting
*/

//Comment out conductMortgageAnalysis() to run tests quickly
conductMortgageAnalysis();

function conductMortgageAnalysis() {
  let doAgain;
  do {
    doAUserDefinedMortgageCalculation();
    doAgain = readline.keyInSelect(['yes', 'no'],"Would you like to run another calculation?");
  } while (doAgain === 0);
  //Good luck hunting
  console.log("Happy house hunting");
}

function doAUserDefinedMortgageCalculation() {
  //Greet user
  console.log(`Greetings human, I understand you are interested in conducting some mortgage analysis today. Happy to be of assistance 😁\n`);

  //Acquire user input values
  const apr = askUserForApr();    //float
  const loanAmount = askUserForLoanAmount();   //float
  const loanDuration = askUserForLoanDuration();   //{years: int, months: int}
  const monthlyInterestRate = apr / 1200;   //float
  const loanDurationInMonths = (loanDuration.years * 12) +
    loanDuration.months;    //int

  //Generate output content
  const monthlyPayment = findMonthlyPayment(
    loanAmount, monthlyInterestRate, loanDurationInMonths);   //float
  const firstMonthInterest = loanAmount * monthlyInterestRate;   //float
  const firstMonthPrinciple = monthlyPayment - firstMonthInterest;   //float
  const totalInterest =
    (monthlyPayment * loanDurationInMonths) - loanAmount;   //float

  //Return inquiry results to user
  console.log(`For a home loan of the amount $${makeMoneyPretty(loanAmount)} with an APR of ${apr}% over a period of ${loanDuration.years} years and ${loanDuration.months} months: 
  - Your monthly payment is $${makeMoneyPretty(monthlyPayment)}
  - Your loan duration is ${loanDurationInMonths} months
  - The first payment would pay $${makeMoneyPretty(firstMonthPrinciple)} to principle and $${makeMoneyPretty(firstMonthInterest)} in interest
  - Your total in interest paid over the duration of this loan would be $${makeMoneyPretty(totalInterest)}`);
}

function askUserForApr() {
  let validApr = false;
  while (!validApr && validApr !== 0) {
    validApr = readline.questionFloat("What is your APR friend? (Please give answer in percentage format e.g. for 5% enter 5.0)\n=> ");
    if (validApr < 0 || validApr > 15) {
      validApr = false;
      console.log('You should double check your input, your APR should be between 0 and 15');
    }
  }
  return validApr;
}

function askUserForLoanAmount() {
  let validLoanAmount = false;
  while (!validLoanAmount) {
    validLoanAmount = readline.question("What is your loan amount? (Please enter the dollar amount as a numeric value e.g. for $500,000 enter 500,000)\n=> ");
    validLoanAmount = parseFloat(validLoanAmount.replace(',',''));
    if (validLoanAmount <= 0) {
      validLoanAmount = false;
      console.log('You should double check your input, your loan amount needs to be a positive number');
    }
  }
  return validLoanAmount;
}

function askUserForLoanDuration() {
  return {years: askUserForLoanDurationYears(),
    months: askUserForLoanDurationMonths()};
}

function askUserForLoanDurationYears() {
  let validLoanYears = false;
  const MAX_YEARS = 30;
  while (!validLoanYears && validLoanYears !== 0) {
    validLoanYears = readline.questionInt("What is the duration of your loan in years? (Please give answer as an integer e.g. for 20 years and 6 months enter 20)\n=> ");
    if (validLoanYears < 0) {
      validLoanYears = false;
      console.log('You should double check your input, the duration of your loan must be a positive number');
    } else if (validLoanYears > MAX_YEARS) {
      validLoanYears = false;
      console.log(`The longest term we can submit is ${MAX_YEARS} years, please enter a value less than or equal to ${MAX_YEARS}`);
    }
  }
  return validLoanYears;
}

function askUserForLoanDurationMonths() {
  let validLoanMonths = false;
  while (!validLoanMonths && validLoanMonths !== 0) {
    validLoanMonths = readline.questionInt("What is the 'tail' duration of your loan in months? (Please give answer as an integer e.g. for 20 years and 6 months enter 6, for 30 years enter 0)\n=> ");
    if (validLoanMonths < 0 || validLoanMonths > 11) {
      validLoanMonths = false;
      console.log("You should double check your input, the 'tail end' duration of your loan must be a non negative number no greater than 11");
    }
  }
  return validLoanMonths;
}

function findMonthlyPayment(
  loanAmount, monthlyInterestRate, loanDurationInMonths) {
  return (loanAmount * monthlyInterestRate) / (
    1 - Math.pow((1 + monthlyInterestRate),(-loanDurationInMonths)));
}

function makeMoneyPretty(money) {
  let prettyMoney = parseFloat(money).toFixed(2);
  prettyMoney = prettyMoney.split('.');
  prettyMoney[0] = prettyMoney[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return prettyMoney.join('.');
}