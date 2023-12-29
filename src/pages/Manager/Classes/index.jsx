import {
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Input } from "antd";
import { useRef } from "react";
import { classesListApi } from "@/apis/index.js";

const columns = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "院校名称",
    dataIndex: "collegeName",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "超长".repeat(50) },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
  },
  {
    title: "专业",
    dataIndex: "major",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "超长".repeat(50) },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
  },
  {
    title: "班级名称",
    dataIndex: "className",
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBlockEnd: 8, display: "block" }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  },
  {
    title: "班主任",
    dataIndex: "teacherName",
  },
  {
    title: "年级",
    dataIndex: "grade",
    filters: false,
  },
  {
    title: "状态",
    dataIndex: "state",
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
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

export default () => {
  const actionRef = useRef();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const { data } = await classesListApi({
          params,
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
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
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
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle=""
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
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
  );
};
