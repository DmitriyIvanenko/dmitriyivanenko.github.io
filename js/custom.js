

// JavaScript Document

$(function() {
	$('.flags-track').each(function() {
		var track = $(this);

		if (track.children('.flags-set').length) {
			return;
		}

		var flagSet = $('<div class="flags-set"></div>').append(track.children().detach());
		var setWidth = track.parent().innerWidth();

		track.append(flagSet, flagSet.clone(true));
		track.css('--flags-set-width', setWidth + 'px');
		track.addClass('is-ready');
	});
});

$('#subscribeform').submit(function(){



	var action = $(this).attr('action');



		$("#mesaj").slideUp(750,function() {







		$('#mesaj').hide();



	$('#subsubmit')







			.after('')







			.attr('disabled','disabled');



	$.post(action, {







			email: $('#subemail').val()







		},







			function(data){







				document.getElementById('mesaj').innerHTML = data;







				$('#mesaj').slideDown('slow');







				$('#subscribeform img.subscribe-loader').fadeOut('slow',function(){$(this).remove()});







				$('#subsubmit').removeAttr('disabled');







				if(data.match('success') != null) $('#subscribeform').slideUp('slow');



			}







		);







		});







		return false;







	});