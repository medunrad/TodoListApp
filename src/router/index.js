import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import ChangeLog from '@/components/ChangeLog'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/changeLog',
      name: 'ChangeLog',
      component: ChangeLog
    }
  ]
})
