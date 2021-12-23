## Features

This extension allows you to generate React component files with the following file structure

```
.
└── ComponentName
    ├── __test__
    │   ├── ComponentName.test.tsx
    │   └── ComponentName.stories.ts
    ├── index.ts
    ├── ComponentName.tsx
    └── ComponentName.styles.ts
```

Test files can be optionally generated

## Extension Settings

| Config             | Default                               | Description |
| ------------------ | ------------------------------------- | ----------- |
| Component Template | ```import React, { FC } from 'react'; |

import \* as Styles from './${componentName}.styles'

interface ${componentName}Props {}

const ${componentName}: FC<${componentName}Props> = () => {
useLanguage();

    return (
        <Styles.Container>

        </Styles.Container>
    );

}

export default ${componentName}``` | Template for generating a component. Make sure you use the ${componentName} template string to make use of your component name argument |
