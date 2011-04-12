"use stricts";

jQuery(function ($) {

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

	// Image tiles on header / footer
	
	var $images = $('<div id="images" class="images" />');
	$('#header').prepend($images);
	
	$images.imageTile(
		{
			num: 15*4,
			photos: [].concat(
				yuren_54.shuffle(),
				photos.shuffle().slice(0, 15*4 - yuren_54.length)
			),
			beforeImageLoad: function ($img, i) {
				$img.css('opacity', 0);
			},
			imageLoad: function ($img, i) {
				$img.css('opacity', 0.5);
			}
		}
	);

	var $images_footer = $('<div id="images_footer" class="images" />');
	$('#footer').prepend($images_footer);
	
	$images_footer.imageTile(
		{
			num: 15,
			photos: yuren_54,
			beforeImageLoad: function ($img, i) {
				$img.css('opacity', 0);
			},
			imageLoad: function ($img, i) {
				$img.css('opacity', 0.5);
			}
		}
	);

	// imagesTile on #sidebar2

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
	
	// connect_box

	var $connect_box = $('#connect_box'),
	ctimer;
	$('#connect').bind(
		'click',
		function (ev) {
			ev.preventDefault();
			$connect_box.toggleClass('show', !$connect_box.is(':visible'));
		}
	).add($connect_box).bind(
		'mouseenter',
		function () {
			clearTimeout(ctimer);
			if (!$connect_box.is(':visible')) $connect_box.addClass('show');
		}
	).bind(
		'mouseleave',
		function () {
			ctimer = setTimeout(
				function () {
					$connect_box.removeClass('show');
				},
				200
			);
		}
	);
	
});


