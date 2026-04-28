<template>
  <div class="alert alert-danger">
    {{
      isMock ? '模擬' : null
    }}選科程序已經截止。如有任何查詢，可向{{ pics[0] }}老師或{{ pics[1] }}老師聯絡。
  </div>
</template>

<script>
import { isMock, pics } from '@/config.js'
export default {
  data() {
    return {
      isMock, pics
    }
  }
}
</script>
