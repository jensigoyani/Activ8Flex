import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Common/Loader";

const Home = React.lazy(() => import("../pages/Home/Home"))
const Register = React.lazy(() => import("../components/view/registration/Register"))
const AboutUs = React.lazy(() => import("../pages/AboutUs/AboutUs"))
const WeeklySchedule = React.lazy(() => import("../pages/WeeklySchedule/WeeklySchedule"))
const Plans = React.lazy(() => import("../pages/Plans/Plans"))
const ContactUS = React.lazy(() => import("../components/view/contactus/ContactUS"))
const Classes = React.lazy(() => import("../pages/Classes/Classes"))
const Payment = React.lazy(() => import("../components/payment/PaymentSuccess"))
const Feedback = React.lazy(() => import("../components/view/feedback/Feedback"))
const LoginInstructor = React.lazy(() => import("../components/view/login/LoginInstructor"))
const ContactUsInstructor = React.lazy(() => import("../components/view/contactus/ContactUsInstructor"))
const FeedbackInstructor = React.lazy(() => import("../components/view/feedback/FeedbackInstructor"))
const Login = React.lazy(() => import("../components/view/login/Login"))
const FeedbackList = React.lazy(() => import("../components/admin/view/FeedbackList"))
const ContactList = React.lazy(() => import("../components/admin/view/ContactList"))
const EditAppointment = React.lazy(() => import("../components/admin/appointment/EditAppointment"))
const AppointmentList = React.lazy(() => import("../components/admin/AppointmentList"))
const Payments = React.lazy(() => import("../components/admin/Payments"))
const EditInstructor = React.lazy(() => import("../components/admin/instructor/EditInstructor"))
const InstructorList = React.lazy(() => import("../components/admin/InstructorList"))
const EditUser = React.lazy(() => import("../components/admin/user/EditUser"))
const UserList = React.lazy(() => import("../components/admin/UserList"))
const Admin = React.lazy(() => import("../components/admin/Admin"))
const UserProfile = React.lazy(() => import("../components/view/Profile/UserProfile"))
const InstructorAppointment = React.lazy(() => import("../components/Appointment/InstructorAppointment.js/InstructorAppointment"))
const BookApointMent = React.lazy(() => import("../components/Appointment/BookApointMent/BookApointMent"))
const InstructorChat = React.lazy(() => import("../components/chat/instructot/InstructorChat"))
const UserChat = React.lazy(() => import("../components/chat/userchat/UserChat"))
const AdminLogin = React.lazy(() => import("../components/admin/login/AdminLogin"))
const AddIns = React.lazy(() => import("../components/admin/instructor/AddIns"))
const EditUserProfile = React.lazy(() => import("../components/view/Profile/EditProfile"))
const InstructorProfile = React.lazy(() => import("../components/view/Profile/InstructirProfile"))
const EditInstructorProfile = React.lazy(() => import("../components/view/Profile/EditInsProfile"))
const PaymentSuccess = React.lazy(() => import("../components/payment/PaymentSuccess"))
const Ins = React.lazy(() => import("../components/Instructor/Ins"))
const InsUserList = React.lazy(() => import("../components/Instructor/InsUserList"))
const MainHomePage = React.lazy(() => import("../pages/Home/MainHomePage"))
const ForgetPassword = React.lazy(() => import("../components/view/Password/ForgetPassword"))
const ChangePassword = React.lazy(() => import("../components/view/Password/ChangePassword"))
const InsForgetPwd = React.lazy(() => import("../components/view/Password/InsForgetPwd"))
const InsChangePwd = React.lazy(() => import("../components/view/Password/InsChangePwd"))
const ResetPassword = React.lazy(() => import("../components/view/Password/ResetPassword"))
const AdminChangePwd = React.lazy(() => import("../components/view/Password/AdminChangePwd"))

