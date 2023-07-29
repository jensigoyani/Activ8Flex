export const host = "http://localhost:8800";
export const registerRoute = `${host}/user/register`;
export const loginRoute = `${host}/user/login`;
export const allUsersRoute = `${host}/user/allUsers`;
export const allInstructorRoute = `${host}/user/allInstructors`;
export const logoutRoute = `${host}/user/logout`;
export const feedbackRoute = `${host}/user/feedback`;
export const contactRoute = `${host}/user/contactus`;
export const ResetPassword = `${host}/user/sendpasswordlink`
export const ForgetPasswordRoute = `${host}/user/forget-password`

//VIDEO CALL
export const videoCallRoute = `${host}/video/videocall-register`

//APPOINTMENT
export const userAppointmentRoute = `${host}/appointment/addappointment`;
export const appointmentListRoute = `${host}/appointment/appointmentlist`;

// instructor
export const loginInstructorRoute = `${host}/instructor/login`;
export const feedbackInstructorRoute = `${host}/instructor/feedback`;
export const contactInstructorRoute = `${host}/instructor/contactus`;
export const allUserChatRoute = `${host}/instructor/allusers`;

//message
export const sendMessageRoute = `${host}/message/addmsg`;
export const getAllMessagesRoute = `${host}/message/getmsg`;
export const getOneInstructorRoute = `${host}/user/oneInstructors`;

// payment
export const payInvoice = `${host}/payment/pay-order`
export const createInvoice = `${host}/payment/create-order`
export const getKey = `${host}/payment/get-razorpay-key`
export const listInvoice = `${host}/payment/list-invoices`

// admin
export const adminlogin = `${host}/admin/login`;