# marble-copr

[![⚡️ Powered By: Copr](https://img.shields.io/badge/⚡️_Powered_by-COPR-blue?style=flat-square)](https://copr.fedorainfracloud.org/)
![📦 Architecture: x86_64](https://img.shields.io/badge/📦_Architecture-x86__64-blue?style=flat-square)
[![Latest Version](https://img.shields.io/badge/dynamic/json?color=blue&label=Version&query=builds.latest.source_package.version&url=https%3A%2F%2Fcopr.fedorainfracloud.org%2Fapi_3%2Fpackage%3Fownername%3Derizur%26projectname%3Dmarble%26packagename%3Dmarble-browser%26with_latest_build%3DTrue&style=flat-square&logo=circle&logoColor=blue)](https://copr.fedorainfracloud.org/coprs/erizur/marble/package/marble-browser/)
[![Copr build status](https://copr.fedorainfracloud.org/coprs/erizur/marble/package/marble/status_image/last_build.png)](https://copr.fedorainfracloud.org/coprs/erizur/marble/package/marble-browser/)

An unofficial RPM package of [Marble Browser](https://github.com/NetworkNeighborhood/Marble) designed for [Fedora](https://getfedora.org).
This repo was based on the original RPM packaging system created by [the4runner](https://github.com/the4runner/firefox-dev/) for the [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer).

## ⚠️ Special Note
This is just an RPM packaging for the said software and does not include any licenses of its own. The only additional file included is the `.desktop` file written based on the original executable from the Firefox Release Channel (default).

## About the Application
Marble is a browser based on Mozilla Firefox (more specifically, the ESR variant) that aims to restore the Photon style & layout, while adding removed native styling features for various platforms.

Bugs related to Firefox should be reported directly to Network Neighborhood: 
[https://github.com/NetworkNeighborhood/Marble/issues/](https://github.com/NetworkNeighborhood/Marble/issues/)

Bugs related to this package should be reported at this GitHub project:
[https://github.com/erizur/marble-copr/issues/](https://github.com/erizur/marble-copr/issues/)

## Installation Instructions
1. Enable `erizur/marble` [Copr](https://copr.fedorainfracloud.org/) repository according to your package manager.

```Shell
# If you are using dnf... (you need to have 'dnf-plugins-core' installed)
sudo dnf copr enable erizur/marble

# If you are using yum... (you need to have 'yum-plugins-copr' installed)
sudo yum copr enable erizur/marble
```

2. (Optional) Update your package list.

```Shell
sudo dnf check-update
```

3. Execute the following command to install the package.

```Shell
sudo dnf install marble-browser
```

4. Launch the application from the Application Menu or execute following command in terminal.

```Shell
marble
```
