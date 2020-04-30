import { request } from './request'

const GameList = (argument = "") => {
    const preparePage = () => {
        let cleanedArgument;
        cleanedArgument = argument.replace(/\s+/g, "-");
        console.log(cleanedArgument)
        let articles = "";



        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                url = "https://api.rawg.io/api/games";
                finalURL = url + "?search=" + argument;
            }

            return fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response.results);
                    response.results.forEach((article) => {
                        let test = ""

                        if (article.platforms) {
                            article.platforms.forEach(plat => {
                                if (plat.platform.id == '18' || plat.platform.id == '4' || plat.platform.id == '1' ||
                                    plat.platform.id == '6' || plat.platform.id == '7' || plat.platform.id == '21')
                                    test += `<img src="./src/images/icon/${plat.platform.id}.svg">` + "";
                            })
                        }

                        articles += `
			  
			  
               <div class="card h-100  col-sm-12 col-md-4 col-lg-4 ">
				   	<img src="${article.background_image}" class="card-img-top" alt="">
					<div class="card-body">
						<h5 class="card-title">
						<a href = "#gamedetail/${article.id}">${article.name}</a></h5>
					</div>
					<div class="card-footer">
						${test}
						<p>${article.released}</p>
						
					</div>
            	</div>
          `;
                    });


                    document.querySelector(".game-list .articles").innerHTML = articles;

                });
            console.log(finalURL + " from GameList " + argument);

        };

        fetchList("https://api.rawg.io/api/games?dates=2021-01-01,2021-12-31&ordering=-added", cleanedArgument);

    };

    const render = () => {
        const pageContent = document.getElementById('pageContent');
        pageContent.innerHTML = `
		<div class="container-fluid mt-5">
			<header>
				<div class="d-flex justify-content-between flew-row align-items-center">
					<label for="findgame"><h1>The Hyper Programe</h1></label><br>
					<i class="fas fa-search mx-3 "></i>
					<input type="text" id="findgame" value="" placeholder="Find a game..." class="request"><br><br>
				</div>
			</header>
				
			<p class="text-description mt-5"> In his tractibus navigerum nusquam 
			visitur flumen sed in locis plurimis aquae suapte 
			natura calentes emergunt ad usus aptae multiplicium 
			medelarum. verum has quoque regiones pari sorte Pompeius 
			Iudaeis domitis et Hierosolymis captis in provinciae 
			speciem delata iuris dictione formavit. 
			</p>

		
	
			<section class="game-list container-fluid mt-5">
				<div class="articles row">...loading
				</div>  
			</section>
		</div>
		
	  `;

        // her goes the request
        request();

        preparePage();
    };

    render();
};

export { GameList };