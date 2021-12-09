interface CreateComponent {
    componentName: string;
}

export default ({ componentName }: CreateComponent): string => {
    return `import React from 'react';\nimport {storiesOf} from '@storybook/react-native';\nimport { StoryWrapper } from 'App.styles';\nimport ${componentName} from '../${componentName}';\n\nexport default { title: '${componentName}'};\n\nstoriesOf('${componentName}', module).add('base story', () => (\n    <StoryWrapper>\n        <${componentName} />\n    </StoryWrapper>\n));
    `;
};
