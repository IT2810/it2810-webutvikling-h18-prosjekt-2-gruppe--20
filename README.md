Prosjekt 2 - Kunstgenerator
===

## Produksjonssetting

Bruk scriptet `./buildAndTransfer.sh` til å bygge `build` og overføre filane til hjemmemappa på serveren. Deretter ssh inn til serveren og kjør `sudo mv build/* /var/www/html/prosjekt2/`, som flytter filene til riktig plass.

### Fikse HTTP 404 på GET til /db/*

Feil fordi prosjektet ditt som ligger i undermappen `prosjekt2` forsøker å aksessere noe som ligger i rotmappen til serveren `/var/www/html`. 

Gå til `/etc/apache2/apache2.conf` og legg inn linjen `Alias /db /var/www/db/html/prosjekt2/db`. Restart så apache2 ved å kjøre `sudo service apache2 restart`.

## CSS og stillegging

### Responsivt design

Designet ble fra starten av designet til å skulle "flyte" hele veien ned til mobilvisning, med minimal bruk av media-queries. Dette ble hovedsakelig løst ved hjelp av flexbox, og litt triksing med `width`, `max-width` og `margin` i CSS.

Media-queries ble hovedsakelig brukt for å styre `font-size` til nettsiden i roten (altså i body elementet). Dette kunne vi da videre nyttiggjøre oss av gjennom `em` og `rem` enhetene (https://www.w3schools.com/cssref/css_units.asp).

### Block Element Modifier (BEM)

Er en metodikk for å navngi css-klasser, med hensikt til å minimere uintensjonell nøsting og overstyring av css properties. Mer om dette ligger på hjemmesiden deres http://getbem.com/. Konvensjonen er litt stygg, men egner seg ganske bra til komponentbaserte strukturer. Vi bruker denne konvensjonender det er hensiktsmessig.

## Filstruktur på server

|       | Tab 1 | Tab 2 | Tab 3 | Tab 4 |
|-------|-------|-------|-------|-------|
| Kat 1 | 1     | 2     | 3     | 4     |
| Kat 2 | 5     | 6     | 7     | 8     |
| Kat 3 | 9     | 10    | 11    | 12    |

Filene er navngitt slik at man enkelt ut fra valgt kategori og tab skal kunne hente ut rett fil. For eksempel vil tab 3 med 1 som valgt musikk-kategori og 3 som bildekategori samsvare med filene ```aud3.mp3``` og ```img7.svg```. Teksfilene følger samme system men er lagret som én JSON-fil der det er en liste av tekstobjekter. Ettersom listen er nullindeksert og tabellen og filnavnene går fra 1 og oppover må man hente tekst-objektet som har 1 lavere indeks enn det tallet fra tabellen. For eksempel vil man ved valgt tab 1 og kat 3 hente objektet på plass 8 i JSON-filen.

Denne løsningen er ikke skalerbar om man skal utvide antall tabs, men skalerer greit om man skal utvide med fler kategorier.
## Hente innhold fra server

Innhold skulle hentes fra serveren ved hjelp av AJAX. Siden de fleste nettlesere nå støtter `fetch`-apiet og resten kan bruke en polyfill, tok vi heller i bruk `fetch()` istedenfor å skulle hente inn tredjepartsbiblioteker. Se `utils/api/` for eksempler på bruk.

## Caching i nettleser

Statiske tekst filer, som SVG og JSON, skal etter første HTTP forespørsel bli lagret lokalt i nettleseren.

Vi såg for oss to alternativer for å løse dette

1. In-memory caching - Altså lagre innholdet i en global variabel
2. LocalStorage - Persistent lagre innholdet i nettlserens localStorage

Begge alternativene er tilstrekkelige nok for oppgavene, men begge var omtrentlig like enkle å implementere. Derfor tok vi det ekstra steget med å lagre innholdet i localStorage, slik at innholdet ville være lagret lokalt i nettleseren så fremt ingen manuelt tømte cachen.

Vi bruker modulene `utils/api/imageApi.js` og `utils/api/textApi.js` som mellomvare for serveren, cachen og brukeren.

Modulene bruker følgende brukerflyt, for å håndtere caching:

1. Sjekk om innholdet allerede er cachet, og returner så innholdet der ifra.
2. Forsøk å hent filen fra serveren
3. Om den fant noe, lagre dette i cachen
4. Returner resultatet

## Komponentstruktur

Kildekoden til prosjektet er strukturert slik at rotmappene definerer _"kategorien"_ til en JSX- eller ES6-modul. Dvs. en fil kan være en av følgende kategorier

- **Component** - Vanlige React komponenter, med eller uten tilstand
- **Page** - React komponenter som er brukt av react router. Inneholder vanligvis logikk og tilstand for en side, og snakker til ruteren.
- **Utility** - Moduler eller funksjoner som skal støtte opp Pages eller Components med funksjonalitet. Dette kan være moduler for api kall, osv.
- **Rotmoduler** - Filer og komponenter som er definert i roten. Typisk filer som setter opp react på nettsiden og diverse rotkomponenter.

I dette prosjektet nyttes ikke React router, men det var uansett fordelsaktig å dytte all logikk inn i en Page komponent. Slik kunne Komponenten App kun fokusere på struktur av nettsiden, sette inn header og footer, og tilstand ble delegert til `HomePage`.

### Intern struktur
Inni rotmappene struktureres innhold etter type (eller domene). Dvs. at en komponent som NavBar har en mappe kalt `NavBar` og alt som hører til NavBar lagres inni denne. Selve NavBar koden legges i filen `NavBar/index.js`.

Består komponenten av kun en fil, trenger vi ikke å lage undermapper. Da lager vi kun en fil med navnet `NavBar.js`

All komponenter bruker `PascalCase` konvensjonen for navngiving (med unntak av `index.js`), som er vanlig konvensjon i React. Alle andre moduler bruker vanlig `camelCasing`.

### Importering av CSS

CSS lastes direkte inn i en komponent, ved å bruke ES6 sin `import '<cssfile.css>';` syntaks. 

> Merk at dette derimot ikke er funksjonalitet som hører til ES6. Dette håndteres av Webpack når koden bygges.

```
src/
| components/
  | NavBar
    | index.css
    | index.js
| pages/
  | HomePage.js
| utils/
```

### Tilstand i komponenter

For å holde koden enklest mulig, forsøker vi å minimere antall komponenter som trenger å ha egen tilstand (en: state) til kun de som absolutt trenger det. Dette sparer oss fra å måtte jobbe med komponent-livssykluser til kun de som absolutt trenger det. I tillegg får vi veldefinerte- og tilstandsløsekomponenter, hvor vi tydelig ser hva input, output og ansvar (single responsebility principle) er.

I dette prosjektet er det strengt talt kun komponenten `pages/HomePage.js` som trenger tilstand. Da denne har kontroll på hvilke faner og kategorier som er valgt, samt hva data som blir presentert.

## Strukturering av arbeid

Ettersom prosjektet ikke er særlig omfattende og gruppen kun består av 3 personer ser vi det som tilstrekkelig å pushe og pulle rett mot master fremfor å bruke branches og sette opp pull requests. For å konkretisere arbeidsoppgavene bruker vi Github sin innebygde funksjonalitet for issues og muligheten for å koble commits mot issues. For å strukturere issuene på en god måte på et Kanban Board bruker vi Github Projects.

### Timeregistrering
For å holde oversikt over tidsforbruk for gruppemedlemmene på de ulike issuene bruker vi [Toggl](https://toggl.com/). Dette er en enkel applikasjon hvor gruppens medlemmer starter en timer og gir arbeidsøkten et navn når de begynner å jobbe og stopper timeren når de er ferdige. Videre kan man hente ut flere ulike rapporter for hver enkeltes og gruppas helhetlige tidsforbruk.

## Referanser

### Img links

* Elephants
    * https://pixabay.com/no/elefant-pattedyr-dyr-dyreliv-37572/
    * https://pixabay.com/no/afrika-dyr-asia-elefant-pattedyr-1299863/
    * https://pixabay.com/no/elefant-pachyderm-dyr-afrika-asia-1302155/
* Tanks
    * https://pixabay.com/no/russisk-silhouette-sovjetiske-tank-1294329/
    * https://pixabay.com/no/h%C3%A6ren-bekjempe-kampen-maskin-2026817/
    * https://pixabay.com/no/v%C3%A6pnede-styrker-armour-h%C3%A6ren-2025865/
* Scuba divers
    * https://pixabay.com/no/silhouette-%EE%A4%92-sport-havet-dykking-3347237/
    * https://pixabay.com/no/dykke-dykking-finsk-stirre-scuba-1298853/
    * https://pixabay.com/no/dykking-dykker-sport-dykking-147683/
* Guitars
    * https://pixabay.com/no/gitar-akustisk-gitar-32054/
    * https://pixabay.com/no/classic-gitar-h%C3%B8re-instrument-2026112/
    * https://pixabay.com/no/elektrisk-gitar-ax-%C3%B8ks-gitar-161740/

### Audio links

* Tanks
    * https://freesound.org/people/qubodup/sounds/169743/
	* https://freesound.org/people/qubodup/sounds/184275/
	* https://freesound.org/people/Benboncan/sounds/74242/
* Elephant
	* https://freesound.org/people/vataaa/sounds/148873/
	* https://freesound.org/people/roubignolle/sounds/35142/
	* https://freesound.org/people/jobro/sounds/76731/
* Diving
	* https://freesound.org/people/plaamook/sounds/409298/
	* https://freesound.org/people/TheScarlettWitch89/sounds/414940/
	* https://freesound.org/people/digifishmusic/sounds/45521/
* Guitar
	* https://freesound.org/search/?q=guitar+string
	* https://freesound.org/people/InspectorJ/sounds/439554/
	* https://freesound.org/people/FrankyBoomer/sounds/251223/
