import axios from 'axios'

export class LeagueWebservice {

  getLeagueById(leagueId) {
    const url = `/league/` + leagueId;
    return axios.get(url);
  }

  getAllLeagues() {
    const url = `/league`;
    return axios.get(url);
  }

  createLeague(name) {
    const url = `/league/` + name;
    return axios.post(url);
  }

  addPlayerToLeague(leagueId, playerId) {
    const url = `/league/` + leagueId + '/' + playerId;
    return axios.post(url);
  }

  exitLeague(playerId) {
    const url = `/league/` + playerId;
    return axios.delete(url);
  }
}
