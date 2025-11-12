// import React from "react";
// import { FooterLink2 } from "../../data/footer-links";
// import { Link } from "react-router-dom";

// // Images
// import Logo from "../../assets/Logo/Logo-Full-Light.png";

// // Icons
// import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
// const Resources = [
//   "Articles",
//   "Blog",
//   "Chart Sheet",
//   "Code challenges",
//   "Docs",
//   "Projects",
//   "Videos",
//   "Workspaces",
// ];
// const Plans = ["Paid memberships", "For students", "Business solutions"];
// const Community = ["Forums", "Chapters", "Events"];

// const Footer = () => {
//   return (
//     <div className="bg-richblack-800">
//       <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
//         <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
//           {/* Section 1 */}
//           <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
//             <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
//               <img src={Logo} alt="" className="object-contain" />
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Company
//               </h1>
//               <div className="flex flex-col gap-2">
//                 {["About", "Careers", "Affiliates"].map((ele, i) => {
//                   return (
//                     <div
//                       key={i}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.toLowerCase()}>{ele}</Link>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="flex gap-3 text-lg">
//                 <FaFacebook />
//                 <FaGoogle />
//                 <FaTwitter />
//                 <FaYoutube />
//               </div>
//               <div></div>
//             </div>

//             <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Resources
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Resources.map((ele, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.split(" ").join("-").toLowerCase()}>
//                         {ele}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>

//               <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
//                 Support
//               </h1>
//               <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
//                 <Link to={"/help-center"}>Help Center</Link>
//               </div>
//             </div>

//             <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Plans
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Plans.map((ele, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.split(" ").join("-").toLowerCase()}>
//                         {ele}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//               <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
//                 Community
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Community.map((ele, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.split(" ").join("-").toLowerCase()}>
//                         {ele}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Section 2 */}
//           <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
//             {FooterLink2.map((ele, i) => {
//               return (
//                 <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//                   <h1 className="text-richblack-50 font-semibold text-[16px]">
//                     {ele.title}
//                   </h1>
//                   <div className="flex flex-col gap-2 mt-2">
//                     {ele.links.map((link, index) => {
//                       return (
//                         <div
//                           key={index}
//                           className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                         >
//                           <Link to={link.link}>{link.title}</Link>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
//         {/* Section 1 */}
//         <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
//           <div className="flex flex-row">
//             {BottomFooter.map((ele, i) => {
//               return (
//                 <div
//                   key={i}
//                   className={` ${
//                     BottomFooter.length - 1 === i
//                       ? ""
//                       : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                   } px-3 `}
//                 >
//                   <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
//                     {ele}
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="text-center">Made with ❤️ by Manas Tripathi © 2025 Studynotion</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/Logo/apple-touch-icon.png";

// Dummy footer sections for the medical theme
const CompanyLinks = ["About Us", "Our Team", "Partners"];
const Care = ["Patient Care", "Neuro Nursing", "Emergency Services"];
const Diagnosis = ["Cognitive Tests", "MRI & Scans", "Genetic Testing"];
const Therapies = ["Physical Therapy", "Occupational Therapy", "Counseling"];
const Community = ["Support Groups", "Webinars", "Events"];
const Policies = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-1/2 flex flex-wrap justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            {/* Company */}
            <div className="w-[30%] mb-7">
             
                <div className='flex text-white justify-center items-center space-x-2 translate-x-[-40px] translate-y-[-10px]'>
                    <img src = {logo} alt='logoImage' width={35} height={20} loading='lazy'/>
                    <p className='text-xl font-semibold'>NeuroCare</p>
                </div>
                    
              
              <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2 mt-2">
                {CompanyLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 text-lg mt-4">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Care */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Care</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Care.map((link, i) => (
                  <Link
                    key={i}
                    to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Diagnosis</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Diagnosis.map((link, i) => (
                  <Link
                    key={i}
                    to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-1/2 flex flex-wrap justify-between pl-3 lg:pl-5 gap-3">
            {/* Therapies */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Therapies</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Therapies.map((link, i) => (
                  <Link
                    key={i}
                    to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Community */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((link, i) => (
                  <Link
                    key={i}
                    to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[14px] hover:text-richblack-50 transition-all duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Support</h1>
              <div className="text-[14px] hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to="/contact">Contact Us</Link>
              </div>
              <div className="text-[14px] hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to="/help-center">Help Center</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {Policies.map((ele, i) => (
              <div
                key={i}
                className={`${
                  i !== Policies.length - 1
                    ? "border-r border-richblack-700"
                    : ""
                } px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200`}
              >
                <Link to={`/${ele.toLowerCase().replace(/ /g, "-")}`}>{ele}</Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            © 2025 NeuroCare  · Designed with ❤️ by <a className="text-caribbeangreen-100" href="https://www.linkedin.com/in/manas-tripathi-73876324b/">Manas Tripathi </a> &
            <a className="text-caribbeangreen-100"  href="https://www.linkedin.com/in/meet-agrawal-bb5350292/"> Meet Dipak Agrawal</a> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
