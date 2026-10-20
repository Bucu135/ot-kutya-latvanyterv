/* Öt Kutya · étlap-adatok — a FB-n közzétett papírétlapról (HU + RO, ár lejben).
   tags: v = vegetáriánus, h = csípős · alg: allergén-betűk az étlap jelmagyarázata szerint */
window.MENU = [
  { id: 'breakfast', hu: 'Reggeli', ro: 'Mic dejun', photo: 'kave', items: [
    { hu: 'Mexikói reggeli', ro: 'Mic dejun mexican', p: 21, tags: 'vh', alg: 'C',
      dHu: '3 tojás, 100 g vörösbab, chili, avokádó', dRo: '3 ouă, 100 g fasole roșie, ardei iute, avocado' },
    { hu: 'Mozzarellás bundás kenyér', ro: 'Frigănele cu mozzarella', p: 21, tags: 'v', alg: 'GC',
      dHu: '2 tojás, 4 szelet kenyér, mozzarella', dRo: '2 ouă, 4 felii pâine, mozzarella' },
    { hu: 'Sajtos, szalonnás, hagymás tojásrántotta', ro: 'Omletă cu slănină, ceapă, cașcaval', p: 21, alg: 'GC',
      dHu: '2 tojás, szalonna, hagyma, sajt', dRo: '2 ouă, slănină, ceapă, cașcaval' }
  ]},
  { id: 'soups', hu: 'Levesek', ro: 'Supe', photo: 'gulyas', items: [
    { hu: 'Gulyásleves', ro: 'Supă de gulaș', p: 22, tags: 'h', alg: 'C', star: 1,
      dHu: 'vegyes zöldség, marhahús, csipetke · 50/450 g', dRo: 'legume mixte, carne de vită, găluște · 50/450 g' },
    { hu: 'Parasztcsorba', ro: 'Ciorbă țărănească', p: 20, alg: 'C',
      dHu: 'vegyes zöldség, marhahús, lestyán · 50/350 g', dRo: 'legume mixte, carne de vită, leuștean · 50/350 g' },
    { hu: 'Pacalleves', ro: 'Ciorbă de burtă', p: 21, tags: 'h', alg: 'GC',
      dHu: 'fokhagyma, tejföl, pacal, csípős paprika · 100/300 g', dRo: 'usturoi, smântână, burtă de vită, ardei iute · 100/300 g' },
    { hu: 'Tárkonyos pityókaleves', ro: 'Supă de cartofi cu tarhon', p: 19, alg: 'GC',
      dHu: 'tejföl, tárkony, pityóka · 100/300 g', dRo: 'smântână, tarhon, cartofi · 100/300 g' },
    { hu: 'Vargánya krémleves', ro: 'Supă cremă de hribi', p: 28, tags: 'v', alg: 'G', dHu: '400 g', dRo: '400 g' },
    { hu: 'Sült paprika krémleves kacsa-húsgombóccal', ro: 'Supă cremă de ardei copți cu perișoare de rață', p: 25, alg: 'G', dHu: '300/100 g', dRo: '300/100 g' }
  ]},
  { id: 'mains', hu: 'Főételek', ro: 'Mâncăruri gătite', photo: 'camembert', items: [
    { hu: 'Camembert diókéregben, áfonyalekvárral', ro: 'Camembert în crustă de nuci cu dulceață de afine', p: 32, tags: 'v', alg: 'GEA', dHu: '150 g', dRo: '150 g', ph: 'dio-camembert' },
    { hu: 'Mézes-fokhagymás camembert chilipehellyel', ro: 'Camembert cu miere, usturoi și fulgi de chilli', p: 34, tags: 'vh', alg: 'G', dHu: '250 g', dRo: '250 g', ph: 'camembert' },
    { hu: 'Rántott sajt', ro: 'Cașcaval pane', p: 28, tags: 'v', alg: 'GC', dHu: 'zsemlemorzsában panírozva · 150/50 g', dRo: 'pané în pesmet · 150/50 g' },
    { hu: 'Ropogós csirkefalatkák', ro: 'Pui crocant', p: 31, alg: 'A', dHu: '220 g', dRo: '220 g' },
    { hu: 'Pikáns, mézes csirkeszárny chips pityókával', ro: 'Aripioare de pui picante glazurate cu miere', p: 31, tags: 'h', dHu: '200 g', dRo: '200 g', ph: 'oldalas' },
    { hu: 'Kárpáti borzoska', ro: 'Șnițel carpatin', p: 33, alg: 'GC',
      dHu: 'csirkemell tojásos bundában, fokhagymás-tejfölös öntettel, reszelt sajttal · 240 g', dRo: 'piept de pui pané în ou, sos de usturoi cu smântână, brânză rasă · 240 g' },
    { hu: 'Cigánypecsenye', ro: 'Ceafă țigănească', p: 33, dHu: 'fokhagymás tarja sült szalonnával · 240 g', dRo: 'ceafă de porc cu slănină, asezonată cu usturoi · 240 g' },
    { hu: 'Sertésborda chips krumplival, barbecue szósszal', ro: 'Coaste de porc cu cartofi chips și sos barbeque', p: 47, dHu: '200/150/50 g', dRo: '200/150/50 g' },
    { hu: 'Sertésszárny steak krumplival, csípős paprikalekvárral', ro: 'Aripioare de porc la cuptor cu cartofi steak și dulceață iute', p: 41, tags: 'h', dHu: '200/150/50 g', dRo: '200/150/50 g' },
    { hu: 'Csülök chips krumplival, tejfölös-tormás szósszal', ro: 'Ciolan cu cartofi chips și sos de hrean cu smântână', p: 47, alg: 'G', dHu: '250/150/50 g', dRo: '250/150/50 g' },
    { hu: 'Rókagomba-paprikás puliszkával', ro: 'Tocăniță de gălbiori cu mămăligă', p: 40, tags: 'v', alg: 'AG', dHu: '180 g', dRo: '180 g' },
    { hu: 'Marhapörkölt nokedlivel', ro: 'Tocăniță de vită cu gălușcuțe', p: 41, alg: 'AC', star: 1, dHu: '150/100 g', dRo: '150/100 g' },
    { hu: 'Sült pisztráng körettel, fokhagymaszósszal', ro: 'Păstrăv prăjit cu garnitură și sos de usturoi', p: 48, alg: 'GD', dHu: '250/150/50 g', dRo: '250/150/50 g' }
  ]},
  { id: 'pasta', hu: 'Tészták & saláták', ro: 'Paste & salate', photo: 'spagetti', items: [
    { hu: 'Spagetti garnélarákkal és koktélparadicsommal', ro: 'Spaghete cu creveți și roșii cherry', p: 39, alg: 'BA', dHu: '100/300 g', dRo: '100/300 g' },
    { hu: 'Sonkás-gombás tagliatelle', ro: 'Tagliatelle cu șuncă și ciuperci', p: 31, alg: 'AG', dHu: '50/50/300 g', dRo: '50/50/300 g' },
    { hu: 'Görög saláta', ro: 'Salată grecească', p: 26, tags: 'v', alg: 'G',
      dHu: 'paradicsom, uborka, lilahagyma, saláta, fekete olajbogyó, feta · 300 g', dRo: 'roșii, castraveți, ceapă roșie, salată, măsline negre, brânză feta · 300 g' },
    { hu: 'Cézár saláta', ro: 'Salată Caesar', p: 29, alg: 'G',
      dHu: 'csirkemell, paradicsom, uborka, saláta, öntet, krutonok · 300 g', dRo: 'piept de pui, roșii, castraveți, salată, dressing, crutoane · 300 g' }
  ]},
  { id: 'burgers', hu: 'Hamburger', ro: 'Hamburger', photo: 'burger', items: [
    { hu: 'Hagyományos hamburger coleslaw salátával', ro: 'Hamburger clasic cu salată coleslaw', p: 40, alg: 'MACG',
      dHu: 'marhahúspogácsa, saláta, lilahagyma, paradicsom, cheddar, burgerszósz · 300/150 g', dRo: 'carne de vită, salată, ceapă roșie, roșii, cheddar, sos pentru burger · 300/150 g' },
    { hu: 'Vegetáriánus hamburger coleslaw salátával', ro: 'Hamburger vegetarian cu salată coleslaw', p: 40, tags: 'v', alg: 'ACG',
      dHu: 'halloumi, gomba, pesto, saláta, paradicsom, lilahagyma · 250/150 g', dRo: 'halloumi, ciuperci, sos pesto, salată, roșii, ceapă roșie · 250/150 g' }
  ]},
  { id: 'sides', hu: 'Köretek & szószok', ro: 'Garnituri & sosuri', photo: 'tal', compact: true, items: [
    { hu: 'Chips krumpli', ro: 'Cartofi chips', p: 9, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Szalmakrumpli', ro: 'Cartofi prăjiți', p: 9, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Rizsgolyók', ro: 'Biluțe de orez', p: 9, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Krumplipüré', ro: 'Piure de cartofi', p: 9, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Coleslaw saláta', ro: 'Salată coleslaw', p: 14, tags: 'v', alg: 'C', dHu: '150 g', dRo: '150 g' },
    { hu: 'Friss vegyes saláta', ro: 'Salată proaspătă asortată', p: 12, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Paradicsom-, káposzta-, uborka- vagy céklasaláta', ro: 'Salată de roșii, varză, castraveți sau sfeclă', p: 9, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Savanyúság, savanyú káposzta', ro: 'Murături, varză murată', p: 9, tags: 'v', dHu: '150 g', dRo: '150 g' },
    { hu: 'Tartármártás', ro: 'Sos tartar', p: 5, alg: 'CG', dHu: '50 g', dRo: '50 g' },
    { hu: 'Fokhagymás vagy tormás szósz', ro: 'Sos de usturoi sau de hrean', p: 5, alg: 'G', dHu: '50 g', dRo: '50 g' },
    { hu: 'Barbecue szósz', ro: 'Sos barbeque', p: 7, alg: 'MG', dHu: '50 g', dRo: '50 g' },
    { hu: 'Csípőspaprika-lekvár', ro: 'Dulceață iute', p: 8, tags: 'h', dHu: '50 g', dRo: '50 g' },
    { hu: 'Tejföl', ro: 'Smântână', p: 3, alg: 'G', dHu: '50 g', dRo: '50 g' }
  ]},
  { id: 'desserts', hu: 'Desszertek', ro: 'Deserturi', photo: 'kave', items: [
    { hu: 'Brownie vaníliafagylalttal', ro: 'Brownie cu înghețată de vanilie', p: 21, alg: 'EACG', star: 1, dHu: '150/50 g', dRo: '150/50 g' },
    { hu: 'Madártej', ro: 'Lapte de pasăre', p: 17, alg: 'ACG', dHu: '150 g', dRo: '150 g' },
    { hu: 'Almás pite vaníliamártással és karamellszósszal', ro: 'Tartă cu mere, cremă de vanilie și sos caramel', p: 21, alg: 'ACG', dHu: '150/50 g', dRo: '150/50 g' }
  ]}
];

