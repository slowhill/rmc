define(
['ext/backbone', 'ext/jquery', 'ext/underscore', 'ext/underscore.string',
'ext/bootstrap', 'base_views'],
function(Backbone, $, _, _s, bootstrap, baseViews) {

  // TODO(david): Sorry about the terrible name of everything... I'm tired

  var TookThisView = Backbone.View.extend({
    className: 'took-this',

    render: function() {
      this.$el.html(_.template($('#took-this-tpl').html(),
          this.model.toJSON()));
      return this;
    }
  });

  var UserCollectionView = baseViews.CollectionView.extend({
    className: 'took-this-collection',

    createItemView: function(model) {
      return new TookThisView({ model: model });
    }
  });

  TookThisSidebarView = Backbone.View.extend({
    className: 'took-this-sidebar',

    render: function() {
      this.$el.html(_.template($('#took-this-sidebar-tpl').html(), {
        numFriends: this.collection.length
      }));
      var collectionView = new UserCollectionView({
        collection: this.collection
      });
      this.$('.took-this-collection-placeholder').replaceWith(
        collectionView.render().$el);

      return this;
    }
  });

  return {
    TookThisView: TookThisView,
    TookThisSidebarView: TookThisSidebarView
  };
});