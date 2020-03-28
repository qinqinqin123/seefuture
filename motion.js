$(function() {
    $("#addtrans").click(function() {      
        
        //创建一个div  
        var div = document.createElement("div");
        div.id = "translator";
        //为div创建属性class = "viewPoint"  
        var divattr = document.createAttribute("class");
        divattr.value = "viewPoint scale-up-ver-center ";
        //把属性class = "viewPoint"添加到div  
        div.setAttributeNode(divattr);

        //把div追加到body  
        document.getElementsByTagName("body").item(0).appendChild(div);

        var a=2;
        $('.viewPoint').draggable({
            start: function(event, ui) { $(this).css("z-index", a++);}
        });
        $('.viewPoint').click(function() {$(this).css("z-index", a++);});

        $('#addtrans').attr("disabled","true");



      });
  });


  $(function() {
    $("#adddic").click(function() {
          //创建一个div  
          var div = document.createElement("div");
          div.id = "dictionary";
          //为div创建属性class = "viewPoint"  
          var divattr = document.createAttribute("class");
          divattr.value = "viewPoint";
          //把属性class = "viewPoint"添加到div  
          div.setAttributeNode(divattr);
  
          //为div添加样式  
        //   var style = document.createAttribute("style");
        //   div.setAttributeNode(style);
        //   div.style.backgroundColor = "rgb(1,135,206)";
        //   div.style.borderWidth = "20px";
        //   div.style.borderColor = "#000";
        //   div.style.width = "240px";
        //   div.style.height = "500px";
        //   div.style.position = "absolute";
        //   div.style.left = "10px";
        //   div.style.top = "65px";
          //div.style.z-index = "99999";	//iframe的z-index设为-1
  
          //把div追加到body  
          document.getElementsByTagName("body").item(0).appendChild(div);
          addtranslator();
          var a=2;
          $('.viewPoint').draggable({
            start: function(event, ui) { $(this).css("z-index", a++);}
          });
          $('.viewPoint').click(function() {$(this).css("z-index", a++);});

          $('#adddic').attr("disabled","true");
      });
  });

  $(function() {
    $("#addlucky").click(function() {
          //创建一个div  
          var div = document.createElement("div");
          div.id = "lucky";
          //为div创建属性class = "viewPoint"  
          var divattr = document.createAttribute("class");
          divattr.value = "viewPoint";
          //把属性class = "viewPoint"添加到div  
          div.setAttributeNode(divattr);
  
          //为div添加样式  
        //   var style = document.createAttribute("style");
        //   div.setAttributeNode(style);
        //   div.style.backgroundColor = "rgb(1,135,206)";
        //   div.style.borderWidth = "20px";
        //   div.style.borderColor = "#000";
        //   div.style.width = "240px";
        //   div.style.height = "500px";
        //   div.style.position = "absolute";
        //   div.style.left = "10px";
        //   div.style.top = "65px";
        //   div.style.z-index = "0";	//iframe的z-index设为-1
  
          //把div追加到body  
          document.getElementsByTagName("body").item(0).appendChild(div);

          var a=2;
          $('.viewPoint').draggable({
            start: function(event, ui) { $(this).css("z-index", a++);}
          });
          $('.viewPoint').click(function() {$(this).css("z-index", a++);});

          $('#addlucky').attr("disabled","true");
      });
  });


function addtranslator(){

  var title = document.createElement("div");
  title.id = "translator_title";
  document.getElementsById("translator").item(0).appendChild(title).innerHTML= "google coding"
}

$(document).on('mousemove', function(e) {
  var x = e.pageX;
  var y = e.pageY;
  var w = $(this).width();
  var h = $(this).height();
  var angle = Math.atan2(y-(h/2), x-(w/2)) * (180/Math.PI);
  var rotate = angle + (180-45);
  $('.eye1 ')
      .css('-webkit-transform', 'rotate('+rotate+'deg)')
      .css('-moz-transform', 'rotate('+rotate+'deg)')
      .css('-ms-transform', 'rotate('+rotate+'deg)')
      .css('-o-transform', 'rotate('+rotate+'deg)')
      .css('transform', 'rotate('+rotate+'deg)');
});
// update;