window.PIZZA = [
  { n: 'Margherita', p: 32, hu: 'paradicsomszósz, fior di latte mozzarella, bazsalikom, olívaolaj', ro: 'sos de roșii, mozzarella fior di latte, busuioc, ulei de măsline' },
  { n: 'Marinara', p: 30, hu: 'paradicsomszósz, oregánó, fokhagyma, olívaolaj', ro: 'sos de roșii, oregano, usturoi, ulei de măsline' },
  { n: 'Cotto e funghi', p: 35, hu: 'paradicsomszósz, mozzarella, bazsalikom, gomba, főtt sonka', ro: 'sos de roșii, mozzarella, busuioc, ciuperci, șuncă fiartă' },
  { n: 'Prosciutto crudo', p: 38, hu: 'paradicsomszósz, mozzarella, prosciutto crudo, koktélparadicsom, rukkola', ro: 'sos de roșii, mozzarella, prosciutto crudo, roșii cherry, rucola' },
  { n: 'Naples', p: 36, hu: 'paradicsomszósz, mozzarella, főtt sonka, chorizo, kukorica, bazsalikom', ro: 'sos de roșii, mozzarella, șuncă fiartă, chorizo, porumb, busuioc' },
  { n: 'Diavola', p: 35, hu: 'paradicsomszósz, mozzarella, csípős szalámi, pepperoni paprika, bazsalikom', ro: 'sos de roșii, mozzarella, salam picant, ardei pepperoni, busuioc', h: 1 },
  { n: 'Rafano', p: 34, hu: 'tormás alap, főtt sonka, mozzarella, zöldhagyma', ro: 'bază de hrean, șuncă fiartă, mozzarella, ceapă verde' },
  { n: 'Tartufo', p: 39, hu: 'szarvasgombás alap, mozzarella, chorizo', ro: 'bază de trufe, mozzarella, chorizo' },
  { n: 'Ungherese', p: 36, hu: 'paradicsomszósz, mozzarella, főtt sonka, csípős szalámi, lilahagyma, pepperoni paprika', ro: 'sos de roșii, mozzarella, șuncă fiartă, salam picant, ceapă roșie, ardei pepperoni', h: 1 },
  { n: 'Salame', p: 35, hu: 'paradicsomszósz, mozzarella, chorizo, olívaolaj', ro: 'sos de roșii, mozzarella, chorizo, ulei de măsline' },
  { n: 'Mortadella pizza sandwich', p: 32, hu: 'friss mozzarella, mortadella, citromhéj, csípős piros paprika, pisztácia', ro: 'mozzarella proaspătă, mortadella, coajă de lămâie, ardei iute, fistic' },
  { n: 'Nutella pizza', p: 32, hu: 'Nutella, csokiöntet, porcukor – simán, banánnal vagy eperrel', ro: 'Nutella, sos de ciocolată, zahăr pudră – simplă, cu banane sau căpșuni' }
];

window.ALLERGENS = {
  A: { hu: 'glutén (búza, rozs, árpa, zab)', ro: 'gluten (grâu, secară, orz, ovăz)' },
  B: { hu: 'rákfélék', ro: 'crustacee' },
  C: { hu: 'tojás', ro: 'ouă' },
  D: { hu: 'hal', ro: 'pește' },
  E: { hu: 'diófélék', ro: 'nuci' },
  F: { hu: 'szója', ro: 'soia' },
  G: { hu: 'tej és tejtermékek', ro: 'lapte și derivate' },
  H: { hu: 'földimogyoró, mogyoró', ro: 'arahide, alune' },
  L: { hu: 'zeller', ro: 'țelină' },
  M: { hu: 'mustár', ro: 'muștar' },
  N: { hu: 'szezámmag', ro: 'semințe de susan' }
};
