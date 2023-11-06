import {Modal, Button} from 'antd';
import React, {useState} from "react";
import AddAssessment from './AddAssessment';


export default function AddAssessmentModal(props) {
    const [visible, setVisible] = useState(false);
    const {classroomId, addAssessmentToTable} = props;
    const [questions, setQuestions] = useState([]);
    
    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleOk = () => {
        // TODO: send questions to database
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
            <AddAssessment questions={questions} setQuestions={setQuestions} addAssessmentToTable={addAssessmentToTable} classroomId={classroomId}/>
            </Modal>
        </div>
    );
}