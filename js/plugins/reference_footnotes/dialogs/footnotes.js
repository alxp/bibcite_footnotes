(function() {
    function referenceFootnotesDialog( editor, isEdit ) {
        return {
            title : Drupal.t('Reference Footnotes Dialog'),
            minWidth : 500,
            minHeight : 50,
            contents : [
                {
                    id: 'info',
                    label: Drupal.t('Add a reference footnote'),
                    title: Drupal.t('Add a reference footnote'),
                    elements:
                        [
                            {
                                id: 'reference_footnote',
                                type: 'select',
                                items: editor.config.referenceFootnotes_list,
                                label: Drupal.t('Reference Footnote item:'),
                                setup: function (element) {
                                    if (isEdit)
                                        this.setValue(element.getText());
                                }
                            },
                            {
                                id: 'value',
                                type: 'text',
                                label: Drupal.t('Value :'),
                                labelLayout: 'horizontal',
                                style: 'float:left;width:100px;',
                                setup: function (element) {
                                    if (isEdit)
                                        this.setValue(element.getAttribute('value'));
                                }
                            }
                        ],
                }
            ],
            onShow : function() {
                if (isEdit) {
                    this.fakeObj = CKEDITOR.plugins.reference_footnotes.getSelectedFootnote( editor );
                    this.realObj = editor.restoreRealElement( this.fakeObj );
                }
                this.setupContent( this.realObj );
            },
            onOk : function() {
                CKEDITOR.plugins.reference_footnotes.createFootnote( editor, this.realObj, this.getValueOf('info', 'reference_footnote'), this.getValueOf('info', 'value'));
                delete this.fakeObj;
                delete this.realObj;
            }
        }
    }

    CKEDITOR.dialog.add( 'createreferencefootnotes', function( editor ) {
        return referenceFootnotesDialog( editor );
    });
    CKEDITOR.dialog.add( 'editfootnotes', function( editor ) {
        return referenceFootnotesDialog( editor, 1 );
    });
})();