import {Modal, Button} from 'antd';
import React, {useState} from "react";
import Assessment from '../../../Assessment/Assessment';

export default function ViewQuestionsModal(props){
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

    return(
        <div id='link'>
            <button id='link' onClick={showModal}>
                Open
            </button>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                width={'75vw'}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
            <Assessment classroomId = {classroomId}></Assessment>
            </Modal>
        </div>
    )

}