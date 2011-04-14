<div id="block-<?php print $block->module .'-'. $block->delta ?>" class="section <?php print $block_classes; ?>">
  <?php if (!empty($block->subject)): ?>
    <h3 class="title block-title"><?php print $block->subject; ?></h3>
  <?php endif; ?>

  <?php print $block->content; ?>

  <?php print $edit_links; ?>
</div>
