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
        this.categories =  model.categories.map(function (category) {
            return new CategoryViewModel(category);
        });
        this.locations = model.locations.map(function (location) {
            return new LocationViewModel(location, self.findCategory(location.category));
        });
    }

    ViewModel.prototype.findCategory = function(name) {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name === name) {
                return this.categories[i];
            }
        }
        throw new Error("No such category: " + name);
    };

    var viewModel = new ViewModel(model);
    ko.applyBindings(viewModel);
})();