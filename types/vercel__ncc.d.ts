/* eslint-disable @typescript-eslint/method-signature-style */
declare module "@vercel/ncc" {
    export interface BaseOptions {
        /**
         * Provide a custom cache path or disable caching
         */
        cache: string | false;
        /**
         * Externals to leave as requires of the build
         */
        externals: string[] | Record<string, string>;
        /**
         * Directory outside of which never to emit assets
         * @default process.cwd()
         */
        filterAssetBase: string;
        /**
         * @default false
         */
        minify: boolean;
        /**
         * @default false
         */
        sourceMap: boolean;
        /**
         * @default false
         */
        assetBuilds: boolean;
        /**
         * Default treats sources as output-relative
         */
        sourceMapBasePrefix: string;
        /**
         * when outputting a sourcemap, automatically include
         * source-map-support in the output file (increases output by 32kB).
         * @default true
         */
        sourceMapRegister: boolean;
        /**
         * @default false
         */
        watch: boolean;
        /**
         * Default does not generate a license file
         */
        license: string;
        /**
         * @default 'es2015'
         */
        target: string;
        /**
         * @default false
         */
        v8cache: boolean;
        /**
         * @default false
         */
        quiet: boolean;
        /**
         * @default false
         */
        debugLog: boolean;
    }

    export interface BuildOptions extends Partial<BaseOptions> {
        watch?: false;
    }

    export interface BuildResult {
        code: string;
        map?: string;
        assets: Record<string, { source: string | Buffer; permissions: number }>;
        symlinks: Record<string, string>;
        stats: Webpack.Stats;
    }

    export interface WatchOptions extends Partial<BaseOptions> {
        watch: true;
    }

    export interface WatchResult {
        /**
         * Handler re-run on each build completion
         * Watch errors are reported on "err"
         */
        handler(handler: (result: BuildResult) => void): void;
        /**
         * Handler re-run on each rebuild start
         */
        rebuild(): void;
        /**
         * Close the watcher
         */
        close(): void;
    }

    declare function ncc(entry: string, options?: BuildOptions): Promise<BuildResult>;
    declare function ncc(entry: string, options?: WatchOptions): WatchResult;
    export default ncc;
}
