import { useDispatch, useSelector } from 'react-redux';
import KyrosShortcuts from '@kyros/core/KyrosShortcuts';
import { selectFlatNavigation } from 'app/store/kyros/navigationSlice';
import { selectUserShortcuts, updateUserShortcuts } from 'app/store/userSlice';

function NavigationShortcuts(props) {
  const { variant, className } = props;
  const dispatch = useDispatch();
  const shortcuts = useSelector(selectUserShortcuts) || [];
  const navigation = useSelector(selectFlatNavigation);

  function handleShortcutsChange(newShortcuts) {
    dispatch(updateUserShortcuts(newShortcuts));
  }

  return (
    <KyrosShortcuts
      className={className}
      variant={variant}
      navigation={navigation}
      shortcuts={shortcuts}
      onChange={handleShortcutsChange}
    />
  );
}

export default NavigationShortcuts;
