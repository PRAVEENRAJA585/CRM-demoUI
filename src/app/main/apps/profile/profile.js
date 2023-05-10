import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import reducer from './store';
import ProfileView from './myprofile/ProfileView';


function Profile() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
   return (
    <KyrosPageCarded
      content={<ProfileView />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('profileApp', reducer)(Profile);



