import { request } from './request'



const GameDetail = (argument) => {
    const preparePage = () => {

        let cleanedArgument;
        cleanedArgument = argument.replace(/\s+/g, "-");
        let screenshot = cleanedArgument + '/screenshots';
        let suggested = cleanedArgument + '/suggested';
        let youtube = cleanedArgument + '/youtube';
        console.log(screenshot);

        const fetchGame = (url, argument) => {
            let finalURL = url + argument;

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    let { name, released, description, background_image, developers, platforms, publishers, genres, tags } = response;

                    let articleDOM = document.querySelector(".page-detail .article");
                    let domGenre = '';
                    genres.forEach(genre => {
                        domGenre += `${genre.name}` + ", ";
                    });

                    let domTags = '';
                    tags.forEach(tag => {
                        domTags += `${tag.name}` + ", ";
                    })

                    let domPlatforms = '';
                    platforms.forEach(plat => {
                        domPlatforms += `${plat.platform.name}` + ", ";
                    })

                    let domStores = '';
                    response.stores.forEach(store => {
                        domStores += `<li><a href="${store.url}">${store.store.name}</li>`;
                    })

                    let test = document.createElement('span')

                    test.className = "note float-right "
                    articleDOM.querySelector("h2.title").innerHTML = name;
                    articleDOM.querySelector("h2.title").insertAdjacentElement('beforeend', test);
                    articleDOM.querySelector(".note").innerHTML = response.rating + "/5 - " + response.ratings_count + " votes";
                    articleDOM.querySelector("p.release-date span").innerHTML = released;
                    articleDOM.querySelector("p.dev span").innerHTML = `<a href="#gamelist/${developers[0].slug}">${developers[0].name}`;
                    articleDOM.querySelector("p.platform span").innerHTML = domPlatforms.slice(0, domPlatforms.lastIndexOf(','));
                    articleDOM.querySelector("p.publisher span").innerHTML = publishers[0].name;
                    articleDOM.querySelector("p.genre span").innerHTML = domGenre.slice(0, domGenre.lastIndexOf(","));
                    articleDOM.querySelector("p.tags span").innerHTML = domTags.slice(0, domTags.lastIndexOf(","));
                    articleDOM.querySelector("p.description").innerHTML = description;
                    if (response.clip) {
                        articleDOM.querySelector(".trailer").innerHTML = `<video controls> <source src="${response.clip.clip}"></video>`;
                    }
                    articleDOM.querySelector("ul.store-link").insertAdjacentHTML("afterbegin", domStores);
                    document.querySelector("div.article").insertAdjacentHTML('afterbegin', `<img src="${background_image}" 
					class="detail-img mt-3 mb-5"> <btn class="btn"><a href="${response.website}"> <span class="cta">Check Website </span>
					`);

                    console.log(finalURL);
                    console.log(response)
                });



        };

        const fetchScreenShot = (url, argument) => {
            let finalURL = url + argument;
            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    let domScreenShot = '';
                    for (let i = 0; i < 4; i++) {
                        domScreenShot += `<li><img src="${response.results[i].image}" class="screenshots mr-5 mb-5"></li>`;
                    }
                    console.log(domScreenShot)
                    let articleDOM = document.querySelector(".page-detail .article");
                    console.log(articleDOM.querySelector('.screenshot'));
                    articleDOM.querySelector('.screen').innerHTML = domScreenShot;


                })
        };

        const fetchSuggested = (url, argument) => {
            let finalURL = url + argument;
            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    let domSimilar = '';
                    response.results.forEach(res => {
                        domSimilar += `<li><img src="${res.background_image}" class="screenshots mr-5 mb-2"><a href="#gamedetail/${res.id}"> <p class="mb-5">${res.name}</p></a></li>`;
                    })
                    let articleDOM = document.querySelector(".page-detail .article");

                    articleDOM.querySelector('.similar-games').innerHTML = domSimilar;


                })
        };

        const fetchYoutube = (url, argument) => {

            let finalURL = url + argument;
            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    let domYoutube = '';
                    for (let i = 0; i < response.results.length; i++) {
                        domYoutube += `<li><img src="${response.results[i].thumbnails.high.url}" class="screenshots mr-5 mb-2">
                    	<p class=" mb-5"><a href="https://www.youtube.com/watch?v=${response.results[i].external_id}">${response.results[i].name.replace(/(.{43})/g, "$1<br>")}</a></p></li>`;
                    }
                    let articleDOM = document.querySelector(".article");

                    articleDOM.querySelector('.youtube').insertAdjacentHTML('beforeend', domYoutube);


                })
        }

        fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
        fetchScreenShot("https://api.rawg.io/api/games/", screenshot);
        fetchSuggested("https://api.rawg.io/api/games/", suggested);
        fetchYoutube("https://api.rawg.io/api/games/", youtube);


    };

    const render = () => {
        pageContent.innerHTML = `
      <div class="container-fluid mt-5">
			<header>
				<div class="d-flex justify-content-between flew-row align-items-center form-div">
					<label for="findgame"><h1>The Hyper Progame</h1></label><br>
					<i class="fas fa-search mx-3 "></i>
					<input type="text" id="findgame" value="" placeholder="Find a game..." class="request"><br><br>
				</div>
      </header>
      </div>

        <section class="page-detail">
			<div class="article container-fluid pl-5 pr-5">
				<h2 class="title"></h2>
				<p class="description"></p>
				<div class="row">
				<div class="col-3">
					<p class="release-date"><b>Release Date </b> <br><span></span> </p>
				</div>
				<div class="col-3">
					<p class="dev"><b>Developers </b> <br><span></span> </p>
				</div>
				<div class="col-3">
					<p class="platform"><b>Platforms </b> <br><span></span> </p>
				</div>
				<div class="col-3">
					<p class="publisher"><b>Publisher </b> <br><span></span> </p>
				</div>
				</div>  
				<div class="row">
				<div class="col-6">
				<p class="genre"><b> Genre</b> <br> <span></span></p>
				</div>
				<div class="col-6">
				<p class="tags"><b> Tags</b> <br> <span></span></p>
				</div>              
				</div>
				<div class="row">
					<h3 class="buy">BUY </h3>
				</div>
				<div class="row">
					<ul class="store-link">
					</ul>
				</div>
				<div class="row">
					<h3 class="trailer">TRAILER </h3>
				</div>
				<div class="row">
					<h3>SCREENSHOTS</h3>
					<ul class="screen">
					</ul>
				</div>
				<div class="row">
					<h3>SIMILAR GAMES</h3>
					<ul class="similar-games">
					</ul>
				</div>
				<div class="row">
					<h3>YOUTUBE</h3>
					<ul class="youtube">
					</ul>
				</div>
				
			</div>


        </section>
      `;
        request();
        preparePage();
    };

    render();
};

export { GameDetail };