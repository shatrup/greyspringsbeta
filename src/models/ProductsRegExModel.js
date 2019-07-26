import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class ProductsRegExModel {

    getStorePresenceData(productDetails) {
        var result = {};
        result.name = productDetails.name;
        result.icon = productDetails.icon;
        result.storeMeta = productDetails.storeMeta;
        return result;
    }

    getHeroTileData(productDetails) {
        var heroTile = {};
        heroTile.PromoImage = productDetails.promotionMeta.promotionText[0].image;
        heroTile.hasPromoTextSupport = false;
        return heroTile;
    }

    getProductDetails(productId) {
        var self = this;
        var result = {
            heroTile: {}
        };
        var jsonPath = Resources.internal.json.appdetails;
        var productDetails = null;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            for (var ii = 0; ii < response.data.productDetailsList.length; ii++) {
                var temp = response.data.productDetailsList[ii];
                if (temp.applicationId === productId) {
                    productDetails = temp;
                    break;
                }
            }

            if (productDetails !== null) {                
                result.heroTile = self.getHeroTileData(productDetails);
                result.productDetails = productDetails;
                result.screenshots = productDetails.screenshots;
                result.productDescriptions = productDetails.description;
                result.storeLinks = self.getStorePresenceData(productDetails);
            }

            return result;
        });
    }

    getTopAppsResponse() {
        var result = {};
        var maxTopItems = 2;
        var jsonPath = Resources.internal.json.appdetails;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            result.topApplications = response.data.productDetailsList.slice(0, maxTopItems);
            result.topApplications.hasMoreButton = true;
            return result;
        });
    }
    getData(productId) {
        var result = {};
        var promises = [
            this.getProductDetails(productId),
            this.getTopAppsResponse()
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

export default ProductsRegExModel;