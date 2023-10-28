import { registerMiddlewares } from 'redux-actions-assertions';
import {
	buildInitialStoreState,
	registerInitialStoreState
} from 'redux-actions-assertions';

import axMiddleware from '../src/js/util/axMiddleware';
import reducer from '../src/js/reducer';
import { registerAssertions } from 'redux-actions-assertions/jest';

registerMiddlewares([axMiddleware]);
registerInitialStoreState(buildInitialStoreState(reducer));

beforeEach(registerAssertions);
