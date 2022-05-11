import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const device: AppRouteModule = {
  path: '/device',
  name: 'Device',
  component: LAYOUT,
  redirect: '/device/deviceList/index',
  meta: {
    orderNo: 6,
    icon: 'ant-design:cloud-server-outlined',
    title: t('routes.device.device'),
  },
  children: [
    {
      path: 'deviceList',
      name: 'DeviceList',
      component: () => import('/@/views/device/deviceList/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.device.deviceList'),
        icon: 'ant-design:cloud-server-outlined',
      },
    },
    {
      path: 'deviceConfig',
      name: 'DeviceConfig',
      component: () => import('/@/views/device/deviceConfig/index.vue'),
      meta: {
        title: t('routes.device.deviceConfig'),
        icon: 'ant-design:file-ppt-outlined',
      },
    },
    {
      path: 'deviceSite',
      name: 'DeviceSite',
      component: () => import('/@/views/device/deviceSite/index.vue'),
      meta: {
        title: t('routes.device.deviceSite'),
        icon: 'ep:map-location',
      },
    },
  ],
};

export default device;
