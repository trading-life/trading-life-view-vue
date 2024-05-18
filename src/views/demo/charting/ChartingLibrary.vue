<template>
  <div class="TVChartContainer" ref="chartContainer"></div>
</template>
<script setup>
  import { onMounted, ref, onUnmounted } from 'vue';

  import { widget } from '@/charting_library';

  function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  const props = defineProps({
    symbol: {
      default: 'AAPL',
      type: String,
    },
    interval: {
      default: 'D',
      type: String,
    },
    datafeedUrl: {
      default: 'https://demo_feed.tradingview.com',
      type: String,
    },
    libraryPath: {
      default: '/charting_library/',
      type: String,
    },
    chartsStorageUrl: {
      default: 'https://saveload.tradingview.com',
      type: String,
    },
    chartsStorageApiVersion: {
      default: '1.1',
      type: String,
    },
    clientId: {
      default: 'tradingview.com',
      type: String,
    },
    userId: {
      default: 'public_user_id',
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
    studiesOverrides: {
      type: Object,
    },
  });

  const chartContainer = ref();
  let chartWidget;

  onMounted(() => {
    const widgetOptions = {
      timezone: 'Asia/Shanghai',
      symbol: props.symbol,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
      interval: props.interval,
      container: chartContainer.value,
      library_path: props.libraryPath,

      locale: getLanguageFromURL() || 'zh',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: props.chartsStorageUrl,
      charts_storage_api_version: props.chartsStorageApiVersion,
      client_id: props.clientId,
      user_id: props.userId,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      studies_overrides: props.studiesOverrides,
      // eslint-disable-next-line no-dupe-keys
      disabled_features: [
        'use_localstorage_for_settings',
        'open_account_manager',
        'trading_account_manager',
      ],
      // eslint-disable-next-line no-dupe-keys
      enabled_features: [
        'hide_right_toolbar',
        'tick_resolution',
        'chart_template_storage',
        'hide_left_toolbar_by_default',
        'study_templates',
        'pre_post_market_sessions',
        'show_object_tree',
      ],
    };
    chartWidget = new widget(widgetOptions);

    chartWidget.onChartReady(() => {
      chartWidget.headerReady().then(() => {
        const button = chartWidget.createButton();

        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');

        button.addEventListener('click', () =>
          chartWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              // eslint-disable-next-line no-console
              console.log('Noticed!');
            },
          }),
        );

        button.innerHTML = 'Check API';
      });
    });
  });

  onUnmounted(() => {
    if (chartWidget !== null) {
      chartWidget.remove();
      chartWidget = null;
    }
  });
</script>

<style scoped>
  .TVChartContainer {
    height: calc(100vh - 80px);
  }
</style>