const Routers = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<Loader />}>
            <MainHomePage />
          </Suspense>
        }>
          <Route path="/login" index element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          } />
          <Route path="/register" element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          } />
          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          } />
          <Route path="/about" exact element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
            </Suspense>
          } />
          <Route path="/weeklyschedule" exact element={
            <Suspense fallback={<Loader />}>
              <WeeklySchedule />
            </Suspense>
          } />
          <Route path="/pricing" exact element={
            <Suspense fallback={<Loader />}>
              <Plans />
            </Suspense>
          } />
          <Route path="/contact" exact element={
            <Suspense fallback={<Loader />}>
              <ContactUS />
            </Suspense>
          } />
          <Route path="/classes" exact element={
            <Suspense fallback={<Loader />}>
              <Classes />
            </Suspense>
          } />
          <Route path="/payment" exact element={
            <Suspense fallback={<Loader />}>
              <Payment />
            </Suspense>
          } />
          <Route path="/appointment" element={
            <Suspense fallback={<Loader />}>
              <BookApointMent />
            </Suspense>
          } />
          <Route path="/userchat" element={
            <Suspense fallback={<Loader />}>
              <UserChat />
            </Suspense>
          } />
          <Route path="/feedback" exact element={
            <Suspense fallback={<Loader />}>
              <Feedback />
            </Suspense>
          } />
          <Route path="/profile" exact element={
            <Suspense fallback={<Loader />}>
              <UserProfile />
            </Suspense>
          } />
          <Route path="/payment/success" exact element={
            <Suspense fallback={<Loader />}>
              <PaymentSuccess />
            </Suspense>
          } />
          <Route path="/user/edit/:id" exact element={
            <Suspense fallback={<Loader />}>
              <EditUserProfile />
            </Suspense>
          } />
          <Route path="/forget-password" element={
            <Suspense fallback={<Loader />}>
              <ForgetPassword />
            </Suspense>
          } />
          <Route path="/reset-password" element={
            <Suspense fallback={<Loader />}>
              <ChangePassword />
            </Suspense>
          } />
          <Route path="/password-reset/:id/:token" element={
            <Suspense fallback={<Loader />}>
              <ResetPassword />
            </Suspense>
          } />
        </Route>
        <Route>
          <Route path="/instructor" exact element={
            <Suspense fallback={<Loader />}>
              <Ins />
            </Suspense>
          } />
          <Route path="/instructor/login" index element={
            <Suspense fallback={<Loader />}>
              <LoginInstructor />
            </Suspense>
          } />
          <Route path="/instructor/contact" exact element={
            <Suspense fallback={<Loader />}>
              <ContactUsInstructor />
            </Suspense>
          } />
          <Route path="/instructor/forget-password" element={
            <Suspense fallback={<Loader />}>
              <InsForgetPwd />
            </Suspense>
          } />
          <Route path="/instructor/reset-password" element={
            <Suspense fallback={<Loader />}>
              <InsChangePwd />
            </Suspense>
          } />
          <Route path="/instructor/feedback" exact element={
            <Suspense fallback={<Loader />}>
              <FeedbackInstructor />
            </Suspense>
          } />
          <Route path="/instructor/appointment" exact element={
            <Suspense fallback={<Loader />}>
              <InstructorAppointment />
            </Suspense>
          } />
          <Route path="/instructor/users" exact element={
            <Suspense fallback={<Loader />}>
              <InsUserList />
            </Suspense>
          } />
          <Route path="/instructor/chat" exact element={
            <Suspense fallback={<Loader />}>
              <InstructorChat />
            </Suspense>
          } />
          <Route path="/instructor/weeklyschedule" exact element={
            <Suspense fallback={<Loader />}>
              <WeeklySchedule />
            </Suspense>
          }
          />
          <Route path="/instructor/profile" exact element={
            <Suspense fallback={<Loader />}>
              <InstructorProfile />
            </Suspense>
          } />
          <Route path="/instructor/edit/:id" exact element={
            <Suspense fallback={<Loader />}>
              <EditInstructorProfile />
            </Suspense>
          } />
        </Route>
        <Route>
          <Route path="/admin/login" exact element={
            <Suspense fallback={<Loader />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/home" exact element={
            <Suspense fallback={<Loader />}>
              <Admin />
            </Suspense>
          } />
          <Route path="/admin/users/list" exact element={
            <Suspense fallback={<Loader />}>
              <UserList />
            </Suspense>
          } />
          <Route path="/admin/users/list/edit/:id" exact element={
            <Suspense fallback={<Loader />}>
              <EditUser />
            </Suspense>
          } />
          <Route path="/admin/instructors/list" exact element={
            <Suspense fallback={<Loader />}>
              <InstructorList />
            </Suspense>
          } />
          <Route path="/admin/instructors/list/edit/:id" exact element={
            <Suspense fallback={<Loader />}>
              <EditInstructor />
            </Suspense>
          } />
          <Route path="/admin/instructor/list/add" exact element={
            <Suspense fallback={<Loader />}>
              <AddIns />
            </Suspense>
          } />
          <Route path="/admin/payment/list" exact element={
            <Suspense fallback={<Loader />}>
              <Payments />
            </Suspense>
          } />
          <Route path="/admin/appointment/list" exact element={
            <Suspense fallback={<Loader />}>
              <AppointmentList />
            </Suspense>
          } />
          <Route path="/admin/appointment/list/edit/:id" exact element={
            <Suspense fallback={<Loader />}>
              <EditAppointment />
            </Suspense>
          } />
          <Route path="/admin/contact/list" exact element={
            <Suspense fallback={<Loader />}>
              <ContactList />
            </Suspense>
          } />
          <Route path="/admin/feedback/list" exact element={
            <Suspense fallback={<Loader />}>
              <FeedbackList />
            </Suspense>
          } />
          <Route path="/admin/reset-password" element={
            <Suspense fallback={<Loader />}>
              <AdminChangePwd />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
