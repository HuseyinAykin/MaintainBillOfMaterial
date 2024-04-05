sap.ui.define([
    "sap/ui/base/ManagedObject",
    "customer/MaintainBillOfMaterialExt/changes/coding/libs/messages",
    "sap/ui/model/json/JSONModel"
], function(ManagedObject, messages, JSONModel) {
    "use strict";
    return ManagedObject.extend("customer.MaintainBillOfMaterialExt.coding.utils.ESignature", {
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
                this.setUpControls();
            } catch (e) {
                messages.error(e);
            }
        },
        setUpControls: function() {
            try {
                this._oValue = this._oView.byId("pise.mi.plm.bom::sap.suite.ui.generic.template.ObjectPage.view.Details::C_BillOfMaterialTP--activate");
                this._oValue.attachPress(this.getESignatureDialog.bind(this));


            } catch (e) {
                messages.error(e);
            }
        },

        getESignatureDialog: function(oEvent) {
            this.openESignatureDialog();

        },

        openESignatureDialog: function() {
            if (this._oDialog) {
                this._oDialog.destroy();
                this._oDialog = undefined;
            }

            this._oDialog = this.handleDisplayDialog(this._oDialog, this, "customer.MaintainBillOfMaterialExt.changes.fragments.ESignature", this._oView.createId(
                "frESignaturePopUp"));
        },

        handleDisplayDialog: function(oDialog, oController, sFragmentName, sFragmentID, oModel, oContext) {
            var loDialog = oDialog;
            var loModel = oModel;
            var loContext = oContext;
            try {
                if (!loModel) {
                    loModel = oController._oView.getModel();
                }
                if (!loContext) {
                    loContext = oController._oView.getBindingContext();
                }
                //open the approver F4 dialog
                if (!loDialog) {
                    //open the approver dialog
                    loDialog = this.createDialog(oController, sFragmentName, sFragmentID);
                    //add all dependents in this view to the fragment (i18n etc)
                    oController._oView.addDependent(loDialog);
                    //set the dialog model
                    loDialog.setModel(loModel);
                }

                //set the binding context
                loDialog.setBindingContext(loContext);
                if (loDialog.open) {
                    loDialog.open();
                }
            } catch (e) {
                messages.error(e);
            }
            return loDialog;
        },
        createDialog: function(oController, sFragmentName, sFragmentID) {
            var oUserDialog = null;
            try {
                var lsFragment = sFragmentID;
                if (oController.sFragmentId) {
                    lsFragment = oController.sFragmentId + lsFragment;
                }
                //set up the user settings dialog
                oUserDialog = sap.ui.xmlfragment(lsFragment, sFragmentName, oController);
            } catch (e) {
                messages.error(e);
            }
            return oUserDialog;
        },

        onCloseDialog: function() {
            this._oDialog.close();
        }
    });
});