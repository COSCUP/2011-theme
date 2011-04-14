<?php

// Auto-rebuild the theme registry during theme development.
if (theme_get_setting('basic_rebuild_registry')) {
  drupal_rebuild_theme_registry();
}

/*
 *	This function create the EDIT LINKS for blocks and menus blocks.
 *	When overing a block (except in IE6), some links appear to edit
 *	or configure the block. You can then edit the block, and once you are
 *	done, brought back to the first page.
 *
 * @param $vars
 *   A sequential array of variables to pass to the theme template.
 * @param $hook
 *   The name of the theme function being called ("block" in this case.)
 */ 

function coscup2011_preprocess_block(&$vars, $hook) {

    $block = $vars['block'];

    // special block classes
    $classes = array('block');
    $classes[] = coscup2011_id_safe('block-' . $vars['block']->module);
    $classes[] = coscup2011_id_safe('block-' . $vars['block']->region);
    $classes[] = coscup2011_id_safe('block-id-' . $vars['block']->bid);
    $classes[] = 'clearfix';
    
    // support for Skinr Module
    if (module_exists('skinr')) {
      $classes[] = $vars['skinr'];
    }
    
    $vars['block_classes'] = implode(' ', $classes); // Concatenate with spaces

    if (theme_get_setting('coscup2011_block_editing') && user_access('administer blocks')) {
        // Display 'edit block' for custom blocks.
        if ($block->module == 'block') {
          $edit_links[] = l('<span>' . t('edit block') . '</span>', 'admin/build/block/configure/' . $block->module . '/' . $block->delta,
            array(
              'attributes' => array(
                'title' => t('edit the content of this block'),
                'class' => 'block-edit',
              ),
              'query' => drupal_get_destination(),
              'html' => TRUE,
            )
          );
        }
        // Display 'configure' for other blocks.
        else {
          $edit_links[] = l('<span>' . t('configure') . '</span>', 'admin/build/block/configure/' . $block->module . '/' . $block->delta,
            array(
              'attributes' => array(
                'title' => t('configure this block'),
                'class' => 'block-config',
              ),
              'query' => drupal_get_destination(),
              'html' => TRUE,
            )
          );
        }
        // Display 'edit menu' for Menu blocks.
        if (($block->module == 'menu' || ($block->module == 'user' && $block->delta == 1)) && user_access('administer menu')) {
          $menu_name = ($block->module == 'user') ? 'navigation' : $block->delta;
          $edit_links[] = l('<span>' . t('edit menu') . '</span>', 'admin/build/menu-customize/' . $menu_name,
            array(
              'attributes' => array(
                'title' => t('edit the menu that defines this block'),
                'class' => 'block-edit-menu',
              ),
              'query' => drupal_get_destination(),
              'html' => TRUE,
            )
          );
        }
        // Display 'edit menu' for Menu block blocks.
        elseif ($block->module == 'menu_block' && user_access('administer menu')) {
          list($menu_name, ) = split(':', variable_get("menu_block_{$block->delta}_parent", 'navigation:0'));
          $edit_links[] = l('<span>' . t('edit menu') . '</span>', 'admin/build/menu-customize/' . $menu_name,
            array(
              'attributes' => array(
                'title' => t('edit the menu that defines this block'),
                'class' => 'block-edit-menu',
              ),
              'query' => drupal_get_destination(),
              'html' => TRUE,
            )
          );
        }
        $vars['edit_links_array'] = $edit_links;
        $vars['edit_links'] = '<div class="edit">' . implode(' ', $edit_links) . '</div>';
      }
}





//	Custom classes for menu item

function coscup2011_menu_item($link, $has_children, $menu = '',  $in_active_trail = FALSE, $extra_class = NULL ) {
	
	$class = ($menu ? 'expanded' : ($has_children ? 'collapsed' : 'leaf'));

	if (!empty($extra_class))
	$class .= ' '. $extra_class;

	if ($in_active_trail)
	$class .= ' active-trail';

	#New line added to get unique classes for each menu item

	$css_class = coscup2011_id_safe(str_replace(' ', '_', strip_tags($link)));

	return '<li class="'
		. $class . ' ' 
		. $css_class . '">' 
		. $link . $menu 
		."</li>\n";

}

/*	
 *	Converts a string to a suitable html ID attribute.
 *	
 *	 http://www.w3.org/TR/html4/struct/global.html#h-7.5.2 specifies what makes a
 *	 valid ID attribute in HTML. This function:
 *	
 *	- Ensure an ID starts with an alpha character by optionally adding an 'n'.
 *	- Replaces any character except A-Z, numbers, and underscores with dashes.
 *	- Converts entire string to lowercase.
 *	
 *	@param $string
 *	  The string
 *	@return
 *	  The converted string
 */	

function coscup2011_id_safe($string) {

	$string = strtolower(preg_replace('/[^a-zA-Z0-9_-]+/', '-', $string));
	
	if (!ctype_lower($string{0}))
	$string = 'id'. $string;

	return $string;

}
