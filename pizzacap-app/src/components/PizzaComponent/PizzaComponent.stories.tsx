/* eslint-disable */
import PizzaComponent from './PizzaComponent';

export default {
  title: "PizzaComponent",
};

export const Default = () => <PizzaComponent name={''} image_url={''} ingredients={[]} price={12}/>;

Default.story = {
  name: 'default',
};
