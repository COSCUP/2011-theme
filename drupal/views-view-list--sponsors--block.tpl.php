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
  <h4><?php print $title; ?></h4>
<?php foreach ($rows as $id => $row): ?>
  <ul class="<?php print $classes[$id]; ?>">
    <li><?php print $row; ?></li>
  </ul>
<?php endforeach; ?>
<?php else: ?>
  <ul>
<?php foreach ($rows as $id => $row): ?>
    <li><?php print $row; ?></li>
<?php endforeach; ?>
  </ul>
<?php endif; ?>
