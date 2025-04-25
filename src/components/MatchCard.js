import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MatchCard({ match }) {
  const navigate = useNavigate();
  const [matchStats, setMatchStats] = useState(null);

  useEffect(() => {
    const fetchMatchStats = async () => {
      try {
        const response = await axios.get(`https://api.sofascore.com/api/v1/event/${match.id}/statistics`);
        if (response.data && response.data.event) {
          setMatchStats(response.data.event);
        }
      } catch (error) {
        console.error('Error fetching match statistics:', error);
      }
    };

    fetchMatchStats();
  }, [match.id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMatchStatus = () => {
    if (matchStats?.status?.type === 'finished') {
      return 'TERMINÉ';
    } else if (matchStats?.status?.type === 'inprogress') {
      return 'EN COURS';
    } else {
      return 'À VENIR';
    }
  };

  return (
    <div className="match-card">
      <div className="match-header">
        <h3>{match.tournament.name}</h3>
        <div className={`match-status ${matchStats?.status?.type}`}>
          {getMatchStatus()}
        </div>
      </div>
      
      <div className="match-teams">
        <div className="team home-team">
          <div className="team-name">{match.homeTeam.name}</div>
          {matchStats?.status?.type === 'finished' && (
            <div className="team-score">{matchStats.homeScore}</div>
          )}
          {matchStats?.status?.type === 'inprogress' && (
            <div className="team-score">{matchStats.homeScore || '0'}</div>
          )}
        </div>
        <div className="vs">
          <div className="vs-circle">VS</div>
          {matchStats?.status?.type === 'inprogress' && (
            <div className="match-time">{matchStats.time}'</div>
          )}
        </div>
        <div className="team away-team">
          <div className="team-name">{match.awayTeam.name}</div>
          {matchStats?.status?.type === 'finished' && (
            <div className="team-score">{matchStats.awayScore}</div>
          )}
          {matchStats?.status?.type === 'inprogress' && (
            <div className="team-score">{matchStats.awayScore || '0'}</div>
          )}
        </div>
      </div>

      <div className="match-info">
        <p>📅 {formatDate(match.startTimestamp)}</p>
        <p>🏟️ {match.venue?.name || 'Stade non spécifié'}</p>
        {matchStats?.status?.type === 'inprogress' && (
          <p>⚽ Match en cours</p>
        )}
      </div>

      {matchStats?.manOfTheMatch ? (
        <div className="man-of-match">
          <p>⭐ Joueur du match: {matchStats.manOfTheMatch.name}</p>
          {matchStats.manOfTheMatch.rating && (
            <p>Note: {matchStats.manOfTheMatch.rating}/10</p>
          )}
        </div>
      ) : (
        <div className="match-info">
          <p>Joueur du match: Information non disponible</p>
        </div>
      )}

      <button 
        className="back-button"
        onClick={() => navigate(`/match/${match.id}`)}
      >
        Voir le match
      </button>
    </div>
  );
}

export default MatchCard; 