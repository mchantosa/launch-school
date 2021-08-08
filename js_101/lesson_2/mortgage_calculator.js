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
  - Return inquiry results to user
  - Good luck hunting
*/

const readline = require('readline-sync');
exports.findMonthlyPayment = findMonthlyPayment;
//Comment out conductUserDefinedMortgageAnalysis() to run tests quickly
conductUserDefinedMortgageAnalysis();


function conductUserDefinedMortgageAnalysis() {
  //Greet user
  console.log(`Greetings human, I understand you are interested in conducting some mortgage analysis today. Happy to be of assistance 😁\n`);

  //Acquire user input values
  const APR = askUserForApr();    //float
  const LOAN_AMOUNT = askUserForLoanAmount();   //float
  const LOAN_DURATION = askUserForLoanDuration();   //{years: int, months: int}
  const MONTHLY_INTEREST_RATE = APR / 1200;   //float
  const LOAN_DURATION_IN_MONTHS = (LOAN_DURATION.years * 12) + LOAN_DURATION.months;    //int

  //Generate output content
  const MONTHLY_PAYMENT = findMonthlyPayment(LOAN_AMOUNT, MONTHLY_INTEREST_RATE, LOAN_DURATION_IN_MONTHS);   //float
  const FIRST_MONTH_INTEREST = LOAN_AMOUNT * MONTHLY_INTEREST_RATE;   //float
  const FIRST_MONTH_PRINCIPLE = MONTHLY_PAYMENT - FIRST_MONTH_INTEREST;   //float
  const TOTAL_INTEREST = (MONTHLY_PAYMENT * LOAN_DURATION_IN_MONTHS) - LOAN_AMOUNT;   //float

  //Return inquiry results to user
  console.log(`For a home loan of the amount $${makeMoneyPretty(LOAN_AMOUNT)} with an APR of ${APR} over a period of ${LOAN_DURATION.years} years and ${LOAN_DURATION.months} months: 
  - Your monthly payment is $${makeMoneyPretty(MONTHLY_PAYMENT)}
  - Your loan duration is ${LOAN_DURATION_IN_MONTHS} months
  - The first payment would pay $${makeMoneyPretty(FIRST_MONTH_PRINCIPLE)} to principle and $${makeMoneyPretty(FIRST_MONTH_INTEREST)} in interest
  - Your total in interest paid over for this loan would be $${makeMoneyPretty(TOTAL_INTEREST)}`);

  //Good luck hunting
  console.log("Happy house hunting");

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
  let validLoanYears = false;
  let validLoanMonths = false;
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
  while (!validLoanMonths && validLoanMonths !== 0) {
    validLoanMonths = readline.questionInt("What is the 'tail' duration of your loan in months? (Please give answer as an integer e.g. for 20 years and 6 months enter 6, for 30 years enter 0)\n=> ");
    if (validLoanMonths < 0 || validLoanMonths > 11) {
      validLoanMonths = false;
      console.log("You should double check your input, the 'tail end' duration of your loan must be a non negative number no greater than 11");
    }
  }
  return {years: validLoanYears, months: validLoanMonths};
}

function findMonthlyPayment(loanAmount, monthlyInterestRate, loanDurationInMonths) {
  return (loanAmount * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate),(-loanDurationInMonths)));
}

function makeMoneyPretty(money) {
  let prettyMoney = parseFloat(money).toFixed(2);
  prettyMoney = prettyMoney.split('.');
  prettyMoney[0] = prettyMoney[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return prettyMoney.join('.');
}