import { styled } from '@mui/material/styles';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';

const Root = styled(KyrosPageCarded)({
  '& .KyrosPageCarded-header': {},
  '& .KyrosPageCarded-toolbar': {},
  '& .KyrosPageCarded-content': {},
  '& .KyrosPageCarded-sidebarHeader': {},
  '& .KyrosPageCarded-sidebarContent': {},
});

function CardedFullWidthContentScrollComponent() {
  return <Root header={<DemoHeader />} content={<DemoContent />} scroll="content" />;
}

export default CardedFullWidthContentScrollComponent;
