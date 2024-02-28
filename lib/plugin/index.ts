import * as ts from 'typescript'
import { mergePluginOptions } from './utils/options'
import { isFilenameMatched } from './utils/filename'
import { IReceivedPluginOptions } from './interfaces/plugin-options.interface'
import { ModelClassVisitor } from './visitors/model-class.visitor'

const modelClassVisitor = new ModelClassVisitor()

export const before = (options?: IReceivedPluginOptions, program?: ts.Program) => {
  const mergedOptions = mergePluginOptions(options)

  return (ctx: ts.TransformationContext): ts.Transformer<any> => {
    return (sf: ts.SourceFile) => {
      if (isFilenameMatched(mergedOptions.dtoFileNameSuffix, sf.fileName)) {
        return modelClassVisitor.visit(sf, ctx, program)
      }
      return sf
    }
  }
}
