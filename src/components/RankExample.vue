<template>
  <div>
    <div id="exampleRank" class="form-group mt-1 collapse">
      <div class="alert alert-info">Example</div>
      <textarea rows=7 class="form-control" v-model='example' disabled></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      example: `userAlias,rank\nlp00000001,3\nlp00000002,4\nlp00000003,6\nlp00000004,5\nlp00000005,2\nlp00000006,1`
    }
  }
}
</script>
