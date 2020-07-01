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
    success: function (data) {
        total_std_param = data;
    }
});

var total_obs_station;
$.ajax({
    url: "data/call_obs_station.json",
    async: false,
    dataType: 'json',
    success: function (data) {
        total_obs_station = data;
    }
});

/* console.log(total_std_param);
console.log(total_obs_station); */

var features_data = total_obs_station.features;
var total_detail;
var data;
var new_data = [];

for (var i = 0; i < features_data.length; i++) {
    if (features_data[i].properties.categoryID == 1 || features_data[i].properties.categoryID == 3) {
        total_detail = features_data[i].properties.total_detail;

        for (var j = 0; j < total_detail.length; j++) {
            data = total_detail[j].data;

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
    }
}

console.log(total_obs_station.features[0].properties.total_detail[0])