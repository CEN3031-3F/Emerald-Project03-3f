import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom, getAssessments } from '../../Utils/requests';
import './Student.less';

function Student() {
  const [assessmentList, setAssessmentList] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let wsResponse;
        const res = await getStudentClassroom();
        const classroom_ID = res.data.classroom.id;
        console.log(classroom_ID);
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
          wsResponse = await getAssessments();
          
          const newAssessmentsList = wsResponse.data.filter(
            (item) => item.classroomId === Number(classroom_ID)
          );

          setAssessmentList(newAssessmentsList);
        
        } 
        else {
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

  const handleAssessmentSelection = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const wsColumn = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      editable: true,
      width: '30%',
      align: 'left',
      render: (_, key) => key.Name,
    },
  ];

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
        <div id = 'assessment-tabs'>
          {/*Display Assessments*/}
          {assessmentList.map((assessment) => (
            <div
              key = {assessment.id}
              className = 'assessment-tab'
              onClick={() => handleAssessmentSelection(assessment)}
            >
              {assessment.title}
            </div>
          ))}
        <div id = 'assessment-questions'>
          {/*Display Questions*/}
          {selectedAssessment && (
          <div>
            <h3>{selectedAssessment.title}</h3>
            <ul>
              {selectedAssessment.questions.map((question) => (
                <li key={question.id}>{question.text}</li>
              ))}
            </ul>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
