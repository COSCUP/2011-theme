"use stricts";

/*

載入步驟：

1. getPage() 或是 HTML 載入內容
2. loadPage() 加入載入內容後需要的函式（無論是手機或桌面版面）
2.1 如果是手機版面
2.1.1 執行 deferLoad() 把不該載入的 iframe 洗掉
2.1.2 掛上 resize event，如果視窗被回復成桌面大小，執行 resumeLoad() 和 fullLoad()
2.2 如果是桌面版面
2.2.1 執行 fullLoad()

getPage() 是在 HTML5 History API 存在的情況下才會使用的 partial loading 方法。

*/


jQuery(function ($) {

	var lang = ($('html').attr('lang') || 'zh-TW').toLowerCase();

	if ($('#nav.empty').length) {
		// Fetch site nav from remove JSON api
		$.getJSON(
			'http://coscup.org/2011/api/menu/?callback=?',
			function (data) {
				var $nav = $('#nav').removeClass('empty');
				$nav.html(data[lang].replace(/href="(\/[^\/])/g, 'href="http://coscup.org$1'));
				$('#nav a[href*="' + window.location.hostname + '"]').parent().addClass('current');
			}
		);
	}
	
	function mobileSponsorLogo() {
		var pool = [],
		multi = {
			diamond: 10,
			gold: 5,
			silver: 2,
			bronze: 1
		};

		$('#mobileSponsorLogo').remove();
		
		$.each(
			multi,
			function (level, m) {
				$('#sidebar > .sponsors .' + level + ' a').each(
					function () {
						var i = m;
						while (i--) {
							pool.push(this);
						}
					}
				);
			}
		);

		if (pool.length === 0) return;

		$('#nav').after(
			$('<p id="mobileSponsorLogo" />').append(
				$(pool[Math.floor(pool.length * Math.random())]).clone()
			)
		);
	}
	
	if ($('#sidebar > .sponsors.empty').length) {
		// Fetch sponsors from remove JSON api
		$.getJSON(
			'http://coscup.org/2011/api/sponsors/?callback=?',
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
				mobileSponsorLogo();
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
	$('.sponsors a, #mobileSponsorLogo a').live(
		'click',
		function () {
			if (window._gaq) _gaq.push(['_trackEvent', 'Sponsors 2011', this.href]);
			return true;
		}
	);
	$('#mobileSponsorLogo a').live(
		'click',
		function () {
			if (window._gaq) _gaq.push(['_trackEvent', 'Sponsors 2011 (Mobile only)', this.href]);
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

	// imagesTile on #sidebar2
	function imageTile() {
		$('#sidebar2 > .images').imageTile(
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

	function showSocialBuzz(plurks, twits) {
		var $u = $('<ul />');
		
		// 應該要把兩個時間混在一起然後找最新的 4 篇，不過我懶 = =
		
		if (twits) $.each(
			twits.results.slice(0, 2),
			function (i, t) {
				$u.append(
					$('<li />').append(
						$('<span class="text" />').html(t.text)
					).append(
						'<span class="meta">'
						+ '<a href="https://twitter.com/#!/' + t.from_user + '/status/' + t.id_str + '">@' + t.from_user + '</a>'
						+ '</span>'
					)
				);
			}
		);
		if (plurks) $.each(
			plurks.plurks.slice(0, 2),
			function (i, t) {
				if (!plurks.users[t.user_id]) return; // Plurk API quirk
				$u.append(
					$('<li />').append(
						$('<span class="text" />').html(t.content)
					).append(
						'<span class="meta">'
						+ '<a href="http://www.plurk.com/p/' + t.plurk_id.toString(36) + '">@' + plurks.users[t.user_id].nick_name + '</a>'
						+ '</span>'
					)
				);
			}
		);
		$('#sidebar2 > .socialbuzz').empty().append($u);
	}

	function fullLoad() {
		if ($('#sidebar2 > .images').length) {
			if (!$.fn.imageTile) {
				$.ajax(
					{
						url: 'http://coscup.org/2011-theme/assets/imagetile.min.js',
						dataType: 'script',
						cache: true,
						success: imageTile 
					}
				);
			} else {
				imageTile();
			}
		}
		
		if ($('#sidebar2 > .socialbuzz').length) {
			var plurks, twits;
			$.getJSON(
				'http://coscup.org/2011/api/plurk/',
				function (data) {
					plurks = data;
					showSocialBuzz(plurks, twits);
				}
			);
			$.getJSON(
				'https://search.twitter.com/search.json?q=coscup+OR+from%3Acoscup&callback=?',
				function (data) {
					twits = data;
					showSocialBuzz(plurks, twits);
				}
			);
		}
	}

	function deferLoad() {
		$('.hideInMobile iframe').each(
			function () {
				$(this).attr('data-src', this.src);
				this.src = '';
			}
		);
	}
	
	function resumeLoad() {
		$('#sidebar2 iframe').each(
			function () {
				if ($(this).attr('data-src')) this.src = $(this).attr('data-src');
			}
		);
	}

	function loadPage() {
		mobileSponsorLogo();
	
		$('#header').css(
			'background-position',
			'center -' + (75*Math.floor(Math.random()*4)).toString(10) + 'px'
		);
	
		$('#footer').css(
			'background-position',
			'center -' + (75*Math.floor(Math.random()*6)).toString(10) + 'px'
		);

		// Find out if we are currently on mobile layout
		// if so, defer/stop imagetile and iframe from loading
		// removing 'src' in <img> won't help so not doing it
		if (!$('#title:visible').length) {
	
			if (window._gaq) _gaq.push(['_trackEvent', 'Mobile 2011', window.location.href]);
	
			$(window).bind(
				'resize.defer',
				function () {
					if (!$('#title:visible').length) return; // still in Mobile
					$(this).unbind('resize.defer');
	
					// load desktop stuff and stuff unloaded;
					fullLoad();
					resumeLoad();
				}
			);
	
			// unload stuff
			deferLoad();
		} else {
			// load desktop stuff
			fullLoad();
		}
	}
	loadPage();

	var getPageXhr;

	function getPage(href) {
		var $content = $('#content').addClass('loading');
		$(window).unbind('resize.defer');

		if (getPageXhr) getPageXhr.abort();
		getPageXhr = $.ajax(
			{
				url: href,
				dataType: 'html',
				cache: true,
				complete: function (res, status) {
					if (
						status === "success"
						|| status === "notmodified"
					) {
						var $h = $('<div />').append(
							res.responseText
							.match(/<body\b([^\u0000]+)<\/body>/)[0]
							.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
						);

						document.title = res.responseText.match(/<title>(.+)<\/title>/)[1];
						$content.html($h.find('#content').children()).removeClass('loading');

						if (!$h.find('#nav').is('.empty')) {
							$('#nav').html($h.find('#nav').children());
						}
						
						if (window._gaq) _gaq.push(['_trackPageview']);
						
						loadPage();
					} else {
						window.location.replace(href);
					}
				}
			}
		)
	}

	if (
		window.history
		&& history.pushState
	) {	
		$('a').live(
			'click',
			function (ev) {
				// skip mid/right/cmd click
				if (ev.which == 2 || ev.metaKey) return true;
				// skip external links
				if (
					this.hostname !== window.location.hostname
					|| !/2011/.test(this.pathname)
					|| !(new RegExp(lang)).test(this.pathname.toLowerCase())
				) return true;

				getPage(this.href);
				history.pushState(true, '', this.href);
				return false;
			}
		);

		var firstpop = true;
		window.onpopstate = function (ev) {
			if (firstpop && !ev.state) {
				firstpop = false;
				// Webkit nightly fire popstate for no reason at first load
				// Wordaround: skip if it's the first popstate firing and
				// is not actually triggered by a pushState being and user action.
				return;
			}
			firstpop = false;
			getPage(window.location.href);
		};
	}
});
