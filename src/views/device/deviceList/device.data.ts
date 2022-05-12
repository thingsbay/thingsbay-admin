import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '设备图片',
    dataIndex: 'no',
    width: 100,
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    auth: 'test', // 根据权限控制是否显示: 无权限，不显示
  },
  {
    title: '设备类型',
    dataIndex: 'status',
  },
  {
    title: '设备配置',
    dataIndex: 'address',
    auth: 'super', // 同时根据权限和业务控制是否显示
    ifShow: (_column) => {
      return true;
    },
  },
  {
    title: '所属组织',
    dataIndex: 'status',
  },
  {
    title: '设备标签',
    dataIndex: 'status',
  },
  {
    title: '设备位置',
    dataIndex: 'beginTime',
  },
  {
    title: '备注',
    dataIndex: 'endTime',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'beginTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '设备名称',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入设备名称',
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'status',
    label: '设备类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '网关设备', value: '0' },
        { label: '直连设备', value: '1' },
        { label: '网关子设备', value: '2' },
      ],
    },
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '设备状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '待激活', value: '0' },
        { label: '在线', value: '1' },
        { label: '离线', value: '2' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
