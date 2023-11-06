import {Modal, Button} from 'antd';
import React, {useState} from "react";

export default function AddAssessmentModal(props) {
    const [visible, setVisible] = useState(false);
    const {classroomId} = props;

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
                <i className="fa fa-user-plus"/>
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
            

            </Modal>
        </div>
    );
}