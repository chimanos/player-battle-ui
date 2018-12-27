import axios from 'axios'

export class CharacterWebservice {

  getAllCharacters(playerId) {
    const url = `/character/` + playerId;
    return axios.get(url);
  }

  addCharacter(name, score, playerId) {
    const url = `/character/` + name + "/" + score + "/" + playerId;
    return axios.post(url);
  }

  updateCharacterScore(characterId, score, playerId) {
    const url = `/character/` + characterId + "/" + score + "/" + playerId;
    return axios.put(url);
  }

  deleteCharacter(characterId, playerId) {
    const url = `/character/` + characterId + "/" + playerId;
    return axios.delete(url);
  }
}
