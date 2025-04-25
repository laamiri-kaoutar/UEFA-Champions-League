import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [matchStats, setMatchStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        const [matchResponse, statsResponse] = await Promise.all([
          axios.get(`https://api.sofascore.com/api/v1/event/${id}`),
          axios.get(`https://api.sofascore.com/api/v1/event/${id}/statistics`)
        ]);
        
        setMatch(matchResponse.data.event);
        setMatchStats(statsResponse.data.event);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match details:', error);
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des détails du match...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="error-container">
        <h2>Match non trouvé</h2>
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          Retour à la liste des matchs
        </button>
      </div>
    );
  }

  return (
    <div className="match-detail">
      <div className="match-detail-header">
        <h2>{match.tournament.name}</h2>
        <div className="match-status">
          {matchStats?.status?.type === 'finished' ? 'TERMINÉ' : 
           matchStats?.status?.type === 'inprogress' ? 'EN COURS' : 'À VENIR'}
        </div>
      </div>

      <div className="match-detail-teams">
        <div className="team home-team">
          <div className="team-name">{match.homeTeam.name}</div>
          {matchStats?.homeScore !== undefined && (
            <div className="team-score">{matchStats.homeScore}</div>
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
          {matchStats?.awayScore !== undefined && (
            <div className="team-score">{matchStats.awayScore}</div>
          )}
        </div>
      </div>

      <div className="match-detail-info">
        <div className="info-section">
          <h3>📅 Informations du match</h3>
          <p>{formatDate(match.startTimestamp)}</p>
          <p>🏟️ {match.venue?.name || 'Stade non spécifié'}</p>
          {matchStats?.status?.type === 'inprogress' && (
            <p>⚽ Match en cours</p>
          )}
        </div>
      </div>
      
      {matchStats?.manOfTheMatch ? (
        <div className="man-of-match">
          <h3>⭐ Joueur du match</h3>
          <div className="player-info">
            <p className="player-name">{matchStats.manOfTheMatch.name}</p>
            <p className="player-team">{matchStats.manOfTheMatch.team?.name || 'Équipe non spécifiée'}</p>
            {matchStats.manOfTheMatch.rating && (
              <p className="player-rating">Note: {matchStats.manOfTheMatch.rating}/10</p>
            )}
          </div>
        </div>
      ) : (
        <div className="match-detail-info">
          <p>Joueur du match: Information non disponible</p>
        </div>
      )}

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Retour à la liste des matchs
      </button>
    </div>
  );
}

export default MatchDetail; 