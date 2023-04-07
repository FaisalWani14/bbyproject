<template>
  <b-navbar class="navbar">
    <b-navbar-brand class="logo ms-5" href="/"
      ><img src="@/assets/logo.png" alt="logo"
    /></b-navbar-brand>
    <b-navbar-nav class="navbar-nav ms-auto">
      <router-link class="nav-item" to="/">HOME</router-link>
      <router-link class="nav-item" to="/template">TEMPLATE</router-link>
      <router-link class="nav-item" to="/about">CONTACT US</router-link>
      <p class="nav-item" @click="logout()">LOGOUT</p>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {
    logout() {
      console.log("logout");
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");

.navbar {
  padding-inline: 50px;
  margin: 0 50px;
  background-color: white;
}
.logo {
  font-family: "Cedarville Cursive", cursive;
  font-size: 3em !important;
}
.navbar-nav {
  display: flex;
  justify-content: center;
  align-content: center;
}

.nav-item {
  font-family: "Inter", sans-serif;
  font-size: 1.2em;
  margin: 50px 50px;
  padding: 10px;
  text-decoration: none;
  color: black;
  position: relative;
  border-radius: 30px;
  line-height: 180%;
  padding: 0 15px;
}
.nav-item:hover {
  background: #ffd600 !important;
  border-radius: 30px !important;
  color: #000 !important;
}
.router-link-active {
  background-color: #ffd600 !important;
}
</style>
