
//ポインタ半径
const Radius = 0;

//ポインタが表示される境界半径
const HitRadius = 5;

/**
 * カラー設定
 *
 * @type {{red: string, orange: string, green: string, blue: string, yellow: string, purple: string, grey: string}}
 */
const agrChartColors = {
    red: 'rgb(255, 99, 132)',
    pink: 'rgb(255,146,157)',
    lightpink: 'rgb(255,182,193)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    darkgreen: 'rgb(0,105,52)',
    seagreen:'rgb(0,145,58)',
    green: 'rgb(3,169,33)',
    darkblue: 'rgb(0,91,172)',
    blue: 'rgb(54, 162, 235)',
    steelblue : 'rgb(99,151,208)',
    skyblue: 'rgb(54, 162, 235)',
    mizuiro: 'rgb(193,218,239)',
    purple: 'rgb(132,89,229)',
    mediumvioletred: 'rgb(199,21,133)',
    umeMurasaki: 'rgb(170,76,143)',
    grey: 'rgb(201, 203, 207)'
};

/**
 * 指定色を透過
 *
 * @param color
 * @param opacity
 * @returns {*}
 */
function transparentize(color, opacity) {
    let alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return Color(color).alpha(alpha).rgbString();
}

//全国 死者・感染者数推移グラフ用データオブジェクト
let allDomDataObj = {
    title :'',
    horizontal :[],
    p_case_data :{
        label :'',
        data :[],
    },
    death_data :{
        label :'',
        data :[],
    },
};

/**
 * 全国 死者・感染者数推移グラフ
 */
function allDomDataGraph() {

    //チャートデータ
    let c_data = {
        labels: allDomDataObj.horizontal,
        datasets: [
            //死者
            {
                type: 'line',
                label: allDomDataObj.death_data.label,
                data: allDomDataObj.death_data.data,
                backgroundColor: agrChartColors.red,
                borderColor: agrChartColors.red,
                fill: false,
                yAxisID: 'y-axis-1',
            },
            //全国
            {
                type: 'line',
                label: allDomDataObj.p_case_data.label,
                data: allDomDataObj.p_case_data.data,
                backgroundColor: transparentize(agrChartColors.yellow),
                borderColor: agrChartColors.yellow,
                fill: true,
                yAxisID: 'y-axis-2',//命名は"y-axis-連番"でないといけない(みたい
            },
        ]
    };

    //要素を取得
    let element = document.getElementById('allDomDataGraph');
    //高さを設定
    element.height = 80;
    //描画機能を有効化
    let ctx2 = element.getContext('2d');
    //グラフを描画
    window.total = new Chart(ctx2, {
        type: 'bar',//"bar"指定でないと両方表示されないことに注意！
        data: c_data,
        options: {
            title: {
                text: allDomDataObj.title,
                display: true
            },
            //複数表示に必要？
            tooltips: {
                mode: 'index',
                intersect: true,
                callbacks: {
                    //ラベル
                    label: function (tooltipItem, data) {
                        let tooltip = data.datasets[tooltipItem.datasetIndex];
                        return tooltip.label + ': ' + parseInt(tooltipItem.value).toLocaleString() + '人';
                    },
                }
            },
            //ラインを曲線に"しない"指定
            elements: {
                line: {
                    tension: 0.000001,
                    borderWidth: 2,
                },
                point: {
                    radius: Radius,
                    hitRadius: HitRadius,
                }
            },
            scales: {
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    },
                    //東京/全国
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                    },

                ],
            }
        }
    });
}

//主要都道府県・地域 感染者数推移グラフ用データオブジェクト
let spPrefDomPostCaseObj = {
    title :'',
    horizontal :[],
    tokyo_data :{
        label :'',
        data :[],
    },
    tokyo_around_data :{
        label :'',
        data :[],
    },
    osaka_data :{
        label :'',
        data :[],
    },
    osaka_around_data :{
        label :'',
        data :[],
    },
    aichi_data :{
        label :'',
        data :[],
    },
    aichi_around_data :{
        label :'',
        data :[],
    },
    okinawa_data :{
        label :'',
        data :[],
    },
};

