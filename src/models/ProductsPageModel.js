import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class ProductsPageModel {

    getSkillsResponse() {
        var result = {
            skills: {}
        };
        var jsonPath = Resources.internal.json.skills;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            result.skills.heading = response.data.heading;
            result.skills.list = response.data.skills;
            return result;
        });
    }

    getHeroTileResponse() {
        var result = {
            heroTile: {}
        };

        var jsonPath = Resources.internal.json.about;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var promotionMeta = about.data.promotionMeta;
            var promoBlock = promotionMeta.promotionText[0];
            result.heroTile.PromoImage = promoBlock.image;
            result.heroTile.PromoTextHeader = promoBlock.title;
            result.heroTile.PromoTextTagLine = promoBlock.tagline;
            result.heroTile.hasPromoTextSupport = true;
            result.heroTile.PromoReadMoreLink = "/about";
            return result;
        });

    }

    getAppsResponse() {
        var result = {};
        var jsonPath = Resources.internal.json.appdetails;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            result.topApplications = response.data.productDetailsList;
            return result;
        });
    }

    getStoreLinksResponse() {
        var result = {};
        var jsonPath = Resources.internal.json.storelinks;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            result.storeLinks = response.data;
            return result;
        });
    }

    getData() {
        var result = {};
        var promises = [
            this.getHeroTileResponse(),
            this.getStoreLinksResponse(),
            this.getAppsResponse(),
            this.getSkillsResponse()
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

export default ProductsPageModel;