import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    getAssessments,
    deleteAssessment,
    getAssessment,
    deleteQuestions
  } from '../../../../Utils/requests';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';
import ViewQuestionsModal from './ViewQuestionsModal';

export default function AssessmentsTab({searchParams, setSearchParams, classroomId})
{
    const [assessmentList, setAssessmentList] = useState([]);
    const [tab, setTab] = useState(
      searchParams.has('tab') ? searchParams.get('tab') : 'home'
    );
    const [page, setPage] = useState(
      searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
    );
    useEffect(() => {
        const fetchData = async () => {
          let wsResponse;
          if(classroomId){
            wsResponse = await getAssessments();
          }
          else{
            wsResponse = await getAssessments();
          }

          const newAssessmentsList = wsResponse.data.filter(
            (item) => item.classroomId === Number(classroomId)
          );

          setAssessmentList(newAssessmentsList);
        };
        fetchData();
      }, [classroomId]);
    
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
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          editable: true,
          width: '40%',
          align: 'left',
          render: (_, key) => key.description,
        },
        {
          title: 'Open Questions',
          dataIndex: 'open',
          key: 'id',
          editable: false,
          width: '20%',
          align: 'left',
          render: (_, key) => (
            <ViewQuestionsModal assessmentId = {key.id}></ViewQuestionsModal>
          ),
        },
        {
          title: 'Delete',
          dataIndex: 'delete',
          key: 'delete',
          width: '10%',
          align: 'right',
          render: (_, key) => (
            <Popconfirm
              title={'Are you sure you want to delete this assessment?'}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={async () => {
                const res1 = await getAssessment(key.id);
                if (res1.err) {
                  message.error(res.err);
                } else {
                  deleteQuestions(res1.data.questions);
                }
                const res = await deleteAssessment(key.id);
                if (res.err) {
                  message.error(res.err);
                } else {
                  setAssessmentList(
                    assessmentList.filter((ws) => {
                      return ws.id !== key.id;
                    })
                  );
                  message.success('Delete success');
                }
              }}
            >
              <button id={'link-btn'}>Delete</button>
            </Popconfirm>
          ),
        },
    ];

    return (
        <div>
          <MentorSubHeader
          title={'Your Assessments'}
          addAssessmentActive = {true}
          classroomId = {classroomId}
          />
          <div
            id='content-creator-table-container'
            style={{ marginTop: '6.6vh' }}
          >
            <Table
              columns={wsColumn}
              dataSource={assessmentList}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>
        </div>
    )
}