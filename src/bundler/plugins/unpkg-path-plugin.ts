import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve(
        {
          filter: /(^index\.js$)/, // case 1: index.js is located in root
        },
        async (args?: any) => {
          return {
            namespace: 'a',
            path: 'index.js',
          };
        }
      );
      build.onResolve(
        {
          filter: /^\.+\//, // case 2: index.js is located a relative path
        },
        async (args: any) => {
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
          };
        }
      );
      build.onResolve(
        {
          filter: /.*/, // case 3: handle the main file of the module
        },
        async (args: any) => {
          return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`,
          };
        }
      );
    },
  };
};
