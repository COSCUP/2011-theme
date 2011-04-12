<?php

header('Content-Type: text/plain');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	print <<<EOL
Error: Use POST request to update.
For testing, use 'curl -d dummy=data'.
EOL;
	exit;
}

if (!file_exists('./config.inc.php')) {
	print 'Error: config.inc.php not found.';
	exit;
}

require('./config.inc.php');

system('svn update ' . $root . '; svn info ' . $root . ';');

