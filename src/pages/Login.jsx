// import loginImg from "../assets/Images/login.webp"
// import Template from "../components/core/Auth/Template"

// function Login() {
//   return (
//     <Template
//       title="Welcome Back"
//       description1="Build skills for today, tomorrow, and beyond."
//       description2="Education to future-proof your career."
//       image={loginImg}
//       formType="login"
//     />
//   )
// }

// export default Login


import loginImg from "../assets/Images/44.jpg"; // Replace with a medical image if needed
import Template from "../components/core/Auth/Template";

function Login() {
  return ( 
    <Template
      title="Welcome Back to NeuroCare"
      description1="Access your health dashboard, track therapy, and connect with your care team."
      description2="Your journey to better neurological health starts here."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
