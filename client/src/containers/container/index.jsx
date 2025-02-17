// External dependencies.
import PropTypes from 'prop-types';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

// Internal dependencies.
import setBylineMeta from '../../utils/set-byline';
import BylineSlotWrapper from '../../components/byline-slot-wrapper';

const BylineSlotContainer = ({
  metaKey,
  store,
}) => {
  const profiles = useSelect((select) => select(store).getProfiles(), []);

  const {
    actionAddProfile: addProfile,
    actionRemoveProfile: removeProfile,
    actionReorderProfile: reorderProfile,
  } = useDispatch(store);

  const saveByline = setBylineMeta(dispatch, metaKey);

  /**
   * Save ALL bylines to the post meta in the expected schema.
   *
   * This is an efficient way to save bylines to the post meta in the "right" schema.
   * The redux store schema and the meta schema are different.
   */
  useEffect(() => {
    if (null !== profiles) {
      saveByline(profiles);
    }
  }, [profiles]);

  return (
    <BylineSlotWrapper
      profiles={profiles}
      addProfile={addProfile}
      removeProfile={removeProfile}
      reorderProfile={reorderProfile}
    />
  );
};

BylineSlotContainer.defaultProps = {
  metaKey: 'byline',
};

BylineSlotContainer.propTypes = {
  metaKey: PropTypes.string,
  store: PropTypes.string.isRequired,
};

export default BylineSlotContainer;
