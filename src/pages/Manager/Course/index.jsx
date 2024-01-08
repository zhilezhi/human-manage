import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from "antd";
import { useRef, useState } from "react";
import {
  classCurriculumListApi,
  classesCurriculumDeleteApi,
  classesCurriculumDetailApi,
  classesDeleteApi,
} from "@/apis/index.js";
import EditFormModal from "@/pages/Manager/Course/components/EditFormModal.jsx";
import {
  classesListData,
  classesListDataByMajor,
  majorListData,
} from "@/services/manager.js";

export default function Course() {
  const actionRef = useRef();
  const formRef = useRef();
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [classesInfo, setClassesInfo] = useState({});

  const tableColumns = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "院校名称",
      dataIndex: "collegeId",
      render: (text, record) => {
        return record.collegeName;
      },
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: "select",
      request: classesListData,
    },
    {
      title: "专业",
      dataIndex: "majorId",
      render: (text, record) => {
        return record.major;
      },
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: "select",
      dependencies: ["collegeId"],
      request: async (params) => {
        const { collegeId } = params;
        formRef.current?.setFieldsValue({
          majorId: undefined,
        });
        if (!collegeId) return [];
        return majorListData(collegeId);
      },
    },
    {
      title: "班级名称",
      dataIndex: "classId",
      render: (text, record) => {
        return record.className;
      },
      valueType: "select",
      dependencies: ["collegeId", "majorId"],
      request: async (params) => {
        console.log({ params });
        const { collegeId, majorId } = params;
        formRef.current?.setFieldsValue({
          classId: undefined,
        });
        if (!collegeId || !majorId) return [];
        return classesListDataByMajor(collegeId, majorId);
      },
    },
    {
      title: "课程名称",
      dataIndex: "courseName",
      hideInSearch: true,
    },

    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record) => [
        <a key="editable" onClick={() => onView(record)}>
          编辑
        </a>,

        <Popconfirm
          key="delete"
          title="确定删除吗?"
          onConfirm={() => onDelete(record)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const refreshTable = () => actionRef.current?.reload();

  const onDelete = async ({ id }) => {
    await classesCurriculumDeleteApi({ id });
    message.success("删除成功");
    refreshTable();
  };
  const onView = async ({ id }) => {
    const { data } = await classesCurriculumDetailApi({ id });

    setClassesInfo(data);
    setEditFormVisible(true);
  };
  const onEditFormCancel = () => {
    setEditFormVisible(false);
    setClassesInfo({});
  };
  return (
    <>
      <ProTable
        columns={tableColumns}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter, params);
          const { data } = await classCurriculumListApi({
            ...params,
            pageNum: params.current,
          });
          return {
            data: data.list,
            success: true,
            total: data.total,
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        scroll={{ x: "max-content" }}
        rowKey={(record) => record.id}
        search={{
          labelWidth: "auto",
        }}
        options={{
          fullScreen: true,
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageNum: 1,
          pageSize: 10,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle=""
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
              setEditFormVisible(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <EditFormModal
        visible={editFormVisible}
        info={classesInfo}
        onCancel={() => onEditFormCancel()}
        onOk={() => refreshTable()}
      />
    </>
  );
}
