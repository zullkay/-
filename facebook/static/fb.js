

function photos_all() {
    FB.api(
        "/fql", 
        {q:{
        "query1": "SELECT pid, images, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() limit 1000", 
        "query2": "SELECT pid, images, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() limit 1000"}}, 
        function(response){
            if (response && !response.error) {
                console.log(response);
                draw_thumbs(response.data[0].fql_result_set);
            } else {
                console.log(response.message);
            }
        }
    );
}

function photos_range(from_ts, to_ts) {
    FB.api(
        "/fql", 
        {q:{
        "query1": "SELECT pid, images, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() and created between " + from_ts + " and " + to_ts + " limit 1000", 
        "query2": "SELECT pid, images, src, src_small, src_big, caption, created, backdated_time, owner FROM photo WHERE owner = me() limit 1000"}}, 
        function(response){
            if (response && !response.error) {
                console.log(response);
                draw_thumbs(response.data[0].fql_result_set);
            } else {
                console.log(response);
                //console.log(response.message);
            }
        }
    );
}

function all_album_name() {
    FB.api(
        "/fql", 
        {q: "SELECT object_id, name FROM album where owner = me()"}, 
        function(response){
            if (response && !response.error) {
                console.log(response);
            } else {
                console.log(response.message);
            }
        }
    );
}

function draw_thumbs(data) {
    var o = {};
    var i = 1;
    $(data).each(function() {

        var album_caption = "";

        if (i < 100) { 
            $("#thumbnails .clearfix").append(
              "<li><a class=\"gallery\" data-lightbox=\"group 1\" data-title=\"" + moment.unix(this.created).format('YYYY-MM-DD HH:mm') + ' ' + this.caption + "\" href=" + this.src_big + ">" +
            "<img src=" + this.src + " ></a></li>").hide().fadeIn();
        }

        var _year  = moment.unix(this.created).format('YYYY');
        var _month = moment.unix(this.created).format('MM');
        _month = parseInt(_month, 10);

        if (o.hasOwnProperty(_year)) {
            if (o[_year].hasOwnProperty(_month)) {
                o[_year][_month] += 1;
            } else {
                o[_year][_month] = 1;
            }
        } else {
            o[_year] = {}; // create new object
            o[_year][_month] = 1;
        }

        i++;
    });
    //console.log(o);
    draw_navibar(o)
}

function draw_navibar(data) {
    //console.log(data);
    $.each(data, function(year, months) {
        //console.log(year, months);

        if ($('#' + year).length) {
            //console.log(year + 'exists');
        } else {
            $('.col-md-2 > .list-group').prepend(
    "<li class=\"list-group-item\" id=" + year + ">" + year + "<span class=\"badge\"></span><ul></ul></li>").hide().fadeIn();
        }

        $.each(months, function(month, value) {
            if ($('#' + year + '_' + month).length) {
                console.log(year + '/' + month + 'exists');
            } else {
                //console.log(month);
                $('#' + year + ' > ul').append(
          "<li><a href=\"#" + year + month + "\" class=\"range_photo\" id=" + year + '_' + month + " data-year=" + year + " data-month=" + month + ">" + month + "月</a><span class=\"badge pull-right\">" + value + "</span></li>");
            }
        });

    });
}

