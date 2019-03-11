<template>
    <div id="tendency">
        <div class="chart" ref="chart" style="width: 90%; height: 450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';

    export default {
        props: [
            'sevenDay', 'sevenData'
        ],
        mounted () {
            this.myChart = echarts.init(this.$refs['chart']);
        },
        methods: {
            initData () {
                const option = {
                    color: ['#5793f3', '#675bba', '#d14a61'],
                    title: {
                        text: '走势图'
                    },
                    legend: {
                        data: ['新注册用户', '新增订单', '新增管理员']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                show: true,
                                title: {
                                    dataZoom: '区域缩放',
                                    dataZoomReset: '区域缩放还原'
                                }
                            },
                            dataView: {
                                show: true,
                                title: '数据视图',
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['bar', 'line'],
                                title: {
                                    bar: '切换为柱状图',
                                    line: '切换为折线图'
                                }
                            },
                            restore: {
                                show: true
                            }
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                            name: '用户',
                            position: 'left',
                            min: 0,
                            max: 200,
                            axisLine: {
                                lineStyle: {
                                    color: '#999'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            name: '订单',
                            position: 'right',
                            min: 0,
                            max: 200,
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '新注册用户',
                            type: 'line',
                            data: this.sevenData[0],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name: '新增订单',
                            type: 'line',
                            data: this.sevenData[1],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name: '新增管理员',
                            type: 'line',
                            data: this.sevenData[2],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDay () {
                this.initData();
            },
            sevenData () {
                this.initData();
            }
        }
    }
</script>

<style lang='less' scoped>
    #tendency{
        display: flex;
        justify-content: center;
    }
</style>
