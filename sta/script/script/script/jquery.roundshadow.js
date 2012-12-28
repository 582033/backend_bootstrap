/*
	VERSION :  Round Shadow Panel jQuery Plugin 0.2 (02-16-2011)
	REQUIRES :  jQuery v1.4.* or later
	SYNTAX :  $(selector).roundShadow(options);  // add round and shadow effect to elements

	OPTIONS :
		theme{String} -- the method will be used to roundShadow elements,
							there is three options:
							1.'default' or none : use function defaultRoundShadow.
								This method will change the elements' inheritance relationship,which will be roundShadowed.
							2.'simple' : use function simpleRoundShadow.
								This method will not change the inheritance relationship of the elements that will be roundShadowed,
								but you should customize a css style for them.There is a default css style,if you don't specify your
								css style,the default will be used.
							3.'css' : use functon cssRoundShadow.
								This method just display normally in the browsers that support css3,
								and in IE the round corner will not display.
		the other key/value correspondes with the options of function used
	
	NOTICE : You'd better not to use the three methods on one element,otherwise the effect will be ugly.

	Licensed under the GPL :  http : //gplv3.fsf.org
	Copyright 2011 flytreeleft (flytreeleft@126.com)
*/
;(function(jQuery){
	/**
	 * roundShadow elements
	 * @param {Map} options :
	 *					theme{String} -- the method will be used to roundShadow elements,
	 *										there is three options:
	 *										1.'default' or none : use function defaultRoundShadow
	 *										2.'simple' : use function simpleRoundShadow
	 *										3.'css' : use functon cssRoundShadow
	 *					the other key/value correspondes with the options of function used
	 * @return {jQuery}
	 */
    jQuery.fn.roundShadow = function(options){
		var opts = jQuery.extend({},jQuery.fn.roundShadow.defaults,options);
		var panels = jQuery(this);

		if(opts.theme == 'simple'){
			// use function simpleRoundShadow to roundShadow elements
			panels.simpleRoundShadow(opts);
		} else if(opts.theme == 'css'){
			// use function cssRoundShadow to roundShadow elements
			panels.cssRoundShadow(opts);
		} else {
			// use function defaultRoundShadow to roundShadow elements
			panels.defaultRoundShadow(opts);
		}

		return panels;
    };
	// default options for function $.roundShadow()
	jQuery.fn.roundShadow.defaults = {
		theme : 'default'
	};
	/**
	 * default method to roundShadow elements
	 * @param {Object} options :
	 *						radius{String,Number} -- the radius value of round corner,default '12px'
	 *						tag{String} --  the HTML tag that will wrap the panel's text node,
	 *											if isn't specified,it will be '<div></div>'
	 * @return {jQuery}
	 */
	jQuery.fn.defaultRoundShadow = function(options){
		var opts = jQuery.extend({},jQuery.fn.defaultRoundShadow.defaults,options);
		var panels = jQuery(this);
		var size = panels.size();

		return panels.each(function(i,p){
			// from last to first,just insure the children will be roundShadowed first
			var index = size - 1 - i;
			var panel = jQuery(panels.get(index));

			// relocate this element's brothers
			panel.relocateBrothers({top : 2*parseFloat(opts.radius),left : 2*parseFloat(opts.radius)});
			// add round shadow effect,and save new node
			panels[index] = defaultRoundShadow(panel.textNodeWrap(opts.tag));
		});
	};
	// default options for function $.defaultRoundShadow
	jQuery.fn.defaultRoundShadow.defaults = {
		radius : '12px',
		tag : '<div></div>'
	};
	/**
	 * simple means this method doesn't change the inheritance relationship between the element that is roundShadowed and it's parent
	 * @param {Object} options :
	 *					prefix{String} -- the prefix of round-shadow css style's name,
	 *										if isn't specified,it will be 'simple-round-shadow'
	 *					tag{String} -- the HTML tag that will wrap the panel's text node,
	 *											if isn't specified,it will be '<div></div>'
	 */
	jQuery.fn.simpleRoundShadow = function(options){
		var opts = jQuery.extend({},jQuery.fn.simpleRoundShadow.defaults,options);

		return jQuery(this).each(function(){
			var panel = jQuery(this);
			var opt = jQuery.meta ? jQuery.extend({},opts,panel.data()) : opts;

			// wrap this panel's text node
			panel.textNodeWrap(opt.tag);
			// add round-shadow effect
			simpleRoundShadow(panel,opt);
		});
	};
	// defalut options for function $.simpleRoundShadow()
	jQuery.fn.simpleRoundShadow.defaults = {
		prefix:'simple-round-shadow',
		tag:'<div></div>'
	};
	/**
	 * use css3 to roundShadow elements
	 * @param {Object} options :
	 *					shadowXOffset{String,Number} -- offset value of the shadow in X position,default '1px'
	 *					shadowYOffset{String,Number} -- offset value of the shadow in Y position,default '1px'
	 *					shadowDepth{String,Number} -- the shadow's depth,default '4px'
	 *					shadowColor{String} -- the shadow's color,default '#000000'
	 *					roundRadius{String,Number} -- the round corner's radius,default '10px'
	 *					border{String} -- the element's border style,default '1px solid #000000'
	 * @return {jQuery}
	 */
	jQuery.fn.cssRoundShadow = function(options){
		var opts = jQuery.extend({},jQuery.fn.cssRoundShadow.defaults,options);

		return jQuery(this).each(function(){
			var panel = jQuery(this);
			var opt = jQuery.meta ? jQuery.extend({},opts,panel.data()) : opts;

			cssRoundShadow(panel,opt);
		});
	};
	// default options for function $.cssRoundShadow()
	jQuery.fn.cssRoundShadow.defaults = {
		shadowXOffset : '1px',
		shadowYOffset : '1px',
		shadowDepth : '4px',
		shadowColor : '#000000',
		roundRadius : '10px',
		border : 'none'
	};
	/**
	 * wrap the specified tag to elements' text node
	 * @param {String,jQuery} tag -- the html tag that will wrap the elements' text node,
	 *									if it isn't specified,'<div></div>' will be used
	 * @return {jQuery}
	 */
	jQuery.fn.textNodeWrap = function(tag){
		var tag = tag ? tag : jQuery.fn.textNodeWrap.tag;

		return jQuery(this).each(function(){
			textNodeWrap(jQuery(this),tag);
		});
	};
	// default tag for function $.textNodeWrap()
	jQuery.fn.textNodeWrap.tag = '<div></div>';
	/**
	 * relocate elements' brothers,
	 * every brother's top and left will add the number that specified by parameter,whose position style is absolute or fixed
	 * @param {Object{top,left}} options -- the increment number of brothers' top and left
	 *						top{String,Number} -- increment number that the top of brothers' position will be added,
	 *								the pixel value is valid,default is '0px'
	 *						left{String,Number} -- increment number that the left of brothers' positon will be added
	 *								the pixel value is valid,default is '0px'
	 * @return {jQuery}
	 */
	jQuery.fn.relocateBrothers = function(options){
		var opts = jQuery.extend({top : '0px',left : '0px'},options);

		return jQuery(this).each(function(){
			relocateBrothers(jQuery(this),opts);
		});
	};
	/**
	 * add round-shadow effect to this element. this is default method that will be used
	 * @param {jQuery,String} element -- the element that will be roundShadowed
	 * @return {jQuery} this object's html is same with the specified element,
	 *					but it isn't the old element,it's inheritance is changed
	 */
	function defaultRoundShadow(element){
		var element = jQuery(element);
		var roundPanel;
		var centerBoard;
		
		// if the element has been roundShadowed,just return
		if(element.parent().attr("class") == "round-shadow-center-board"){
			return element;
		}
		// construct the round shadow panel table
		roundPanel = jQuery(
			  '<div class="default-round-shadow">'
			+ '<table border="0" cellspacing="0" cellpadding="0">'
			+	  '<tr class="round-shadow-top">'
			+		  '<td class="round-shadow-top-left"></td>'
			+		  '<td class="round-shadow-top-edge"></td>'
			+		  '<td class="round-shadow-top-right"></td>'
			+	  '</tr>'
			+	  '<tr class="round-shadow-body">'
			+		  '<td class="round-shadow-left-edge"></td>'
			+		  '<td class="round-shadow-center-board"></td>'
			+		  '<td class="round-shadow-right-edge"></td>'
			+	  '</tr>'
			+	  '<tr class="round-shadow-bottom">'
			+	  	  '<td class="round-shadow-bottom-left"></td>'
			+		  '<td class="round-shadow-bottom-edge"></td>'
			+		  '<td class="round-shadow-bottom-right"></td>'
			+	  '</tr>'
			+ '</table>'
			+ '</div>'
		).css({
			'position' : element.css('position'),
			'top' : element.css('top'),
			'left' : element.css('left'),
			'margin-top' : element.css('margin-top'),
			'margin-right' : element.css('margin-right'),
			'margin-bottom' : element.css('margin-bottom'),
			'margin-left' : element.css('margin-left')
		});
		// change the element's margin to zero
		element.css({'margin' : '0px','position' : 'static'});
		// append this element to round shadow table
		centerBoard = roundPanel.find(".round-shadow-body .round-shadow-center-board").append(element.clone());
		// replace this element
		element.replaceWith(roundPanel);
		// return the new node
		return centerBoard.children().last();
	};
	/**
	 * add simple round-shadow effect to the specified element
	 * @param {jQuery,String} element -- the object that will be added round-shadow effect
	 * @param {Object{prefix}} opt :
	 *					prefix{String} -- the prefix of round-shadow css style's name,
	 *										must be specified
	 * @return none
	 */
	function simpleRoundShadow(element,opt){
		var element = jQuery(element);
		// one word cotain '-',so replace '-' to '_' for finding opt.prefix
		var classReg = new RegExp("\\b"+opt.prefix.replace(/\-/g,'_')+"\\b");
		
		// if the element has been roundShadowed,just return
		if(classReg.test(element.attr('class').replace(/\-/g,'_'))){
			return;
		}

		if(opt && opt.prefix){
			var top = jQuery('<div class="'+opt.prefix+'-top"></div>');
			var space = jQuery('<div class="'+opt.prefix+'-space"></div>');
			var bottom = jQuery('<div class="'+opt.prefix+'-bottom"></div>');
			
			var topImgWH = getBgImgWH(opt.prefix+"-top");
			var bottomImgWH = getBgImgWH(opt.prefix+"-bottom");
			var bodyImgWH = getBgImgWH(opt.prefix+"-body");
			
			var marginTop = parseFloat(element.css('margin-top'));
			var marginBottom = parseFloat(element.css('margin-bottom'));
			var paddingLeft = parseFloat(element.css('padding-left'));
			var paddingRight = parseFloat(element.css('padding-right'));
			var pRL = Math.min(topImgWH.height,bottomImgWH.height);
			
			// if the background image isn't specified,just return
			if(topImgWH.width == 0 || topImgWH.height == 0
				|| bottomImgWH.width == 0 || bottomImgWH.height == 0
				|| bodyImgWH.width == 0){				
				return;
			}
			// add new css style to this element,and change the old background-color
			// to avoid displaying motely at left and right edges,and change it's width
			// to hold the background image
			element.addClass(opt.prefix+" "+opt.prefix+"-body").css({
				'background-color' : 'transparent',
				'background-repeat' : 'repeat-y',
				'width' : (bodyImgWH.width-2*pRL)+"px",
				'margin-top' : (marginTop+topImgWH.height)+"px",
				'margin-bottom' : (marginBottom+bottomImgWH.height)+"px",
				'padding-left' : (paddingLeft+pRL)+"px",
				'padding-right' : (paddingRight+pRL)+"px"
			});
			// modify the top's style to fit the element's margin and padding,
			// and prepend it to the element
			top.css({
				'float' : 'left',
				'height' : topImgWH.height+"px",
				'width' : topImgWH.width+"px",
				'margin' : "-"+topImgWH.height+"px 0px 0px -"+pRL+"px",
				'background-repeat' : 'no-repeat'
			});
			element.prepend(top);
			// modify the space's style and append it to the element
			space.css({
				'height' : bottomImgWH.height+"px",
				'margin' : "-"+bottomImgWH.height+"px 0px 0px",
				'background-color' : 'transparent'
			});
			element.append(space);
			// modify the bottom's style to fit the element's margin and padding,
			// and append it to the element
			bottom.css({
				'float' : 'left',
				'height' : bottomImgWH.height+"px",
				'width' : bottomImgWH.width+"px",
				'margin' : "0px 0px -"+bottomImgWH.height+"px -"+pRL+"px",
				'background-repeat' : 'no-repeat'
			});
			// add the round-shadow's bottom css style
			element.append(bottom);
		}
	};
	/**
	 * use css3 to roundShadow element
	 * @param element -- the element that will be roundShadowed
	 * @param {Object} opt :
	 *					shadowXOffset{String,Number} -- offset value of the shadow in X position
	 *					shadowYOffset{String,Number} -- offset value of the shadow in Y position
	 *					shadowDepth{String,Number} -- the shadow's depth
	 *					shadowColor{String} -- the shadow's color
	 *					roundRadius{String,Number} -- the round corner's radius
	 *					border{String} -- the element's border style
	 * @return none
	 * NOTICE : the unit of offset or depth or radius must be 'px'
	 */
	function cssRoundShadow(element,opt){
		var element = jQuery(element);

		if(opt){
			var numReg = /^\d+(px)?$/;

			if(!numReg.test(opt.shadowXOffset)
				|| !numReg.test(opt.shadowYOffset)
				|| !numReg.test(opt.shadowDepth)
				|| !numReg.test(opt.roundRadius)){

				return;
			}
			opt.shadowXOffset = parseFloat(opt.shadowXOffset);
			opt.shadowYOffset = parseFloat(opt.shadowYOffset);
			opt.shadowDepth = parseFloat(opt.shadowDepth);
			opt.roundRadius = parseFloat(opt.roundRadius);

			var direction = opt.shadowXOffset ? parseInt((1-Math.atan(opt.shadowYOffset/opt.shadowXOffset)/Math.PI)*180) : 90;
			var backgroundColor = element.css('background-color');

			if(jQuery.browser.msie && backgroundColor == 'transparent'){
				backgroundColor = 'white'; // set the element's background-color,or the text in element will display uglily
			}

			element.css({
				'padding' : opt.roundRadius,
				'box-shadow' : opt.shadowXOffset+'px '+opt.shadowYOffset+'px '+opt.shadowDepth+'px '+opt.shadowColor,
				'-moz-box-shadow' : opt.shadowXOffset+'px '+opt.shadowYOffset+'px '+opt.shadowDepth+'px '+opt.shadowColor,
				'-webkit-box-shadow' : opt.shadowXOffset+'px '+opt.shadowYOffset+'px '+opt.shadowDepth+'px '+opt.shadowColor,
				'filter' : 'progid:DXImageTransform.Microsoft.Shadow(Strength='+opt.shadowDepth+',Direction='+direction+',Color="'+opt.shadowColor+'")',
				'-ms-filter' : '"progid:DXImageTransform.Microsoft.Shadow(Strength='+opt.shadowDepth+',Direction='+direction+',Color="'+opt.shadowColor+'")"',
				'border' : opt.border,
				'-moz-border-radius' : opt.roundRadius,
				'-webkit-border-radius' : opt.roundRadius,
				'border-radius' : opt.roundRadius,
				'background-color' : backgroundColor
			});
		}
	};
	/**
	 * add HTML tag to the element's text node
	 * @param {jQuery} element -- the element whose text node will be wraped the specified tag
	 * @param {String,jQuery} tag -- the html tag that will wrap the element's text node,must be specified
	 */
	function textNodeWrap(element,tag){
		var element = jQuery(element);
		var childNodes = element[0].childNodes;
		var children = [];

		if(tag){
			// find the text node,and wrap the tag
			jQuery.each(childNodes,function(i,node){
				var blankReg = /^\s+$/g;
				// append html tag to the node if it is a text node and not blank.
				if(node.nodeType == 3 && !blankReg.test(node.nodeValue)) {
					children[i] = jQuery(tag).append(node.nodeValue);
				} else {
					children[i] = jQuery(node);
				}
			});
			// add new nodes
			element.empty();
			jQuery.each(children,function(i,child){
				element.append(child);
			});
		}
	};
	/**
	 * relocate the element's brothers' position
	 * @param {jQuery,String,Element} element -- the element whose brothers need to relocate
	 * @param {Object} opt -- the increment number of brothers' top and left
	 *						top{String} -- increment number that the top of brothers' position will be added
	 *						left{String} -- increment number that the left of brothers' positon will be added
	 */
	function relocateBrothers(element,opt){
		var element = jQuery(element);

		if(opt && opt.top && opt.left){
			var pos = element.position(); // get this element's position
			var t = parseFloat(pos.top) + parseFloat(element.height());
			var l = parseFloat(pos.left) + parseFloat(element.width());
			var reg = /^\d+(px)?$/;

			// validate the parameter
			if(!reg.test(opt.top) || !reg.test(opt.left)){
				return;
			}
			// get this element's brothers,and relocate it's brothers
			element.siblings().each(function(){
				var brother = jQuery(this);
				var pStyle = brother.css('position');

				// if the brother's position style is absolute or fixed,change it's top and left
				if(pStyle == 'absolute' || pStyle == 'fixed'){
					var top = parseFloat(brother.css('top'));
					var left = parseFloat(brother.css('left'));

					// the borther is on this element's bottom
					if(top >= t){
						top = (top + parseFloat(opt.top));
					}
					// the borther is on this element's left
					if(left >= l){
						left = (left + parseFloat(opt.left));
					}
					// change top and left
					brother.css({'top' : top + 'px','left' : left + 'px'});
				}
			});
		}
	};
	/**
	 * get the style's background-image's width and height
	 * @param {String} className -- the css class's name
	 * @return {Object{width,height}} the background image's width and height
	 */
	function getBgImgWH(className){
		var element = jQuery('<div class="'+className+'"></div>');
		var urlReg = /^url\("(.*)"\)$/;
		var image = new Image();
		var res = "";
		
		// in Opera and IE,the element must be add to document,
		// or you cann't get the css class's background-image's value
		jQuery(document.body).append(element.hide());
		res = urlReg.exec(element.css('background-image'));
		element.remove();
		
		if(res == null){
			return {width:0,height:0};
		} else {
			image.src = res[1];
			return {width:image.width,height:image.height};
		}
	};
})(jQuery);