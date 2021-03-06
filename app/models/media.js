import Base from 'client/models/base';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { or } from 'ember-computed';

export default Base.extend({
  abbreviatedTitles: attr('array'),
  averageRating: attr('number'),
  canonicalTitle: attr('string'),
  coverImage: attr('object', { defaultValue: '/images/default_cover.png' }),
  coverImageTopOffset: attr('number'),
  endDate: attr('utc'),
  posterImage: attr('object', { defaultValue: '/images/default_poster.jpg' }),
  ratingFrequencies: attr('object'),
  slug: attr('string'),
  startDate: attr('utc'),
  synopsis: attr('string'),
  titles: attr('object'),

  genres: hasMany('genre'),
  castings: hasMany('casting'),
  installments: hasMany('installment'),
  mappings: hasMany('mapping'),
  reviews: hasMany('review'),

  mediaType: or('showType', 'mangaType'),
  unitCount: or('episodeCount', 'chapterCount')
});
