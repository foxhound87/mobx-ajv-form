import $flat from './data/_.flat';
import $nested from './data/_.nested';

import flat from './computed/_.flat';
import nested from './computed/_.nested';

flat.isValid($flat);
flat.hasError($flat);
flat.isDirty($flat);
flat.isEmpty($flat);
flat.isPristine($flat);
flat.isPristine($flat);

nested.isValid($nested);
