import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class ChartPageModel {

    getChartsDetails(chartId) {
        var result = {};
        var jsonPath = Resources.internal.json[chartId];
        //var jsonPath = Resources.Games.Charts.json[chartId];
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            result.chartdata = response.data;

            return result;
        });

    }

    getData(chartId) {
        var result = {};
        var promises = [
            // this.getAboutChart(),
            this.getChartsDetails(chartId)
        ];
        return Promise.all(promises).then(response => {
            response.forEach(entry => {
                for (var key in entry) {
                    if (entry.hasOwnProperty(key)) {
                        result[key] = entry[key];
                    }
                }
            });

            return result;
        });
    }
}

export default ChartPageModel;