<template>
  <div
    :class="chartClass" />
</template>

<script>
import Highcharts from 'highcharts/highstock'
import datas from '../pages/data.json'
import { debounce } from 'lodash'

export default {
  name: 'Chart',
  props: {
    chartClass: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    block() {
      return this.$parent.viewport
    }
  },
  watch: {
    async block(size) {
      await this.chart.setSize(size.width, size.height)
    }
  },
  mounted() {
    this.chart = Highcharts.stockChart(this.$el, {
      chart: {
        height: this.block.height,
        width: this.block.width
      },
      rangeSelector: {
        selected: 1,
        inputEnabled: false,
        buttonTheme: {
          visibility: 'hidden'
        },
        labelStyle: {
          visibility: 'hidden'
        }
      },
      title: {
        text: 'AAPL Stock Price'
      },
      series: [
        {
          type: 'candlestick',
          name: 'AAPL Stock Price',
          data: datas,
          dataGrouping: {
            units: [
              [
                'week', // unit name
                [1] // allowed multiples
              ]
            ]
          }
        }
      ],
      responsive: {
        rules: [
          {
            condition: {},
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
              },
              yAxis: {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -5
                },
                title: {
                  text: null
                }
              },
              subtitle: {
                text: null
              },
              credits: {
                enabled: false
              }
            }
          }
        ]
      }
    })
  }
}
</script>

<style>
.chart {
  user-select: none;
}
</style>
