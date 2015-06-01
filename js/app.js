(function () {
    var map = new google.maps.Map(document.getElementById("map"), {
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
        this.visible = ko.observable(true);
        if (location.coords) {
            this.marker = new google.maps.Marker({
                position: location.coords,
                title: location.name
            });
            this.marker.setMap(map);
        }
        categoryViewModel.visible.subscribe(function (newValue) {
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
            throw new Error("No such category: " + name);
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


        self.select = function(location) {
            self.selectedLocation.name(location.name).category(location.category);
        };
    }

    var viewModel = new ViewModel(model);
    ko.applyBindings(viewModel);
})();