// install   :      cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
// link      :      https://github.com/litehelpers/Cordova-sqlite-storage


  app.factory("surveyFactory",['$q', '$window', function ($q, $window) {

  var survey = {};
  survey.Questions = [];
  survey.question={};
  survey.QuestionOptions = {};
  survey.routesList = {};
  isEnd = false;
  isStart = false;
  
  var nextquestionId = 0;
  var prevquestionId = 0;
  
    return {
	
	setQuestions:function (questions) {        
		survey.Questions=[];
		survey.Questions = questions;        
      },
	  getQuestions:function () {        
        return survey.Questions;
      },
	  setRoutes:function (routesList) {        
    survey.routesList=[];
    survey.routesList = routesList;        
      },
    getRoutes:function () {        
        return survey.routesList;
      },
    setStores:function (storeList) {
    survey.storeList =[];
    survey.storeList = storeList;
    },
    getStores:function (storeList) {
    return survey.storeList;
    },
	  setQuestionOptions:function (questionOptions) {        
		survey.QuestionOptions = questionOptions;        
      },
	  getQuestionOptions:function () {
        
        return survey.QuestionOptions;
      },

	  setQuestion:function (question) {        
		survey.question = question;        
      },
	  getQuestion:function () {
        
        return survey.question;
      },
	  setNextquestionId:function (questionId) {        
		nextquestionId = questionId;        
      },
	  getNextquestionId:function () {
        
        return nextquestionId;
      },
	  setPrevquestionId:function (questionId) {        
		prevquestionId = questionId;        
      },
	  getPrevquestionId:function () {
        
        return prevquestionId;
      },
	  setisEnd:function (end) {        
		isEnd = end;        
      },
	  getisEnd:function () {
        
        return isEnd;
      },

	  setisStart:function (start) {        
		isStart = start;        
      },
	  getisStart:function () {
        
        return isStart;
      },

      execute: function (db, query, binding) {
        var q = $q.defer();
        
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {		  
              q.resolve(result);
			  //alert("any result in factory? for query  "+query+angular.toJson(result));
            },
            function (transaction, error) {
              console.log("error in factory" +query+angular.toJson(error));
			  q.reject(error);			  
            });
        });
        return q.promise;
      },
      deleteDB: function (dbName) {
        var q = $q.defer();

        $window.sqlitePlugin.deleteDatabase(dbName, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      }	  
    };
  }]);