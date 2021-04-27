import CourseView from './components/CourseView.vue'
import CourseDetails from './components/CourseDetails.vue'

export default [
   { path : '/course', component: CourseView},
   { path : '/course/details', component: CourseDetails},
];
