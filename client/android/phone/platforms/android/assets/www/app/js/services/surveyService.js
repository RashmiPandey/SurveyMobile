/**
 *
 */


app.service("surveyService", ['$log', '$location','surveyFactory','$rootScope','$timeout','$q','RestURL','$http', function ($log, $location,surveyFactory,$rootScope,$timeout,$q,RestURL,$http) {

  var self = this;
  
  var survey = {};
  var Questions = [];
  var QuestionOptions = [];
  var surveyResultrecords = [];
  var route =[];
  var store = [];
  var login =[];
  var survey =[];
  var isEnd = false;
  this.createDatabaseTables=function(){
  	console.log("---------------In table creation phase");
	surveyFactory.setisEnd(false);
    var survey = "CREATE TABLE  survey ("+
            "Id  bigint NOT NULL PRIMARY KEY ,"+
            "Survey_name         text,"+
            "Survey_description  text,"+
            "Survey_notes        text,"+
            "Client_name         text,"+
            "Client_id           bigint,"+
            "Store_id           bigint,"+
            "Product_name        text,"+
            "Product_id          bigint,"+
            "Country_name        text,"+
            "Country_id          bigint);"
            var SurveyTable = surveyFactory.execute($rootScope.db,survey,[]);
            console.log("----------Survey  table ----------"+SurveyTable);
            

            var route ="CREATE TABLE route("+
                        "Id bigint NOT NULL PRIMARY KEY,"+
                        "route_name  text,"+
                        "location    text);"
            var routeQuery = surveyFactory.execute($rootScope.db,route,[]);
            console.log("----------route  table ----------"+routeQuery);


			
        	var query1="CREATE TABLE  client ("+
        			  "Id             INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
        			  "Client_id      bigint,"+
        			  "Client_name    text,"+
        			  "Notes          text,"+
        			  "Createdby      bigint,"+
        			  "Create_Date    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
        			  "Modifiedby     bigint,"+
        			  "Modified_Date  timestamp NOT NULL);"        			
        	var clientTable = surveyFactory.execute($rootScope.db,query1,[]);

        	console.log("-------client----created----"+clientTable);

        	var country = "CREATE TABLE  country ("+
        				  "Id bigint NOT NULL PRIMARY KEY,"+
        				  "Common_Name            text,"+
        				  "Formal_Name            text,"+
        				  "Iso_three_letter_code  text,"+
        				  "Capital                text,"+
        				  "Currency_Name          text,"+
        				  "Telephone_code         text);"
        				  
        	var CountryTable = surveyFactory.execute($rootScope.db,country,[]);
        	console.log("----------country table ----------"+CountryTable);

        	var productTable = "CREATE TABLE  product ("+
        				"Id  bigint NOT NULL PRIMARY KEY,"+
        				"Product_name   text,"+
        				"Product_notes  text,"+
        				"Created_by     bigint,"+
        				"Created_date   timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
        				"Modified_by    bigint,"+
        				"Modified_date  timestamp NOT NULL);"
        	var ProductTable = surveyFactory.execute($rootScope.db,productTable,[]);
        	console.log("----------Product table ----------"+ProductTable);

        	var surveyResults = "CREATE TABLE  survey_results ("+
        						"Id bigint NOT NULL PRIMARY KEY,"+
        						"question_id  bigint NOT NULL,"+
        						"option_id    bigint ,"+
        						"client_id    bigint NOT NULL,"+
        						"product_id   bigint NOT NULL,"+
        						"country_id   bigint NOT NULL,"+
        						"survey_id    bigint NOT NULL,"+
        						"user_id      bigint NOT NULL,"+
								"answer       text)";
								
        	var surveyResult = surveyFactory.execute($rootScope.db,surveyResults,[]);
        	console.log("----------survey_results  table ----------"+surveyResult);

        	

        	var store ="CREATE TABLE store ("+
					  "store_id    bigint NOT NULL PRIMARY KEY,"+
  					   "store_name  varchar(255),"+
					  "location    varchar(255),"+
  					   "route_id     bigint NOT NULL);"
  						/* Foreign keys 
  						"CONSTRAINT store_ibfk_1"+
    					"FOREIGN KEY (store_id)"+
    					"REFERENCES route(Id)");"*/

			var storeQuery = surveyFactory.execute($rootScope.db,store,[]);
        	console.log("----------store  table ----------"+storeQuery);


            var user = "CREATE TABLE user("+
                "Id INTEGER NOT NULL PRIMARY KEY,"+
                "username varchar(255),"+
                "password varchar(255),"+
                " email varchar(255));"
  		    var userQuery = surveyFactory.execute($rootScope.db,user,[]);
            console.log("----------store  table ----------"+userQuery);

        	//Rashmi code
			var question_query="CREATE TABLE question (Id bigint NOT NULL PRIMARY KEY ,"+
				  "The_question     text,"+
				  "Display_type     text,"+
				  "answer_id        bigint,"+
				  "Order_in_survey  bigint,"+
				  "Group_name       text,"+
				  "Group_id         bigint,"+
				  "Rank_importance  bigint,"+
				  "Created_by       bigint,"+
				  "Created_date     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
				  "Updated_by       bigint,"+
				  "Updated_date     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
				  "survey_id        bigint NOT NULL)";
			var result = surveyFactory.execute($rootScope.db,question_query,[]);
			
			question_query="CREATE TABLE  option ( "+
				"id            bigint NOT NULL PRIMARY KEY ,"+
				"question_id   bigint NOT NULL,"+
				"answer        text,"+
				"answer_image  text,"+
				"answer_type   varchar(200)"+
				")";

			result = surveyFactory.execute($rootScope.db,question_query,[]);

			//alert("Tables created successfully "+result);			
}


	this.insertQuestion =function (id,theQuestion,disType,ansId,Orderinsur,groName,groId,ranImp,creBy,creDatte,upBy,update,surId){
	        var create_user_query="";
	        var userResult="";
	        create_user_query = "INSERT INTO question VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
	        userResult = surveyFactory.execute($rootScope.db,create_user_query,[id,theQuestion,disType,ansId,Orderinsur,groName,groId,ranImp,creBy,creDatte,upBy,update,surId]);//.then(function(res){
	        console.log("------"+userResult);
	        //return userResult;
	}



	this.insertOption =function(id,question_id,answer,answer_image,answer_type){
	var insert_question_query ="";
	                var result = "";
	insert_question_query="INSERT INTO option VALUES(?,?,?,?,?)";               
	                result = surveyFactory.execute($rootScope.db,insert_question_query,[id,question_id,answer,answer_image,answer_type]);             
	                console.log("Values added in option table "+result);
	
	}

	this.insertRecords=function(){
				var insert_question_query ="";
				var result = "";
				/*insert_question_query="INSERT INTO question VALUES(1,' Coke Zero is better or Diet Coke ? ','PLAIN_TEXT',NULL,1,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in question table "+result);			
				insert_question_query="INSERT INTO question VALUES(2,' What Coca Cola products you see in store ? ','OPTION_LABEL',NULL,2,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);	
				console.log("Values added in question table "+result);				
				insert_question_query="INSERT INTO question VALUES(3,'What is your preference?','IMAGE_OPTIONS',NULL,3,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);			
				console.log("Values added in question table "+result);				
				insert_question_query="INSERT INTO question VALUES(4,' Will you recommend Diet Coke to your peers ? ','YES_NO_CANCEL',NULL,4,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);		
				console.log("Values added in question table "+result);		
				
				insert_question_query="INSERT INTO question VALUES(5,'What is your opinion for other brands like Pepsi ? ','PLAIN_TEXT',NULL,5,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);		
				console.log("Values added in question table "+result);	
                insert_question_query="INSERT INTO question VALUES(6,'How frequently you have Pepsi ? ','CAMERA',NULL,5,NULL,NULL,NULL,NULL,'2016-04-05 11:44:23',NULL,'',1)";               
                result = surveyFactory.execute($rootScope.db,insert_question_query,[]);     
                console.log("Values added in question table "+result);*/

				//option table
				insert_question_query="INSERT INTO option VALUES(1,1,'','','PLAIN_TEXT')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);			
				
				insert_question_query="INSERT INTO option VALUES(2,2,'Coke','','OPTION_LABEL')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);			
				
				insert_question_query="INSERT INTO option VALUES(3,2,'Fanta','','OPTION_LABEL')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);			
				
				insert_question_query="INSERT INTO option VALUES(4,2,'Diet Coke','','OPTION_LABEL')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);	
				
				insert_question_query="INSERT INTO option VALUES(5,3,'img/perry.png','','IMAGE_OPTIONS')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);	
				
				insert_question_query="INSERT INTO option VALUES(6,3,'img/mike.png','','IMAGE_OPTIONS')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);

				insert_question_query="INSERT INTO option VALUES(7,4,'Yes','','YES_NO_CANCEL')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);					

				insert_question_query="INSERT INTO option VALUES(8,4,'No','','YES_NO_CANCEL')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);									

				insert_question_query="INSERT INTO option VALUES(9,5,'','','PLAIN_TEXT')";				
				result = surveyFactory.execute($rootScope.db,insert_question_query,[]);				
				console.log("Values added in option table "+result);

                insert_question_query="INSERT INTO option VALUES(10,6,'','','CAMERA')";              
                result = surveyFactory.execute($rootScope.db,insert_question_query,[]);             
                console.log("Values added in option table "+result);
	}
//dhina insertion

    this.insertRoutes=function(){
            var insert_route_query ="";
            var routeResult="";
                insert_route_query = "INSERT INTO route VALUES(1,'routeName ','Chennai')";
                routeResult = surveyFactory.execute($rootScope.db,insert_route_query,[]);
                console.log("Values added in Route table "+routeResult);

                insert_route_query = "INSERT INTO route VALUES(2,'routeName2','kolkata')";
                routeResult = surveyFactory.execute($rootScope.db,insert_route_query,[]);
                console.log("Values added in Route table "+routeResult);

                insert_route_query = "INSERT INTO route VALUES(3,'routeName3 ','Mumbai')";
                routeResult = surveyFactory.execute($rootScope.db,insert_route_query,[]);
                console.log("Values added in Route table "+routeResult);
                }
    this.insertStore=function(){
        var insert_store_query="";
        var storeResult="";
                insert_store_query = "INSERT INTO store VALUES(1,'storeName 1','Chennai',1)";
                storeResult = surveyFactory.execute($rootScope.db,insert_store_query,[]);
                console.log("Values added in Store table "+storeResult);

                insert_store_query = "INSERT INTO store VALUES(2,'storeName2','kolkata',2)";
                storeResult = surveyFactory.execute($rootScope.db,insert_store_query,[]);
                console.log("Values added in Store table "+storeResult);

                insert_store_query = "INSERT INTO store VALUES(3,'storeName3','Mumbai',3)";
                storeResult = surveyFactory.execute($rootScope.db,insert_store_query,[]);
                console.log("Values added in Store table "+storeResult);
    }
    this .insertUser=function(){
        var insert_user_query="";
        var userResult="";
                insert_user_query = "INSERT INTO user VALUES(1,'dhina','12345','dhinakarintech@gmail.com')";
                userResult = surveyFactory.execute($rootScope.db,insert_user_query,[]);
                console.log("User table -1----values"+userResult);

                 insert_user_query = "INSERT INTO user VALUES(2,'suresh','12345','suresh.ssa@gmail.com')";
                userResult = surveyFactory.execute($rootScope.db,insert_user_query,[]);
                console.log("User table ---2--values"+userResult);

                 insert_user_query = "INSERT INTO user VALUES(3,'kumz','12345','asdf@gmail.com')";
                userResult = surveyFactory.execute($rootScope.db,insert_user_query,[]);
                console.log("User table ---2--values"+userResult);
        }

 this.createUser = function(id,username,password,email){
        var create_user_query="";
        var userResult="";
        create_user_query = "INSERT INTO user VALUES(?,?,?,?)";
        userResult = surveyFactory.execute($rootScope.db,create_user_query,[id,username,password,email])//.then(function(res){
          //  console.log("----------INSERT ID-----"+res.insertId);
           //$rootScope.userId =  res.insertId;
           //console.log("Stting.user-----"+$rootScope.userId);
        /*},function (err) {
            console.error(err);
        });*/
        console.log("User table -1----values"+userResult);//+$rootScope.userId);
        return userResult;
    }
 this .insertClient=function(){
        var insert_client_query="";
        var clientResult="";
                insert_client_query = "INSERT INTO client VALUES(null,1,'Client_name','Notes',1,Date(),1,Date())";
                clientResult = surveyFactory.execute($rootScope.db,insert_client_query,[]);
                console.log("client table -1----values"+clientResult);

                 insert_client_query = "INSERT INTO client VALUES(null,2,'Client_name','Notes',2,Date(),2,Date())";
                clientResult = surveyFactory.execute($rootScope.db,insert_client_query,[]);
                console.log("client table ---2--values"+clientResult);

                insert_client_query = "INSERT INTO client VALUES(null,3,'Client_name','Notes',3,Date(),3,Date())";
                clientResult = surveyFactory.execute($rootScope.db,insert_client_query,[]);
                console.log("client table ---2--values"+clientResult);
    }

      this .insertSurvey=function(id,sName,sDescription,sNotes,cName,cId,pName,pId,cpuntryName,countryId,sId){
        var insert_survey_query=""; // 
        var surveyResult="";
                /*insert_survey_query = "INSERT INTO survey VALUES(null,'surveyName1','Survey_description','Survey_notes','Client_name',1,'Product_name',1,'Country_name',1,1)";
                surveyResult = surveyFactory.execute($rootScope.db,insert_survey_query,[]);
                console.log("survey table -1----values"+surveyResult);
                 insert_survey_query = "INSERT INTO survey VALUES(null,'surveyName2','Survey_description2','Survey_notes2','Client_name2',2,'Product_name2',2,'Country_name2',2,2)";
                surveyResult = surveyFactory.execute($rootScope.db,insert_survey_query,[]);
                console.log("survey table ---2--values"+surveyResult);
                insert_survey_query = "INSERT INTO survey VALUES(null,'surveyName3','Survey_description3','Survey_notes3','Client_name3',3,'Product_name3',3,'Country_name3',3,1)";
                surveyResult = surveyFactory.execute($rootScope.db,insert_survey_query,[]);
                console.log("survey table ---3--values"+surveyResult);*/

                 insert_survey_query = "INSERT INTO survey VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                surveyResult = surveyFactory.execute($rootScope.db,insert_survey_query,[id,sName,sDescription,sNotes,cName,cId,pName,pId,cpuntryName,countryId,sId]);
                console.log("survey table -----values"+surveyResult);


    }



//to get values from db

    this.getRoutes=function(){
        //var select_route_query =""
        $timeout(function(){          
        var getRouteQuery=""
        var select_route_query = "SELECT * FROM route"; // WHERE Id=?
        getRouteQuery = surveyFactory.execute($rootScope.db,select_route_query,[]);
        console.log("Values in route table -------------- "+getRouteQuery);
            getRouteQuery.then(
              function(res) {
                console.log("in service----route---"+angular.toJson(res.rows));
                console.log("----------length"+res.rows.length);
                 if(res.rows.length > 0) {
                    for(var i=0; i<res.rows.length; i++){
                        route.push(res.rows.item(i));
                    }   
                    surveyFactory.setRoutes(route);
                } else {
                    console.log("No results found");                    
                }               
                console.log("Routes-- "+angular.toJson(route));
               // routeList = route;                
              });       
        }, 500);   
        console.log("Up on------------------------------- "+angular.toJson(route));
        return route;  
    }


    this.getStores=function(){
        //var select_route_query =""
        $timeout(function(){          
        var getStoreQuery=""
        var select_store_query = "SELECT * FROM store"; // WHERE Id=?
        getStoreQuery = surveyFactory.execute($rootScope.db,select_store_query,[]);
        console.log("Values in store table -------------- "+getStoreQuery);
        
            getStoreQuery.then(
              function(res) {
                console.log("in service----store---"+angular.toJson(res));
                console.log("----------length in store"+res.rows.length);
                 if(res.rows.length > 0) {
                    for(var i=0; i<res.rows.length; i++){
                        store.push(res.rows.item(i));
                    }    
                    surveyFactory.setStores(store);               
                } else {
                    console.log("No results found");                    
                }               
                console.log("Store-- "+angular.toJson(store));
                //storeList =store ;  
              });       
        }, 1000); 
       return store;
    }


this.login =function(userName,password){
console.log("UserName   Password -------------- "+userName+'---'+password);
        $timeout(function(){          
        var getRouteQuery=""
        var select_login_query = "SELECT * FROM user WHERE email=? AND password=?"; // WHERE username=? AND password=? userName,password
        var loginQuery = surveyFactory.execute($rootScope.db,select_login_query,[userName,password]);
        console.log("Login table -------------- "+angular.toJson(loginQuery));
            loginQuery.then(
              function(res) {
        console.log("Outside---"+res.rows.length);
                if(res.rows.length > 0) {                    
                  for(var i=0; i<res.rows.length; i++){
                        login.push(res.rows.item(i));
                    }
                } else {
                    console.log(" login No results found");                    
                }           
                console.log("login-- "+angular.toJson(login));                        
              });       
        }, 500);           
        return login; 
    }


//-------------------------------------------
this.getSurvey =function(){
      //  $timeout(function(){ 
      var q = $q.defer();         
        var getRouteQuery=""
        var select_login_query = "SELECT * FROM survey";
        var loginQuery = surveyFactory.execute($rootScope.db,select_login_query,[]).then(function(res){
            console.log("----res--"+res);
            if(res.rows.length > 0) {         
				survey =[];
                  for(var i=0; i<res.rows.length; i++){
                        survey.push(res.rows.item(i));
                    }
                    q.resolve(survey);
                    //surveyFactory.setSurvey(survey); 
                } else {
                    console.log(" getSurvey No results found");                    
                }           
                console.log("survey-- "+angular.toJson(survey)); 
                q.reject(null);    
        });
        console.log("survey table -------------- "+angular.toJson(loginQuery));
            //loginQuery.then(
        /*      function(res) {
        console.log("Survey---"+res.rows.length);
                                   
              }); */      
       // }, 1500);           
        //return survey; 
        return q.promise;
    }



	this.getAllQuestionsForASurvey =function(survey_id){
		//$timeout(function(){
            console.log("----getAllQuestionsForASurvey--");
			var q = $q.defer();
			var question_query="SELECT Id,The_question,survey_id FROM QUESTION WHERE survey_id= ?";
			var result = surveyFactory.execute($rootScope.db,question_query,[survey_id]).then(function(res){

                if(res.rows.length > 0) {
                    for(var i=0; i<res.rows.length; i++){

                        Questions.push(res.rows.item(i));
                        console.log("----SQ--",angular.toJson(res.rows.item(i)));
                        surveyFactory.setQuestions(Questions[i]);
                    }   
                    q.resolve(Questions);              
                } else {
                    console.log(" getAllQuestionsForASurvey No results found");                    
                }       
                q.reject(null);         
                //console.log("QUESTIONS "+angular.toJson(surveyFactory.getQuestions()));


            });					
			//result.then(
			  //function(res) {
				//console.log("in service"+angular.toJson(res));
				
			// });		
		//}, 500);
		return q.promise;
	}

	self.getQuestionOptionsForQuestion=function(question_id){		
		//$timeout(function(){		
        //alert("--------------getQuestionOptionsForQuestion---------"+question_id)	;
			var question_query="SELECT id,question_id,answer,answer_image,answer_type FROM OPTION WHERE question_id= ?";
			var result = surveyFactory.execute($rootScope.db,question_query,[question_id]);					
			result.then(
			  function(res) {				
				surveyFactory.setQuestionOptions([]);
				survey.QuestionOptions = [];
				 if(res.rows.length > 0) {				 
					for(var i=0; i<res.rows.length; i++){						
						survey.QuestionOptions.push(res.rows.item(i));
						surveyFactory.setQuestionOptions(survey.QuestionOptions);
					} 					
				} else {
					console.log("No-------????--- results found");					
				}				
				console.log("QUESTION OPTIONS "+angular.toJson(surveyFactory.getQuestionOptions()));
			  });		
		//}, 500);
			
	}

	this.getNextQuestion=function(survey_id,question_id){
    console.log("--------------getNextQuestion---------") ;		
	return $q(function(resolve, reject) {
		//alert("from page ==>"+question_id)
		var quest_id = eval(question_id)+1;
			//alert("id tofetch rec for  ==>"+quest_id+" "+survey_id);
		$timeout(function(){			
			var question_query="SELECT Id,The_question,survey_id FROM QUESTION WHERE survey_id= ? and order_in_survey = ?";
			var result = surveyFactory.execute($rootScope.db,question_query,[survey_id,quest_id]);	
		
			result.then(
			  function(res) {			  
				 if(res.rows.length > 0) {
				// alert(res.rows.length);	
						surveyFactory.setQuestion(res.rows.item(0));												
						surveyFactory.setNextquestionId(quest_id);									
						resolve(surveyFactory.getNextquestionId());		
						self.getQuestionOptionsForQuestion(res.rows.item(0).Id);	
						
				} else {
					surveyFactory.setNextquestionId(quest_id);							
					console.log("No results found");	
					if(surveyFactory.getNextquestionId()!=0){
						isEnd = true;			
						surveyFactory.setisEnd(isEnd);			
					}else{
						surveyFactory.setisEnd(false);
					}
						reject();
				}				
			  });		
		},1500);
			
						
	});
	}

	self.pushSurveyResultToCloud = function(surveyid,userid){
		return $q(function(resolve, reject) {
		var syncURL = RestURL.baseURL+"Servey_result_Default_Activity/create_Servey_result_list";
		//fetch all the records for this user from SQLlite
    	var surveyResultsQuery = "SELECT "+
		"Id,"+
		"question_id,"+
		"option_id,"+
		"client_id,"+
		"product_id,"+
		"country_id,"+
		"survey_id,"+
		"user_id,"+
		"answer from survey_results";
    	
    	var result = surveyFactory.execute($rootScope.db,surveyResultsQuery,[]);					
		result.then(
			 function(res) {
			 if(res.rows.length > 0) {
			 surveyResultrecords=[];
				for(var i=0; i<res.rows.length; i++){					
					surveyResultrecords.push(res.rows.item(i));					
				}
				//alert(syncURL);
				console.log("records............."+angular.toJson(surveyResultrecords.length));
				if(surveyResultrecords.length>0){					
				//push results to server
					$http({method: 'POST', url: syncURL,
						data: surveyResultrecords	
				        })
			            .success(function(result){ 
							console.log( "yay" +JSON.stringify(result));						
							resolve(result);								
							console.log("PUSH completed ");									
						})
				        .error(function (error, status){
							console.log(error+status); 
							reject();
							alert("Sync NOT Done "+status);		
						});
				}else{
					console.log("No results to sync");
					resolve(result);	
				}
				
			} else {
				console.log("No results found");		
				resolve(result);	
			}				
		 });		
		});
	};

}]);