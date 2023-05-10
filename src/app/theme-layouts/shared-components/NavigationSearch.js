import { useSelector } from 'react-redux';
import KyrosSearch from '@kyros/core/KyrosSearch';
import { selectFlatNavigation } from 'app/store/kyros/navigationSlice';

function NavigationSearch(props) {
  const { variant, className } = props;
  const navigation = useSelector(selectFlatNavigation);

  return <KyrosSearch className={className} variant={variant} navigation={navigation} />;
}

export default NavigationSearch;
