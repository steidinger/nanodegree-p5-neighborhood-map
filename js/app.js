(function () {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.9479222, lng: 7.4446084},
        zoom: 14
    });

    function CategoryViewModel(name) {
        this.name = name;
        this.visible = ko.observable(true)
    }

    function LocationViewModel(location, categoryViewModel) {
        var self = this;
        this.model = location;
        this.name = location.name;
        this.normalizedName = location.name.toLowerCase();
        this.matchesSearch = ko.observable(true);
        this.visible = ko.computed(function () {
            return self.matchesSearch() && categoryViewModel.visible();
        });
        if (location.coords) {
            this.marker = new google.maps.Marker({
                position: location.coords,
                title: location.name
            });
            this.marker.setMap(map);
        }
        self.visible.subscribe(function (newValue) {
            if (newValue) {
                self.marker.setMap(map);
            }
            else {
                self.marker.setMap(null);
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
            name: ko.observable(),
            category: ko.observable()
        };

        self.searchTerm = ko.observable('');
        
        self.select = function(location) {
            self.selectedLocation.name(location.name).category(location.category);
        };

        self.searchTerm.subscribe(function (term) {
            var normalizedTerm = term.toLowerCase();
            self.locations.forEach(function (location) {
                location.matchesSearch(location.normalizedName.indexOf(normalizedTerm) !== -1);
            });
        });
    }

    var viewModel = new ViewModel(model);
    ko.applyBindings(viewModel);
})();