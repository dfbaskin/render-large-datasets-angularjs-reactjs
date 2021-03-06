var benchpress = require('benchpress');

var runner = new benchpress.Runner([
    benchpress.SeleniumWebDriverAdapter.PROTRACTOR_BINDINGS,
    benchpress.Validator.bindTo(benchpress.RegressionSlopeValidator),
    benchpress.bind(benchpress.RegressionSlopeValidator.SAMPLE_SIZE).toValue(20),
    benchpress.bind(benchpress.RegressionSlopeValidator.METRIC).toValue('scriptTime'),
    benchpress.bind(benchpress.Options.FORCE_GC).toValue(true)
]);

describe('grid', function() {

    it('mount', function(done) {

        browser.ignoreSynchronization = false;
        browser.get('http://localhost:5001/angular1.html');

        runner.sample({
            id: 'angular-1-mount-grid',
            prepare: function () {
                return $('#unmount-grid').click();
            },
            execute: function() {
                return $('#remount-grid').click();
            }
        }).then(done, done.fail);
    });
});
