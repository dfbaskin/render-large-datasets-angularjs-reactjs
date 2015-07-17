/// <reference path="../typings/angular2/angular2.d.ts" />

import 'zone/zone.js';
import 'reflect-metadata/Reflect.js';
import 'es6-shim/es6-shim.js';

import {
    Component,
    View,
    NgFor,
    NgIf,
    bootstrap
} from 'angular2/angular2';

@Component({
    selector: 'my-app'
})
@View({
    directives: [NgFor, NgIf],
    templateUrl: 'angular2-grid.html'
})
class MyAppComponent {

    grid;
    dataPoints;
    form;
    visibleCount;

    constructor() {

        // We'll start out with a grid with 10,000 items.
        this.grid = this.generateGrid( 1000, 10 );

        // Calculate the number of data-points that may have filtering.
        this.dataPoints = ( this.grid.length * this.grid[ 0 ].items.length );

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
    private remountGrid() {

        this.grid = this.generateGrid( 1000, 10 );
        this.dataPoints = ( this.grid.length * this.grid[ 0 ].items.length );

        this.visibleCount = 0;
        this.form.filter = "";
    }

    // I clear the grid of data. This will help separate processing
    // performance characteristics from page-load processing.
    private unmountGrid() {

        this.grid = [];
        this.dataPoints = 0;

        this.visibleCount = 0;
        this.form.filter = "";
    }

    private generateGrid( rowCount, columnCount ) {

        var valuePoints = [
            "Daenerys", "Jon", "Sansa", "Arya", "Stannis", "Gregor", "Tyrion",
            "Theon", "Joffrey", "Ramsay", "Cersei", "Bran", "Margaery",
            "Melisandre", "Daario", "Jamie", "Eddard", "Myrcella", "Robb",
            "Jorah", "Petyr", "Tommen", "Sandor", "Oberyn", "Drogo", "Ygritte"
        ];

        var valueIndex = 0;

        var grid = [];

        for ( var r = 0 ; r < rowCount ; r++ ) {

            var row = {
                id: r,
                items: []
            };

            for ( var c = 0 ; c < columnCount ; c++ ) {

                row.items.push({
                    id: ( r + "-" + c ),
                    value: valuePoints[ valueIndex ],
                    isHiddenByFilter: false
                });

                if ( ++valueIndex >= valuePoints.length ) {

                    valueIndex = 0;

                }

            }

            grid.push( row );

        }

        return grid;
    }
}

bootstrap(MyAppComponent);

