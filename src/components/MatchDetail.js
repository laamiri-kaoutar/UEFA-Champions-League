import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [manOfTheMatch, setManOfTheMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        // Récupérer les détails du match
        const matchResponse = await axios.get(`https://api.sofascore.com/api/v1/event/${id}`);
        setMatch(matchResponse.data.event);
        
        // Récupérer les statistiques du match qui incluent le Man of the Match
        const statsResponse = await axios.get(`https://api.sofascore.com/api/v1/event/${id}/statistics`);
        if (statsResponse.data && statsResponse.data.event) {
          const motm = statsResponse.data.event.manOfTheMatch;
          if (motm) {
            setManOfTheMatch(motm);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match details:', error);
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!match) {
    return <div>Match non trouvé</div>;
  }

  return (
    <div className="match-detail">
      <h2>{match.tournament.name}</h2>

      <div className="match-detail-teams">
        <div>{match.homeTeam.name}</div>
        <div>VS</div>
        <div>{match.awayTeam.name}</div>
      </div>

      <div className="match-detail-info">
        <p>Date: {new Date(match.startTimestamp * 1000).toLocaleDateString()}</p>
        <p>Heure: {new Date(match.startTimestamp * 1000).toLocaleTimeString()}</p>
        <p>Stade: {match.venue?.name || 'Non spécifié'}</p>
      </div>
      
      {manOfTheMatch ? (
        <div className="man-of-match">
          <h3>Man of the Match</h3>
          <p>{manOfTheMatch.name} ({manOfTheMatch.team?.name || 'Équipe non spécifiée'})</p>
          {manOfTheMatch.rating && <p>Note: {manOfTheMatch.rating}/10</p>}
        </div>
      ) : (
        <div className="match-detail-info">
          <p>Man of the Match: Information non disponible</p>
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