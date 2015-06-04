function Location(name, category, coords, wikipediaPageId) {
    this.name = name;
    /*
    most locations only belong to one category, but some use more than one
    to make it easier for the caller, the categories can be passed as a simple string
    if the location only uses a single category.
    */
    this.category = category;
    this.coords = coords;
    this.wikipediaPageId = wikipediaPageId;
}

Location.prototype.hasCategory = function(category) {
    return this.category === category;
};

var model = {
    locations: [
        new Location('Stade de Suisse',     'Sport',        {lat: 46.963092, lng: 7.465038}),
        new Location('PostFinance-Arena',   'Sport',        {lat: 46.958684, lng: 7.468858}),
        new Location('Nationales Pferdezentrum','Sport',    {lat: 46.955198, lng: 7.464545}),
        new Location('Freibad Marzili',     'Sport',        {lat: 46.942509, lng: 7.443806}),
        new Location('Tierpark Dählhölzli', 'Tourist Attraction',      {lat: 46.933942, lng: 7.448151}),
        new Location('Schwellenmätteli',    'Tourist Attraction',      {lat: 46.944740, lng: 7.450705}),
        new Location('Zentrum Paul Klee',   'Tourist Attraction',      {lat: 46.948827, lng: 7.474276}),
        new Location('Kleine Schanze',      'Park',         {lat: 46.945582, lng: 7.440319}),
        new Location('Botanischer Garten',  'Park',         {lat: 46.952965, lng: 7.444632}),
        new Location('Rosengarten',         'Park',         {lat: 46.951390, lng: 7.460897}),
        new Location('Bärengraben',         'Park',         {lat: 46.948153, lng: 7.459974}, '8962235'),
        new Location('Münster',             'Building',     {lat: 46.947069, lng: 7.451220}),
        new Location('Nydeggkirche',        'Building',     {lat: 46.948841, lng: 7.457228}),
        new Location('Zytglogge',           'Building',     {lat: 46.947955, lng: 7.447668}, '1061330'),
        new Location('Bundeshaus',          'Building',     {lat: 46.946424, lng: 7.444396})
    ],
    categories: []
};

model.locations.forEach(function (location) {
    if (model.categories.indexOf(location.category) === -1) {
        model.categories.push(location.category);
    }
});

model.categories.sort();