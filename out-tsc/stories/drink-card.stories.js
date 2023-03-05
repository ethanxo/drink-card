import { html } from 'lit';
import '../src/drink-card.js';
export default {
    title: 'DrinkCard',
    component: 'drink-card',
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};
const Template = ({ title, backgroundColor = 'white' }) => html `
  <drink-card style="--drink-card-background-color: ${backgroundColor}" .title=${title}></drink-card>
`;
export const App = Template.bind({});
App.args = {
    title: 'My app',
};
//# sourceMappingURL=drink-card.stories.js.map