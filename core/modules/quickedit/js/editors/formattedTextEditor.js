/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, _) {
  Drupal.quickedit.editors.editor = Drupal.quickedit.EditorView.extend({
    textFormat: null,
    textFormatHasTransformations: null,
    textEditor: null,
    $textElement: null,
    initialize: function initialize(options) {
      Drupal.quickedit.EditorView.prototype.initialize.call(this, options);
      var metadata = Drupal.quickedit.metadata.get(this.fieldModel.get('fieldID'), 'custom');
      this.textFormat = drupalSettings.editor.formats[metadata.format];
      this.textFormatHasTransformations = metadata.formatHasTransformations;
      this.textEditor = Drupal.editors[this.textFormat.editor];
      var $fieldItems = this.$el.find('.quickedit-field');

      if ($fieldItems.length) {
        this.$textElement = $fieldItems.eq(0);
      } else {
        this.$textElement = this.$el;
      }

      this.model.set('originalValue', this.$textElement.html());
    },
    getEditedElement: function getEditedElement() {
      return this.$textElement;
    },
    stateChange: function stateChange(fieldModel, state) {
      var editorModel = this.model;
      var from = fieldModel.previous('state');
      var to = state;

      switch (to) {
        case 'inactive':
          break;

        case 'candidate':
          if (from !== 'inactive' && from !== 'highlighted') {
            this.textEditor.detach(this.$textElement.get(0), this.textFormat);
          }

          if (from === 'active' && this.textFormatHasTransformations) {
            this.revert();
          }

          if (from === 'invalid') {
            this.removeValidationErrors();
          }

          break;

        case 'highlighted':
          break;

        case 'activating':
          if (this.textFormatHasTransformations) {
            var $textElement = this.$textElement;

            this._getUntransformedText(function (untransformedText) {
              $textElement.html(untransformedText);
              fieldModel.set('state', 'active');
            });
          } else {
            _.defer(function () {
              fieldModel.set('state', 'active');
            });
          }

          break;

        case 'active':
          {
            var textElement = this.$textElement.get(0);
            var toolbarView = fieldModel.toolbarView;
            this.textEditor.attachInlineEditor(textElement, this.textFormat, toolbarView.getMainWysiwygToolgroupId(), toolbarView.getFloatedWysiwygToolgroupId());
            this.textEditor.onChange(textElement, function (htmlText) {
              editorModel.set('currentValue', htmlText);
              fieldModel.set('state', 'changed');
            });
            break;
          }

        case 'changed':
          break;

        case 'saving':
          if (from === 'invalid') {
            this.removeValidationErrors();
          }

          this.save();
          break;

        case 'saved':
          break;

        case 'invalid':
          this.showValidationErrors();
          break;
      }
    },
    getQuickEditUISettings: function getQuickEditUISettings() {
      return {
        padding: true,
        unifiedToolbar: true,
        fullWidthToolbar: true,
        popup: false
      };
    },
    revert: function revert() {
      this.$textElement.html(this.model.get('originalValue'));
    },
    _getUntransformedText: function _getUntransformedText(callback) {
      var fieldID = this.fieldModel.get('fieldID');
      var textLoaderAjax = Drupal.ajax({
        url: Drupal.quickedit.util.buildUrl(fieldID, Drupal.url('quickedit/!entity_type/!id/!field_name/!langcode/!view_mode')),
        submit: {
          nocssjs: true
        }
      });

      textLoaderAjax.commands.editorGetUntransformedText = function (ajax, response, status) {
        callback(response.data);
      };

      textLoaderAjax.execute();
    }
  });
})(jQuery, Drupal, drupalSettings, _);