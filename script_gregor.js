
function submit_form() {										// Sisestab andmed ja täidab tabeli
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

function load_table(){											// Täidab reloadimisel tabeli
	for (i = 0; i < localStorage.length; i++)   {
		let name = localStorage.key(i);
		let array = localStorage.getItem(name).split(",");
		add_row(array);
	};
}

function delete_row(nr){										// Kustutab rea
	let name = document.getElementById("name_row"+nr).innerHTML
	localStorage.removeItem(name);
	document.getElementById("row"+nr).outerHTML="";
	renderCalendar()
}

function add_row(array){										// Lisab rea
	var table = document.getElementById("data_table");
	var table_len = table.rows.length;

	let name = array[0]
	let date = array[1]
	let cat = array[2]
	let desc = array[3]

	if (date == null) {
		//  ei lisa tühja rida tabelisse
	}
	else {
		table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+name+"</td><td>"+date+"</td><td>"+cat+"</td><td>"+desc+"</td><td><input type='button' value='Eemalda' class='delete' onclick='delete_row("+table_len+")'></td></tr>";
	}
}

   