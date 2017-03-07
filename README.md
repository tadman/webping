# Webping

This is a simple utility to time how long it takes to fetch a page. It can be
used as a rough barometer of network health, of server responsiveness, or
otherwise.

It makes HTTP or HTTPS requests to target URLs and fetches content, then
reports on the time taken.

## Usage

The most simple invocation is:

    wp example.com

The URL will be auto-deduced from the given input, where that's equivalent to
the following:

    wp http://example.com/

## License and Copyright

This software is licensed under the [MIT License](https://opensource.org/licenses/MIT)
as described in the [LICENSE](LICENSE) file.

Copyright (C) 2017 Scott Tadman
