import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedMatch = () => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        // Replace with your actual Football API URL and params
        const res = await axios.get("YOUR_API_FOOTBALL_ENDPOINT", {
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          },
          params: {
            // e.g., league, date, team, etc
          },
        });
        setMatch(res.data.response[0]); // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching featured match:", error);
      }
    };

    fetchMatch();
  }, []);

  if (!match) return <p>Loading Featured Match...</p>;

  return (
    <div className="bg-green-700 text-white rounded-xl p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">⚽ Featured Match</h2>
      <p className="text-lg">{match.teams.home.name} vs {match.teams.away.name}</p>
      <p>{new Date(match.fixture.date).toLocaleString()}</p>
    </div>
  );
};

export default FeaturedMatch;
