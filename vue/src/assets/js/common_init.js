"use strict";
(function($) {

	var _init = function(){

    $.datepicker.setDefaults({
      dateFormat: "yy-mm-dd",
      closeText: '닫기',
      prevText: '이전달',
      nextText: '다음달',
      currentText: '오늘',
      monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      dayNames: ['일','월','화','수','목','금','토'],
      dayNamesShort: ['일','월','화','수','목','금','토'],
      dayNamesMin: ['일','월','화','수','목','금','토'],
      weekHeader: 'Wk',
      yearRange: 'c-2:c+1',
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: true,
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      showOn: 'both'
    });

	};

	$(function(){
		_init();

		$(this).on('keyup', '.numOnly', function(e){
			$(e.currentTarget).val( $(e.currentTarget).val().replace(/[^0-9]/g, '') );
		});
	});

})( jQuery );
