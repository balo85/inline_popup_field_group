# popup-field-group
This module define a custom display mode for Drupal Field Group.

The module is based on the idea of *Popup field group*, but this module didn't work fine for my use case, because I need to manage fields as popup inside a nested paragraphs.

*Popup field group* make use of *Drupal.dialog* JS library. Using it in nested paragraphs give me problems because the dialog popup remove the original fields from my edit panel, leaving the node saved without the informations about the field.

So, my module keep all the fiels in a fielset printed in the DOM, hiding it by CSS and adding buttons to show/hide the fieldset by JS.
All the fields stay always in the page DOM, keeping all the informations during the saving of the node.


## Require
* Field Group [https://www.drupal.org/project/field_group](https://www.drupal.org/project/field_group)

## Inspired by
* Popup field group [https://www.drupal.org/project/popup_field_group](https://www.drupal.org/project/popup_field_group)
