/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/

let viewabilityTime = 0,
	timeStep = false,
  	adElement = document.getElementById("ad");

function changeStatistic() {

/* Calculate visibility procent of ad */
	let scrolledTop = window.pageYOffset || document.documentElement.scrollTop,
		sizeElement = adElement.getBoundingClientRect(),
		visibility = 0,
		windowHeight = window.innerHeight;

	if (sizeElement.top < windowHeight && sizeElement.bottom < windowHeight && sizeElement.bottom >= 0 && sizeElement.top >= 0) {
		visibility = 100;
	} else if (sizeElement.top < 0 && sizeElement.bottom > 0) { 						// ad hide in top
		visibility = (sizeElement.height + sizeElement.top) * 100 / sizeElement.height;
	} else if (sizeElement.top < windowHeight && sizeElement.bottom > windowHeight) { 	// ad hide in botton
		visibility = (windowHeight - sizeElement.top) * 100 / sizeElement.height;
	}

	document.querySelector(".statBlock .statProcent").innerHTML = Math.round(visibility) + "%";

/* Set time when more 50% visibility */
	if (visibility > 50 && !timeStep) {
		timeStep = setInterval(function(){
			viewabilityTime += 0.2;
			document.querySelector(".statBlock .statTime").innerHTML = Math.round(viewabilityTime * 10) / 10 + "s"; // I think this method more fast then toFixed()
		}, 200)
	} else if (visibility <= 50) {
		clearInterval(timeStep);
		timeStep = false; //Hack for setInterval again.
	}
}

function clickTrack() {
	let clickValue = document.querySelector(".statBlock .statClick").innerHTML;
	document.querySelector(".statBlock .statClick").innerHTML = parseInt(clickValue) + 1;
}

/* Change visibility for change tabs */
document.addEventListener('visibilitychange', function(e) {
  	document.hidden ? onHidden() : onVisible();
}, false);

function onVisible(){
	adElement.style.visibility = "visible";
}

function onHidden(){
	adElement.style.visibility = "hidden";
}

!function() {
/* Create statistic block */
    let statBlock = document.createElement("div"),
    	visibleProcent = document.createElement("div"),
    	visibleTime = document.createElement("div"),
    	adClick = document.createElement("div");

    statBlock.classList.add("statBlock");
    visibleProcent.classList.add("statProcent");
    visibleTime.classList.add("statTime");
    adClick.classList.add("statClick");
    visibleProcent.innerHTML = "0%";
    visibleTime.innerHTML = "0s";
    adClick.innerHTML = 0;
    statBlock.appendChild(visibleProcent);
    statBlock.appendChild(visibleTime);
    statBlock.appendChild(adClick);
    document.body.append(statBlock);
    changeStatistic();
}()

window.addEventListener("scroll", changeStatistic);
window.addEventListener("resize", changeStatistic);
adElement.addEventListener("click", clickTrack);

