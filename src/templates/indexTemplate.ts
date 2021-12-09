interface CreateComponent {
    componentName: string;
}

export default ({ componentName }: CreateComponent): string => {
    return `export { default } from './${componentName}';
export * from './${componentName}';
`;
};
