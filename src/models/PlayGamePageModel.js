import JsonHelper from "../utils/JsonHelper";
import Resources from "../utils/Resources";

class PlayGamePageModel {

    getGameDetails(gameId) {
        var result = {
            gameTile: {}
        };
        var jsonPath = Resources.internal.json.playonline;
        var gameDetails = null;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(response => {
            for (var ii = 0; ii < response.data.playGamesList.length; ii++) {
                var temp = response.data.playGamesList[ii];
                if (temp.uri === gameId) {
                    gameDetails = temp;
                    break;
                }
                result.gameTil = gameDetails;
            }

            return result;
        });
    }

    getAboutGame() {
        var result = {};
        var jsonPath = Resources.internal.json.playonline;

        return JsonHelper.shared.getJsonObjectAsync(jsonPath).then(playgame => {
            result.gamedata = playgame.data;

            return result;
        });
    }


    getData(gameId) {
        var result = {};
        var promises = [
            this.getAboutGame(),
            this.getGameDetails(gameId)
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

export default PlayGamePageModel;