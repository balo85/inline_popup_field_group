# popup-field-group
Define a custom display mode for Drupal Field Group

The base idea was to use *Popup field group*, but is doesn't work for me.
In my use case I need to manage fields as popup inside a nested paragraphs.

*Popup field group* make use of *Drupal.dialog* JS library. For what I've seen, using it in nested paragraphs make the dialog remove the original fields, leaving the node save without this informations.

My module keep all the fiels in a fielset, hiding it and adding buttons to show/hide the fieldset.
So all the fields stay always in the page, keeping all the info during the saving of the node.


## Require
* Field Group [https://www.drupal.org/project/field_group](https://www.drupal.org/project/field_group)

## Inspired by
* Popup field group [https://www.drupal.org/project/popup_field_group](https://www.drupal.org/project/popup_field_group)
