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

// inspiratsioon: https://youtu.be/o1yMqPyYeAo