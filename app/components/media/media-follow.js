import FollowComponent from 'client/components/follow-button';
import layout from 'client/templates/components/follow-button';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { task } from 'ember-concurrency';
import { capitalize } from 'ember-string';
import { modelType } from 'client/helpers/model-type';

export default FollowComponent.extend({
  layout,

  getFollowStatus: task(function* () {
    return yield get(this, 'store').query('media-follow', {
      filter: {
        user_id: get(this, 'session.account.id'),
        media_type: capitalize(modelType([get(this, 'media')])),
        media_id: get(this, 'media.id')
      }
    }).then(follow => set(this, 'relationship', get(follow, 'firstObject')));
  }).drop(),

  toggleFollow: task(function* () {
    if (get(this, 'session.isAuthenticated') === false) {
      return get(this, 'session.signUpModal')();
    }

    if (get(this, 'isFollowing')) {
      yield get(this, 'relationship').destroyRecord().then(() => {
        set(this, 'relationship', undefined);
      }).catch(() => get(this, 'notify').error(get(this, 'i18n').t('errors.request')));
    } else {
      yield get(this, 'store').createRecord('media-follow', {
        user: get(this, 'session.account'),
        media: get(this, 'media')
      }).save().then((record) => {
        set(this, 'relationship', record);
      })
      .catch(() => get(this, 'notify').error(get(this, 'i18n').t('errors.request')));
    }
  }).drop()
});
