<html>
<head>
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">
<link href="/static/custom.css" rel="stylesheet" type="text/css" />
<link href="/static/lightbox2/css/lightbox.css" rel="stylesheet" type="text/css" />
<link href="/static/navbar-fixed-top.css" rel="stylesheet" type="text/css" />
<link href="/static/my.css" rel="stylesheet" type="text/css" />
<link href="/static/jquery.waiting/dist/waiting.css" rel="stylesheet" type="text/css" />
</head>

<body>

<div id="fb-root"></div>
<div class="container">
  <div class="row">

    <div class="col-sm-3">
			<ul class="list-group">
			</ul>
    </div>

    <div class="col-sm-9">
      <div id="thumbnails">
				<ul class="clearfix"> </ul>
			</div>
    </div>

  </div>

	<fb:login-button show-faces="true" width="200" max-rows="2" scope="user_photos"></fb:login-button>

</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"></script>
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script> -->
<script src="/static/jquery.waiting/dist/jquery.waiting.min.js"></script>
<script src="/static/fb.js"></script>

% if settings.production_deployment == True:
<script src="/static/2.js"></script>
% else:
<script src="/static/1.js"></script>
% endif

<script src="/static/l.js"></script>
<script src="/static/lightbox2/js/lightbox.min.js"></script>

</body>

</html>
