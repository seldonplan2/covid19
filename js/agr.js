
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

/**
 * 東京-全国 感染者数比較グラフ
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
function tokyoDomPostCaseGraph(h_label, t_label, t_data, i_label, i_data, r_label, r_data, title) {
    //チャートデータ
    let c_data = {
        labels: h_label,
        datasets: [
            //東京/全国
            {
                type: 'line',
                backgroundColor: agrChartColors.skyblue,
                borderColor: agrChartColors.skyblue,
                borderWidth: 2,
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

function spPrefDomPostCaseGraph(h_label, t_label, t_data, o_label, o_data, a_label, a_data, art_label, art_data, aro_label, aro_data, ara_label, ara_data, title) {
    //チャートデータ
    let c_data = {
        labels: h_label,
        datasets: [
            //東京
            {
                type: 'line',
                label: t_label,
                backgroundColor: agrChartColors.red,
                data: t_data,
                borderColor: agrChartColors.red,
            },
            //東京近郊(埼玉,千葉,神奈川)
            {
                type: 'line',
                label: art_label,
                backgroundColor: agrChartColors.orange,
                data: art_data,
                borderColor: agrChartColors.orange,
            },
            //大阪
            {
                type: 'line',
                label: o_label,
                backgroundColor: agrChartColors.darkblue,
                data: o_data,
                borderColor: agrChartColors.darkblue,
            },
            //大阪近郊(京都,兵庫,奈良)
            {
                type: 'line',
                label: aro_label,
                backgroundColor: agrChartColors.steelblue,
                data: aro_data,
                borderColor: agrChartColors.steelblue,
            },
            //愛知
            {
                type: 'line',
                label: a_label,
                backgroundColor: agrChartColors.darkgreen,
                data: a_data,
                borderColor: agrChartColors.darkgreen,
            },
            //愛知近郊(岐阜,静岡,三重)
            {
                type: 'line',
                label: ara_label,
                backgroundColor: agrChartColors.seagreen,
                data: ara_data,
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
