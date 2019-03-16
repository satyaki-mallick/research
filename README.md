# SourceCred Research

This repository contains research infrastructure, code, and results for SourceCred.

## Setup

Our research codebase is written in Python3, and makes use of Jupyter notebooks.
We recommend using [Conda] to create and manage Python environments. See the
[Conda installation guide].

[Conda]: https://conda.io/en/latest/
[Conda installation guide]: https://docs.conda.io/projects/conda/en/latest/user-guide/install/

This repository uses [Black] as a code formatter, and [pre-commit] to ensure that all code is
properly formatted on commit. You can install these tools, and other dependencies, via:

```
$ pip install -r requirements.txt
$ pre-commit install
```

[Black]: https://black.readthedocs.io/en/stable/
[pre-commit]: https://pre-commit.com/

Note that `pre-commit install` may take a few minutes when doing initial setup.
Once you have pre-commit installed, it will automatically run Black on your files
whenever you commit; if the files are not properly formatted, then the commit will fail
and the changes will be locally available for you to re-commit. You may find it convenient
to integrate Black directly with your text editor.

## Repo Organization

The `infra/` directory contains shared research infrastructure. Code in this directory is
expected to be tested, and held to high engineering standards.

The `sample-graphs/` directory contains real example data from SourceCred.

The `exploratory/` subdirectory contains experimental/exploratory code. Feel free to create
a new subdirectory (named after your GitHub username) and you may freely add more experimental
code there.
