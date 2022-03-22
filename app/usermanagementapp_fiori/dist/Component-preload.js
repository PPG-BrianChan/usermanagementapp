//@ui5-bundle usermanagementappfiori/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"usermanagementappfiori/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("usermanagementappfiori.Component",{metadata:{manifest:"json"}})});
},
	"usermanagementappfiori/i18n/i18n.properties":'# This is the resource bundle for usermanagementapp_fiori\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=User Management App\n\n#YDES: Application description\nappDescription=User Management App\n',
	"usermanagementappfiori/manifest.json":'{"_version":"1.32.0","sap.app":{"id":"usermanagementappfiori","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","dataSources":{"mainService":{"uri":"usermanagementapp-services/","type":"OData","settings":{"odataVersion":"4.0"}}},"offline":false,"resources":"resources.json","sourceTemplate":{"id":"ui5template.fiorielements.v4.lrop","version":"1.0.0"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"js":[],"css":[]},"dependencies":{"minUI5Version":"1.99.0","libs":{"sap.ui.core":{},"sap.fe.templates":{}}},"models":{"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"},"i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"routing":{"routes":[{"pattern":":?query:","name":"incidentsList","target":"incidentsList"},{"pattern":"incidents({key}):?query:","name":"incidentsObjectPage","target":"incidentsObjectPage"}],"targets":{"incidentsList":{"type":"Component","id":"incidentsList","name":"sap.fe.templates.ListReport","options":{"settings":{"entitySet":"incidents","variantManagement":"Page","navigation":{"incidents":{"detail":{"route":"incidentsObjectPage"}}}}}},"incidentsObjectPage":{"type":"Component","id":"incidentsObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"entitySet":"incidents"}}}}},"contentDensities":{"compact":true,"cozy":true}},"sap.platform.abap":{"_version":"1.1.0","uri":""},"sap.platform.hcp":{"_version":"1.1.0","uri":""},"sap.fiori":{"_version":"1.1.0","registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"usermanagementapp"}}'
}});