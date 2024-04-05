sap.ui.define([
    "sap/ui/base/ManagedObject",
    "customer/MaintainBillOfMaterialExt/changes/coding/libs/messages",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], function(ManagedObject, messages, JSONModel, Filter) {
    "use strict";
    return ManagedObject.extend("customer.MaintainBillOfMaterialExt.coding.utils.Table", {
        _oMainController: null,
        _oComponent: null,
        _oView: null,
        _oModel: null,
        _oResourceBundle: null,
        _oRouter: null,
        _oDialog: null,
        _oList: null,
        _oInternalList: null,
        _oFilterHelper: null,
        _oTabBarFilterHelper: null,
        constructor: function(oMainController) {
            try {
                this._oMainController = oMainController;
                this._oView = this._oMainController.getView();
                this._oModel = this._oView.getModel();
                let oModel = new JSONModel();
                this._oView.setModel(oModel, "viewModel");
                this.viewModel = this._oView.getModel("viewModel");
                this.setUpControls();
            } catch (e) {
                messages.error(e);
            }
        },
        setUpControls: function() {
            try {
                this._oTable = this._oView.byId("pise.mi.plm.bom::sap.suite.ui.generic.template.ListReport.view.ListReport::C_BillOfMaterialTP--responsiveTable");
                this._oTable.attachItemPress(this.getSelectedItem.bind(this));
            } catch (e) {
                messages.error(e);
            }
        },

        getSelectedItem: function(oEvent) {
            var selectedItem = oEvent.getParameter("listItem").getBindingContext().getObject();
            let plant = selectedItem.Plant;
            let usage = selectedItem.BillOfMaterialVariantUsage;
            plant = '1070';
            this._oView.getModel("customer.ext").read("/BOMListGeneralSet(Plant='" + plant + "',BomUsage='" + usage + "')", {
                success: $.proxy(function(oData) {
                    this.viewModel.setData(oData);
                }, this)
            });

            var oFilter = [];
            oFilter.push(new Filter("Plant", "EQ", plant));
            oFilter.push(new Filter("BomUsage", "EQ", usage));
            oFilter.push(new Filter("ChangeIndicator", "EQ", "X"));
            this._oView.getModel("customer.ext").read("/RemarkDropdownSet", {
                filters: oFilter,
                success: function(oData) {}
            });
        }


    });
});