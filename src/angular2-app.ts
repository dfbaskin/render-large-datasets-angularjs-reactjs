/// <reference path="../typings/angular2/angular2.d.ts" />

import 'zone/zone.js';
import 'reflect-metadata/Reflect.js';
import 'es6-shim/es6-shim.js';

import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'my-app'
})
@View({
    template: '<h1>Hello {{ name }}</h1>'
})
class MyAppComponent {
    name: string;

    constructor() {
        this.name = 'Alice';
    }
}

bootstrap(MyAppComponent);