// http://www.flickr.com/groups/coscup2010-selection/
// Selected by Yuren Ju
var yuren_54 = [
	{"photo_url":"4075/4889441807_3a86c8bf67","link_url":"12452841@N00/4889441807","title":"P8140746"},
	{"photo_url":"4140/4901940636_321b5dc4b1","link_url":"48749766@N00/4901940636","title":"DSC_2622"},
	{"photo_url":"4134/4893573695_bd7cf4c7b6","link_url":"12452841@N00/4893573695","title":"P8151046"},
	{"photo_url":"4074/4901933360_56de47f0a2","link_url":"48749766@N00/4901933360","title":"DSC_2541"},
	{"photo_url":"4077/4912818611_92a804ccb1","link_url":"54331619@N00/4912818611","title":"COSCUP Day 2"},
	{"photo_url":"4139/4903649894_ef83276b1e","link_url":"38664137@N07/4903649894","title":"full2"},
	{"photo_url":"4114/4892533724_255a0db780","link_url":"96595297@N00/4892533724","title":"DSC_8318"},
	{"photo_url":"4143/4893498695_6ed348fb05","link_url":"12452841@N00/4893498695","title":"P8151024"},
	{"photo_url":"4116/4901453941_9053107317","link_url":"48749766@N00/4901453941","title":"DSC_3313"},
	{"photo_url":"4082/4901389753_7a1dc45532","link_url":"48749766@N00/4901389753","title":"DSC_2942"},
	{"photo_url":"4114/4907109051_dbb853678f","link_url":"54331619@N00/4907109051","title":"COSCUP 2010 Day 1 - Ubuntu BoF"},
	{"photo_url":"4073/4892563466_96ec98e91b","link_url":"96595297@N00/4892563466","title":"DSC_8100"},
	{"photo_url":"4140/4907688780_cdd0f13076","link_url":"54331619@N00/4907688780","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4094/4893271331_a53ae76028","link_url":"12452841@N00/4893271331","title":"P8150957"},
	{"photo_url":"4079/4905410356_15f64bf25e","link_url":"54331619@N00/4905410356","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4100/4890741725_22f7365dd4","link_url":"12452841@N00/4890741725","title":"P8140894"},
	{"photo_url":"4116/4934292898_a1b9a6856f","link_url":"46509322@N00/4934292898","title":"熱血立夫！啟動！"},
	{"photo_url":"4116/4893221101_64a4153f3c","link_url":"12452841@N00/4893221101","title":"P8150940"},
	{"photo_url":"4119/4901468459_64d2a0084a","link_url":"48749766@N00/4901468459","title":"DSC_3445"},
	{"photo_url":"4099/4891967201_a83166e938","link_url":"96595297@N00/4891967201","title":"DSC_8084"},
	{"photo_url":"4101/4891959949_d60c5a3742","link_url":"96595297@N00/4891959949","title":"DSC_8145"},
	{"photo_url":"4120/4903478347_348668597a","link_url":"48749766@N00/4903478347","title":"DSC_4046"},
	{"photo_url":"4096/4901530949_263e864bb5","link_url":"48749766@N00/4901530949","title":"DSC_3988"},
	{"photo_url":"4122/4903778394_71c163b159","link_url":"38664137@N07/4903778394","title":"DPP_0019"},
	{"photo_url":"4138/4903778188_bc23cf45ee","link_url":"38664137@N07/4903778188","title":"DPP_0016"},
	{"photo_url":"4117/4934292964_3bb35f4940","link_url":"46509322@N00/4934292964","title":"DSC_8611"},
	{"photo_url":"4117/4901945960_21f1dd7608","link_url":"48749766@N00/4901945960","title":"DSC_2667"},
	{"photo_url":"4097/4902052284_3c5aecf783","link_url":"48749766@N00/4902052284","title":"DSC_3418"},
	{"photo_url":"4079/4890199661_a3590c7937","link_url":"19902918@N00/4890199661","title":"DSCF1148"},
	{"photo_url":"4076/4901394251_1dd75e5ccf","link_url":"48749766@N00/4901394251","title":"DSC_2998"},
	{"photo_url":"4079/4901363869_a4a5d5d5e9","link_url":"48749766@N00/4901363869","title":"DSC_2699"},
	{"photo_url":"4102/4901525359_e9618d4a64","link_url":"48749766@N00/4901525359","title":"DSC_3944"},
	{"photo_url":"4101/4901345859_252ba9610c","link_url":"48749766@N00/4901345859","title":"DSC_2540"},
	{"photo_url":"4115/4901393899_4dba8919d9","link_url":"48749766@N00/4901393899","title":"DSC_2994"},
	{"photo_url":"4096/4898141929_db97e43b81","link_url":"46509322@N00/4898141929","title":"YRJ_2119.jpg"},
	{"photo_url":"4122/4901982114_4dc417f32d","link_url":"48749766@N00/4901982114","title":"DSC_3005"},
	{"photo_url":"4099/4891943527_ac9e1b728c","link_url":"96595297@N00/4891943527","title":"DSC_8259"},
	{"photo_url":"4135/4901505453_faa39ab5d7","link_url":"48749766@N00/4901505453","title":"DSC_3775"},
	{"photo_url":"4101/4901929900_38815934e8","link_url":"48749766@N00/4901929900","title":"DSC_2490"},
	{"photo_url":"4115/4901305700_d603cf1794","link_url":"54331619@N00/4901305700","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4076/4901391521_2fb178399c","link_url":"48749766@N00/4901391521","title":"DSC_2969"},
	{"photo_url":"4134/4903478809_99f3f3fa33","link_url":"48749766@N00/4903478809","title":"DSC_4057"},
	{"photo_url":"4095/4903779614_4905868635","link_url":"38664137@N07/4903779614","title":"DPP_0038"},
	{"photo_url":"4074/4905410896_58614cbc5d","link_url":"54331619@N00/4905410896","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4115/4901472343_bae290f088","link_url":"48749766@N00/4901472343","title":"DSC_3478"},
	{"photo_url":"4077/4901955598_49c260dec7","link_url":"48749766@N00/4901955598","title":"DSC_2723"},
	{"photo_url":"4076/4901092374_cde96bbc4b","link_url":"54331619@N00/4901092374","title":"COSCUP 2010 場佈"},
	{"photo_url":"4075/4891957757_35dec77b02","link_url":"96595297@N00/4891957757","title":"DSC_8161"},
	{"photo_url":"4142/4892564928_d6d8f7ced0","link_url":"96595297@N00/4892564928","title":"DSC_8091"},
	{"photo_url":"4100/4893745794_cec3cc18b7","link_url":"12452841@N00/4893745794","title":"P8150918"},
	{"photo_url":"4138/4902019524_bc29ee82e8","link_url":"48749766@N00/4902019524","title":"DSC_3178"},
	{"photo_url":"4082/4901985134_0ea16d8d78","link_url":"48749766@N00/4901985134","title":"DSC_3052"},
	{"photo_url":"4134/4902105502_43cc7405d5","link_url":"48749766@N00/4902105502","title":"DSC_3888"},
	{"photo_url":"4142/4933698859_b3bf1e05f3","link_url":"46509322@N00/4933698859","title":"DSC_8365"}
];

