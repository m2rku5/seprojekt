
(function(){
    var tekst = [
        "Sinu elu on sinu vastutus",
        "Anna oma parim, sellest piisab!",
        "Su vanemad ei kasvatanud sind 18 aastat, et sa oleksid lihtsalt pettumus",
        "Kogu julgust ja asu asja kallale :)",
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