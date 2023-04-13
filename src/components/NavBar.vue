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
}
.navbar-nav {
  display: flex;
  justify-content: center;
  align-content: center;
}

.nav-item {
  font-weight: bold;
  font-size: 1.2em;
  margin: 50px 50px;
  text-decoration: none;
  color: black;
  position: relative;
  border-radius: 30px;
  padding: 0 15px;
}
.nav-item:hover {
  background: #ffd600;
  border-radius: 30px;
  color: #000;
}
.router-link-active {
  background-color: #ffd600;
}
</style>
