
function productController($scope, $http, $routeParams) {
    const API = `http://localhost:3000/products`;
    $scope.product = {
    };
    $scope.categoryList = [];
    $scope.productId = {};
    $scope.productList = [];
    const idProduct = $routeParams.id;
    $scope.Ao = [];
    $scope.Quan = [];
    $scope.Giay = [];

    // Lấy sản phẩm theo danh mục
    $scope.productCategory
    // Mặc định lấy danh sách sản phẩm và hiển thị ra ngoài
    $http.get("http://localhost:3000/products?_expand=category").then((response) => {
        $scope.productList = response.data;
        $scope.Ao = $scope.productList.filter((item) => item.categoryId == "1")
        $scope.Quan = $scope.productList.filter((item) => item.categoryId == "2")
        $scope.Giay = $scope.productList.filter((item) => item.categoryId == "3")
    });
    // lấy danh mục hiển thị ra ngoài
    $http.get("http://localhost:3000/categories").then((response) => {
        $scope.categoryList = response.data;
    });
    const getItemProduct = async () => {
        $http.get(`${API}/${idProduct}`).then(({ data }) => ($scope.product = data));
        console.log($scope.product)
    };
    if (idProduct) {
        getItemProduct();
    }
    //Lấy sản phẩm thuộc áo
    // $scope.edit = function (id) {
    //     $http.get("http://localhost:3000/products/" + id).then((response) => {
    //         $scope.productId = response.data;
    //         console.log($scope.productId)
    //     });
    // };
    // Xóa sản phẩm
    $scope.removeItem = function (id) {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (confirm) {
            $http
                .delete(`${API}/${id}`)
                .then(() => {
                    const newProducts = $scope.productList.filter((item) => item.id != id);
                    $scope.productList = newProducts;
                    toastr.success("Đã xóa thành công");
                })
                .catch((error) => console.log(error));
        }
    };
    $scope.addItem = function () {
        // e.preventDefault();
        $http
            .post(`${API}`, $scope.product).then(() => {
                window.location.href = "#!/";
            })
    };

    $scope.updateItem = function (e) {
        $http.put(`${API}/${$scope.product.id}`, $scope.product).then(() => {
            window.location.href = "#!/";
        });
    };
}
