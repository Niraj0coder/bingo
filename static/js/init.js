$(document).ready(function(){

	const modal = $('.modals');
	slideIndex = 1;

	$('.showModal').click(function(event){

		var storyid = event.currentTarget.name;

		$.ajax({
			type: 'GET',
			url: '/stories/showmedia/'+ storyid,
			dataType: 'json',

			success: function(data){
				$.each(data,function(i,v){

					if (v.content.slice(v.content.length - 3) === 'mp4'){
						var div_slides_html = '<div  class="mySlides"><video  width="640" controls="controls" preload="metadata"><source src="/media/'+ v.content + '#t=0.5" type="video/mp4"></video></div>'
					} else {
						var div_slides_html = '<div class="mySlides"><img style="height:300px" src="/media/'+ v.content +'" style="width:100%"><div class="text">'+ v.caption +'</div></div>'
					}

					$('#jsondata').append(div_slides_html);


				});

			}, 

			complete: function(){
				showSlides(slideIndex);
			}

		});

		modal.addClass('is-active');
	});

	$('#closeModal').click(function(){
	
		const slides = document.getElementById('jsondata');
		slides.innerHTML = '';
		modal.removeClass('is-active');
	});


});