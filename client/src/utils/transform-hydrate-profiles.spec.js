import transformHydratedProfiles from './transform-hydrate-profiles';

describe('transformHydratedProfiles', () => {
  it(
    'should convert profile objects from API format to post meta format',
    () => {
      const metaProfiles = transformHydratedProfiles([
        {
          byline_id: 4,
          id: 17,
          image: 'https://i.picsum.photos/id/237/200/300.jpg',
          name: 'Billy Byline',
        },
        {
          byline_id: 44,
          id: 5,
          image: 'https://i.picsum.photos/id/237/200/300.jpg',
          name: 'Betsy Byline',
        },
      ]);

      expect(metaProfiles).toEqual([
        {
          atts: {
            post_id: 17,
            term_id: 4,
          },
          type: 'byline_id',
        },
        {
          atts: {
            post_id: 5,
            term_id: 44,
          },
          type: 'byline_id',
        },
      ]);
    }
  );

  it(
    'should handle conversion of text-only bylines not linked to a term/post',
    () => {
      const textProfile = transformHydratedProfiles([
        { name: 'Winifred WordPress' },
      ]);

      expect(textProfile).toEqual([
        {
          type: 'text',
          atts: {
            text: 'Winifred WordPress',
          },
        },
      ]);
    }
  );
});
