(function () {
    'use strict';


    angular.module('app')
              .controller('mainController', ['$scope', '$http', '$location', '$route', 'FileSaver', 'Blob', 'dataFactory', 'Utils', 'ProductInfo', 'preloader', function ($scope, $http, $location, $route, FileSaver, Blob, dataFactory, Utils, ProductInfo, preloader) {

                  // $scope.imagePath = '../ProductImages/Thumbnails/';
                  $scope.imagePath = 'http://www.didgigo.com/ProductImages//Uploaded//';
                  $scope.imagePathHiRes = 'http://www.didgigo.com/ProductImages//Uploaded//';
                  $scope.imagePathThumbs = 'http://www.didgigo.com/ProductImages//Thumbnails//';
                  $scope.imageParticipantThumbs = 'http://www.didgigo.com/ParticipantImages//Thumbnails//';
                  $scope.imageMapPath = 'http://www.didgigo.com//Product_Maps//Spicers_Peak_Lodge_17734_Map.jpg';
                  $scope.myData = {};

                  $scope.downloadSelection = [];

                  $scope.myInterval = 5000;
                  $scope.noWrapSlides = false;
                  $scope.active = 0;
                  $scope.ProductImages = []; //hero, day spa, Activities and Other , fitness, food and beverage





                  $scope.HomeAll = [];
                  $scope.HomePageOnly = [];
                  $scope.ActivitiesAll = [];
                  $scope.FacilitiesAll = [];
                  $scope.ServicesAll = [];
                  $scope.SlidesMainCopy = [];
                  $scope.ShowMainSlideshow = true;

                  var slides = $scope.slides = [];
                  $scope.slideCurrIndex = 0;

                  $scope.RoomDetails = {};

                  $scope.ShowError = function (errorMessage) {
                      var errHTML = document.getElementById("errorMessage");
                      var errHolder = document.getElementById("errorContainer");
                      if (errorMessage) {

                          errHTML.innerHTML = errorMessage;
                          errHolder.style.display = 'block';
                      } else {
                          errHolder.style.display = 'none';
                      }
                  }
                  $scope.addSlide = function (imageFileName) {

                      var newWidth = 600 + slides.length + 1;
                      slides.push({
                          image: imageFileName,
                          //text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                          id: $scope.slideCurrIndex++
                      });
                  };



                  $scope.GetLowResImage = function (a_options, a_filename) {

                      if (a_filename) {
                          var retValue = false;
                          var nameArr = a_filename.split("."),
                            newName = nameArr[0];
                          a_options = a_options.toString();

                          //options: 100_100, 50_50, 600_600, thumblowres
                          switch (a_options) {
                              case '50': newName = newName + "_thumb50_50.jpg";
                                  //_thumb50_50.jpg
                                  retValue = true;
                                  break;
                              case '100': newName = newName + "_thumb100_100.jpg";
                                  //_thumb100_100.jpg
                                  retValue = true;
                                  break;
                              case '600': newName = newName + "_thumb600_600.jpg";
                                  //_thumb600_600.jpg
                                  retValue = true;

                                  break;
                              case 'lowres': newName = newName + "_thumblowres.jpg";
                                  //_thumblowres.jpg
                                  retValue = true;
                                  break;

                              default:
                                  newName = "";
                                  retValue = false;

                          }

                          newName = retValue ? $scope.imagePathThumbs + newName : "images/placeholder.jpg";
                          //console.log(" newName" + newName);
                          var source = newName;
                          Utils.isImage(source).then(function (result) {
                              if (result == true) {
                                  return newName;
                              } else {

                                  source = source.replace("Thumbnails", "Uploaded").replace(/ /g, '%20').replace("_thumblowres.jpg", ".jpg").replace("_thumblowres.png", ".png");
                                  Utils.isImage(source).then(function (r) {
                                      if (r) {
                                          //if high res exist = return 
                                          return source;
                                      } else {
                                          return "images/placeholder.jpg";
                                      }
                                  });
                                  return source;
                              }
                          });
                          return newName;
                      } else {
                          return "images/placeholder.jpg";
                      }

                  }



                  $scope.ImageExist = function (value) {
                      // var http = new XMLHttpRequest();
                      // http.open('HEAD', value, false);
                      // http.send();
                      //$scope.checkImage(value);

                      var retVal = false;
                      if (value) {
                          retVal = value;
                      }
                      return retVal;
                  };

                  $scope.DownloadImages = function () {

                      $scope.SaveImages($scope.downloadSelection);
                      $scope.ChangeView('/imageLibrary');
                      //console.log("All Images Done with downloading");
                  };


                  $scope.SaveImages = function (urls) {

                      for (var i = 0; i < urls.length; i++) {

                          var imgFileName = urls[i];

                          $scope.CanvasImageSave(imgFileName, i);
                          //console.log("reload");

                      }


                  };

                  $scope.ChangeView = function (view) {
                      //console.log("reload");

                      $location.path(view); // path not hash
                  };
                  $scope.CanvasImageSave = function (imageName, imageNumber) {
                      //console.log("CanvasImageSave:" + imageName);
                      $('#imageid').attr('src', imageName); //set image to source
                      var can = document.getElementById("imgCanvas");
                      var img = document.getElementById("imageid");

                      if (can) {
                          can.height = img.height;
                          can.width = img.width;
                      }
                      //console.log("src" + $('#imageid').attr('src'));
                      var dlName = imageName.replace("http://www.didgigo.com/ProductImages//Uploaded//", "");
                      var ctx = can.getContext("2d");
                      ctx.drawImage(img, 0, 0);
                      can.toBlob(function (blob) {
                          saveAs(blob, "image" + imageNumber + ".jpg");
                      }, "image/jpg");

                  };

                  $scope.toggleSelection = function (imagePath) {
                      var idx = $scope.downloadSelection.indexOf(imagePath);

                      // is currently selected
                      if (idx > -1) {
                          $scope.downloadSelection.splice(idx, 1);
                      }

                      // is newly selected
                      else {

                          $scope.downloadSelection.push(imagePath);
                      }

                      //console.log("Download Selection:" + $scope.downloadSelection);

                  };
                  var params = {
                      'p': '191'
                  };


                  $scope.map = {
                      center: '[56.162939, 10.203921]',
                      zoom: 5
                  };

                  $scope.init = function () {
                      console.log("init")
                      $scope.ShowError("");
                      dataFactory.getMapDetails()
                      .success(function (data, status, headers, config) {
                          $scope.ShowError("");
                          var mapData = JSON.parse(data.d);
                          $scope.mapData = JSON.parse(data.d);

                          console.log("mapData---" + JSON.stringify(mapData) + "\n---------");
                          if ($scope.mapData.Map_Coordinates1 && $scope.mapData.Map_Coordinates2) {
                              $scope.mapCoordinates = "[" + $scope.mapData.Map_Coordinates1 + "," + $scope.mapData.Map_Coordinates2 + "]";
                          }

                      })
                      .error(function (data, status, headers, config) {
                          $scope.ShowError("Failed To Get Map Data");
                      });
                      dataFactory.getProductInfo()
                        .success(function (data, status, headers, config) {

                            $scope.ShowError("");
                            //console.log("Success Get Data");
                            $scope.myData = JSON.parse(data.d);
                            $scope.facts = (($scope.myData).facts)[0];

                            $scope.productInfo = new ProductInfo($scope.myData);
                            /*
                            var coordinates = $scope.productInfo.getDegreeCoordinates();  //$scope.GetDegreeCoordinates();

                            if (coordinates) {
                            $scope.mapCoordinates = "[" + coordinates.lat + "," + coordinates.long + "]";
                            $scope.lat = coordinates.lat;
                            $scope.long = coordinates.long;
                            }

                            */
                            //set logo

                            $scope.LogoThumb = $scope.productInfo.getLogoThumbRef();

                            $scope.AllImagesForPreload = [];
                            if ($scope.myData.option.length > 0) {
                                for (var x = 0; x <= $scope.myData.option.length - 1; x++) {
                                    if ($scope.myData.option[x] && $scope.myData.option[x].Product_Image && $scope.myData.option[x].OptionTypeName) {
                                        //console.log(">Product Image > Product Name"+ $scope.myData.option[x].Product_Image);
                                        var imgName = $scope.imagePathThumbs + $scope.myData.option[x].Product_Image.replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png").replace(/ /g, '%20');
                                        var group = $scope.myData.option[x].OptionTypeName; //Room, "Day Spa","Food and Beverage", Fitness, Additionals
                                        if (imgName && group) {
                                            $scope.AllImagesForPreload.push(imgName);
                                            $scope.ClassifyImage(imgName, group, 1000); //check if image exists
                                        }
                                    }

                                }

                            }


                            //set hero images
                            if ($scope.myData.heroImages.length > 0) {
                                //console.log("Length:" + $scope.myData.heroImages.length);
                                for (var i = 0; i <= $scope.myData.heroImages.length - 1; i++) {
                                    //console.log(i + $scope.myData.heroImages);
                                    if ($scope.myData.heroImages[i].Product_Image && $scope.myData.heroImages[i].Product_Image != undefined) {
                                        // console.log($scope.imagePath + $scope.myData.heroImages[i].Product_Image);
                                        var imgName = $scope.imagePathThumbs + $scope.myData.heroImages[i].Product_Image.replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png").replace(/ /g, '%20');
                                        var order = isNaN($scope.myData.heroImages[i].Hero_Order) == true || $scope.myData.heroImages[i].Hero_Order == null ? 0 : $scope.myData.heroImages[i].Hero_Order;
                                        //console.log(imgName + " Hero Order:" + $scope.myData.heroImages[i].Hero_Order);
                                        $scope.AllImagesForPreload.push(imgName);
                                        $scope.ClassifyImage(imgName, "hero", order); //check if hero images exist, if it does it adds to heroImages array and slider ( slideshow )


                                    }

                                }
                            }

                            //set images

                            if ($scope.myData.images.length > 0) {
                                //console.log($scope.myData.images.length);
                                for (var x = 0; x <= $scope.myData.images.length - 1; x++) {

                                    //console.log($scope.myData.images[x]);
                                    if ($scope.myData.images[x] && $scope.myData.images[x].Product_Image) {
                                        //console.log($scope.myData.images[x].Product_Image);
                                        var imgName = $scope.imagePathThumbs + $scope.myData.images[x].Product_Image.replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png").replace(/ /g, '%20');
                                        $scope.AllImagesForPreload.push(imgName);
                                        $scope.ClassifyImage(imgName, "general", 1000); //check if image exists
                                    }

                                }
                            }
                            preloader.preloadImages($scope.AllImagesForPreload);
                            //classify general image to : general images

                            $route.reload();
                        })
                        .error(function (data, status, headers, config) {
                            $scope.status = status;
                            console.log("Fail Get Data" + status);
                            $scope.ShowError("Failed To Get Product Info.");
                        });




                  };


                  $scope.init();

                  $scope.ClassifyImage = function (source, group, order) {

                      //put images in their group buckets,then sort, prioritize
                      //put general images in all, then hero images
                      //order = isNaN(order) == true ? 0 : order;
                      var imageExists = false;
                      /*
                      var obj = { "groupName": group, "img": source, "order": order };
                      $scope.ProductImages.push(obj); //add to ProductImages - to have record of all images from products
                      sortImagePages(group, source, order);        
                      */


                      Utils.isImage(source).then(function (result) {

                          //if low res image exist, add to ProductImages
                          if (result == true) {

                              var obj = { "groupName": group, "img": source, "order": order };
                              $scope.ProductImages.push(obj); //add to ProductImages - to have record of all images from products
                              imageExists = true;

                              //put image to array 
                              if (imageExists) {
                                  sortImagePages(group, source, order);
                              } // end image exists

                              //put code here to put images to slots, use a counter for each
                              //example. for activities, it has max of 5 images, if image1 is not filled yet, put into it, if not enough, pull from general images, - if for home, pull from hero images first, exhaust all of it, before filling with general images

                          } else if (result == false) {
                              //if low res image does not exist, use the high res image

                              source = source.replace("Thumbnails", "Uploaded").replace("_thumblowres.jpg", ".jpg").replace("_thumblowres.png", ".png");

                              Utils.isImage(source).then(function (r) {
                                  if (r) {

                                      var obj = { "groupName": group, "img": source, "order": order };
                                      $scope.ProductImages.push(obj);
                                      imageExists = true;
                                      //put image to array 
                                      if (imageExists) {
                                          sortImagePages(group, source, order);
                                      } // end image exists


                                      //put code here to put images to slots, use a counter for each
                                      //example. for activities, it has max of 5 images, if image1 is not filled yet, put into it, if not enough, pull from general images, - if for home, pull from hero images first, exhaust all of it, before filling with general images


                                  } else {
                                      imageExists = false;
                                      //console.log("source" + source + "group" + group + "high res does not exist");
                                  }

                              });
                          }

                          return result;
                      });


                  };

                  function isInImageList(a_arr, a_filename) {
                      //a_arr = [1, source, order]
                      var retValue = -1;
                      for (var i = 0; i < a_arr.length; i++) {
                          var source = a_arr[i][1];
                          if (source != undefined && source === a_filename) {
                              retValue = i;
                              return retValue;
                          }
                      }

                      return retValue;
                  };

                  $scope.GetHomePageImage = function (a_index) {
                      var img = "images/placeholder.jpg";


                      var found = false;
                      if ($scope.HomeAll.length >= 4) {

                          var imgPage = $scope.HomeAll[3 + a_index] ? $scope.HomeAll[3 + a_index][1] : null;
                          if (!imgPage) {
                              imgPage = $scope.HomeAll[a_index][1];
                          }

                      } else {
                          if ($scope.HomeAll[a_index]) {
                              imgPage = $scope.HomeAll[a_index][1];
                          }
                      }
                      img = imgPage === undefined ? img : imgPage;
                      return img;
                  };

                  function sortImagePages(group, source, order) {

                      //console.log("sortImagePages" + order);
                      //NOTE - use indexof.. add only if it's not yet on the list
                      switch (group) {
                          case "hero":


                              var foundIndex = isInImageList($scope.HomeAll, source);

                              if (foundIndex > -1 && $scope.HomeAll[foundIndex] != undefined) {
                                  //delete the duplicate first
                                  $scope.HomeAll.splice(foundIndex, 1);

                              }


                              $scope.HomeAll.push([1, source, order]); //1 is for priority
                              $scope.HomeAll.sort(sortFunction);
                              $scope.HomeAll.sort(sortByOrder);


                              $scope.HomePageOnly.push([1, source, order]);
                              $scope.HomePageOnly.sort(sortFunction);
                              $scope.HomePageOnly.sort(sortByOrder);

                              slides = $scope.slides = [];
                              //$scope.SlideCopy = [];
                              $scope.slideCurrIndex = 0;

                              for (var i = 0; i < 4; i++) {

                                  var img = $scope.HomeAll[i] ? $scope.HomeAll[i][1] : null;
                                  if (img) {
                                      $scope.addSlide($scope.HomeAll[i][1]);

                                  }
                              }


                              $route.reload();


                              //third priority for other buckets, in case it doesn't have any images
                              $scope.FacilitiesAll.push([3, source]);
                              $scope.FacilitiesAll.sort(sortFunction);

                              $scope.ActivitiesAll.push([3, source]);
                              $scope.ActivitiesAll.sort(sortFunction);

                              $scope.ServicesAll.push([3, source]);
                              $scope.ServicesAll.sort(sortFunction);
                              break;


                          case "Room":
                              break;


                          //facilities page                                                                                                                                                                                                                                                                                                                                                                                      
                          case "Food and Beverage":


                              $scope.FacilitiesAll.push([1, source]);
                              $scope.FacilitiesAll.sort(sortFunction);

                              break;
                          case "Day Spa":


                              $scope.FacilitiesAll.push([1, source]);
                              $scope.FacilitiesAll.sort(sortFunction);
                              break;
                          case "Fitness Room/Gym":


                              $scope.FacilitiesAll.push([1, source]);
                              $scope.FacilitiesAll.sort(sortFunction);
                              break;
                          //activities page                                                                                                                                                                                                                                                                                                                                                                                      
                          case "Activities and Other":


                              $scope.ActivitiesAll.push([1, source]);
                              $scope.ActivitiesAll.sort(sortFunction);
                              break;


                          //all general images, - to be used if others are missing                                                                                                                                                                                                                                                                                                                                                                                                 
                          case "general":





                              $scope.HomeAll.push([2, source, order]); //second for priority
                              $scope.HomeAll.sort(sortFunction);
                              $scope.HomeAll.sort(sortByOrder);

                              $scope.FacilitiesAll.push([1, source]);
                              $scope.FacilitiesAll.sort(sortFunction);

                              $scope.ActivitiesAll.push([2, source]); //second priority
                              $scope.ActivitiesAll.sort(sortFunction);

                              $scope.ServicesAll.push([1, source]); //first priority in services
                              $scope.ServicesAll.sort(sortFunction);

                              break;
                      }
                  };
                  function sortFunction(a, b) {
                      if (a[0] === b[0]) {
                          return 0;
                      }
                      else {
                          return (a[0] < b[0]) ? -1 : 1;
                      }
                  };

                  function sortByOrder(a, b) {
                      if (a[2] === b[2]) {
                          return 0;
                      }
                      else {
                          return (a[2] < b[2]) ? -1 : 1;
                      }
                  };

                  $scope.GetVideoLink = function (a_link) {

                      //format: youtube/I92neRxC8P8 or vimeo/I92neRxC8P8
                      var retValue = false;
                      if (a_link != null && a_link != '') {
                          var arr = a_link.split("/");
                          switch (arr[0]) {
                              case "youtube":
                                  retValue = "https://www.youtube.com/embed/" + arr[1];

                                  break;

                              case "vimeo":
                                  retValue = "//vimeo.com/" + arr[1];
                                  break;
                          }
                      }
                      return retValue;
                  }

                  $scope.CoordinatesExist = function () {
                      var retValue = false;
                      //  var coordinates = $scope.productInfo.getDegreeCoordinates();  //$scope.GetDegreeCoordinates();

                      if ($scope.mapCoordinates) {
                          return true;
                      }

                      return retValue;
                  };


                  $scope.GetAllOptionImages = function (optionId) { //this is for mulitple images
                      //{"Product_Id":17013,"Option_Id":157,"Option_Type_Id":4,"Product_Image_Folder":"ProductImages//Uploaded//","Product_Image":"Thala_Beach_Nature_Reserve_5508_883.jpg","Participant_Id":10552,"Option_Name":"Osprey Restaurant","Notes":"Notes","Title":"Title"} 

                      var optionImagesArr = [];
                      if (optionId) {
                          var imageObj = new Object();


                          var optArr = (($scope.myData).option);
                          if (optArr) {
                              for (var i = 0; i < optArr.length; i++) {
                                  var option = optArr[i];
                                  if (option.Option_Id === optionId) {
                                      optionImagesArr.push(optArr[i]);
                                  }

                              }


                          }

                      }
                      return optionImagesArr.length > 0 ? optionImagesArr : false;
                  };

                  $scope.GetOptionImage = function (optionId) {
                      //console.log("GetOptionImage---" + optionId);
                      var retValue = false;

                      if (optionId) {
                          var imageObj = new Object();


                          var optArr = (($scope.myData).option);
                          if (optArr) {
                              for (var i = 0; i < optArr.length; i++) {
                                  var option = optArr[i];
                                  if (option.Option_Id === optionId) {
                                      retValue = optArr[i];
                                      //console.log("GetOptionImage**** " + JSON.stringify(retValue) + ":" + optArr[i].Product_Image);
                                      break;

                                  }

                              }
                          }

                      }
                      return retValue;
                  }
                  $scope.GetOption = function (optionId) { //this is for single option images
                      //{"Product_Id":17013,"Option_Id":157,"Option_Type_Id":4,"Product_Image_Folder":"ProductImages//Uploaded//","Product_Image":"Thala_Beach_Nature_Reserve_5508_883.jpg","Participant_Id":10552,"Option_Name":"Osprey Restaurant","Notes":"Notes","Title":"Title"} 
                      var retValue = false;

                      if (optionId) {
                          var imageObj = new Object();


                          var optArr = (($scope.myData).option);
                          if (optArr) {
                              for (var i = 0; i < optArr.length; i++) {
                                  var option = optArr[i];
                                  if (option.Option_Id === optionId) {
                                      retValue = optArr[i];
                                      break;

                                  }

                              }
                          }

                      }
                      return retValue;
                  };

                  $scope.GetRatingsHeader = function (value) {
                      var header = "";
                      switch (value) {
                          case 'Ratings_Awards': header = 'Award Description'; break;
                          case 'Ratings_TransportAirport': header = 'Complimentary airport transfers included'; break;
                          case 'Ratings_TransportCity': header = 'City or local transfers provided by property'; break;
                          case 'Ratings_MealPlan': header = 'Meal Plan - Lead-in price inclusive of:'; break;
                          case 'Ratings_InsurancePublicLiability': header = 'Public Liability'; break;
                          case 'Ratings_InsurancePersonal': header = 'Personal Indemnity'; break;
                          case 'Ratings_MinStay': header = 'Minimum stay'; break;
                          case 'Ratings_ChildPolicyAdultsOnly': header = 'Adults Only'; break;
                          case 'Ratings_ChildPolicyChildFree': header = 'Children free when using existing bedding'; break;
                          case 'Ratings_Servicing': header = 'Servicing'; break;
                          case 'Ratings_SpecialOffersStayPay': header = 'Stay pay offer'; break;
                          case 'Ratings_SpecialOffersUpgrade': header = ' Upgrade offer'; break;
                          case 'Ratings_SpecialOffersMeal': header = 'Meal offer'; break;
                          case 'Ratings_SpecialOfferAirportTransfer': header = 'Airport transfer offer'; break;
                          case 'Ratings_SpecialOfferResortVoucher': header = 'Resort voucher offer'; break;
                          case 'Ratings_SpecialOfferFlowers': header = 'Flowers or wine on arrival offer'; break;
                          case 'Ratings_SpecialOfferHoneymoon': header = 'Honeymoon offer'; break;
                          case 'Ratings_SpecialOfferOthers': header = 'Other offers including details and validity'; break;

                      }
                      return header;
                  };


                  $scope.GetActivityHeader = function (value) {
                      var header = "";
                      switch (value) {
                          case 'Activities_FeatureComplimentaryTouring': header = 'Complimentary Touring'; break;
                          case 'Activities_FeatureOnsiteGolf': header = 'On Site Golf'; break;
                          case 'Activities_FeatureTennisCourt': header = 'On-site Full-size Tennis court(s)'; break;
                          case 'Activities_FeaturePrivateBeach': header = 'Private Beach'; break;
                          case 'Activities_FeaturePrivateGardens': header = 'Private Gardens'; break;
                          case 'Activities_FeatureEntertainment': header = 'Complimentary On-site Entertainment'; break;
                          case 'Activities_IndoorGuestLounge': header = 'Guest Lounge'; break;
                          case 'Activities_IndoorLibrary': header = 'Library'; break;
                          case 'Activities_IndoorBookSwap': header = 'Book Swap'; break
                          case 'Activities_IndoorGames': header = 'Indoor Games'; break;
                          case 'Activities_IndoorOther': header = 'Others Indoor Pursuits'; break;
                          case 'Activities_OtherActivitiesCulinary': header = 'On-site Culinary Activities'; break;
                          case 'Activities_OtherActivitiesWater': header = 'Onsite Water Activities'; break;
                          case 'Activities_OtherActivitiesOther': header = 'On-site other activities'; break;
                          case 'Activities_OtherActivitiesNearby': header = 'Nearby(off-site) activities'; break;

                      }
                      return header;
                  };

                  $scope.GetFacilityHeader = function (value) {
                      var header = "";
                      switch (value) {
                          case 'Facility_Dining_BBQ': header = 'BBQ Facilities for guest use'; break;
                          case 'Facility_DiningOnsiteResto': header = 'On-site restaurant(s)'; break;
                          case 'Facility_DiningBar': header = 'On-site Bar(s)'; break;
                          case 'Facility_DiningCafe': header = 'On-site Cafe(s)'; break;
                          case 'Facility_DiningRoomService': header = 'Room Services'; break;
                          case 'Facility_DiningOutdoorDining': header = 'Outdoor Dining'; break;
                          case 'Facility_DiningPrivateDining': header = 'Private Dining'; break;
                          case 'Facility_FamilyKidsClub': header = 'Kids Club'; break
                          case 'Facility_FamilyBabySitting': header = 'Baby Sitting Service'; break;
                          case 'Facility_FamilyChildMinding': header = 'Child Minding Service'; break;
                          case 'Facility_FamilyOnsitePlayground': header = 'On-site Playground'; break;
                          case 'Facility_FamilyHighChair': header = 'Highchair(s)'; break;
                          case 'Facility_FamilyCot': header = 'Cot(s)'; break;
                          case 'Facility_FitnessSki': header = 'Ski-in-ski-out'; break;
                          case 'Facility_FitnessPool': header = 'On-site swimming pool(s)'; break;
                          case 'Facility_FitnessSwimPoolBar': header = 'Swim-up pool bar'; break;

                          case 'Facility_FitnessKidsPool': header = 'Kid\'s pool(s) or kid\'s (shallow) section of pool(s)'; break;
                          case 'Facility_FitnessJacuzzi': header = 'On-site Jacuzzi'; break;
                          case 'Facility_FitnessGym': header = 'Gym'; break;
                          case 'Facility_FitnessDaySpa': header = 'Day Spa'; break;
                      }


                      return header;
                  };

                  $scope.GetServiceHeader = function (value) {
                      var header = "";
                      switch (value) {
                          // business                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                          case 'Services_BussinessCenter':
                              header = "Business Center";
                              break;

                          case 'Services_BusinessConferenceRoom':
                              header = "Business Conference Center";
                              break;
                          //internet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

                          case 'Services_InternetOnsite':
                              header = "On Site Internet Access";
                              break;

                          //laundry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                          case 'Services_LaundryFacility':
                              header = "Onsite Laundry Facility";
                              break;

                          case 'Services_LaundryOnsite':
                              header = "Laundry Onsite";
                              break;

                          //Other                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                          case 'Services_Other24HrConcierge':
                              header = "24 Hour Concierge";
                              break;

                          case 'Services_Other24HrReception':
                              header = "24 Hour Reception";
                              break;

                          case 'Services_OtherChapel':
                              header = "Other Chapel";
                              break;

                          case 'Services_OtherConcierge':
                              header = "Concierge";
                              break;

                          case 'Services_Other24HrConcierge':
                              header = "24 Concierge";
                              break;

                          case 'Services_OtherLift':
                              header = "Lift";
                              break;

                          case 'Services_OtherReception':
                              header = "Reception";
                              break;

                          //parking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                          case 'Services_ParkingOnsite':
                              header = "Parking On Site";
                              break;

                          case 'Services_ParkingValet':
                              header = "Parking Valet";
                              break;


                          //parking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              



                      }
                      return header;
                  };

                  $scope.GetNumberOfTreatmentRooms = function (value) {
                      var retValue = false;
                      if (value) {
                          var strArr = value.split("Number of Treatment Rooms="); //["Y Name(s)=Rejuvenate ", "1"]

                          if (strArr[1] && strArr[1] != 'null') {
                              retValue = strArr[1];
                          }
                      }
                      return retValue;
                  }

                  $scope.Get24Hours = function (value) {
                      //Y 24-hour=Y
                      var retValue = false;
                      if (value) {
                          var strArr = value.split("24-hour"); //["Y Name(s)=Rejuvenate ", "1"]
                          //console.log(">" + strArr);
                          if (strArr[1]) {
                              retValue = strArr[1];
                          }
                      }
                      return retValue;
                  }
                  $scope.GetSpaNames = function (value) {
                      //Y Name(s)=Rejuvenate Number of Treatment Rooms=1 Details
                      var retValue = false;
                      if (value) {

                          var strArr = value.split("Number of Treatment Rooms="); //["Y Name(s)=Rejuvenate ", "1"]

                          if (strArr[0]) {
                              var arr = strArr[0].split("Name(s)="); //["Y ", "Rejuvenate "]
                              //console.log("Spa Names:" + arr[1]);
                              if (arr[1] && $.trim(arr[1]) != 'null') {

                                  retValue = arr[1].replace("Name(s)=", " ");
                              }
                          }

                      }


                      return retValue;

                  };
                  $scope.GetAgeRange = function (value) {
                      //N Complimentary=N Age Range=null
                      var retVal = false;
                      if (value) {
                          var strArr = value.split(" ");
                          if (strArr[2]) {
                              var age = strArr[2].replace("Age Range=", " ");
                              if (age && age != "null") {
                                  retVal = age;

                              }
                          }
                      }

                      return false;
                  };
                  $scope.Get24hour = function (value) {
                      //N 24-hour=N
                      var strArr = value.split(" ");
                      var allday = strArr[1].replace("24-hour=", "");
                      allday === 'Y' ? true : false;
                      return allday;
                  };


                  $scope.GetNumber = function (value) {
                      // Y Complimentary=N Number=null

                      //Y Number=1
                      var retValue = false;
                      if (value) {
                          var strArr = value.split(" ");

                          var num = strArr[2] != null && strArr[2].indexOf("null") === -1 ? strArr[2].replace("Number=", "") : null;

                          if (num === undefined || num === " " || num === "null") {
                              retValue = false;
                          } else {
                              retValue = num;
                          }

                      }
                      return retValue;
                  };

                  $scope.GetTorF = function (value) {

                      var retValue = false;
                      if (value && value[0] && value[0] === 'Y') {
                          retValue = true;
                      }
                      return retValue;
                  };

                  $scope.GetComplimentaryTorF = function (value) {
                      var retValue = false;
                      if (value) {

                          var strObj = new Object;
                          var strPos = value.indexOf("Complimentary=") + 14;

                          if (value[strPos] === 'Y') {
                              retValue = true;
                          }
                      }
                      return retValue;
                  };


                  $scope.GetComplimentary = function (value) {
                      var strObj = new Object;
                      var strArr = value.split("Complimentary=");

                      strObj.Complimentary = strArr[1].replace("Complimentary=", "");


                      return strArr;
                  };
                  $scope.GetPoolNumber = function (value) {
                      //console.log("------GetPoolNumber" + value);
                      //N Number=null Details=null Heated=null

                      var retValue = false;
                      if (value) {
                          var strArr = value.split(" ");
                          if (strArr[1]) {

                              var num = strArr[1].replace("Number=", " ");
                              //console.log("------" + num);
                              if (num) {
                                  retValue = num;
                              }
                          }

                      }
                      return retValue;
                  }
                  $scope.GetPoolHeatedDetail = function (value) {
                      //Y Number=2 Details=Outdoor Heated=null
                      var retValue = false;
                      if (value) {
                          var strArr = value.split(" ");
                          if (strArr[3]) {
                              var heated = strArr[3].replace("Heated=", " ");
                              if (heated === 'Y') {
                                  retValue = true;
                              }
                          }


                      }

                      return retValue;
                  };


                  $scope.GetPoolDetails = function (value) {
                      //Y Number=2 Details=Outdoor Heated=null

                      var retValue = false;
                      if (value) {
                          var strArr = value.split(" ");
                          //console.log(">strArr" + strArr);
                          if (strArr[2] && strArr[2] != null && strArr[2] != "null" && strArr[2].indexOf("null") === -1) {

                              return strArr[2].replace("Details=", " ").replace("null", "");
                          }

                      }

                      return retValue;

                  };

                  $scope.GetCourse = function (value) {
                      //N Course=null
                      var retValue = false;
                      if (value) {
                      }
                      return retValue;
                  };
                  $scope.GetComplimentaryActivitysDetails = function (value) {
                      //N Details (complimentary activities)null Details (paid activities)null
                      var retValue = false;
                      if (value && value.indexOf('Details (complimentary activities)') > -1) {

                          var strArr = value.split("Details (paid activities)");
                          var complimentaryDetails = strArr[0];


                          var comArr = complimentaryDetails.split('Details (complimentary activities)');
                          comArr[1] = $.trim(comArr[1]);

                          if (comArr[1] && comArr[1] != 'null' && comArr[1] != undefined & comArr[1].length > 0) {
                              retValue = comArr[1];
                          }

                      }
                      return retValue;
                  };

                  $scope.GetPaidActivityDetails = function (value) {
                      //N Details (complimentary activities)null Details (paid activities)null
                      var retValue = false;
                      if (value && value.indexOf('Details (paid activities)') > -1) {

                          var strArr = value.split("Details (paid activities)");

                          ////console.log("paid activities)" + strArr[1]);
                          if (strArr[1] && strArr[1] != 'null') {
                              retValue = strArr[1];
                          }
                      }
                      return retValue;
                  };

                  $scope.GetRatingsValidity = function (value) {
                      //N Details=null Validity=null
                      var retVal = false;
                      if (value) {
                          var strArr = value.split('Validity=');
                          if (strArr[1]) {

                              retVal = strArr[1];


                          }
                      }
                      return retVal;
                  };

                  $scope.GetOtherInclusions = function (value) {
                      // N Other Inclusions (specify)=N
                      // Y Other Inclusions (specify)=
                      //console.log("Other Inclusions: " + value);
                      var retVal = false;
                      if (value) {

                          var strArr = value.split("Other Inclusions (specify)=");
                          //console.log("GetOtherInclusions " + JSON.stringify(strArr));

                          if (strArr[1]) {
                              retVal = strArr[1];
                          } else {
                              retVal = false;
                          }

                      }
                      return retVal;
                  }

                  $scope.GetMinAge = function (value) {
                      //NMinimum number of nights=null
                      var retVal = false;
                      if (value) {
                          var str = value.replace('NMinimum age=', "").replace('YMinimum age=', "");
                          if (str && str != null) {
                              retVal = str;

                          }
                      }
                      return retVal;
                  };

                  $scope.GetMinimumNightsTF = function (value) {
                      //NMinimum number of nights=null
                      //YMinimum number of nights=2
                      //console.log("GetMinNights " + value);
                      var retVal = false;
                      if (value) {

                          var str = value.split('Minimum number of nights=');
                          //console.log("----GetMinNights " + JSON.stringify(str));
                          //console.log("----GetMinNights " + str[1] + " nights");
                          if (str[1]) {
                              retVal = true;
                          } else {
                              retVal = false;
                          }

                      }

                      //console.log("*** ----GetMinNights " + retVal);
                      return retVal;
                  };


                  $scope.GetMinimumNights = function (value) {
                      //NMinimum number of nights=null
                      //YMinimum number of nights=2
                      //console.log("GetMinNights " + value);
                      var retVal = false;
                      if (value) {

                          var str = value.split('Minimum number of nights=');
                          //console.log("----GetMinNights " + JSON.stringify(str));
                          //console.log("----GetMinNights " + str[1] + " nights");
                          retVal = str[1] + " nights";
                      }

                      //console.log("*** ----GetMinNights " + retVal);
                      return retVal;
                  };


                  $scope.GetRatingsDetails = function (value) {
                      //N Details=null Validity=null
                      var retVal = false;
                      if (value) {
                          var strArr = value.split('Validity=');
                          //console.log("GetRatingsDetailsstrArr" + strArr);
                          if (strArr[0]) {
                              var dArr = strArr[0].split('Details=');
                              if (dArr[1]) {
                                  retVal = dArr[1];
                              }

                          }
                      }
                      return retVal;
                  };

                  $scope.GetFlyingDistance = function (value) {
                      // 50 Distance in miles= Driving Distance=null Flying Distance=null



                      var retVal = false;
                      if (value) {
                          var strArr = value.split('Flying Distance=');  //=null

                          retVal = (strArr[1]).trim();
                          if (retVal === "null" || !retVal) {
                              retVal = false;
                          }


                      }


                      return retVal;
                  };

                  $scope.GetDrivingDistance = function (value) {
                      // 50 Distance in miles= Driving Distance=null Flying Distance=null
                      //Distance in miles= 

                      var retVal = false;
                      if (value) {

                          var strArr = value.split('Distance in miles=');  //=null

                          var secondStrArr = strArr[1].split('Driving Distance=');  // 50 Distance in miles= , null
                          retVal = (secondStrArr[0]).trim();
                          if (retVal === "null" || !retVal) {
                              retVal = false;
                          }

                          //retVal = (secondStrArr[0]).trim() || false;
                      }
                      return retVal;
                  };

                  $scope.GetDistanceInMiles = function (value) {
                      // 50 Distance in miles= Driving Distance=null Flying Distance=null

                      //Flying Distance=
                      var retVal = false;
                      if (value) {

                          var strArr = value.split("Distance in miles=");

                          //---GetDistanceInMiles ["31 "," Driving Distance=null Flying Distance=null"]
                          var strArr2 = strArr[1].split("Driving Distance=");

                          retVal = (strArr2[0]).trim();
                          if (retVal === "null" || !retVal) {
                              retVal = false;
                          }
                      }


                      return retVal;
                  };

                  $scope.GetDistanceInKilometers = function (value) {
                      var retVal = false;
                      if (value) {
                          var strArr = value.split(" ");
                          retVal = (strArr[0]).trim();
                          if (retVal === "null" || !retVal) {
                              retVal = false;
                          }
                      }

                      return retVal;
                  }

                  $scope.GetGolfCourse = function (value) {
                      //Y Complimentary=N Course=null

                      if (value) {


                          var strObj = new Object;
                          var strPos = value.split("Complimentary=");
                          var secArr = strPos[1].split(" ");


                          var course = secArr[1].replace("Course=", " ");

                          return course || "";


                      } else {
                          return false;
                      }
                  };


                  $scope.GetGolfDetails = function (value) {
                      //Y Complimentary=N Course=null

                      if (value) {


                          var strObj = new Object;
                          var strPos = value.split("Complimentary=");
                          var secArr = strPos[1].split(" ");



                          return secArr[0] === 'Y' ? "Complimentary" : "";


                      } else {
                          return false;
                      }
                  };
                  $scope.GetDetails = function (value) {


                      if (value) {
                          var strObj = new Object;
                          var strPos = value.indexOf("Details=") + 8;
                          var str = value.slice(strPos, value.length);



                          return str = value.slice(strPos, value.length);
                      } else {
                          return false;
                      }
                  };

                  $scope.GetCourse = function (value) {
                      var strObj = new Object;
                      var strPos = value.indexOf("Course=") + 8;
                      var str = value.slice(strPos, value.length);



                      return str = value.slice(strPos, value.length);

                  };

                  $scope.getHiResImageMain = function (value) {
                      var imagePathHiRes = 'http://www.didgigo.com/ProductImages//Uploaded//';
                      var hiResImg = "";
                      if (value) {
                          hiResImg = imagePathHiRes + value.replace("_thumblowres.jpg", ".jpg").replace("_thumblowres.png", ".png");
                      }

                      return hiResImg || " ";
                  }


                  $scope.header = {
                      logo: '/images/logo.png',
                      companyName: 'company A'
                  };

                  $scope.footer = {
                      text: 'TAJ Cape Town FACTCHURE powered by Taj'
                  };


                  $scope.banner = {
                      image1: 'images/slideshow-2.jpg',
                      image2: 'images/slideshow-2.jpg',
                      image3: 'images/slideshow-2.jpg',
                      show: 'true'
                  };


                  $scope.HasDiningFacilityInfo = function () {

                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Facility_DiningOnsiteResto) ||
                          $scope.GetTorF($scope.facts.Facility_DiningBar) ||
                          $scope.GetTorF($scope.facts.Facility_DiningCafe) ||
                          $scope.GetTorF($scope.facts.Facility_DiningRoomService) ||
                          $scope.GetTorF($scope.facts.Facility_DiningOutdoorDining) ||
                          $scope.GetTorF($scope.facts.Facility_DiningPrivateDining) ||
                          $scope.GetTorF($scope.facts.Facility_Dining_BBQ) ||
                          $scope.GetTorF($scope.facts.Facility_DiningPrivateDining)) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasFitnessFacilityInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Facility_FitnessSki) ||
                          $scope.GetTorF($scope.facts.Facility_FitnessPool) ||
                          $scope.GetTorF($scope.facts.Facility_FitnessSwimPoolBar) ||
                          $scope.GetTorF($scope.facts.Facility_FitnessKidsPool) ||
                          $scope.GetTorF($scope.facts.Facility_FitnessJacuzzi) ||
                          $scope.GetTorF($scope.facts.Facility_FitnessGym) ||
                          $scope.GetTorF($scope.facts.Facility_FitnessDaySpa)) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasFamilyFacilityInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Facility_FamilyKidsClub) ||
                          $scope.GetTorF($scope.facts.Facility_FamilyBabySitting) ||
                          $scope.GetTorF($scope.facts.Facility_FamilyChildMinding) ||
                          $scope.GetTorF($scope.facts.Facility_FamilyOnsitePlayground) ||
                          $scope.GetTorF($scope.facts.Facility_FamilyHighChair) ||
                          $scope.GetTorF($scope.facts.Facility_FamilyCot)) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  /**rates **/
                  $scope.HasAwardsRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_Awards)) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasTransportRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_TransportAirport) ||
                          $scope.GetTorF($scope.facts.Ratings_TransportCity)
                      ) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasMealPlanRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_MealPlan)) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasInsureanceRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_InsurancePublicLiability) ||
                          $scope.GetTorF($scope.facts.Ratings_InsurancePersonal)
                      ) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasMinimumStayInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_MinStay)) {
                          retValue = true;
                      }
                      return retValue;
                  }
                  $scope.HasChildPoliciyRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_ChildPolicyAdultsOnly) ||
                          $scope.GetTorF($scope.facts.Ratings_ChildPolicyChildFree)
                      ) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasServicingRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_Servicing)) {
                          retValue = true;
                      }
                      return retValue;
                  }

                  $scope.HasSpecialOffersRatesInfo = function () {
                      var retValue = false;
                      if ($scope.GetTorF($scope.facts.Ratings_SpecialOffersStayPay) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOffersUpgrade) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOffersMeal) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOfferAirportTransfer) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOfferResortVoucher) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOfferFlowers) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOfferHoneymoon) ||
                          $scope.GetTorF($scope.facts.Ratings_SpecialOfferOthers)) {
                          retValue = true;
                      }
                      return retValue;

                  }

                  $scope.GetStaticGoogleMapUrl = function () {
                      var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";
                      //Set the Google Map Center.
                      staticMapUrl += "?center=" + $('.coor1').val() + "," + $('.coor2').val();
                      //Set the Google Map Size.
                      staticMapUrl += "&size=640x480&scale=2";
                      //Set the Google Map Type.
                      staticMapUrl += "&maptype=roadmap";

                      //Set the Google Map Zoom.
                      staticMapUrl += "&zoom=" + $('.zoom').val();

                      //Loop and add Markers.
                      var color = $('.markerColor').val();
                      var icon = color != null ? color.toLowerCase() : "red";

                      staticMapUrl += "&markers=color:" + icon + "%7C" + $('.marker1').val() + "," + $('.marker2').val();



                      return staticMapUrl;
                  }

                  $scope.SaveMap = function () {

                      var staticMapUrl = $scope.GetStaticGoogleMapUrl();
                      $('.MapGmapsUrl').val(staticMapUrl);

                      //Display the Image of Google Map.
                      var imgMap = document.getElementById("imgMap");
                      $("#imageMap2").attr("src", staticMapUrl);


                      var can = document.getElementById("imgCanvas");
                      var img = document.getElementById("imageMap2");

                      if (can) {
                          can.height = img.height;
                          can.width = img.width;
                      }

                      //save to desktop
                      var ctx = can.getContext("2d");
                      ctx.drawImage(img, 0, 0);
                      can.toBlob(function (blob) {
                          saveAs(blob, "map.jpg");
                      }, "image/jpg");

                  }

                  $scope.getHiResOptionImage = function (thumblink) {
                      //http://www.didgigo.com/ProductImages//Thumbnails//mantra_peppers-spicers-peak-lodge_4186_0b30da7b-9b5f-46d9-a61e-203763705b58_thumblowres.jpg
                      var hiResLink = thumblink.replace('Thumbnails', 'Uploaded').replace('_thumblowres', '');
                      return hiResLink;
                  }

                  $scope.GetParticipantThumbPhoto = function (contactImage) {
                      var retValue = "";

                      if (contactImage) {
                          retValue = $scope.imageParticipantThumbs + contactImage.toString().replace(".jpg", "_thumb.jpg").replace(".png", "_thumb.png");
                      }

                      return retValue;
                  }

              } ])

        .config(function ($httpProvider) {

            $httpProvider.defaults.headers.post = {};

            $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";


        });
} ());