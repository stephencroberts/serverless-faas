const OpenFaasProvider = require('./provider');
const OpenFaasPackage = require('./package/index');
const OpenFaasInvoke = require('./invoke');
const OpenFaasInvokeLocal = require('./invokeLocal');
const OpenFaasDeploy = require('./deploy');
const OpenFaasDeployFunction = require('./deployFunction');
const OpenFaasDeployList = require('./deployList');
const OpenFaasDeployListFunctions = require('./deployListFunctions');
const OpenFaasInfo = require('./info');

/**
 * Super plugin for OpenFaas -- loads all of the other plugins
 * @class
 */
class OpenFaasIndex {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.serverless.pluginManager.addPlugin(OpenFaasProvider);
    this.serverless.pluginManager.addPlugin(OpenFaasPackage);
    this.serverless.pluginManager.addPlugin(OpenFaasInvoke);
    this.serverless.pluginManager.addPlugin(OpenFaasInvokeLocal);
    this.serverless.pluginManager.addPlugin(OpenFaasDeploy);
    this.serverless.pluginManager.addPlugin(OpenFaasDeployFunction);
    this.serverless.pluginManager.addPlugin(OpenFaasDeployList);
    this.serverless.pluginManager.addPlugin(OpenFaasDeployListFunctions);
    this.serverless.pluginManager.addPlugin(OpenFaasInfo);
  }
}

module.exports = OpenFaasIndex;
