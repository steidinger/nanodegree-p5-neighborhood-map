(function () {
    'use strict';

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.947069, lng: 7.451220},
        zoom: 14
    });

    function CategoryViewModel(name) {
        var self = this;
        self.name = name;
        self.visible = ko.observable(true);
    }

    function LocationViewModel(location, categoryViewModel) {
        var self = this;
        self.model = location;
        self.name = location.name;
        self.normalizedName = location.name.toLowerCase();
        self.description = ko.observable();
        self.matchesSearch = ko.observable(true);
        self.selected = ko.observable(false);
        self.selectedIcon = 'https://maps.gstatic.com/mapfiles/ms2/micons/red.png';
        self.normalIcon = 'https://maps.gstatic.com/mapfiles/ms2/micons/grey.png';
        self.visible = ko.computed(function () {
            return self.matchesSearch() && categoryViewModel.visible();
        });
        if (location.coords) {
            self.coords = new google.maps.LatLng(location.coords.lat, location.coords.lng);
            self.marker = new google.maps.Marker({
                position: self.coords,
                title: self.name,
                icon: self.normalIcon
            });
            self.marker.setMap(map);
        }
        self.visible.subscribe(function (newValue) {
            if (newValue) {
                self.marker.setMap(map);
            }
            else {
                self.marker.setMap(null);
            }
        });
        self.selected.subscribe(function (newValue) {
            var icon = newValue ? self.selectedIcon : self.normalIcon;
            self.marker.setIcon(icon);
            if (!map.getBounds().contains(self.coords)) {
                map.setCenter(self.coords);
            }
        });
    }

    function ViewModel(model) {
        var self = this;

        self.findCategory = function (name) {
            for (var i = 0; i < self.categories.length; i++) {
                if (self.categories[i].name === name) {
                    return self.categories[i];
                }
            }
            throw new Error('No such category: ' + name);
        };

        self.categories = model.categories.map(function (category) {
            return new CategoryViewModel(category);
        });
        
        self.locations = model.locations.map(function (location) {
            return new LocationViewModel(location, self.findCategory(location.category));
        });
        
        self.selectedLocation = {
            location: null,
            name: ko.observable(),
            category: ko.observable(),
            description: ko.observable()
        };

        self.searchTerm = ko.observable('');

        self.loadDescription = function (location) {
            var self = this;
            if (location.model.wikipediaPageId && !location.description()) {
                if (self.selectedLocation && self.selectedLocation.location && self.selectedLocation.location.model.wikipediaPageId === location.model.wikipediaPageId) {
                    self.selectedLocation.description('Loading Wikipedia article');
                }
                $.ajax({
                    method: 'GET',
                    cache: true,
                    url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&pageids=' + location.model.wikipediaPageId + '&callback=?',
                    dataType: 'jsonp',
                    timeout: 10 * 1000 // 10s
                })
                    .done(function (json) {
                        try {
                            var html = json.query.pages[location.model.wikipediaPageId].extract;
                            location.description(html);
                            if (self.selectedLocation && self.selectedLocation.location && self.selectedLocation.location.model.wikipediaPageId === location.model.wikipediaPageId) {
                                self.selectedLocation.description(html);
                            }
                        } catch (e) {
                            if (self.selectedLocation && self.selectedLocation.location && self.selectedLocation.location.model.wikipediaPageId === location.model.wikipediaPageId) {
                                self.selectedLocation.description('Could not retrieve Wikipedia article');
                            }
                        }
                    })
                    .fail(function () {
                        if (self.selectedLocation && self.selectedLocation.location && self.selectedLocation.location.model.wikipediaPageId === location.model.wikipediaPageId) {
                            self.selectedLocation.description('Could not retrieve Wikipedia article');
                        }
                    });
            }
            else {
                self.selectedLocation.description(location.description() || 'No description available');
            }
        };

        self.select = function(location) {
            if (self.selectedLocation.location) {
                self.selectedLocation.location.selected(false);
            }
            self.selectedLocation.name(location.name).category(location.category).description(location.description());
            self.selectedLocation.location = location;
            self.loadDescription(location);
            location.selected(true);
        };

        self.searchTerm.subscribe(function (term) {
            var normalizedTerm = term.toLowerCase();
            self.locations.forEach(function (location) {
                location.matchesSearch(location.normalizedName.indexOf(normalizedTerm) !== -1);
            });
        });

        self.offline = ko.observable(!navigator.onLine);
    }

    var viewModel = new ViewModel(model);

    viewModel.locations.forEach(function (location) {
        google.maps.event.addListener(location.marker, 'click', function () {
            viewModel.select(location);
        });
    });

    window.ononline = function () {
        viewModel.offline(false);
    };

    window.onoffline = function () {
        viewModel.offline(true);
    };

    ko.applyBindings(viewModel);
})();