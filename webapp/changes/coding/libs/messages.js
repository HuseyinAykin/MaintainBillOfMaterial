sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/message/Message",
    "sap/m/MessageItem",
    "sap/m/MessageView",
    "sap/m/Dialog",
    "sap/m/Button"
], function(MessageToast, Message, MessageItem, MessageView, Dialog, Button) {
    "use strict";
    return {
        _oResourceBundle: null,
        _oComponent: null,
        _oModel: null,
        _oMessageView: null,
        _oDialog: null,
        _bNoClear: false,
        init: function(oComponent) {
            try {
                this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
                this._oComponent = oComponent;
                this._oModel = oComponent.getModel();
                //check for errors on the model
                this._oModel.attachMetadataFailed(this.error.bind(this));
                this._oModel.attachRequestFailed(this.error.bind(this));
            } catch (e) {
                MessageToast.show(e);
            }
        },
        setUpDialog: function() {
            try {
                var that = this;
                var oMessageTemplate = new MessageItem({
                    type: "{type}",
                    title: "{message}",
                    description: "{description}"
                });
                var oBackButton = new Button({
                    icon: sap.ui.core.IconPool.getIconURI("nav-back"),
                    visible: false,
                    press: (function() {
                        that._oMessageView.navigateBack();
                        this.setVisible(false);
                    })
                });
                this._oMessageView = new MessageView({
                    showDetailsPageHeader: false,
                    itemSelect: function() {
                        oBackButton.setVisible(true);
                    },
                    items: {
                        path: "/",
                        template: oMessageTemplate
                    }
                });
                //set the model
                this._oMessageView.setModel(sap.ui.getCore().getMessageManager().getMessageModel());
                this._oDialog = new sap.m.Dialog({
                    resizable: true,
                    content: this._oMessageView,
                    state: "Error",
                    beginButton: new Button({
                        press: function() {
                            if (!that._bNoClear) {
                                sap.ui.getCore().getMessageManager().removeAllMessages();
                            }
                            this.getParent().close();
                        },
                        // text: "{i18n>btnClose}"
                        text: "Close"
                    }),
                    contentHeight: "50%",
                    contentWidth: "50%",
                    // closeOnNavigation: false,
                    verticalScrolling: false
                });
            } catch (e) {
                MessageToast.show(e);
            }
        },
        open: function(bNoClear) {
            try {
                this._bNoClear = bNoClear;
                if (!this._oDialog) {
                    this.setUpDialog();
                }
                this._oDialog.open();
            } catch (e) {
                MessageToast.show(e);
            }
        },
        addMessage: function(sType, sMessage, sDescription) {
            try {
                var oMessage = new Message({
                    message: sMessage,
                    description: sDescription,
                    type: sType
                });
                sap.ui.getCore().getMessageManager().addMessages(oMessage);
            } catch (e) {
                MessageToast.show(e);
            }
        },
        checkBatchError: function(oData) {
            var hasError = false;
            try {
                if (oData.__batchResponses) {
                    if (oData.__batchResponses.length && oData.__batchResponses[0].response && oData.__batchResponses[0].response.body) {
                        var oMessage = JSON.parse(oData.__batchResponses[0].response.body);
                        if (oMessage.error) {
                            this.error(oMessage.error);
                            hasError = true;
                        }
                    }
                }
            } catch (e) {
                MessageToast.show(e);
            }
            return hasError;
        },
        error: function(sMessage, sDescription) {
            try {
                if (sMessage || sDescription) {
                    var sError = sMessage;
                    var sErrorDesc = sDescription;
                    //check for a message if object
                    if (sError.getParameters) {
                        sError = sError.getParameters();
                    }
                    if (sError.response) {
                        sError = sError.response;
                    }
                    if (sError.message) {
                        if (sError.responseText) {
                            sErrorDesc = sError.responseText;
                        }
                        if (sError.message.value) {
                            sError = sError.message.value;
                        } else {
                            sError = sError.message;
                        }
                    }
                    this.addMessage("Error", sError, sErrorDesc);
                    if (jQuery.sap) {
                        jQuery.sap.log.error(sError, sErrorDesc);
                    }
                }
                this.open();
            } catch (e) {
                MessageToast.show(e);
            }
        }
    };
});