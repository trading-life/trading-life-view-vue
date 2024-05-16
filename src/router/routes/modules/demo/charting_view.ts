import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const charts: AppRouteModule = {
  path: '/charting_view',
  name: 'charting_view',
  component: LAYOUT,
  redirect: '/charting_view/echarts/map',
  meta: {
    orderNo: 500,
    title: 'charting',
  },
  children: [
    {
      path: 'charting_library',
      name: 'charting_library',
      meta: {
        title: 'ChartingLibrary',
      },
      component: () => import('@/views/demo/charting/ChartingLibrary.vue'),
    },
  ],
};

export default charts;
