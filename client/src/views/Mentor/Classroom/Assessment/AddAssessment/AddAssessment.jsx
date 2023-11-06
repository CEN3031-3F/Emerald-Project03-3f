import React, {useState} from "react"
import { addAssessment } from "../../../../../Utils/requests"
import { useActionData } from "react-router-dom";
import TeacherAssessment from "../../../../Assessment/TeacherAssessment/TeacherAssessment";
import { Divider } from "antd";

export default function AddAssessment({classroomId, addAssessmentToTable})
{
    // we need something to distinguish assessments. I figured adding a name component would work. Like "Unit 2 Test" for example. 
    // or "Unit 2 Quiz." Something like that.
    const [name, setName] = useState([])

    return(
        <div id = "add-assessment">
            <h3>Manual Input:</h3>
                <p>
                 Names should be unique!
                </p>
            <form>
            <input
                type="text"
                value={name}
                onChange={e => {
                    setName(e.target.value)
                }}
                id="name"
                name="name"
                placeholder="Assessment Name"
            />
            </form>
            <Divider/>
            <TeacherAssessment></TeacherAssessment>
        </div>
    );
}