import { html, TemplateResult } from 'lit';
import '../src/drink-card.js';

export default {
  title: 'DrinkCard',
  component: 'drink-card',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <drink-card style="--drink-card-background-color: ${backgroundColor}" .title=${title}></drink-card>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
