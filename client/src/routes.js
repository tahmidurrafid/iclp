import CourseView from './components/CourseView.vue'
import CourseDetails from './components/CourseDetails.vue'
import CreateThread from './components/CreateThread.vue'
import InstructorDashboard from './components/InstructorDashboard.vue'
import CreateCourse from './components/CreateCourse.vue'
import TakeQuiz from './components/TakeQuiz.vue'
import SubmitAssignment from './components/SubmitAssignment.vue'
import SetQuiz from './components/SetQuiz.vue'

export default [
   { path : '/course', component: CourseView},
   { path : '/course/details', component: CourseDetails},
   { path : '/createthread', component: CreateThread},
   { path : '/instructordashboard', component: InstructorDashboard},
   { path : '/instructordashboard/createcourse', component: CreateCourse},
   { path : '/takequiz', component : TakeQuiz} ,
   { path : '/submitassignment', component : SubmitAssignment},
   { path : '/setquiz', component : SetQuiz}
];
