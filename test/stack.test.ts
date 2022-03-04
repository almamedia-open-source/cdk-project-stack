import { Project, ProjectProps } from '@almamedia-open-source/cdk-project-context';
import { ProjectStack } from '../src/stack';

const projectProps: ProjectProps = {
  name: 'test-project',
  author: {
    organization: 'Acme',
    name: 'Test Author',
    email: 'test@example.com',
  },
  defaultRegion: 'eu-west-1', // defaults to one of: $CDK_DEFAULT_REGION, $AWS_REGION or us-east-1
  accounts: {
    dev: {
      id: '111111111111',
      environments: ['development', 'feature/.*', 'test', 'staging'],
      config: {
        baseDomain: 'example.net',
      },
    },
    prod: {
      id: '222222222222',
      environments: ['production'],
      config: {
        baseDomain: 'example.com',
      },
    },
  },
};

describe('ProjectStack', () => {

  test('Test environment in Dev account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'dev',
        environment: 'test',
      },
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-Test-FooBar');
    expect(stack.terminationProtection).toBeFalsy();
    expect(stack.account).toBe(projectProps.accounts.dev.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
  });

  test('Feature environment in Dev account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'dev',
        environment: 'feature/ABC-123',
      },
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-FeatureAbc123-FooBar');
    expect(stack.terminationProtection).toBeFalsy();
    expect(stack.account).toBe(projectProps.accounts.dev.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
  });

  test('Staging environment in Dev account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'dev',
        environment: 'staging',
      },
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-Staging-FooBar');
    expect(stack.terminationProtection).toBeTruthy();
    expect(stack.account).toBe(projectProps.accounts.dev.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
  });

  test('Production environment in Prod account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'prod',
        environment: 'production',
      },
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-Production-FooBar');
    expect(stack.terminationProtection).toBeTruthy();
    expect(stack.account).toBe(projectProps.accounts.prod.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
  });

  test('Dev account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'dev',
      },
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Account-FooBar');
    expect(stack.account).toBe(projectProps.accounts.dev.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
    expect(stack.terminationProtection).toBeTruthy();
  });

  test('Prod account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'prod',
      },
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Account-FooBar');
    expect(stack.account).toBe(projectProps.accounts.prod.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
    expect(stack.terminationProtection).toBeTruthy();
  });

  test('No account', () => {
    const project = new Project({
      ...projectProps,
    });
    const stack = new ProjectStack(project, 'FooBar', { summary: 'Test Summary', env: { account: '000000000000' } });
    expect(stack.stackName).toBe('TestProject-FooBar');
    expect(stack.account).toBe('000000000000');
    expect(stack.region).toBe(projectProps.defaultRegion);
    expect(stack.terminationProtection).toBeTruthy();
  });
});

// TODO add tests for description

// TODO add tests for tags
