
window.fbAsyncInit = function() {
    FB.init({
        appId      : '296283050520635',
        status     : true,
        cookie     : true,
        xfbml      : true 
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
            //photos();
        } else if (response.status === 'not_authorized') {
            FB.login();
        } else {
            FB.login();
        }
    });

    FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.status === 'connected') {
            //photos();
            photos_all();
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
        {q: "SELECT pid, images, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() limit 10"}, 
        function(response){
            if (response && !response.error) {
                //console.log(response.data);
                draw_thumbs(response.data);
            } else {
                console.log(response.message);
            }
        }
    );
}

function photos_all() {
    FB.api(
        "/fql", 
        {q: "SELECT pid, images, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() limit 1000"}, 
        function(response){
            if (response && !response.error) {
                //console.log(response);
                draw_thumbs(response.data);
            } else {
                console.log(response.message);
            }
        }
    );
}

function draw_thumbs(data) {
    var _idx = {};
    var i = 1;
    $(data).each(function() {

        if (i < 100) { 
            $("#thumbnails .clearfix").append(
              "<li><a class=\"gallery\" data-lightbox=\"group 1\" data-title=" + moment.unix(this.created).format('YYYY-MM-DD HH:mm') + " href=" + this.src_big + ">" +
            "<img src=" + this.src + " ></a></li>");
        }

        //console.log("backdated_time: " + 
        //  moment.unix(this.backdated_time).format('YYYY-MM-DD HH:mm'));
        //console.log(moment.unix(this.created).format('YYYY-MM-DD HH:mm'));

        var _year  = moment.unix(this.created).format('YYYY');
        var _month = moment.unix(this.created).format('MM');

        if (_idx.hasOwnProperty(_year)) {
            if (_idx[_year].hasOwnProperty(_month)) {
                _idx[_year][_month] += 1;
            } else {
                _idx[_year][_month] = 1;
            }
        } else {
            _idx[_year] = {}; // create new object
            _idx[_year][_month] = 1;
        }

        i++;
    });
    //console.log(_idx);
    draw_navibar(_idx)
}

function draw_dropdown(data) {
    $(data).each(function() {
    });
}

function draw_navibar(data) {
    $.each(data, function(year, month) {
        //console.log(year, month);

        $.each(data[year], function(month) {

            if ($('#' + year).length) {
                //console.log(year + 'exists');
            } else {
                $('.list-group').prepend(
				"<li class=\"list-group-item\"> <a href=\"#\" id=" + year + ">" + year + "<span class=\"badge\"></span></a> </li>");

        	      //"<ul class=\"nav nav-list\"> </ul>");
            }

            if ($('#' + year > '.' + month).length) {
                console.log(year + '/' + month + 'exists');
            } else {
                console.log(month);
            }

        });

    });
}





