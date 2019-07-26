const axios = require("axios");

var cache = require("memory-cache")

class JsonHelper {

    addToCache(key, value) {

        JsonHelper.cache.put(key, value);
    }

    removeFromCache(key) {
        JsonHelper.cache.del(key);
    }

    readFromCache(key) {
        return JsonHelper.cache.get(key);
    }

    getFileContent(path) {
        var content = this.readFromCache(path);
        if (content === "" || content === null) {
            const fs = require("fs");
            content = fs.readFileSync(path, "utf8");
            this.addToCache(path, content);
        }

        return content;
    }

    getKey(content, key) {
        if (content === "" || content === null) {
            return null;
        }

        var obj = JSON.parse(content);
        return obj[key];
    }

    getJsonObjectFor(path) {
        var content = this.getFileContent(path);
        return JSON.parse(content);
    }

    getJsonObjectAsync(path) {
        return axios.get(path)
            .then(function (response) {
                return response;
            }).catch(function (error) {
                console.log("JsonHelper::getJsonObjectAsync::axios::catch:" + error);
            }).finally(function () {
                console.log("JsonHelper::getJsonObjectAsync::axios::finally");
            });
    }
}

JsonHelper.shared = new JsonHelper();
JsonHelper.cache = new cache.Cache();

//module.exports = JsonHelper;
export default JsonHelper;