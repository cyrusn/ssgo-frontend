<template>
  <div class="alert alert-primary">
    <h5 class="alert-heading">注意</h5>
    <hr />
    <p>
      學生須於<formatted-datetime
        :datetime="deadline"
        format="l"
      />或以前完成網上{{
        isMock ? '模擬' : null
      }}選科。在確認選科組合次序前，學生應先取後家長同意，並由家長簽署。{{
        isMock ? null : '是次為正式選科，選科意願一經繳交，將不能更改。'
      }}高中選科影響深遠，同學應與家長商討，以作出最適切選擇。如就選科事宜有任何查詢，可向本校{{
        committeeInCharge
      }}{{ pics[0] }}老師或{{ pics[1] }}老師聯絡。
    </p>
    <p>學生填表時須審慎認真，並留意下列要點：</p>
    <ul class="ms-4 my-6">
      <li>由於各科學額及學校資源有限，選修科將按學生全年成績優次編配；</li>
      <li>
        學校在編排選修科目組別時會考慮學生日後出路及興趣，務求滿足大部份學生的意願，惟由於學額、教師數目、學校設備等有限，學校未必能滿足全部學生意願；
      </li>
      <li>
        除選修一組及選修二組外，校方將推薦成績優異的學生修讀第三組選修科，當中包括「健康管理與社會關懷」或「數學延伸單元二」。校方將另函通知相關學生有關安排。
      </li>
      <li>
        學生及家長毋須因校方會否推薦修讀選修三組而影響安排選修一組及選修二組的意願。學生一旦獲校方推薦修讀選修三組中的「健康管理與社會關懷科」，系統在編配有關學生選修二組科目時會跳過該科，因此學生不會在選修二組及三組同時修讀「健康管理與社會關懷科」。
      </li>
      <li>
        編排選科組合次序前，應先參考本校<a
          href="https://careers.liping.edu.hk/subject-selection/"
          target="_blank"
          >生涯規劃部網頁</a
        >有關高中科目的資料。
      </li>
    </ul>
  </div>
</template>

<script>
import { isMock, committeeInCharge, pics, deadline } from '@/config.js'
import FormattedDatetime from '@/components/FormattedDatetime'

export default {
  components: { FormattedDatetime },
  data () {
    return {
      isMock,
      deadline,
      pics,
      committeeInCharge
    }
  }
}
</script>
