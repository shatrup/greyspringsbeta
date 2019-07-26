import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class AboutPageModel
{
    getHeroTileResponse() {
        var result = {
            heroTile: {}
        };

        var jsonPath = Resources.internal.json.about;
        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var promotionMeta = about.data.heroTile;
            result.heroTile.PromoImage = promotionMeta.image;
            result.heroTile.PromoTextHeader = promotionMeta.header;
            result.heroTile.PromoTextTagLine = promotionMeta.tagline;
            result.heroTile.hasPromoTextSupport = true;
            return result;
        });
    }

    getAboutOrganisation() {
        var result = {
        };
        var jsonPath = Resources.internal.json.about;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var aboutOrganisation = about.data.organisation;
            result.sections = aboutOrganisation.sections;
            return result;
        });
    }

    getAboutCore() {
        var result = {
            coreTeam: {}
        };
        var jsonPath = Resources.internal.json.about;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(about => {
            var coreTeam=about.data.coreTeam;
            result.coreTeam.title = coreTeam.title;
            result.coreTeam.members = coreTeam.members;
            return result;
        });
    }

    
    getData() {
        var result = {};
        var promises = [
            this.getHeroTileResponse(),            
            this.getAboutOrganisation(),
            this.getAboutCore()
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

export default AboutPageModel;
