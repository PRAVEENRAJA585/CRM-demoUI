*************************************
Thank you for purchasing our template
*************************************

FILES
-----
Kyros-React-vx.x.x-demo.zip     : Kyros React Template Demo Project
Kyros-React-x.x.x-skeleton.zip  : Kyros React Template Skeleton Project
PSDs.zip                       : Layered and well organized psds of the project design

UPDATING THE TEMPLATE
---------------------
You can use the GitHub repository to easily update the template.
To access the repository visit: http://support.withinpixels.com/github/


DOCUMENTATION
-------------
You can access the online documentation at
http://react-material.kyrostheme.com/documentation/getting-started/introduction


SUPPORT REQUESTS
----------------
For your support requests, please visit http://support.withinpixels.com
Your support requests will be queued and can take up to 48 hours in
working days before answered.


HEROKU NOTES
----------------
You may encounter some issues if you want to deploy kyros-react to heroku, here is the solution:

// We need to use the mars/create-react-app buildpack:
heroku buildpacks:set mars/create-react-app

// the next build will be created with this official pack.

// We need to install devDependencies:
heroku config:set NPM_CONFIG_PRODUCTION=false
push skeleton branch to master of heroku
git push heroku skeleton:master
