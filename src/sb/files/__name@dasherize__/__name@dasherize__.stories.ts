import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { MLP<%= classify(name)%>Module } from './<%= dasherize(name)%>.module';

export default {
  title: '<%= classify(name)%>',
  component: <%= classify(name)%>Component,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MLP<%= classify(name)%>Module],
    }),
  ],
} as Meta;

//👇 Template
const Template: Story<<%= classify(name)%>Component> = (args) => ({
  props: args,
});

//👇 Stories
export const Primary = Template.bind({});
Primary.args = {};