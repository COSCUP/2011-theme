/*!
 
 Image Tile
 by timdream (http://timc.idv.tw/)
 
*/

"use strict";

(function ($) {

	// http://jsfromhell.com/array/shuffle
	Array.prototype.shuffle = function () { //v1.0
		for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
		return this;
	};


	$.imageTileSupported = true;

	$.fn.imageTile = function (options) {
		var settings = {
			beforeImageLoad: function ($img, i) {
				$img.hide();
			},
			imageLoad: function ($img, i) {
				$img.fadeIn(200);
			},
			num: 15*5,
			shuffle: true,
			photos: false
		};
		
		$.extend(settings, options);
		
		if (!settings.photos) return this;
		
		if (settings.shuffle) settings.photos = settings.photos.shuffle();
		if (settings.photos.length > settings.num) settings.photos = settings.photos.slice(0, settings.num);
		
		return this.each(
			function () {
				var $this = $(this);
				$.each(
					settings.photos,
					function (i, photo) {
						var $i = $('<img />');
						settings.beforeImageLoad($i, i);
						$i[0].onload = function () {
							settings.imageLoad($i, i);
						};
						var $a = $('<a href="' + photo.link_url + '" target="_blank" />').append($i);
						$a.attr('title', photo.title);
						$this.append($a);
						$i[0].src = photo.photo_url;
					}
				);
			}
		);
		
	};

})(jQuery);