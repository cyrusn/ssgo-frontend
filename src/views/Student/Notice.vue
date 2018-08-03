<template>
  <div>
    <div style="font-size: medium;" v-if='isConfirmed'>
      <letter-head :code='noticeCode'/>

      <div style='font-size: larger' class="mx-auto px-4">
        <p>敬啟者：</p>
        <h2 class='text-center'>有關{{isMock ? mockTitle : title}}事宜</h2>
        <p class='text-justify'>
          <span class="white-space" />本校於下學年中四級將開設12個選修科目，除核心科目外（中國語文、英國語文、數學及通識教育），每位學生須修讀兩個選修科目及一個其他學習經歷科目。
          {{isMock ? `為協助學生了解${title}程序及讓學校了解學生選科之意向，學生須在正式選科前進行模擬選科。` : null }}現請學生因應自己的學習能力、升學目標及興趣等因素，選擇選修科目。學生填表時須審慎認真，並留意下列要點：
        </p>

        <ul class="ml-4">
          <li>
            由於各科學額及學校資源有限，選修科將按學生全年成績優次編配；
          </li>
          <li>
            學校在編排選修科目組別時會考慮學生日後出路及興趣，務求滿足大部份學生的意願，唯由於學額、教師數目、學校設備等有限，學校未必能滿足全部學生意願；
          </li>
          <li v-if='isMock'>
            選修科分派後難以更改，因會直接影響其他學生獲分派的學科，故務必審慎選科；
          </li>
          <li>
            除核心科目、選修科目及其他學習經歷科目外，升讀中五時學生可申請修讀應用學習課程及數學延伸單元，報讀詳情將於中四級上學期另行通知；
          </li>
          <li>學生應先參考本校{{committeeInCharge}}網頁（{{committeeWebsite}}）相關資料。
          </li>
        </ul>

        <p class='text-justify'>
          <span class="white-space" />學生必須於本校選科系統（https://careers.liping.edu.hk/ss）完成網上{{isMock ? '模擬' : null}}選科，確定選科意向後，將選科意向表列印並交家長簽署，並於{{formatDate(deadline)}}或之前交予班主任。{{isMock ? null: '是次為正式選科，選科回條一經繳交，將不能更改志願。'}}如有疑問，請向{{committeeInCharge}}{{pics[0]}}老師或{{pics[1]}}老師查詢。耑此<span class="white-space" />函達，敬希<span class="white-space" />垂察！
        </p>
        <div>
          <p><span class="white-space" />此致</p>
          <p>中三級學生家長及學生</p>
        </div>

        <div>
          <div class='text-right'>
            聖公會李炳中學校長<br />
            彭君華謹啟
          </div>
        </div>
        <div class='text-left'>
          <br/>{{formatDate(deliveryDate)}}
        </div>
      </div>
      <hr class="d-print-none">

      <div class="page-break" />
      <letter-head :code='noticeCode'/>

      <div style='font-size: larger' class="my-4 px-4">
        <h2 class='text-center'>回條</h2>
        <p class="text-justify">
          敬覆者：頃接<span class="white-space" />貴校{{formatDate(deliveryDate)}}來函，本人知悉有關{{isMock ? mockTitle : title}}事宜，以下為學生{{classcode}}班{{classno}}號{{cname}}之{{isMock ? '模擬' : ''}}選科表。{{ isMock ? null: '本人及敝子弟明白是次為正式選科，選科回條一經繳交，將不能更改志願。' }}
        </p>
      </div>

      <div class="card my-4 mx-4">
        <h5 class="card-header">已選定的選科次序</h5>
        <dragable-combination
          :list="prioritisedCombinations"
          :movable="!isConfirmed"
          name="prioritised"
          color="btn-lg btn-light"
          />
      </div>

      <div style='font-size: larger' class="mb-4" >
        <p><span class="white-space" />此覆</p>
        <p>聖公會李炳中學校長</p>
        <div class='row'>
          <div class="col-8"></div>
          <table class='col-4 align-self-end'>
            <tbody>
              <tr class="border-bottom">
                <td>班別學號：</td>
                <td>{{classcode}}{{classno}}</td>
              </tr>
              <tr class="border-bottom">
                <td>姓名：</td>
                <td>{{cname}}</td>
              </tr>
              <tr class="border-bottom">
                <td>家長簽名：</td>
                <td><br/><br/><br/></td>
              </tr>
              <tr>
                <td>通告編號：</td>
                <td>{{noticeCode}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class='text-lef'>
          {{formatDate(returnYear, 'year')}}
          <span class="white-space">月</span>
          <span class="white-space">日</span>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-danger">
      同學必須完成網上{{isMock ? '模擬' : null}}選科。列印選科意向表並交家長簽署，並於{{formatDate(deadline)}}或之前交予班主任。{{isMock ? null: '是次為正式選科，選科回條一經繳交，將不能更改志願。'}}如有疑問，可向{{committeeInCharge}}{{pics[0]}}老師或{{pics[1]}}老師查詢。
      <ul>
        <li>將所有選科組合排好優次</li>
        <li>確定選科意向</li>
        <li>列印選科意向表</li>
        <li>家長簽署</li>
        <li>{{formatDate(deadline)}}或之前交予班主任</li>
      </ul>
    </div>
  </div>
</template>

<script>
import LetterHead from '@/components/LetterHead'
import Formatter from '@/chineseDateFormatter'
import DragableCombination from '@/components/DragableCombination'
import combinations from '@/data/combination'
import students from '@/data/student'
import _ from 'lodash'
import {mapState, mapGetters} from 'vuex'

import {
  noticeCode, isMock, mockTitle, title, committeeInCharge, committeeWebsite,
  pics, deliveryDate, deadline, returnYear
} from '@/config'

export default {
  components: {
    LetterHead, DragableCombination
  },
  data () {
    return {
      noticeCode, isMock, mockTitle, title, committeeInCharge, committeeWebsite, pics, deliveryDate, deadline, returnYear
    }
  },
  computed: {
    ...mapGetters(['userAlias']),
    ...mapState('student', ['priorities', 'isConfirmed']),
    prioritisedCombinations () {
      const {priorities} = this
      return _.map(priorities, id => _.find(combinations, {id}))
    },
    user () {
      const {userAlias} = this
      return _.find(students, {userAlias})
    },
    classcode () {
      return this.user.classcode
    },
    classno () {
      return this.user.classno
    },
    cname () {
      return this.user.cname
    }
  },
  methods: {
    formatDate (date, type) {
      type = type || 'simple'
      return new Formatter(date)[type]
    }
  }
}

</script>

<style>
.page-break {
  page-break-after: always;
}
.white-space {
  margin-left: 2em
}
</style>
