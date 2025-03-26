import React, { useState } from "react";

/*revise texts*/
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
    success: "You're on the right way! Your goal will be achieved by the desired time.",
	fail: "You are not financialy independent right now :(",
	moreInfo: "More Info",
	years: "years",
	currency: "$",
	now: "Now"
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
    success: "אתה בדרך הנכונה! המטרה שלך תושג בזמן הרצוי.",
	fail: "אינך בעצמאות כלכלית כרגע :(",
	moreInfo: "מידע נוסף",
    years: "שנים",
	currency: "₪",
	now: "עכשיו"
  }
};

const FinancialIndependence = () => {
  const [language, setLanguage] = useState("en");
  const [income, setIncome] = useState(10000);
  const [expenses, setExpenses] = useState(7500);
  const [numOfYears, setNumOfYears] = useState(10);
  const [startPosition, setStartPosition] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const moneyNeeded = expenses * 300;
  const numOfMonthsToGoal = 12 * numOfYears;
  const surplusEachMonth = (income - expenses) * numOfMonthsToGoal;
  const surplusNeeded = moneyNeeded - startPosition > 0 ? ((moneyNeeded - surplusEachMonth - startPosition) / numOfMonthsToGoal) : 0;

  return (
    <div className="container" style={{ direction: language === "he" ? "rtl" : "ltr" }}>
      <div className="language-buttons">
        <button onClick={() => setLanguage("en")} className="language-btn">EN</button>
        <button onClick={() => setLanguage("he")} className="language-btn">HE</button>
      </div>

      <h1>{translations[language].title}</h1>

	  <div className={`input-container-${language === "he" ? "rtl" : "ltr"}`}>
        <label>{translations[language].startPosition}:</label>
        <input
          type="number"
          value={startPosition}
          onChange={(e) => setStartPosition(Number(e.target.value))}
          className="input"
        />
      </div>

      <div className={`input-container-${language === "he" ? "rtl" : "ltr"}`}>
        <label>{translations[language].income}:</label>
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

      <div className={`input-container-${language === "he" ? "rtl" : "ltr"}`}>
        <label>{translations[language].expenses}: <span onClick={() => setShowHint(!showHint)} className="hint-link">{translations[language].moreInfo}</span></label>
        {showHint && <p className="hint-text">{translations[language].expensesHint}</p>}
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

      <div className={`input-container-${language === "he" ? "rtl" : "ltr"}`}>
		<label>
			{translations[language].independence}{" "}
			{numOfYears !== 0
			? <span style={{color: "#10b981", textWeight: "bold"}}>({numOfYears} {translations[language].years})</span>
			: <span style={{color: "#10b981", textWeight: "bold"}}>{translations[language].now}</span>
			}
		</label>

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
        ) : surplusNeeded == Infinity ? (
			<span className="fail-message">{translations[language].fail}</span>
		) : (
          <>{translations[language].result} <span className="surplus">{translations[language].currency}{surplusNeeded.toFixed(2)}</span> {translations[language].months}</>
        )}
      </div>
    </div>
  );
};

export default FinancialIndependence;
