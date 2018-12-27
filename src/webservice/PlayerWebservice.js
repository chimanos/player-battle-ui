import axios from 'axios'

export class PlayerWebservice {

  login(username, password) {
      const url = `/player/login`;
      return axios.post(url,
        {
          login: username,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  }

  addUser(username, password) {
    const url = `/player`;

    return axios.post(url,
      {
        login: username,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }
}
