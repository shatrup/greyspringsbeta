import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class TestimonialPageModel
{

    getHeroTileResponse() {
        var result = {
            heroTile: {}
        };

        var jsonPath = Resources.internal.json.testimonials;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var promotionMeta = about.data.heroTile;
            result.heroTile.PromoImage = promotionMeta.image;
            result.heroTile.PromoTextHeader = promotionMeta.header;
            result.heroTile.PromoTextTagLine = promotionMeta.tagline;
            result.heroTile.hasPromoTextSupport = true;
            return result;
        });
    }

    getTestimonialsData(){
        var result = {            
            testimonials: {}
        };
        var jsonPath = Resources.internal.json.testimonials;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var testimonialsList = [];
            testimonialsList = about.data.testimonials;
            result.testimonials.heading = about.data.heading;
            result.testimonials.list = testimonialsList;
            result.testimonials.hasMoreButton = false;
            return result;
        });

    }
    
    getData() {
        var result = {};
        var promises = [
            this.getHeroTileResponse(),
            this.getTestimonialsData()
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

export default TestimonialPageModel;
