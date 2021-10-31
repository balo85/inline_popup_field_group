<?php

namespace Drupal\inline_popup_field_group\Plugin\field_group\FieldGroupFormatter;

use Drupal\Component\Utility\Html;
use Drupal\field_group\FieldGroupFormatterBase;

/**
 * Plugin implementation of the 'inline popup' formatter.
 *
 * @FieldGroupFormatter(
 *   id = "popup_fake",
 *   label = @Translation("Popup fake"),
 *   description = @Translation("This popup renders the inner content in a fake modal with the title as legend."),
 *   supported_contexts = {
 *     "form",
 *     "view",
 *   }
 * )
 */
class Popup extends FieldGroupFormatterBase {

  /**
   * Current popup identifier.
   *
   * @var string
   */
  protected $elementId;

  /**
   * {@inheritdoc}
   */
  public function settingsForm() {
    $form = parent::settingsForm();

    $form['link_text'] = [
      '#type'           => 'textfield',
      '#title'          => $this->t('Link text'),
      '#default_value'  => $this->getSetting('link_text'),
    ];
    $form['description'] = [
      '#title'          => $this->t('Description'),
      '#type'           => 'textarea',
      '#default_value'  => $this->getSetting('description'),
      '#weight'         => -4,
    ];

    if($this->context == 'form') {
      $form['required_fields'] = [
        '#type'           => 'checkbox',
        '#title'          => $this->t('Mark group as required if it contains required fields.'),
        '#default_value'  => $this->getSetting('required_fields'),
        '#weight'         => 2,
      ];
    }

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultContextSettings($context) {
    $defaults = [
        'description' => '',
      ] + parent::defaultSettings($context);

    if($context == 'form') {
      $defaults['required_fields'] = 1;
    }

    return $defaults;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = parent::settingsSummary();

    if ($this->getSetting('required_fields')) {
      $summary[] = $this->t('Mark as required');
    }

    $summary[] = $this->t('Display open link: @act', ['@act' => $this->getSetting('link_text')]);

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function preRender(&$element, $rendering_object) {
    parent::preRender($element, $rendering_object);
    $this->process($element, $rendering_object);
  }

  /**
   * {@inheritdoc}
   */
  public function process(&$element, $processed_object) {
    $fsLabel  = $this->getLabel().'<span class="closer lblCloser">X</span>';
    $fsDesc   = $this->getSetting('description').'<a href="#" class="button closer descCLoser">'.t('Close').'</a>';

    $element += [
      '#type'         => 'fieldset',
      '#title'        => $fsLabel,
      '#description'  => $fsDesc,
      '#id'           => $this->getGroupId(),
      '#attributes'   => [
        'title'         => $this->getLabel(),
        'id'            => $this->getGroupId(),
        'style'         => 'display:none;',
      ],
      // Prevent \Drupal\content_translation\ContentTranslationHandler::addTranslatabilityClue()
      // from adding an incorrect suffix to the field group title.
      '#multilingual' => TRUE,
      '#prefix'       => $this->generateOpenPopupHtml()
    ];

    $classes = $this->getClasses();
    if(!empty($classes)) { $element['#attributes'] += ['class' => $classes]; }

    $element['#attached']['library'][] = 'inline_popup_field_group/core';
    $element['#attached']['library'][] = 'field_group/core';
  }

  /**
   * Generate HTML element markup to open popup.
   *
   * @return string
   *   HTML element markup.
   */
  protected function generateOpenPopupHtml() {
    $label = $this->getSetting('link_text');
    $label = ($label !== '') ? $label : $this->t('Open popup');
    $target = $this->getGroupId();
    return '<a class="button popupFakeOpener" data-target="' . $target . '">' . $label . '</a>';
  }

  /**
   * Return current group ID.
   *
   * @return string
   *   Current group ID.
   */
  protected function getGroupId() {
    if(empty($this->elementId)) {
      if ($this->getSetting('id')) {
        $this->elementId = $this->getSetting('id');
      }
      else {
        $this->elementId = 'popup_field_' . $this->group->group_name;
      }

      $this->elementId = Html::getUniqueId($this->elementId);
    }

    return $this->elementId;
  }

}
