// import signupImg from "../assets/Images/signup.webp"
// import Template from "../components/core/Auth/Template"

// function Signup() {
//   return (
//     <Template
//       title="Join the millions learning to code with StudyNotion for free"
//       description1="Build skills for today, tomorrow, and beyond."
//       description2="Education to future-proof your career."
//       image={signupImg}
//       formType="signup"
//     />
//   )
// }

// export default Signup



import signupImg from "../assets/Images/signup.webp"; // Replace with a medical-themed image if desired
import Template from "../components/core/Auth/Template";

function Signup() {
  return (
    <Template
      title="Join NeuroCare — your digital companion for brain health"
      description1="Monitor your symptoms, access personalized care plans, and stay informed about neurodegenerative conditions."
      description2="Together, we empower patients and caregivers for a better tomorrow."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
