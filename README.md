This project shows a map of Bern, Switzerland with a list of interesting locations.

Getting Started
===============

The project uses [jQuery](http://jquery.com/) and [Knockout](http://knockoutjs.com/). These dependencies are not included
in this repository. Instead they are referenced using the Cloudflare CDN. A local web server is included for convenience.
To run it, you need to have [Node.js](http://nodejs.org/) and [Grunt](http://gruntjs.com/) installed on your local 
machine. Please see their homepages for instructions.

If you have Node.js and Grunt on your local machine, you'll have to run `npm install` in the project's root directory
to install the Node modules needed by the build. Once all dependencies have been downloaded, simply run `grunt prod` in 
the project's root directory to run a local web server on port 8080, serving a minified version of the project.

Alternatively you can use `grunt dev` to have the web server use the unmodified source files.

In both cases you can access the application using http://localhost:8080/index.html
