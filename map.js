require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView", 
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Search",
    "esri/PopupTemplate"
  ], function(esriConfig, Map, MapView, FeatureLayer, Legend, Expand, Search, PopupTemplate) {
    
    esriConfig.apiKey = "AAPT3NKHt6i2urmWtqOuugvr9eCsBZ6_O8t9W_sCdDNnfgVjXQMlKCpI1hmZTPJF5AnQlC6Cf79lAJ0v96_BGRfUt3tMGhIUiOFciCC0i2POYkcVk8PQuvsrxYedzbDlXw7CFUnA3SS5H4Labff4S01ILUURGmmbGJ2HD0opLeCBs378feRV5TiVrPZd_MoR0-jinnkN_vI-KPtKGq9aO4DlICp1Ir72yKT2ugepncyLBJjrqY-0v8uc2tLby5ZWUs3D9Mi5j5Vwrn1oWiYLQP1cI5YlUxtvrhYb-JKh8FgUU-w.";

    // Créer la carte avec un fond de carte satellite
    const map = new Map({
      basemap: "satellite"
    });
  
    // Créer la vue de la carte
    const view = new MapView({
      map: map,
      center: [-8.7772, 29.8746], 
      zoom: 5,
      container: "viewDiv"
    });
    const provincialPopup = new PopupTemplate({
      title:"Routes Provinciales",
      content:`
      <ul>
      <li>Nom : {Nom}</li>
      <li>Longueur : {Longueur}Km</li>  
     </ul> `
    });
    var provincialRenderer = {
      type: "simple", // Utilise un simple renderer pour tous les objets
      symbol: {
        type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
        color: [255,255, 0,],   // Bleu pour les lignes d'autoroute
        width: 1,             // Épaisseur des lignes
        style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
      }
    };
    const regionalPopup = new PopupTemplate({
      title:"Routes Régionales",
      content:`
      <ul>
      <li>Nom : {Nom}</li>
      <li>Longueur : {Longueur}Km</li>  
     </ul>`
    });
    var regionalRenderer = {
      type: "simple", // Utilise un simple renderer pour tous les objets
      symbol: {
        type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
        color: [0,255, 0,],   // Bleu pour les lignes d'autoroute
        width: 1,             // Épaisseur des lignes
        style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
      }
    };
    const natianalePopup = new PopupTemplate({
      title:"Routes Nationales",
      content:`
      <ul>
      <li>Nom : {Nom}</li>
      <li>Longueur : {Longueur}Km</li>  
     </ul> `
    });
    var natianaleRenderer = {
      type: "simple", // Utilise un simple renderer pour tous les objets
      symbol: {
        type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
        color: [255, 0, 0],   // Bleu pour les lignes d'autoroute
        width: 1.5,             // Épaisseur des lignes
        style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
      }
    };
    const autoroutePopup = new PopupTemplate({
      title: "Autoroutes",
      content:`
      <ul>
      <li>Nom : {Nom}</li>
      <li>Longueur : {Longueur}Km</li> 
     </ul> `
    });
    var autorouteRenderer = {
      type: "simple", // Utilise un simple renderer pour tous les objets
      symbol: {
        type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
        color: [0, 0, 255],   // Bleu pour les lignes d'autoroute
        width: 1.5,             // Épaisseur des lignes
        style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
      }
    };
    const barragepachalikPopup = new PopupTemplate({
      title:"Barrages par Caidats",
      content:`
      <ul>
      <li>Nom: {nom_barrag}</li>
      <li>Coordonnées: {Longitude},{Latitude}</li>
      <li>Pachalik: {NOM_PACHAL}</li>
      <li>Parent: {PARENT_PAC}</li> 
      </ul>`
    });
    var barragepachalikRenderer = {
      type: "simple", // Utilise un simple renderer pour tous les objets
      symbol: {
        type: "simple-marker",  // Utilise un symbole de marqueur simple pour représenter les points
        color: [0, 0, 255],     // Bleu pour les points
        size: 8,                // Taille des points
        outline: {
          color: [255, 255, 255],  // Bordure blanche autour des points
          width: 1             // Épaisseur de la bordure
        }
      }
    };
    const barragescaidatPopup = new PopupTemplate({
      title:"Barrages par Pachaliks",
      content:`
      <ul>
      <li>Nom: {nom_barrag}</li>
      <li>Coordonnées: {Longitude},{Latitude}</li>
      <li>Caidat: {NOM_CAIDAT}</li>
      <li>Parent: {PARENT_CAI}</li>
      <li>Province: {PROVINCE_C}</li>
      </ul>`
    });
    var barragecaidatRenderer = {
      type: "simple", // Utilise un simple renderer pour tous les objets
      symbol: {
        type: "simple-marker",  // Utilise un symbole de marqueur simple pour représenter les points
        color: [0, 0, 255],     // Bleu pour les points
        size: 8,                // Taille des points
        outline: {
          color: [255, 255, 255],  // Bordure blanche autour des points
          width: 1             // Épaisseur de la bordure
        }
      }
    };
    const douarscaidatPopup = new PopupTemplate({
      title:"Douars Par Caidats",
      content:`
      <ul>
      <li>Nom:{NOM}</li>
      <li>Coordonnées: {Latitude},{Longitude}</li>
      <li>Caidats: {Nom_Caidat}</li> 
      <li>Cercle: {Nom_Cercle}</li>
      <li>Province: {Nom_Provin}</li>
     </ul>`
     });
    const caidatsPopup = new PopupTemplate({
      title:"CAIDATS",
      content:`
      <ul>
      <li>Nom:{NOM_CAIDAT}</li>
      <li>Parent: Cercle {PARENT_CAI}</li>
      <li>Province:{PROVINCE_C}</li>
      <li>Nombre Communes:{Nb_Commun}</li>
      <li>Population:{Pop_Caidat}</li>
      <li>Superficie:{Sup_Caidat}Km²</li>
     </ul> `
  
     });
    const cerclesPopup = new PopupTemplate({
      title:"CERCLES",
      content:`
      <ul>
      <li>Nom:{NOM_CERCLE}</li>
      <li>Nombre Caidat: {Nb_Caidats}</li>
      <li>Nombre Communes: {Nb_Commu}</li>
      <li>Population: {Population}</li>
      <li>Superficie: {Sup}Km²</li>
  
      </ul>`
    });
    const pachalikPopup = new PopupTemplate({
      title:"PACHALIKS",
      content:`
      <ul>
      <li>Nom: {NOM_PACHAL},{Nom_Pach}</li>
      <li>Type:{TYPE}</li>
      <li>Parent:{PARENT_PAC}</li>
      <li>Code Région:{Code_Regio}</li>
      <li>Code Province:{CODE_PROVI}</li> 
      <li>Districts:{Nb_Distric}</li>
      <li>Annexes:{Nb_ANNEXE}</li>
      <li>Population: {Population}</li>
      <li>Superficie: {expression/superficieArrondie}Km²</li>
       <li>Densité: {expression/densiteArrondie}h/Km²</li> 
      </ul>`,
      expressionInfos: [
        {
            name: "superficieArrondie",
            title: "Superficie Arrondie",
            expression: "Round($feature.Sup, 2)"
        },
        {
            name: "densiteArrondie",
            title: "Densité Arrondie",
            expression: "Round($feature.densité, 2)"
        }
       ]
     });
    const provincesPopup = new PopupTemplate({
      title:"PROVINCES",
      content:`
      <ul>
      <li>Nom: {NOM_PROV_P}</li>
      <li>Type:{TYPE_PROV_}</li>
      <li>Parent: {PARENT__PR}</li>
      <li>Pachaliks:{Nb_Pacha}</li>
      <li>Districts:{Nb_Distric}</li>
      <li>Cercles:{Nb_Cercles}</li>
      <li>Caidats:{Nb_Caidats}</li>
      <li>Communes:{Nb_Commu}</li> 
      <li>Population:{Population}</li>
      <li>Superficie:{Superficie}Km²</li> 
      </ul>`
    });
    const regionsPopup = new PopupTemplate({
      title:"REGIONS",
      content:`
      <ul>
      <li>Nom: {Nom_Régio}</li>
      <li>Code Région:{CODE_REGIO}</li>
      <li>Chef Lieu: {Chef_Lieu}</li>
      <li>Nombre Provinces: {Nb_Provin}</li>
      <li>Nombre Préfectures: {Nb_Préfec}</li>
      <li>Nombre Préfectures d'Arrondissements: {Préf_Arro}</li>
      <li>Population: {Population}</li>
      <li>Superficie:{Superficie}Km²</li>
      </ul>` 
    
    
  });
  const barragespachaliklayer = new FeatureLayer({
    url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Barrages/FeatureServer/72",
    title:"Barrages par Pachaliks",
    popupTemplate:barragepachalikPopup,
    renderer:barragepachalikRenderer
  });
  const barragecaidatlayer = new FeatureLayer({
    url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Barrages/FeatureServer/71",
    title:"Barrages par Caidats",
    popupTemplate:barragescaidatPopup,
    renderer:barragecaidatRenderer
  });
  
  const  douarslayer = new FeatureLayer({
    url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/DOUARS_DU_MAROC/FeatureServer/7",
    title:"Douars",
    popupTemplate:douarscaidatPopup
  });
    const provincialayer = new FeatureLayer({
      url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Infrastructures_Routières/FeatureServer/45",
      title:"Routes Provinciales",
      popupTemplate:provincialPopup,
      renderer: provincialRenderer
    });
    const rregionallayer = new FeatureLayer({
      url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Infrastructures_Routières/FeatureServer/69",
      title:"Routes Régionales",
      popupTemplate:regionalPopup,
      renderer:regionalRenderer
    });
    const rnationallayer = new FeatureLayer({
      url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Infrastructures_Routières/FeatureServer/60",
      title:"Routes Nationales",
      popupTemplate:natianalePopup,
      renderer: natianaleRenderer
    });

    const autoroutelayer = new FeatureLayer({
      url: "https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Infrastructures_Routières/FeatureServer/51",
      title:"Autoroutes",
      popupTemplate:autoroutePopup,
      renderer: autorouteRenderer
    });
    const caidatslayer = new FeatureLayer({
      url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Découpage_maroc/FeatureServer/4",
      title:"Caidats",
      popupTemplate:caidatsPopup
    });
    const cercleslayer = new FeatureLayer({
      url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Découpage_maroc/FeatureServer/3",
      title:"Cercles",
      popupTemplate:cerclesPopup
    });
    const pachalikslayer = new FeatureLayer({
      url:"https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Découpage_maroc/FeatureServer/2",
      title:"Pachaliks",
      popupTemplate:pachalikPopup
    });
    const provincelayer = new FeatureLayer({
      url: "https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Découpage_maroc/FeatureServer/1",
      title: "Provinces",
      popupTemplate:provincesPopup
    });
  
    const regionslayer = new FeatureLayer({
      url: "https://services5.arcgis.com/ub6wowATi7TSDBGv/arcgis/rest/services/Découpage_maroc/FeatureServer/0",
      title: "Régions",
      popupTemplate:regionsPopup
    });
    map.add(barragespachaliklayer);
    map.add(barragecaidatlayer);
    map.add(provincialayer);
    map.add(rregionallayer);
    map.add(rnationallayer);
    map.add(autoroutelayer);
    map.add(douarslayer);
    map.add(caidatslayer);
    map.add(cercleslayer);
    map.add(pachalikslayer);
    map.add(provincelayer);
    map.add(regionslayer);
    
  
    var legend = new Legend({
      view: view,
      layerInfos: [
        {   
          layer: douarslayer,
          title:"Douars"
        },
        {
          layer: barragecaidatlayer,
          title:"Barrage par Caidats"
        },
        {
          layer: barragespachaliklayer,
          title: "Barrage par Pachaliks"
        },
        {
          layer: autoroutelayer,
          title:"Autoroutes"
        },
        {
          layer: rnationallayer,
          title: "Route Nationales"
        },
        {
          layer: rregionallayer,
        title: "Routes Régionales"
        },
        {
          layer: provincialayer,
          title: "Routes Provinciales"
        },
        
        {
          layer: caidatslayer,
          title:"Caidats"
        },
        {
          layer: cercleslayer,
          title:"Cercles"
        },
        {
           layer: pachalikslayer,
           title:"Pachaliks"
  
        },
        {
          layer: provincelayer,
          title: "Province"
        },
        {
          layer: regionslayer,
          title: "Régions"
        }
        
      ]
    });
  
    var expandLegend = new Expand({
      view: view,
      content: legend,
      expanded: true,
      containerStyle: {
        width: "250px",  // Ajuster la largeur
        height: "300px"  // Ajuster la hauteur
      }
    });
  
    view.ui.add(expandLegend, "bottom-left");
     
    var searchWidget = new Search({
        view: view,  // Attacher le widget de recherche à la vue
        allPlaceholder: "Rechercher des lieux ou des entités", // Placeholder pour le champ de recherche
        sources: [] // Tu peux ajouter ici des sources spécifiques si tu as des données dans les FeatureLayers
      });
    
      // Ajouter le widget de recherche à l'interface utilisateur en haut à droite
      view.ui.add(searchWidget, {
        position: "top-right"
      });
             // Ajouter une source pour le FeatureLayer des Douars
    searchWidget.sources.push({
      layer: barragespachaliklayer,              // FeatureLayer des Douars
      searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
      displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
      exactMatch: false,               
      outFields: ["*"],                // Tous les champs retournés dans les résultats
      name: "Barrages par Pachalik",                  // Nom affiché dans les résultats de recherche
      placeholder: "Rechercher Barrage ",  // Texte d'aide dans la barre de recherche
      maxResults: 6,                   // Limite des résultats affichés
      maxSuggestions: 6,               // Limite des suggestions automatiques
      suggestionsEnabled: true,        // Suggestions automatiques activées
      minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
    });
       // Ajouter une source pour le FeatureLayer des Douars
      searchWidget.sources.push({
      layer: barragecaidatlayer,              // FeatureLayer des Douars
      searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
      displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
      exactMatch: false,               
      outFields: ["*"],                // Tous les champs retournés dans les résultats
      name: "Barrages par Caidat",                  // Nom affiché dans les résultats de recherche
      placeholder: "Rechercher Barrage ",  // Texte d'aide dans la barre de recherche
      maxResults: 6,                   // Limite des résultats affichés
      maxSuggestions: 6,               // Limite des suggestions automatiques
      suggestionsEnabled: true,        // Suggestions automatiques activées
      minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
            });
            
           // Ajouter une source pour le FeatureLayer des Douars
    searchWidget.sources.push({
      layer: provincialayer,              // FeatureLayer des Douars
      searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
      displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
      exactMatch: false,               
      outFields: ["*"],                // Tous les champs retournés dans les résultats
      name: "Routes Provinciales",                  // Nom affiché dans les résultats de recherche
      placeholder: "Rechercher Routes Provinciales ",  // Texte d'aide dans la barre de recherche
      maxResults: 6,                   // Limite des résultats affichés
      maxSuggestions: 6,               // Limite des suggestions automatiques
      suggestionsEnabled: true,        // Suggestions automatiques activées
      minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
    });
         // Ajouter une source pour le FeatureLayer des Douars
    searchWidget.sources.push({
      layer: rregionallayer,              // FeatureLayer des Douars
      searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
      displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
      exactMatch: false,               
      outFields: ["*"],                // Tous les champs retournés dans les résultats
      name: "Routes Régionales",                  // Nom affiché dans les résultats de recherche
      placeholder: "Rechercher Routes Régionales ",  // Texte d'aide dans la barre de recherche
      maxResults: 6,                   // Limite des résultats affichés
      maxSuggestions: 6,               // Limite des suggestions automatiques
      suggestionsEnabled: true,        // Suggestions automatiques activées
      minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
    });
         // Ajouter une source pour le FeatureLayer des Douars
    searchWidget.sources.push({
      layer: rnationallayer,              // FeatureLayer des Douars
      searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
      displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
      exactMatch: false,               
      outFields: ["*"],                // Tous les champs retournés dans les résultats
      name: "Routes Nationales",                  // Nom affiché dans les résultats de recherche
      placeholder: "Rechercher Routes Nationales",  // Texte d'aide dans la barre de recherche
      maxResults: 6,                   // Limite des résultats affichés
      maxSuggestions: 6,               // Limite des suggestions automatiques
      suggestionsEnabled: true,        // Suggestions automatiques activées
      minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
    });
       // Ajouter une source pour le FeatureLayer des Douars
    searchWidget.sources.push({
      layer: autoroutelayer,              // FeatureLayer des Douars
      searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
      displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
      exactMatch: false,               
      outFields: ["*"],                // Tous les champs retournés dans les résultats
      name: "Autoroutes",                  // Nom affiché dans les résultats de recherche
      placeholder: "Rechercher Autoroute",  // Texte d'aide dans la barre de recherche
      maxResults: 6,                   // Limite des résultats affichés
      maxSuggestions: 6,               // Limite des suggestions automatiques
      suggestionsEnabled: true,        // Suggestions automatiques activées
      minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
    });
    
     // Ajouter une source pour le FeatureLayer des Douars
    searchWidget.sources.push({
    layer: douarslayer,              // FeatureLayer des Douars
    searchFields: ["NOM"],           // Champ utilisé pour la recherche dans les Douars
    displayField: "NOM",             // Champ affiché dans les résultats pour les Douars
    exactMatch: false,               
    outFields: ["*"],                // Tous les champs retournés dans les résultats
    name: "Douars",                  // Nom affiché dans les résultats de recherche
    placeholder: "Rechercher un Douar",  // Texte d'aide dans la barre de recherche
    maxResults: 6,                   // Limite des résultats affichés
    maxSuggestions: 6,               // Limite des suggestions automatiques
    suggestionsEnabled: true,        // Suggestions automatiques activées
    minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
  });
  
  // Ajouter une source pour le FeatureLayer des Caidats
    searchWidget.sources.push({
    layer: caidatslayer,             // FeatureLayer des Caidats
    searchFields: ["NOM_CAIDAT"],    // Champ utilisé pour la recherche dans les Caidats
    displayField: "NOM_CAIDAT",      // Champ affiché dans les résultats pour les Caidats
    exactMatch: false,
    outFields: ["*"],
    name: "Caidats",
    placeholder: "Rechercher un Caidat",
    maxResults: 6,
    maxSuggestions: 6,
    suggestionsEnabled: true,
    minSuggestCharacters: 1
  });
  
  // Ajouter une source pour le FeatureLayer des Cercles
   searchWidget.sources.push({
    layer: cercleslayer,             // FeatureLayer des Cercles
    searchFields: ["NOM_CERCLE"],    // Champ utilisé pour la recherche dans les Cercles
    displayField: "NOM_CERCLE",      // Champ affiché dans les résultats pour les Cercles
    exactMatch: false,
    outFields: ["*"],
    name: "Cercles",
    placeholder: "Rechercher un Cercle",
    maxResults: 6,
    maxSuggestions: 6,
    suggestionsEnabled: true,
    minSuggestCharacters: 1
  });
  
  // Ajouter une source pour le FeatureLayer des Régions
   searchWidget.sources.push({
    layer: regionslayer,             // FeatureLayer des Régions
    searchFields: ["Nom_Régio"],     // Champ utilisé pour la recherche dans les Régions
    displayField: "Nom_Régio",       // Champ affiché dans les résultats pour les Régions
    exactMatch: false,
    outFields: ["*"],
    name: "Régions",
    placeholder: "Rechercher une Région",
    maxResults: 6,
    maxSuggestions: 6,
    suggestionsEnabled: true,
    minSuggestCharacters: 1
  });
  
  // Ajouter une source pour le FeatureLayer des Provinces
   searchWidget.sources.push({
    layer: provincelayer,            // FeatureLayer des Provinces
    searchFields: ["NOM_PROV_P"],    // Champ utilisé pour la recherche dans les Provinces
    displayField: "NOM_PROV_P",      // Champ affiché dans les résultats pour les Provinces
    exactMatch: false,
    outFields: ["*"],
    name: "Provinces",
    placeholder: "Rechercher une Province",
    maxResults: 6,
    maxSuggestions: 6,
    suggestionsEnabled: true,
    minSuggestCharacters: 1
  });
// Référence au div contenant les couches et au bouton
const layerControlsDiv = document.getElementById("layerControls");
const toggleButton = document.getElementById("toggleLayerControl");

// Fonction pour basculer la visibilité de la barre des couches
toggleButton.addEventListener("click", function() {
  if (layerControlsDiv.style.height === "auto") {
    layerControlsDiv.style.height = "30px"; // Masque les couches, réduit la hauteur
    toggleButton.innerHTML = "▼"; // Change le symbole pour indiquer l'expansion
  } else {
    layerControlsDiv.style.height = "auto";  // Affiche la barre des couches
    toggleButton.innerHTML = "▲"; // Change le symbole pour indiquer la réduction
  }
});
     // Gérer la visibilité des couches avec les cases à cocher
     document.getElementById("barragespachalikCheckbox").addEventListener("change", function(event) {
      barragespachaliklayer.visible = event.target.checked;
     });
     // Gérer la visibilité des couches avec les cases à cocher
     document.getElementById("").addEventListener("change", function(event) {
      barragecaidatlayer.visible = event.target.checked;
     });

    // Gérer la visibilité des couches avec les cases à cocher
    document.getElementById("douarsLayerCheckbox").addEventListener("change", function(event) {
      douarslayer.visible = event.target.checked;
    });
  
    document.getElementById("caidatsLayerCheckbox").addEventListener("change", function(event) {
      caidatslayer.visible = event.target.checked;
    });
  
    document.getElementById("cerclesLayerCheckbox").addEventListener("change", function(event) {
      cercleslayer.visible = event.target.checked;
    });
    document.getElementById("pachalikLayerCheckbox").addEventListener("change", function(event) {
      pachalikslayer.visible = event.target.checked;
    });
  
    document.getElementById("provincesLayerCheckbox").addEventListener("change", function(event) {
      provincelayer.visible = event.target.checked;
    });
  
    document.getElementById("regionsLayerCheckbox").addEventListener("change", function(event) {
      regionslayer.visible = event.target.checked;
    });

    // Gérer la visibilité des couches avec les cases à cocher
  document.getElementById("autoroutelayerChecKbox").addEventListener("change", function(event) {
    autoroutelayer.visible = event. target.checked;
  });
     // Gérer la visibilité des couches avec les cases à cocher
     document.getElementById("rnationallayerCheckbox").addEventListener("change", function(event) {
      rnationallayer.visible = event. target.checked;
    });
     // Gérer la visibilité des couches avec les cases à cocher
     document.getElementById("rregionallayerCheckbox").addEventListener("change", function(event) {
      rregionallayer.visible = event. target.checked;
    });
     // Gérer la visibilité des couches avec les cases à cocher
     document.getElementById("provincialayerCheckbox").addEventListener("change", function(event) {
      provincialayer.visible = event. target.checked;
    });

    const caidatSqlQuery = [
      "--Choisir la requête SQL--",
      "Pop_Caidat > 30000",
      "Nb_Commun = 1",
      "Nb_Commun = 2",
      "Nb_Commun = 3",
      "Nb_Commun = 4",
      "Nb_Commun = 5",
      "Nb_Commun = 6",
      "Sup_Caidat > 500"
    ];
    
let whereClause = caidatSqlQuery[0];
const select = document.createElement("select");

caidatSqlQuery.forEach(function (Query) {
  let option = document.createElement("option");
  option.innerHTML = Query;
  option.value = Query;
  select.appendChild(option);
});

view.ui.add(select, "top-right");

// Fonction pour exécuter la requête sur le FeatureLayer
function queryFeatureLayer(extent) {
  // Effacer les graphiques existants avant d'exécuter une nouvelle requête
  view.graphics.removeAll();
  
  const parcelQuery = {
    where: whereClause, // Clause WHERE
    geometry: extent, // Géométrie pour la requête spatiale
    outFields: ["NOM_CAIDAT","PROVINCE_C","Pop_Caidat", "Nb_Commun", "Sup_Caidat"], // Champs à retourner
    returnGeometry: true // Retourner la géométrie des entités
  };

  caidatslayer.queryFeatures(parcelQuery).then((results) => {
    console.log("Feature count: " + results.features.length);
    
    if (results.features.length > 0) {
      displayResults(results); // Afficher les résultats s'il y en a
    }
  }).catch((error) => {
    console.log(error.message); // Affichage de l'erreur
  });
}

// Gestion de l'événement de sélection pour mettre à jour la clause WHERE et relancer la requête
select.addEventListener('change', (event) => {
  whereClause = event.target.value; // Mise à jour de la clause WHERE
  queryFeatureLayer(view.extent); // Exécuter la requête avec l'étendue actuelle
});

// Fonction pour afficher les résultats sur la carte
function displayResults(results) {
  const symbol = {
    type: "simple-fill",
    color: [0, 0, 255, 0.5], // Remplissage bleu semi-transparent
    outline: {
      color: [0, 0, 255, 1], // Contour rouge opaque
      width: 2 // Épaisseur du contour
    }
  };

  const popupTemplate = {
    title : "Caidats : {NOM_CAIDAT}",

    content: "  Nom : {NOM_CAIDAT} <br> Province : {PROVINCE_C} <br> Population : {Pop_Caidat} <br> Nombre Communes : {Nb_Commun} <br> Superficie : {Sup_Caidat}Km²" 
  };

  // Appliquer les symboles et popupTemplate à chaque entité retournée
  const featuresWithSymbol = results.features.map((feature) => {
    feature.symbol = symbol;
    feature.popupTemplate = popupTemplate;
    return feature;
  });

  view.popup.close(); // Fermer les popups précédents
  view.graphics.removeAll(); // Supprimer les graphiques précédents
  view.graphics.addMany(featuresWithSymbol); // Ajouter les nouveaux graphiques
}

});

