<template>
    <div id="visitor">
        <head-top></head-top>

        <div id="spread" ref="spread" style="width: 90%; height: 450px; margin: 20px auto;"></div>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import { spreadCount } from '../../../service/getData';

    export default {
        data () {
            return {
                count: null
            }
        },
        async mounted () {
            try {
                let res = await spreadCount();
                if (res.status === 1) {
                    this.count = res.user_city;
                } else {
                    throw new Error(res);
                }
            } catch (e) {
                console.log('获取用户分布信息失败', e);
            }

            // 初始化echarts实例
            this.chart = echarts.init(this.$refs.spread);
        },
        components: {
            headTop
        },
        methods: {
            initData () {
                const option = {
                    title: {
                        text: '用户分布',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a}<br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['北京', '上海', '深圳', '杭州', '其他']
                    },
                    series: [
                        {
                            name: '用户分布',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: this.count.beijing, name: '北京'},
                                {value: this.count.shanghai, name: '上海'},
                                {value: this.count.shenzhen, name: '深圳'},
                                {value: this.count.hangzhou, name: '杭州'},
                                {value: this.count.qita, name: '其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.chart.setOption(option);
            }
        },
        watch: {
            count (val) {
                if (Object.prototype.toString.call(val) === '[object Object]') {
                    this.initData();
                }
            }
        }
    }
</script>

<style lang='less' scoped>

</style>
