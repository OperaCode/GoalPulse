import React, { useEffect, useState } from "react";
import axios from "axios";

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get("https://zenquotes.io/api/today");
        setQuote(res.data[0]);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  if (!quote) return <p>Loading Quote...</p>;

  return (
    <div className="bg-gray-800 text-white rounded-xl p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">💡 Quote of the Day</h2>
      <p className="italic">"{quote.q}"</p>
      <p className="mt-2 text-sm text-green-400">– {quote.a}</p>
    </div>
  );
};

export default QuoteOfTheDay;
