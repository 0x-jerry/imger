# Node CLI(Command Line Interface) Application Template

The fast way to build a CLI application without bundle. Support dynamic import `mjs, jsx, ts, tsx`.

Todo:

1. [ ] Change name, bin and version property of `package.json`.
2. [ ] Change `confFileName` in `src/const.ts`.
3. [ ] Change or delete `x.release.conf.ts`.
4. [ ] Rewrite this file.

Develop:

- `src/export.ts` for export some variables used in this CLI application.
- `src/main.ts` is CLI application entry.
- `src/commands/*` modules in this folder will auto installed at runtime.

limitation:

1. Exports variables only working with this CLI application.
2. Only support one command.

Thanks:

- Use [esbuild-register] to support dynamic import typescript file.
- Use [jest] and [ts-jest] to test.
- Use [cac] to build command-line application.
- Use [unconfig] to load config.
- Use [prompts] to interactive with user.
- Use [picocolor] to render color.
- Use [debug] to show debug information.

[esbuild-register]: https://github.com/egoist/esbuild-register
[jest]: https://github.com/facebook/jest
[ts-jest]: https://github.com/kulshekhar/ts-jest
[cac]: https://github.com/cacjs/cac
[unconfig]: https://github.com/antfu/unconfig
[prompts]: https://github.com/terkelg/prompts
[picocolor]: https://github.com/alexeyraspopov/picocolors
[debug]: https://github.com/debug-js/debug
