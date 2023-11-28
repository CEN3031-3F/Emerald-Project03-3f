import {Modal, Button} from 'antd';
import React, {useState} from "react";
import AddAssessment from './AddAssessment';
import { addAssessment, addQuestions, getQuestions} from '../../../../../Utils/requests';


export default function AddAssessmentModal(props) {
    const [visible, setVisible] = useState(false);
    const {classroomId} = props;
    const [questions, setQuestions] = useState([]);
    const [assessmentName, setName] = useState([]);
    const [assessmentDescription, setDescription] = useState([]);
    
    
    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    // okay basically I have created an assessmentId which is passed into viewQuestionModal and then Assessment.
    // Right now, you need to figure out how to add the current assessmentId to a new field in questions called assessmentId,
    // and then you need to filter through in Assessment.jsx to filter out the questions whose assessmentId is not the currentAssessmentId
    
    const handleOk = async () => {

        let dbresponse1;
        let dbresponse2;
        let dbresponse3;

        const newQuestions = questions.map((question) => {
                const {
                    correctOption,
                    options,
                    text,
                    type
                } = question;

                let typeValue = question.type;
                let correctValue = question.correctOption;
        
                let [choice1 = "", choice2 = "", choice3 = "", choice4 = ""] = options || [];

                if (typeValue === "multipleChoice")
                {
                    if (choice1 && choice2 && choice3 && choice4)
                        typeValue = "MC_4";
                    if (!choice4 && (choice1 && choice2 && choice3))
                        typeValue = "MC_3";
                }
                else if (typeValue === "trueFalse")
                {
                    typeValue = "TF";
                    choice1 = "True";
                    choice2 = "False";
                    if (correctValue === "true")
                        correctValue = "C1";
                    else
                        correctValue = "C2";
                }

                else if (typeValue === "openResponse")
                {
                    typeValue = "FR";
                    correctValue = "C1"
                }

                if (correctValue === "a")
                    correctValue = "C1";
                else if (correctValue === "b")
                    correctValue = "C2";
                else if (correctValue === "c")
                    correctValue = "C3";
                else if (correctValue === "d")
                    correctValue = "C4";
        
                return {
                Question_text: text,
                Choice_1_text: choice1,
                Choice_2_text: choice2,
                Choice_3_text: choice3,
                Choice_4_text: choice4,
                Question_type: typeValue,
                Correct_Answer_enum: correctValue,
                };
        });
        console.log(newQuestions);
        const ids = await addQuestions(newQuestions);
        console.log(ids);
        
        console.log(classroomId);
        
        // add assessment to database
        dbresponse2 = await addAssessment(assessmentName, classroomId, [...ids], assessmentDescription);

        setVisible(false);

    };

    return (
        <div id='link'>
            <button id='link' onClick={showModal}>
                <i className="fa fa-plus"/>
            </button>
            <Modal
                title={"Add an assessment to your classroom"}
                visible={visible}
                onCancel={handleCancel}
                width={'75vw'}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
            <AddAssessment questions={questions} setQuestions={setQuestions} classroomId={classroomId} assessmentName = {assessmentName} setName = {setName} assessmentDescription = {assessmentDescription} setDescription = {setDescription}/>
            </Modal>
        </div>
    );
}