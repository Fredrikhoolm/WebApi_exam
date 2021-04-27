<h3>PG6301 Eksamen ved Høyskolen Kristiania 48 timers</h3>

<h3>Introduksjon</h3>

Denne eksamen var krevende, men samtidig veldig lærerik. Eksamen fikk utfordret meg på flere av de forskjellige ferdighetene jeg har lært i løpet av dette semesteret. Jeg har laget en applikasjon hvor brukeren blir først sendt til en start side. Startsiden viser de forskjellige funksjonene som er mulig å gjennomføre på applikasjonen. 

<h3>De forskjellige funksjonene er : </h3>

* Logge inn med google konto.
* Profilside, som viser informasjon hentet fra Google kontoen.
* Lage andre brukere på nettsiden.
* Liste ut brukarene som er laget.
* Redigere brukarene ved å trykke på navnet til brukeren.
* Chatfunksjon, hvor brukeren bestemmer eget navn og kan sende og motta meldinger.

Funksjonene på nettsiden er fra start av låst, og ikke tilgjengelig for brukeren, før man har logget seg inn med Google kontoen sin. Når brukeren har logget inn med Google kontoen, får man tilgang til funksjonene. 
Prosjektet er bygget opp fra grunnen av ved hjelp av React rammeverk.  NodeJs, Express og Express Websocket er brukt for å kjøre serveren. Babel er brukt for å oversette jsx og js filer til front-end siden. Prosjektet inneholder en del tester, som er kjørt via Jest. Prosjektet er bygget opp av meg selv, men jeg har hentet inspirasjon og noe kopiert kode fra de forskjellige forelesningene vi har hatt dette semesteret. 

<h3>Introduksjon til å kjøre prosjektet:</h3>

* Prosjektet ligger i en Zip-fil som må unzipets i en mappe.
* Når prosjektet er åpnet i intelij, skriv inn kommandoen npm install i terminalen.
* For å kjøre testene i prosjektet skriver man inn npm test i terminalen.
* For å starte applikasjonen, skriver man inn npm start i terminalen.
* For å komme seg inn i applikasjonen, gå inn i nettleseren og skriv http://localhost:3000

<h3>Struktur:</h3>

* Server filene finner man i src/server mappen
* Client filene finner man i src/client mappen
* Pages filene finner man i src/pages mappen
* Test filene finner man i src/tests mappen
* Resterende filler ligger direkte inn i src mappen
