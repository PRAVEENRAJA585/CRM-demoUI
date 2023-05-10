import clsx from 'clsx';

function KyrosPageSimpleHeader(props) {
  return (
    <div className={clsx('KyrosPageSimple-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
}

export default KyrosPageSimpleHeader;
