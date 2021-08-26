/**
 * カラー設定
 *
 * @type {{red: string, orange: string, green: string, blue: string, yellow: string, purple: string, grey: string}}
 */
const agrChartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
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

/**
 * 陽性者比較グラフ
 *
 * @param h_label
 * @param t_label
 * @param t_data
 * @param i_label
 * @param i_data
 * @param r_label
 * @param r_data
 * @param title
 */
function positiveCaseGraph(h_label, t_label, t_data, i_label, i_data, r_label, r_data, title) {
    //チャートデータ
    let c_data = {
        labels: h_label,
        datasets: [
            //東京/全国
            {
                type: 'line',
                backgroundColor: agrChartColors.blue,
                borderColor: agrChartColors.blue,
                borderWidth: 3,
                pointRadius: 0,
                data: r_data,
                label: r_label,
                fill: false,
                yAxisID: 'y-axis-2',
            },
            //東京
            {
                type: 'bar',
                label: i_label,
                backgroundColor: agrChartColors.red,
                data: i_data,
                borderColor: agrChartColors.red,
                borderWidth: 2,
                yAxisID: 'y-axis-1',//命名は"y-axis-連番"でないといけない(みたい
            },
            //全国
            {
                type: 'line',
                backgroundColor: transparentize(agrChartColors.yellow),
                borderColor: agrChartColors.yellow,
                data: t_data,
                label: t_label,
                fill: 'start',
                yAxisID: 'y-axis-1',
            },
        ]
    };

    //要素を取得
    let element = document.getElementById('posCaseGraph');
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
                text: title,
                display: true
            },
            //複数表示に必要？
            tooltips: {
                mode: 'index',
                intersect: true
            },
            //ラインを曲線に"しない"指定
            elements: {
                line: {
                    tension: 0.000001
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
