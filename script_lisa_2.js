
const pilt = document.getElementById("pilt");
pilt.src = UusPilt();

function UusPilt(){										// Kirjutaja Gregor - valib suvalise pildi
	let nr = Math.floor(Math.random() * 8 + 1);

	return "loomad/" + nr + ".jpg"
}

function vajutus(){										// Kirjutaja Gregor - kuvab suvalise pildi
	pilt.src = UusPilt();
}