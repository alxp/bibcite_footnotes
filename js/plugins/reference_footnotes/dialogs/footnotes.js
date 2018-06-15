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
                CKEDITOR.plugins.reference_footnotes.createFootnote( editor, this.realObj, this.getValueOf('info', 'reference_footnote'), null);
                delete this.fakeObj;
                delete this.realObj;
            }
        }
    }

    CKEDITOR.dialog.add( 'createfootnotes', function( editor ) {
        return referenceFootnotesDialog( editor );
    });
    CKEDITOR.dialog.add( 'editfootnotes', function( editor ) {
        return referenceFootnotesDialog( editor, 1 );
    });
})();