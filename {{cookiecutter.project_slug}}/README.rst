{% set delim = "#" * cookiecutter.www_name|length -%}
{{ delim }}
{{ cookiecutter.www_name }}
{{ delim }}

This is the {{ cookiecutter.www_name }} web site.


====================
Development Workflow
====================

.. _WebAssembly: https://webassembly.org/getting-started/developers-guide

The development machine must have the `WebAssembly`_ toolchain installed.
