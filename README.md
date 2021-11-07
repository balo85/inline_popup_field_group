CONTENTS OF THIS FILE
---------------------

* Introduction
* Requirements
* Installation
* Configuration
* Maintainers


INTRODUCTION
------------

The *Inline Popup Field Group* define a custom display mode for Drupal Field Group.
The base idea was to use *Popup field group* (URL https://www.drupal.org/project/popup_field_group), but is doesn't work for me.
In my use case I need to manage fields as popup inside a nested paragraphs.

*Popup field group* make use of *Drupal.dialog* JS library. For what I've seen, using it in nested paragraphs make the dialog remove the original fields, leaving the node save without this informations.

This module keep all the fiels in a fielset, hiding it and adding buttons to show/hide the fieldset.
So all the fields stay always in the page, keeping all the info during the saving of the node.


REQUIREMENTS
------------

This module requires the following modules:

* [Field Group](https://www.drupal.org/project/field_group)


INSTALLATION
------------

Install the Inline Popup Field Group module as you would normally install a contributed Drupal module. Visit https://www.drupal.org/node/1897420 for further information.


CONFIGURATION
-------------

Use this module in your form visualization as all the other Field Group.
Add a new Popup Fake container and move inside each field you need.
Please use **Link text** to define the title of the button in the page.


FAQ
---

Q: Can I define a custom style for my Popup?

A: Yes, you will find all you need in this module. The module have a ready gulpfile to
compile the scss file that is in assets/scss.
Please install all the requirements with *npm install* and than run gulp with *gulp watch*.
Now you can change all you need in assets/scss/inline_popup_field_group.scss


MAINTAINERS
-----------

* Giovanni Rocchini - https://www.drupal.org/u/grocchini

Supporting organization:

* TourTools - https://www.drupal.org/tourtools
