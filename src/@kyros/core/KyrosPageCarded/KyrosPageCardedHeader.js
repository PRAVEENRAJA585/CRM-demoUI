import clsx from 'clsx';

function KyrosPageCardedHeader(props) {
  return (
    <div className={clsx('KyrosPageCarded-header', 'container')}>{props.header && props.header}</div>
  );
}

export default KyrosPageCardedHeader;
