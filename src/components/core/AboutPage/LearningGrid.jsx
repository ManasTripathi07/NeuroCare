// import React from 'react'
// import HighLightText from '../HomePage/HighLightText';
// import CTAButton from '../../../components/core/HomePage/Button'

// const LearningGridArray = [
//     {
//       order: -1,
//       heading: "World-Class Learning for",
//       highlightText: "Anyone, Anywhere",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//       BtnText: "Learn More",
//       BtnLink: "/",
//     },
//     {
//       order: 1,
//       heading: "Curriculum Based on Industry Needs",
//       description:
//         "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
//     },
//     {
//       order: 2,
//       heading: "Our Learning Methods",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//     {
//       order: 3,
//       heading: "Certification",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//     {
//       order: 4,
//       heading: `Rating "Auto-grading"`,
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//     {
//       order: 5,
//       heading: "Ready to Work",
//       description:
//         "Studynotion partners with more than 275+ leading universities and companies to bring",
//     },
//   ];

// const LearningGrid = () => {
//   return (
//     <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
//       {
//         LearningGridArray.map( (card,index) => {
//             return(
//                 <div key={index}
//                 className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"}
//                 ${card.order % 2 === 1 ? "bg-richblack-700 h-[294px]" : "bg-richblack-800 h-[294px]"}
//                 ${card.order === 3 && "xl:col-start-2"} 
//                 ${card.order < 0 && "bg-transparent translate-y-[-45px]"}
//                 `}
//                 >
//                 {
//                     card.order < 0
//                     ? (
//                         <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
//                             <div className="text-4xl font-semibold ">
//                                 {card.heading} {" "}
//                                 <HighLightText text={card.highlightText} />
//                             </div>
//                             <p className="text-richblack-300 font-medium">
//                                 {card.description}
//                             </p>
//                             <div className="w-fit mt-2">
//                                 <CTAButton active={true} linkto={card.BtnLink}>
//                                     {card.BtnText}
//                                 </CTAButton>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="p-8 flex flex-col gap-8">
//                             <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
//                             <p className="text-richblack-300 font-medium">{card.description}</p>
//                         </div>
//                     )
//                 }
//                 </div>
//             )
//         })
//       }
//     </div>
//   )
// }

// export default LearningGrid




import React from 'react';
import HighLightText from '../HomePage/HighLightText';
import CTAButton from '../../../components/core/HomePage/Button';

const LearningGridArray = [
  {
    order: -1,
    heading: "Comprehensive Neurological Care for",
    highlightText: "Everyone, Everywhere",
    description:
      "NeuroCare brings accessible and expert-led diagnostics, therapies, and support services for patients and families dealing with neurodegenerative conditions—no matter where they are.",
    BtnText: "Explore Services",
    BtnLink: "/services",
  },
  {
    order: 1,
    heading: "Early Detection & Diagnosis",
    description:
      "Our advanced imaging, genetic, and cognitive tests enable early detection of Alzheimer’s, Parkinson’s, and other neurological disorders—leading to timely interventions.",
  },
  {
    order: 2,
    heading: "Specialized Therapy Programs",
    description:
      "From physical and speech therapy to mental health counseling, our programs are personalized for each stage of a patient's neuro journey.",
  },
  {
    order: 3,
    heading: "Patient & Caregiver Education",
    description:
      "We provide curated resources, live sessions, and guides to help patients and caregivers make informed decisions about care and treatment.",
  },
  {
    order: 4,
    heading: `Progress Monitoring Tools`,
    description:
      "Track therapeutic outcomes, cognitive changes, and medical history through our secure digital dashboards and follow-ups.",
  },
  {
    order: 5,
    heading: "Holistic Support Network",
    description:
      "Our community connects patients with specialists, support groups, and wellness professionals to ensure complete physical and emotional care.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`
              ${index === 0 && "xl:col-span-2 xl:h-[294px]"}
              ${card.order % 2 === 1 ? "bg-richblack-700 h-[294px]" : "bg-richblack-800 h-[294px]"}
              ${card.order === 3 && "xl:col-start-2"} 
              ${card.order < 0 && "bg-transparent translate-y-[-45px]"}
            `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold">
                  {card.heading}{" "}
                  <HighLightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
                <p className="text-richblack-300 font-medium">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;

