Prosjekt 2 - Kunstgenerator
===

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





