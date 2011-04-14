<?php
// $Id: views-view-unformatted.tpl.php,v 1.6 2008/10/01 20:52:11 merlinofchaos Exp $
/**
 * @file views-view-unformatted.tpl.php
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h2><?php print $title; ?></h2>
  <dl class="sponsors_list <?php print $classes[$id]; ?>">
<?php foreach ($rows as $id => $row): ?>
    <?php print $row; ?>
<?php endforeach; ?>
  </dl>
<?php else: ?>
  <dl class="sponsors_list <?php print $classes[$id]; ?>">
<?php foreach ($rows as $id => $row): ?>
    <?php print $row; ?>
<?php endforeach; ?>
  </dl>
<?php endif; ?>
