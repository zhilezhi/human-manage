import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from "antd";
import { useRef, useState } from "react";
import {
  trainingActivityDeleteApi,
  trainingActivityDetailApi,
  trainingActivityListApi,
} from "@/apis/index.js";
import EditFormModal from "@/pages/Manager/Activity/components/EditFormModal.jsx";

import { activityStateEnum, activityTypeEnum } from "@/constants/index.js";

export default function Activity() {
  const actionRef = useRef();
  const formRef = useRef();
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [classesInfo, setClassesInfo] = useState({});

  const tableColumns = [
    {
      title: "序号",
      dataIndex: "index",
      valueType: "index",
      width: 48,
    },
    {
      title: "活动名称",
      dataIndex: "activityName",
    },
    {
      title: "类型",
      dataIndex: "type",
      valueType: "select",
      fieldProps: {
        options: activityTypeEnum,
      },
    },
    {
      title: "报名人数",
      dataIndex: "numOfApp",
    },
    {
      title: "状态",
      dataIndex: "state",
      valueType: "select",
      fieldProps: {
        options: activityStateEnum,
      },
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
    await trainingActivityDeleteApi({ id });
    message.success("删除成功");
    refreshTable();
  };
  const onView = async ({ id }) => {
    const { data } = await trainingActivityDetailApi({ id });
    data.attendancePeriodList = data.attendancePeriod
      ? data.attendancePeriod.split(",").map(Number)
      : [];

    data.attendanceStartEndTime = data.attendanceTime
      ? data.attendanceTime.split("-")
      : [];

    data.attendanceStartEndDate =
      data.startTime && data.endTime ? [data.startTime, data.endTime] : [];

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
          const { data } = await trainingActivityListApi({
            ...params,
            type: 2,
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
        search={false}
        options={{
          fullScreen: true,
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          current: 1,
          pageNum: 1,
          pageSize: 10,
          onChange: (page) => console.log({ page }),
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
