import {Modal, Button} from 'antd';
import React, {useState} from "react";
import AddAssessment from './AddAssessment';
import { addAssessment } from '../../../../../Utils/requests';


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

    const handleOk = () => {
        // TODO: send questions to database
        let dbresponse;
        dbresponse = addAssessment(assessmentName, questions, classroomId, assessmentDescription);
        console.log(dbresponse);
        console.log(questions);
        setVisible(false)
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