import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

let inject = (templateString: string, templateVariables: any) =>
    templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g]);

interface HandleCreateComponentProps {
    args: any;
    native?: boolean;
    styled?: boolean;
}

interface Templates {
    componentTemplate: string;
    indexTemplate: string;
    styleTemplate: string;
    nativeStyleTemplate: string;
    storyTemplate: string;
    nativeStoryTemplate: string;
    testTemplate: string;
    nativeTestTemplate: string;
}

interface CreateComponentProps {
    componentName: string;
    dir: string;
    native: boolean;
    test: boolean;
    story: boolean;
    templates: Templates;
}

const createFile = (filePath: string, content: string) => {
    if (!fs.existsSync(filePath)) {
        fs.createWriteStream(filePath).close();
        fs.writeFile(filePath, content, err => {
            if (err) {
                vscode.window.showErrorMessage('Cant write to file.');
            }
        });
    } else {
        vscode.window.showWarningMessage('File already exists.');
    }
};

const createComponent = async ({ componentName, dir, native, test, story, templates }: CreateComponentProps) => {
    const {
        indexTemplate,
        componentTemplate,
        storyTemplate,
        nativeStoryTemplate,
        styleTemplate,
        nativeStyleTemplate,
        testTemplate,
        nativeTestTemplate,
    } = templates;

    // Define directories
    const componentDirectory = path.join(dir, componentName);
    const testDirectory = path.join(dir, componentName, '__test__');

    // Define paths
    const indexPath = path.join(componentDirectory, `index.ts`);
    const componentPath = path.join(componentDirectory, `${componentName}.tsx`);
    const stylePath = path.join(componentDirectory, `${componentName}.styles.ts`);
    const storyPath = path.join(testDirectory, `${componentName}.stories.tsx`);
    const testPath = path.join(testDirectory, `${componentName}.test.tsx`);

    // Make directories
    fs.mkdirSync(componentDirectory);

    if (test || story) {
        fs.mkdirSync(testDirectory);
    }

    // Create files
    createFile(indexPath, indexTemplate);
    createFile(componentPath, componentTemplate);

    if (native) {
        createFile(stylePath, nativeStyleTemplate);
        story && createFile(storyPath, nativeStoryTemplate);
        test && createFile(testPath, nativeTestTemplate);
    } else {
        createFile(stylePath, styleTemplate);
        story && createFile(storyPath, storyTemplate);
        test && createFile(testPath, testTemplate);
    }
};

const getTemplates = (componentName: string): Templates => {
    const config = vscode.workspace.getConfiguration('MKComponentGenerator');

    const { styleTemplate, nativeStyleTemplate } = config;
    const indexTemplate = inject(config.indexTemplate, { componentName });
    const componentTemplate = inject(config.componentTemplate, { componentName });
    const storyTemplate = inject(config.storyTemplate, { componentName });
    const nativeStoryTemplate = inject(config.nativeStoryTemplate, { componentName });
    const testTemplate = inject(config.testTemplate, { componentName });
    const nativeTestTemplate = inject(config.nativeTestTemplate, { componentName });

    return {
        indexTemplate,
        componentTemplate,
        storyTemplate,
        nativeStoryTemplate,
        styleTemplate,
        nativeStyleTemplate,
        testTemplate,
        nativeTestTemplate,
    };
};

const promptForDirectory = async (): Promise<string> => {
    const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri.fsPath;

    let dir =
        (await vscode.window.showInputBox({
            value: '/',
            prompt: `Path from root`,
            ignoreFocusOut: true,
            valueSelection: [-1, -1],
        })) || '';

    if (!dir.includes(projectRoot)) {
        dir = projectRoot + dir;
    }

    if (dir[dir.length - 1] !== '/') {
        dir = dir + '/';
    }

    return dir;
};

interface AdditionalTemplateOptions {
    test: boolean;
    story: boolean;
}

const promptForAdditionalTemplateOptions = async (): Promise<AdditionalTemplateOptions> => {
    const additionalTemplateOptions = {
        test: false,
        story: false,
    };

    const additionalTemplateSelection = await vscode.window.showQuickPick(
        [
            { id: 'test', label: 'Generate Tests', picked: false },
            { id: 'story', label: 'Generate Story', picked: false },
        ],
        {
            canPickMany: true,
            ignoreFocusOut: true,
        },
    );

    // If no name is specified, return the default
    if (!additionalTemplateSelection) {
        return additionalTemplateOptions;
    }

    // Map the selection onto the options
    additionalTemplateSelection.forEach(element => {
        additionalTemplateOptions[element.id as keyof typeof additionalTemplateOptions] = true;
    });

    // Return the selected options
    return additionalTemplateOptions;
};

const handleCreateComponent = async ({ args, native = false, styled = false }: HandleCreateComponentProps) => {
    // Prompt the user for their desired component name
    const componentName = await vscode.window.showInputBox({
        prompt: 'Enter the component name:',
        ignoreFocusOut: true,
        valueSelection: [-1, -1],
    });

    // If no name is specified, close the application
    if (!componentName) {
        vscode.window.showErrorMessage('Component name not specified');
        return;
    }

    // Get the templates for the provided component name
    const templates = getTemplates(componentName);

    // Get the desired directory where we will write the templates to
    const dir = args ? args.fsPath : await promptForDirectory();

    const { test, story } = await promptForAdditionalTemplateOptions();

    createComponent({
        componentName,
        dir,
        native,
        test,
        story,
        templates,
    });
};

export function activate(context: vscode.ExtensionContext) {
    let disposable = [
        vscode.commands.registerCommand('mk-component-generator.create-react-component', args => {
            handleCreateComponent({ args });
        }),
        vscode.commands.registerCommand('mk-component-generator.create-react-native-component', args => {
            handleCreateComponent({ args, native: true });
        }),
    ];

    context.subscriptions.push(...disposable);
}

export function deactivate() {}
