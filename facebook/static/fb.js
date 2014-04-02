
window.fbAsyncInit = function() {
    FB.init({
        appId      : '296283050520635',
        status     : true,
        cookie     : true,
        xfbml      : true 
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
            //albums();
            photos();
        } else if (response.status === 'not_authorized') {
            FB.login();
        } else {
            FB.login();
        }
    });
};

(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function albums() {
    FB.api('/me/albums', function(response) {
        console.log(response);
        //albums = response.data;
        //console.log(albums);
    });
}

function photos() {
    FB.api(
        "/fql", 
        {q: "SELECT pid, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() limit 10"}, 
        function(response){
            if (response && !response.error) {
                //console.log(response.data);
                draw_thumbs(response.data);
            }
        }
    );
}

function draw_thumbs(data) {

    $(data).each(function() {
        $("#mygallery").append(
          "<li>" +
          "<a href=" + this.src_big + " data-lighter>" +
				  "<img alt=" + this.pid + " src=" + this.src_big + " />" +
          "</a></li>");
    });
}

