# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### ProjectStack <a name="@almamedia-open-source/cdk-project-stack.ProjectStack" id="almamediaopensourcecdkprojectstackprojectstack"></a>

#### Initializers <a name="@almamedia-open-source/cdk-project-stack.ProjectStack.Initializer" id="almamediaopensourcecdkprojectstackprojectstackinitializer"></a>

```typescript
import { ProjectStack } from '@almamedia-open-source/cdk-project-stack'

new ProjectStack(scope: Construct, id: string, props: ProjectStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#almamediaopensourcecdkprojectstackprojectstackparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#almamediaopensourcecdkprojectstackprojectstackparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#almamediaopensourcecdkprojectstackprojectstackparameterprops)<span title="Required">*</span> | [`@almamedia-open-source/cdk-project-stack.ProjectStackProps`](#@almamedia-open-source/cdk-project-stack.ProjectStackProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStack.parameter.scope" id="almamediaopensourcecdkprojectstackprojectstackparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStack.parameter.id" id="almamediaopensourcecdkprojectstackprojectstackparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStack.parameter.props" id="almamediaopensourcecdkprojectstackprojectstackparameterprops"></a>

- *Type:* [`@almamedia-open-source/cdk-project-stack.ProjectStackProps`](#@almamedia-open-source/cdk-project-stack.ProjectStackProps)

---





## Structs <a name="Structs" id="structs"></a>

### ProjectStackProps <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps" id="almamediaopensourcecdkprojectstackprojectstackprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ProjectStackProps } from '@almamedia-open-source/cdk-project-stack'

const projectStackProps: ProjectStackProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`analyticsReporting`](#almamediaopensourcecdkprojectstackprojectstackpropspropertyanalyticsreporting) | `boolean` | Include runtime versioning information in this Stack. |
| [`description`](#almamediaopensourcecdkprojectstackprojectstackpropspropertydescription) | `string` | A description of the stack. |
| [`env`](#almamediaopensourcecdkprojectstackprojectstackpropspropertyenv) | [`aws-cdk-lib.Environment`](#aws-cdk-lib.Environment) | The AWS environment (account/region) where this stack will be deployed. |
| [`stackName`](#almamediaopensourcecdkprojectstackprojectstackpropspropertystackname) | `string` | Name to deploy the stack with. |
| [`synthesizer`](#almamediaopensourcecdkprojectstackprojectstackpropspropertysynthesizer) | [`aws-cdk-lib.IStackSynthesizer`](#aws-cdk-lib.IStackSynthesizer) | Synthesis method to use while deploying this stack. |
| [`tags`](#almamediaopensourcecdkprojectstackprojectstackpropspropertytags) | {[ key: string ]: `string`} | Stack tags that will be applied to all the taggable resources and the stack itself. |
| [`terminationProtection`](#almamediaopensourcecdkprojectstackprojectstackpropspropertyterminationprotection) | `boolean` | Whether to enable termination protection for this stack. |
| [`summary`](#almamediaopensourcecdkprojectstackprojectstackpropspropertysummary)<span title="Required">*</span> | `string` | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.analyticsReporting" id="almamediaopensourcecdkprojectstackprojectstackpropspropertyanalyticsreporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* `boolean`
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.description" id="almamediaopensourcecdkprojectstackprojectstackpropspropertydescription"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.env" id="almamediaopensourcecdkprojectstackprojectstackpropspropertyenv"></a>

```typescript
public readonly env: Environment;
```

- *Type:* [`aws-cdk-lib.Environment`](#aws-cdk-lib.Environment)
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to select the indicated environment (recommended for production stacks), or to the values of environment variables `CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment depend on the AWS credentials/configuration that the CDK CLI is executed under (recommended for development stacks).  If the `Stack` is instantiated inside a `Stage`, any undefined `region`/`account` fields from `env` will default to the same field on the encompassing `Stage`, if configured there.  If either `region` or `account` are not set nor inherited from `Stage`, the Stack will be considered "*environment-agnostic*"". Environment-agnostic stacks can be deployed to any environment but may not be able to take advantage of all features of the CDK. For example, they will not be able to use environmental context lookups such as `ec2.Vpc.fromLookup` and will not automatically translate Service Principals to the right format based on the environment's AWS partition, and other such enhancements.

---

##### `stackName`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.stackName" id="almamediaopensourcecdkprojectstackprojectstackpropspropertystackname"></a>

```typescript
public readonly stackName: string;
```

- *Type:* `string`
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.synthesizer" id="almamediaopensourcecdkprojectstackprojectstackpropspropertysynthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* [`aws-cdk-lib.IStackSynthesizer`](#aws-cdk-lib.IStackSynthesizer)
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.tags" id="almamediaopensourcecdkprojectstackprojectstackpropspropertytags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.terminationProtection" id="almamediaopensourcecdkprojectstackprojectstackpropspropertyterminationprotection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* `boolean`
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `summary`<sup>Required</sup> <a name="@almamedia-open-source/cdk-project-stack.ProjectStackProps.property.summary" id="almamediaopensourcecdkprojectstackprojectstackpropspropertysummary"></a>

```typescript
public readonly summary: string;
```

- *Type:* `string`

---



