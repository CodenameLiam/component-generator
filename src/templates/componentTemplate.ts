interface CreateComponent {
    componentName: string;
}

export default ({ componentName }: CreateComponent) =>
    `
import React, { FC } from 'react';\nimport * as Styles from './${componentName}.styles'\n\ninterface ${componentName}Props {}\n\nconst ${componentName}: FC<${componentName}Props> = () => {\n    return (\n        <Styles.Container>\n         \n        </Styles.Container>\n    );   \n}
`;
