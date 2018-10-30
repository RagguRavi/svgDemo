var draw;
var i=0;


$(document).ready(function(){
	draw = SVG('drawing').size('100%', '100%');
	
	$('svg').on('click',selectElement)
	
//	SVG.on(drawing, 'click', resize);

//	$(document).click(function(e){
//		console.log("X Axis : " + e.pageX + " Y Axis : " + e.pageY);
//	});
	
//	$(document).on('click','rect',elementClicked);
});


function groupOperation() {
	var group = draw.group();

	var rect = draw.rect(100, 100);
	var width = $("#drawing")[0].offsetWidth	
	var height = $("#drawing")[0].offsetHeight

	group.attr({
		'data-tool':'rect',
		'id':'rectangle'+i++,
		'transform':'translate('+width/2+','+height/2+')',
		
		'fill-opacity': 0,
		stroke: '#000',
		'stroke-width': 1,
		'pointerEvents':'all'
	})

	
	/*
	 * 'x':width/2,
		':height/2,
		rect.transform({
		'rotation':123,
	})*/
	group.add(rect);

	var x = rect.attr('x');
	var y = rect.attr('y');

	var width = rect.attr('width');
	var height = rect.attr('height');

	var text1 = draw.text("").attr({'width':width});
	var tspan1 = text1.tspan("First program").attr({
		x:x+(width)/2,
		y:y-10
	});

	group.add(text1);
	/*var b = group.bbox();
	draw.rect(b.width, b.height).addClass('box').move(b.x, b.y)
	 */


}


function putRectangleInCenter() {
	var group = draw.group();
	
	var rect = draw.rect(100, 100);
	var width = $("#drawing")[0].offsetWidth	
	var height = $("#drawing")[0].offsetHeight

	rect.attr({
		'data-tool':'rect',
		'id':'rectangle'+i++,
		'x':width/2,
		'y':height/2,
		'fill-opacity': 0,
		stroke: '#000',
		'stroke-width': 1,
		'pointerEvents':'all'
	})

	/*rect.transform({
		'rotation':123,
	})*/
	group.add(rect);

	var x = rect.attr('x');
	var y = rect.attr('y');

	var width = rect.attr('width');
	var height = rect.attr('height');

	var text1 = draw.text("").attr({'width':width});
	var tspan1 = text1.tspan("First program").attr({
		x:x+(width)/2,
		y:y-10
	});
	
	group.add(text1);
	/*var b = group.bbox();
	draw.rect(b.width, b.height).addClass('box').move(b.x, b.y)
	*/
	
}

function dragText(event) {
	var tempId = event.target.id;
	var id = $("#"+tempId).closest('text').attr('id');
	console.log(id)
	var element = SVG.get('#'+id);
	element.selectize().resize();

}
function selectElement(event) {
//	console.log('selected element called');
//	console.log(event.target);
	if(event.target.nodeName == 'tspan') {
		dragText(event);
	} else if(event.target.nodeName != 'svg') {
		if(event.target.nodeName != 'g') { //svg_select_points_rot
			if(!$(event.target).hasClass("svg_select_points") && !$(event.target).hasClass("svg_select_points_rot")) {
				var id = event.target.id;
				var element = SVG.get('#'+id);
				element.selectize({pointType: 'rect'}).addClass("selectedElement").attr({'data-selected':'selected'});
				
				element.draggable().on('dragstart',function(e){
//					console.log('drag started')
					$("#"+event.target.id).next('text').hide();
				})
				
				element.draggable().on('dragend',function(e){
//					console.log('drag end')
					$("#"+event.target.id).next('text').show();
					//$(e.target).closest('g').attr({'transform':'translate('+e.detail.p.x+","+e.detail.p.y+')'});
					changeTextPosition(element);
				});
					//resizing
				element.resize().on('resizing',function(e){
					$("#"+event.target.id).next('text').hide();
				})
				element.resize().on('resizedone',function(e){
					$("#"+event.target.id).next('text').show();
					changeTextPosition(element);
				})
			}
		}	
	} else {//In case click on svg element
		var elements = SVG.select("[data-selected=selected]");
		elements.each(function(index,element){
			element[0].selectize(false).resize('stop').draggable(false);
		});

		$("[data-selected=selected]").removeClass("selectedElement").removeAttr("data-selected");
	}

}
/*function resize(event) {

	if($("[data-selected=selected]").length) {
		var elements = SVG.select("[data-selected=selected]");
		elements.each(function(index,element){
			element[0].selectize(false).resize('stop').draggable(false);
		});

		$("[data-selected=selected]").removeClass("selectedElement").removeAttr("data-selected");
	}


	if(!$(event.target).hasClass('selectedElement')) {
		var element = SVG.get('#'+event.target.id);
		console.log(element)
		element.selectize({pointType: 'rect',deepSelect:false}).addClass("selectedElement").attr({'data-selected':'selected'}).resize();
		element.resize().on('resizedone',function(e){
			changeTextPositionOnWidthChange(element);
		})
		
		element.draggable().on('dragmove',function(e){
//			console.log("moving pointmet "+e.detail.p.x+",\t"+e.detail.p.y)
			//$(e.target).closest('g').attr({'transform':'translate('+e.detail.p.x+","+e.detail.p.y+')'});
		});
		
		element.draggable().on('dragstart',function(e){
			$("#"+event.target.id).next('g').hide();
		})
		
		element.draggable().on('dragend',function(e){
//			console.log("moving pointmet "+e.detail.p.x+",\t"+e.detail.p.y)
			//$(e.target).closest('g').attr({'transform':'translate('+e.detail.p.x+","+e.detail.p.y+')'});
			changeTextPosition(element);
			$("#"+event.target.id).next('g').show();
		});
	}
}*/

