import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class HomePageModel {

    shuffle(array) {
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

    getRandomTestimonials() {
        var result = {
            testimonials: {}
        };
        var jsonPath = Resources.internal.json.testimonials;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            var testimonialsList = [];
            this.shuffle(response.data.testimonials);
            testimonialsList = response.data.testimonials.slice(0, response.data.noOTestimonialsOnHomePage);
            result.testimonials.heading = response.data.heading;
            result.testimonials.list = testimonialsList;
            result.testimonials.hasMoreButton = true;
            return result;
        });

    }

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

    getTopAppsResponse() {
        var result = {};
        var maxTopItems = 4;
        var jsonPath = Resources.internal.json.appdetails;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            result.topApplications = response.data.productDetailsList.slice(0, maxTopItems);
            result.topApplications.hasMoreButton = true;
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
            this.getTopAppsResponse(),
            this.getSkillsResponse(),
            this.getRandomTestimonials()
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

export default HomePageModel;