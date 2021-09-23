/**
* index.native.ts
* Copyright: Microsoft 2018
*
* Native implementation of "images" module.
*/

import { ImageSourceBase } from './Images';

// The React Native bundler handles resource paths at build time, so they need
// to be specified as full string literals (as opposed to being constructed
// programmatically in a helper method).

// We use accessors and "require" calls to defer loading of these images into
// memory until they are actually used. If we were to require them upfront,
// app launch times would increase substantially.
class ImageSource implements ImageSourceBase {
    get todoLogo() { return require('../../../images/todo-logo.png'); }
    get todoSmall() { return require('../../../images/todo-small.png'); }
    get caru1() { return require('../../../images/caru1.png'); }
    get caru2() { return require('../../../images/caru2.png'); }
    get caru3() { return require('../../../images/caru3.png'); }
    get logo() { return require('../../../images/logo.png'); }
    get elipse() { return require('../../../images/elipse.png'); }
    get background() { return require('../../../images/background.png'); }
    get logo2() { return require('../../../images/logo2.png'); }
    get stripe() { return require('../../../images/stripe.png'); }
}

export default new ImageSource();
