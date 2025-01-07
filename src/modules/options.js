import { validateOptions } from '../validators/OptionsValidator.js';

export function registerOptionsMethods(p5asciify) {

    p5.prototype.setAsciiOptions = function (options) {
        validateOptions(this, options);
        p5asciify.setDefaultOptions(
            options.ascii,
            options.edge,
            options.common,
            options.gradient,
            options.custom,
            options.text
        );
    };

    p5.prototype.setAsciifyPostSetupFunction = function (postSetupFunction) {
        p5asciify.postSetupFunction = postSetupFunction;
    };

    p5.prototype.setAsciifyPostDrawFunction = function (postDrawFunction) {
        p5asciify.postDrawFunction = postDrawFunction;
    };
}