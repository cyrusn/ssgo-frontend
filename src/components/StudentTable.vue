<template>
  <table class="table table-hover mt-2">
    <thead class="thead-light">
      <tr>
        <th>學生編號</th>
        <th>班別</th>
        <th>學號</th>
        <th>英文姓名</th>
        <th>中文姓名</th>
        <th>已確認 ／ 尚未確認</th>
        <th v-if="role==='ADMIN'">級名次</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in list" :key="s.id">
        <td>{{s.userAlias}}</td>
        <td>{{s.classcode}}</td>
        <td>{{s.classno}}</td>
        <td>{{s.name}}</td>
        <td>{{s.cname}}</td>
        <td>
          <span
            v-if="role === 'TEACHER'"
            :class="!s.isConfirmed ? 'text-danger': ''"
          >{{s.isConfirmed ? '已確認' : '尚未確認'}}</span>
          <button
            v-else
            type="button"
            class="btn"
            :class="
            s.isConfirmed ? 'btn-success' : 'btn-danger'
          "
            @click="setIsConfirmed({
              'userAlias': s.userAlias, 'isconfirmed': !s.isConfirmed
            })"
          >{{s.isConfirmed ? '已確認' : '尚未確認'}}</button>
        </td>
        <td
          v-if="role==='ADMIN'"
          :class="s.rank === 0 ? 'text-danger' :'text-success'"
        >{{s.rank === 0 ? '尚未提供' : s.rank}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['list'],
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    ...mapActions('student', ['setIsConfirmed'])
  }
}
</script>