function dragElement(event) {
	console.log("drag element called"+event.target.id);
	var element = SVG.get("#"+event.target.id);
	element.draggable();
}


function getPointsToPutText(rect) {
	var group = draw.group();
	var x = rect.attr('x');
	var y = rect.attr('y');
	
	var width = rect.attr('width');
	var height = rect.attr('height');
	
	var text1 = draw.text("").attr({'width':width});
	var tspan1 = text1.tspan("First program").attr({
		'x':width/2,
		'y':-10
	})
	
	/*var text2 = draw.text("");
	var tspan2 = text2.tspan("second world")
	tspan2.attr({
		'class':'textClass',
		'x':width/2,
		'y':height+15
	})*/

	group.attr({
		'class':'textClass',
	});
	//group.transform({x:x+(width)/2,y:y-10});
	group.add(text1)
	//group.add(text2)
	
	var id=rect.attr('id');	
	var mainGroupId = $("#"+id).next('g').attr("id");
	var mainGroup  = SVG.get('#'+mainGroupId)
	group.addTo(mainGroup)
}

function changeTextPosition(rect) {
	var x = rect.attr('x');
	var y = rect.attr('y');
	var width = rect.attr('width');
	var height = rect.attr('height');
	
	var id=rect.attr('id');
	var textId = $("#"+id).next('text').find('tspan').attr("id");
	var element  = SVG.get('#'+textId)
//	console.log(element+"\t"+textId+"\t"+id)
	
	element.attr({
		'x':x+(width/2),
		'y':y-10
	})
	
//	element.transform({x:x,y:y});
	/*element.children().foreach(function(e) {
		
	});*/
//	element.size(width,height);/
}

function changeTextPositionOnWidthChange(rect) {
	var x = rect.attr('x');
	var y = rect.attr('y');
	var width = rect.attr('width');
	var height = rect.attr('height');
	var id=rect.attr('id');
	var textId = $("#"+id).next('g').attr("id");
	var element  = SVG.get('#'+textId)
	element.size(width,height);
	/*console.log(rect)
	var id=rect.attr('id');
	$("#"+id).next('g').remove();
	getPointsToPutText(rect)*/
}

function addTextGroup() {
	var group = draw.group();
	var text1 = draw.text("");
	var tspan1 = text1.tspan("First world")
	tspan1.attr({
		'class':'textClass',
		'x':30,
		'y':-20
	});
	
	var text2 = draw.text("");
	var tspan2 = text2.tspan("second world")
	tspan2.attr({
		'class':'textClass',
		'x':30,
		'y':120
	})
	
	var text3 = draw.text("");
	var tspan3 = text3.tspan("third world")
	tspan3.attr({
		'class':'textClass',
		'x':-120,
		'y':30
	});
	
	var text4 = draw.text("");
	var tspan4 = text4.tspan("forth world")
	tspan4.attr({
		'class':'textClass',
		'x':120,
		'y':30
	})
	group.add(text1);
	group.add(text2);
	group.add(text3);
	group.add(text4);
	
}



function drawPolygon() {

	var poly2 = draw
	.polygon()
	.addClass('polygon')
	.draw({snapToGrid:20});

	poly2.on('drawstart', function(e){
		document.addEventListener('keydown', function(e){
			if(e.keyCode == 13){
				poly2.draw('done');
				poly2.off('drawstart');
			}
		});
	});

	poly2.on('drawstop', function(){
		poly2.selectize({pointSize:12,pointType:'circle', deepSelect: true});
		poly2.resize();
	});
}

function putTextInCenter() {
	
}

function elementClicked(e) {
	var elementId = $(e.target).closest('g').attr('id');
	console.log()
	var svgElement = SVG.get(elementId);
	console.log(svgElement);
	svgElement.selectize({pointType: 'rect',deepSelect:false}).addClass("selectedElement").attr({'data-selected':'selected'}).resize();
	svgElement.draggable().on('dragmove',function(e){
		e.preventDefault();
		console.log("moving pointmet "+e.detail.p.x+",\t"+e.detail.p.y)
		$("#"+elementId).attr({'transform':'translate('+e.detail.p.x+","+e.detail.p.y+')','x':e.detail.p.x,'y':e.detail.p.y});
		
	});
}

function makeDraggable(evt) {
    var svg = $(evt.target).closest('svg')[0];
    console.log(svg)
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchmove', drag);
    svg.addEventListener('touchend', endDrag);
    svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag);

    function getMousePosition(evt) {
      var CTM = svg.getScreenCTM();
      if (evt.touches) { evt = evt.touches[0]; }
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }

    var selectedElement, offset, transform;

    function startDrag(evt) {
      if (evt.target.classList.contains('selectedElement')) {
        selectedElement = evt.target;
        offset = getMousePosition(evt);

        // Make sure the first transform on the element is a translate transform
        var transforms = selectedElement.transform.baseVal;

        if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          // Create an transform that translates by (0, 0)
          var translate = svg.createSVGTransform();
          translate.setTranslate(0, 0);
          selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }

        // Get initial translation
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
      }
    }

    function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        var coord = getMousePosition(evt);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
    }

    function endDrag(evt) {
      selectedElement = false;
    }
  }
//if($("[data-selected=selected]").length) {
//var elements = SVG.select("[data-selected=selected]");
//elements.each(function(index,element){
//console.log(element[0])
//element[0].selectize(false).resize('stop');
//});

//$("[data-selected=selected]").removeAttr("data-selected");
//}

/*group.attr({
'stroke-width': 8,
'storke-opacity':1,
'fill':'none'
})*/