(function () {
    "use strict";


    function initialize() {
        WinJS.UI.processAll().done(function () {
            
            function updateFridge() {
                // Get reference to ListView control
                var lvProducts = document.getElementById("lvProducts").winControl;

                // Create a List of products
                var listProducts = new WinJS.Binding.List([
                            { name: "Milk", expDate: "12/13/14", category: "Beverages" },
                            { name: "Oranges", expDate: "12/13/14", category: "Fruit" },
                            { name: "Wine", expDate: "12/13/14", category: "Beverages" },
                            { name: "Apples", expDate: "12/13/14", category: "Fruit" },
                            { name: "Steak", expDate: "12/13/14", category: "Other" },
                            { name: "Eggs", expDate: "12/13/14", category: "Other" },
                            { name: "Mushrooms", expDate: "12/13/14", category: "Other" },
                            { name: "Yogurt", expDate: "12/13/14", category: "Other" },
                            { name: "Soup", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Pepsi", expDate: "12/13/14", category: "Beverages" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                            { name: "Cereal", expDate: "12/13/14", category: "Other" },
                ]);


                // Create grouped data source
                var groupListProducts = listProducts.createGrouped(
                    function (dataItem) {
                        return dataItem.category;
                    },
                    function (dataItem) {
                        return { title: dataItem.category };
                    },
                    function (group1, group2) {
                        return group1 > group2 ? 1 : -1;
                    }
                );


                // Bind the list of products to the ListView
                lvProducts.groupDataSource = groupListProducts.groups.dataSource;
                lvProducts.itemDataSource = groupListProducts.dataSource;
            }

            updateFridge();
        });
    };


    document.addEventListener("DOMContentLoaded", initialize);
})();
