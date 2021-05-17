import { createRouter, createWebHashHistory } from 'vue-router'

import Navbar from '@/components/Navbar.vue'
import Login from '@/views/Login.vue'

import Teacher from '@/views/Teacher/Teacher.vue'
import List from '@/views/Teacher/List.vue'

import Admin from '@/views/Admin/Admin.vue'
import Allocation from '@/views/Admin/Allocation.vue'
import Rank from '@/views/Admin/Rank.vue'

import Student from '@/views/Student/Student.vue'
import Notice from '@/views/Student/Notice.vue'
import Selection from '@/views/Student/Selection.vue'

function ViewBuilder (View) {
  return {
    default: View,
    navbar: Navbar
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      components: ViewBuilder(Login)
    },
    {
      path: '/teacher',
      name: 'teacher',
      components: ViewBuilder(Teacher),
      children: [
        {
          path: 'list',
          name: 'list',
          component: List
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      components: ViewBuilder(Admin),
      children: [
        {
          path: 'allocation',
          name: 'allocation',
          component: Allocation
        },
        {
          path: 'rank',
          name: 'rank',
          component: Rank
        }
      ]
    },
    {
      path: '/student',
      name: 'student',
      components: ViewBuilder(Student),
      children: [
        {
          path: 'selection',
          name: 'selection',
          component: Selection
        },
        {
          path: 'notice',
          name: 'notice',
          component: Notice
        }
      ]
    }
  ]
})

export { router }
