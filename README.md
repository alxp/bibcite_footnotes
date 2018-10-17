Bibcite Footnotes
=================

Contents
--------

 * Introduction
 * Installation
 * Configuration
 * Current Maintainers

Introduction
------------

A plugin for the Footnotes module (https://www.drupal.org/project/footnotes) 
that lets a user insert references created or importeed using the Bibliography 
and Citation project (https://www.drupal.org/project/bibcite).

Provides a CKEditor plugin that lets a user select from a list of citations which
appear in a formatted at the bottom of the text area that contains the footnote.

Installation
------------

Install and set up the Footnotes module as per its installation instructions, including
enabling and configuring the Footnotes text filter. If the 'Allowed HTML tags' filter is enabled
you will need to add the following HTML tags for the reference footnotes to display properly.:

```html
    <a class href id> <div class id> <span class id> <ul class id type> 
	<ol class id start type> <sup> <li class id>
```

Configuration
-------------

Drag the Reference Footnotes button into the active set of buttons in the text format
you want to use References in and save the settings.

You will then need to create or import one or more references using the Bibliography &
Citations project. Those will then appear in a select list when you are editing a text area
and click on the Reference Footnote button.

Current Maintainers
-------------------

 * Alexander O'Neill (https://www.drupal.org/u/alxp)
