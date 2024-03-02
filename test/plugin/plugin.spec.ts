import ts from 'typescript'

import { before } from '../../lib/plugin'

import { createCatDTOText, createCatDTOTextTranspiled } from './dto/create-cat.dto'

describe('DTO properties', () => {
  it('add decorators to every DTO class', () => {
    const tsOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      newLine: ts.NewLineKind.LineFeed,
      noEmitHelpers: true,
      experimentalDecorators: true,
      strict: true,
    }
    const filename = 'create-cat.dto.ts'
    const fakeProgram = ts.createProgram([filename], tsOptions)

    const result = ts.transpileModule(createCatDTOText, {
      compilerOptions: tsOptions,
      fileName: filename,
      transformers: {
        before: [before({}, fakeProgram)],
      },
    })

    expect(result.outputText).toEqual(createCatDTOTextTranspiled)
  })
})
