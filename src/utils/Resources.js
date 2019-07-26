class Resources {
}

Resources.external = {
    javascript: {
        jQuery: {
            main: "https://code.jquery.com/jquery-2.2.1.min.js",
            validate: "http://cdn.jsdelivr.net/jquery.validation/1.15.0/jquery.validate.min.js"
        },
        bootstrap: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
    },

    font: {
        raleway: "https://fonts.googleapis.com/css?family=Raleway:400,600"
    },

    css: {
        fontawesome: "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        bootstrap: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
    }
};

Resources.internal = {
    javascript: {
        main: "/scripts/greysprings.js",
        bootstrap: {
            tabcollapse: "/scripts/bootstrap-tabcollapse.js"
        },
        jQuery: {
            scrollto: "/scripts/jquery-scrollto.js",
            bxslider: "/scripts/jquery.bxslider.js",
            tablesorter: "/scripts/jquery.tablesorter.js"
        }
    },

    css: {
        website: "/css/greysprings.css",
        markdown: {
            main: "/css/github-markdown.css",
            modest: "/css/markdown-modest.css"
        },
        jQuery: {
            bxslider: "/css/jquery.bxslider.css"
        },
        games: {
            charts: "/cocoshtml/apps/Charts/chartsStyle.css"
        },

        carousel: "/css/carousel.css"
    },

    json: {
        appdetails: "/json/app_details.json",
        storelinks: "/json/store_links.json",
        skills: "/json/skills.json",
        testimonials: "/json/testimonials.json",
        about: "/json/about.json",
        contact: "/json/contactus.json",
        privacy: "/json/privacy.json",
        playonline: "/json/play_games.json",
        fruits: "/json/PreschoolBasicsFruitsChart.json",
        vegetables: "/json/PreschoolBasicsVegetablesChart.json",
        animals: "/json/PreschoolBasicsAnimalsChart.json",
        bodyparts: "/json/PreschoolBasicsBodyPartsChart.json",
        households: "/json/PreschoolBasicsHouseholdsChart.json",
        professions: "/json/PreschoolBasicsProfessionsChart.json",
        shapes: "/json/PreschoolBasicsShapesChart.json",
        solor_system: "/json/PreschoolBasicsSolorSystemChart.json",
        sports: "/json/PreschoolBasicsSportsChart.json"
    },
}

Resources.MimeType = {
    css: "text/css",
    javascript: "text/javascript"
}

Resources.Games = {
    Charts: {
        json: {
            fruits: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsFruitsChart.json",
            vegetables: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsVegetablesChart.json",
            animals: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsAnimalsChart.json",
            bodyparts: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsBodyPartsChart.json",
            households: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsHouseholdsChart.json",
            professions: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsProfessionsChart.json",
            shapes: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsShapesChart.json",
            solor_system: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsSolorSystemChart.json",
            sports: "public/cocoshtml/apps/Charts/Resources/json/panoramaApps/PreschoolBasics/Charts/PreschoolBasicsSportsChart.json"
        }
    }
}

Resources.constants = {
    StoreLinksSectionsHeading1: "Games available at",
    StoreLinksSectionsHeading2: "Download here",
    TestimonialsHeroHeader: "What Our Clients Say",
    TestimonialsHeroTagline: "We are trusted by thousands of people!",
}

//module.exports = Resources;
export default Resources;