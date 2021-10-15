# Publish update on LaserFlare Marketplace

This action is primally designed for Java/Kotlin developers to ship updates of plugins to LFM automatically, but you may use it as you want thanks to flexibility of actions.

For example, you can make the following workflow
(run on commit to production branch)

1. run tests
2. build
3. update using this action (you can extract commit title and message to use in update title)

## Setup

You must provide:

- resource ID
- access token (access tokens tab in [setting](https://market.laserflare.net/settings))
- title OR description

You may provide:

- path to the file
- version
- title
- subtitle
- description

## Resources

- [learn GitHub actions](https://docs.github.com/en/actions)
- [testing actions locally with Act](https://github.com/nektos/act)
