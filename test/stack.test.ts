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
      config: {
        baseDomain: 'example.net',
      },
    },
    prod: {
      id: '222222222222',
      config: {
        baseDomain: 'example.com',
      },
    },
  },
};

describe('ProjectStack', () => {

  test('Feature environment in Dev account', () => {
    const project = new Project({
      ...projectProps,
      context: {
        account: 'dev',
        environment: 'feature/foobar',
      },
    });

    const stack = new ProjectStack(project, 'testing-stack', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-FeatureFoobar-TestingStack');
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

    const stack = new ProjectStack(project, 'testing-stack', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-Staging-TestingStack');
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

    const stack = new ProjectStack(project, 'testing-stack', { summary: 'Test Summary' });
    expect(stack.stackName).toBe('TestProject-Environment-Production-TestingStack');
    expect(stack.terminationProtection).toBeTruthy();
    expect(stack.account).toBe(projectProps.accounts.prod.id);
    expect(stack.region).toBe(projectProps.defaultRegion);
  });
});
