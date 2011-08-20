"use stricts";

/*

載入步驟：

1. HTML 載入內容，或是 getPage() 從 pages / xhr 抓到內容後由 insertPage() 處理
2. loadPage() 觸發 pageload event ，載入加入內容後需要的函式（無論是手機或桌面版面）
2.1 如果是手機版面
2.1.1 執行 deferLoad() 把不該載入的 iframe 洗掉
2.1.2 掛上 resize event，如果視窗被回復成桌面大小，執行 resumeLoad() 和 fullLoad()
2.2 如果是桌面版面
2.2.1 執行 fullLoad()
2.2.2 掃描網頁上的 <a>，如果是站內連結加入 prefetchQueue，起始 fetchPage() 執行背景抓取
2.2.3 fetchPage() 抓到頁面會將 HTML 存入 pages Array

getPage() 是在 HTML5 History API 存在的情況下才會使用的 partial loading 方法。

*/


jQuery(function ($) {

	var lang = ($('html').attr('lang') || 'zh-TW').toLowerCase(),
	ctTimer;

	function isMobileLayout() {
		return !$('#title:visible').length;
	}

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
	$(window).bind('pageload', mobileSponsorLogo);

	function currentSessionShortcut() {
		// Program page only
		if (!$('.shortcuts')) return;

		// Not running after the event
		if (
			(new Date()).getTime()
			> parseInt($('.program tbody th:last').attr('rel') + '000', 10)
		) return;

		var $a = $('<a href="#" />').text(
			{
				'zh-tw': '目前議程',
				'zh-cn': '目前议程',
				'en': 'Current Session'
			}[lang]
		);


		$a.bind(
			'click',
			function (ev) {
				var ct = (new Date()).getTime(),
				target;
				ev.stopPropagation();
				ev.preventDefault();

				$('.program tbody th').each(
					function (i, el) {
						var ot = parseInt($(el).attr('rel') + '000', 10);
						if (ct < ot && target) {
							$(document.body).animate(
								{
									'scrollTop': $(target).offset().top - 20
								},
								180
							);
							$(window).trigger('scroll');
							return false;
						}
						if (ct > ot) {
							target = el;
						}
					}
				);
				if (!target) {
					$(document.body).animate(
						{
							'scrollTop': $('.program tbody th:first').offset().top - 20
						},
						180
					);
					$(window).trigger('scroll');
				}
			}
		);

		$('.shortcuts').append($('<li class="fullwidth" />').append($a));

		// back button
		
		$('.shortcuts').after(
			'<a class="mobile_top" href="#"></a>'
		);

		var $mobile_top = $('.mobile_top'),
		mtTimer;
		
		$mobile_top.bind(
			'click',
			function () {
				$(window).trigger('scroll');
				$(document.body).animate(
					{
						'scrollTop': $('.shortcuts').offset().top - 20
					},
					180
				);
				return false;
			}
		);


		$(window).bind(
			'resize.mt scroll.mt',
			function () {
				$mobile_top.removeClass('show');
				clearTimeout(mtTimer);
				mtTimer = setTimeout(
					function () {
						if ($('.shortcuts').offset().top < $(document.body).scrollTop()) {
							$mobile_top.css(
								'top',
								$(document.body).scrollTop()
								+ (window.innerHeight || $(window).height()) // innerHeight reports the correct viewpoint height in iPhone
								- $mobile_top.height()
								- 15
							).addClass('show');
						}
					},
					200
				);
			}
		);
		$(window).bind(
			'pageload',
			function (ev) {
				clearTimeout(mtTimer);
				$(window).unbind('resize.mt scroll.mt').unbind(ev);
			}
		);
	}
	$(window).bind('pageload', currentSessionShortcut);

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
							'diamond' : '鑽石級贊助',
							'gold' : '黃金級贊助',
							'silver' : '白銀級贊助',
							'bronze' : '青銅級贊助',
							'media' : '媒體夥伴'
						},
						'zh-cn' : {
							'diamond' : '钻石级赞助',
							'gold' : '黄金级赞助',
							'silver' : '白银级赞助',
							'bronze' : '青铜级赞助',
							'media' : '媒体伙伴'
						}
					}
				)[lang];
			
				$.each(
					[
						'diamond',
						'gold',
						'silver',
						'bronze',
						'media'
					],
					function (i, level) {
						if (!data[level]) return;
						$sponsors.append('<h2>' + titles[level] + '</h2>');
						var $u = $('<ul class="' + level + '" />');
						$.each(
							data[level],
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

	// in iOS standalone mode, use javascript instead of hashtag scroll

	$('.shortcuts a').live(
		'click',
		function (ev) {
			$(window).trigger('scroll');
			//if (!navigator.standalone) return;
			ev.preventDefault();
			$(document.body).animate(
				{
					'scrollTop': $(this.hash).offset().top - 20
				},
				180
			);
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
		
		/* 
		* 一個 username 只會出現一次（跨 Twitter / Plurk 比對）
		* 跳過從 Plurk 送過來的 Twitter
		* 跳過 Retweet / RePlurk
		*/
		
		var usernames = [];

		if (twits) {
			var i = 0, t;
			while (i < 2) {
				t = twits.results.shift();
				if (!t) break;
				if (/plurk\.com/.test(t.source)) continue; // sync from Plurk
				if (/^RT/.test(t.text)) continue; // Retweet
				if ($.inArray(t.from_user, usernames) !== -1) continue; // same username
				usernames.push(t.from_user);

				$u.append(
					$('<li />').append(
						$('<span class="text" />').html(t.text)
					).append(
						'<span class="meta">'
						+ '<a href="https://twitter.com/#!/' + t.from_user + '/status/' + t.id_str + '">@' + t.from_user + '</a>'
						+ '</span>'
					)
				);
				i++;
			}
		}
		if (plurks) {
			var i = 0, t;
			while (i < 2) {
				t = plurks.plurks.shift();
				if (!t) break;
				if (!plurks.users[t.user_id]) continue; // Plurk API quirk
				if (/plurk\.com\/(m\/)?\p\//.test(t.content)) continue; // RePlurk, contain a Plurk URL within this Plurk
				if ($.inArray(plurks.users[t.user_id].nick_name, usernames) !== -1) continue; // same username, possible 3rd party sync
				usernames.push(plurks.users[t.user_id].nick_name);

				$u.append(
					$('<li />').append(
						$('<span class="text" />').html(t.content)
					).append(
						'<span class="meta">'
						+ '<a href="http://www.plurk.com/p/' + t.plurk_id.toString(36) + '">@' + plurks.users[t.user_id].nick_name + '</a>'
						+ '</span>'
					)
				);
				i++;
			}
		}
		$('#sidebar2 > .socialbuzz').empty().append($u);
	}

	$('.socialbuzz a').live(
		'click',
		function () {
			window.open(this.href);
			return false;
		}
	);

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

		if ($('#ipv6block').length) {
			if (window.location.hostname === 'ipv6.coscup.org') {
					if (window._gaq) _gaq.push(['_trackEvent', 'IPv6 2011', 'connected']);
				$('#ipv6block').addClass('show').append(
					'<h2>IPv6 Connectivity</h2>'
					+ '<p>You are currently using IPv6 connection.</p>'
				);
			} else {
				$.getJSON(
					// See http://ipv6-test.com/api/
					'http://v6.ipv6-test.com/api/myip.php?json&callback=?',
					function (data) {
						if (window._gaq) _gaq.push(['_trackEvent', 'IPv6 2011', 'ready but not connected']);
						$('#ipv6block').addClass('show').append(
							'<h2>Connect using IPv6</h2>'
							+ '<p>Your network is IPv6 ready. Try it now by connect to <a href="http://ipv6.coscup.org/">ipv6.coscup.org</a>.</p>'
						);
					}
				);
			}
		}

		if ($('#countdown-time').length) {
			ctTimer = setInterval(
				updateCountDown,
				1000
			);

			$(window).bind(
				'pageload',
				function (ev) {
					clearTimeout(ctTimer);
					$(window).unbind(ev);
				}
			);

			updateCountDown();
			$('#countdown').addClass('show');
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
		$(window).trigger('pageload');
	
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
		if (isMobileLayout()) {
	
			if (window._gaq) _gaq.push(['_trackEvent', 'Mobile 2011', window.location.href]);
	
			$(window).bind(
				'resize.defer',
				function () {
					if (isMobileLayout()) return;
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

			if (
				window.history
				&& history.pushState
			) {
				// prefetch other pages
				$('a').each(
					function () {
						// skip external links
						if (
							this.hostname !== window.location.hostname
							|| !/2011/.test(this.pathname)
							|| !(new RegExp(lang)).test(this.pathname.toLowerCase())
							|| this.href === window.location.href
							|| pages[this.href]
							|| pages[this.href] === 'fetching'
							|| (/nocache/.test(this.getAttribute('rel')))
						) return;

						prefetchQueue.push(this.href);
						pages[this.href] = 'fetching';

						// start the sequence
						if (prefetchQueue.length === 1) fetchPage();
					}
				);
			}
		}
	}

	var getPageXhr, pages = {}, prefetchQueue = [];

	function getPage(href, samepage, resetScroll) {
		$(window).unbind('resize.defer');

		if (getPageXhr) getPageXhr.abort();

		if (!samepage && pages[href] && pages[href] !== 'fetching') {
			if (resetScroll) $(window).scrollTop(0);
			insertPage(pages[href]);
		} else {
			var $content = $('#content').addClass('loading');
			getPageXhr = $.ajax(
				{
					url: href,
					dataType: 'html',
					cache: !samepage, // nocache if user attempt to load the same page again
					complete: function (res, status) {
						if (
							status === "success"
							|| status === "notmodified"
						) {
							$content.removeClass('loading');
							pages[href] = res.responseText;
							if (resetScroll) $(window).scrollTop(0);
							insertPage(res.responseText);
						} else {
							window.location.replace(href);
						}
					}
				}
			);
		}
	}

	function insertPage(html) {
		var $h = $('<div />').append(
			html
			.match(/<body\b([^\u0000]+)<\/body>/)[0]
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		);

		document.title = html.match(/<title>(.+)<\/title>/)[1];
		$('#content').html($h.find('#content').children()).removeClass('loading');

		if (!$h.find('#nav').is('.empty')) {
			$('#nav').html($h.find('#nav').children());
		}

		if (window._gaq) _gaq.push(['_trackPageview']);

		loadPage();
	}

	function fetchPage() {
		var href = prefetchQueue.shift();
		$.ajax(
			{
				url: href,
				dataType: 'html',
				cache: true,
				complete: function (res, status) {
					if (
						status === "success"
						|| status === "notmodified"
					) {
						pages[href] = res.responseText;
					}
					if (prefetchQueue.length !== 0) fetchPage();
				}
			}
		);
	}

	loadPage();

	if (
		window.history
		&& history.pushState
	) {
		// http://stackoverflow.com/questions/4688164/window-bind-popstate
		// Deal with popstate fire on first load
		// See also https://hacks.mozilla.org/2011/03/history-api-changes-in-firefox-4/
		// on difference between Safari 5 vs Fx4.
		var popped = ('state' in window.history), initialURL = location.href;

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
					|| this.getAttribute('href').substr(0, 1) === '#'  // just a hash link
					|| (/nocache/.test(this.getAttribute('rel')))
				) return true;

				$(this).parent('#nav li').addClass('loading');

				var href = this.href,
				samepage = (this.href === window.location.href);

				// Must be called before getPage() so relative links on the new page could be resolved properly
				history.pushState({'is':'pushed'}, '', href);

				// However, this.href will change for a relative link beyond this point
				getPage(href, samepage, true);

				// Given the fact we had pushed a new state,
				// the next popState event must not be initialPop even with initialURL.
				popped = true;

				return false;
			}
		);

		window.onpopstate = function (ev) {
			// Ignore inital popstate that some browsers fire on page load
			var initialPop = (!popped && location.href == initialURL);
			popped = true;
			if (initialPop) return;

			getPage(window.location.href, false, false);
		};
	}

	function insertProgramInfo() {
		if (!programs) return;

		var types = (function () {
			var types = {};
			$('.types li').each(
				function (i, el) {
					types[(i+1).toString(10)] = $(this).text();
				}
			);
			return types;
		})();

		$.fn.translateTo = function (left) {
			if (left) {
				left += 10;
				return this.addClass('translate').css({
					'-webkit-transform': 'translateX(' + left.toString(10) + 'px)',
					'-moz-transform': 'translateX(' + left.toString(10) + 'px)',
					'-ms-transform': 'translateX(' + left.toString(10) + 'px)',
					'transform': 'translateX(' + left.toString(10) + 'px)'
				});
			} else {
				return this.removeClass('translate').css({
					'-webkit-transform': '',
					'-moz-transform': '',
					'-ms-transform': '',
					'transform': ''
				});
			}
		};

		var scrollTimer;

		$('table.program').each(
			function () {
				var $this = $(this);
				$this.prev().after(
					$('<div class="program" />').append($this).bind(
						'scroll',
						function () {
							var $that = $(this);
							$that.find('thead th:first, tbody th').translateTo(0);
							clearTimeout(scrollTimer);
							scrollTimer = setTimeout(
								function () {
									$that.find('thead th:first, tbody th').translateTo($that.scrollLeft());
								},
								200
							);
						}
					)/*.bind(
						'selectstart',
						function () {
							return false;
						}
					)*/.bind(
						'touchstart', //mousedown
						function (ev) {
							var $this = $(this),
							$window = $(window),
							posX = ev.clientX || ev.originalEvent.touches[0].clientX,
							posY = ev.clientY || ev.originalEvent.touches[0].clientY;
							if (!$this.hasClass('expend') || isMobileLayout()) return;
							$this.addClass('movestart');
							$window.bind(
								'touchmove', //mousemove
								function (ev) {
									$this.removeClass('movestart').addClass('moving').scrollLeft(
										$this.scrollLeft()
										+ posX
										- (ev.clientX || ev.originalEvent.touches[0].clientX)
									);
									if (ev.type !== 'touchmove') {
										// not to conflict y-dir scroll with non-cancelable(?) browser action
										$window.scrollTop(
											$window.scrollTop()
											+ posY
											- (ev.clientY || ev.originalEvent.touches[0].clientY)
										);
									}
									posX = ev.clientX || ev.originalEvent.touches[0].clientX;
									posY = ev.clientY || ev.originalEvent.touches[0].clientY;
								}
							).bind(
								'touchend', //mouseup
								function (ev) {
									$window.unbind('touchmove touchend'); //mousemove mouseup
									setTimeout(
										function () {
											$this.removeClass('moving movestart');
										},
										0
									);
									return false;
								}
							);	
						}
					)
				);
			}
		);

		$('table.program td').each(
			function () {
				var $this = $(this),
				program = programs[$this.data('pid')];

				if (!program || program.type === 0) return;

				var $meta = $('<ul class="meta" />'),
				program_lang = ({'en': 'English', 'zh': '\u6f22\u8a9e'})[(this.className.match(/program_lang_(\w+)\b/) || [])[1]],
				program_type = types[(this.className.match(/program_type_(\w+)\b/) || [])[1]];

				if (program_lang) $meta.append($('<li />').text(program_lang));
				if (program_type) $meta.append($('<li />').text(program_type));
				if (program.slide) {
					$meta.append(
						'<li><a href="' + program.slide + '">' + {en:'Slide Download', 'zh-tw':'投影片下載', 'zh-cn':'投影片下载'}[lang || 'en'] + '</a></li>'
					);
				}
				if (program.youtube) {
					var list = [].concat(program.youtube),
					program_embed_url = 'http://www.youtube.com/embed/' + list.shift() + '?hd=1';

					if (program.youtube.length) program_embed_url += '&playlist=' + list.join(',');
					$meta.append(
						'<li><a href="' + program_embed_url + '" class="youtube_video">' + {en:'Video', 'zh-tw':'演講錄影', 'zh-cn':'演讲录影'}[lang || 'en'] + '</a></li>'
					);
				}

				var $info = $('<div class="info" />');

				if ($meta.children().length) $info.append($meta);

				if (program['abstract']) { // abstract is a reserved word
					$info.append(
						$('<div class="abstract" />').html(program['abstract'])
					);
				}

				if (program.bio) {
					$info.append(
						$('<div class="bio" />').html(program.bio)
					);
				}

				if ($info.children().length) $this.append($info);
			}
		).bind(
			'click',
			function () {
				var $this = $(this),
				$div = $this.parents('div.program'),
				room_id = parseInt((this.className.match(/program_room_(\w+)\b/) || [])[1]),
				y = $(window).scrollTop() - $this.offset().top;

				if ($div.hasClass('moving')) return false;

				if (window._gaq) _gaq.push(['_trackEvent', 'Program 2011', this.hash]);

				// For mobile
				$(this).toggleClass('expend');

				// For desktop
				$div.toggleClass('expend');
				$div.find('thead th:first, tbody th').translateTo($div.scrollLeft());

				switch (room_id) {
					case 0:
					$div.scrollLeft($div[0].scrollWidth*0.26);
					break;
					case 1:
					$div.scrollLeft(0);
					break;
					case 2:
					$div.scrollLeft($div[0].scrollWidth*0.13);
					break;
					case 3:
					$div.scrollLeft($div[0].scrollWidth*0.38);
					break;
					case 4:
					$div.scrollLeft($div[0].scrollWidth);
					break;
				}
				$(window).scrollTop(
					$this.offset().top + y
				);
			}
		);

		$('.program p.name a').bind(
			'click',
			function (ev) {
				if (ev.which == 2 || ev.metaKey) return true;
				ev.preventDefault();
			}
		);

		$('.program div a').bind(
			'click',
			function (ev) {
				if (ev.which == 2 || ev.metaKey) return true;
				if ($(this).hasClass('youtube_video') && !isMobileLayout()) {
					$(document.body).append(
						'<div id="video_modal" class="video_box" />'
					).append(
						'<iframe id="video_iframe" class="video_box" title="YouTube video player" width="854" height="483"  src="' + this.href + '" frameborder="0"  allowfullscreen="allowfullscreen"></iframe>'
					).append(
						'<div id="video_close_button" class="video_box" />'
					);
					// window.open(this.href, 'coscup_youtube_video', 'width=854,height=483'); // 480p video size on youtube
				} else {
					window.open(this.href);
				}
				ev.preventDefault();
				ev.stopPropagation();
			}
		);
	}
	$(window).bind('pageload', insertProgramInfo);

	$('#video_modal, #video_close_button').live(
		'click',
		function () {
			$('.video_box').remove();
		}
	);

	// preload program wherever page we are on the main site
	var programs;

	if (
		!/((blog|sponsor|register)\.)?coscup\.org\.?/.test(window.location.domain)
	) {
		$.getJSON(
			'http://coscup.org/2011/api/program/?callback=?',
			function (data) {
				programs = data;
				insertProgramInfo();
			}
		);
	}

	function updateCountDown() {
		//new Date("Fri Jul 15 2011 20:00:00 GMT+0800 (CST)").getTime();
		var dt = 1310731200 - Math.floor(new Date().getTime()/1E3);

		if (dt < 0) {
			clearTimeout(ctTimer);
			$('#countdown').html(
				{
					en: '<a href="http://registrano.com/events/coscup2011-regist?locale=en">Register Now!</a>',
					'zh-tw': '<a href="http://registrano.com/events/coscup2011-regist">立刻報名！</a>',
					'zh-cn': '<a href="http://registrano.com/events/coscup2011-regist">立刻报名！</a>'	
				}[lang]
			);
		}

		s = [];

		s[0] = /*((dt%60 < 10)?'0':'') + */ (dt%60).toString(10) + {
			en: ' seconds',
			'zh-cn': ' 秒',
			'zh-tw': ' 秒'
		}[lang];
		dt = Math.floor(dt/60);
		s[1] = /*((dt%60 < 10)?'0':'') + */ (dt%60).toString(10) + {
			en: ' minutes ',
			'zh-cn': ' 分 ',
			'zh-tw': ' 分 '
		}[lang];
		dt = Math.floor(dt/60);
		s[2] = (dt%24).toString(10) + {
			en: ' hours ',
			'zh-cn': ' 时 ',
			'zh-tw': ' 時 '
		}[lang];
		dt = Math.floor(dt/24);
		if (dt) {
			s[3] = dt.toString(10) + {
				en: ' days ',
				'zh-cn': ' 天 ',
				'zh-tw': ' 天 '
			}[lang];
		}
		$('#countdown-time').text(s.reverse().join(''));
	}
});
