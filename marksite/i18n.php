<?php 
class i18n
{
	var $lang = 'zh-TW';
	var $l10n_sets = array
	(
	'en' => array(
		 '首頁' => 'Home',
		 '台灣台北' => 'Taipei, Taiwan',
		 '加到 Google 日曆' => 'Add to Google Calendar',
		 'Facebook 粉絲團' => 'Facebook',
		 '小啄在 Twitter' => 'Twitter',
		 '小啄在噗浪' => 'Plurk',
		 '部落格 RSS Feed' => 'Blog RSS Feed',
		 '2011 年 8 月 20 - 21 日' => 'August 20th - 21st, 2011',
		 'HOME_URI_APPENDS' => 'en/',
		 'CONTACT_URI_APPENDS' => 'en/contact/'
		 ),
	'zh-CN' => array(
		 '首頁' => '首页',
		 '開源人年會' => '开源人年会',
		 '台灣台北' => '台湾台北',
		 '加到 Google 日曆' => '加到 Google 日历',
		 'Facebook 粉絲團' => 'Facebook 粉丝团',
		 '小啄在 Twitter' => '小啄在 Twitter',
		 '小啄在噗浪' => '小啄在噗浪',
		 '部落格 RSS Feed' => '部落格 RSS Feed',
		 'HOME_URI_APPENDS' => 'zh-cn/',
		 'CONTACT_URI_APPENDS' => 'zh-cn/contact/'
		 ),
	'zh-TW' => array(
		 'HOME_URI_APPENDS' => 'zh-tw/',
		 'CONTACT_URI_APPENDS' => 'zh-tw/contact/'
		 )
	);

	function _($s)
	{

		if ( isset($this->l10n_sets[$this->lang]) && isset($this->l10n_sets[$this->lang][$s]) )
		{
			return $this->l10n_sets[$this->lang][$s];
		}
		return $s;
	}
}
