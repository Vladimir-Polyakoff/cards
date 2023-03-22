import Vue from 'vue'
import VueRouter from 'vue-router'
import CardList from '@/views/CardList'
import AdditingCard from '@/views/AdditingCard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'card-list',
    component: CardList
  },
  {
    path: '/additing/:id',
    name: 'additing-card',
    component: AdditingCard,
    params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
