
function categoryController($scope, $http, $routeParams) {
    const API = `http://localhost:3000/categories`;
    $scope.category = {
    };
    $scope.categoryId = {};
    $scope.categoryList = [];
    const idCategory = $routeParams.id;
    // Mặc định lấy danh sách sản phẩm và hiển thị ra ngoài
    $http.get("http://localhost:3000/categories").then((response) => {
        $scope.categoryList = response.data;
    });
    const getItemCategory = async () => {
        $http.get(`${API}/${idCategory}`).then(({ data }) => ($scope.category = data));
        console.log($scope.category)
    };
    if (idCategory) {
        getItemCategory();
    }
    // Xóa sản phẩm
    $scope.removeItem = function (id) {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (confirm) {
            $http
                .delete(`${API}/${id}`)
                .then(() => {
                    const newCategories = $scope.categoryList.filter((item) => item.id != id);
                    $scope.categoryList = newCategories;
                    toastr.success("Đã xóa thành công");
                })
                .catch((error) => console.log(error));
        }
    };
    $scope.addCategory = function () {
        $http
            .post(`${API}`, $scope.category).then(() => {
                window.location.href = "#!/listCategory";
            })
    };

    $scope.updateItem = function (e) {
        $http.put(`${API}/${$scope.category.id}`, $scope.category).then(() => {
            console.log("thanh cong");
            window.location.href = "#!/listCategory";
        });
    };
};