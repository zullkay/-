
window.fbAsyncInit = function() {
    FB.init({
        appId      : '296283050520635',
        status     : true,
        cookie     : true,
        xfbml      : true 
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
        } else if (response.status === 'not_authorized') {
            FB.login();
        } else {
            FB.login();
        }
    });

    FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.status === 'connected') {
            photos_all();
            //all_album_name();
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

