
$(function(){

	var currentValue = $('#currentValue');

	$("#slider").slider({ 
		max: 500,
		min: 0,
		slide: function(event, ui) {
			currentValue.html(ui.value);
		}
	});

});









// Without JQuery
//var slider = new Slider('#ex1', {
//	formatter: function(value) {
//		return 'Current value: ' + value;
//	}
//});



//$(function(){

//	var currentValue = $('#currentValue');

//	$("#slider").slider({ 
	//	max: 500,
	//	min: 0,
	//	slide: function(event, ui) {
	//		currentValue.html(ui.value);
	//	}
	//});

//});
//



//$(function(){
//
//	var currentValue = $('#currentValue');

//	$('#defaultSlider').change(function(){
//	    currentValue.html(this.value);
//	});

	// Trigger the event on load, so
	// the value field is populated:

//	$('#defaultSlider').change();

//});



//	$('#ex1').slider({
//		formatter: function(value) {
//			return 'Current value: ' + value;
//		}
//	});

