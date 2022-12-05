
function submit_form() {										// Kirjutanud Gregor - Võtab sisestatud andmed lahtritest, salvestab need ning lisab need tabelisse
	const task_form = document.getElementById('task_form');

	let name = task_form.elements["task_name"].value;
	let date = task_form.elements["task_date"].value;
	let cat = task_form.elements["task_cat"].value;
	let desc = task_form.elements["task_desc"].value;

	let array = [name, date, cat, desc];

	not_error = true;
	for (var key in localStorage){
		if (key == name){
			alert("Tegevus eksisteerib juba!")
			not_error = false
		}
	}

	if (not_error){											
		localStorage.setItem(name, array);
		viimaneSisestus = name
		add_row(array)

		task_form.elements["task_name"].value = ""
		task_form.elements["task_date"].value = ""
		task_form.elements["task_desc"].value = ""
		renderCalendar()
	}
};

load_table()

function load_table(){											// Kirjutanud Gregor - lehe refreshimisel loetakse mälust andmed tabelisse
	for (i = 0; i < localStorage.length; i++)   {
		let name = localStorage.key(i);
		let array = localStorage.getItem(name).split(",");
		add_row(array);
	};
}

function delete_row(nr){										// Kirjutanud Gregor - kustutab nupuvajutusel rea tabelist ja andmed mälust
	let name = document.getElementById("name_row"+nr).innerHTML
	localStorage.removeItem(name);
	document.getElementById("row"+nr).outerHTML="";
	renderCalendar()
}

function add_row(array){										// Kirjutanud Gregor - lisab rea tabelisse
	var table = document.getElementById("data_table");
	var table_len = table.rows.length;

	let name = array[0]
	let date = array[1]
	let cat = array[2]
	let desc = array[3]

	if (date == null) {	// Kirjutanud Oliver - ei lisa tühja kuupäeva tabelisse
	}
	else {				// Kirjutanud Gregor
		table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+name+"</td><td>"+date+"</td><td>"+cat+"</td><td>"+desc+"</td><td><input type='button' value='Eemalda' class='delete' onclick='delete_row("+table_len+")'></td></tr>";
	}
}

(function(){													// Kirjutanud Markus - kuvab lehe alguses erinevaid motivatsiooni tsitaate
    var tekst = [
        "Sinu elu on sinu vastutus",
        "Anna oma parim, sellest piisab!",
        "Su vanemad ei kasvatanud sind 18 aastat, et sa oleksid lihtsalt pettumus",
        "Kogu julgust ja asu asja kallale :)test",
        "Motivatsiooni pole olemas, võta end lihtsalt kokku",
        "Mis ei ole kalendris, see ei saa tehtud",
        "100 aastat tagasi käisid sinuvanused sõjas... kas nad surid, et sa saaks lolli mängida?",
        "Igaühel on oma rada. Tee seda, mis sulle rõõmu tekitab :p",
        "Sa tead, mida sa tegelikult tegema pead. Mida sa passid? TEE SEDA!!",
        "Inimesed ei hinda sind sõnade, vaid tegude järgi",
        "Kas sa oled üldse oma eluga midagi saavutanud? Kas sa isegi üritad?",
        "Pane ülesanded paberile ja hakka neid maha tõmbama :)",
        "Kui sa tahad näha, kuidas läbikukkumine välja näeb, siis vaata peeglisse",
        "Võitmine pole oluline :) tähtis on, et sa üritasid",
        "Vabanda tuleviku enda ees!! Kui ta seda isegi väärt on..."
    ],
    i=0;
    setInterval(function(){
        $('#lause').fadeOut(function(){
            $(this).html(tekst[(i=(i+1)% tekst.length)]).fadeIn();
        });
    }, 6000)
})(); 

//=====================================================================================================================================================

// KOGU JÄRGNEVA KOODI KOOSTAJA ON OLIVER inspiratsioon: https://youtu.be/o1yMqPyYeAo

const date = new Date(); // Saab praeguse kuupäeva.
const taskid = []

const renderCalendar = () => {
  date.setDate(1);

  const päevad_kuus = document.querySelector(".paevade_numbrid");

  const mitu_paeva_kuus = new Date( // muutuja, mille väärtuseks on kuu viimane kuupäev
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const paevi_eelmises_kuus = new Date( // eelmise kuu viimane kuupäve
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const esimese_p_index = date.getDay(); // mis nädalapäeval on kuu esimene päev

  const viimase_p_index = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - viimase_p_index - 1;

  const kuud = [
    "Jaanuar",
    "Veebruar",
    "Märts",
    "Aprill",
    "Mai",
    "Juuni",
    "Juuli",
    "August",
    "September",
    "Oktoober",
    "November",
    "Detsember",
  ];

  document.querySelector(".kuupaev h1").innerHTML = kuud[date.getMonth()];  // Kuvab kalendri päises praeguse kuu

  document.querySelector(".kuupaev p").innerHTML = new Date().toLocaleDateString(); // Kuvab kuupäeva pikemalt

  let kuupäeva_nr = "";


  for (let x = esimese_p_index; x > 1; x--) {  // täidab kalendri esimese rea eelmise kuu päevadega
    kuupäeva_nr += `<div class="prev-date">${paevi_eelmises_kuus - x + 1}</div>`;
  }

  for (let i = 1; i <= mitu_paeva_kuus; i++) {  // tsükkel, mis paneb kalendrisse õiged päevad.
    for (let k = 0; k < localStorage.length; k++){
      try {
      var nimi = localStorage.key(k);        //  Võtab localstoragest ülesanded ja lisab kalendrisse märke
      var kuupaev = localStorage.getItem(nimi).split(",");
      var kp = kuupaev[1].split("-")
      var paev = kp[2]
      var kuu = kp[1]
      }
      catch(no_event){
        paev = 0
        kuu = 0
      }
      if (
        i == paev && 
        parseInt(date.getMonth()+1) == parseInt(kuu)
        ){
          taskid.push(paev)
          kuupäeva_nr += `<div class="tasklist">${i}</div>`;
      }
    }
    if (    //  highlightib tänase päeva
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {

      kuupäeva_nr += `<div class="tana">${i}</div>`;
    }
    else if (i in taskid) {

    }
    else{    //  genereerib ülejäänud kalendri
      kuupäeva_nr += `<div>${i}</div>`;
    }
  }
   
  for (let j = 1; j <= nextDays; j++) { // täidab kalendri viimase rea järgmise kuu päevadega
    kuupäeva_nr += `<div class="next-date">${j}</div>`;
  }
  päevad_kuus.innerHTML = kuupäeva_nr

};

document.querySelector(".prev").addEventListener("click", () => { // vajutusel loob uue kalendri eelmise kuuga
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {  // vajutusel loob uue kalendri järgmise kuuga
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


renderCalendar();
