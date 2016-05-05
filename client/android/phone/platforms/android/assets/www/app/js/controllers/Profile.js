/**
 * Created by Henrikh on 1/20/16.
 */

app.controller('Profile', ['$scope', '$state', '$http', '$ionicPopup', 'RestURL', 'Settings','surveyService','$rootScope','$ionicLoading','$cordovaFileTransfer',
    function ($scope, $state, $http, $ionicPopup, RestURL, Settings,surveyService,$rootScope,$ionicLoading,$cordovaFileTransfer) {

    var self = $scope;

	self.show = function() {
    $ionicLoading.show({
      template: 'Synching data...'
    });
	  };
	  self.hide = function(){
		$ionicLoading.hide();
	  };
    //self.connectionMode = false;
    
    console.log('Profile');
    console.log(Settings.global);

    var chart = c3.generate({
        data: {
            columns: [
                ['canceled', 80],
                ['hired', 120]
            ],
            type: 'donut',
            colors: {
                canceled: '#f5f5f5',
                hired: '#387ef5'
            },
            onclick: function (d, i) {},
            onmouseover: function (d, i) {},
            onmouseout: function (d, i) {}
        },
        donut: {
            title: 'Job Success'
        }
    });


   $scope.downloadFile = function (id,question_id,answerImages,answer_image,answer_type) {

    var id= id;
    var question_id = question_id;
    var answerImages = answerImages;//'http://www.cooshti.com/store/images/brands/asics-logo-SMALL.jpg';
    var answer_image =answer_image;
    var answer_type=answer_type;


    //surveyService.insertOption(data.create[i].question[j].option[k].id,data.create[i].question[j].option[k].question_id,fileURLToSave,data.create[i].question[j].option[k].answer_image,data.create[i].question[j].option[k].answer_type);
    
    console.log("-  download details  ---"+id+'--'+question_id+'--'+answerImages+'--'+answer_image+'----'+answer_type);
    //alert("inside file")
    //var options = new FileUploadOptions(); "http://www.cooshti.com/store/images/brands/asics-logo-SMALL.jpg"
   var fileTransfer = new FileTransfer();
    //alert("inside file 2")
    console.log("answerImages.answer----"+answerImages);
    
    
    var uri = encodeURI(answerImages);
   //var uri = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");

   var imageName = answerImages.split('/').pop();
   var fille = imageName.split('.');   
   //alert(fille[fille.length - 2]);
   //var kill = imageName.indexOf(imageName.length -1);
   //console.log("----------------"+imageName +'--kill'+kill);

    //alert("inside file 3")
   
   //var fileURL =  "/sdcard/Download/"+"bitcoin1.jpg";
   //var fileURL =  "cdvfile:///storage/emulated/0/DCIM/"+fille[fille.length - 2]+".JPG"; //imageName;
	//alert("file sys"+fileSystem.root.toURL());
	//var fileURL = fileSystem.root.toURL() +"/"+fille[fille.length - 2]+".JPG";
     //var fileURL =  "/Make/"+imageName;
    console.log("-----------------uri---"+uri);
    //console.log("----------------fileURL--"+fileURL);
  
  //surveyService.insertOption(id,question_id,fileURL,answer_image,answer_type);
  
   fileTransfer.download(
      uri,
      //fileSystem.root.toURL()+fille[fille.length - 2]+".JPG",
      $rootScope.dirEntry +fille[fille.length - 2]+".JPG",
       function(entry) {
         console.log("download complete: " + entry.toURL());

        // console.log ("------fileURL in Download method "+fileURL);
         //console.log("old---"+id+'--'+question_id+'--'+fileURL+'--'+answer_image+'----'+answer_type);
         //alert(" after download")
         surveyService.insertOption(id,question_id, $rootScope.dirEntry +fille[fille.length - 2]+".JPG",answer_image,answer_type);
         //alert("After insert")
         return   $rootScope.dirEntry +fille[fille.length - 2]+".JPG"; //fileURL; 
         //alert("changed url "+entry.toURL())
      },
        
      function(error) {
    	  alert("inside err" +JSON.stringify(error))
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
        
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
}
 
        $scope.SurveyCreate = function() { //SurveyWithQuestion.json
            //$http.get("surveyList.json").success(function (data){  
             //$http.get("SurveyWithQuestion.json").success(function (data){ 
			 //alert('in survey create');
        	self.show();
			

			console.log("----in survey cretae---");
        	  if($rootScope.connectionMode == false)  {
        		  $rootScope.connectionMode = true;
        	  }else{
        		  $rootScope.connectionMode = false;
        	  }
          //first save results
		  		var surveyid=1;
	//			alert("in saveSurveyresults");
				var userid =1;
				
			var promice = surveyService.pushSurveyResultToCloud(surveyid,userid);
			promice.then(function() {
			//alert('here');
				//self.hide();
					

				  
				  //$http.get("NewLocalJsonSurveyList.json").success(function (data){  
				  $http.get("http://45.55.156.148:8080/Mirrow/Survey_Default_Activity/get_all_Survey").success(function (data){ 
					console.log("----data---"+angular.toJson(data));
					console.log($rootScope.connectionMode)
					self.hide();
					if($rootScope.connectionMode == true)  {
						for (var i=0; i<= data.create.length - 1;i++) {
							surveyService.insertSurvey(data.create[i].id,data.create[i].survey_name,data.create[i].survey_description,data.create[i].survey_notes,data.create[i].client_name,data.create[i].client_id,data.create[i].store_id,data.create[i].product_name,data.create[i].product_id,data.create[i].country_name,data.create[i].country_id);
							for(var j=0; j<= data.create[i].question.length - 1;j++){
									surveyService.insertQuestion(data.create[i].question[j].id,data.create[i].question[j].the_question,data.create[i].question[j].display_type,data.create[i].question[j].answer_id,data.create[i].question[j].order_in_survey,data.create[i].question[j].group_name,data.create[i].question[j].group_id,data.create[i].question[j].rank_importance,data.create[i].question[j].created_by,
												data.create[i].question[j].created_date,data.create[i].question[j].updated_by,data.create[i].question[j].updated_date,data.create[i].question[j].survey_id );
console.log("OPTIONS.......... "+angular.toJson(data.create[i].question[j]));
								for (var k = 0; k< data.create[i].question[j].options.length; k++) {                           
								   console.log("----option--"+data.create[i].question[j].options[k].answer_type);
								   if (data.create[i].question[j].options[k].answer_type =="IMAGE_OPTIONS"){// && data.create[i].question[j].option[k].answer === !null
									console.log("---------------to downloAD--"+data.create[i].question[j].options[k].answer);
									console.log("------test first----"+angular.toJson(data.create[i].question[j].options[k]));							
									
									$scope.downloadFile(data.create[i].question[j].options[k].id,data.create[i].question[j].options[k].question_id,data.create[i].question[j].options[k].answer,data.create[i].question[j].options[k].answer_image,data.create[i].question[j].options[k].answer_type);
								   }else{
									   surveyService.insertOption(data.create[i].question[j].options[k].id,data.create[i].question[j].options[k].question_id,data.create[i].question[j].options[k].answer,data.create[i].question[j].options[k].answer_image,data.create[i].question[j].options[k].answer_type);
			                           console.log("----option--"+data.create[i].question[j].options[k].answer_type);
								   }
								}
					}
					}
				}

				
				})
				.error(function (error, status){
					//self.data.error = { message: error, status: status};
					console.log(error+status); 
					self.hide();
					//alert("Sync NOT Done "+status);		
				});
		
	});	

};

	$scope.uploadfile= function(){
		navigator.camera.getPicture(cameraSuccess, cameraError, { 
		    quality: 50,
		    destinationType: Camera.DestinationType.FILE_URL
		});
	}
	
	function cameraSuccess(fileURL){
			var syncURL = RestURL.baseURL+"Servey_result_Default_Activity/uploadFile";
			var imageURL = "data:image/jpeg;charset=utf-8;base64," + fileURL;
			
		   var uri = syncURL;
		   //alert(uri);
		   var options = new FileUploadOptions();
			
		   options.fileKey = "uploadfile";
		   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
		   options.mimeType = "image/jpeg";
		   options.chunkedMode = false;
		   //var headers = {'headerParam':'headerValue'};
		   
			//var headers={'Authorization':"Basic " + Base64.encode(username + ":" + password)};
			//options.headers = headers;
		   
		   //alert("fileURl to be uploaded"+fileURL);
		    var ft = new FileTransfer();
		   ft.upload(imageURL, encodeURI(uri), onSuccess, onError, options);

		   /*$cordovaFileTransfer.upload(uri,fileURL, options).then(function(data){
			  alert("Success",angular.toJson(data));
			},function(err){
			  alert("ERROR"+angular.toJson(err));
			}, function(progress) {
			  alert(angular.toJson(progress));
			});*/
		   function onSuccess(r) {
		      alert("Code = " + r.responseCode);
		      console.log("Response = " + r.response);
			  var res = r.response.split("\":");			  
			  res = res[1].split("\"}");
			  res = res[0].split("\\")
			  res = res[0]+"\"";
			  console.log("Response now   = " + res);
			  
		      alert("Sent = " + r.bytesSent);
		   }

		   function onError(error) {
		      alert("An error has occurred: Code = " + error.code);
		      alert("An error has occurred: Code = " + angular.toJson(error));
		      console.log("upload error source " + error.source);
		      console.log("upload error target " + error.target);
		   }
	}
	
	function cameraError(message){
		 // load some default image here
		alert('Failed because: ' + message);
	};

}]);