interface CreateComponent {
    componentName: string;
}

export default ({ componentName }: CreateComponent): string => {
    return `import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ${componentName}, ${componentName}Props } from '../${componentName}';

export default {
  component: ${componentName},
  title: 'Components/${componentName}',
} as Meta;

const Template: Story<${componentName}Props> = args => <${componentName} {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: '${componentName}',
};`;
};

// const singleLine = `import React from 'react';\nimport { Story, Meta } from '@storybook/react';\nimport { ${componentName}, ${componentName}Props } from '../${componentName}';\n\nexport default {\n  component: ${componentName},\n  title: 'Components/${componentName}',\n} as Meta;\n\nconst Template: Story<${componentName}Props> = args => <${componentName} {...args} />;\n\nexport const Primary = Template.bind({});\n\nPrimary.args = {\n  label: '${componentName}',\n};`;
