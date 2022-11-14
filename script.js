
const task_form = document.getElementById('task_form');
const del = document.getElementById('del');


task_form.addEventListener('submit', (event) => {
	event.preventDefault();
	let name = task_form.elements["task_name"].value;
	let date = task_form.elements["task_date"].value;
	let cat = task_form.elements["task_cat"].value;
	let desc = task_form.elements["task_desc"].value;

	let array = [name, date, cat, desc];

	localStorage.setItem(name, array);
	printTasks()
});


function printTasks(){
	let str = "";
	for (i = 0; i < localStorage.length; i++)   {
		let name = localStorage.key(i);
		array = localStorage.getItem(name);
		str += array + "<br>";
	};
	paragraph = document.getElementById("loc");
	paragraph.innerHTML = str;
};

del.addEventListener('click', (event) => {
	localStorage.clear();
	paragraph = document.getElementById("loc");
	paragraph.innerHTML = "";
});

printTasks()





    