import { IPluginOptions, IReceivedPluginOptions } from '../interfaces/plugin-options.interface'

const defaultOptions: IPluginOptions = {
  dtoFileNameSuffix: ['.dto.ts', '.entity.ts'],
}

export const mergePluginOptions = (options: IReceivedPluginOptions = {}): IPluginOptions => {
  const mergedOptions = { ...defaultOptions }

  if (typeof options.dtoFileNameSuffix === 'string') {
    mergedOptions.dtoFileNameSuffix = [options.dtoFileNameSuffix]
  }

  return mergedOptions
}
