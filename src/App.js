import React, { useState } from "react";
 
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
   const [income, setIncome] = useState(5000);
   const [expenses, setExpenses] = useState(3000);
   const [numOfYears, setNumOfYears] = useState(10);
   const [startPosition, setStartPosition] = useState(0);
 
   const surplusNeeded = ((expenses * 300) - ((income - expenses) * 12 * numOfYears) - startPosition) / (12 * numOfYears);
 
   return (
     <div className="p-6 max-w-xl mx-auto text-center">
       <div className="flex justify-start mb-4">
         <button onClick={() => setLanguage("en")} className="mr-2">🇬🇧</button>
         <button onClick={() => setLanguage("he")} className="mr-2">🇮🇱</button>
       </div>
       
       <h1 className="text-2xl font-bold mb-4">{translations[language].title}</h1>
       
       <div className="mb-4">
         <label className="block font-medium">{translations[language].startPosition}: {startPosition}</label>
         <input
           type="number"
           value={startPosition}
           onChange={(e) => setStartPosition(Number(e.target.value))}
           className="w-full border p-2 rounded"
         />
       </div>
       
       <div className="mb-4">
         <label className="block font-medium">{translations[language].income}: {income}</label>
         <input
           type="number"
           value={income}
           onChange={(e) => setIncome(Number(e.target.value))}
           className="w-full border p-2 rounded"
         />
         <input
           type="range"
           min="0"
           max="20000"
           value={income}
           onChange={(e) => setIncome(Number(e.target.value))}
           className="w-full mt-2 accent-blue-500"
         />
       </div>
       
       <div className="mb-4">
         <label className="block font-medium">{translations[language].expenses}: {expenses} <span title={translations[language].expensesHint} className="cursor-help">❓</span></label>
         <input
           type="number"
           value={expenses}
           onChange={(e) => setExpenses(Number(e.target.value))}
           className="w-full border p-2 rounded"
         />
         <input
           type="range"
           min="0"
           max="20000"
           value={expenses}
           onChange={(e) => setExpenses(Number(e.target.value))}
           className="w-full mt-2 accent-red-500"
         />
       </div>
       
       <div className="mb-6">
         <label className="block font-medium">{translations[language].independence} ({numOfYears} years)</label>
         <input
           type="range"
           min="1"
           max="30"
           value={numOfYears}
           onChange={(e) => setNumOfYears(Number(e.target.value))}
           className="w-full mt-2 accent-green-500"
         />
       </div>
       
       <div className="text-lg font-semibold">
         {surplusNeeded <= 0 ? (
           <span className="text-green-600">{translations[language].success}</span>
         ) : (
           <>{translations[language].result} <span className="text-red-600">${surplusNeeded.toFixed(2)}</span> {translations[language].months}</>
         )}
       </div>
     </div>
   );
 };
 
 export default FinancialIndependence;