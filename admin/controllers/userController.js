function userController($scope, $http, $routeParams) {
    const API = `http://localhost:3000/user`;
    $scope.user = {};
    $scope.userList = [];

    $http.get("http://localhost:3000/user").then((response) => {
        $scope.userList = response.data;
    });
    $scope.addUser = function () {
        console.log($scope.user)
        // // e.preventDefault();
        $http
            .post(`${API}`, $scope.user).then(() => {
                alert("Bạn đã đăng kí thành công");
                window.location.href = "#!/listUser";
            })
    };
}