import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    getAuthorizedWorkspaces,
    getClassroomWorkspace,
    deleteAuthorizedWorkspace,
    getAssessments,
    getAssessment,
  } from '../../Utils/requests';


export default function AssessmentsTab({searchParams, setSearchParams, classroomId}){
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
            wsResponse = await getAssessment(classroomId);
          }
          else{
            wsResponse = await getAssessments();
          }
            
            setAssessmentList(wsResponse.data);
        };
        fetchData();
      }, [classroomId]);
    
    const wsColumn = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          editable: true,
          width: '30%',
          align: 'left',
          render: (_, key) => key.name,
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
          title: 'Open Workspace',
          dataIndex: 'open',
          key: 'open',
          editable: false,
          width: '20%',
          align: 'left',
          render: (_, key) => (
            <Link
              onClick={() =>
                localStorage.setItem('sandbox-activity', JSON.stringify(key))
              }
              to={'/sandbox'}
            >
              Open
            </Link>
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
          <div id='page-header'>
            <h1>Saved Assessments</h1>
          </div>
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