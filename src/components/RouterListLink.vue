<template>
  <router-link :to="{'name':name}" tag='li' class='nav-item'>
    <a class="nav-link" :class="{'active': route.name === name}"><slot></slot></a>
  </router-link>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['name'],
  computed: {
    ...mapState(['route'])
  }
}
</script>