/**
 * 主要都道府県・地域 感染者数推移グラフ
 */
function spPrefDomPostCaseGraph() {
    //チャートデータ
    let c_data = {
        labels: spPrefDomPostCaseObj.horizontal,
        datasets: [
            //東京
            {
                type: 'line',
                label: spPrefDomPostCaseObj.tokyo_data.label,
                data: spPrefDomPostCaseObj.tokyo_data.data,
                backgroundColor: agrChartColors.red,
                borderColor: agrChartColors.red,
            },
            //東京近郊(埼玉,千葉,神奈川)
            {
                type: 'line',
                label: spPrefDomPostCaseObj.tokyo_around_data.label,
                data: spPrefDomPostCaseObj.tokyo_around_data.data,
                backgroundColor: agrChartColors.orange,
                borderColor: agrChartColors.orange,
            },
            //大阪
            {
                type: 'line',
                label: spPrefDomPostCaseObj.osaka_data.label,
                data: spPrefDomPostCaseObj.osaka_data.data,
                backgroundColor: agrChartColors.darkblue,
                borderColor: agrChartColors.darkblue,
            },
            //大阪近郊(京都,兵庫,奈良)
            {
                type: 'line',
                label: spPrefDomPostCaseObj.osaka_around_data.label,
                data: spPrefDomPostCaseObj.osaka_around_data.data,
                backgroundColor: agrChartColors.steelblue,
                borderColor: agrChartColors.steelblue,
            },
            //愛知
            {
                type: 'line',
                label: spPrefDomPostCaseObj.aichi_data.label,
                data: spPrefDomPostCaseObj.aichi_data.data,
                backgroundColor: agrChartColors.darkgreen,
                borderColor: agrChartColors.darkgreen,
            },
            //愛知近郊(岐阜,静岡,三重)
            {
                type: 'line',
                label: spPrefDomPostCaseObj.aichi_around_data.label,
                data: spPrefDomPostCaseObj.aichi_around_data.data,
                backgroundColor: agrChartColors.seagreen,
                borderColor: agrChartColors.seagreen,
            },
            //沖縄
            {
                type: 'line',
                label: spPrefDomPostCaseObj.okinawa_data.label,
                data: spPrefDomPostCaseObj.okinawa_data.data,
                backgroundColor: agrChartColors.umeMurasaki,
                borderColor: agrChartColors.umeMurasaki,
            },
        ]
    };

    //要素を取得
    let element = document.getElementById('spPrefDomPosCaseGraph');
    //高さを設定
    element.height = 80;
    //描画機能を有効化
    let ctx2 = element.getContext('2d');
    //グラフを描画
    window.total = new Chart(ctx2, {
        type: 'bar',//"bar"指定でないと両方表示されないことに注意！
        data: c_data,
        options: {
            title: {
                text: spPrefDomPostCaseObj.title,
                display: true
            },
            //複数表示に必要？
            tooltips: {
                mode: 'index',
                intersect: true,
                callbacks: {
                    //ラベル
                    label: function (tooltipItem, data) {
                        let tooltip = data.datasets[tooltipItem.datasetIndex];
                        return tooltip.label + ': ' + parseInt(tooltipItem.value).toLocaleString() + '人';
                    },
                }
            },
            //ラインを曲線に"しない"指定
            elements: {
                line: {
                    tension: 0.000001,
                    fill: false,
                    borderWidth: 2,
                },
                point: {
                    radius: Radius,
                    hitRadius: HitRadius,
                }
            },
        }
    });
}

/**
 * 主要都道府県・地域 感染者数推移グラフ
 */
