<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="TajAngular_index" %>

<!DOCTYPE html>
<html ng-app="app" ng-controller="mainController" ang="en">
	<head>
		<meta charset="utf-8">
       
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>{{myData.Product_Name}}</title>
			
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		
		<!-- google fonts -->
		<link href='https://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css'>
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
		
        <!-- font-awesome-->
        <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

		<!-- styles -->
		<link href="css/styles.css" rel="stylesheet">
        <link href="css/loading-bar.min.css" rel="stylesheet">
        
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap.min.js"></script><!--  Bootstrap v3.3.6 -->
	   		
		<!-- tinynav -->
		<script src="js/tinynav/tinynav.js"></script>
		
		<!-- gmaps -->
		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOiIxzr_VPLkcK-Ops3BPCgkeWkeVwVuQ"></script>
		
		
		
		<!-- angularjs-->
        <!--
        <script src="lib/angular.min.js"></script>
        <script src="lib/angular-route.min.js"></script>
        <script src="lib/angular-resource.min.js"></script>
        --->
        <!-- AngularJS v1.5.0 -->
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-route.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-resource.min.js"></script>
        <script src="http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js"></script>
        <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.3.2.min.js"></script>                                                             
       

         <!-- other angular libs -->
		<script src="lib/ng-map.min.js"></script>

		<script src="js/angular-imagefit.js"></script>
        <script src="js/image-scale.js"></script>
        <script src="js/angular-file-saver.bundle.min.js"></script>
		<script src="js/canvas-toBlob.js"></script>
        <script src="js/FileSaver.min.js"></script>
        <script src="js/ng-videosharing-embed.min.js"></script>
        <script src="js/angular.dcb-img-fallback.min.js"></script>
        <script src="js/angular-google-staticmaps.min.js"></script>
        <script src="js/loading-bar.min.js"></script>
        
        
		<!-- main -->
		<script src="js/main.js"></script>
		
	    <!--- angular related files---->
		<script src="app/app.module.js"></script>
        <script src="app/app.MainController.js"></script> 
        
        <script src="app/app.AcitivitiesDetailsViewController.js"></script>
        <script src="app/app.FacilitiesDetailsViewController.js"></script>
        <script src="app/app.RoomDetailsViewController.js"></script>
        <script src="app/app.RoomDetailsListController.js"></script>
		<script src="app/app.routes.js"></script>
       
		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body >
        <!--- error --->
        <div id="errorContainer" class="panel panel-default alert alert-danger">
          <div id="errorMessage" class="panel-body alert alert-danger text-center"></div>
        </div>
        <!-- header -->
		<header id="header">
			<br />
            
			<div class="logo" >
                <div style="width:100px;height:100px;margin:0 auto;">

				   <img ng-src="{{LogoThumb}}" fallback-src="images/LogoPlaceHolder.jpg"  alt="{{myData.Product_Name}} Logo" style="max-width:100%;max-height:100%;"/> 
                </div>
				<div class="triangle" ng-show="{{ banner.show}}"><img src="images/triangle.png" alt=""/> </div>
               
			</div>
			
		</header>
		<!-- ./header -->
        
         <!-- banner -->
        <div class="container ng-cloak">
            <div class="row">
       
        
              <div class="col-md-12" >
                <div id="mySlideShow" style="max-height:500px;min-height: 100px;overflow:hidden;position:relative">
                    <uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides" style="width:100%; "  >
                      <uib-slide ng-repeat="slide in slides track by slide.id" index="slide.id">
                        <div class="mainSlideContainer" bg-image="{{slide.image}}">
                       
                        </div>
                         
                      
                      </uib-slide>
                    </uib-carousel>
                </div>
              </div>
           </div>
        </div>
 

        

		<!-- ./banner -->
		
        <!-- page-title -->
		<div class="container page-title ng-cloak">
			<h2>{{myData.Product_Name}}</h2>

			<hr>
		</div>
		<!-- ./page-title -->
         
         
        <!-- nav -->
		<ul id="nav">
			<li class="selected"><a href="#home">Home</a></li>
			<li class="hidden-xs hidden-sm visible-md visible-lg"><a  href="#factFiles" ng-click="submenu_show = !submenu_show">Facts</a>
            <li class="visible-xs visible-sm hidden-md hidden-lg" >
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" data-toggle="dropdown">Facts
                  <span class="caret"></span></button>
                  <ul class="dropdown-menu">
                   
                    <li><a href="#room-type">Room Types</a></li>
				    <li><a href="#activities">Activities</a></li>
				    <li><a href="#facilities">Facilities</a></li>
				    <li><a href="#services">Services</a></li>
				    <li><a href="#rates">Rates</a></li>
				   
                   
                  </ul>
                </div>
            </li>
           
			<li><a href="#imageLibrary">Images</a></li>
			<li><a href="#videos">Videos</a></li>
			<li><a href="#map">Location</a></li>
			<li><a href="#contact">Contact</a></li>
			
		</ul>
		<!-- ./nav -->	
         
        <!-- sub-nav -->
		<div class="container hidden-xs hidden-sm" ng-show="submenu_show">	
			
			<ul class="sub-nav">
				<li><a href="#room-type">Room Types</a></li>
				<li><a href="#activities">Activities</a></li>
				<li><a href="#facilities">Facilities</a></li>
				<li><a href="#services">Services</a></li>
				<li><a href="#rates">Rates</a></li>
				
			</ul>
		
		</div>
		<!-- ./sub-nav -->
       
        <!-- content -->
		<div class="content" >
			<div class="container">
			
				<div class="row">
                     <div id="main" class="ng-cloak">
                              
                            <div ng-view>
                            </div>
                           
                    </div>
                </div>
            </div>
        </div>
          
          
          
	    <!-- footer -->
		<footer id="footer">
			<div class="container">
				
              <p class="copyrights"> {{myData.Product_Name}} | <a href="http://www.didgigo.com/OlivLogin.aspx?ReturnUrl=%2fOlivProducts.aspx">Login</a></p>
			</div>	
		</footer>
		<!-- ./footer -->
			

       
		
	</body>
</html>