<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable
      @register="registerTable"
      class="w-3/4 xl:w-4/5"
      :searchInfo="searchInfo"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #toolbar>
        <a-button type="primary" @click="saveDevice">
          {{ '新增设备' }}
        </a-button>
        <a-button type="primary" :disabled="checkedKeys.length == 0" @click="deleteDevice">
          {{ '批量删除' }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'other', // 根据权限控制是否显示: 无权限，不显示
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
              auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
          ]"
          :dropDownActions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: (_action) => {
                return record.status !== 'enable'; // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
            },
            {
              label: '禁用',
              popConfirm: {
                title: '是否禁用？',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: () => {
                return record.status === 'enable'; // 根据业务控制是否显示: enable状态的显示禁用按钮
              },
            },
            {
              label: '同时控制',
              popConfirm: {
                title: '是否动态显示？',
                confirm: handleOpen.bind(null, record),
              },
              auth: 'super', // 同时根据权限和业务控制是否显示
              ifShow: () => {
                return true;
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from './device.data';
  import { demoListApi } from '/@/api/demo/table';

  export default defineComponent({
    components: { BasicTable, PageWrapper, DeptTree, TableAction },
    setup() {
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        // 表格标题
        title: '设备列表',
        // 请求接口
        api: demoListApi,
        // 表单列信息
        columns: columns,
        // 是否显示序号列
        showIndexColumn: true,
        // 指定rowKey
        rowKey: 'id',
        // 是否显示表格边框
        bordered: true,
        // 表单配置
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        // 显示表格设置工具
        showTableSetting: true,
        tableSetting: {
          // 是否显示刷新按钮
          redo: true,
          // 是否显示尺寸调整按钮
          size: true,
          // 是否显示字段调整按钮
          setting: true,
          // 是否显示全屏按钮
          fullScreen: true,
        },
        // 使用搜索表单
        useSearchForm: true,
        // 表格右侧操作列配置
        actionColumn: {
          width: 250,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      // 新增设备
      function saveDevice() {
        // todo
      }
      // 批量删除
      function deleteDevice() {
        // todo
      }

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log('点击了编辑', record);
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
        console.log(record);
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        console.log(selectedRowKeys);
        checkedKeys.value = selectedRowKeys;
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      return {
        registerTable,
        registerModal,
        saveDevice,
        deleteDevice,
        handleCreate,
        handleEdit,
        handleDelete,
        handleOpen,
        handleSuccess,
        checkedKeys,
        onSelectChange,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
