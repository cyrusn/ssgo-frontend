// root state handle event for auth and user information
import student from "@/store/modules/student";
import { createStore } from "vuex";
import students from "@/store/modules/students";
import subject from "@/store/modules/subject";

import { checkError, alertMessage } from "@/store/helpers";
import _ from "lodash";

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library#answer-38552302
function parseJWT(jwt) {
  const base64Url = jwt.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  const result = JSON.parse(jsonPayload);
  // console.log(result);
  return result;
}

export default createStore({
  modules: {
    student,
    students,
    subject,
  },
  state: {
    jwt: "",
    message: "",
  },
  getters: {
    _info: (state) => (state.jwt ? parseJWT(state.jwt) : {}),
    role: (_, getters) => getters._info.Role || "",
    name: (_, getters) => getters._info.Name || "",
    cname: (_, getters) => getters._info.Cname || "",
    userAlias: (_, getters) => getters._info.UserAlias || "",
    expireAt: (_, getters) => new Date(getters._info.exp * 1000) || new Date(),
  },
  mutations: {
    updateJWT(state, jwt) {
      state.jwt = jwt;
    },
    updateMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    login({ commit, dispatch, getters }, { userAlias, password }) {
      fetch("./api/auth/login", {
        method: "POST",
        body: JSON.stringify({ userAlias, password }),
      })
        .then(checkError)
        .then((res) => res.text())
        .then((text) => {
          return text;
        })
        .then((text) => commit("updateJWT", text))
        .then(() => {
          const { role } = getters;
          switch (true) {
            case role === "STUDENT":
              dispatch("student/get");
              break;
            case _.includes(["TEACHER", "ADMIN"], role):
              dispatch("students/get");
              break;
          }
        })
        .catch(alertMessage);
    },
    refreshJWT({ state, commit }) {
      fetch("./api/auth/refresh/jwt", {
        method: "GET",
        headers: { jwt: state.jwt },
      })
        .then(checkError)
        .then((res) => res.text())
        .then((text) => commit("updateJWT", text))
        .catch(alertMessage);
    },
  },
});
