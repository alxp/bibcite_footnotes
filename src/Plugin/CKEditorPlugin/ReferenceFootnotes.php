<?php

namespace Drupal\bibcite_footnotes\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "reference_footnotes" plugin.
 *
 * NOTE: The plugin ID ('id' key) corresponds to the CKEditor plugin name.
 * It is the first argument of the CKEDITOR.plugins.add() function in the
 * plugin.js file.
 *
 * @CKEditorPlugin(
 *   id = "reference_footnotes",
 *   label = @Translation("Reference Footnotes")
 * )
 */
class ReferenceFootnotes extends CKEditorPluginBase {


  /**
   * {@inheritdoc}
   *
   * NOTE: The keys of the returned array corresponds to the CKEditor button
   * names. They are the first argument of the editor.ui.addButton() or
   * editor.ui.addRichCombo() functions in the plugin.js file.
   */
  public function getButtons() {
    // Make sure that the path to the image matches the file structure of
    // the CKEditor plugin you are implementing.
    return [
      'reference_footnotes' => [
        'label' => t('Reference Footnotes'),
        'image' => drupal_get_path('module', 'bibcite_footnotes') . '/js/plugins/reference_footnotes/images/icon.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    // Make sure that the path to the plugin.js matches the file structure of
    // the CKEditor plugin you are implementing.
    return drupal_get_path('module', 'bibcite_footnotes') . '/js/plugins/reference_footnotes/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return ['fakeobjects'];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $uid = \Drupal::currentUser()->id();

    $query = \Drupal::service('entity.query');

    $ref_ids = $query
      ->get('bibcite_reference')
      ->condition('uid', $uid)
      ->execute();

    $reference_storage = \Drupal::entityTypeManager()->getStorage('bibcite_reference')->loadMultiple($ref_ids);
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder('bibcite_reference');
    $options = [];
    foreach($reference_storage as $ref_id => $ref_item) {
      print_r($ref_id);
      $build = $view_builder->view($ref_item, 'citation');
      $output = trim(strip_tags(render($build)));
      $options[] = [$output, $ref_id];
    }

    return ['referenceFootnotes_list' => $options];
  }

}
