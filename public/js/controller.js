(function () {
    angular.module("GroceryApp")
        .controller("ListCtrl", ListCtrl)
        .controller("EditCtrl", EditCtrl);

    function ListCtrl(GroceryService, $state) {
        var vm = this;
        vm.products = "";
        vm.typesOfSearch = ['Brand','Name'];
        vm.searchType = [];
        vm.searchType.selectedType = [];
        vm.sortBy = "";
        vm.keyword = "";

        vm.totalItems = 0;
        vm.itemsPerPage = 20;
        vm.maxSize = 8;
        vm.currentPage = 1;

        vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);

            GroceryService.search(vm.searchType, vm.keyword, vm.sortBy, vm.itemsPerPage, vm.currentPage)
                .then(function (products) {
                    vm.products = products.rows;
                    vm.totalItems = products.count;
                }).catch(function (err) {
                console.info("Some Error Occurred",err)
            });
        };

        vm.search = function (searchType, keyword, sortBy) {
            if(searchType.length==0) {
                alert('Please select at least one search type');
            }
            else {
                vm.searchType = searchType;
                vm.keyword = keyword;
                GroceryService.search(searchType, keyword, sortBy, vm.itemsPerPage, vm.currentPage)
                    .then(function (products) {
                        vm.products = products.rows;
                        vm.totalItems = products.count;
                    })
                    .catch(function (err) {
                        console.info("Some Error Occurred",err);
                    });
            }
        };
        
        vm.getProduct = function (id) {
            $state.go("edit", {'productId' : id});
        };

        GroceryService.search(vm.searchType, vm.keyword, vm.sortBy, vm.itemsPerPage, vm.currentPage)
            .then(function (products) {
                vm.products = products.rows;
                vm.totalItems = products.count;
            }).catch(function (err) {
            console.info("Some Error Occurred",err)
        });
    }

    ListCtrl.$inject = ['GroceryService', '$state'];

    function EditCtrl(GroceryService, $stateParams, $state) {
        var vm = this;
        vm.product = {};

        vm.cancel = function () {
            $state.go("list");
        };
        
        GroceryService.edit($stateParams.productId)
            .then(function (product) {
                vm.product = product;
            }).catch(function (err) {
                console.info("Some Error Occurred",err)
            });

        vm.save = function () {
            console.log("Saving the changes");
            GroceryService.save(vm.product)
                .then(function (result) {
                    console.info("Product saved.");
                    $state.go("list");
                }).catch(function (err) {
                console.info("Some Error Occurred",err)
            });
        }

        vm.remove = function () {
            console.log("Removing this product");
            if (confirm("Do you really want to remove this product from your Groceries?") == true) {
                GroceryService.remove(vm.product)
                    .then(function (result) {
                        console.info("Product removed.");
                        $state.go("list");
                    }).catch(function (err) {
                    console.info("Some Error Occurred",err)
                });
            } else {
                //do nothing
            }
        }

    }

    EditCtrl.$inject = ['GroceryService', '$stateParams', '$state'];
    
})();
