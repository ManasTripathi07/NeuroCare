import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home  from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword"
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Errror from "./pages/Errror";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useNavigate } from "react-router-dom";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses"
import EditCourse from "./components/core/Dashboard/EditCourse/index"
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import TrailMakingTest from "./components/core/Tests/TrailMakingTest";
import TrailMakingTestB from "./components/core/Tests/TrailMakingTestB";
import EmotionRecognitionTest from "./components/core/Tests/EmotionRecognitionTest";
import AceTest from "./components/core/Tests/AceTest";
import PulseTrackerGame from "./components/core/Tests/PulseTrackerTest";
import TrailTestSelectionPage from "./pages/TrailTestSelectionPage";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="catalog/:catalogName" element={<Catalog/>}/> */}

        <Route path="catalog/trail-test" element={
          <PrivateRoute>
              {/* <TrailMakingTest/> */}
              <TrailTestSelectionPage/>
          </PrivateRoute>}/>

         <Route path="test-a" element={
            <PrivateRoute>
              <TrailMakingTest/>
            </PrivateRoute>   
          }/>

          <Route path="test-b" element={
            <PrivateRoute>
              <TrailMakingTestB/>
            </PrivateRoute>   
          }/>
        
        

         {/* Route for the emotion recognition test*/}
          <Route path="catalog/emotion-test" element={
          <PrivateRoute>
             <EmotionRecognitionTest/>
          </PrivateRoute>}/> 

          <Route path="catalog/pulse-test" element={
          <PrivateRoute>
             <PulseTrackerGame/>
          </PrivateRoute>}/> 

          
        {/* Ace Test Route Needs to be added here */}
         <Route path="catalog/ace-test" element={
          <PrivateRoute>
             <AceTest/>
          </PrivateRoute>}/> 
    
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
            />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
            }
          />

          <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
            />

          <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
            />

          <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
            />

            <Route
          path="about"
          element={
            
              <About/>
            
          }
            />

            <Route path="/contact" element={<Contact />} />

            <Route element = {
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }>
              <Route path="dashboard/my-profile" element={<MyProfile/>}/>
              <Route path="dashboard/Settings" element={<Settings />} />
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  </>
                )
              }

              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                  <Route path="dashboard/instructor" element={<Instructor />} />
                  <Route path="dashboard/add-course" element={<AddCourse/>} />
                  <Route path="dashboard/my-courses" element={<MyCourses />} />
                  <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                  </>
                )
              }
            </Route>

            
            <Route
              element={
                <PrivateRoute>
                  <ViewCourse />
                </PrivateRoute>
              }
            >
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails />}
                  />
                </>
              )}
            </Route>

            <Route path="*" element = {<Errror/>}/>

      </Routes>
    </div>
  );
}

export default App;
