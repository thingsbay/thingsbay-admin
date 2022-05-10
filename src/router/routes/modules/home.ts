import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:home-outlined',
    title: t('routes.home.home'),
    orderNo: 5,
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: t('routes.home.home'),
        icon: 'ant-design:home-outlined',
        hideMenu: true,
      },
    },
  ],
};

export default home;
