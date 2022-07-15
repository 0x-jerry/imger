# Imger

A command line tool that help you to generator images, support icns and ico.

## Install

```sh
pnpm i @0x-jerry/imger
```

Global install:

```sh
pnpm add -g @0x-jerry/imger
```

## Usage

Use [default preset](./src/presets/default.ts).

```sh
imger ./path/to/image.png ./output
```

Use json preset file.

`./preset.json`:

```json
{
  "input": "path/to/image",
  "output": "path/to/output/dir",
  "shapes": [
    "icon.ico",
    "icon.icns",
    "128x128.png",
    "128x128@2x.png",
    "512x512.png",
    {
      "name": "custom-name.png",
      "size": "25x25"
    },
    {
      "name": "custom-name@2x.png",
      "size": "25x25@2x"
    }
  ]
}
```

```sh
imger ./path/to/image.png ./output -p ./preset.json
```
