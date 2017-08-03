$( document ).ready(function() {



   socialFeed = function(target, access_token, page) {

    $access = access_token;

    $.getJSON('https://graph.facebook.com/'+page+'/feed?access_token='+$access, function (data) {
     // Check to ensure that you are actually receiving data back
     //console.log(data);

     var nastepny = data.paging.next;
     var divek = target;
     $('.more').click(function() {
      getNext(nastepny, divek);
    });

     $('.more').attr("next-id", nastepny);

       $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      setTimeout(function() {
        getNext($('.more').attr('next-id'), divek);
      }, 2000);


    }
  });



     //console.log(nastepny);
     // Attempt to iterate through each of the values of your data response
     var ilo = 0;

     $.each(data.data, function (i, item) {


      var id = item.id;
      if(this.hasOwnProperty('message')){
        var message = item.message;
      } else {
        var message = '';
      }

      // getAttachments(id);

      var text = '<div class="text">'+message+'</div>';

      $('body').find('.social-box'+ilo).attr('data-id', id);

      $.ajax({
        url: 'https://graph.facebook.com/v2.9/'+id+'?fields=full_picture,link,created_time%2Cpicture&access_token='+$access,
        async: true,
        dataType: 'json',
        success: function (json) {
          mydata = json.full_picture;
          source = json.link;
          time = json.created_time;
          datatas = time.substr(0, 10);
          datat = time.substr(0, 10);
          datat = datat.split('-');
          datat = datat[0]+datat[1]+datat[2];
          var text = '<div class="text">'+message+'</div>';
          var pierwszy = new Date($(target).find('> div:nth-child(1)').attr('time'));

          var element = '<div time="'+time+'" more-id="'+id+'" class="col-xs-12 col-sm-6 col-md-4 feedsingle"><div class="box-fb"><div img-href="'+mydata+'" class="weselne-oferty" style="background-image:url('+mydata+')"></div><div class="czas"><i class="fa fa-calendar" aria-hidden="true"></i> '+datatas+' | <a target="_blank" href="'+source+'">FB link</a></div>'+text+'</div></div>';
          if (pierwszy > new Date(time) || pierwszy == null) {
            $(target).append(element);
            //console.log('wiekszy'+pierwszy+'>'+ new Date(time));
          } else {
            $(target).prepend(element);
          }
          ilo++;
          //console.log(ilo);

          if (ilo == 25) {
            kolejnosc();
          }

         // $(target).find('[data-id='+id+']').css('background-image', 'url('+mydata+')').attr('data-time', time).attr('data-link', source).append(text);
          //console.log(mydata);
        }
      });

      $('.more').addClass('on');


    });
     
   });


  }


  // function getAttachments(ids) {
  //   $.getJSON('https://graph.facebook.com/v2.9/'+ids+'/attachments?access_token='+$access, function (datas) {

  //   console.log(datas.data[0].subattachments.data);

  //   });
  // }






  $(document).on('click', '.box-fb', function() { 


    var ids = $(this).parent().attr('more-id');

    var url = 'https://graph.facebook.com/v2.9/'+ids+'/attachments?access_token='+$access;
    $.getJSON(url, function (datas) {



      var obj = recHasProp(datas, 'subattachments');
      if (obj) {
       var obrazki = datas.data[0].subattachments.data;
     }

     $.each(obrazki, function (i, item) {

      $('<div class="col-xs-12 col-sm-4 col-md-2"><a href="'+item.media.image.src+'" rel="lightbox[20]" class="photos" style="background-image:url('+item.media.image.src+')"></a></div>').appendTo('.popup-overlay .content');
    });


     var glowne = $('[more-id="'+ids+'"]').find('.weselne-oferty').attr('img-href');
     var textpop = $('[more-id="'+ids+'"]').find('.text').html();
     var dofb = $('[more-id="'+ids+'"]').find('.czas a').attr('href');

     $('<div class="col-md-12">\
      <div class="col-md-6 main-pop" style="background-image:url('+glowne+')"></div>\
      <div class="col-md-6">'+textpop+'<br><br><a class="more-button" target="_blank" href="'+dofb+'"><i class="fa fa-facebook-official" aria-hidden="true"></i> Zobacz więcej na facebook</a></div></div>').prependTo('.popup-overlay .content');

     $('.popup-overlay').addClass('on');




   });
  }); 


  function recHasProp(obj, prop) {
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (p === prop) {
          return obj;
        } else if (obj[p] instanceof Object && recHasProp(obj[p], prop)) {
          return obj[p];
        }
      }
    }
    return null;
  }





  function getNext(next, target1) {
 var target1 = target1;
    


   $.getJSON(next, function (data1) {
     // Check to ensure that you are actually receiving data back
     //console.log(data1);

     var nastepnya = data1.paging.next;
    // console.log(nastepnya);
    $( ".more").unbind( "click" );

    $('.more').click(function() {
     getNext(nastepnya);
   });

    $('.more').attr("next-id", nastepnya);


   

     // Attempt to iterate through each of the values of your data response
     var ilo = 0;
     $.each(data1.data, function (i, item) {
      ilo++;
      var id = item.id;
      if(this.hasOwnProperty('message')){
        var message = item.message;
      } else {
        var message = '';
      }

      


      var text = '<div class="text">'+message+'</div>';

      //$('body').find('.social-box'+ilo).attr('data-id', id);

      $.ajax({
        url: 'https://graph.facebook.com/v2.9/'+id+'?fields=full_picture,link,created_time%2Cpicture&access_token='+$access,
        async: true,
        dataType: 'json',
        success: function (json) {
          mydata = json.full_picture;
          source = json.link;
          time = json.created_time;
          datat = time.substr(0, 10);
          var text = '<div class="text">'+message+'</div>';
          $(target1).append('<div time="'+datat+'" more-id="'+id+'" class="col-xs-12 col-sm-6 col-md-4"><div class="box-fb"><div img-href="'+mydata+'" class="weselne-oferty" style="background-image:url('+mydata+')"></div><div class="czas"><i class="fa fa-calendar" aria-hidden="true"></i> '+datat+' | <a target="_blank" href="'+source+'">FB link</a></div>'+text+'</div></div>');



         // $(target).find('[data-id='+id+']').css('background-image', 'url('+mydata+')').attr('data-time', time).attr('data-link', source).append(text);
          //console.log(mydata);
        }
      });


    });
     
   });


 }

 $(document).on('click', ".social-box, .social-box-special", function() {


  $('.popup-overlay').addClass('on');

  var bg = $(this).css('background-image');
  bg = bg.replace('url("','').replace('")', '');
  $('<img src="'+bg+'">').appendTo('.popup-overlay .content');

  $(this).find('.text').clone().appendTo('.popup-overlay .title');
     // console.log($(this).attr('data-link'));
     var linker = $(this).attr('data-link');
     var datat = $(this).attr('data-time');
     datat = datat.substr(0, 10);
     var linkerdiv = $('<span class="find_more"><a target="_blank" href="'+linker+'">Find more '+datat+'</a></span>');
     linkerdiv.appendTo('.popup-overlay .content');
      //console.log(bg);
    });


 $('body').on('click', '.pop-up-close, .popup-overlay.on', function(e){
   if (e.target !== this)
    return;

  $('.popup-overlay').removeClass('on');

  $('.popup-overlay .content .login-form-pop').delay(500).queue(function(n) 
  {
    $(this).appendTo("body");
    n();
  });

  $('.popup-overlay .content, .popup-overlay .title').delay(500).queue(function(n) 
  {
    $(this).html("");
    n();
  });
});




 

 kolejnosc = function() {
  setTimeout(
    function(){
      var is = 0;
      var doSortowania = $(".feedsingle");
      //console.log(doSortowania);
      doSortowania.sort(function(a,b){
        return new Date($(a).attr("time")) > new Date($(b).attr("time"));
      }).each(function(){
        is++;
      //console.log('kolejnosc '+is);
      $(".feed").prepend(this);
      $('.more').css('display','table');
    });
    }, 3300);


  setTimeout(
    function(){
     $(".feed").css("visibility", "visible");
     $(".feed-loading").hide();
   }, 4000);
}





});