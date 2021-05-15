import CourseView from './components/CourseView.vue'
import CourseDetails from './components/CourseDetails.vue'
import CreateThread from './components/CreateThread.vue'
import InstructorDashboard from './components/InstructorDashboard.vue'
import CreateCourse from './components/CreateCourse.vue'
import TakeQuiz from './components/TakeQuiz.vue'
import SubmitAssignment from './components/SubmitAssignment.vue'
import SetQuiz from './components/SetQuiz.vue'
import Playground from './components/Playground.vue'
import AdminPanel from './components/AdminPanel.vue'
import CreateGame from './components/CreateGame.vue'

export default [
   { path : '/course', component: CourseView},
   { path : '/course/details', component: CourseDetails},
   { path : '/createthread', component: CreateThread},
   { path : '/instructordashboard', component: InstructorDashboard},
   { path : '/instructordashboard/createcourse', component: CreateCourse},
   { path : '/takequiz', component : TakeQuiz} ,
   { path : '/submitassignment', component : SubmitAssignment},
   { path : '/setquiz', component : SetQuiz},
   { path : '/playground', component : Playground},
   { path : '/admin', component : AdminPanel},
   { path : '/creategame', component : CreateGame},
];
