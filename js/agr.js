
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
    purple: 'rgb(153, 102, 255)',
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

//東京-全国 感染者数グラフ用データオブジェクト
let tokyoDomPostCaseObj = {
    title :'',
    horizontal :[],
    dom_data :{
        label :'',
        data :[],
    },
    tokyo_data :{
        label :'',
        data :[],
    },
    rate_data :{
        label :'',
        data :[],
    },
};

/**
 * 東京-全国 感染者数比較グラフ
 */
function tokyoDomPostCaseGraph() {

    //東京/全国のデータを呼び出し
    tokyoDomPostCaseObj.rate_data.data.forEach(function(data, index) {
        //%表記用に100倍にする
        tokyoDomPostCaseObj.rate_data.data[index] = Math.trunc(data * 100);
    });

    //チャートデータ
    let c_data = {
        labels: tokyoDomPostCaseObj.horizontal,
        datasets: [
            //東京/全国
            {
                type: 'line',
                backgroundColor: agrChartColors.skyblue,
                borderColor: agrChartColors.skyblue,
                borderWidth: 2,
                pointRadius: 0,
                data: tokyoDomPostCaseObj.rate_data.data,
                label: tokyoDomPostCaseObj.rate_data.label,
                fill: false,
                yAxisID: 'y-axis-2',
            },
            //東京
            {
                type: 'bar',
                backgroundColor: agrChartColors.red,
                borderColor: agrChartColors.red,
                borderWidth: 2,
                label: tokyoDomPostCaseObj.tokyo_data.label,
                data: tokyoDomPostCaseObj.tokyo_data.data,
                yAxisID: 'y-axis-1',//命名は"y-axis-連番"でないといけない(みたい
            },
            //全国
            {
                type: 'line',
                backgroundColor: transparentize(agrChartColors.yellow),
                borderColor: agrChartColors.yellow,
                data: tokyoDomPostCaseObj.dom_data.data,
                label: tokyoDomPostCaseObj.dom_data.label,
                fill: 'start',
                yAxisID: 'y-axis-1',
            },
        ]
    };

    //要素を取得
    let element = document.getElementById('tokyoDomPosCaseGraph');
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
                text: tokyoDomPostCaseObj.title,
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
                        if(tooltipItem.datasetIndex === 0){
                            return tooltip.label + ': ' + tooltipItem.value + '%';
                        }else{
                            return tooltip.label + ': ' + parseInt(tooltipItem.value).toLocaleString() + '人';
                        }
                    },
                }
            },
            //ラインを曲線に"しない"指定
            elements: {
                line: {
                    tension: 0.000001
                },
                point: {
                    radius: Radius,
                    hitRadius: HitRadius,
                }
            },
            scales: {
                yAxes: [
                    //全国
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
                        //グリッドラインを非表示にする設定
                        gridLines: {
                            drawOnChartArea: false,
                        },
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
function vaccinePostCaseRateGraph(title, data) {

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
                        labelString: '1回目',
                        fontColor: 'black',
                        fontSize: 16,
                    },
                }],
                // x軸
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: '2回目',
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