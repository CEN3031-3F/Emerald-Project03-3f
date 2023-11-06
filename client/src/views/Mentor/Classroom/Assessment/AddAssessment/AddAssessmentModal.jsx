import {Modal, Button} from 'antd';
import React, {useState} from "react";
import AddAssessment from './AddAssessment';


export default function AddAssessmentModal(props) {
    const [visible, setVisible] = useState(false);
    const {classroomId, addAssessmentToTable} = props;

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleOk = () => {
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
            <AddAssessment addAssessmentToTable={addAssessmentToTable} classroomId={classroomId}/>
            </Modal>
        </div>
    );
}