({
    doInit: function (component, event, helper) {
        var rootSegmentId = component.get('v.rootSegmentId');
        helper.verifyPermissions(
            component
        );
        helper.loadSegmentTreeData(
            component,
            rootSegmentId,
            function (err, segmentTreeData) {
                if (err) {
                    var initErrorLabel;
                    if (component.get('v.nsPrefix') === 'camptools') {
                        initErrorLabel = '$Label.camptools.PageMessagesError';
                    } else {
                        initErrorLabel = '$Label.c.PageMessagesError';
                    }
                    helper.addPageMessage(
                        'error',
                        $A.get(initErrorLabel),
                        err[0].message
                    );
                }
                component.set('v.segmentData', segmentTreeData);
            }
        );
    },

    handleAddSegment: function (component, event, helper) {
        var segment = event.getParam('segment');
        helper.addSegment(segment);
        component.set('v.segmentData', component.get('v.segmentData'));
    },

    handleAddGroup: function (component, event, helper) {
        var group = event.getParam('segment');
        helper.addGroup(group);
        component.set('v.segmentData', component.get('v.segmentData'));
    },

    handleDeleteSegment: function (component, event, helper) {
        var segment = event.getParam('segment');
        helper.deleteSegment(segment);
        component.set('v.segmentData', component.get('v.segmentData'));
    },

    handleSave: function (component, event, helper) {
        var segmentData = component.get('v.segmentData');
        var campaignId = component.get('v.campaignId');
        helper.saveSegmentData(
            component,
            campaignId,
            segmentData,
            function (err) {
                if (err) {
                    var saveErrorLabel;
                    if (component.get('v.nsPrefix') === 'camptools') {
                        saveErrorLabel = '$Label.camptools.CampaignToolsListEditorSaveError';
                    } else {
                        saveErrorLabel = '$Label.c.CampaignToolsListEditorSaveError';
                    }
                    helper.addPageMessage(
                        'error',
                        $A.get(saveErrorLabel),
                        err[0].message
                    );
                } else {
                    var saveSuccessLabel;
                    if (component.get('v.nsPrefix') === 'camptools') {
                        saveSuccessLabel = '$Label.camptools.CampaignToolsListEditorSaveSuccessful';
                    } else {
                        saveSuccessLabel = '$Label.c.CampaignToolsListEditorSaveSuccessful';
                    }
                    helper.addPageMessage(
                        'confirm',
                        $A.get(saveSuccessLabel)
                    );
                }
            }
        );
    }
})