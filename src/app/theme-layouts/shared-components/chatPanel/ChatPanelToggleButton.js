import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import { toggleChatPanel } from './store/stateSlice';

const ChatPanelToggleButton = (props) => {
  const dispatch = useDispatch();

  return (
    <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleChatPanel())} size="large">
      {props.children}
    </IconButton>
  );
};

ChatPanelToggleButton.defaultProps = {
  children: <KyrosSvgIcon>heroicons-outline:chat</KyrosSvgIcon>,
};

export default ChatPanelToggleButton;
