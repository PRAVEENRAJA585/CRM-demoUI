import { styled } from '@mui/material/styles';
import KyrosPageSimple from '@kyros/core/KyrosPageSimple';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';

const Root = styled(KyrosPageSimple)(({ theme }) => ({
  '& .KyrosPageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .KyrosPageSimple-toolbar': {},
  '& .KyrosPageSimple-content': {},
  '& .KyrosPageSimple-sidebarHeader': {},
  '& .KyrosPageSimple-sidebarContent': {},
}));

function SimpleFullWidthPageScrollComponent() {
  return <Root header={<DemoHeader />} content={<DemoContent />} scroll="page" />;
}

export default SimpleFullWidthPageScrollComponent;
