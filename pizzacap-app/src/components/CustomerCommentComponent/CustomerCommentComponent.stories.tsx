/* eslint-disable */
import CustomerCommentComponent from './CustomerCommentComponent';
import pizzaSlice from '../../assets/3.png';

export default {
    title: 'CustomerCommentComponent',
};

export const Default = () => (
    <CustomerCommentComponent
        name={'Bob'}
        image_url={pizzaSlice}
        stars={5}
        comment="La meilleure pizza que j'ai jamais mangé. Merci PizzaCap !!!"
    />
);

Default.story = {
    name: 'default',
};
