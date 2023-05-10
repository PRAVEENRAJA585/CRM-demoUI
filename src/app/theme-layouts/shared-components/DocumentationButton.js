import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';

function DocumentationButton({ className }) {
  return (
    <Button
      component={Link}
      to="/documentation"
      role="button"
      className={className}
      variant="contained"
      color="primary"
      startIcon={<KyrosSvgIcon size={16}>heroicons-outline:book-open</KyrosSvgIcon>}
    >
      Documentation
    </Button>
  );
}

export default DocumentationButton;
