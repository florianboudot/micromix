#micromix theme

This is the custom Wordpress theme for www.micromix.fr

##installation steps

* download Wordpress, install it and clone this repo into a folder you create under `themes/` such as  `/wp-content/themes/micromix-theme-1`
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
* if you need to regenerate all thumbnails jpg files (small, medium, large), go to `functions.php` and uncomment the function `regenerate_all_attachment_sizes`
* change this line in media.php to force resize of elements at same size of original
	if ( $new_w > $orig_w && $new_h > $orig_h )
		return false;
* modify your `.htacccess` adding this line `RewriteRule \.(mp3)$ /wp-content/themes/micromix-theme-1/mp3.php?file=%{REQUEST_URI}`

##Supported browsers

**100% compatible:**
* Chrome lastest
* Firefox lastest
* IE 11 and above
* Safari

**At least functional and good looking (no aminations is ok):**
* IE 10
* IE 9

**At least functionnal (skin broken is ok, no animation is ok)!**
* IE 8

##Node / Grunt

* install nodejs on your dev environment
* install grunt via: `npm install -g grunt-cli`
* run grunt tasks:
  * `grunt prod` to execute all task before update the production website
  * `grunt watch` to work on local env
  * `grunt css` to execute only sass  
  * `grunt js` to execute only JS compact  

## .htaccess file


    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.php$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.php [L]
        RewriteRule \.(mp3)$ /wp-content/themes/micromix-theme-1/mp3.php?file=%{REQUEST_URI}
    </IfModule>


##phpstorm commit message format

Open "tasks" dialog with alt + shift + N and click on the wrench (server settings)
Configure your commit message with :
`{id} #{number} {summary}`

##update (if env already exist) 

go to wp-admin/post-new.php?post_type=page
name a new page "feedback"
check "discussion" in "screen options"
and checks that the "discusion" checkboxes are checked in discussion field
then clic "publish"

##Authors

kazes, acidre, yvg, romuleald, stecov
