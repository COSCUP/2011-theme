"use stricts";

jQuery(function ($) {

	var lang = ($('html').attr('lang') || 'zh-TW').toLowerCase();

	if ($('#nav.empty').length) {
		// Fetch site nav from remove JSON api
		$.getJSON(
			'http://coscup.org/2011-beta/api/menu/?callback=?',
			function (data) {
				var $nav = $('#nav').removeClass('empty');
				$nav.html(data[lang]);
			}
		);
	}
	
	if ($('#sidebar > .sponsors.empty').length) {
		// Fetch sponsors from remove JSON api
		$.getJSON(
			'http://coscup.org/2011-beta/api/sponsors/?callback=?',
			function (data) {
				var $sponsors = $('#sidebar > .sponsors').removeClass('empty');
				var titles = (
					{
						'en' : {
							'diamond' : 'Diamond Level Sponsors',
							'gold' : 'Gold Level Sponsors',
							'silver' : 'Silver Level Sponsors',
							'bronze' : 'Bronze Level Sponsors',
							'media' : 'Media Partners'
						},
						'zh-tw' : {
							'diamond' : '鑽石級贊助商',
							'gold' : '黃金級贊助商',
							'silver' : '白銀級贊助商',
							'bronze' : '青銅級贊助商',
							'media' : '媒體夥伴'
						},
						'zh-cn' : {
							'diamond' : '钻石级赞助商',
							'gold' : '黄金级赞助商',
							'silver' : '白银级赞助商',
							'bronze' : '青铜级赞助商',
							'media' : '媒体伙伴'
						}
					}
				)[lang];
			
				$.each(
					data,
					function (level, sponsors) {
						$sponsors.append('<h2>' + titles[level] + '</h2>');
						var $u = $('<ul />');
						$.each(
							sponsors,
							function (i, sponsor) {
								// Assume that there is no special chars to escape
								$u.append(
									'<li><a href="' + sponsor.url + '" target="_blank">'
									+ '<img title="' + sponsor.name[lang] + '" src="' + sponsor.logoUrl + '" />'
									+ '</a></li>'
								);
							}
						);
						$sponsors.append($u);
					}
				);
			}
		);
	}

	/*
	if ($('#sidebar > .sponsors:not(.empty)').length
		&& $('#sidebar > .sponsors:not(.empty)').children().length === 0) {
		// We have no sponsors yet :( hide the block
		$(document.body).addClass('no_sidebar');
	}
	*/
	
	
	// Analytics tracking for Sponsors
	$('.sponsors a').live(
		'click',
		function () {
			if (window._gaq) _gaq.push(['_trackEvent', 'Sponsors 2011', this.href]);
			return true;
		}
	);

	// CSS hover menu alternative for touch devices
	// Need to test on actual device
	
	$('#nav > ul > li').bind(
		'touchstart',
		function () {
			var $this = $(this);
			$this.addClass('selected');
			$(document.body).bind(
				'touchend',
				function (ev) {
					$this.removeClass('selected');
					$(this).unbind(ev);
				}
			);
		}
	);

	$('#header').css(
		'background-position',
		'center -' + (75*Math.floor(Math.random()*4)).toString(10) + 'px'
	);

	$('#footer').css(
		'background-position',
		'center -' + (75*Math.floor(Math.random()*6)).toString(10) + 'px'
	);

	// imagesTile on #sidebar2
	// don't execute in mobile layout to save bandwidth

	var $images = $('#sidebar2 > .images:visible');

	if ($images.length) {
		$.getScript(
			'http://coscup.org/2011-theme/assets/imagetile.min.js',
			function () {
				$images.imageTile(
					{
						num: 12,
						photos: yuren_54,
						beforeImageLoad: function ($img, i) {
							$img.css('opacity', 0);
						},
						imageLoad: function ($img, i) {
							$img.css('opacity', 1);
						}
					}
				);
			}
		);
	}
});
