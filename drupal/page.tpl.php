<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>"><head>

	<title><?php print $head_title; ?></title>

<?php 	print $head;
	print $assets;
	print $styles;
	print $scripts; ?>
<link type="text/css" rel="stylesheet" media="all" href="http://coscup.org/2011-theme/assets/style.css" />
</head><body class="<?php print $body_classes; ?>">










<div id="header" class="header">

<?php	if (!empty($primary_links) || $navigation_bar) { ?>
	
	<div class="nav">

<?php print theme('links', $primary_links, array('id' => 'primary', 'class' => 'links main-menu'));?>
<?php if ($navigation_bar) print $navigation_bar; ?>

	</div>
	
<?php	} ?>

<?php	if (!empty($logo)) { ?>
	
		<a id="coscupLogotype" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><img src="<?php print $logo; ?>" alt="<?php print $site_name; ?>"></a>
		
<?php	} ?>

<?php	if (!empty($site_name)) { ?>
	
		<h1><a href="<?php print $front_page ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a></h1>
		
<?php	} ?>

<?php	if (!empty($site_slogan)) { ?>
	
		<p><?php print $site_slogan; ?></p>
		
<?php	} ?>

	<?php print $header_block; ?>

</div>









	
<div class="section">

	<div class="article">

<?php	if ($content_top) { ?>
		
		<div class="header"><?php print $content_top; ?></div>
		
<?php	}  ?>
					



<?php	if ($tabs) { ?>
				
		<div class="nav tabs"><?php print $tabs; ?></div>
		
<?php	} ?>
			




<?php	print $content; ?>
			




<?php	if ($content_bottom) { ?>
			
		<div class="footer"><?php print $content_bottom; ?></div>
			
<?php 	} ?>

	</div>
	




<?php	if ($sidebar) { ?>

	<div class="aside">

<?php	print $sidebar; ?>

	</div>

<?php	} ?>

</div>




















<div class="footer">

	<div class="section wrap">

		<span><?php print $footer_message; ?></span>



<?php print $footer_block; ?>
	
	</div>

</div>










<?php print $closure; ?></body></html>
