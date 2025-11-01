[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/MmU_Mtru)
**Toto je základní kód k přednostnímu odevzdání úkolu 5 z BSDE (Základy softwarového vývoje) pro distanční studium v češtině.**

Zadání úkolu 5 je [zde](https://uuapp.plus4u.net/uu-managementkit-maing02/38744216cb324edca986789798259ba9/document?oid=67a9e77b1cb9350216de430d&pageOid=67a9e784c7d8a680ccbb513d).
To obsahuje ale i úkol 3, zadání [zde](https://uuapp.plus4u.net/uu-managementkit-maing02/38744216cb324edca986789798259ba9/document?oid=67a9e66b1cb9350216de3144&pageOid=67a9e6731cb9350216de31df).

**Pro odevzdání je nutné úkol odevzdat**:

1) Kód sem na GitHub
2) Návrh algoritmu na Homework Solution
3) Na Plus4U přes tlačítko odevzdat jako úkol 1

**Poznámky k úkolu:**
- Drazí odvážní řešitelé, obtížnost a striktnost úkolů se během semestru průběžně zvyšuje, aby reflektovala zvýšení schopností studentů. Řešením tohoto úkolu ovšem vše přeskakujete rovnou na nejpřísněji hodnocený úkol. Pokusím se vám tedy dát více rad.
- Návrh algoritmu nemusí být nutně v komponentě Algorithm, pokud vám v tom brání technické problémy.
- Komponentu algorithm lze otevřít a kopírovat jako kód s XML strukturou - pokud ji vytváříte delší dobu, je vhodné si tento kód ukládat stranou. Pokud dojde mezitím k odhlášení, můžete o rozpracovanou práci přijít.
- Návrh algoritmu by neměl být totožný k kódem, kód ho ovšem může uvozovat.
- Návrh nemusí řešit implementační detaily - zvláště ty specifické pro konkrétní jazyk - musí ovšem být možné podle něj **jednoznačně** implementovat program, který problém řeší.
- Pro použití funkcí v návrhu můžete užít tato řešení:
  - Pokud je krátká, nahradit volání funkce jejím tělem.
  - Pokud je lehce pochopitelná, nahradit volání jejich abstraktním (ale jednoznačným) popisem.
  - Jinak je možné funkci definovat mimo hlavní sekvenci jako další návrh algoritmu a pouze ji "volat" zmíněním jejího použití.
 
    
- Prosím, dejte si pozor na to, že je nutné přesně dodržet strukturu kódu ze zadání.
- Nutnou součástí kódu jsou komentáře typu JSP. Testy vám je vynutí.
- Pokud máte problém vyřešit testy ke generování osob, zkuste nejprve vyřešit úkol 3.
- Je nutné **generovat náhodné datum tak, aby generovaný věk osob byl ve zvoleném intervalu**. Testy kontrolují přesnost až na ms, naštěstí vám ovšem nechávám přibližně měsíc jako polovenou odchylku :)
- Věk v intervalu zde bereme přísně matematicky. Pro věk Z z intervalu <X, Y> platí:X <= Z <= Y. Všechna čísla jsou reálná. **Tzn. pro interval věku <18, 60> osoby ve věku 17 let a 11 měsíců, i 60 let a 1 měsíc jsou mimo interval.**
- Pokud jste se během implementace ztratili v podmínkách různých dnů, let a měsíců, zkuste si připomenout, jak jste podobné slovní úlohy s časem řešili na základní/střední škole.
- Průměrný rok má přibližně 365.25 dne, vyšší přesnost je vzhledem k vysoké povolené odchylce zbytečná.
- Program nemusí nutně generovat strukturu names, i chartData. Stačí vygenerovat jen jeden z nich.
- Jména v každé kategorii musí být (numericky) **seřazená sestupně dle četnosti**.
- Řešení s kubickou časovou složitostí neprojdou testy. Každý vnořený cyklus vám umocňuje počet operací a funkce procházející kolekci ji většinou musí celou projít (sort dokonce několikrát).

**Jak postupovat v úkolu:**
1) Editujete hlavně soubor main.js.
2) Úkol musí obsahovat generateEmployeeData(dtoIn) (main z úkolu 3), getEmployeeChartContent(employeeData) (jádro tohoto úkolu 5) a být spouštěn fukncí main(dtoIn).
3) Je výrazně doporučeno úkol rozdělit do více podfunkcí, aby se zabránilo nepřehlednosti kódu. Ta je také bodována.
4) Pokud chcete, můžete importovat funkce z jiných souborů (naznačeno na druhém řádku). Použijte pro to složku src.
5) Kód je automaticky otestován po každé operaci Push. Pokud chcete, můžete si spustit testování lokálně - je třeba pro to nainstalovat NPM. Následně v příkazovém řádku ve složce projektu nainstalujete moduly přes "npm install" a spustíte testování přes "npm test".
6) Přepisování testů a nebo způsobu spouštění aplikace (složka test, .git nebo soubor package.json) není povoleno. Pokud k tomu dojde, neznamená to, že úkol nebude hodnocen. Ale přiděláte mi tím práci.
