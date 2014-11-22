/**
 * @overview 用来处理编辑广告页的js
 * @author Meathill <lujia.zhai@dianjoy.com>
 * @since 2013-08-08
 */
'use strict';
;(function (ns) {
  var IOS_PREFIX = 'itms-apps://';
  
  ns.AdEditor = Backbone.View.extend({
    events: {
      'blur [name=ad_url]': 'adURL_blurHandler',
      'click .platform label': 'platformButton_clickHandler',
      'click .ad_url button': 'adURLButton_clickHandler'
    },
    initialize: function () {
      var init = this.model.pick(_.keys(this.model.defaults));
      for (var key in init) {
        var items = this.$('[name=' + key + '][value=' + init[key] + ']').prop('checked', true); // radio
        items.length > 0 || (items = this.$('[name="' + key + '[]"][value=' + init[key] + ']').prop('checked', true)); // checkbox
        items.length > 0 || this.$('[name=' + key + ']').val(init[key]); // select
      }
    },
    remove: function () {
      Backbone.View.prototype.remove.call(this);
      this.model.off(null, null, this);
    },
    adURL_blurHandler: function (event) {
      if (this.$el.hasClass('iPhone') && event.target.value.substr(0, 12) !== IOS_PREFIX) {
        event.target.value = event.target.value.replace(/^https?:\/\//i, IOS_PREFIX);
      }
    },
    adURLButton_clickHandler: function (event) {
      $(event.target).closest('.form-group')
        .removeClass('file url')
        .addClass(event.target.value);
    },
    platformButton_clickHandler: function (event) {
      this.$el
        .removeClass('Android iPhone')
        .addClass(event.target.innerText);
      this.$('#process_name').prop('required', false);
      if (event.target.innerText == 'iPhone') {
        $('#process_name').prop('required', true);
        $('#feedback').val(4);
      }
    }
  });
}(Nervenet.createNameSpace('tp.component')));