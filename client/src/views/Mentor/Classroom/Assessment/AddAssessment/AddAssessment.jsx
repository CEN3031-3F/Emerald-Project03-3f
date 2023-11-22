import React, {useState} from "react"
import { addAssessment } from "../../../../../Utils/requests"
import { useActionData } from "react-router-dom";
import TeacherAssessment from "../../../../Assessment/TeacherAssessment/TeacherAssessment";
import { Divider } from "antd";
import './AddAssessment.css';

export default function AddAssessment({questions, setQuestions, classroomId, assessmentName, setName, assessmentDescription, setDescription})
{
    // we need something to distinguish assessments. I figured adding a name component would work. Like "Unit 2 Test" for example. 
    // or "Unit 2 Quiz." Something like that.

    return(
        <div id = "add-assessment">
            <h3>Manual Input:</h3>
                <p>
                 Names should be unique!
                </p>
            <form>
            <input
                type="text"
                value={assessmentName}
                onChange={e => {
                    setName(e.target.value)
                }}
                id="name"
                name="name"
                placeholder="Assessment Name"
            />
            <p />
            <input
                type="text"
                value={assessmentDescription}
                onChange={e => {
                    setDescription(e.target.value)
                }}
                id="description"
                name="description"
                placeholder="Assessment Description"
            />
            </form>
            <Divider/>
            <TeacherAssessment questions={questions} setQuestions={setQuestions}></TeacherAssessment>
        </div>
    );
}