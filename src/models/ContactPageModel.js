import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class ContactPageModel
{
    getHeroTileResponse() {
        var result = {
            heroTile: {}
        };

        var jsonPath = Resources.internal.json.contact;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var promotionMeta = about.data.heroTile;
            result.heroTile.PromoImage = promotionMeta.image;
            result.heroTile.PromoTextHeader = promotionMeta.header;
            result.heroTile.PromoTextTagLine = promotionMeta.tagline;
            result.heroTile.hasPromoTextSupport = true;
            return result;
        });
    }

    getContactResponse() {
        var result = {
        };

        var jsonPath = Resources.internal.json.about;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            result.contact = about.data;
            return result;
        });
    }

    
    getData() {
        var result = {};
        var promises = [
            this.getContactResponse(),
            this.getHeroTileResponse()
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

export default ContactPageModel;
