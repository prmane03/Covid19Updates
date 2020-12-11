const url = "https://covid19.mathdro.id/api";
const newsurl = "https://newsapi.org/v2/everything?q=corona&apiKey=c0947f7886fe48c8b6be3c96ca0d473a"
let app = angular.module("myapp",[]);

app.controller("myctrl", ($scope,$http)=>{

$scope.title = "COVID-19 WorldData";
//get data
$http.get(url).then(
(response)=>{//for success
console.log(response.data);
$scope.all_data = response.data;

$scope.all_data.confirmed.value = $scope.fnum(response.data.confirmed.value);
$scope.all_data.recovered.value = $scope.fnum(response.data.recovered.value);
$scope.all_data.deaths.value = $scope.fnum(response.data.deaths.value);
},
(error)=>{//for error
console.log(error);
});

//contries data
$scope.changevalue = ()=>{
    console.log($scope.c);
    
    var country = $scope.c;
    if(country ==""){
        $scope.c_data = undefined;
        return;
    }
    $http.get(`${url}/countries/${country}`).then(
    (response)=>{
        console.log(response.data);
        $scope.c_data = response.data;
        $scope.c_data.confirmed.value = $scope.fnum(response.data.confirmed.value);
        $scope.c_data.recovered.value = $scope.fnum(response.data.recovered.value);
        $scope.c_data.deaths.value = $scope.fnum(response.data.deaths.value);
        },
    (error)=>{
        console.log(error);
    });
};

//Convert number to proper format
$scope.fnum =(x) =>{
	if(isNaN(x)) return x;

	if(x < 9999) {
		return x;
	}
	else if(x < 999999) {
		return (x/1000).toFixed(2) + "K";
	}
	else if( x < 999999999) {
		return (x/1000000).toFixed(2) + "M";
	}

	else if(x < 999999999999) {
		return (x/1000000000).toFixed(2) + "B";
	}

	else if(x < 999999999999999) {
		return (x/1000000000000).toFixed(2) + "T";
	}
	else {
	    return " Qu +"
	}

}

//get corona news
$http.get(newsurl).then(
(response)=>{//for success
console.log(response.data);
$scope.news = response.data;
},
(error)=>{//for error
console.log(error);
});

});

