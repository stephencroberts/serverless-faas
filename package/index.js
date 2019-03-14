const FAAS_CLI_BUILD_FLAGS = [
  '--build-arg',
  '--build-option',
  '--handler',
  '--image',
  '--lang',
  '--name',
  '--no-cache',
  '--parallel',
  '--shrinkwrap',
  '--squash',
  '--tag',
];

/**
 * Package plugin - `sls package`
 * @class
 */
class OpenFaasPackage {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('openfaas');

    this.commands = {
      package: {
        usage: 'Packages serverless functions as a docker images',
        lifecycleEvents: [
          'package:createDeploymentArtifacts',
        ],
        options: {
          function: {
            usage: 'Function name -- packages a single function',
            shortcut: 'f',
          },
          image: {
            usage: 'Docker image tag (defaults to function config)',
            shortcut: 'i',
          },
          // How the heck do you remove options you don't use?
          stage: { usage: 'Not used' },
          region: { usage: 'Not used' },
          package: { usage: 'Not used' },
        },
      },
    };

    this.hooks = {
      'before:package:createDeploymentArtifacts': this.validate.bind(this),
      'package:createDeploymentArtifacts': this.createDockerImages.bind(this),
    };
  }

  /**
   * Validates the command before trying to run it
   *
   * @throws Error
   */
  validate() {
    if (this.options.image && Array.isArray(this.options.function)) {
      throw new Error('Option --image may only be used for a single function');
    }
  }

  /**
   * Creates a docker image for the given function
   *
   * @param {Object} funcConfig - serverless function config object
   * @returns {FaasCliPromise}
   */
  createDockerImage(funcConfig) {
    return this.provider.cli.build(
      // Filter/map function config object to cli flags, returning an array of cli arguments
      ...Object.entries(funcConfig)
        .map(([k, v]) => (FAAS_CLI_BUILD_FLAGS.includes(`--${k}`) ? [`--${k}`, v] : []))
        .reduce((args, arg) => args.concat(arg), []),
    );
  }

  /**
   * Creates docker images for all serverless functions
   *
   * @returns {FaasCliPromise}
   */
  createDockerImages() {
    const functions = this.options.function
      ? [].concat(this.options.function || [])
      : this.serverless.service.getAllFunctions();

    return Promise.all(
      functions.map(
        funcName => this.createDockerImage(this.serverless.service.getFunction(funcName)),
      ),
    );
  }
}

module.exports = OpenFaasPackage;