var defaultURL = 'mattkersley.com'; //<---- CHANGE TO YOUR WEBSITE URL

//show loading graphic
function showLoader(id) {
  $('#' + id + ' img').fadeIn('slow');
}

//hdie loading graphic
function hideLoader(id) {
  $('#' + id + ' img').fadeOut('slow');
}

//function to check load state of each frame
function allLoaded(){
  var results = [];
  $('iframe').each(function(){
    if(!$(this).data('loaded')){results.push(false)}
  });
  var result = (results.length > 0) ? false : true;
  return result;
};

function loadPage($frame, url) {
  if ( url.substr(0,7) !== 'http://' && url.substr(0,8) !== 'https://' && url.substr(0, 7) !== 'file://' ) {
    url = 'http://'+url;
  }
  $('iframe').not($frame).each(function(){showLoader($(this).parent().attr('id'));})
  $('iframe').not($frame).data('loaded', false);
  $('iframe').not($frame).attr('src', url);
}

$('.frame').each(function(){showLoader($(this).attr('id'))});

function setSlider(){
	$('#frames #inner').css('width', function(){
		var width = 0;
		$('.frame').each(function(){width += $(this).outerWidth() + 20});
		return width;
	  });

}

//when document loads
$(document).ready(function(){

	loadPage('', defaultURL);

	//query string
	var qsArray = window.location.href.split('?');
	var qs = qsArray[qsArray.length-1];

	if(qs != '' && qsArray.length > 1){
		$('#url input[type=text]').val(qs);
		loadPage('', qs);
	}

	setSlider();
	  
	  
  	
	// Add event handlers for device radio buttons 
	$('input[type=radio]').change(function(){
		$inputs = $('input[type=radio]:checked').val();
		
		$iFrame1 = document.getElementById("iframe1");
		$iFrame1dim = document.getElementById("frame1dimensions");
		
		$iFrame2 = document.getElementById("iframe2");
		$iFrame2dim = document.getElementById("frame2dimensions");
		
		switch ($inputs){
			case '1':
				// Small phone 
				
				$iFrame1.width='255';
				$iFrame1.height='320';
				
				
				$iFrame2.width='335';
				$iFrame2.height='240';
				
				$iFrame1dim.innerHTML="240 x 320";
				$iFrame2dim.innerHTML="320 x 240";
				
				setSlider();
				
				break;
			
			case '2':
				// Small tablet 
				
				$iFrame1.width='495';
				$iFrame1.height='640';
							
				$iFrame2.width='655';
				$iFrame2.height='480';
				
				$iFrame1dim.innerHTML="480 x 640";
				$iFrame2dim.innerHTML="640 x 480";
				
				setSlider();
				
				break;
		
			case '3':
				// iPhone
				$iFrame1.width='355';
				$iFrame1.height='480';
				
				$iFrame2.width='495';
				$iFrame2.height='340';
				
				$iFrame1dim.innerHTML="340 x 480";
				$iFrame2dim.innerHTML="480 x 340";
				
				setSlider();
				
				break;
				
			case '4':
				// iPad
				$iFrame1.width='783';
				$iFrame1.height='1024';
				
				$iFrame2.width='1039';
				$iFrame2.height='768';
				
				$iFrame1dim.innerHTML="768 x 1024";
				$iFrame2dim.innerHTML="1024 x 768";
				
				setSlider();
				
				break;
				
			
				
		}
	
		
	
	});
	
	  //add event handlers for scrollbars checkbox
	  $('input[type=checkbox]').change(function(){
		var scrollBarWidth = 15;
		$frames = $('#frames');
		$inputs = $('#scrollbar:checked');

		if( $inputs.length == 0 ){
		  scrollBarWidth = -15;
		}

		$frames.find('iframe').each(function(i,el) {
		  $(el).attr('width', parseInt($(el).attr('width')) + scrollBarWidth);
		});
		
		setSlider();
		
	  });

	  //when the url textbox is used
	  $('form').submit(function(){
		loadPage('' , $('#url input[type=text]').val());
		return false;
	  });

	  //when frame loads
	  $('iframe').load(function(){

		var $this = $(this);
		var url = '';
		var error = false;

		try{
		  url = $this.contents().get(0).location.href;
		} catch(e) {
		  error = true;
		  if($('#url input[type=text]').val() != ''){
			url = $('#url input[type=text]').val();
		  } else {
			url = defaultURL;
		  }
		}

		//load other pages with the same URL
		if(allLoaded()){
		  if(error){
			alert('Browsers prevent navigation from inside iframes across domains.\nPlease use the textbox at the top for external sites.');
			loadPage('', defaultURL);
		  }else{
			loadPage($this, url);
		  }
		}

		//when frame loads, hide loader graphic
		else{
		  error = false;
		  hideLoader($(this).parent().attr('id'));
		  $(this).data('loaded',true);
		}
	  });

});