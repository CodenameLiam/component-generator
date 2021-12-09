interface CreateComponent {
    componentName: string;
}

export default ({ componentName }: CreateComponent): string => {
    return `import 'react-native';
import React from 'react';
import ${componentName} from '../${componentName}';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<${componentName} />);
});
`;
};

// const singleLine = `import 'react-native';\nimport React from 'react';\nimport ${componentName} from '../${componentName}';\n\nimport renderer from 'react-test-renderer';\n\nit('renders correctly', () => {\n    renderer.create(<${componentName} />);\n});
// `;
