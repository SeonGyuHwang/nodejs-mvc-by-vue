"use strict";

window.sendPopup = (args, params) => {

  var def = {
    'method': 'get',
    'target': 'formPopup'
  };
  params = params || {};

  if( typeof args == 'object' ) {

    jQuery.each(args, (i, v) => {
      def[i] = v;
    });

  } else {
    def.action = args;
  }

  if( !def.action ) {
    alert('팝업 URL이 누락 되었습니다.');
  } else {

    var windowPopup = window.open('about:blank', def.target, 'top=0,left=0,width=300,height=200,scrollbars=yes,toolbar=no');
    if( !windowPopup ) {
      alert('팝업차단 해제 후 다시 시도해주세요.');
      windowPopup.close();
    } else {
      jQuery('head', windowPopup.document).append("<title>불러오는중..</title>");
      jQuery('body', windowPopup.document)
        .css({
          'margin': 0
          ,'padding': 0
          ,'overflow': 'hidden'
        })
        .html("<div style='padding:0;margin:0;width:100%;text-align: center;overflow: hidden;line-height:150px;'><h2>로드중..</h2></div>");

      var newForm = jQuery('<form />');
      newForm.attr(def);
      newForm.appendTo('body');

      jQuery.each(params, (i, v) => {
        newForm.append('<input type="hidden" name="'+ i +'" class="'+ i +'" value="'+ v +'" />');
      });

      newForm
        .submit()
        .remove();
    }

    return windowPopup;
  }
}

window.publicLayer = {
	'useLayer': false,
	'isResize': true,
	'o': '_layer_',
	'v': '_layerOveray_',
	'w': jQuery(window).width()*0.8,
	'h': jQuery(window).height()*0.8,
	'reset': () => {
		jQuery("._layers_").remove();

		this.useLayer = false;
		this.w = jQuery(window).width()*0.8;
		this.h = jQuery(window).width()*0.8;
		this.o = '_layer_';
		this.v = '_layerOveray_';
	},
	'resize': () => {
		if( this.useLayer ) {
			if( this.isResize ) {
				jQuery('.' + this.o).css({
					'top': ( jQuery(window).scrollTop() + (jQuery(window).height() - parseInt(this.h)) / 2 ) + 'px',
					'left': ( jQuery(window).width() / 2 ) - ( parseInt(this.w) / 2 ) + 'px'
				});
			}


			jQuery('.'+this.v).css({
				'width': jQuery(document).width()+'px',
				'height': jQuery(document).height()+'px'
			});
		}
	},
	'setCss': (options) => {
		if( options )
			jQuery('.'+this.o).css(options);
	},
	'setHtml': (addHtml) => {
		jQuery('body').append( '<div class="'+ this.o +' _layers_"></div>' );
		jQuery('body').append( '<div class="'+ this.v +' _layers_"></div>' );

		jQuery('.'+this.v).css({
			'width': jQuery(document).width()+'px',
			'height': jQuery(document).height()+'px',
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'z-index': '10000',
			'filter': 'alpha(opacity=50)',
			'-khtml-opacity': '0.5',
			'-moz-opacity': '0.5',
			'opacity': '0.5',
			'background-color': '#000',
			'display': 'none'
		});

		jQuery('.'+this.o).css({
			'top': ( jQuery(window).scrollTop() + (jQuery(window).height() - this.h) / 2 )+'px',
			'left': ( jQuery(window).width() / 2 ) - ( this.w / 2 )+'px',
			'width': this.w,
			'height': this.h,
			'position': 'absolute',
			'padding': '0px',
			'background-color': '#fff',
			'border-radius': '10px',
			'-moz-border-radius': '10px',
			'-webkit-border-radius': '10px',
			'overflow': 'hidden',
			'cursor': 'default',
			'z-index': '10001',
			'display': 'none'
		});

		jQuery('.'+this.o).html(addHtml);
	},
	'setSize': (w, h, resize) => {
		this.isResize = resize != false ? true : false;
		this.w = w || jQuery(window).width()*0.8;
		this.h = h || jQuery(window).height()*0.8;
	},
	'init': () => {
		this.useLayer = true;
		jQuery('._layers_').show();

		jQuery(window).resize(function(){ publicLayer.resize(); });
		jQuery(window).scroll(function(){ publicLayer.resize(); });
		jQuery(document).on('click touchstart', '.publicLayerCloseBtn', function(e){
			e.preventDefault();
			publicLayer.reset();
		});
	}
};

window.delay = (() => {
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

window.number_format = (number, decimals, decPoint, thousandsSep) => {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number;
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
    var s = '';
    var toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
            .toFixed(prec);
    };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};
