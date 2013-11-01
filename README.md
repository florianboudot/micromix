micromix
========

Theme Wordpress

installation steps :

1/ download Wordpress, install it and clone this repo into your /wp-content/themes/ so you will have /wp-content/themes/micromix-theme-1

2/ configure your apache with
Listen *:80

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

3/ configure your host file with :
127.0.0.1 micromix.localhost

4/ set your /wp-config.php wordpress file with your local database login

5/ import the micromix database (ask the owner)

6/ import the images and mp3 files in your /upload/ folder (ask the owner)

7/ if you need to regenerate all thumbnails jpg files (small, medium, large), got to functions.php

8/ modify your .htacccess adding this line :
RewriteRule \.(mp3)$ /wp-content/themes/micromix-theme-1/mp3.php?file=%{REQUEST_URI}

