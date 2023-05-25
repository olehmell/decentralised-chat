import { PostContent } from "@subsocial/api/types"
import { registry } from "./registry"
import { ExtensionSchema, ExtensionWidget } from "./types"

type ExtendedPostContent = PostContent & {
  extensions?: ExtensionSchema<any>[]
}

function getRegisteredExtension<O extends any>(extension: ExtensionSchema<O>): ExtensionWidget<O> | undefined {
  const index = registry.findIndex((v) => v.name == extension.name)
  
  if (index == -1) return undefined;

  return registry[index]?.initialize(extension.options)
}

export function getExtensionsFromPost<O extends any>(post: ExtendedPostContent): ExtensionWidget<O>[] {
  if (!post.extensions) return []

  return post.extensions
    .map((extension) => getRegisteredExtension(extension))
    .filter((extension) => extension !== undefined) as ExtensionWidget<O>[]
}
