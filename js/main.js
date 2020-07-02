function render_columnchart_quantrac(div_id, data_chart, name_title, key, data, max_time, min_time) {
    am4core.useTheme(am4themes_animated);
    am4core.ready(function () {

        /** Remove Logo **/
        $("g[opacity='0.3']").remove();
        $("g[opacity='0.4']").remove();
        var chart = am4core.create(div_id, am4charts.XYChart);
        chart.data = data_chart;

        chart.logo.height = -500;
        chart.fontSize = 13;
        chart.dateFormatter.inputDateFormat = "HH:mm:ss, dd/MM/yyyy";

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.baseInterval = {
            "timeUnit": "second",
            "count": 1
        }
        dateAxis.tooltipDateFormat = "HH:mm:ss, dd/MM/yyyy";
        dateAxis.showOnInit = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "";

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = data;
        series.dataFields.dateX = key;
        /* series.name = ""; */
        series.strokeWidth = 2;
        // series.tensionX = 0.7;
        series.stroke = "#007bff";
        series.fill = "#007bff";
        series.fillOpacity = 0.3;
        series.yAxis = valueAxis;
        series.tooltipText = "Thời gian: {dateX}\n Giá trị: [bold font-size: 13]{valueY}[/]";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.opacity = 0;

        var title = chart.titles.create();
        title.text = name_title;
        title.fontSize = 25;
        title.fontFamily = "Arial";
        title.marginBottom = 30;

        chart.zoomOutButton.disabled = true;
        chart.events.on("ready", function () {
            /*** onChange zoom Date thay đổi theo time ***/
            dateAxis.zoomToDates(max_time, min_time, false, true);
        });

        chart.invalidateData();
    });
};

function render_linechart_quantrac(div_id, data_chart, name_title, key, data, max_time, min_time) {
    am4core.useTheme(am4themes_animated);
    am4core.ready(function () {

        /** Remove Logo **/
        $("g[opacity='0.3']").remove();
        $("g[opacity='0.4']").remove();
        var chart = am4core.create(div_id, am4charts.XYChart);
        chart.data = data_chart;

        chart.logo.height = -500;
        chart.fontSize = 13;
        chart.dateFormatter.inputDateFormat = "HH:mm:ss, dd/MM/yyyy";

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.baseInterval = {
            "timeUnit": "second",
            "count": 1
        }
        dateAxis.tooltipDateFormat = "HH:mm:ss, dd/MM/yyyy";
        dateAxis.showOnInit = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "";

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = data;
        series.dataFields.dateX = key;
        /* series.name = ""; */
        series.strokeWidth = 2;
        series.tensionX = 1;
        series.stroke = "#007bff";
        series.fill = "#007bff";
        series.fillOpacity = 0.3;
        series.yAxis = valueAxis;
        series.tooltipText = "Thời gian: {dateX}\n Giá trị: [bold font-size: 13]{valueY}[/]";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.opacity = 0;

        var title = chart.titles.create();
        title.text = name_title;
        title.fontSize = 25;
        title.fontFamily = "Arial";
        title.marginBottom = 30;

        chart.zoomOutButton.disabled = true;
        chart.events.on("ready", function () {
            /*** onChange zoom Date thay đổi theo time ***/
            dateAxis.zoomToDates(max_time, min_time, false, true);
        });

        chart.invalidateData();
    });
};

/*** Onchange Dropdown Parameters ***/
var param;
var item_param;

$("#filter_parameters").change(function () {
    item_param = $("#filter_parameters").val();
    /*** Reset Typechart and Time ***/
    $("#filter_typechart").val('filter_column_chart');
    $("#filter_time").val('filter_1h_chart');
    item_time = 'filter_1h_chart';
    item_type = 'filter_column_chart';

    /*** Kiểm tra option có phải là none hay không ***/
    if (item_param == 'none') {
        $('#chartdiv').html('<b style="color: #ff2437">Vui lòng chọn thông số hiển thị</b>')
    } else {
        max_time_js_minus = max_time_js.setHours(max_time_js.getHours() - 1);
        min_time = GettedDate(new Date(max_time_js_minus));

        for (var k_para_sample = 0; k_para_sample < total_std_param.length; k_para_sample++) {
            if (item_param == total_std_param[k_para_sample].id) {
                param = total_std_param[k_para_sample].parameterName;
                render_columnchart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                    param, "time", param, max_time, min_time)
            }
        }
    }
})

/*** Onchange Dropdown Time ***/
var item_time = $("#filter_time").val();
$("#filter_time").change(function () {
    item_time = $("#filter_time").val();

    if (item_time == "filter_1h_chart" && typeof param !== 'undefined') {
        max_time_js_minus = max_time_js.setHours(max_time_js.getHours() - 1);
        min_time = GettedDate(new Date(max_time_js_minus));

        console.log(max_time_js)

        if (item_type == "filter_line_chart") {
            render_linechart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                param, "time", param, max_time, min_time)
        }
        if (item_type == "filter_column_chart") {
            render_columnchart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                param, "time", param, max_time, min_time)
        }
    }

    if (item_time == "filter_8h_chart" && typeof param !== 'undefined') {
        max_time_js_minus = max_time_js.setHours(max_time_js.getHours() - 8);
        min_time = GettedDate(new Date(max_time_js_minus));

        console.log(max_time_js)

        if (item_type == "filter_line_chart") {
            render_linechart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                param, "time", param, max_time, min_time)
        }
        if (item_type == "filter_column_chart") {
            render_columnchart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                param, "time", param, max_time, min_time)
        }
    }

    if (item_time == "filter_24h_chart" && typeof param !== 'undefined') {
        max_time_js_minus = max_time_js.setHours(max_time_js.getHours() - 24);
        min_time = GettedDate(new Date(max_time_js_minus));

        console.log(max_time_js)

        if (item_type == "filter_line_chart") {
            render_linechart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                param, "time", param, max_time, min_time)
        }
        if (item_type == "filter_column_chart") {
            render_columnchart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
                param, "time", param, max_time, min_time)
        }
    }
})

/*** Onchange Dropdown TypeChart ***/
var item_type = $("#filter_typechart").val();
$("#filter_typechart").change(function () {
    item_type = $("#filter_typechart").val();
    max_time_js_minus = max_time_js.setHours(max_time_js.getHours() - 1);
    min_time = GettedDate(new Date(max_time_js_minus));

    if (item_type == "filter_line_chart" && typeof param !== 'undefined') {
        render_linechart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
            param, "time", param, max_time, min_time)
    }

    if (item_type == "filter_column_chart" && typeof param !== 'undefined') {
        render_columnchart_quantrac("chartdiv", total_obs_station.features[0].properties.total_detail,
            param, "time", param, max_time, min_time)
    }
})