import {
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Input } from "antd";
import { useRef } from "react";
import { classesListApi } from "@/apis/index.js";
import tableColumns from "@/pages/Manager/Classes/_tableColumns.jsx";
import EditFormModal from "@/pages/Manager/Classes/components/EditFormModal.jsx";

export default () => {
  const actionRef = useRef();
  const [editFormVisible, setEditFormVisible] = useState(false);

  return (
    <>
      <ProTable
        columns={tableColumns}
        actionRef={actionRef}
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
        onCancel={() => {
          setEditFormVisible(false);
        }}
      />
    </>
  );
};
