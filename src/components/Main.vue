<template>
  <div id="app" class="container">
    <br />

    <b-jumbotron>
      <template slot="header">
        <h1>Bienvenue sur Player Battle <i><b>{{currentUser.login}}</b></i> !</h1>
      </template>
      <template slot="lead">
        <p>Amuse toi bien !</p>
      </template>
      <hr class="my-4">
      <b-btn variant="outline-primary" href="#infos">Informations</b-btn>
      <b-btn variant="outline-primary" href="#players">Mes joueurs</b-btn>
      <b-btn variant="outline-primary" href="#leagues">Ma league</b-btn>
      <b-btn variant="outline-primary" href="#history">Historique des combats</b-btn>
      <b-btn variant="outline-primary" href="#fight">Combat</b-btn>
      <b-btn variant="danger" class="ml-4" v-on:click="logout()">Deconnexion</b-btn>
    </b-jumbotron>

    <b-card title="Informations"
            id="infos"
            class="mb-2">
      <p class="card-text">
        Retrouve ici toute les informations de ton joueur.
      </p>
      <b-list-group>
        <b-list-group-item>
          <b-card border-variant="secondary"
                  header="ID joueur"
                  header-border-variant="secondary"
                  align="center"
                  class="m-1">
            <b-btn variant="outline-danger">{{currentUser.playerId}}</b-btn>
          </b-card>
        </b-list-group-item>
        <b-list-group-item>
          <b-card border-variant="secondary"
                  header="Login"
                  header-border-variant="secondary"
                  align="center"
                  class="m-1">
            <b-btn variant="outline-danger">{{currentUser.login}}</b-btn>
          </b-card>
        </b-list-group-item>
        <b-list-group-item>
          <b-card border-variant="secondary"
                  header="Points disponibles"
                  header-border-variant="secondary"
                  align="center"
                  class="m-1">
            <p class="text-danger">{{currentUser.wallet}} / 10000</p>
            <b-progress class="mt-2" :value="currentUser.wallet" :max="10000" show-progress animated></b-progress>
          </b-card>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card title="Mes joueurs"
            id="players"
            class="mb-2">
      <p class="card-text">
        Retrouve ici tout tes personnages et leur informations.
      </p>
    </b-card>

    <b-card title="Ma league"
            id="leagues"
            class="mb-2">
      <p class="card-text">
        Retrouve ici la league à laquel tu appartiens ou crée en une !
      </p>
      <b-list-group>
        <b-list-group-item>
          <b-card border-variant="secondary"
                  header="Information"
                  header-border-variant="secondary"
                  align="center"
                  class="m-1">
            <p v-if="!currentUser.leagueId">Vous n'appartenez à aucune league. Veuillez en rejoindre une ou en créer une.</p>
            <b-dropdown v-if="!currentUser.leagueId" id="ddown1" text="Aucune" class="m-md-2">
              <b-dropdown-item
                v-for="league in leagues"
                @click="addPlayerToLeague(league.leagueId)">{{ league.name }} ({{ league.nbPlayer }})</b-dropdown-item>
            </b-dropdown>

            <p v-if="currentUser.leagueId">Nom de votre league actuelle:</p>
            <b-btn v-if="currentUser.leagueId" variant="outline-danger">{{currentLeague.name}}</b-btn>

            <p v-if="currentUser.leagueId" class="mt-2">Nombre de joueur à l'intérieur:</p>
            <b-btn v-if="currentUser.leagueId" variant="outline-danger">{{currentLeague.nbPlayer}}</b-btn>

            <p v-if="currentUser.leagueId"></p>
            <b-btn v-if="currentUser.leagueId" variant="danger" @click="exitLeague()">Quitter {{ currentLeague.name }}</b-btn>
          </b-card>
        </b-list-group-item>
        <b-list-group-item>
          <b-card border-variant="secondary"
                  header="Créer une league"
                  header-border-variant="secondary"
                  align="center"
                  class="m-1">
            <b-form @submit="createLeague">
              <b-form-group id="name"
                            label="Nom:"
                            label-for="nameInput"
                            description="Entrez le nom de la league que vous voulez créer.">
                <b-form-input id="nameInput"
                              type="text"
                              v-model="leagueNameInput"
                              required
                              placeholder="Nom">
                </b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Créer</b-button>
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
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card title="Historique des combats"
            id="history"
            class="mb-2">
      <p class="card-text">
        Historique des 5 derniers combats.
      </p>
    </b-card>

    <b-card title="Combat"
            id="fight"
            class="mb-2">
      <p class="card-text">
        3..2..1 Fight !
      </p>
    </b-card>
  </div>
</template>

<script>
    import {LeagueWebservice} from "../webservice/LeagueWebservice";

    const leagueWebservice = new LeagueWebservice();

    export default {
      name: "Main",
      data () {
        return {
          currentUser: {
            playerId: '',
            login: '',
            wallet: 0,
            leagueId: '',
            characters: ''
          },
          currentLeague: {
            leagueId: '',
            name: '',
            nbPlayer: 0
          },
          leagues: [],
          leagueNameInput: '',
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
      created () {
        this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
        this.getAllLeagues();
        this.getLeagueById();
      },
      methods: {
        logout() {
          this.$emit("logout");
        },
        getAllLeagues() {
          leagueWebservice.getAllLeagues()
            .then(response => {
              this.leagues = response.data;
            });
        },
        getLeagueById() {
          if(this.currentUser.leagueId) {
            leagueWebservice.getLeagueById(this.currentUser.leagueId)
              .then(response => {
                this.currentLeague = response.data;
              });
          } else {
            this.currentLeague.leagueId = '';
            this.currentLeague.name = '';
            this.currentLeague.nbPlayer = 0;
          }
        },
        createLeague(evt) {
          evt.preventDefault();

          if(this.leagueNameInput !== "") {
            leagueWebservice.createLeague(this.leagueNameInput)
              .then(response => {
                this.success.msg = "La league est crée. Vous pouvez maintenant la rejoindre.";
                this.success.showOkAlert = true;
                this.leagueNameInput = "";
                this.getAllLeagues()
              })
              .catch(error => {
                this.error.msg = error.response;
                this.error.showErrorAlert = true;
              });
          } else {
            this.error.msg = "Veuillez remplir le champ.";
            this.error.showErrorAlert = true;
          }
        },
        addPlayerToLeague(leagueId) {
          leagueWebservice.addPlayerToLeague(leagueId, this.currentUser.playerId)
            .then(response => {
              this.currentUser.leagueId = leagueId;
              window.localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
              this.getAllLeagues();
              this.getLeagueById();
            });
        },
        exitLeague() {
          leagueWebservice.exitLeague(this.currentUser.playerId)
            .then(response => {
              this.currentUser.leagueId = '';
              window.localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
              this.getAllLeagues();
              this.getLeagueById();
            });
        }
      }
    }
</script>

<style scoped>

</style>
