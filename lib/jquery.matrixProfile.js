(function ($) {
    $.matrixProfile= {        
		
		setOnEvent: function (i, container, settings) {      	
			
			
			
        }
    };
    var methods = {
		resetPosition: function(){
						  
			
		},
		init: function(options){
			 this.settings = {
               elementClass 		: 'element',
			   elementEvent			: 'click',
			   elementContent		: 'showContent',
			   cloneClass 			: 'clone',
			   cloneContentClass 	: 'content',
			   cloneCloseEvent		: 'click',
			   animation			: {	position :{	queue: true,
            									   	duration: 'slow',
												   	easing : ''},
			   							width	 :{	queue: true,
            									   	duration: 'fast',
													easing : ''},
										height	 :{ queue: true,
            										duration: 'slow',
													easing : 'easeOutBounce'
												  }				   	
				   					  }
			   
            };
            if (options) {
                $.extend(this.settings, options);
            }
            
			var settings = this.settings;
            
			return this.each(function (a) {          
				
				var wrap 		= $(this);
   				var wrapWidth 	= wrap.outerWidth();
   				var elements 	= wrap.find("."+settings.elementClass);
   	
				var clone 		= $("<div>").addClass(settings.cloneClass).html('<div class="'+settings.cloneContentClass+'"></div>').bind(settings.cloneCloseEvent, function() {
						$(elements).fadeTo('normal', 1);	
        				$(this).find("."+settings.cloneContentClass).html("");
						var data = $(this).data("position");
						$(this).animate({width: elementWidth,height: elementHeight, top: data.top,left:data.left }, {  
            				queue: true,
            				duration: 'slow',
							complete : function() {
                            	$(this).hide();
                        	}});
        				});
				wrap.prepend(clone);
   	
   				var size 			= $(elements).size();
   				var elementWidth 	= $(elements).eq(0).outerWidth();
   				var elementHeight 	= $(elements).eq(0).outerHeight();
   				var perRow 			= Math.round(wrapWidth/elementWidth); 
   				var rows 			= size/perRow; 
    
				$(elements).bind(settings.elementEvent, function() {
				var index 		= $(this).index(); 
				var prepLastCol	= index/perRow;
				var checkLast	= prepLastCol - Math.floor(prepLastCol); 
				var position 	= $(this).position();	
				var prepRow		= index/rows;
				var element 	= $(this);
		
				if(prepRow-Math.floor(prepRow) < 1 && prepRow-Math.floor(prepRow) > 0){
					row = Math.floor(prepRow) +1 ;
				}else{
					row = Math.floor(prepRow) ;
				}
		
				var anim1 = { left:position.left, top: position.top };
				var anim2 = { width: elementWidth*2 };
				var anim3 = { height: elementHeight*2 };
		
				if(checkLast == 0){ var anim2  = jQuery.extend({}, anim2 , { left: position.left-elementWidth}); }
		
				if(row == rows){  	var anim3  = jQuery.extend({}, anim3 , { top: position.top-elementHeight});	 }	
		 		settings.animation.height = jQuery.extend({}, settings.animation.height , { complete : function(){
						$(this).find("."+settings.cloneContentClass).html($(element).find("."+settings.elementContent).html());
					}});	 
				
				$(elements).stop(true, true).fadeTo('normal', 0.2);
				$(clone).find("."+settings.cloneContentClass+"").html("");
				$(clone).data("position",{'top':position.top,left:position.left})
				$(clone).stop(true, true).css({width: elementWidth,height: elementHeight}).show()
				.animate(anim1, settings.animation.position)
				.animate(anim2, settings.animation.width)
				.animate(anim3, settings.animation.height);
    		});
				
		});
		}	
	}
	
	$.fn.extend({            
		matrixProfile: function (method) {		
			 
    		if ( methods[method] ) {
      			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    		} else if ( typeof method === 'object' || ! method ) {
      			return methods.init.apply( this, arguments );
    		} else {
      			$.error( 'Method ' +  method + ' does not exist on jQuery.matrixProfile' );
    		}  
           
        }
    });
})(jQuery);