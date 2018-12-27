<template>
  <div id="app" class="container">
    <br />
    <h1>Bienvenue sur Player Battle !</h1>
    <p>Veuillez vous connecter ou vous créer un compte.</p>
    <br />
    <p>
      <b-btn v-b-toggle.connexion variant="success">Connexion</b-btn>
      <b-btn v-b-toggle.inscription variant="danger">Inscription</b-btn>
    </p>
    <b-collapse id="connexion">
      <b-card>
        <b-form @submit="onConnexion">
          <b-form-group id="login"
                        label="Login:"
                        label-for="loginInput"
                        description="Entrez votre login.">
            <b-form-input id="loginInput"
                          type="text"
                          v-model="connexion.login"
                          required
                          placeholder="Login">
            </b-form-input>
          </b-form-group>
          <b-form-group id="password"
                        label="Mot de passe:"
                        label-for="passwordInput"
                        description="Entrez votre mot de passe.">
            <b-form-input id="passwordInput"
                          type="password"
                          v-model="connexion.password"
                          required
                          placeholder="Mot de passe">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Connexion</b-button>
          <b-alert variant="danger"
                   dismissible
                   :show="error.showErrorAlert"
                   @dismissed="error.showErrorAlert=false"
                   class="mt-4">
            {{error.msg}}
          </b-alert>
        </b-form>
      </b-card>
    </b-collapse>
    <b-collapse id="inscription">
      <b-card>
        <b-form @submit="onInscription">
          <b-form-group id="newLogin"
                        label="Entrez un nouveau login:"
                        label-for="newLoginInput"
                        description="Entrez votre nouveau login.">
            <b-form-input id="newLoginInput"
                          type="text"
                          v-model="inscription.login"
                          required
                          placeholder="Nouveau login">
            </b-form-input>
          </b-form-group>
          <b-form-group id="newPassword"
                        label="Entrez un nouveau mot de passe:"
                        label-for="newPasswordInput"
                        description="Entrez votre nouveau mot de passe.">
            <b-form-input id="newPasswordInput"
                          type="password"
                          v-model="inscription.password"
                          required
                          placeholder="Nouveau mot de passe">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Inscription</b-button>
          <b-alert variant="danger"
                   dismissible
                   :show="error.showErrorAlert"
                   @dismissed="error.showErrorAlert=false"
                   class="mt-4">
            {{error.msg}}
          </b-alert>
          <b-alert variant="success"
                   dismissible
                   :show="success.showOkAlert"
                   @dismissed="success.showOkAlert=false"
                   class="mt-4">
            {{success.msg}}
          </b-alert>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
    import {PlayerWebservice} from "../webservice/PlayerWebservice";

    const playerWebservice = new PlayerWebservice();

    export default {
        name: "Login",
        data () {
          return {
            connexion: {
              login: '',
              password: ''
            },
            inscription: {
              login: '',
              password: ''
            },
            error: {
              msg: '',
              showErrorAlert: false
            },
            success: {
              msg: '',
              showOkAlert: false
            }
          }
        },
        methods: {
          onConnexion (evt) {
            evt.preventDefault();

            if(this.connexion.login !== "" && this.connexion.password !== "") {
              playerWebservice.login(this.connexion.login, this.connexion.password)
                .then(response => {
                  if(response.status === 200) {
                    window.localStorage.setItem("currentUser", JSON.stringify(response.data));
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "Main" });
                  }
                })
                .catch(error => {
                  if(error.response.status === 404) {
                    this.error.msg = "Login ou mot de passe incorrect.";
                    this.error.showErrorAlert = true;
                  } else {
                    this.error.msg = error.response;
                    this.error.showErrorAlert = true;
                  }
                });
            } else {
              this.error.msg = "Veuillez remplir les champs.";
              this.error.showErrorAlert = true;
            }
          },
          onInscription (evt) {
            evt.preventDefault();

            if(this.inscription.login !== "" && this.inscription.password !== "") {
              playerWebservice.addUser(this.inscription.login, this.inscription.password)
                .then(response => {
                  this.success.msg = "Merci pour votre inscription, vous pouvez maintenant vous connecter.";
                  this.success.showOkAlert = true
                  this.inscription.login = "";
                  this.inscription.password = "";
                })
                .catch(error => {
                  this.error.msg = error.response;
                  this.error.showErrorAlert = true;
                });
            } else {
              this.error.msg = "Veuillez remplir les champs.";
              this.error.showErrorAlert = true;
            }
          }
        }
    }
</script>

<style scoped>

</style>
