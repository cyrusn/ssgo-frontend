<template>
  <div>
    <div class="alert alert-info">
      <b>已獲分發選修科人數 / 總人數</b>
      <span class="badge bg-danger rounded-pill ms-2"
        >{{ allocationResults.length }} / {{ filteredStudents.length }}</span
      >
    </div>
    <div class="alert alert-warning">
      <h6>已滿額選修科目</h6>
      <span
        v-for="s in occupiedSubjects"
        :key="s.id"
        class="badge bg-warning text-dark me-1"
        >{{ findSubject(s).code.toUpperCase() }}</span
      >
    </div>
    <table class="table table-border text-center table-striped">
      <tr>
        <th>獲派志願</th>
        <th>人次</th>
      </tr>

      <tr v-for="(value, key) in statistic" :key="key" class="border">
        <td class="border">{{ key }}</td>
        <td class="border">{{ value }}</td>
      </tr>
    </table>

    <subject-occupied-counters :counters="counters" />
    <download-results-button-group :results="allocationResults" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import combinations from "@/data/combination";
import subjects from "@/data/subject";
import SubjectOccupiedCounters from "@/components/SubjectOccupiedCounters";
import DownloadResultsButtonGroup from "@/components/DownloadResultsButtonGroup";
import { removeCombinationWithX3Subject } from "@/components/helpers";

const defaultCounters = {
  bio: 0,
  bafs: 0,
  chist: 0,
  phy: 0,
  ths: 0,
  va: 0,
  bio2: 0,
  chem: 0,
  econ: 0,
  geog: 0,
  hmsc: 0,
  hist: 0,
  ict: 0,
};

export default {
  components: {
    SubjectOccupiedCounters,
    DownloadResultsButtonGroup,
  },
  data() {
    return {
      counters: defaultCounters,
      occupiedSubjects: [],
      statistic: null,
    };
  },
  computed: {
    ...mapState("students", ["students", "statistic"]),
    ...mapState("subject", ["capacities"]),
    filteredStudents() {
      const { filter, students } = this;
      return filter(students);
    },
    allocationResults() {
      const {
        resetCounters,
        allocate,
        filteredStudents,
        resetOccupiedSubjects,
        updatePreferenceStatistic,
      } = this;
      resetOccupiedSubjects();
      resetCounters();
      const allocatedStudents = allocate(filteredStudents);
      const statistic = {
        "1": 0,
        "<=2": 0,
        "<=3": 0,
        "<=10": 0,
        "<=20": 0,
        ">20": 0,
      };
      allocatedStudents.forEach((s) => {
        console.log(s.preference);
        Object.keys(statistic).forEach((key) => {
          switch (key) {
            case "1":
              if (s.preference == 1) statistic[key] += 1;
              break;
            case "<=2":
              if (s.preference <= 2) statistic[key] += 1;
              break;
            case "<=3":
              if (s.preference <= 2) statistic[key] += 1;
              break;
            case "<=10":
              if (s.preference <= 10) statistic[key] += 1;
              break;
            case "<=20":
              if (s.preference <= 20) statistic[key] += 1;
              break;
            case ">20":
              if (s.preference > 20) statistic[key] += 1;
              break;
            default:
              break;
          }
        });
      });
      updatePreferenceStatistic(statistic);
      return _.filter(allocatedStudents, (s) => s.preference > 0);
    },
  },
  methods: {
    updatePreferenceStatistic(statistic) {
      this.statistic = Object.assign({}, statistic);
    },
    findSubject(code) {
      return _.find(subjects, { code });
    },
    resetOccupiedSubjects() {
      this.occupiedSubjects = [];
    },
    pushOccupiedSubjects(id) {
      const { occupiedSubjects } = this;
      if (_.includes(occupiedSubjects, id)) return;
      occupiedSubjects.push(id);
    },
    updateOccupiedSubjects() {
      const { capacities, pushOccupiedSubjects } = this;
      _.forOwn(this.counters, (v, k) => {
        if (v === capacities[k]) {
          pushOccupiedSubjects(k);
        }
      });
    },
    resetCounters() {
      this.counters = Object.assign({}, defaultCounters);
    },
    updateCounter(code) {
      this.counters[code] += 1;
    },
    getSubjectCodes(id) {
      return _.find(combinations, { id }).subjects;
    },
    isAvailable(id) {
      const { getSubjectCodes, counters, capacities } = this;
      const codes = getSubjectCodes(id);
      const subject1 = codes[0];
      const subject2 = codes[1];
      const validSubject1 = counters[subject1] < capacities[subject1];
      const validSubject2 = counters[subject2] < capacities[subject2];

      return validSubject1 && validSubject2;
    },
    makeOffers(priorities) {
      let offers;
      let orders;
      let preference;
      const {
        isAvailable,
        getSubjectCodes,
        updateCounter,
        counters,
        updateOccupiedSubjects,
      } = this;

      _.forEach(priorities, (id, i) => {
        if (isAvailable(id)) {
          const codes = getSubjectCodes(id);
          codes.forEach(updateCounter);

          offers = _.zipObject(["subject1", "subject2"], codes);
          orders = _.zipObject(
            ["subject1", "subject2"],
            codes.map((code) => counters[code]),
          );
          preference = i + 1;
          // break lodash forEach loop
          return false;
        }
      });
      updateOccupiedSubjects();
      return {
        offers,
        preference,
        orders,
      };
    },
    filter(students) {
      return _(students)
        .filter({ isConfirmed: true })
        .filter((s) => s.priorities.length === combinations.length)
        .filter((s) => s.rank > 0)
        .orderBy("rank")
        .value();
    },
    allocate(students) {
      const { makeOffers } = this;
      return _(students)
        .map((s) => {
          if (!s.isX3) return s;
          const priorities = removeCombinationWithX3Subject(
            s.priorities,
            "hmsc",
          );
          return Object.assign({}, s, { priorities });
        })
        .map((s) => Object.assign({}, s, makeOffers(s.priorities)))
        .orderBy(["classCode", "classNo"])
        .value();
    },
  },
};
</script>
