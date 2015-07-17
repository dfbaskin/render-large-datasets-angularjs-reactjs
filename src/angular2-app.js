/// <reference path="../typings/angular2/angular2.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('zone/zone.js');
require('reflect-metadata/Reflect.js');
require('es6-shim/es6-shim.js');
var angular2_1 = require('angular2/angular2');
var MyAppComponent = (function () {
    function MyAppComponent() {
        // We'll start out with a grid with 10,000 items.
        this.grid = this.generateGrid(1000, 10);
        // Calculate the number of data-points that may have filtering.
        this.dataPoints = (this.grid.length * this.grid[0].items.length);
        // I hold the form data for use with ngModel.
        this.form = {
            filter: ""
        };
        // I hold the number of items that are visible based on filtering.
        this.visibleCount = 0;
        // As the user interacts with filter, we need to update the view-model
        // to reflect the matching items.
        //$scope.$watch( "vm.form.filter", handleFilterChange );
    }
    // I repopulate the grid with data. This will help separate processing
    // performance characteristics from page-load processing.
    MyAppComponent.prototype.remountGrid = function () {
        this.grid = this.generateGrid(1000, 10);
        this.dataPoints = (this.grid.length * this.grid[0].items.length);
        this.visibleCount = 0;
        this.form.filter = "";
    };
    // I clear the grid of data. This will help separate processing
    // performance characteristics from page-load processing.
    MyAppComponent.prototype.unmountGrid = function () {
        this.grid = [];
        this.dataPoints = 0;
        this.visibleCount = 0;
        this.form.filter = "";
    };
    // I update the visibility of the items when the filter is updated.
    MyAppComponent.prototype.handleFilterChange = function (newValue) {
        if (this.form.filter === newValue) {
            return;
        }
        this.form.filter = newValue;
        // Reset the visible count. As we iterate of the items checking
        // for visibility, we can increment this count as necessary.
        this.visibleCount = 0;
        for (var r = 0, rowCount = this.grid.length; r < rowCount; r++) {
            var row = this.grid[r];
            for (var c = 0, columnCount = row.items.length; c < columnCount; c++) {
                var item = row.items[c];
                // The item is hidden if the given filter text cannot be
                // found in the value of the item.
                item.isHiddenByFilter = (newValue && (item.value.indexOf(newValue) === -1));
                // If the item isn't hidden, track it as part of the visible
                // set of data.
                if (!item.isHiddenByFilter) {
                    this.visibleCount++;
                }
            }
        }
    };
    MyAppComponent.prototype.generateGrid = function (rowCount, columnCount) {
        var valuePoints = [
            "Daenerys", "Jon", "Sansa", "Arya", "Stannis", "Gregor", "Tyrion",
            "Theon", "Joffrey", "Ramsay", "Cersei", "Bran", "Margaery",
            "Melisandre", "Daario", "Jamie", "Eddard", "Myrcella", "Robb",
            "Jorah", "Petyr", "Tommen", "Sandor", "Oberyn", "Drogo", "Ygritte"
        ];
        var valueIndex = 0;
        var grid = [];
        for (var r = 0; r < rowCount; r++) {
            var row = {
                id: r,
                items: []
            };
            for (var c = 0; c < columnCount; c++) {
                row.items.push({
                    id: (r + "-" + c),
                    value: valuePoints[valueIndex],
                    isHiddenByFilter: false
                });
                if (++valueIndex >= valuePoints.length) {
                    valueIndex = 0;
                }
            }
            grid.push(row);
        }
        return grid;
    };
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor, angular2_1.NgIf, angular2_1.formDirectives, angular2_1.CSSClass],
            templateUrl: 'angular2-grid.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
