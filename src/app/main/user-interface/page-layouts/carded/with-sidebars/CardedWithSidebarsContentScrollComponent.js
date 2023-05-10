import { styled } from '@mui/material/styles';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';
import DemoSidebar from '../../shared-components/DemoSidebar';

const Root = styled(KyrosPageCarded)(({ theme }) => ({
  '& .KyrosPageCarded-header': {},
  '& .KyrosPageCarded-toolbar': {},
  '& .KyrosPageCarded-content': {},
  '& .KyrosPageCarded-sidebarHeader': {},
  '& .KyrosPageCarded-sidebarContent': {},
}));

function CardedWithSidebarsContentScrollComponent() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
    setRightSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <Root
      header={
        <DemoHeader
          leftSidebarToggle={(ev) => {
            setLeftSidebarOpen(!leftSidebarOpen);
          }}
          rightSidebarToggle={(ev) => {
            setRightSidebarOpen(!rightSidebarOpen);
          }}
        />
      }
      content={<DemoContent />}
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarContent={<DemoSidebar />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => {
        setRightSidebarOpen(false);
      }}
      rightSidebarContent={<DemoSidebar />}
      scroll="content"
    />
  );
}

export default CardedWithSidebarsContentScrollComponent;
