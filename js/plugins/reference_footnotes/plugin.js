(function() {
    CKEDITOR.plugins.add( 'reference_footnotes',
        {
            requires : [ 'fakeobjects','dialog' ],
            icons: 'reference_footnotes',
            onLoad: function() {
                var icon_path = window.location.origin + this.path + 'images/fn_icon2.png';
                CKEDITOR.addCss(
                    '.cke_footnote' +
                    '{' +
                    'background-image: url(' + CKEDITOR.getUrl( icon_path ) + ');' +
                    'background-position: center center;' +
                    'background-repeat: no-repeat;' +
                    'width: 16px;' +
                    'height: 16px;' +
                    '}'
                );
            },
            init: function( editor )
            {
                editor.addCommand('createreferencefootnotes', new CKEDITOR.dialogCommand('createreferencefootnotes', {
                    allowedContent: 'fn[value]'
                }));
                editor.addCommand('editfootnotes', new CKEDITOR.dialogCommand('editfootnotes', {
                    allowedContent: 'fn[value]'
                }));

                // Drupal Wysiwyg requirement: The first argument to editor.ui.addButton()
                // must be equal to the key used in $plugins[<pluginName>]['buttons'][<key>]
                // in hook_wysiwyg_plugin().
                editor.ui.addButton && editor.ui.addButton( 'reference_footnotes', {
                    label: Drupal.t('Add a reference footnote'),
                    command: 'createreferencefootnotes',
                    icon: 'reference_footnotes'
                });

                if (editor.addMenuItems) {
                    editor.addMenuGroup('reference_footnotes', 100);
                    editor.addMenuItems({
                        footnotes: {
                            label: Drupal.t('Edit footnote'),
                            command: 'editfootnotes',
                            icon: 'reference_footnotes',
                            group: 'reference_footnotes'
                        }
                    });
                }
                if (editor.contextMenu) {
                    editor.contextMenu.addListener( function( element, selection ) {
                        if ( !element || element.data('cke-real-element-type') != 'fn' )
                            return null;

                        return { footnotes: CKEDITOR.TRISTATE_ON };
                    });
                }

                editor.on( 'doubleclick', function( evt ) {
                    if ( CKEDITOR.plugins.footnotes.getSelectedFootnote( editor ) )
                        evt.data.dialog = 'editfootnotes';
                });

                CKEDITOR.dialog.add( 'createreferencefootnotes', this.path + 'dialogs/footnotes.js' );
                CKEDITOR.dialog.add( 'editfootnotes', this.path + 'dialogs/footnotes.js' );
            },
            afterInit : function( editor ) {
                var dataProcessor = editor.dataProcessor,
                    dataFilter = dataProcessor && dataProcessor.dataFilter;

                if (dataFilter) {
                    dataFilter.addRules({
                        elements: {
                            fn: function(element ) {
                                return editor.createFakeParserElement( element, 'cke_footnote', 'hiddenfield', false );
                            }
                        }
                    });
                }
            }
        });
})();

CKEDITOR.plugins.reference_footnotes = {
    createFootnote: function( editor, origElement, text, value) {
        if (!origElement) {
            var realElement = CKEDITOR.dom.element.createFromHtml('<fn></fn>');
        }
        else {
            realElement = origElement;
        }

        if (text && text.length > 0 )
            realElement.setText(text);
        if (value && value.length > 0 )
            realElement.setAttribute('value',value);

        var fakeElement = editor.createFakeElement( realElement , 'cke_footnote', 'hiddenfield', false );
        editor.insertElement(fakeElement);
    },

    getSelectedFootnote: function( editor ) {
        var selection = editor.getSelection();
        var element = selection.getSelectedElement();
        var seltype = selection.getType();

        if ( seltype == CKEDITOR.SELECTION_ELEMENT && element.data('cke-real-element-type') == 'hiddenfield') {
            return element;
        }
    }
};
