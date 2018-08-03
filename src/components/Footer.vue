<template>
  <nav :class="footerClass">
    <a class="mx-3" href="https://careers.liping.edu.hk">生涯規劃部</a>
    <a :class="footerBrandClass" href="https://liping.edu.hk">聖公會李炳中學</a>
  </nav>
</template>

<script>
const footerClass = [
  'navbar', 'fixed-bottom', 'navbar-light', 'bg-light', 'text-muted',
  'px-lg-5', 'd-flex', 'justify-content-end', 'd-print-none'
]
const footerBrandClass = ['navbar-brand', 'text-secondary']

export default {
  data () {
    return {
      footerClass,
      footerBrandClass
    }
  }
}
</script>
