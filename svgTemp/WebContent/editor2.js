var draw;
var i=0;
var selectedElement;
var selectedElementId;
var SVGSelectedElement;
var draggyTemp;

$(document).ready(function(){
	draw = SVG('drawing').size('100%', '100%');
	$('svg').on('click',selectElement)
	
//	$(document).on('click',getClientXY);
});

function getClientXY(event) {
	/*var svg1 = $('#drawing > svg').first()[0];
	console.log(svg1.getBBox()+"\t"+svg1.offsetWidth)
	console.log("X: "+event.clientX+"\tY: "+event.clientY);*/
	
	console.log($("#rectangle1")[0].getBBox())
	console.log($("#text1")[0].getBBox())
	
}
function putRectangleInCenter() {
	var group = draw.group();
	
	var rect = group.rect(100, 100);
	var width = $("#drawing")[0].offsetWidth	
	var height = $("#drawing")[0].offsetHeight

	rect.attr({
		'data-tool':'rect',
		'id':'rectangle1', //'id':'rectangle'+i++,
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

	var x = rect.attr('x');
	var y = rect.attr('y');

	var width = rect.attr('width');
	var height = rect.attr('height');

	var text1 = group.text("First")
	.attr({
		'id':"text1",
		'font-size':12
	});
	
	var text2 = group.text("Seconed")
	.attr({
		'id':"text2",
		'font-size':12
	});
	
	var text3 = group.text("Third")
	.attr({
		'id':"text3",
		'font-size':12
	});
	
	var rectBbox = rect.bbox();
	var textBbox = text1.bbox();
	
    console.log(rectBbox)
    
     var finalX = rectBbox.x + (rectBbox.width/4) - (textBbox.width/2);
     var finalY = rectBbox.y - (textBbox.height+5);
     text1.move(finalX,finalY);
     
     //for text2
     textBbox = text2.bbox();
     finalX = rectBbox.x + ((rectBbox.width*3)/4) - (textBbox.width/2);
     finalY = rectBbox.y - (textBbox.height+5);
     text2.move(finalX,finalY);
     
     //for Text3
     textBbox = text3.bbox();
     finalX = rectBbox.x;
     finalY = rectBbox.y;
     text3.move(finalX,finalY);
     text3.transform({rotation:270});
	
//    textBbox = text2.bbox();
    
//    text2.move((rectBbox.cx + rectBbox.x + rectBbox.width)/2 - textBbox.cx, rectBbox.y - textBbox.cy-10 	);
//	group.add(text2);
}

function selectElement(event) {
//	console.log(event.target.nodeName);
	selectedElement = event.target;
	selectedElementId = event.target.id;
	if(selectedElement.nodeName != 'svg') {
		if(selectedElement.nodeName != 'g' && !$(selectedElement).hasClass("svg_select_points") && !$(selectedElement).hasClass("svg_select_points_rot")){
			SVGSelectedElement = SVG.get('#'+selectedElementId)
			startSelectOperation();
		}
	} else {
		deSelectElement();
//		alert("i am here")
	}
}

function startSelectOperation() {
	var selectedGroupId = $("#"+selectedElementId).closest('g').attr('id');
	
	/*if(selectedElement.nodeName == 'tspan') {
		selectedGroupId = $("#"+selectedElementId).parent().attr('id');
		SVGSelectedElement =  SVG.get('#'+selectedGroupId)
//		alert("i am here"+selectedElementId+"\t"+selectedGroupId);
		SVGSelectedElement.selectize({pointType: 'rect'}).addClass("selectedElement").attr({'data-selected':'selected'}).resize()
		.on("resizedone", function (event){
			console.log("resizeing done ")
			var text = SVG.get('#text1');
			var textBbox = text.bbox();
            
            var textWidth = textBbox.width;
            var textHeight = textBbox.height;
            
            var rectBbox = rect.bbox();
            text.move(rectBbox.cx - textWidth/2, rectBbox.cy - textHeight/2);
            
            //Handle Rotation here
            var transformMatrix = event.currentTarget.attributes.transform.nodeValue;
            text.attr("transform", transformMatrix);
        });;
		SVGSelectedElement.draggy();
	}*/
	if(selectedElement.nodeName != 'tspan') {
		var selectedGroup = SVG.get('#'+selectedGroupId);
		SVGSelectedElement.selectize({pointType: 'rect'}).addClass("selectedElement").attr({'data-selected':'selected'}).resize()
		.on("resizing", function (event){
			resizingOperations();
			/*var text = SVG.get('#text1');
			var textBbox = text.bbox();
	        
			var rect = SVG.get('#rectangle1');
	        var rectBbox = rect.bbox();
			
	         var finalX = (rectBbox.cx + rectBbox.x)/2 - textBbox.x;
	         var finalY = rectBbox.y - textBbox.cy-10;
	         console.log(rectBbox);
	         console.log("--------------------------------- textBox down -------------------")
	         console.log(textBbox);
	         text.move(finalX,finalY);*/
	         
	         
//	         text.move(rectBbox.cx - textWidth/2, rectBbox.cy - textHeight/2);
//	         console.log("===="+finalX+"\t"+finalY+"======"+event.currentTarget);
//			text.move(rectBbox.cx - textBbox.cx, rectBbox.cy - textBbox.cy);
		})
		.on("resizedone", function (event){
//			console.log("======================resizeing done "+event.currentTarget+"===============")
			var text = SVG.get('#text1');
			var textBbox = text.bbox();

			var textWidth = textBbox.width;
			var textHeight = textBbox.height;

			var rect = SVG.get('#rectangle1');
			var rectBbox = rect.bbox();
//			console.log(rectBbox );
			
			//Handle Rotation here
			if(event.currentTarget.attributes.transform) {
				var transformMatrix = event.currentTarget.attributes.transform.nodeValue;
				text.attr("transform", transformMatrix);
				//For text2
				text = SVG.get('#text2');
				text.attr("transform", transformMatrix);
			}
		});
		
		draggyTemp = selectedGroup.draggy();
	}
}

function resizingOperations() {
	var text = SVG.get('#text1');
	var textBbox = text.bbox();
    
	var rect = SVG.get('#rectangle1');
    var rectBbox = rect.bbox();
    
	
     var finalX = rectBbox.x + (rectBbox.width/4) - (textBbox.width/2);
     var finalY = rectBbox.y - (textBbox.height+5);
     console.log(rectBbox);
     console.log("--------------------------------- textBox down 2 -------------------")
     console.log(textBbox);
     text.move(finalX,finalY);
     
     //For text2
     text = SVG.get('#text2');
     textBbox = text.bbox();
     finalX = rectBbox.x + ((rectBbox.width*3)/4) - (textBbox.width/2);
     finalY = rectBbox.y - (textBbox.height+5);
     text.move(finalX,finalY);
     
     //for text3
     text = SVG.get('#text3');
     textBbox = text.bbox();
     finalX = rectBbox.x;
     finalY = rectBbox.y;
     text.move(finalX,finalY);
//     text3.transform({rotation:270});
}

function deSelectElement() {
	var elements = SVG.select("[data-selected=selected]");
	elements.each(function(index,element){
		element[0].selectize(false).resize('stop');
		draggyTemp.fixed();
	});

	$("[data-selected=selected]").removeClass("selectedElement").removeAttr("data-selected");
}
/*
if(event.target.nodeName == 'tspan') {
		dragText(event);
	} else if(event.target.nodeName != 'svg') {
		if(event.target.nodeName != 'g') { //svg_select_points_rot
			if(!$(event.target).hasClass("svg_select_points") && !$(event.target).hasClass("svg_select_points_rot")) {
				var id = event.target.id;
				var element = SVG.get('#'+id);
				element.selectize({pointType: 'rect'}).addClass("selectedElement").attr({'data-selected':'selected'});
				
				//resizing
				element.resize().on('resizing',function(e){

				})
				element.resize().on('resizedone',function(e){
					
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

*/