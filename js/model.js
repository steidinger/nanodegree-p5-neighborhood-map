(function (global) {
    'use strict';

    function Location(name, category, coords, wikipediaPageId) {
        this.name = name;
        this.category = category;
        this.coords = coords;
        this.wikipediaPageId = wikipediaPageId;
    }

    var model = {
        locations: [
            new Location('Stade de Suisse',     'Sports',       {lat: 46.963092, lng: 7.465038}, '2546696'),
            new Location('PostFinance-Arena',   'Sports',       {lat: 46.958684, lng: 7.468858}, '2478455'),
            new Location('Tierpark Dählhölzli', 'Park',         {lat: 46.933942, lng: 7.448151}, '24800127'),
            new Location('Zentrum Paul Klee',   'Museum',       {lat: 46.948827, lng: 7.474276}, '9999240'),
            new Location('Bärengraben',         'Park',         {lat: 46.948153, lng: 7.459974}, '8962235'),
            new Location('Kindlifresserbrunnen','Fountain',     {lat: 46.948402, lng: 7.447486}, '16266670'),
            new Location('Zähringerbrunnen',    'Fountain',     {lat: 46.947989, lng: 7.449168}, '28907068'),
            new Location('Historisches Museum', 'Museum',       {lat: 46.943168, lng: 7.449342}, '16540953'),
            new Location('Einsteinhaus',        'Museum',       {lat: 46.947789, lng: 7.449782}, '23686683'),
            new Location('Münster',             'Museum',       {lat: 46.947069, lng: 7.451220}, '3587345'),
            new Location('Nydeggkirche',        'Church',       {lat: 46.948841, lng: 7.457228}, '26309496'),
            new Location('Paulskirche',         'Church',       {lat: 46.952947, lng: 7.430267}, '28697255'),
            new Location('Heiliggeistkirche',   'Church',       {lat: 46.947841, lng: 7.440737}, '26034634'),
            new Location('Zytglogge',           'Building',     {lat: 46.947955, lng: 7.447668}, '1061330'),
            new Location('Käfigturm',           'Building',     {lat: 46.948144, lng: 7.444117}, '32999108'),
            new Location('Bundeshaus',          'Building',     {lat: 46.946424, lng: 7.444396}, '2506411')
        ],
        categories: []
    };

    model.locations.forEach(function (location) {
        if (model.categories.indexOf(location.category) === -1) {
            model.categories.push(location.category);
        }
    });

    model.locations.sort(function compare(left, right) {
        return left.name.localeCompare(right.name, 'de');
    });

    model.categories.sort();
    global.model = model;

})(window);