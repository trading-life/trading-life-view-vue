import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/charting_view',
  name: 'charting_view',
  component: LAYOUT,
  redirect: '/charting_view/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: 'charting',
  },
  children: [
    {
      path: 'charting_library',
      name: 'charting_library',
      meta: {
        title: t('routes.demo.charts.baiduMap'),
      },
      component: () => import('@/views/demo/charting/ChartingLibrary.vue'),
    },
  ],
};

export default charts;
