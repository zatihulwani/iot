<template>
  <div>
    <h1>halaman setting khusus admin</h1>
    <button @click="tampilkanAlertDariRoute">tombol</button>
  </div>
</template>

<script>
export default {
  methods: {
    tampilkanAlertDariRoute(data) {
      console.log(data.target);
    }
  }
};
</script>

<style>
</style>
