# AWS CDK Project Stack

![CDK Version](https://img.shields.io/badge/CDK-v2-informational "CDK v2")
![Stability](https://img.shields.io/badge/Stability-Experimental-yellow "Stability: Experimental")

**Opinionated AWS CDK construct to define CloudFormation Stacks with sensible defaults and tags.**

TODO

- Tags all resources
- Defines Stack termination protection
- Sets the CDK environment (account ID & region)

<br/>

## Important

**🚧 This tool is work-in-progress and experimental!**

All `@almamedia-open-source/cdk-` prefixed constructs/utilities are based on existing CDK constructs/utilities we've developed & used (in production) internally at [Alma Media](https://www.almamedia.fi/en/) since 2019.

_Breaking changes may occur at any given time without prior warning before first `v1` major is released_, as we rewrite them for CDK v2 and use this opportunity to also redesign & refactor.

[Feedback](https://github.com/almamedia-open-source/cdk-project-stack/issues) is most welcome, but do note that we intend to implement these new constructs/utilities and their APIs in such manner that our existing CDK v1 production workloads can easily migrate into these new `@almamedia-open-source/cdk-` constructs/utilities.

<br/>

## Installation

1. Ensure you meet following requirements:
    - [NodeJS](https://nodejs.org/en/) `v14.17.6` or newer
    - [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) `v2.0.0` or newer

2. Install peer dependency [`@almamedia-open-source/cdk-project-context`](https://github.com/almamedia-open-source/cdk-project-context):
    ```shell
    npm i -D @almamedia-open-source/cdk-project-context
    ```

3. Install this tool:
    ```shell
    npm i -D @almamedia-open-source/cdk-project-stack
    ```

<br/>

## Usage

1. Initialize your CDK App with `Project` construct as documented in [`@almamedia-open-source/cdk-project-context`](https://github.com/almamedia-open-source/cdk-project-context):
    ```ts
    // bin/app.ts

    import { Project } from '@almamedia-open-source/cdk-project-context';

    // new Project instead of new App
    const project = new Project({
      name: 'my-cool-project',
      author: {
        organization: 'Acme Corp',
        name: 'Mad Scientists',
        email: 'mad.scientists@acme.example.com',
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
    })
    ```

2. Define your stack which extends `ProjectStack` instead of `Stack`:
    ```ts
    // lib/my-stack.ts

    import { Construct } from 'constructs';
    import { StackProps } from 'aws-cdk-lib';
    import { ProjectStack } from '@almamedia-open-source/cdk-project-stack';

    export class MyStack extends ProjectStack {
      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
          // define your resources...
        }
    }
    ```

3. Import and initialize your stack:
    ```ts
    // bin/app.ts

    new MyStack(project, 'MyExampleStack');
    ```

4. Run CDK commands with (optional) `environment-type` (or shorthand: `environment` or `env`) CLI context flag, for example:
    ```shell
    npx cdk deploy --context account=dev --context environment=staging
    ```

5. Resulting Stack properties

    |        Property         |                    Example value                     |
    | :---------------------- | :--------------------------------------------------- |
    | `stackName`             | `"MyCoolProject-Environment-Staging-MyExampleStack"` |
    | `terminationProtection` | `true`                                               |
    | `env.account`           | `"111111111111"`                                     |
    | `env.region`            | `"eu-west-1"`                                        |

6. Resulting Tags for the Stack and its resources

    |        Property         |           Example value           |
    | :---------------------- | :-------------------------------- |
    | `Account`               | `dev`                             |
    | `Environment`           | `staging`                         |
    | `ProjectAndEnvironment` | `MyCoolProjectStaging`            |
    | `Project`               | `My Cool Project`                 |
    | `Author`                | `Mad Scientists`                  |
    | `Organization`          | `Acme Corp`                       |
    | `Contact`               | `mad.scientists@acme.example.com` |

<br/>





