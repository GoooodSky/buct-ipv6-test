$(function () {
	$('#myTabs a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	})

    function ping(url, result){
        $.ajax({ 
            type: "POST",   
            url: "ping.php",
            data: { url: url },
            dataType: "json",
            timeout: 4000,
            success: function(data){     
                result.html(data);
            },
            error: function(){     
               result.html(0);  
            }
        });
    };

    function realTime(webname, realtimemap, timeresult){
        // 基于准备好的dom，初始化echarts实例
        var dom = $(realtimemap)[0];//加[0]把jq对象转成dom对象，下面的绘图是基于原生dom，jq对象不能用
        var title = $(webname);
        var result = $(timeresult);

        dom.style.width = 800 + 'px';
        dom.style.height = 400 + 'px';
        var myChart = echarts.init(dom);

        // 指定图表的配置项和数据
        var date = [];
        var data = [];
        var now = new Date();

        function addData(shift) {
            now = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');//修改这里
            date.push(now);
            data.push(result.text());

            if (shift) {
                date.shift();
                data.shift();
            }
            now = new Date();
        }
        for (var i = 1; i < 100; i++) {
            date.push("");
            data.push("");
        }
        option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                // splitNumbe: 10
                interval: 10
            },
            yAxis: {
                boundaryGap: [0, 0],
                type: 'value'
            },
            series: [
                {
                    name:'延迟',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    stack: 'a',
                    areaStyle: {
                        normal: {}
                    },
                    data: data
                }
            ]
        };
        setInterval(function () {
            addData(true);
            ping(title.text(), result);
            myChart.setOption({
                xAxis: {
                    data: date
                },
                series: [{
                    name:'延迟',
                    data: data
                }]
            });
        }, 1000);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };
    realTime('#website1','#website1_realTimeMap','#website1_delayTime');
    realTime('#website2','#website2_realTimeMap','#website2_delayTime');
    realTime('#website3','#website3_realTimeMap','#website3_delayTime');
    realTime('#website4','#website4_realTimeMap','#website4_delayTime');
    realTime('#website5','#website5_realTimeMap','#website5_delayTime');
 
    function map(){
        var myChart = echarts.init(document.getElementById('map'));
        option = {
            tooltip: {
                show: false
            },
            // animation: false,
            series: [{
                type: 'graph',
                layout: 'circular',
                symbol: "circle",
                symbolSize: 50,
                roam: true, //禁止用鼠标滚轮缩小放大效果
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [0, 10],
                // 连接线上的文字
                focusNodeAdjacency: true, //划过只显示对应关系
                edgeLabel: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 20
                        },
                        formatter: "{c}"
                    }
                },
                lineStyle: {
                    normal: {
                        opacity: 1,
                        width: 2,
                        curveness: 0
                    }
                },
                // 圆圈内的文字
                label: {
                    normal: {
                        show: true
                    }
                },
                force: {
                    repulsion: 5000,
                    layoutAnimation: false
                },
                data: [{
                    name: 'BUCT',
                    // symbol: 'image://http://www.damndigital.com/wp-content/uploads/2010/12/steve-jobs.jpg',
                    itemStyle: {
                        normal: {
                            color: '#f90', //圆点的颜色
                            label: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },

                }, {
                    name: $('#website1_title').text(),
                    draggable: true,
                    itemStyle: {
                        normal: {
                            color: '#090',
                        }
                    }
                }, {
                    name: $('#website2_title').text(),
                    draggable: true,
                    itemStyle: {
                        normal: {
                            color: '#090',
                        }
                    }
                }, {
                    name: $('#website3_title').text(),
                    draggable: true,
                    itemStyle: {
                        normal: {
                            color: '#090',
                        }
                    }
                }, {
                    name: $('#website4_title').text(),
                    draggable: true,
                    itemStyle: {
                        normal: {
                            color: '#090',
                        }
                    }
                }, {
                    name: $('#website5_title').text(),
                    draggable: true,
                    itemStyle: {
                        normal: {
                            color: '#090',
                        }
                    }
                }],
                links: [{
                    source: 'BUCT',
                    target: $('#website1_title').text(),
                    value: $('#website1_delayTime').text() + "ms",

                }, {
                    source: 'BUCT',
                    target: $('#website2_title').text(),
                    value: $('#website2_delayTime').text() + "ms",

                }, {
                    source: 'BUCT',
                    target: $('#website3_title').text(),
                    value: $('#website3_delayTime').text() + "ms",

                }, {
                    source: 'BUCT',
                    target: $('#website4_title').text(),
                    value: $('#website4_delayTime').text() + "ms",

                }, {
                    source: 'BUCT',
                    target: $('#website5_title').text(),
                    value: $('#website5_delayTime').text() + "ms",

                }, ]
            }]
        };

        setInterval(function () {

            myChart.setOption({
                series: [{
                    type: 'graph',
                    layout: 'circular',
                    symbol: "circle",
                    symbolSize: 50,
                    roam: true, //禁止用鼠标滚轮缩小放大效果
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [0, 10],
                    // 连接线上的文字
                    focusNodeAdjacency: true, //划过只显示对应关系
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 20
                            },
                            formatter: "{c}"
                        }
                    },
                    lineStyle: {
                        normal: {
                            opacity: 1,
                            width: 2,
                            curveness: 0
                        }
                    },
                    // 圆圈内的文字
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    force: {
                        repulsion: 5000,
                        layoutAnimation: false
                    },
                    data: [{
                        name: 'BUCT',
                        // symbol: 'image://http://www.damndigital.com/wp-content/uploads/2010/12/steve-jobs.jpg',
                        itemStyle: {
                            normal: {
                                color: '#f90', //圆点的颜色
                                label: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            }
                        },

                    }, {
                        name: $('#website1_title').text(),
                        draggable: true,
                        itemStyle: {
                            normal: {
                                color: '#090',
                            }
                        }
                    }, {
                        name: $('#website2_title').text(),
                        draggable: true,
                        itemStyle: {
                            normal: {
                                color: '#090',
                            }
                        }
                    }, {
                        name: $('#website3_title').text(),
                        draggable: true,
                        itemStyle: {
                            normal: {
                                color: '#090',
                            }
                        }
                    }, {
                        name: $('#website4_title').text(),
                        draggable: true,
                        itemStyle: {
                            normal: {
                                color: '#090',
                            }
                        }
                    }, {
                        name: $('#website5_title').text(),
                        draggable: true,
                        itemStyle: {
                            normal: {
                                color: '#090',
                            }
                        }
                    }],
                    links: [{
                        source: 'BUCT',
                        target: $('#website1_title').text(),
                        value: $('#website1_delayTime').text() + "ms",

                    }, {
                        source: 'BUCT',
                        target: $('#website2_title').text(),
                        value: $('#website2_delayTime').text() + "ms",

                    }, {
                        source: 'BUCT',
                        target: $('#website3_title').text(),
                        value: $('#website3_delayTime').text() + "ms",

                    }, {
                        source: 'BUCT',
                        target: $('#website4_title').text(),
                        value: $('#website4_delayTime').text() + "ms",

                    }, {
                        source: 'BUCT',
                        target: $('#website5_title').text(),
                        value: $('#website5_delayTime').text() + "ms",

                    }, ]
                }]
            });
        }, 1000);
        myChart.setOption(option);

    };
    map();
})