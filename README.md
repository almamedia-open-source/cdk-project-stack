<br/><br/>

🔥 **This project has been deprected in favour of [`alma-cdk/project`](https://github.com/alma-cdk/project).** 🔥 

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>





# Alma CDK Project Stack

![CDK Version](https://img.shields.io/badge/CDK-v2-informational "CDK v2")
![Stability](https://img.shields.io/badge/Stability-Experimental-yellow "Stability: Experimental") [![release](https://github.com/almamedia-open-source/cdk-project-stack/actions/workflows/release.yml/badge.svg)](https://github.com/almamedia-open-source/cdk-project-stack/actions/workflows/release.yml)

**Opinionated AWS CDK construct to define CloudFormation Stacks with sensible defaults and tags.**

Simplifies stack creation:
```ts
new MyStack(project, 'MyExampleStack', { summary: 'This is required' }); // extends ProjectStack, see "usage"
```

…by automatically setting Stack:
- Name
- Termination Protection
- CDK environment (Account ID & Region)
- Tags (for the stack itself and its resources)

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

2. Define your stack by extending `ProjectStack` (instead of CDK's `Stack`):
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
    new MyStack(project, 'MyExampleStack', { summary: 'This is required' });
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
    | `Project`               | `my-cool-project`                 |
    | `Author`                | `Mad Scientists`                  |
    | `Organization`          | `Acme Corp`                       |
    | `Contact`               | `mad.scientists@acme.example.com` |


<br/>

## StackProps resolution

You may always override these values by passing in [regular CDK `StackProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.StackProps.html); But, by default this construct aims to provide sensible defaults – making splitting CDK application into multiple stacks easier as you don't have to remember to specify all of these values for all the stacks.

Considering the example stack with no `StackProps` (other than required description):
```ts
new MyStack(project, 'MyExampleStack', { description: 'This is required' });
```

### Stack Name

The construct ID given to stack instance is used as a "base name" (e.g. `MyExampleStack`) for the stack:

|     Runtime Context via CLI     |                       Value                        |
| :------------------------------ | :------------------------------------------------- |
| `-c account=dev -c env=staging` | `MyCoolProject-Environment-Staging-MyExampleStack` |
| `-c account=dev`                | `MyCoolProject-Account-MyExampleStack`             |
| -                               | `MyCoolProject-MyExampleStack`                     |

### Termination Protection

Stack Termination Protection is enabled for _account stacks_ and _long-lived & stable environmental stacks_ (belonging to either `staging` or `production` environment):

|         Runtime Context via CLI         |  Value  | Explanation |
| :-------------------------------------- | :------ | :---------- |
| `-c account=dev`<br/>`-c env=staging`         | `true`  | `staging` considered as long-lived & "stable" environment          |
| `-c account=prod`<br/>`-c env=production`     | `true`  | `production` considered as long-lived & "stable" environment |
| `-c account=dev`<br/>`-c env=development`     | `false` | short-lived development environment            |
| `-c account=dev`<br/>`-c env=feature/foo-bar` | `false` | short-lived development environment            |
| `-c account=dev`                        | `true`  | account level resources (used by various environments)            |
| -                                       | `false` | miscellaneous resources, often during initial development            |

### Account ID

Account ID is resolved by [`@almamedia-open-source/cdk-project-context`](https://github.com/almamedia-open-source/cdk-project-context) matching the given `-c account=key` to key in `accounts` object defined in the `Project` (App) initialization props:
```ts
{
  // (unrelated configuration removed for brevity)
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
}
```

If Runtime Context via CLI `--context account=key` not provided, you must specify account ID yourself into `StackProps`:
```ts
new MyStack(project, 'MyExampleStack', {
  summary: 'This is required',
  env: {
    account: '123456789012',
  },
});
```

### Region

Region is resolved by [`@almamedia-open-source/cdk-project-context`](https://github.com/almamedia-open-source/cdk-project-context). Basically in the following order:
1. `defaultRegion` value in `Project` (App) initialization
2. `$CDK_DEFAULT_REGION` environment variable
3. `$AWS_REGION` environment variable
4. `us-east-1`


<br/>

## Stack Name Length

128 chars

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console-create-stack-parameters.html

<br/>

## Alma Media Legacy Tags

_**If you're an Alma Media employee migrating from our internal CDK v1 constructs to this CDK v2 construct, read the following migration info:**_

Our internal (CDK v1) constructs used to have:
1. `Capital Case` values for `Project` (Name) Tag value, for example: `My Cool Project`
2. `ProjectAndEnvironment` tag

This new CDK v2 construct sets the tag values in the same format & case style as provided in `Project` configuration (so no case conversion) and it does not provide the combined `ProjectAndEnvironment` tag anymore, this might potentially break some existing workloads: To solve this, you can control the casing by using a modifier context value in `cdk.json`:

```json
{
  "context": {
    "@almamedia-open-source/cdk-project-stack:legacyTags": true
  }
}
```

But if you don't need the legacy tag style (i.e. the change does not break anything), just use the new tag convention. As always, be sure to view the diff of the changes and test the changes in multiple environments before deploying into production!
