<template>
  <div id="app">
    <router-view name='navbar'/>

    <div class="container py-4">
      <router-view class="pb-4" />
    </div>

    <router-view name='footer'/>
  </div>
</template>
