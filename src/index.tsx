import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { SENTRY_DSN } from 'config/config.json';
import Root from 'Root';
import reportWebVitals from './reportWebVitals';

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();