/***
@controller Name:sap.suite.ui.generic.template.ListReport.view.ListReport,
*@viewId:pise.mi.plm.bom::sap.suite.ui.generic.template.ListReport.view.ListReport::C_BillOfMaterialTP
*/
sap.ui.define([
        'sap/ui/core/mvc/ControllerExtension', 'sap/ui/core/mvc/OverrideExecution',
        'customer/MaintainBillOfMaterialExt/changes/coding/utils/Table',
        'sap/ui/model/json/JSONModel'

    ],
    function(
        ControllerExtension, OverrideExecution, Table, JSONModel
    ) {
        "use strict";
        return ControllerExtension.extend("customer.MaintainBillOfMaterialExt.ListController", {
            metadata: {
                // extension can declare the public methods
                // in general methods that starts with "_" are private
                methods: {
                    publicMethod: {
                        public: true /*default*/ ,
                        final: false /*default*/ ,
                        overrideExecution: OverrideExecution.Instead /*default*/
                    },
                    finalPublicMethod: {
                        final: true
                    },
                    onMyHook: {
                        public: true /*default*/ ,
                        final: false /*default*/ ,
                        overrideExecution: OverrideExecution.After
                    },
                    couldBePrivate: {
                        public: false
                    }
                }
            },

            // // adding a private method, only accessible from this controller extension
            _privateMethod: function() {},
            // // adding a public method, might be called or overridden from other controller extensions as well
            publicMethod: function() {},
            // // adding final public method, might be called but not overridden from other controller extensions as well
            finalPublicMethod: function() {},
            // // adding a hook method, might be called or overridden from other controller extensions.
            // // override these method does not replace the implementation, but executes after the original method.
            onMyHook: function() {},
            // // method per default public, but made private per metadata
            couldBePrivate: function() {},
            // // this section allows to extend lifecycle hooks or override public methods of the base controller
            override: {
                // 	/**
                // 	 * Called when a controller is instantiated and its View controls (if available) are already created.
                // 	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
                // 	 * @memberOf customer.MaintainBillOfMaterialExt.ListController
                // 	 */
                onInit: function() {
                    // this.Table = new Table(this);
                    this._oTable = this.getView().byId("pise.mi.plm.bom::sap.suite.ui.generic.template.ListReport.view.ListReport::C_BillOfMaterialTP--responsiveTable");
                    let oModel = new JSONModel();
                    this.getView().setModel(oModel, "viewModel");
                    this.viewModel = this.getView().getModel("viewModel");
                    // this._oTable.attachItemPress(this.getSelectedItem.bind(this));
                },
                // 	/**
                // 	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
                // 	 * (NOT before the first rendering! onInit() is used for that one!).
                // 	 * @memberOf customer.MaintainBillOfMaterialExt.ListController
                // 	 */
                // 	onBeforeRendering: function() {
                // 	},

                // 	/**
                // 	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
                // 	 * This hook is the same one that SAPUI5 controls get after being rendered.
                // 	 * @memberOf customer.MaintainBillOfMaterialExt.ListController
                // 	 */
                onAfterRendering: function() {
                    this._oTable.onAfterRendering = function() {
                        this.attachItemPress(function(oEvent) {
                            var selectedItem = oEvent.getParameter("listItem").getBindingContext().getObject();
                            let plant = selectedItem.Plant;
                            let usage = selectedItem.BillOfMaterialVariantUsage;
                            plant = '1070';
                            this.getModel("customer.ext").read("/BOMListGeneralSet(Plant='" + plant + "',BomUsage='" + usage + "')", {
                                success: $.proxy(function(oData) {
                                    let oModel = new JSONModel();
                                    this.setModel(oModel, "viewModel");
                                    this.viewModel = this.getModel("viewModel");
                                    this.viewModel.setData(oData);
                                }, this)
                            });
                        });

                    }

                },




                // 	/**
                // 	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
                // 	 * @memberOf customer.MaintainBillOfMaterialExt.ListController
                // 	 */
                // 	onExit: function() {
                // 	},

                // 	override public method of the base controller
                //	"templateBaseExtension": {
                /**
                 * Can be used to store specific state. Therefore, the implementing controller extension must call fnSetAppStateData(oControllerExtension, oAppState).
                 * oControllerExtension must be the ControllerExtension instance for which the state should be stored. oAppState is the state to be stored.
                 * Note that the call is ignored if oAppState is faulty
                 */
                //	provideExtensionAppStateData: function(fnSetAppStateData){
                //		fnSetAppStateData(oControllerExtension, oAppState);
                //	},
                /**
                 * allows extensions to restore their state according to a state which was previously stored.
                 * Therefore, the implementing controller extension can call fnGetAppStateData(oControllerExtension) in order to retrieve the state information which has been stored in the current state for this controller extension.
                 * undefined will be returned by this function if no state or a faulty state was stored.
                 */
                //	restoreExtensionAppStateData: function(fnGetAppStateData){
                //		this.iPriceRestriction = fnGetAppStateData(oControllerExtension);	
                //	},
                /**
                 * Can be used to make sure that certain fields will be contained in the select clause of the table binding. 
                 * This should be used, when custom logic of the extension depends on these fields.
                 * sControlId is the ID of the control on which extension logic to be applied.
                 * For each custom field the extension must call fnEnsureSelectionProperty(oControllerExtension, sFieldname).
                 * oControllerExtension must be the ControllerExtension instance which ensures the field to be part of the select clause.				
                 * sFieldname must specify the field to be selected. Note that this must either be a field of the entity set itself or a field which can be reached via a :1 navigation property.
                 * In the second case sFieldname must contain the relative path.
                 */
                //	ensureFieldsForSelect: function(fnEnsureSelectionProperty, sControlId){
                //		fnEnsureSelectionProperty(oControllerExtension, sFieldname);
                //	},
                /**
                 * Can be used to add filters. They will be combined via AND with all other filters
                 * sControlId is the ID of the control on which extension logic to be applied.
                 * For each filter the extension must call fnAddFilter(oControllerExtension, oFilter)
                 * oControllerExtension must be the ControllerExtension instance which adds the filter
                 * oFilter must be an instance of sap.ui.model.Filter
                 */
                //	addFilters: function(fnAddFilter, sControlId){
                //		var oFilter = new sap.ui.model.Filter(vFilterInfo, vOperator?, vValue1?, vValue2?),
                //		fnAddFilter(oControllerExtension, oFilter);					
                //	},
                /**
                 * will be called when the SmartFilterbar has been initialized
                 */
                //	onInitSmartFilterBar: function(oEvent){
                //	}
                //	}
            }
        });
    });