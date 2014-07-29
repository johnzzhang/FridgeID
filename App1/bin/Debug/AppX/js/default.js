(function () {
    "use strict";


    function initialize() {
        WinJS.UI.processAll().done(function () {
            
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;
            // Get reference to Appbar control
            var appBar1 = document.getElementById("appBar1").winControl;

            var tasksDataSource = new DataSources.MyDataSource();

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
            //lvProducts.groupDataSource = tasksDataSource;
            lvProducts.itemDataSource = tasksDataSource;

            // Hide selection commands by default
            appBar1.hideCommands(document.querySelectorAll('.appBarSelection'));


            // When ListView item selected, display app bar
            lvProducts.addEventListener("selectionchanged", function () {
                if (lvProducts.selection.count() >= 1) {
                    appBar1.showCommands(document.querySelectorAll('.appBarSelection'));
                    appBar1.show();
                } else {
                    appBar1.hideCommands(document.querySelectorAll('.appBarSelection'));
                };
            });

            // Wire-up Add, Delete buttons
            document.getElementById("frmAdd").addEventListener("submit", function (evt) {
                evt.preventDefault();
                tasksDataSource.beginEdits();
                tasksDataSource.insertAtEnd(null, {
                    name: document.getElementById("inputTaskName").value
                }).done(function (newItem) {
                    tasksDataSource.endEdits();
                    document.getElementById("frmAdd").reset();
                    lvProducts.ensureVisible(newItem.index);
                });
            });


            document.getElementById("cmdDelete").addEventListener("click", function () {
                if (lvProducts.selection.count() == 1) {
                    lvProducts.selection.getItems().done(function (items) {
                        tasksDataSource.beginEdits();
                        tasksDataSource.remove(items[0].key).done(function () {
                            tasksDataSource.endEdits();
                        });
                    });
                }
            });

        });
    };


    document.addEventListener("DOMContentLoaded", initialize);
})();
