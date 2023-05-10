import _ from '@lodash';
import KyrosUtils from '@kyros/utils';

function NotificationModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: KyrosUtils.generateGUID(),
    icon: 'heroicons-solid:star',
    title: '',
    description: '',
    time: new Date().toISOString(),
    read: false,
    variant: 'default',
  });
}

export default NotificationModel;
