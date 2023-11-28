// import React, { useState, useEffect } from 'react';
// import NavBar from '../../components/NavBar/NavBar';
// import { Table, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { getAssessments, getStudentClassroom } from '../../Utils/requests'; // Adjust import as necessary
// import './Student.less';

// function Student({ classroomId }) {
//   const [learningStandard, setLessonModule] = useState({});
//   const [assessments, setAssessments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resClassroom = await getStudentClassroom();
//         if (resClassroom.data) {
//           if (resClassroom.data.lesson_module) {
//             setLessonModule(resClassroom.data.lesson_module);
//           }
//         } else {
//           message.error(resClassroom.err);
//         }

//         const resAssessments = await getAssessments(classroomId); // Pass classroomId as parameter
//         if (resAssessments.data) {
//           setAssessments(resAssessments.data);
//         } else {
//           message.error(resAssessments.err);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         message.error('Failed to fetch data');
//       }
//     };
//     fetchData();
//   }, [classroomId]);

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'Name',
//       key: 'Name',
//       editable: true,
//       width: '30%',
//       align: 'left',
//       render: (_, key) => key.Name,
//     },
//   ];

//   const handleSelection = (activity) => {
//     activity.lesson_module_name = learningStandard.name;
//     localStorage.setItem('my-activity', JSON.stringify(activity));

//     navigate('/workspace');
//   };

//   return (
//     <div className='container nav-padding'>
//       <NavBar />
//       <div id='activity-container'>
//         <div id='header'>
//           <div>Select your Activity</div>
//         </div>
//         <ul>
//           {learningStandard.activities ? (
//             learningStandard.activities
//               .sort((activity1, activity2) => activity1.number - activity2.number)
//               .map((activity) => (
//                 <div
//                   key={activity.id}
//                   id='list-item-wrapper'
//                   onClick={() => handleSelection(activity)}
//                 >
//                   <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
//                 </div>
//               ))
//           ) : (
//             <div>
//               <p>There is currently no active learning standard set.</p>
//               <p>
//                 When your classroom manager selects one, it will appear here.
//               </p>
//             </div>
//           )}
//         </ul>
//         <div id='header'>
//           <div>Select Your Assessment</div>
//         </div>
//         <Table
//           columns={columns}
//           dataSource={assessments}
//           rowKey='id'
//           // Add other Table props as necessary
//         />
//       </div>
//     </div>
//   );
// }
// export default Student;


import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './Student.less';

function Student() {
  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch {}
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>Select your Activity</div>
        </div>
        <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort((activity1, activity2) => activity1.number - activity2.number)
              .map((activity) => (
                <div
                  key={activity.id}
                  id='list-item-wrapper'
                  onClick={() => handleSelection(activity)}
                >
                  <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                </div>
              ))
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>
                When your classroom manager selects one, it will appear here.
              </p>
            </div>
          )}
        </ul>
        <div id='header'>
          <div>Select Your Assessment</div>
        </div>
        <ul>
          <a href="http://localhost:3000/assessment/student">
            <div id='list-item-wrapper'>
              <li>{`Assessment 1`}</li>
            </div>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Student;