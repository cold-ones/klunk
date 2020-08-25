<template>
  <div>
    <h1 class="type">404</h1>
    <div class="centered">
      <h1>404</h1>
      <h3>Broken url</h3>
    </div>
  </div>
</template>

<style scoped>
  .type {
    display: inline-block;
    left: 10%;
    top: 0.5em;
    font-size: 2.5em;
    font-weight: 600;
    color: #fff;
    position: absolute;
  }
  .centered {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    transition: all 0.6s ease;
    color: white;
  }
  .centered h1 {
    font-size: 6em;
  }
</style>

<script>
export default {}
</script>