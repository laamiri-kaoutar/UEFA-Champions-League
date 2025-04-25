import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import axios from 'axios';

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);
  const matchesPerPage = 2;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15');
        setMatches(response.data.events || []);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const indexOfLastMatch = page * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(matches.length / matchesPerPage);

  return (
    <div>
      <h2>Quarts de Finale - Champions League</h2>
      
      <div className="match-list">
        {currentMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1}
        >
          Précédent
        </button>
        <span>Page {page} sur {totalPages}</span>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default MatchList; 