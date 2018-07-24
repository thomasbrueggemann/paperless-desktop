<p align="center">
	<img src="https://i.imgur.com/F5GNK4X.png" width="150" />
</p>

# Paperless Desktop [![Build Status](https://travis-ci.org/thomasbrueggemann/paperless-desktop.svg?branch=master)](https://travis-ci.org/thomasbrueggemann/paperless-desktop)

Desktop app that uses the [paperless](https://github.com/danielquinn/paperless) API to manage your document scans.

<p align="center">
	<img src="http://i.imgur.com/FrgAptE.png" />
</p>

## Installation

Needs a running [paperless](https://github.com/danielquinn/paperless) instance of at least [v0.4.1](https://github.com/danielquinn/paperless/releases/tag/0.4.1)

### Pre-built executables

Please keep in mind, that these are pre-releases. There is still some work to do.

<center>
	<p>
		<a href="https://github.com/thomasbrueggemann/paperless-desktop/releases" style="background-color:#48D560; color:white; border: 0px; padding:20px 30px; font-size: 1.4em; border-radius:15px">
			 Download now
		</a>
	</p>
</center>

## Development

Thanks to npm, it's easy:

_(Disclaimer: I only ever test this on macOS, any other operation system might behave unexpectedly running this)_

```bash
$ npm install
$ npm start
```

## Deployment

Whenever a new macOS executable should be packaged, just call:

```bash
$ npm run package:mac
```

## Credits

-   &copy; icon design by [@pdiegmann](https://github.com/pdiegmann)
-   [photon](https://github.com/connors/photon)
-   [react](https://facebook.github.io/react/)
-   [electron](http://electron.atom.io/)
