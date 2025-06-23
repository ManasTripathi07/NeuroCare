import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../common/Navbar';

const Hero = () => {
  return (
    <div id="home-page" className="page active">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="w-11/12 max-w-maxContent container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prescreening of Cognitive Impairements
            </h1>
            <p className="text-xl mb-8">
              Early detection and intervention for Alzheimer's, Dementia,
              Parkinson's and other neurodegenerative conditions using
              cutting-edge technology and standardized assessments.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/login"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-center transition shadow-lg hover:text-white hover:bg-yellow-100  duration-200"
              >
                Take a Test
              </a>
              <a
                href="/about"
                className="border-2 border-white text-white hover:bg-yellow-5 duration-200 hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition hover:border-yellow-100"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Brain scan illustration"
              className="rounded-lg shadow-2xl max-w-md w-full floating"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 w-11/12 max-w-maxContent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                value: "50M+",
                label: "People Affected Worldwide",
                desc: "Neurodegenerative diseases impact millions globally, with numbers rising.",
                color: "text-blue-600",
              },
              {
                value: "60%",
                label: "Cases Undiagnosed",
                desc: "Early detection can significantly improve quality of life.",
                color: "text-green-500",
              },
              {
                value: "10+",
                label: "Standardized Tests",
                desc: "Comprehensive assessments for accurate detection.",
                color: "text-purple-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl  shadow-md transition-all duration-200 hover:shadow-[10px_-5px_50px_-5px] hover:shadow-blue-200 shadow-blue-200 bg-yellow-25 hover:scale-105 tr"
              >
                <div className={`text-5xl font-bold ${item.color} mb-4`}>
                  {item.value}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.label}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 ">
        <div className="container mx-auto px-4 w-11/12 max-w-maxContent">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-richblack-100 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-richblack-100 max-w-3xl mx-auto">
              From early detection to ongoing monitoring, we provide a full
              spectrum of neurodegenerative disease assessment tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cognitive Assessments */}
            <div className="bg-white p-8 rounded-xl hover:scale-105 transition-all duration-200 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
              <div className="text-blue-500 mb-4">
                <i className="fas fa-brain text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Cognitive Assessments
              </h3>
              <p className="text-gray-600 mb-4">
                Standardized tests to evaluate memory, attention, language, and
                other cognitive functions.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Mini-Mental State Examination (MMSE)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Montreal Cognitive Assessment (MoCA)</span>
                </li>
              </ul>
            </div>

            {/* Progression Tracking */}
            <div className="bg-white p-8 rounded-xl hover:scale-105 transition-all duration-200 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
              <div className="text-green-500 mb-4">
                <i className="fas fa-chart-line text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Progression Tracking
              </h3>
              <p className="text-gray-600 mb-4">
                Monitor disease progression over time with regular assessments
                and data analysis.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Personalized dashboards</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Longitudinal data visualization</span>
                </li>
              </ul>
            </div>

            {/* Expert Consultation */}
            <div className="bg-white p-8 rounded-xl hover:scale-105 transition-all duration-200 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
              <div className="text-purple-500 mb-4">
                <i className="fas fa-user-md text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Expert Consultation
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with neurologists and specialists for interpretation of
                results.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Telemedicine options</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Personalized recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Hero;