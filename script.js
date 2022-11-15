
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

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".paevade_numbrid");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
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

  document.querySelector(".kuupaev h1").innerHTML = months[date.getMonth()];

  document.querySelector(".kuupaev p").innerHTML = new Date().toLocaleDateString();

  let days = "";

  for (let x = firstDayIndex; x > 1; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="tana">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
printTasks()

   