<!DOCTYPE html>
<html <?php language_attributes(); ?> role='main'>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Sriracha&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Glass+Antiqua&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://wowjs.uk/css/libs/animate.css">
    <link rel='stylesheet' id='sb-font-awesome-css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' type='text/css' media='all' />
    <?php wp_head(); ?>
</head>
<body>
  <div id='app' role='application'></div>
  <?php wp_footer(); ?>
  <script type="text/javascript">
    WebFontConfig = {
      google: { families: [ 'Open+Sans:400,600' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
    var $buoop = {notify:{e:-6,f:-4,o:-4,s:-2,c:-4},insecure:true,api:5};

    function $buo_f(){
      var e = document.createElement("script");
      e.src = "//browser-update.org/update.min.js";
      document.body.appendChild(e);
    };

    try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
    catch(e){window.attachEvent("onload", $buo_f)}
  </script>
       <script>
        function openNav() {
			document.getElementById("mobileSideNav").style.width = "320px";
		}
		function closeNav() {
			document.getElementById("mobileSideNav").style.width = "0";
		}
		function subMenu(val) {
		var activeId = document.getElementById("toggleClass-"+val);
        var x = document.getElementById("subMenu-"+val);
		activeId.classList.toggle("active");
         if (x.style.display == "none") {
           x.style.display = "block";
			} else {
          x.style.display = "none";
			}
		}
  </script>
  <!-- <script type="text/javascript" async defer src="https://app.smilesnap.com/app/GSpGRfKWmKWqqwAAqSw2y5Gu/loader.js"></script> -->
  <script type="text/javascript">
    window.__smilesnap = window.__smilesnap || [];
    window.__smilesnap.cid = 'GSpGRfKWmKWqqwAAqSw2y5Gu';
    window.__smilesnap.fullscreenSelector = '#smilesnap-expanded-container';
    (function() {
    var ss = document.createElement('script'); ss.type = 'text/javascript'; ss.async = true;
    ss.src = 'https://app-cdn.smilesnap.com/js/loader.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ss, s);
    })();
  </script>
</body>
</html>
