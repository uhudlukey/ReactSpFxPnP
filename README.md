# LCM Form Bootstrap

I'm using this example to bootstrap an example form for the LCM Phase 2 Instruction Form page 1

- SP2019 and Online
- Local workbench and Hud SP Online workbench

## Changelog 

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2019-02-28

### Changed

### Added 

- Added a theme copied and pasted from https://developer.microsoft.com/en-us/fabric# as the default one looked wierd on both my workbench and our online workbench
- Added SPFX react controls npm install @pnp/spfx-controls-react --save --save-exact
- Added Office-Fabric-UI
- Committed to GitHub!
- Added people picker for Academic Lead
- Added toggles for 'Instructed Before' and 'Quick Response Required'

### Changed

- Changed order of input elements to be inline with planned form

---
# How do I make a good changelog?

## Guiding Principles

- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each version is displayed.
- Mention whether you follow Semantic Versioning.

## Types of changes

- **Added** for new features.
- **Changed** for changes in existing functionality.
- **Deprecated** for soon-to-be removed features.
- **Removed** for now removed features.
- **Fixed** for any bug fixes.
- **Security** in case of vulnerabilities.

## react-sp-fx-pn-p

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