function vaccinePostCaseRateGraph(title, pre_label, now_label, data) {

    //チャートデータ
    let c_data = {
        datasets: data,
    };

    //初期化
    let r, color;
    //表データセット呼び出し
    c_data.datasets.forEach(function(dataset, index) {
        //
        r = dataset.data[0]['r'];
        //
        if(1.0 <= r) {
            color = agrChartColors.red;
        }else if(0.5 <= r){
            color = agrChartColors.lightpink;
        }else if(0.1 <= r){
            color = agrChartColors.orange;
        }else{
            color = agrChartColors.blue;
        }
        c_data.datasets[index].backgroundColor = color;

        c_data.datasets[index].data[0]['r'] = r * 20;
        c_data.datasets[index].original_radius = r;
        c_data.datasets[index].sum = c_data.datasets[index].sum.toLocaleString();
    });

    //要素を取得
    let element = document.getElementById('vaccinePostCaseRateGraph');
    //高さを設定
    element.height = 180;
    //描画機能を有効化
    let ctx2 = element.getContext('2d');
    //グラフを描画
    window.total = new Chart(ctx2, {
        type: 'bubble',
        data: c_data,
        options: {
            title: {
                text: title,
                display: true
            },
            //凡例
            legend: {
                display: false,
            },
            // スケール
            scales: {
                // x軸
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: pre_label,
                        fontColor: 'black',
                        fontSize: 16,
                    },
                }],
                // x軸
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: now_label,
                        fontColor: 'black',
                        fontSize: 16,
                    },
                }]
            },
            tooltips: {
                callbacks: {
                    //ラベル
                    label: function (tooltipItem, data) {
                        //ツールチップを取得
                        let tooltip = data.datasets[tooltipItem.datasetIndex];
                        return tooltip.label + ' 感染者: ' + tooltip.original_radius + '% (' + tooltip.sum + '人)';
                    },
                }
            },
        }
    });
}

/**
 * 曜日別感染者増加率と感染者数比較グラフ
 *
 * @param title: グラフタイトル
 * @param increase_rate_data: 増加率データ
 * @param pc_rate_date: 感染率データ
 * @param pc_num_data: 感染者数データ
 * @param labels: X軸ラベル
 */
function postCaseRateIncreaseGraph(title, increase_rate_data, pc_rate_date, pc_num_data, labels) {
    //初期化
    let bkg_color = [];
    let border_color = [];

    //増加率グラフの色を指定
    //増加率データを呼び出し
    $.each(increase_rate_data, function(idx, value) {
        //0以上の場合
        if(0 < value){
            bkg_color.push(agrChartColors.red);
            border_color.push(agrChartColors.red);
        //その他
        }else{
            bkg_color.push(agrChartColors.orange);
            border_color.push(agrChartColors.orange);
        }
    });

    //チャートデータ
    let c_data = {
        labels: labels,
        datasets: [
            //増加率
            {
                label: '増加率',
                data: increase_rate_data,
                backgroundColor: bkg_color,
                borderColor: border_color,
                borderWidth: 2,
                yAxisID: 'y-axis-1',
            },
            //感染率
            {
                label: '感染率',
                data: pc_rate_date,
                backgroundColor: agrChartColors.blue,
                borderColor: agrChartColors.blue,
                borderWidth: 2,
                yAxisID: 'y-axis-2',
            },
        ]
    };

    //要素を取得
    let element = document.getElementById('postCaseRateIncreaseGraph');
    //高さを設定
    element.height = 80;
    //描画機能を有効化
    let ctx2 = element.getContext('2d');
    //グラフを描画
    window.total = new Chart(ctx2, {
        type: 'bar',
        data: c_data,
        options: {
            title: {
                text: title,
                display: true
            },
            tooltips: {
                mode: 'index',
                intersect: true,
                callbacks: {
                    //ラベル
                    label: function (tooltipItem, data) {
                        let tooltip = data.datasets[tooltipItem.datasetIndex];
                        //初期化
                        let str = '';
                        //感染率の場合、感染者数を追加
                        if(tooltip.yAxisID === 'y-axis-2')str = ' (' + parseInt(pc_num_data[tooltipItem.index]).toLocaleString() + '人)';
                        //
                        return tooltip.label + ': ' + tooltipItem.value + '%' + str;
                    },
                }
            },
            // スケール
            scales: {
                yAxes: [
                    //増加率
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    },
                    //感染率
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        //グリッドラインを非表示にする設定
                        gridLines: {
                            drawOnChartArea: false,
                        },
                        stacked: true,
                    },
                    ],

            }
        }
    });
}