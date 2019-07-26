(function() {
        var adId = 40373;
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(width < 750)
        {
          adId = 40372;
        }

        // parent element
        var el = document.getElementById("top_leaaderboard")

        // create a new AwesomeDisplay object
        var ad = new AwesomeDisplay(adId);

        // add callbacks
        ad.onEmpty (function() {
          console.log('empty callback')
        })

        // append element
        el.appendChild(ad.element);

    })();