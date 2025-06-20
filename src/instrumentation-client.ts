// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2c37c3634a140fceb53d28937e211113@o4509533045653504.ingest.us.sentry.io/4509533116956672",

  // Add optional integrations for additional features
  integrations: [
    // Only enable replay in production to avoid quota issues
    ...(process.env.NODE_ENV === 'production' ? [Sentry.replayIntegration()] : []),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Habilitado com DSN correto
  enabled: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;