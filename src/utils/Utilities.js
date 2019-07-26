class Utilities {
    // Resources = require("./Resources");
    // JsonHelper = require("./JsonHelper");

    static shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    getTopNApps(arrayItem, maxItems) {
        return arrayItem.slice(0, 3);
    }

    // home page data
    static getTopApps() {
        var data = {};
        var maxTopItems = 4;
        var Resources = require("./Resources");
        var JsonHelper = require("./JsonHelper");
        var jsonPath = Resources.internal.json.appdetails;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            data.topApplications = response.data.productDetailsList.slice(0, maxTopItems);
            return data;
        });
    }

    static getStoreLinks() {
        var response = {};
        var Resources = require("./Resources");
        var JsonHelper = require("./JsonHelper");
        var jsonPath = Resources.internal.json.storelinks;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(storeLinks => {
            response.individualStoreMetaList = storeLinks.data.storeMeta;
            response.individualStoreSectionHeading = Resources.constants.StoreLinksSectionsHeading1;
            return response;
        });
    }

    static getproductPageData() {
        var data = {};
        var jsoObj = this.JsonHelper.shared.getJsonObjectFor(this.Resources.internal.json.appdetails);
        var appDetailsList = jsoObj.productDetailsList;
        var promotionCandidates = appDetailsList.filter(function (productData) {
            return productData.promotionMeta.active;
        });

        var randIndex = Math.floor(Math.random() * promotionCandidates.length);
        var promoProduct = appDetailsList[randIndex];

        var promotionData = promoProduct.promotionMeta.promotionText[0];
        data.PromoImage = promotionData.image;
        data.PromoTextHeader = promotionData.title;
        data.PromoTextTagLine = promotionData.tagline;
        data.PromoReadMoreLink = "/products/" + promoProduct.applicationId;
        data.productData = promoProduct;

        // products list
        data.productList = appDetailsList;
        return data;
    }

    static getTestimonailPageData() {
        var JsonHelper = require("./JsonHelper");
        var Resources = require("./Resources");

        var data = {};
        var jsonObj = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.testimonials);

        data.PromoImage = jsonObj.heroTile.image;
        data.PromoTextHeader = jsonObj.heroTile.header;
        data.PromoTextTagLine = jsonObj.heroTile.tagline;

        data.testimonialsHeading = jsonObj.heading;
        data.testimonials = jsonObj.testimonials;

        return data;
    }

    static getAboutPageData() {
        var JsonHelper = require("./JsonHelper");
        var Resources = require("./Resources");

        var data = {};
        var jsonObj = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.about);


        //var aboutList = jsonObj.company;
        data.PromoImage = jsonObj.heroTile.image;
        data.PromoTextHeader = jsonObj.heroTile.header;
        data.PromoTextTagLine = jsonObj.heroTile.tagline;

        var aboutPageSections = jsonObj.company.sections;
        data.aboutPageSections = aboutPageSections;
        var coreTeamSection = jsonObj.coreTeam;
        data.coreTeamSection = coreTeamSection;

        return data;

    }

    static getContactPageData() {
        var JsonHelper = require("./JsonHelper");
        var Resources = require("./Resources");

        var data = {};
        var jsonObj = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.contact);

        //var contactList = jsonObj.company;
        data.PromoImage = jsonObj.heroTile.image;
        data.PromoTextHeader = jsonObj.heroTile.header;
        data.PromoTextTagLine = jsonObj.heroTile.tagline;

        return data;
    }

    static getPrivacyPageData() {
        var JsonHelper = require("./JsonHelper");
        var Resources = require("./Resources");

        var data = {};
        var jsonObj = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.privacy);

        //var contactList = jsonObj.company;
        var privacyPageSections = jsonObj.privacyInitials;
        data.privacyPageSections = privacyPageSections;

        data.privacyItems = jsonObj.privacyItems;

        return data;
    }

    static getproductDetails(applicationId) {
        var JsonHelper = require("./JsonHelper");
        var Resources = require("./Resources");

        //var data = {};
        var jsonObj = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.appdetails);// store links
        var appDetails = null;
        for (var ii = 0; ii < jsonObj.productDetailsList.length; ii++) {
            var temp = jsonObj.productDetailsList[ii];
            if (temp.applicationId === applicationId) {
                appDetails = temp;
                break;
            }
        }

        return appDetails;
    }

    static getProductPage() {
        var data = {};
        var JsonHelper = require("./JsonHelper");
        var Resources = require("./Resources");

        // max top items
        var maxTopItems = 2;
        var appDetails = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.appdetails);
        data.TopApplications = appDetails.productDetailsList.slice(0, maxTopItems);

        var storeLinks = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.storelinks);
        data.IndividualStoreMetaList = storeLinks.storeMeta;
        data.IndividualStoreSectionHeading = Resources.constants.StoreLinksSectionsHeading1;

        // product data
        var productData = JsonHelper.shared.getJsonObjectFor(Resources.internal.json.storelinks);
        data.productData = productData;

        return data;
    }
}

//module.exports = Utilities;
export default Utilities;