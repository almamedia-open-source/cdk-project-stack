import { env } from 'process';
import { ProjectContext } from '@almamedia-open-source/cdk-project-context';
import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import { capitalCase, pascalCase } from 'change-case';
import { Construct } from 'constructs';

// TODO THIS CODE IS HORRIBLE, REFACTOR ONCE API/FEATURES AGREED UPON!


function decideTerminationProtection(environmentType?: string): boolean {
  if (typeof environmentType === 'undefined') return true; // "account stack"
  return /^(staging|production)$/.test(environmentType);
}

function decideStackName(baseName: string, projectName: string, account: string | undefined, environment: string | undefined): string {
  if (typeof environment === 'string' && environment !== '') {
    return `${pascalCase(projectName)}-Environment-${pascalCase(environment).replace('_', '')}-${pascalCase(baseName)}`;
  }

  if (typeof account === 'string' && account !== '') {
    return `${pascalCase(projectName)}-Account-${pascalCase(baseName)}`;
  }

  return `${pascalCase(projectName)}-${pascalCase(baseName)}`;
}

function decideDescription(summary: string, account: string | undefined, environment: string | undefined) {
  let prefix = '';

  if (typeof environment === 'string' && environment !== '') {
    prefix = `${pascalCase(environment)} Environment: `;
  } else if (typeof account === 'string' && account !== '') {
    prefix = `${pascalCase(account)} Account: `;
  } else {
    prefix = '';
  }

  return `${prefix}${summary}`;
}

export interface ProjectStackProps extends StackProps {
  readonly summary: string;
}

export class ProjectStack extends Stack {
  constructor(scope: Construct, id: string, props: ProjectStackProps) {

    if (typeof props.description === 'string') {
      throw new Error('Do not set description, instead provide summary');
    }

    const accountId = props?.env?.account || ProjectContext.getAccountId(scope);
    const region = props?.env?.region || ProjectContext.getDefaultRegion(scope);
    const accountType = ProjectContext.getAccountType(scope);
    const environmentType = ProjectContext.tryGetEnvironment(scope);
    const projectName = ProjectContext.getName(scope);


    const stackName = decideStackName(id, projectName, accountType, environmentType);
    const description = decideDescription(props.summary, accountType, environmentType);
    const terminationProtection = decideTerminationProtection(environmentType);

    super(scope, id, {
      ...props,
      stackName: props?.stackName || stackName,
      terminationProtection: props?.terminationProtection || terminationProtection,
      description: description,
      env: {
        ...env,
        account: accountId,
        region: region,
      },
    });

    tagIt(this);
  }
}

function tagIt(scope: Construct) {
  const tags = Tags.of(scope);

  // Resolve values
  const accountType = ProjectContext.getAccountType(scope); // TODO allow fail (tryGet...)
  const environmentType = ProjectContext.tryGetEnvironment(scope);
  const projectName = ProjectContext.getName(scope);
  const authorName = ProjectContext.getAuthorName(scope);
  const authorOrganization = ProjectContext.getAuthorOrganization(scope);
  const authorEmail = ProjectContext.getAuthorEmail(scope);

  const useLegacyStacks = scope.node.tryGetContext('@almamedia-open-source/cdk-project-stack:legacyTags') === true;

  if (typeof accountType === 'string') {
    tags.add('Account', accountType);
  }

  if (typeof environmentType === 'string') {
    tags.add('Environment', environmentType);
    if (useLegacyStacks) {
      tags.add('ProjectAndEnvironment', `${pascalCase(projectName)}${pascalCase(environmentType)}`);
    }
  }

  if (useLegacyStacks) {
    tags.add('Project', capitalCase(projectName));
  } else {
    tags.add('Project', projectName);
  }
  tags.add('Author', authorName);
  tags.add('Organization', authorOrganization || '');
  tags.add('Contact', authorEmail || '');


  /*
  Prevent tagging of EIP resources since it can cause ec2:disassociateAddress which can break things.
  - https://github.com/aws/aws-cdk/issues/5469
  - https://github.com/aws-cloudformation/aws-cloudformation-coverage-roadmap/issues/309
  */
  const excludeEip = { includeResourceTypes: ['AWS::EC2::EIP'], priority: 300 };
  tags.remove('Name', excludeEip);
  tags.remove('Account', excludeEip);
  tags.remove('Environment', excludeEip);
  tags.remove('ProjectAndEnvironment', excludeEip);
  tags.remove('Project', excludeEip);
  tags.remove('Author', excludeEip);
  tags.remove('Organization', excludeEip);
  tags.remove('Contact', excludeEip);
}
