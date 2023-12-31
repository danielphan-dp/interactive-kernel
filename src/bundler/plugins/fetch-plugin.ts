import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad(
        {
          filter: /(^index\.js$)/, // exact index.js file
        },
        () => {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }
      );

      build.onLoad(
        {
          filter: /.*/, // files in the current directory
        },
        async (args: any) => {
          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
          if (cachedResult) {
            return cachedResult;
          }
        }
      );

      build.onLoad(
        {
          filter: /.css$/, // .css file
        },
        async (args: any) => {
          const { data, request } = await axios.get(args.path);
          const escaped_data = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
          const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped_data}';
            document.head.appendChild(style);
		  `;
          const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: contents,
            resolveDir: new URL('./', request.responseURL).pathname,
          };
          await fileCache.setItem(args.path, result);
          return result;
        }
      );

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check to see if we have already fetched this file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
