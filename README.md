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

All of these files are editable through extension settings (see below)
Test files can be optionally generated

## Extension Settings
<table>
    
<tr>
<td> Config </td> 
<td> Default </td>
<td> Description </td>
</tr>

<!-- ROW -->
<tr>
<td> Component Template </td>

<td>
    
```JSX
import React, { FC } from 'react';
import * as Styles from './${componentName}.styles'

interface ${componentName}Props {}

const ${componentName}: FC<${componentName}Props> = () => {
    return (
        <Styles.Container>
         
        </Styles.Container>
    );   
}

export default ${componentName}
```
    
</td>
<td> Template for generating a component. Make sure you use the ${componentName} template string to make use of your component name argument </td>
    
<!-- ROW -->
</tr>
<tr>
<td> Index Template </td>

<td>

```JSX
export { default } from './${componentName}';
export * from './${componentName}';
```

</td>
<td> Template for generating an index component. Make sure you use the ${componentName} template string to make use of your component name argument </td>
</tr>
    
<!-- ROW -->
</tr>
<tr>
<td> Native Style Template </td>

<td>

```JSX
import styled from '@emotion/native';

export const Container = styled.View``
```

</td>
<td> Template for generating a native styled component. </td>
</tr>
    
    
    
</table>


