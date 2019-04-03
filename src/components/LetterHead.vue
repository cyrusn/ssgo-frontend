<template>
  <div class="my-4">
    <div class="row">
      <div class="col-4 text-center">
        <b>S.K.H. LI PING SECONDARY SCHOOL</b>
        <small>
          <br>450, WO YI HOP ROAD, TSUEN WAN, N.T.
          <br>TEL : 2423-8806 FAX : 2485-0734
          <br>http://liping.edu.hk
        </small>
      </div>

      <div class="col-4 text-center">
        <img :src="require('@/assets/logo.png')" style="width: 80px">
      </div>

      <div class="col-4 text-center">
        <b style="font-size: 1.8em">聖 公 會 李 炳 中 學</b>
        <br>
        <small>新 界 荃 灣 和 宜 合 道 450 號</small>
      </div>
    </div>
    <div class="mt-4 mr-4" style="font-size: larger">
      <p class="text-right">通 告 編 號：{{code}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["code"]
}
</script>
