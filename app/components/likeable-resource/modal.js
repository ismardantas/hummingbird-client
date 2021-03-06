import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { alias } from 'ember-computed';
import { strictInvokeAction } from 'ember-invoke-action';
import PaginationMixin from 'client/mixins/pagination';

export default Component.extend(PaginationMixin, {
  limit: 20,
  model: alias('likes'),

  init() {
    this._super(...arguments);
    // load the next page instantly so we have more than the inital 4-5
    const count = get(this, 'likes.length');
    if (get(this, 'nextLink') !== undefined && count <= 20) {
      get(this, 'getNextData').perform().then(records => (
        this.send('updateNextPage', records, get(records, 'links'))
      ));
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.$('.modal').modal('show');
  },

  actions: {
    updateNextPage(records, links) {
      const dup = get(this, 'likes').toArray();
      dup.addObjects(records);
      set(dup, 'links', links);
      strictInvokeAction(this, 'updateLikes', dup);
    }
  }
});
