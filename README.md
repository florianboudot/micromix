#micromix theme

This is the custom Wordpress theme for www.micromix.fr

##installation steps

* download Wordpress, install it and clone this repo into your `/wp-content/themes/` so you will have `/wp-content/themes/micromix-theme-1`

* configure your apache with `Listen *:80`

and

    <VirtualHost micromix.localhost:80>
        DocumentRoot "C:/sites/micromix/"
        ServerName micromix.localhost
        ServerAlias micromix.localhost
    </VirtualHost>

and

    <Directory "C:/sites">
        Options +Indexes +FollowSymLinks +ExecCGI
        AllowOverride AuthConfig FileInfo
        Order allow,deny
        Allow from all
    </Directory>

* configure your host file with `127.0.0.1 micromix.localhost`

* set your `/wp-config.php` wordpress file with your local database login

* import the micromix database (ask the owner)

* import the images and mp3 files in your `/upload/` folder (ask the owner)

* if you need to regenerate all thumbnails jpg files (small, medium, large), got to `functions.php` and uncomment the function `regenerate_all_attachment_sizes`

* modify your `.htacccess` adding this line `RewriteRule \.(mp3)$ /wp-content/themes/micromix-theme-1/mp3.php?file=%{REQUEST_URI}`

##Node / Grunt

* install nodejs on your dev environment

* install grunt via: npm install -g grunt-cli

* run grunt tasks

##phpstorm commit message format

Open "tasks" dialog with alt + shift + N and click on the wrench (server settings)
Configure your commit message with :
`{id} #{number} {summary}`

##update (if env already exist) 

go to wp-admin/post-new.php?post_type=page
name a new page "feedback"
check "discussion" in "screen options"
and checks that the "discusion" checkboxes are checked in discussion field
thenb clic "publish"

##Authors

kazes, acidre, yvg, romuleald, stecov
