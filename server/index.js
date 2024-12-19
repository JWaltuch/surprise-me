import path from 'path'; // Import path module for handling file and directory paths
import express from 'express'; // Import express for setting up the server
import morgan from 'morgan'; // Import morgan for HTTP request logging
import compression from 'compression'; // Import compression to optimize response sizes

const PORT = process.env.PORT || 3000; // Set up the port from environment variables or default to 3000
const app = express(); // Create an instance of the Express app

if (process.env.NODE_ENV !== 'production') {
  import('../secrets.js'); // Dynamic import for secrets only in non-production
}

/**
 * Create and configure the app with necessary middleware and routes.
 */
const createApp = async () => {
  // logging middleware
  app.use(morgan('dev')); // Logs requests to the console in 'dev' format

  // body parsing middleware
  app.use(express.json()); // Parse JSON bodies in requests
  app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies (e.g., form submissions)

  // compression middleware
  app.use(compression()); // Compress all HTTP responses for efficiency

  // Dynamically import auth and api routes and use them
  const authRoutes = await import('./auth/index.js');
  app.use('/auth', authRoutes.default); // Dynamically loaded middleware
  const apiRoutes = await import('./api/index.js');
  app.use('/api', apiRoutes.default); // Dynamically loaded middleware

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from the 'public' directory

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err); // Send the error to the error handling middleware
    } else {
      next(); // Pass control to the next middleware
    }
  });

  // sends index.html for any route that doesn't match
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html')); // Return the index.html for any route
  });

  // error handling middleware
  app.use((err, req, res, next) => {
    console.error(err); // Log the error to the console
    console.error(err.stack); // Log the error stack trace
    res.status(err.status || 500).send(err.message || 'Internal server error.'); // Send error message to the client
  });
};

/**
 * Start listening on the specified port.
 */
const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

/**
 * Boot the app by creating the app and starting the server.
 */
async function bootApp() {
  await createApp(); // Set up the app with middleware and routes
  await startListening(); // Start the server
}

/**
 * This evaluates as true when this file is run directly from the command line,
 * i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', etc).
 * It will evaluate false when this module is required by another module (e.g., for testing).
 */
if (import.meta.url === process.argv[1]) {
  bootApp(); // Run the app if the file is executed directly
} else {
  createApp(); // Only create the app (without starting the server) if it's imported
}

// Export the app to be used elsewhere in the project (e.g., for testing)
export default app;
