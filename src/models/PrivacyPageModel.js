import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class PrivacyPageModel
{

    getPrivacyResponse() {
        var result = {
        };

        var jsonPath = Resources.internal.json.privacy;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            result.privacy =  about.data;
            return result;
        });
    }
 
    getData() {
        var result = {};
        var promises = [
            this.getPrivacyResponse(),
           // this.getPrivacyItem()      
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

export default PrivacyPageModel;
