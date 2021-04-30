import CourseView from './components/CourseView.vue'
import CourseDetails from './components/CourseDetails.vue'
import CreateThread from './components/CreateThread.vue'

export default [
   { path : '/course', component: CourseView},
   { path : '/course/details', component: CourseDetails},
   { path : '/createthread', component: CreateThread},
];
