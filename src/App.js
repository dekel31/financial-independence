import React, { useState } from "react";

/*remove double numbers (in input and beside "income")
replace $ with Nis in Hebrew
hint on mobile
revise texts
rtl when hebrew
years to shanim in hebrew
add NOW - and fix labels (infinity)*/
const translations = {
  en: {
    title: "How far are you from financial independence?",
    income: "Income",
    expenses: "Expenses",
    expensesHint: "The smaller your expenses, the easier it gets - the amount of money needed for financial freedom is multiplied for each penny you don't spend.",
    independence: "When would you like to start your independence?",
    startPosition: "Starting capital",
    result: "You should increase your surplus by",
    months: "every month to achieve this.",
    success: "You're on the right way! Your goal will be achieved by the desired time."
  },
  he: {
    title: "כמה אתה רחוק מעצמאות כלכלית?",
    income: "הכנסה",
    expenses: "הוצאות",
    expensesHint: "ככל שההוצאות שלך קטנות יותר, כך זה נעשה קל יותר - סכום הכסף הדרוש לעצמאות כלכלית מוכפל עבור כל שקל שאתה לא מוציא.",
    independence: "מתי תרצה להתחיל את העצמאות שלך?",
    startPosition: "הון ראשוני",
    result: "עליך להגדיל את העודף שלך ב-",
    months: "בכל חודש כדי להשיג זאת.",
    success: "אתה בדרך הנכונה! המטרה שלך תושג בזמן הרצוי."
  }
};

const FinancialIndependence = () => {
  const [language, setLanguage] = useState("en");
  const [income, setIncome] = useState(10000);
  const [expenses, setExpenses] = useState(7500);
  const [numOfYears, setNumOfYears] = useState(10);
  const [startPosition, setStartPosition] = useState(0);

  const moneyNeeded = expenses * 300;
  const numOfMonthsToGoal = 12 * numOfYears;
  const surplusEachMonth = (income - expenses) * numOfMonthsToGoal;
  const surplusNeeded = moneyNeeded - startPosition > 0 ? ((moneyNeeded - surplusEachMonth - startPosition) / numOfMonthsToGoal) : 0;

  return (
    <div className="container">
      <div className="language-buttons">
        <button onClick={() => setLanguage("en")} className="language-btn">EN</button>
        <button onClick={() => setLanguage("he")} className="language-btn">HE</button>
      </div>

      <h1>{translations[language].title}</h1>

      <div className="input-container">
        <label>{translations[language].startPosition}: {startPosition}</label>
        <input
          type="number"
          value={startPosition}
          onChange={(e) => setStartPosition(Number(e.target.value))}
          className="input"
        />
      </div>

      <div className="input-container">
        <label>{translations[language].income}: {income}</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="input"
        />
        <input
          type="range"
          min="0"
          max="60000"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="range-input blue"
        />
      </div>

      <div className="input-container">
        <label>{translations[language].expenses}: {expenses} <span title={translations[language].expensesHint} className="hint">❓</span></label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
          className="input"
        />
        <input
          type="range"
          min="0"
          max="50000"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
          className="range-input red"
        />
      </div>

      <div className="input-container">
        <label>{translations[language].independence} ({numOfYears} years)</label>
        <input
          type="range"
          min="0"
          max="30"
          value={numOfYears}
          onChange={(e) => setNumOfYears(Number(e.target.value))}
          className="range-input green"
        />
      </div>

      <div className="result">
        {surplusNeeded <= 0 ? (
          <span className="success-message">{translations[language].success}</span>
        ) : (
          <>{translations[language].result} <span className="surplus">${surplusNeeded.toFixed(2)}</span> {translations[language].months}</>
        )}
      </div>
    </div>
  );
};

export default FinancialIndependence;
