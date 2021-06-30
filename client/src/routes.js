import CourseView from './components/CourseView.vue'
import CourseDetails from './components/CourseDetails.vue'
import courseComplete from './components/courseComplete.vue'
import CreateThread from './components/CreateThread.vue'
import InstructorDashboard from './components/InstructorDashboard.vue'
import CreateCourse from './components/CreateCourse.vue'
import TakeQuiz from './components/TakeQuiz.vue'
import SubmitAssignment from './components/SubmitAssignment.vue'
import SetQuiz from './components/SetQuiz.vue'
import Playground from './components/Playground.vue'
import AdminPanel from './components/AdminPanel.vue'
import CreateGame from './components/CreateGame.vue'
import Login from './components/Login.vue'
import Registration from './components/Registration.vue'
import UserProfile from './components/UserProfile.vue'

export default [
   { path : '/course', component: CourseView},
   { path : '/course/details', component: CourseDetails},
   { path : '/course/complete', component: courseComplete},
   { path : '/createthread', component: CreateThread},
   { path : '/instructordashboard', component: InstructorDashboard},
   { path : '/instructordashboard/createcourse', component: CreateCourse},
   { path : '/takequiz', component : TakeQuiz} ,
   { path : '/course/submitassignment', component : SubmitAssignment},
   { path : '/setquiz', component : SetQuiz},
   { path : '/playground', component : Playground},
   { path : '/admin', component : AdminPanel},
   { path : '/creategame', component : CreateGame},
   { path : '/login', component : Login},
   { path : '/registration', component : Registration},
   { path : '/user/profile', component : UserProfile},
];
