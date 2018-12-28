import axios from 'axios'

export class FightWebservice {

  fight(characterOneId, characterTwoId, playerId) {
    const url = `/fight/` + characterOneId + "/" + characterTwoId + "/" + playerId;
    return axios.post(url);
  }
}
