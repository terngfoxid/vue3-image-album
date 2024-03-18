import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ALbumView from '@/views/AlbumView.vue'
import ALbumCreateView from '@/views/AlbumCreateView.vue'
import ALbumEditView from '@/views/AlbumEditView.vue'
import GalleryManageView from '@/views/GalleryManageView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/album',
    name: 'album',
    component: ALbumView
  },
  {
    path:'/album/page/:page',
    name: 'albumPage',
    component: ALbumView
  },
  {
    path:'/album/name/:name/page/:page',
    name: 'albumNamePage',
    component: ALbumView
  },
  {
    path:'/album/create',
    name: 'album-create',
    component: ALbumCreateView
  },
  {
    path:'/album/edit/:id',
    name: 'album-edit',
    component: ALbumEditView
  },
  {
    path:'/album/gallery/:id',
    name: 'gallery-edit',
    component: GalleryManageView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
