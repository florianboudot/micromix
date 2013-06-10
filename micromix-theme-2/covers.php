<?php
/*
Template Name: covers
*/
?>
<?php get_header(); ?>

<?php
$debut = 0; //The first article to be displayed
?>
<?php while(have_posts()) : the_post(); ?>
    <h2><?php the_title(); ?></h2>
    <style>
        .all-covers { 
            overflow:hidden; 
        }
        .all-covers li { 
            float:left; 
            width:150px; 
            height:150px; 
            margin:0 16px 10px 0; 
        }
        .all-covers li img {
            width:150px;
        }
    </style>
    <ul class="all-covers">
        <?php
        $myposts = get_posts('numberposts=-1&offset=$debut');
        foreach($myposts as $post) : 
            $postMetaImage = get_post_meta($post->ID, 'imagePost', true);?>
            
            <li>
                <a href="<?php the_permalink(); ?>"><img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>"></a>
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </li><?php 
            
        endforeach; ?>
    </ul>
<?php endwhile; ?>

<?php get_sidebar(); ?>