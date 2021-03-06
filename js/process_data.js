/*** Push Option ***/
$('#filter_parameters')
    .append($("<option></option>")
        .attr('value', 'none').text("Lựa chọn thông số"));

/*---- Call Standard Parameter using Ajax ----*/
var total_std_param;
$.ajax({
    url: "data/call_standard_param.json",
    async: false,
    dataType: 'json',
    success: function(data) {
        total_std_param = data;
    }
});

var total_obs_station;
$.ajax({
    url: "data/call_obs_station.json",
    async: false,
    dataType: 'json',
    success: function(data) {
        total_obs_station = data;
    }
});

/*** Change  detail that 'time' and 'object' param same position ***/
var features_data = total_obs_station.features;
var max_time;
var total_detail;
var data;
var new_data = [];

for (var i = 0; i < features_data.length; i++) {
    if (features_data[i].properties.categoryID == 1 || features_data[i].properties.categoryID == 3) {
        total_detail = features_data[i].properties.total_detail;

        for (var j = 0; j < total_detail.length; j++) {
            data = total_detail[j].data;

            var detail_daytime = total_detail[j].time.split(", ");
            var detail_day = detail_daytime[1];
            var detail_time = detail_daytime[0];

            /*** Chuyển detail time sang time mặc định trong JS ***/
            var string_day = detail_day.split("/");

            /*** Gộp thành chuỗi rồi chuyển sang dạng thời gian mặc định ***/
            var data_day_time = new Date(string_day[2] + "/" + string_day[1] + "/" + string_day[0] +
                " " + detail_time);

            total_detail[j]['time_js'] = data_day_time;

            for (var k = data.length - 1; k >= 0; k--) {
                var spidID = Object.keys(data[k]);
                var value = Object.values(data[k]);
                var parameterName;

                for (var k_para_sample = 0; k_para_sample < total_std_param.length; k_para_sample++) {
                    if (parseInt(spidID) == total_std_param[k_para_sample].id) {
                        parameterName = total_std_param[k_para_sample].parameterName;

                        /*** Push Option (thêm điều kiện để chỉ test với 1 trạm) ***/
                        if (i == 0 && j == 0) {
                            $('#filter_parameters')
                                .append($("<option></option>")
                                    .attr('value', spidID).text(parameterName));
                        }

                        delete total_detail[j].data;
                        total_detail[j][parameterName] = value[0].v;
                    }
                }
            }
        }
        sortResults(total_detail, 'time_js', true);
    }
}

/*** Hàm sort json theo object ***/
function sortResults(data, prop, asc) {
    data.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return data;
}

console.log(total_obs_station.features[0].properties.total_detail)
/*** var length = total_obs_station.features[0].properties.total_detail.length;
max_time = total_obs_station.features[0].properties.total_detail[length - 1].time;
var max_time_js = total_obs_station.features[0].properties.total_detail[length - 1].time_js; ***/

var max_time_js_minus;

function GettedDate(time_data) {
    var month = time_data.getMonth() + 1;
    var day = time_data.getDate();
    var year = time_data.getFullYear();
    var hour = time_data.getHours();
    var minute = time_data.getMinutes();
    var second = time_data.getSeconds();

    if (hour < 10) {
        hour = "0" + hour.toString();
    }

    if (minute < 10) {
        minute = "0" + minute.toString();
    }

    if (second < 10) {
        second = "0" + second.toString();
    }

    if (day < 10) {
        day = "0" + day.toString();
    }

    if (month < 10) {
        month = "0" + month.toString();
    }

    return hour + ":" + minute + ":" + second + ", " + day + "/" + month + "/" + year;
}

/* console.log(max_time_js);
console.log(total_obs_station.features[0].properties.total_detail[length - 1])


console.log(new Date(max_time_js.setHours(max_time_js.getHours() - 24)))

console.log(total_obs_station.features[0].properties.total_detail[length - 1]) */

/* console.log((new Date(max_time_js_8.setHours(max_time_js_8.getHours() - 8))))
console.log((new Date(max_time_js_24.setHours(max_time_js_24.getHours() - 24))))
console.log(total_obs_station) */