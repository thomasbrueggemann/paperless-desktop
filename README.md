<p align="center"><img src="http://i.imgur.com/GRzSQpz.png" width="200" /></p>

# Paperless Desktop
Desktop app that uses the [paperless](https://github.com/danielquinn/paperless) API to manage your document scans.

<p align="center"><img src="http://i.imgur.com/WVMq4hG.jpg" /></p>

## Installation

Needs a running [paperless](https://github.com/danielquinn/paperless) instance of at least [v0.4.1](https://github.com/danielquinn/paperless/releases/tag/0.4.1)

#### Pre-built executables

Please keep in mind, that these are pre-releases. There is still plenty of work to do.

Download [here](https://github.com/thomasbrueggemann/paperless-desktop/releases)

#### Development

Thanks to npm, it's easy:

```bash
$ npm install
$ npm start
```

## Deployment

Whenever a new macOS executable should be packaged, just call:

```bash
$ npm run package:mac
```

### Deploy new Auto Update Version

#### auto_updater.json

A file named auto_updater.json needs to be placed in the root of your repo.

This file should contain at least a url key, pointing to the .zip file URL in your latest release. 

```json
{
    "url": "http://mycompany.com/myapp/releases/myrelease",
    "name": "Version 1.0.0",
    "notes": "Theses are some release notes innit",
    "pub_date": "2013-09-18T12:29:53+01:00"
}
```

#### Publishing a new release on Github

When you create a new release on GitHub this is what you should think of:

The tag needs to be a valid semver version.

#### Mac apps:

Your .app must be signed and zip compressed.
Update your auto_updater.json file to point to the newly uploaded zipped .app.

## Credits
- &copy; icon design by [@pdiegmann](https://github.com/pdiegmann)
- [photon](https://github.com/connors/photon)
- [react](https://facebook.github.io/react/)
- [electron](http://electron.atom.io/)