// http://www.flickr.com/groups/coscup2010/
// top (photos.length) by interestingness sorted by Flickr
var photos = [
	{"photo_url":"4095/4892560806_e80909b4b2","link_url":"96595297@N00/4892560806","title":"DSC_8124"},
	{"photo_url":"4096/4891960997_87dd8be37e","link_url":"96595297@N00/4891960997","title":"DSC_8137"},
	{"photo_url":"4120/4892566468_8ce966100c","link_url":"96595297@N00/4892566468","title":"DSC_8078"},
	{"photo_url":"4079/4898188833_f957ddfd5b","link_url":"46509322@N00/4898188833","title":"YRJ_2213.jpg"},
	{"photo_url":"4073/4907684666_82b4b16fb4","link_url":"54331619@N00/4907684666","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4138/4912813643_ab64a192c0","link_url":"54331619@N00/4912813643","title":"COSCUP Day 2"},
	{"photo_url":"4114/4892533724_255a0db780","link_url":"96595297@N00/4892533724","title":"DSC_8318"},
	{"photo_url":"4075/4889441807_3a86c8bf67","link_url":"12452841@N00/4889441807","title":"P8140746"},
	{"photo_url":"4141/4891029920_10978b42a0","link_url":"12452841@N00/4891029920","title":"P8140800"},
	{"photo_url":"4140/4907688780_cdd0f13076","link_url":"54331619@N00/4907688780","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4077/4889986198_1174d7e285","link_url":"12452841@N00/4889986198","title":"P8140718"},
	{"photo_url":"4134/4893573695_bd7cf4c7b6","link_url":"12452841@N00/4893573695","title":"P8151046"},
	{"photo_url":"4100/4890342242_c037669f69","link_url":"12452841@N00/4890342242","title":"P8140797"},
	{"photo_url":"4122/4890313820_d887bbdb35","link_url":"12452841@N00/4890313820","title":"P8140779"},
	{"photo_url":"4073/4892563466_96ec98e91b","link_url":"96595297@N00/4892563466","title":"DSC_8100"},
	{"photo_url":"4074/4898980628_a2c3b14609","link_url":"46509322@N00/4898980628","title":"YRJ_2556.jpg"},
	{"photo_url":"4099/4888299238_baa8934bf5","link_url":"26842510@N00/4888299238","title":"DSC_4025"},
	{"photo_url":"4080/4897846537_06feb367ea","link_url":"46509322@N00/4897846537","title":"YRJ_1610.jpg"},
	{"photo_url":"4073/4893868208_f42cec6af7","link_url":"12452841@N00/4893868208","title":"P8150958"},
	{"photo_url":"4077/4890798944_48fa8a2199","link_url":"19902918@N00/4890798944","title":"DSCF1247"},
	{"photo_url":"4139/4888418258_e681984bd8","link_url":"46509322@N00/4888418258","title":"記錄與場地"},
	{"photo_url":"4138/4903778188_bc23cf45ee","link_url":"38664137@N07/4903778188","title":"DPP_0016"},
	{"photo_url":"4121/4891971845_91b4b8278c","link_url":"96595297@N00/4891971845","title":"DSC_8048"},
	{"photo_url":"4118/4890700531_4a30d1bc08","link_url":"12452841@N00/4890700531","title":"P8140883"},
	{"photo_url":"4074/4905410896_58614cbc5d","link_url":"54331619@N00/4905410896","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4073/4892536894_19a80bdd8e","link_url":"96595297@N00/4892536894","title":"DSC_8299"},
	{"photo_url":"4094/4900715179_e8d85d7ef7","link_url":"54331619@N00/4900715179","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4095/4907112377_e5b479ce90","link_url":"54331619@N00/4907112377","title":"COSCUP 2010 Day 1 - Ubuntu BoF"},
	{"photo_url":"4079/4898843432_9954670e8a","link_url":"46509322@N00/4898843432","title":"YRJ_2301.jpg"},
	{"photo_url":"4098/4892555766_865079954f","link_url":"96595297@N00/4892555766","title":"DSC_8165"},
	{"photo_url":"4119/4891329746_971b0ab754","link_url":"12452841@N00/4891329746","title":"P8140892"},
	{"photo_url":"4075/4907084063_512af25cf5","link_url":"54331619@N00/4907084063","title":"COSCUP 2010 Day 1"},
	{"photo_url":"4118/4888300606_80c2f8ca15","link_url":"26842510@N00/4888300606","title":"DSC_4039"},
	{"photo_url":"4073/4898493879_df52f71b0a","link_url":"46509322@N00/4898493879","title":"YRJ_2758.jpg"},
	{"photo_url":"4117/4897993917_23b69ceaa9","link_url":"64165297@N00/4897993917","title":"好有勵志片的 fu"},
	{"photo_url":"4082/4898263101_9f2ba8b959","link_url":"46509322@N00/4898263101","title":"YRJ_2314.jpg"},
	{"photo_url":"4119/4890579449_aa26cf851b","link_url":"12452841@N00/4890579449","title":"P8140850"},
	{"photo_url":"4139/4903649894_ef83276b1e","link_url":"38664137@N07/4903649894","title":"full2"},
	{"photo_url":"4099/4898009373_9cd73a0abf","link_url":"46509322@N00/4898009373","title":"YRJ_1965.jpg"},
	{"photo_url":"4081/4894172424_7242fe1b5f","link_url":"12452841@N00/4894172424","title":"P8151047"},
	{"photo_url":"4119/4897943909_8ef961262f","link_url":"46509322@N00/4897943909","title":"YRJ_1827.jpg"},
	{"photo_url":"4076/4891963871_13f3e6b2fc","link_url":"96595297@N00/4891963871","title":"DSC_8110"},
	{"photo_url":"4077/4912818611_92a804ccb1","link_url":"54331619@N00/4912818611","title":"COSCUP Day 2"},
	{"photo_url":"4102/4890198991_d9e7813c2f","link_url":"19902918@N00/4890198991","title":"DSCF1091"},
	{"photo_url":"4096/4898141929_db97e43b81","link_url":"46509322@N00/4898141929","title":"YRJ_2119.jpg"},
	{"photo_url":"4099/4891943527_ac9e1b728c","link_url":"96595297@N00/4891943527","title":"DSC_8259"},
	{"photo_url":"4142/4891934793_bfb09156d2","link_url":"96595297@N00/4891934793","title":"DSC_8316"},
	{"photo_url":"4075/4891969331_1592f993d6","link_url":"96595297@N00/4891969331","title":"DSC_8064"},
	{"photo_url":"4138/4893214677_bba59df5f7","link_url":"12452841@N00/4893214677","title":"P8150938"},
	{"photo_url":"4078/4897741695_70c4f5f7cb","link_url":"46509322@N00/4897741695","title":"YRJ_1439.jpg"},
	{"photo_url":"4116/4893221101_64a4153f3c","link_url":"12452841@N00/4893221101","title":"P8150940"}
];

jQuery.each(
	yuren_54,
	function (i, photo) {
		yuren_54[i].photo_url = 'http://farm5.static.flickr.com/' + photo.photo_url + '_s.jpg';
		yuren_54[i].link_url = 'http://www.flickr.com/photos/' + photo.link_url;
	}
);

jQuery.each(
	photos,
	function (i, photo) {
		photos[i].photo_url = 'http://farm5.static.flickr.com/' + photo.photo_url + '_s.jpg';
		photos[i].link_url = 'http://www.flickr.com/photos/' + photo.link_url;
	}
);