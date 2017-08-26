<p align="center">
	<img src="http://i.imgur.com/GRzSQpz.png" width="150" />
</p>


# Paperless Desktop</h1>
Desktop app that uses the [paperless](https://github.com/danielquinn/paperless) API to manage your document scans.

<p align="center">
	<img src="http://i.imgur.com/FrgAptE.png" />
</p>

## Installation

Needs a running [paperless](https://github.com/danielquinn/paperless) instance of at least [v0.4.1](https://github.com/danielquinn/paperless/releases/tag/0.4.1)

### Pre-built executables

Please keep in mind, that these are pre-releases. There is still plenty of work to do.

<center>
	<p>
		<a href="https://github.com/thomasbrueggemann/paperless-desktop/releases/download/v0.0.8/Paperless-darwin-x64.zip" style="background-color:#48D560; color:white; border: 0px; padding:20px 30px; font-size: 1.4em; border-radius:15px">
			 Download now
		</a>
	</p>
</center>

## Development

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

## Credits
- &copy; icon design by [@pdiegmann](https://github.com/pdiegmann)
- [photon](https://github.com/connors/photon)
- [react](https://facebook.github.io/react/)
- [electron](http://electron.atom.io/)
