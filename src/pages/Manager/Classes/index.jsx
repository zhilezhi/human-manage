import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, message, Popconfirm } from "antd";
import { useRef, useState } from "react";
import {
  classesDeleteApi,
  classesDetailApi,
  classesListApi,
} from "@/apis/index.js";
import EditFormModal from "@/pages/Manager/Classes/components/EditFormModal.jsx";
import {
  classesListData,
  majorListData,
  teacherListData,
} from "@/services/manager.js";
import { classesStateEnum } from "@/constants/index.js";

const Classes = () => {
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
      dataIndex: "className",
      render: (_) => <a>{_}</a>,
      // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
      // filterDropdown: () => (
      //   <div style={{ padding: 8 }}>
      //     <Input style={{ width: 188, marginBlockEnd: 8, display: "block" }} />
      //   </div>
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },
    {
      title: "班主任",
      dataIndex: "headmasterId",
      render: (text, record) => {
        return record.teacherName;
      },
      valueType: "select",
      request: teacherListData,
    },
    {
      title: "年级",
      dataIndex: "grade",
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "state",
      valueType: "select",
      fieldProps: {
        options: classesStateEnum,
      },
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
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
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: "copy", name: "复制" },
            { key: "delete", name: "删除" },
          ]}
        />,
      ],
    },
  ];

  const refreshTable = () => actionRef.current?.reload();

  const onDelete = async ({ id }) => {
    await classesDeleteApi({ id });
    message.success("删除成功");
    refreshTable();
  };
  const onView = async ({ id }) => {
    const { data } = await classesDetailApi({ id });
    setClassesInfo(data);
    setEditFormVisible(true);
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
          const { data } = await classesListApi({
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
        /*      form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
              syncToUrl: (values, type) => {
                if (type === "get") {
                  return {
                    ...values,
                    created_at: [values.startTime, values.endTime],
                  };
                }
                return values;
              },
            }}*/
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
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "1st item",
                  key: "1",
                },
                {
                  label: "2nd item",
                  key: "1",
                },
                {
                  label: "3rd item",
                  key: "1",
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <EditFormModal
        visible={editFormVisible}
        info={classesInfo}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        onOk={() => refreshTable()}
      />
    </>
  );
};
export default Classes;
