import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import axios from 'axios';

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const matchesPerPage = 2;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15');
        setMatches(response.data.events || []);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
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
    <div className="match-list-container">
      <div className="match-list-header">
        <h2>Quarts de Finale - Champions League</h2>
        <div className="match-list-subtitle">
          <span className="trophy-icon">🏆</span>
          <span>Phase Finale 2024/2025</span>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des matchs...</p>
        </div>
      ) : (
        <>
          <div className="match-list">
            {currentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
              className="pagination-button"
            >
              ⬅️ Précédent
            </button>
            <div className="page-info">
              <span>Page {page} sur {totalPages}</span>
              <div className="page-dots">
                {Array.from({ length: totalPages }, (_, i) => (
                  <span 
                    key={i} 
                    className={`dot ${i + 1 === page ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
            </div>
            <button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages}
              className="pagination-button"
            >
              Suivant ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MatchList; 