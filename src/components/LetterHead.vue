<template>
  <div class="my-2" style="font-size: 12px">
    <div class="row">
      <div class="col-5 text-center">
        <b>S.K.H. LI PING SECONDARY SCHOOL</b>
        <small>
          <br />450, WO YI HOP ROAD, TSUEN WAN, N.T. <br />TEL : 2423-8806 FAX :
          2485-0734 <br />http://liping.edu.hk
        </small>
      </div>

      <div class="col-2 text-center">
        <img :src="require('@/assets/logo.png')" style="max-width: 60px" />
      </div>

      <div class="col-5 text-center">
        <b style="font-size: larger">聖 公 會 李 炳 中 學</b>
        <br />
        <small>新 界 荃 灣 和 宜 合 道 450 號</small>
      </div>
    </div>
    <div class="me-4">
      <p class="text-end">通 告 編 號：{{ code }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['code']
}
</script>
