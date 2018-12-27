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
      <b-btn variant="outline-primary" href="#leagues">Mes leagues</b-btn>
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

    <b-card title="Mes leagues"
            id="leagues"
            class="mb-2">
      <p class="card-text">
        Retrouve ici les leagues que tu as crée.
      </p>
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
    export default {
      name: "Main",
      data () {
        return {
          currentUser: {
            playerId: '',
            login: '',
            wallet: 0,
            league: '',
            characters: ''
          }
        }
      },
      created () {
        this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
      },
      methods: {
        logout() {
          this.$emit("logout");
        }
      }
    }
</script>

<style scoped>

</style>
