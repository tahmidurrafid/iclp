import CourseView from './components/CourseView.vue'
import CourseDetails from './components/CourseDetails.vue'
import CreateThread from './components/CreateThread.vue'
import InstructorDashboard from './components/InstructorDashboard.vue'
import CreateCourse from './components/CreateCourse.vue'

export default [
   { path : '/course', component: CourseView},
   { path : '/course/details', component: CourseDetails},
   { path : '/createthread', component: CreateThread},
   { path : '/instructordashboard', component: InstructorDashboard},
   { path : '/instructordashboard/createcourse', component: CreateCourse},
];
