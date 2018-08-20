// FORMS
import $flat from './data/_.flat';
import $nested from './data/_.nested';
import $fixes from './data/_.fixes';

// TESTS
import flat from './promises/_.flat';
import nested from './promises/_.nested';
import fixes from './promises/_.fixes';

flat.validate($flat);
nested.validate($nested);
fixes.validate($fixes);
