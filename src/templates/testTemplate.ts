interface CreateComponent {
    componentName: string;
}

export default ({ componentName }: CreateComponent): string => {
    return `import { render, screen } from '@testing-library/react';
    import ${componentName} from '../${componentName}';
    
    it('renders correctly', () => {
        render(<${componentName} />);
    });
`;
};

// const singleLine = `
// import { render, screen } from '@testing-library/react';\nimport ${componentName} from '../${componentName}';\n\nit('renders correctly', () => {\n    render(<${componentName} />);\n});
// `;
