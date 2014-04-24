

function photos_all() {
    FB.api(
        '/fql',
        {q: {
        'query': 'SELECT pid, images, src, src_small, src_big, caption, ' +
          ' created, backdated_time, owner FROM photo WHERE owner = me()' +
          ' limit 1000'}
        },
        function(response) {
            if (response && !response.error) {
                //console.log(response);
                draw_thumbs(response.data[0].fql_result_set);
            } else {
                console.log(response.message);
            }
        }
    );
}

function photos_range(from_ts, to_ts) {
    // loading animation
    $('#thumbnails > .clearfix').waiting({ position: 'center center' });
    //$('#thumbnails > .clearfix').waiting({ fixed: true }); // whole page

    FB.api(
        '/fql',
        {q: {
        'query': 'SELECT pid, images, src, src_small, src_big, caption,' +
          ' created, backdated_time, owner FROM photo WHERE owner = me()' +
          ' and created >= ' + from_ts + ' and created < ' + to_ts +
          ' limit 1000'}
        },
        function(response) {
            if (response && !response.error) {
                draw_thumbs(response.data[0].fql_result_set);
            } else {
                console.log(response);
            }
        }
    );


}

function all_album_name() {
    FB.api(
        '/fql',
        {q: 'SELECT object_id, name FROM album where owner = me()'},
        function(response) {
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
    $('#thumbnails .clearfix > li').remove();
    //$('.spinner').fadeOut().remove();

    var f = function() {
        $('#thumbnails .clearfix > li').fadeIn();
    };

    var l = $(data).length;

    $.each(data, function(i, e) {

        var album_caption = '';
        var _year = moment.unix(this.created).format('YYYY');
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

        if (i < 100) {
            $('#thumbnails > .clearfix').append(
              '<li><a class="gallery" data-lightbox="group 1" data-title="' +
              moment.unix(this.created).format('YYYY-MM-DD HH:mm') + ' ' +
                this.caption + '" href=' + this.src_big + '>' +
            '<img src=' + this.src + ' ></a></li>');
        }

        // after complete
        if (i === l - 1) {
            $('#thumbnails > .clearfix > li').hide().fadeIn();

            // remove waiting animation
            if ($('.waiting-indicator').length > 0) {
                $('#thumbnails > .clearfix').waiting('done');
            }
        }

    });
    //console.log(o);
    //$('#thumbnails .clearfix > li').fadeIn();

    draw_navibar(o);
}

function draw_navibar(data) {
    //console.log(data);
    $.each(data, function(year, months) {
        //console.log(year, months);

        if ($('#' + year).length) {
            //console.log(year + 'exists');
        } else {
            $('.col-sm-3 > .list-group').prepend(
    '<li class="list-group-item" id=' + year + '>' + year +
    '<span class="badge"></span><ul></ul></li>').hide().fadeIn();
        }

        $.each(months, function(month, value) {
            if ($('#' + year + '_' + month).length) {
                //console.log(year + '/' + month + 'exists');
            } else {
                //console.log(month);
                $('#' + year + ' > ul').append(
          '<li><a href="#" class="range_photo" id=' + year + '_' + month +
          ' data-year=' + year + ' data-month=' + month + '>' + month +
          '月</a><span class="badge pull-right">' + value + '</span></li>');
            }
        });

    });
}

