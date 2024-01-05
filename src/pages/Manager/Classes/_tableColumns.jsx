import { TableDropdown } from "@ant-design/pro-components";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { collegeListApi, majorListApi, teacherListApi } from "@/apis/index.js";
import { classesStateEnum } from "@/constants/index.js";

export default [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "院校名称",
    dataIndex: "collegeId",
    render: (text, record, _, action) => {
      return record.collegeName;
    },
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    request: async () => {
      const { data } = await collegeListApi({ pageNum: 1, pageSize: 400 });
      return data.list.map((item) => ({
        ...item,
        label: item.collegeName,
        value: item.id,
      }));
    },
  },
  {
    title: "专业",
    dataIndex: "majorId",
    render: (text, record, _, action) => {
      return record.major;
    },
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    // initialValue: "3",
    dependencies: ["collegeId"],
    request: async (params) => {
      const { collegeId } = params;
      if (!collegeId) return [];
      const { data } = await majorListApi({ collegeId });
      return data.list.map((item) => ({
        ...item,
        label: item.major,
        value: item.id,
      }));
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
    render: (text, record, _, action) => {
      return record.teacherName;
    },
    valueType: "select",
    request: async () => {
      const { data } = await teacherListApi({ pageNum: 1, pageSize: 400 });
      return data.list.map((item) => ({
        ...item,
        label: item.teacherName,
        value: item.id,
      }));
    },
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
    valueEnum: classesStateEnum,
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
