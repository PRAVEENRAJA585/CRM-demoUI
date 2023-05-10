import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';

const NotificationIcon = ({ value }) => {
  switch (value) {
    case 'error': {
      return (
        <KyrosSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:minus-circle
        </KyrosSvgIcon>
      );
    }
    case 'success': {
      return (
        <KyrosSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:check-circle
        </KyrosSvgIcon>
      );
    }
    case 'warning': {
      return (
        <KyrosSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:exclamation-circle
        </KyrosSvgIcon>
      );
    }
    case 'info': {
      return (
        <KyrosSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:information-circle
        </KyrosSvgIcon>
      );
    }
    default: {
      return null;
    }
  }
};

export default NotificationIcon;
