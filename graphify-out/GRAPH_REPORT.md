# Graph Report - Dulox Correos  (2026-09-10)

## Corpus Check
- 27 files · ~2,866 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 222 nodes · 266 edges · 14 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- devDependencies
- forms.module.ts
- dependencies
- compilerOptions
- app.module.ts
- BaseContactDto
- scripts
- tsconfig.build.json
- README.md
- AGENTS.md
- oxlint.json
- nest-cli.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `scripts` - 14 edges
3. `BaseContactDto` - 9 edges
4. `ContactoDto` - 9 edges
5. `AppService` - 7 edges
6. `FormsService` - 7 edges
7. `MailService` - 7 edges
8. `PrismaService` - 7 edges
9. `RecaptchaService` - 7 edges
10. `AppController` - 6 edges

## Surprising Connections (you probably didn't know these)
- `bootstrap()` --indirect_call--> `AppModule`  [INFERRED]
  src/main.ts → src/app.module.ts
- `BaseContactDto` --references--> `IsRut()`  [EXTRACTED]
  src/forms/dto/contacto.dto.ts → src/common/validators/rut.validator.ts

## Import Cycles
- None detected.

## Communities (14 total, 0 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.06
Nodes (35): @nestjs/cli, @nestjs/mau, @nestjs/schematics, @nestjs/testing, devDependencies, @nestjs/cli, @nestjs/mau, @nestjs/schematics (+27 more)

### Community 1 - "forms.module.ts"
Cohesion: 0.10
Nodes (18): FormsController, Controller, FormsService, Injectable, MailModule, Module, MailService, Injectable (+10 more)

### Community 2 - "dependencies"
Cohesion: 0.09
Nodes (23): class-transformer, class-validator, @nestjs/common, @nestjs/config, @nestjs/core, @nestjs-modules/mailer, @nestjs/platform-express, nodemailer (+15 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (21): node, vitest/globals, compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators (+13 more)

### Community 4 - "app.module.ts"
Cohesion: 0.18
Nodes (10): Get, AppController, Controller, AppModule, Module, AppService, Injectable, FormsModule (+2 more)

### Community 5 - "BaseContactDto"
Cohesion: 0.13
Nodes (14): Body, HttpCode, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength (+6 more)

### Community 6 - "scripts"
Cohesion: 0.09
Nodes (22): author, description, license, name, packageManager, private, scripts, build (+14 more)

### Community 7 - "tsconfig.build.json"
Cohesion: 0.17
Nodes (11): dist, node_modules, **/*spec.ts, src, test, ./tsconfig.json, compilerOptions, rootDir (+3 more)

### Community 8 - "README.md"
Cohesion: 0.18
Nodes (10): Compile and run the project, Deployment, Description, License, Observability, Project setup, Resources, Run tests (+2 more)

### Community 9 - "AGENTS.md"
Cohesion: 0.29
Nodes (6): Architecture Rules, NestJS — Conceptos y reglas clave, Project Overview, Role, Scalability Guidelines, When Improving Code

### Community 10 - "oxlint.json"
Cohesion: 0.29
Nodes (6): env, node, rules, @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises, $schema

### Community 11 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

## Knowledge Gaps
- **100 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `$schema` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `forms.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09848484848484848 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._